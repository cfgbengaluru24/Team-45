package grassroots

import (
	"net/http"

	"github.com/cfgbengaluru/Team-45/backend/internal/database"
	"github.com/cfgbengaluru/Team-45/backend/internal/merrors"
	"github.com/cfgbengaluru/Team-45/backend/internal/utils"
	"github.com/gin-gonic/gin"
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
