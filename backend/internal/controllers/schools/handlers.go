package schools

import (
	"net/http"

	"github.com/cfgbengaluru/Team-45/backend/internal/database"
	"github.com/cfgbengaluru/Team-45/backend/internal/merrors"
	"github.com/cfgbengaluru/Team-45/backend/internal/utils"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

type SchoolHandler struct {
	db *pgxpool.Pool
}

func Handler(db *pgxpool.Pool) *SchoolHandler {
	return &SchoolHandler{
		db: db,
	}
}

func (s *SchoolHandler) Register(c *gin.Context) {
	var input struct {
		Email      string `json:"email" binding:"required,email"`
		FullName   string `json:"name" binding:"required"`
		Phone      string `json:"phone_number" binding:"required"`
		Password   string `json:"password" binding:"required"`
		SchoolName string `json:"school_name" binding:"required"`
		Location   string `json:"city" binding:"required"`
	}

	err := c.ShouldBindJSON(&input)
	if err != nil {
		merrors.Validation(c, err.Error())
		return
	}
	role := "school"
	pwdHash, err := utils.PasswordHash(input.Password)
	if err != nil {
		merrors.InternalServer(c, err.Error())
		return
	}

	tx, err := s.db.Begin(c)
	if err != nil {
		merrors.InternalServer(c, err.Error())
		return
	}
	defer tx.Rollback(c)

	qtx := database.New(s.db).WithTx(tx)

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

	err = qtx.RegisterSchool(c, database.RegisterSchoolParams{
		ID:       user.ID,
		Name:     input.SchoolName,
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
		Message:    "school successfully registered",
		StatusCode: http.StatusOK,
	})

}

func (s *SchoolHandler) NewRequest(c *gin.Context) {
	var input struct {
		SchoolUUID uuid.UUID `json:"school_uuid" binding:"required,uuid"`
		ReqType    string    `json:"type" binding:"required"`
		Details    string    `json:"details"`
		Cost       int64     `json:"cost"`
	}

	err := c.ShouldBindJSON(&input)
	if err != nil {
		merrors.Validation(c, err.Error())
		return
	}

	q := database.New(s.db)

	req, err := q.NewRequest(c, database.NewRequestParams{
		SchoolUuid: input.SchoolUUID,
		Type:       input.ReqType,
		Details:    &input.Details,
		Cost:       input.Cost,
	})
	if err != nil {
		merrors.InternalServer(c, err.Error())
		return
	}

	c.JSON(http.StatusOK, utils.BaseResponse{
		Success:    true,
		Message:    "new request made successfully",
		Data:       req,
		StatusCode: http.StatusOK,
	})
}
