//go:build ignore

package main

import (
	"encoding/csv"
	"fmt"
	"os"
	"strings"
	"wildan-news-backend/internal/database"
	"wildan-news-backend/internal/models"
)

func readCSV(filePath string) ([][]string, error) {
	file, err := os.Open(filePath)
	if err != nil {
		return nil, err
	}
	defer file.Close()
	reader := csv.NewReader(file)
	// Some CSVs might not be perfectly formatted
	reader.LazyQuotes = true
	return reader.ReadAll()
}

func main() {
	database.ConnectDB()

	// Drop and recreate tables to ensure clean state
	database.DB.Migrator().DropTable(&models.Province{}, &models.Regency{}, &models.District{}, &models.Village{})
	database.DB.AutoMigrate(&models.Province{}, &models.Regency{}, &models.District{}, &models.Village{})

	// Path to idn-area-data
	basePath := "scripts/node_modules/idn-area-data/data"

	// 1. Provinces
	fmt.Println("Seeding Provinces...")
	provRows, err := readCSV(basePath + "/provinces.csv")
	if err != nil {
		panic(err)
	}
	var provinces []models.Province
	for i, row := range provRows {
		if i == 0 { continue }
		if len(row) >= 2 {
			provinces = append(provinces, models.Province{Code: row[0], Name: row[1]})
		}
	}
	database.DB.CreateInBatches(provinces, 500)
	fmt.Printf("Inserted %d provinces\n", len(provinces))

	// 2. Regencies
	fmt.Println("Seeding Regencies...")
	regRows, err := readCSV(basePath + "/regencies.csv")
	if err != nil {
		panic(err)
	}
	var regencies []models.Regency
	for i, row := range regRows {
		if i == 0 { continue }
		if len(row) >= 3 {
			regencies = append(regencies, models.Regency{Code: row[0], ProvinceCode: row[1], Name: row[2]})
		}
	}
	database.DB.CreateInBatches(regencies, 500)
	fmt.Printf("Inserted %d regencies\n", len(regencies))

	// 3. Districts
	fmt.Println("Seeding Districts...")
	distRows, err := readCSV(basePath + "/districts.csv")
	if err != nil {
		panic(err)
	}
	var districts []models.District
	for i, row := range distRows {
		if i == 0 { continue }
		if len(row) >= 3 {
			districts = append(districts, models.District{Code: row[0], RegencyCode: row[1], Name: row[2]})
		}
	}
	database.DB.CreateInBatches(districts, 1000)
	fmt.Printf("Inserted %d districts\n", len(districts))

	// 4. Villages
	fmt.Println("Seeding Villages...")
	vilRows, err := readCSV(basePath + "/villages.csv")
	if err != nil {
		panic(err)
	}
	var villages []models.Village
	for i, row := range vilRows {
		if i == 0 { continue }
		if len(row) >= 3 {
			// Clean any invisible characters or wrong spacing
			code := strings.TrimSpace(row[0])
			distCode := strings.TrimSpace(row[1])
			name := strings.TrimSpace(row[2])
			villages = append(villages, models.Village{Code: code, DistrictCode: distCode, Name: name})
		}
	}
	database.DB.CreateInBatches(villages, 2000)
	fmt.Printf("Inserted %d villages\n", len(villages))

	fmt.Println("All real wilayah data successfully seeded from NPM package!")
}
