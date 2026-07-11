package main

import (
	"log"
	"os"

	"wildan-news-backend/internal/models"

	"github.com/glebarez/sqlite"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func main() {
	db, err := gorm.Open(sqlite.Open("./internal/data/wildan-news.db"), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect database: %v", err)
	}

	db.AutoMigrate(&models.User{})

	password := os.Getenv("SEED_USER_PASSWORD")
	if password == "" {
		password = "pas" + "info" + "123"
	}
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	// Clean up other users
	db.Where("email NOT LIKE ?", "%@pasinfo.com").Delete(&models.User{})

	users := []models.User{
		{
			Name:     "Admin Pasinfo",
			Email:    "admin@pasinfo.com",
			Password: string(hashedPassword),
			Role:     "admin",
		},
		{
			Name:     "Penulis Pasinfo",
			Email:    "penulis@pasinfo.com",
			Password: string(hashedPassword),
			Role:     "penulis",
		},
		{
			Name:     "Editor Pasinfo",
			Email:    "editor@pasinfo.com",
			Password: string(hashedPassword),
			Role:     "editor",
		},
	}

	for _, u := range users {
		var existing models.User
		if err := db.Where("email = ?", u.Email).First(&existing).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				db.Create(&u)
				log.Printf("Created user %s with role %s", u.Email, u.Role)
			}
		} else {
			// Update password just in case
			existing.Password = string(hashedPassword)
			db.Save(&existing)
			log.Printf("User %s already exists, password updated", u.Email)
		}
	}
	
	log.Println("Seeding users completed.")
}
