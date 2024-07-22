package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"tracker-api/models"
)

// getAlbums responds with the list of all albums as JSON.
func GetDays(w http.ResponseWriter, r *http.Request) {
	var goals []models.Day
	DB.Find(&goals) //TODO check result

	write(w, goals)
}

func GetDayById(w http.ResponseWriter, r *http.Request) {
	goal := models.Day{}

	id := r.PathValue("id")

	DB.Where("id=?", id).First(&goal)
	write(w, goal)
}

func PostDay(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}

	var goal models.Day
	var goalIsFound models.Day
	if err := json.Unmarshal(body, &goal); err != nil {
		w.Write([]byte(fmt.Sprintf(`{"message":"%v"}`, err.Error())))
		return
	}

	if err := DB.Where("id=?", goal.ID).First(&goalIsFound).Error; err != nil || goalIsFound.ID != goal.ID {
		log.Println(">>>Record not found. Creating Record", err)
		DB.Save(&goal)
		write(w, goal)
		return
	}

	topic := r.PathValue("topic")
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
	write(w, goal)
}

func write(w http.ResponseWriter, obj any) bool {
	if out, err := json.MarshalIndent(obj, "", "  "); err == nil {
		w.Header().Add("Content-Type", "application/json")
		w.Write([]byte(out))
	} else {
		w.Write([]byte(fmt.Sprintf(`{"message":"%v"}`, err.Error())))
		return false
	}

	return true
}
