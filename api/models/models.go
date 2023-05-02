package models

import (
	"time"
)

type Day struct {
	// gorm.Model     // `json:"-"`
	ID        string    `json:"dayId" gorm:"primarykey"` //month-day-year
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
	SitUps    int       `json:"sitUps"`
	PushUps   int       `json:"pushUps"`
	Squats    int       `json:"squats"`
	Extra     string    `json:"extra"`
}
