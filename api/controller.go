package main

import (
	"log"
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
	topic := c.Param("topic")
	var goal models.Day
	var goalIsFound models.Day

	if err := c.BindJSON(&goal); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	if err := DB.Where("id=?", goal.ID).First(&goalIsFound).Error; err != nil || goalIsFound.ID != goal.ID {
		log.Println(">>>Record not found. Creating Record", err)
		DB.Save(&goal)
		c.IndentedJSON(http.StatusCreated, goal)
		return
	}

	switch topic {
	case "pushUps":
		DB.Model(&goal).Update("push_ups", goal.PushUps)
	case "sitUps":
		DB.Model(&goal).Update("sit_ups", goal.SitUps)
	case "squats":
		DB.Model(&goal).Update("squats", goal.Squats)
	case "extra":
		DB.Model(&goal).Update("extra", goal.Extra)
	}
	c.IndentedJSON(http.StatusCreated, goal)
}
