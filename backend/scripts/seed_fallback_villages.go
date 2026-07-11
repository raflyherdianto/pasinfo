//go:build ignore

package main

import (
	"fmt"
	
	"wildan-news-backend/internal/database"
	"wildan-news-backend/internal/models"
)

func main() {
	database.ConnectDB()

	var districts []models.District
	database.DB.Find(&districts)

	var allVillages []models.Village
	for _, d := range districts {
		allVillages = append(allVillages, models.Village{
			Code:         d.Code + ".01",
			Name:         "Desa 1 " + d.Name,
			DistrictCode: d.Code,
		})
		allVillages = append(allVillages, models.Village{
			Code:         d.Code + ".02",
			Name:         "Desa 2 " + d.Name,
			DistrictCode: d.Code,
		})
	}

	if len(allVillages) > 0 {
		database.DB.CreateInBatches(allVillages, 1000)
	}
	
	fmt.Printf("Successfully seeded %d fallback villages!\n", len(allVillages))
}
