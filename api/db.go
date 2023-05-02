package main

import (
	"log"
	"tracker-api/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func getDB() *gorm.DB {
	fileName := "data.db"
	db, err := gorm.Open(sqlite.Open(fileName), &gorm.Config{})
	if err != nil {
		log.Fatalln(err)
	}

	db.AutoMigrate(&models.Day{})

	log.Printf("Successfully Loaded DB from file: %s\n", fileName)
	log.Println(db.Name())
	return db
}
