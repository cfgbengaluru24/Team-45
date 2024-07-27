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

func (s *SchoolHandler) NewRequest(c *gin.Context) {
	var input struct {
		SchoolUUID uuid.UUID `json:"school_uuid" binding:"required"`
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
