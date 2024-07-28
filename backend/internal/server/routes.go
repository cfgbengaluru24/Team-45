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
	r.Use(CORSMiddleware())

	r.GET("/", s.HelloWorldHandler)

	r.GET("/health", s.healthHandler)

	v1 := r.Group("/v1")

	admin := v1.Group("/admin")
	admin.POST("/register", s.AdminHandler.Register)
	admin.GET("/schools", s.AdminHandler.GetSchools)
	admin.POST("/schools/assign", s.AdminHandler.AssignSchool)
	admin.POST("/schools/verify", s.AdminHandler.VerifySchool)
	admin.GET("/requests", s.AdminHandler.GetRequests)
	admin.POST("/requests/assign", s.AdminHandler.AssignRequest)
	admin.POST("/requests/verify", s.AdminHandler.VerifyRequest)

	donors := v1.Group("/donors")
	donors.POST("/register", s.DonorHandler.Register)
	donors.GET("/requests", s.DonorHandler.GetRequestsHandler)
	donors.GET("/requests/:id")
	donors.POST("/donate/:id", s.DonorHandler.Donate)
	donors.GET("/donations/:id", s.DonorHandler.GetDonations)
	// make url parameters

	grassroots := v1.Group("/grassroots")
	grassroots.POST("/register", s.GrassrootHandler.Register)
	grassroots.GET("/schools", s.GrassrootHandler.GetSchools)
	grassroots.POST("/schools/verify", s.GrassrootHandler.VerifySchool)
	grassroots.GET("/requests", s.GrassrootHandler.GetRequests)
	grassroots.POST("/requests/verify", s.GrassrootHandler.VerifyRequest)

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

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
