package admin

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

type AdminHandler struct {
	db *pgxpool.Pool
}

func Handler(db *pgxpool.Pool) *AdminHandler {
	return &AdminHandler{
		db: db,
	}
}

func (a *AdminHandler) Register(c *gin.Context) {
	var input struct {
		Email    string `json:"email" binding:"required,email"`
		FullName string `json:"name" binding:"required"`
		Phone    string `json:"phone_number" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	err := c.ShouldBindJSON(&input)
	if err != nil {
		merrors.Validation(c, err.Error())
		return
	}
	role := "admin"
	pwdHash, err := utils.PasswordHash(input.Password)
	if err != nil {
		merrors.InternalServer(c, err.Error())
		return
	}

	q := database.New(a.db)

	_, err = q.RegisterUser(c, database.RegisterUserParams{
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

	c.JSON(http.StatusOK, utils.BaseResponse{
		Success:    true,
		Message:    "admin successfully registered",
		StatusCode: http.StatusOK,
	})
}

func (a *AdminHandler) VerifyRequest(c *gin.Context) {
	var input struct {
		RequestID int64 `json:"request_id"`
		Verified  bool  `json:"verified"`
	}

	err := c.ShouldBindJSON(&input)
	if err != nil {
		merrors.Validation(c, err.Error())
		return
	}

	q := database.New(a.db)
	var status int
	if input.Verified {
		status = 4
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

func (a *AdminHandler) VerifySchool(c *gin.Context) {
	var input struct {
		SchoolUUID uuid.UUID `json:"school_uuid"`
		Verified   bool      `json:"verified"`
	}

	err := c.ShouldBindJSON(&input)
	if err != nil {
		merrors.Validation(c, err.Error())
		return
	}

	q := database.New(a.db)
	var status int
	if input.Verified {
		status = 4
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

func (a *AdminHandler) GetRequests(c *gin.Context) {

	q := database.New(a.db)

	requestss1, err := q.AdminRequestSchools1(c)
	if err != nil {
		merrors.InternalServer(c, err.Error())
		return
	}

	requestss3, err := q.AdminRequestSchools3(c)
	if err != nil {
		merrors.InternalServer(c, err.Error())
		return
	}

	c.JSON(http.StatusOK, utils.BaseResponse{
		Success:    true,
		Message:    "retrieved all requests",
		Data:       map[string]any{"New": requestss1, "Verified by grassroots": requestss3},
		StatusCode: http.StatusOK,
	})

}

func (a *AdminHandler) GetSchools(c *gin.Context) {

	q := database.New(a.db)

	schoolss1, err := q.AdminGetSchools1(c)
	if err != nil {
		merrors.InternalServer(c, err.Error())
		return
	}

	schoolss3, err := q.AdminGetSchools3(c)
	if err != nil {
		merrors.InternalServer(c, err.Error())
		return
	}

	c.JSON(http.StatusOK, utils.BaseResponse{
		Success:    true,
		Message:    "retrieved all schools",
		Data:       map[string]any{"New": schoolss1, "Verified by grassroots": schoolss3},
		StatusCode: http.StatusOK,
	})

}

func (a *AdminHandler) AssignRequest(c *gin.Context) {
	var input struct {
		RequestID     int64     `json:"request_id" binding:"required"`
		GrassRootUUID uuid.UUID `json:"grassroot_uuid" binding:"required,uuid"`
	}

	err := c.ShouldBindJSON(&input)
	if err != nil {
		merrors.Validation(c, err.Error())
		return
	}

	tx, err := a.db.Begin(c)
	if err != nil {
		merrors.InternalServer(c, err.Error())
		return
	}
	defer tx.Rollback(c)

	qtx := database.New(a.db).WithTx(tx)

	err = qtx.AssignGrassrootToRequest(c, database.AssignGrassrootToRequestParams{
		RequestID:         input.RequestID,
		AssignedGrassroot: input.GrassRootUUID,
	})
	if err != nil {
		merrors.InternalServer(c, err.Error())
		return
	}

	err = qtx.UpdateRequestStatus(c, database.UpdateRequestStatusParams{
		RequestID: input.RequestID,
		Status:    2,
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
		Message:    "Grassroot successfully assigned to Request",
		StatusCode: http.StatusOK,
	})
}

func (a *AdminHandler) AssignSchool(c *gin.Context) {
	var input struct {
		SchoolUUID    uuid.UUID   `json:"school_uuid" binding:"required,uuid"`
		GrassRootUUID pgtype.UUID `json:"grassroot_uuid" binding:"required,uuid"`
	}

	err := c.ShouldBindJSON(&input)
	if err != nil {
		merrors.Validation(c, err.Error())
		return
	}
	tx, err := a.db.Begin(c)
	if err != nil {
		merrors.InternalServer(c, err.Error())
		return
	}
	defer tx.Rollback(c)

	qtx := database.New(a.db).WithTx(tx)

	err = qtx.AssignGrassrootToSchool(c, database.AssignGrassrootToSchoolParams{
		SchoolUuid:        input.SchoolUUID,
		AssignedGrassroot: input.GrassRootUUID,
	})
	if err != nil {
		merrors.InternalServer(c, err.Error())
		return
	}

	err = qtx.UpdateSchoolStatus(c, database.UpdateSchoolStatusParams{
		SchoolUuid: input.SchoolUUID,
		Status:     2,
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
		Message:    "Grassroot successfully assigned to School",
		StatusCode: http.StatusOK,
	})
}
