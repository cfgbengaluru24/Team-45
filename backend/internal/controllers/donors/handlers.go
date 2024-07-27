package donors

import (
	"net/http"

	"github.com/cfgbengaluru/Team-45/backend/internal/database"
	"github.com/cfgbengaluru/Team-45/backend/internal/merrors"
	"github.com/cfgbengaluru/Team-45/backend/internal/utils"
	"github.com/gin-gonic/gin"
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
