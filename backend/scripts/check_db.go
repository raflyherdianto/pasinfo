//go:build ignore

package main
import (
	"fmt"
	"wildan-news-backend/internal/database"
	"wildan-news-backend/internal/models"
)
func main() {
	database.ConnectDB()
	_ = database.DB.Exec("SELECT setval(pg_get_serial_sequence('news_images', 'id'), coalesce(max(id), 1)) FROM news_images;").Error
	testImg := models.NewsImage{
		NewsID:       1,
		ImagePath:    "http://test-image.jpg",
		ImageCaption: "Test Caption",
	}
	err := database.DB.Create(&testImg).Error
	fmt.Printf("Create NewsImage Error: %v, Created ID: %d\n", err, testImg.ID)
}
