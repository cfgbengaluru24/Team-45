package server

import (
	"fmt"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	_ "github.com/joho/godotenv/autoload"

	"github.com/cfgbengaluru/Team-45/backend/internal/controllers/admin"
	"github.com/cfgbengaluru/Team-45/backend/internal/controllers/donors"
	"github.com/cfgbengaluru/Team-45/backend/internal/controllers/grassroots"
	"github.com/cfgbengaluru/Team-45/backend/internal/controllers/schools"
	"github.com/cfgbengaluru/Team-45/backend/internal/database"
)

type Server struct {
	port int

	db               *pgxpool.Pool
	AdminHandler     *admin.AdminHandler
	DonorHandler     *donors.DonorHandler
	GrassrootHandler *grassroots.GrassrootHandler
	SchoolHandler    *schools.SchoolHandler
}

func NewServer() *http.Server {
	port, _ := strconv.Atoi(os.Getenv("PORT"))
	db := database.NewService()
	NewServer := &Server{
		port: port,

		db:               db,
		AdminHandler:     admin.Handler(db),
		DonorHandler:     donors.Handler(db),
		GrassrootHandler: grassroots.Handler(db),
		SchoolHandler:    schools.Handler(db),
	}

	// Declare Server config
	server := &http.Server{
		Addr:         fmt.Sprintf("localhost:%d", NewServer.port),
		Handler:      NewServer.RegisterRoutes(),
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	return server
}
