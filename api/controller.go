package main

import (
	"net/http"
	"tracker-api/models"

	"github.com/gin-gonic/gin"
)

// getAlbums responds with the list of all albums as JSON.
func GetDays(c *gin.Context) {
	var goals []models.Day
	DB.Find(&goals) //TODO check result

	c.IndentedJSON(http.StatusOK, goals)
	// c.JSON(http.StatusOK, goals)
}

func GetDayById(c *gin.Context) {
	goal := models.Day{}

	id := c.Param("id")

	DB.Where("id=?", id).First(&goal)
	c.IndentedJSON(http.StatusOK, goal)

	// c.IndentedJSON(http.StatusNotFound, gin.H{"message": "record not found"})
}

func PostDay(c *gin.Context) {
	var goal models.Day

	if err := c.BindJSON(&goal); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	DB.Save(&goal)
	c.IndentedJSON(http.StatusCreated, goal)
}
