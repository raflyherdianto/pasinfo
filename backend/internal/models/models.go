package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name       string `json:"name"`
	Email      string `json:"email" gorm:"unique"`
	Password   string `json:"-"` // Not returning password in JSON
	Role       string `json:"role"` // "member", "penulis", "editor", "admin"
	Phone      string `json:"phone"`
	Provinsi   string `json:"provinsi"`
	KotaKab    string `json:"kota_kab"`
	Kecamatan  string `json:"kecamatan"`
	Kelurahan  string `json:"kelurahan"`
	Alamat     string `json:"alamat"`
	Photo      string `json:"photo"`
	IsVerified int    `json:"is_verified"`
	TotalXP    int    `json:"total_xp"`
}

type News struct {
	gorm.Model
	Title      string      `json:"judul"`
	CategoryID uint        `json:"category_id"`
	Category   Category    `json:"kategori" gorm:"foreignKey:CategoryID"`
	Content    string      `json:"konten"`
	ProvinceID string      `json:"province_id"`
	RegencyID  string      `json:"regency_id"`
	DistrictID string      `json:"district_id"`
	VillageID  string      `json:"village_id"`
	Images     []NewsImage `json:"images" gorm:"foreignKey:NewsID"`
	AuthorID   uint        `json:"author_id"`
	Author     User        `json:"penulis" gorm:"foreignKey:AuthorID"`
	Views      int         `json:"views"`
	Status     string      `json:"status" gorm:"default:'draft'"` // "draft", "pending", "revision", "published"
	SourceURL  string      `json:"source_url" gorm:"uniqueIndex"` // URL asli artikel (untuk deduplication)
	Source     string      `json:"source"`                        // nama sumber (misal: "Kompas", "NewsAPI")
}

// For returning formatted time in JSON like "10 menit", we can use a custom response struct or calculate on the frontend.
// Since frontend expects 'waktu', we can format the created_at appropriately.
type NewsResponse struct {
	ID            uint      `json:"id"`
	Judul         string    `json:"judul"`
	Kategori      string    `json:"kategori"`
	Konten        string    `json:"konten"`
	ProvinceID    string    `json:"province_id"`
	RegencyID     string    `json:"regency_id"`
	DistrictID    string    `json:"district_id"`
	VillageID     string    `json:"village_id"`
	Images        []string  `json:"images"`
	ImageCaptions []string  `json:"image_captions"`
	Penulis       string    `json:"penulis"`
	Waktu         string    `json:"waktu"`
	SourceURL     string    `json:"source_url"`
	Source        string    `json:"source"`
	Status        string    `json:"status"`
	Views         int       `json:"views"`
	Kota          string    `json:"kota"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
	WaktuUpdate   string    `json:"waktu_update"`
}

type Province struct {
	Code string `json:"code" gorm:"primaryKey"`
	Name string `json:"name"`
}

type Regency struct {
	Code         string `json:"code" gorm:"primaryKey"`
	Name         string `json:"name"`
	ProvinceCode string `json:"province_code"`
}

type District struct {
	Code        string `json:"code" gorm:"primaryKey"`
	Name        string `json:"name"`
	RegencyCode string `json:"regency_code"`
}

type Village struct {
	Code         string `json:"code" gorm:"primaryKey"`
	Name         string `json:"name"`
	DistrictCode string `json:"district_code"`
}

type Category struct {
	gorm.Model
	Name string `json:"name" gorm:"unique"`
	Slug string `json:"slug" gorm:"unique"`
}

type NewsImage struct {
	ID           uint   `json:"id" gorm:"primaryKey"`
	NewsID       uint   `json:"news_id"`
	ImagePath    string `json:"image_path"`
	ImageCaption string `json:"image_caption" gorm:"type:text"`
}

type Notification struct {
	gorm.Model
	UserID  uint   `json:"user_id"`
	User    User   `json:"user" gorm:"foreignKey:UserID"`
	NewsID  *uint  `json:"news_id"` // Optional reference to the news article
	News    *News  `json:"news" gorm:"foreignKey:NewsID"`
	Title   string `json:"title"`
	Message string `json:"message"`
	Type    string `json:"type"`    // e.g., "info", "warning", "success"
	IsRead  bool   `json:"is_read" gorm:"default:false"`
}

type History struct {
	gorm.Model
	UserID       uint   `json:"user_id"`
	User         User   `json:"-" gorm:"foreignKey:UserID"`
	NewsID       uint   `json:"news_id"`
	News         News   `json:"news" gorm:"foreignKey:NewsID"`
	ActivityType string `json:"activity_type"` // "read" or "bookmark"
}
