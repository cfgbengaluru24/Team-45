package server

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func (s *Server) RegisterRoutes() http.Handler {
	r := gin.Default()

	r.GET("/", s.HelloWorldHandler)

	r.GET("/health", s.healthHandler)

	v1 := r.Group("/v1")

	admin := v1.Group("/admin")
	admin.POST("/register", s.AdminHandler.Register)
	admin.GET("/schools")
	admin.POST("/schools/assign")
	admin.POST("/schools/verify")
	admin.GET("/requests")
	admin.POST("/requests/assign")
	admin.POST("/requests/verify")

	donors := v1.Group("/donors")
	donors.POST("/register", s.DonorHandler.Register)
	donors.GET("/requests", s.DonorHandler.GetRequestsHandler)
	donors.GET("/requests/:id")
	donors.POST("/donate/:id")
	donors.GET("/donations", s.DonorHandler.GetDonations)

	grassroots := v1.Group("/grassroots")
	grassroots.POST("/register", s.GrassrootHandler.Register)
	grassroots.GET("/schools")
	grassroots.POST("/schools/verify")
	grassroots.GET("/requests")
	grassroots.POST("/requests/verify")

	schools := v1.Group("/schools")
	schools.POST("/register", s.SchoolHandler.Register)
	schools.POST("/requests", s.SchoolHandler.NewRequest)

	v1.POST("/login")

	// Also do OTP gen

	return r
}

func (s *Server) HelloWorldHandler(c *gin.Context) {
	resp := make(map[string]string)
	resp["message"] = "Hello World"

	c.JSON(http.StatusOK, resp)
}

func (s *Server) healthHandler(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
	defer cancel()

	stats := make(map[string]string)

	err := s.db.Ping(ctx)
	if err != nil {
		stats["status"] = "down"
		stats["error"] = fmt.Sprintf("db down: %v", err)
		log.Fatalf(fmt.Sprintf("db down: %v", err)) // Log the error and terminate the program
		c.JSON(http.StatusInternalServerError, stats)
	}

	// Database is up, add more statistics
	stats["status"] = "up"
	stats["message"] = "It's healthy"
	c.JSON(http.StatusOK, stats)
}
