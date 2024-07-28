package donors

import (
	"errors"
	"net/http"

	"github.com/cfgbengaluru/Team-45/backend/internal/database"
	"github.com/cfgbengaluru/Team-45/backend/internal/merrors"
	"github.com/cfgbengaluru/Team-45/backend/internal/utils"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type DonorHandler struct {
	db *pgxpool.Pool
}

func Handler(db *pgxpool.Pool) *DonorHandler {
	return &DonorHandler{
		db: db,
	}
}

func (d *DonorHandler) Register(c *gin.Context) {
	var input struct {
		Email     string `json:"email" binding:"required,email"`
		FullName  string `json:"name" binding:"required"`
		Phone     string `json:"phone_number" binding:"required"`
		Password  string `json:"password" binding:"required"`
		Anonymous bool   `json:"anonymous"`
		GetReport bool   `json:"get_report"`
	}

	err := c.ShouldBindJSON(&input)
	if err != nil {
		merrors.Validation(c, err.Error())
		return
	}
	role := "donor"
	pwdHash, err := utils.PasswordHash(input.Password)
	if err != nil {
		merrors.InternalServer(c, err.Error())
		return
	}

	tx, err := d.db.Begin(c)
	if err != nil {
		merrors.InternalServer(c, err.Error())
		return
	}
	defer tx.Rollback(c)

	qtx := database.New(d.db).WithTx(tx)

	user, err := qtx.RegisterUser(c, database.RegisterUserParams{
		Email:        input.Email,
		FullName:     input.FullName,
		Phone:        input.Phone,
		Role:         role,
		PasswordHash: pwdHash,
	})
	if err != nil {
		merrors.InternalServer(c, err.Error())
		return
	}

	err = qtx.RegisterDonors(c, database.RegisterDonorsParams{
		ID:        user.ID,
		Anonymous: input.Anonymous,
		GetReport: input.GetReport,
	})
	if err != nil {
		merrors.InternalServer(c, err.Error())
		return
	}

	err = tx.Commit(c)
	if err != nil {
		merrors.InternalServer(c, err.Error())
		return
	}

	c.JSON(http.StatusOK, utils.BaseResponse{
		Success:    true,
		Message:    "donor successfully registered",
		StatusCode: http.StatusOK,
	})

}

func (d *DonorHandler) GetRequestsHandler(c *gin.Context) {
	q := database.New(d.db)

	requests, err := q.GetDonorRequests(c)
	if err != nil {
		merrors.InternalServer(c, err.Error())
		return
	}

	c.JSON(http.StatusOK, utils.BaseResponse{
		Success:    true,
		Message:    "requests successfully retrieved",
		Data:       map[string][]database.GetDonorRequestsRow{"requests": requests},
		StatusCode: http.StatusOK,
	})
}

func (d *DonorHandler) GetDonations(c *gin.Context) {
	var input struct {
		DonorUUID uuid.UUID `uri:"id" binding:"required,uuid"`
	}
	err := c.ShouldBindUri(&input)
	if err != nil {
		merrors.Validation(c, err.Error())
		return
	}

	q := database.New(d.db)

	donations, err := q.GetForDonor(c, input.DonorUUID)
	if errors.Is(pgx.ErrNoRows, err) {
		merrors.NotFound(c, "No donations found")
		return
	} else if err != nil {
		merrors.InternalServer(c, err.Error())
		return
	}

	c.JSON(http.StatusOK, utils.BaseResponse{
		Success:    true,
		Message:    "donations successfully retrieved",
		Data:       map[string][]database.GetForDonorRow{"donations": donations},
		StatusCode: http.StatusOK,
	})
}

func (d *DonorHandler) Donate(c *gin.Context) {
	var input struct {
		DonorUUID uuid.UUID `json:"donor_uuid" binding:"required"`
		RequestID int64     `json:"request_id" binding:"required"`
		Amount    int64     `json:"amount" binding:"required"`
	}

	err := c.ShouldBindJSON(&input)
	if err != nil {
		merrors.Validation(c, err.Error())
		return
	}

	tx, err := d.db.Begin(c)
	if err != nil {
		merrors.InternalServer(c, err.Error())
		return
	}
	defer tx.Rollback(c)

	qtx := database.New(d.db).WithTx(tx)
	err = qtx.CreateDonation(c, database.CreateDonationParams{
		DonorUuid: input.DonorUUID,
		RequestID: &input.RequestID,
		Amount:    input.Amount,
	})
	if err != nil {
		merrors.InternalServer(c, err.Error())
		return
	}

	err = qtx.UpdateTotalDonation(c, database.UpdateTotalDonationParams{
		DonorUuid: input.DonorUUID,
		Donated:   input.Amount,
	})
	if err != nil {
		merrors.InternalServer(c, err.Error())
		return
	}

	err = qtx.UpdateRequestAfterDonation(c, database.UpdateRequestAfterDonationParams{
		RequestID: input.RequestID,
		Donated:   input.Amount,
	})
	if err != nil {
		merrors.InternalServer(c, err.Error())
		return
	}

	err = tx.Commit(c)
	if err != nil {
		merrors.InternalServer(c, err.Error())
		return
	}

}
