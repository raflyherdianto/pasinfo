package database

import (
	"encoding/csv"
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/glebarez/sqlite"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"

	"wildan-news-backend/internal/models"
)

var DB *gorm.DB

func ConnectDB() {
	var err error
	dbDriver := strings.ToLower(os.Getenv("DB_DRIVER"))

	if dbDriver == "postgres" || dbDriver == "postgresql" || os.Getenv("DB_HOST") != "" {
		host := os.Getenv("DB_HOST")
		if host == "" {
			host = "localhost"
		}
		port := os.Getenv("DB_PORT")
		if port == "" {
			port = "5432"
		}
		user := os.Getenv("DB_USER")
		if user == "" {
			user = "postgres"
		}
		password := os.Getenv("DB_PASSWORD")
		if password == "" {
			if os.Getenv("APP_ENV") == "production" {
				log.Fatal("[FATAL] DB_PASSWORD environment variable is not set in production mode. Refusing to start.")
			}
			password = "postgres"
		}
		dbname := os.Getenv("DB_NAME")
		if dbname == "" {
			dbname = "pasinfo"
		}
		sslmode := os.Getenv("DB_SSLMODE")
		if sslmode == "" {
			sslmode = "disable"
		}

		dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=%s",
			host, user, password, dbname, port, sslmode)

		log.Printf("[Database] Connecting to PostgreSQL at %s:%s (db=%s)...", host, port, dbname)
		DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
			Logger: logger.Default.LogMode(logger.Info),
		})
	} else {
		dbPath := os.Getenv("DB_PATH")
		if dbPath == "" {
			dbPath = "./internal/data/wildan-news.db"
		}
		log.Printf("[Database] Connecting to SQLite at %s...", dbPath)
		DB, err = gorm.Open(sqlite.Open(dbPath), &gorm.Config{
			Logger: logger.Default.LogMode(logger.Info),
		})
	}

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

	if !DB.Migrator().HasColumn("news_images", "image_caption") {
		DB.Migrator().AddColumn(&models.NewsImage{}, "image_caption")
	}
	if DB.Migrator().HasColumn("news", "image_caption") {
		DB.Migrator().DropColumn("news", "image_caption")
	}
	_ = DB.Exec("ALTER TABLE news DROP COLUMN IF EXISTS image_caption").Error
	_ = DB.Exec("ALTER TABLE news_images ADD COLUMN IF NOT EXISTS image_caption text").Error
	if dbDriver == "postgres" || dbDriver == "postgresql" || os.Getenv("DB_HOST") != "" {
		_ = DB.Exec("SELECT setval(pg_get_serial_sequence('news_images', 'id'), coalesce(max(id), 1)) FROM news_images;").Error
		_ = DB.Exec("SELECT setval(pg_get_serial_sequence('news', 'id'), coalesce(max(id), 1)) FROM news;").Error
	}
	
	SeedDatabase()
	SeedWilayah()
}

func SeedDatabase() {
	// Hapus semua user selain email @pasuruaninfo.com
	DB.Where("email NOT LIKE ?", "%@pasuruaninfo.com").Delete(&models.User{})

	log.Println("Checking database seed users...")
	seedPassword := os.Getenv("SEED_USER_PASSWORD")
	if seedPassword == "" {
		if os.Getenv("APP_ENV") == "production" {
			log.Println("[WARN] SEED_USER_PASSWORD is not set — skipping seed user password updates")
			return
		}
		seedPassword = "pasuruaninfo123"
	}
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(seedPassword), bcrypt.DefaultCost)

	users := []models.User{
		{
			Name:       "Admin Pasinfo",
			Email:      "admin@pasuruaninfo.com",
			Password:   string(hashedPassword),
			Role:       "admin",
			IsVerified: 1,
		},
		{
			Name:       "Penulis Pasinfo",
			Email:      "penulis@pasuruaninfo.com",
			Password:   string(hashedPassword),
			Role:       "penulis",
			IsVerified: 1,
		},
		{
			Name:       "Editor Pasinfo",
			Email:      "editor@pasuruaninfo.com",
			Password:   string(hashedPassword),
			Role:       "editor",
			IsVerified: 1,
		},
		{
			Name:       "Member Pasinfo",
			Email:      "member@pasuruaninfo.com",
			Password:   string(hashedPassword),
			Role:       "member",
			IsVerified: 1,
		},
	}

	for _, u := range users {
		var existing models.User
		if err := DB.Where("email = ?", u.Email).First(&existing).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				if err := DB.Create(&u).Error; err != nil {
					log.Printf("Failed to seed user %s: %v\n", u.Email, err)
				} else {
					log.Printf("Successfully seeded user: %s\n", u.Email)
				}
			}
		} else {
			existing.Password = string(hashedPassword)
			if err := DB.Save(&existing).Error; err != nil {
				log.Printf("Failed to update password for user %s: %v\n", u.Email, err)
			} else {
				log.Printf("Successfully updated seed password for user: %s\n", u.Email)
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
