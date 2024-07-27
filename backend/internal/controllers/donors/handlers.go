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
		DonorUUID uuid.UUID `json:"donor_uuid" binding:"required"`
	}
	err := c.ShouldBindJSON(&input)
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
