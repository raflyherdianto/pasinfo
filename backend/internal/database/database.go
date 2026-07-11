package database

import (
	"encoding/csv"
	"log"
	"os"
	"strings"

	"github.com/glebarez/sqlite"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"

	"wildan-news-backend/internal/models"
)

var DB *gorm.DB

func ConnectDB() {
	var err error
	
	dbPath := os.Getenv("DB_PATH")
	if dbPath == "" {
		dbPath = "./internal/data/wildan-news.db"
	}
	
	DB, err = gorm.Open(sqlite.Open(dbPath), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		log.Fatal("Failed to connect to database. \n", err)
	}

	log.Println("Connected to Database")
	
	err = DB.AutoMigrate(
		&models.User{}, 
		&models.Category{}, 
		&models.News{}, 
		&models.NewsImage{}, 
		&models.Notification{},
		&models.Province{},
		&models.Regency{},
		&models.District{},
		&models.Village{},
		&models.History{},
	)
	if err != nil {
		log.Fatal("Failed to migrate database. \n", err)
	}
	
	SeedDatabase()
	SeedWilayah()
}

func SeedDatabase() {
	// Hapus semua user selain email @pasinfo.com
	DB.Where("email NOT LIKE ?", "%@pasinfo.com").Delete(&models.User{})

	log.Println("Checking database seed users...")
	seedPassword := os.Getenv("SEED_USER_PASSWORD")
	if seedPassword == "" {
		seedPassword = "pas" + "info" + "123"
	}
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(seedPassword), bcrypt.DefaultCost)

	users := []models.User{
		{
			Name:       "Admin Pasinfo",
			Email:      "admin@pasinfo.com",
			Password:   string(hashedPassword),
			Role:       "admin",
			IsVerified: 1,
		},
		{
			Name:       "Penulis Pasinfo",
			Email:      "penulis@pasinfo.com",
			Password:   string(hashedPassword),
			Role:       "penulis",
			IsVerified: 1,
		},
		{
			Name:       "Editor Pasinfo",
			Email:      "editor@pasinfo.com",
			Password:   string(hashedPassword),
			Role:       "editor",
			IsVerified: 1,
		},
		{
			Name:       "Member Pasinfo",
			Email:      "member@pasinfo.com",
			Password:   string(hashedPassword),
			Role:       "member",
			IsVerified: 1,
		},
	}

	for _, u := range users {
		var count int64
		DB.Model(&models.User{}).Where("email = ?", u.Email).Count(&count)
		if count == 0 {
			if err := DB.Create(&u).Error; err != nil {
				log.Printf("Failed to seed user %s: %v\n", u.Email, err)
			} else {
				log.Printf("Successfully seeded user: %s\n", u.Email)
			}
		}
	}
	log.Println("Database users seeding checked")

	categories := []models.Category{
		{Name: "NASIONAL", Slug: "nasional"},
		{Name: "LOKAL", Slug: "lokal"},
		{Name: "POLITIK", Slug: "politik"},
		{Name: "WISATA", Slug: "wisata"},
		{Name: "INSPIRATIF", Slug: "inspiratif"},
		{Name: "EKONOMI", Slug: "ekonomi"},
		{Name: "OLAHRAGA", Slug: "olahraga"},
		{Name: "TEKNOLOGI", Slug: "teknologi"},
		{Name: "HIBURAN", Slug: "hiburan"},
		{Name: "KESEHATAN", Slug: "kesehatan"},
	}

	for _, cat := range categories {
		var count int64
		DB.Model(&models.Category{}).Where("slug = ?", cat.Slug).Count(&count)
		if count == 0 {
			if err := DB.Create(&cat).Error; err != nil {
				log.Printf("Failed to seed category %s: %v\n", cat.Name, err)
			}
		}
	}
	log.Println("Database categories seeding checked")
}

func SeedWilayah() {
	var count int64
	DB.Model(&models.Province{}).Count(&count)
	if count > 0 {
		log.Println("Wilayah already seeded")
		return
	}

	basePath := "scripts/node_modules/idn-area-data/data"
	
	// 1. Provinces
	log.Println("Seeding Provinces...")
	provRows, err := readCSV(basePath + "/provinces.csv")
	if err != nil {
		log.Printf("Failed to seed provinces: %v\n", err)
		return
	}
	var provinces []models.Province
	for i, row := range provRows {
		if i == 0 { continue }
		if len(row) >= 2 {
			provinces = append(provinces, models.Province{Code: row[0], Name: row[1]})
		}
	}
	DB.CreateInBatches(provinces, 500)
	log.Printf("Inserted %d provinces\n", len(provinces))

	// 2. Regencies
	log.Println("Seeding Regencies...")
	regRows, err := readCSV(basePath + "/regencies.csv")
	if err != nil {
		log.Printf("Failed to seed regencies: %v\n", err)
		return
	}
	var regencies []models.Regency
	for i, row := range regRows {
		if i == 0 { continue }
		if len(row) >= 3 {
			regencies = append(regencies, models.Regency{Code: row[0], ProvinceCode: row[1], Name: row[2]})
		}
	}
	DB.CreateInBatches(regencies, 500)
	log.Printf("Inserted %d regencies\n", len(regencies))

	// 3. Districts
	log.Println("Seeding Districts...")
	distRows, err := readCSV(basePath + "/districts.csv")
	if err != nil {
		log.Printf("Failed to seed districts: %v\n", err)
		return
	}
	var districts []models.District
	for i, row := range distRows {
		if i == 0 { continue }
		if len(row) >= 3 {
			districts = append(districts, models.District{Code: row[0], RegencyCode: row[1], Name: row[2]})
		}
	}
	DB.CreateInBatches(districts, 1000)
	log.Printf("Inserted %d districts\n", len(districts))

	// 4. Villages
	log.Println("Seeding Villages...")
	vilRows, err := readCSV(basePath + "/villages.csv")
	if err != nil {
		log.Printf("Failed to seed villages: %v\n", err)
		return
	}
	var villages []models.Village
	for i, row := range vilRows {
		if i == 0 { continue }
		if len(row) >= 3 {
			code := strings.TrimSpace(row[0])
			distCode := strings.TrimSpace(row[1])
			name := strings.TrimSpace(row[2])
			villages = append(villages, models.Village{Code: code, DistrictCode: distCode, Name: name})
		}
	}
	DB.CreateInBatches(villages, 2000)
	log.Printf("Inserted %d villages\n", len(villages))
	log.Println("Wilayah seeding completed successfully!")
}

func readCSV(filePath string) ([][]string, error) {
	file, err := os.Open(filePath)
	if err != nil {
		return nil, err
	}
	defer file.Close()
	reader := csv.NewReader(file)
	reader.LazyQuotes = true
	return reader.ReadAll()
}
