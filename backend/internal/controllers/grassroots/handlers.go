package grassroots

import (
	"net/http"

	"github.com/cfgbengaluru/Team-45/backend/internal/database"
	"github.com/cfgbengaluru/Team-45/backend/internal/merrors"
	"github.com/cfgbengaluru/Team-45/backend/internal/utils"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"
)

type GrassrootHandler struct {
	db *pgxpool.Pool
}

func Handler(db *pgxpool.Pool) *GrassrootHandler {
	return &GrassrootHandler{
		db: db,
	}
}

func (g *GrassrootHandler) Register(c *gin.Context) {
	var input struct {
		Email    string `json:"email" binding:"required,email"`
		FullName string `json:"name" binding:"required"`
		Phone    string `json:"phone_number" binding:"required"`
		Password string `json:"password" binding:"required"`
		Location string `json:"city" binding:"required"`
	}

	err := c.ShouldBindJSON(&input)
	if err != nil {
		merrors.Validation(c, err.Error())
		return
	}
	role := "grassroot"
	pwdHash, err := utils.PasswordHash(input.Password)
	if err != nil {
		merrors.InternalServer(c, err.Error())
		return
	}

	tx, err := g.db.Begin(c)
	if err != nil {
		merrors.InternalServer(c, err.Error())
		return
	}
	defer tx.Rollback(c)

	qtx := database.New(g.db).WithTx(tx)

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

	err = qtx.RegisterGrassroots(c, database.RegisterGrassrootsParams{
		ID:       user.ID,
		Location: input.Location,
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
		Message:    "grassroot successfully registered",
		StatusCode: http.StatusOK,
	})

}

func (g *GrassrootHandler) GetSchools(c *gin.Context) {
	var input struct {
		GrassrootUUID pgtype.UUID `json:"grassroot_uuid" binding:"required,uuid"`
	}
	err := c.ShouldBindJSON(&input)
	if err != nil {
		merrors.Validation(c, err.Error())
		return
	}

	q := database.New(g.db)

	schools, err := q.GrassrootsGetSchools(c, input.GrassrootUUID)
	if err != nil {
		merrors.InternalServer(c, err.Error())
		return
	}

	c.JSON(http.StatusOK, utils.BaseResponse{
		Success:    true,
		Message:    "retrieved all schools",
		Data:       schools,
		StatusCode: http.StatusOK,
	})

}
func (g *GrassrootHandler) GetRequests(c *gin.Context) {
	var input struct {
		GrassrootUUID uuid.UUID `json:"grassroot_uuid" binding:"required"`
	}
	err := c.ShouldBindJSON(&input)
	if err != nil {
		merrors.Validation(c, err.Error())
		return
	}

	q := database.New(g.db)

	requests, err := q.GrassrootsGetRequests(c, input.GrassrootUUID)
	if err != nil {
		merrors.InternalServer(c, err.Error())
		return
	}

	c.JSON(http.StatusOK, utils.BaseResponse{
		Success:    true,
		Message:    "retrieved all requests",
		Data:       requests,
		StatusCode: http.StatusOK,
	})

}

func (g *GrassrootHandler) VerifyRequest(c *gin.Context) {
	var input struct {
		RequestID int64 `json:"request_id"`
		Verified  bool  `json:"verified"`
	}

	err := c.ShouldBindJSON(&input)
	if err != nil {
		merrors.Validation(c, err.Error())
		return
	}

	q := database.New(g.db)
	var status int
	if input.Verified {
		status = 3
	} else {
		status = 0
	}

	err = q.UpdateRequestStatus(c, database.UpdateRequestStatusParams{
		RequestID: input.RequestID,
		Status:    int32(status),
	})
	if err != nil {
		merrors.InternalServer(c, err.Error())
		return
	}

	c.JSON(http.StatusOK, utils.BaseResponse{
		Success: true,
		Message: "Request has been verified",
	})
}

func (g *GrassrootHandler) VerifySchool(c *gin.Context) {
	var input struct {
		SchoolUUID uuid.UUID `json:"school_uuid"`
		Verified   bool      `json:"verified"`
	}

	err := c.ShouldBindJSON(&input)
	if err != nil {
		merrors.Validation(c, err.Error())
		return
	}

	q := database.New(g.db)
	var status int
	if input.Verified {
		status = 3
	} else {
		status = 0
	}

	err = q.UpdateSchoolStatus(c, database.UpdateSchoolStatusParams{
		SchoolUuid: input.SchoolUUID,
		Status:     int32(status),
	})
	if err != nil {
		merrors.InternalServer(c, err.Error())
		return
	}

	c.JSON(http.StatusOK, utils.BaseResponse{
		Success: true,
		Message: "School has been verified",
	})
}
