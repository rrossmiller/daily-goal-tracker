package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

var DB *gorm.DB

func main() {
	DB = getDB()
	r := gin.Default()

	// authorized := r.Group("/", gin.BasicAuth(gin.Accounts{
	// 	"usr": "abcdefg", // todo put in env - load on startup
	// }))

	// authorized.GET("/days", GetDays)
	// authorized.GET("/days/:id", GetDayById)
	// authorized.POST("/days", PostDay)
	r.GET("/days", GetDays)
	r.GET("/days/:id", GetDayById)
	r.POST("/days", PostDay)

	// Listen and Server in 0.0.0.0:8080
	config := cors.DefaultConfig()
	// config.AllowOrigins = []string{"*"}
	config.AllowAllOrigins = true
	config.AllowCredentials = true
	r.Use(cors.New(config))

	// r.Use(cors.Default())
	r.Run("0.0.0.0:8080")
}
