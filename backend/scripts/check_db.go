//go:build ignore

package main
import (
	"fmt"
	"wildan-news-backend/internal/database"
	"wildan-news-backend/internal/models"
)
func main() {
	database.ConnectDB()
	var c int64
	database.DB.Model(&models.Province{}).Count(&c)
	fmt.Println("Provinces:", c)
	database.DB.Model(&models.Regency{}).Count(&c)
	fmt.Println("Regencies:", c)
	database.DB.Model(&models.District{}).Count(&c)
	fmt.Println("Districts:", c)
	database.DB.Model(&models.Village{}).Count(&c)
	fmt.Println("Villages:", c)
}
