package handlers

import (
	"fmt"
	"log"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"wildan-news-backend/internal/database"
	"wildan-news-backend/internal/models"
)

func GetNews(c *fiber.Ctx) error {
	var news []models.News
	query := database.DB.Preload("Author").Preload("Category").Preload("Images").Order("created_at desc")
	
	q := c.Query("q")
	if q != "" {
		query = query.Where("LOWER(title) LIKE ?", "%"+strings.ToLower(q)+"%")
	}
	
	query.Find(&news)

	var response []models.NewsResponse
	for _, n := range news {
		var imgPaths []string
		var imgCaptions []string
		for _, img := range n.Images {
			imgPaths = append(imgPaths, img.ImagePath)
			imgCaptions = append(imgCaptions, img.ImageCaption)
		}
		response = append(response, models.NewsResponse{
			ID:            n.ID,
			Judul:         n.Title,
			Kategori:      n.Category.Name,
			Konten:        n.Content,
			ProvinceID:    n.ProvinceID,
			RegencyID:     n.RegencyID,
			DistrictID:    n.DistrictID,
			VillageID:     n.VillageID,
			Images:        imgPaths,
			ImageCaptions: imgCaptions,
			Penulis:       formatAuthorName(n),
			Waktu:         formatWaktuWIB(n.CreatedAt),
			SourceURL:     n.SourceURL,
			Source:        n.Source,
			Status:        n.Status,
			Views:         n.Views,
			Kota:          getRegencyName(n.RegencyID),
			CreatedAt:     n.CreatedAt,
			UpdatedAt:     n.UpdatedAt,
			WaktuUpdate:   formatWaktuWIB(n.UpdatedAt),
		})
	}

	return c.JSON(fiber.Map{
		"success": true,
		"data":    response,
	})
}

func GetNewsByCategory(c *fiber.Ctx) error {
	category := c.Params("category")
	var cat models.Category
	if err := database.DB.Where("slug = ? OR name = ?", category, category).First(&cat).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"success": false, "message": "Category not found"})
	}

	var news []models.News
	database.DB.Preload("Author").Preload("Category").Preload("Images").Where("category_id = ?", cat.ID).Order("created_at desc").Find(&news)

	var response []models.NewsResponse
	for _, n := range news {
		var imgPaths []string
		var imgCaptions []string
		for _, img := range n.Images {
			imgPaths = append(imgPaths, img.ImagePath)
			imgCaptions = append(imgCaptions, img.ImageCaption)
		}
		response = append(response, models.NewsResponse{
			ID:            n.ID,
			Judul:         n.Title,
			Kategori:      n.Category.Name,
			Konten:        n.Content,
			ProvinceID:    n.ProvinceID,
			RegencyID:     n.RegencyID,
			DistrictID:    n.DistrictID,
			VillageID:     n.VillageID,
			Images:        imgPaths,
			ImageCaptions: imgCaptions,
			Penulis:       formatAuthorName(n),
			Waktu:         formatWaktuWIB(n.CreatedAt),
			SourceURL:     n.SourceURL,
			Source:        n.Source,
			Status:        n.Status,
			Views:         n.Views,
			Kota:          getRegencyName(n.RegencyID),
			CreatedAt:     n.CreatedAt,
			UpdatedAt:     n.UpdatedAt,
			WaktuUpdate:   formatWaktuWIB(n.UpdatedAt),
		})
	}

	return c.JSON(fiber.Map{
		"success": true,
		"data":    response,
	})
}

func GetNewsDetail(c *fiber.Ctx) error {
	id := c.Params("id")
	var n models.News
	result := database.DB.Preload("Author").Preload("Category").Preload("Images").First(&n, id)
	if result.Error != nil {
		return c.Status(404).JSON(fiber.Map{
			"success": false,
			"message": "News not found",
		})
	}

	// Increment views count
	n.Views++
	database.DB.Model(&n).UpdateColumn("views", n.Views)

	var imgPaths []string
	var imgCaptions []string
	for _, img := range n.Images {
		imgPaths = append(imgPaths, img.ImagePath)
		imgCaptions = append(imgCaptions, img.ImageCaption)
	}

	response := models.NewsResponse{
		ID:            n.ID,
		Judul:         n.Title,
		Kategori:      n.Category.Name,
		Konten:        n.Content,
		ProvinceID:    n.ProvinceID,
		RegencyID:     n.RegencyID,
		DistrictID:    n.DistrictID,
		VillageID:     n.VillageID,
		Images:        imgPaths,
		ImageCaptions: imgCaptions,
		Penulis:       formatAuthorName(n),
		Waktu:         formatWaktuWIB(n.CreatedAt),
		SourceURL:     n.SourceURL,
		Source:        n.Source,
		Status:        n.Status,
		Views:         n.Views,
		Kota:          getRegencyName(n.RegencyID),
		CreatedAt:     n.CreatedAt,
		UpdatedAt:     n.UpdatedAt,
		WaktuUpdate:   formatWaktuWIB(n.UpdatedAt),
	}

	return c.JSON(fiber.Map{
		"success": true,
		"data":    response,
	})
}

func formatAuthorName(n models.News) string {
	if strings.TrimSpace(n.Author.Name) != "" {
		return strings.TrimSpace(n.Author.Name)
	}
	if strings.TrimSpace(n.Source) != "" {
		return strings.TrimSpace(n.Source)
	}
	return "Redaksi Pasinfo"
}

// helper to format time to WIB
func formatWaktuWIB(t time.Time) string {
	loc, err := time.LoadLocation("Asia/Jakarta")
	if err == nil {
		t = t.In(loc)
	} else {
		t = t.Add(7 * time.Hour)
	}

	months := []string{
		"", "Januari", "Februari", "Maret", "April", "Mei", "Juni",
		"Juli", "Agustus", "September", "Oktober", "November", "Desember",
	}

	return fmt.Sprintf("%d %s %d, %02d:%02d WIB", t.Day(), months[t.Month()], t.Year(), t.Hour(), t.Minute())
}

func getRegencyName(regencyID string) string {
	if regencyID == "" {
		return "PASURUAN"
	}
	var reg models.Regency
	if database.DB.Where("code = ?", regencyID).First(&reg).Error == nil {
		name := strings.TrimSpace(strings.ReplaceAll(strings.ReplaceAll(reg.Name, "KABUPATEN ", ""), "KOTA ", ""))
		return strings.ToUpper(name)
	}
	return "PASURUAN"
}


type CreateNewsRequest struct {
	Title         string   `json:"title"`
	Content       string   `json:"content"`
	CategoryID    uint     `json:"category_id"`
	ProvinceID    string   `json:"province_id"`
	RegencyID     string   `json:"regency_id"`
	DistrictID    string   `json:"district_id"`
	VillageID     string   `json:"village_id"`
	Images        []string `json:"images"`
	ImageCaptions []string `json:"image_captions"`
	AuthorID      uint     `json:"author_id"`
	Status        string   `json:"status"`
}

func CreateNews(c *fiber.Ctx) error {
	var req CreateNewsRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "message": "Invalid request payload"})
	}

	userIDFloat := c.Locals("user_id").(float64)
	authorID := uint(userIDFloat)

	// Validate Author ID exists in DB, fallback if token has stale ID
	var authorUser models.User
	if err := database.DB.First(&authorUser, authorID).Error; err != nil {
		if err := database.DB.Where("role = ?", "penulis").First(&authorUser).Error; err != nil {
			database.DB.First(&authorUser)
		}
		if authorUser.ID != 0 {
			authorID = authorUser.ID
		}
	}

	// Validate Category ID exists in DB, fallback to ID 1 if invalid
	categoryID := req.CategoryID
	if categoryID == 0 {
		categoryID = 1
	}
	var cat models.Category
	if err := database.DB.First(&cat, categoryID).Error; err != nil {
		var firstCat models.Category
		if database.DB.First(&firstCat).Error == nil {
			categoryID = firstCat.ID
		}
	}

	statusTarget := req.Status
	if statusTarget == "" {
		statusTarget = "draft"
	}

	news := models.News{
		Title:      req.Title,
		Content:    req.Content,
		CategoryID: categoryID,
		ProvinceID: req.ProvinceID,
		RegencyID:  req.RegencyID,
		DistrictID: req.DistrictID,
		VillageID:  req.VillageID,
		AuthorID:   authorID,
		Status:     statusTarget,
		SourceURL:  fmt.Sprintf("manual-%d-%d", authorID, time.Now().UnixNano()),
		Source:     "Pasinfo",
	}

	if err := database.DB.Create(&news).Error; err != nil {
		log.Printf("[CreateNews DB Error] %v", err)
		return c.Status(500).JSON(fiber.Map{"success": false, "message": fmt.Sprintf("Failed to create news: %v", err)})
	}

	log.Printf("[CreateNews Request] news_id=%d Images count: %d, Captions count: %d", news.ID, len(req.Images), len(req.ImageCaptions))
	for i, imgPath := range req.Images {
		caption := ""
		if i < len(req.ImageCaptions) {
			caption = req.ImageCaptions[i]
		}
		img := models.NewsImage{
			NewsID:       news.ID,
			ImagePath:    imgPath,
			ImageCaption: caption,
		}
		if err := database.DB.Create(&img).Error; err != nil {
			log.Printf("[CreateNews Image Error] news_id=%d idx=%d: %v", news.ID, i, err)
		}
	}

	database.DB.Preload("Author").Preload("Category").Preload("Images").First(&news, news.ID)

	if statusTarget == "pending" {
		var authorUser models.User
		database.DB.First(&authorUser, authorID)
		authorName := authorUser.Name
		if authorName == "" {
			authorName = "Penulis"
		}
		var editors []models.User
		database.DB.Where("role = ?", "editor").Find(&editors)
		for _, ed := range editors {
			notif := models.Notification{
				UserID:  ed.ID,
				NewsID:  &news.ID,
				Title:   "Artikel Baru Menunggu Review",
				Message: fmt.Sprintf("%s mengajukan artikel '%s'", authorName, news.Title),
				Type:    "info",
			}
			database.DB.Create(&notif)
		}
	}

	return c.Status(201).JSON(fiber.Map{
		"success": true,
		"message": "News created successfully",
		"data":    news,
	})
}

func GetMyNews(c *fiber.Ctx) error {
	userIDFloat := c.Locals("user_id").(float64)
	userID := uint(userIDFloat)

	var news []models.News
	database.DB.Preload("Category").Preload("Images").Where("author_id = ?", userID).Order("created_at desc").Find(&news)

	return c.JSON(fiber.Map{
		"success": true,
		"data":    news,
	})
}

func GetPendingNews(c *fiber.Ctx) error {
	var news []models.News
	database.DB.Preload("Author").Preload("Category").Preload("Images").Where("status = ?", "pending").Order("created_at asc").Find(&news)

	return c.JSON(fiber.Map{
		"success": true,
		"data":    news,
	})
}

type UpdateStatusRequest struct {
	Status  string `json:"status"` // "pending", "revision", "published", "draft"
	Message string `json:"message"` // Reason for revision or rejection
}

func UpdateNewsStatus(c *fiber.Ctx) error {
	id := c.Params("id")
	var req UpdateStatusRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "message": "Invalid request"})
	}

	var news models.News
	if err := database.DB.Preload("Author").First(&news, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"success": false, "message": "News not found"})
	}

	oldStatus := news.Status
	news.Status = req.Status
	database.DB.Save(&news)

	// Create Notification based on status change
	userRole := c.Locals("role").(string)

	if userRole == "penulis" && req.Status == "pending" {
		// Notify editors
		var editors []models.User
		database.DB.Where("role = ?", "editor").Find(&editors)
		for _, ed := range editors {
			notif := models.Notification{
				UserID:  ed.ID,
				NewsID:  &news.ID,
				Title:   "Artikel Baru Menunggu Review",
				Message: fmt.Sprintf("%s mengajukan artikel '%s'", news.Author.Name, news.Title),
				Type:    "info",
			}
			database.DB.Create(&notif)
		}
	} else if userRole == "editor" {
		// Notify author
		notif := models.Notification{
			UserID: news.AuthorID,
			NewsID: &news.ID,
			Type:   "info",
		}
		if req.Status == "revision" {
			notif.Title = "Artikel Perlu Direvisi"
			notif.Message = fmt.Sprintf("Artikel '%s' perlu revisi: %s", news.Title, req.Message)
			notif.Type = "warning"
		} else if req.Status == "published" {
			notif.Title = "Artikel Diterbitkan"
			notif.Message = fmt.Sprintf("Selamat! Artikel '%s' telah disetujui dan diterbitkan.", news.Title)
			notif.Type = "success"
		}
		
		if notif.Title != "" {
			database.DB.Create(&notif)
		}
	}

	return c.JSON(fiber.Map{
		"success": true,
		"message": fmt.Sprintf("Status changed from %s to %s", oldStatus, req.Status),
	})
}

func DeleteNews(c *fiber.Ctx) error {
	id := c.Params("id")
	var news models.News
	if err := database.DB.First(&news, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"success": false, "message": "News not found"})
	}
	
	// Delete associated images first
	database.DB.Where("news_id = ?", news.ID).Delete(&models.NewsImage{})
	
	if err := database.DB.Delete(&news).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "message": "Failed to delete news"})
	}
	
	return c.JSON(fiber.Map{"success": true, "message": "News deleted successfully"})
}

type UpdateNewsRequest struct {
	Title         string   `json:"title"`
	Content       string   `json:"content"`
	CategoryID    uint     `json:"category_id"`
	ProvinceID    string   `json:"province_id"`
	RegencyID     string   `json:"regency_id"`
	DistrictID    string   `json:"district_id"`
	VillageID     string   `json:"village_id"`
	Images        []string `json:"images"`
	ImageCaptions []string `json:"image_captions"`
	Status        string   `json:"status"`
}

func UpdateNews(c *fiber.Ctx) error {
	id := c.Params("id")
	var req UpdateNewsRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "message": "Invalid request"})
	}

	userIDFloat := c.Locals("user_id").(float64)
	authorID := uint(userIDFloat)

	var news models.News
	if err := database.DB.Preload("Author").First(&news, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"success": false, "message": "News not found"})
	}

	userRole := c.Locals("role").(string)
	if news.AuthorID != authorID && userRole != "admin" && userRole != "editor" {
		return c.Status(403).JSON(fiber.Map{"success": false, "message": "Forbidden"})
	}

	news.Title = req.Title
	news.Content = req.Content
	news.CategoryID = req.CategoryID
	news.ProvinceID = req.ProvinceID
	news.RegencyID = req.RegencyID
	news.DistrictID = req.DistrictID
	news.VillageID = req.VillageID
	
	if req.Status != "" {
		news.Status = req.Status
	}

	if news.SourceURL == "" {
		news.SourceURL = fmt.Sprintf("manual-%d-%d", authorID, time.Now().UnixNano())
		news.Source = "Pasinfo"
	}

	if err := database.DB.Save(&news).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "message": "Failed to update news"})
	}

	log.Printf("[UpdateNews Request] news_id=%d Images count: %d, Captions count: %d", news.ID, len(req.Images), len(req.ImageCaptions))
	database.DB.Where("news_id = ?", news.ID).Delete(&models.NewsImage{})
	for i, imgPath := range req.Images {
		caption := ""
		if i < len(req.ImageCaptions) {
			caption = req.ImageCaptions[i]
		}
		img := models.NewsImage{
			NewsID:       news.ID,
			ImagePath:    imgPath,
			ImageCaption: caption,
		}
		if err := database.DB.Create(&img).Error; err != nil {
			log.Printf("[UpdateNews Image Error] news_id=%d idx=%d: %v", news.ID, i, err)
		}
	}

	database.DB.Preload("Author").Preload("Category").Preload("Images").First(&news, news.ID)

	if req.Status == "pending" {
		var editors []models.User
		database.DB.Where("role = ?", "editor").Find(&editors)
		for _, ed := range editors {
			notif := models.Notification{
				UserID:  ed.ID,
				NewsID:  &news.ID,
				Title:   "Artikel Baru Menunggu Review",
				Message: fmt.Sprintf("%s mengajukan artikel '%s'", news.Author.Name, news.Title),
				Type:    "info",
			}
			database.DB.Create(&notif)
		}
	}

	return c.JSON(fiber.Map{
		"success": true,
		"message": "News updated successfully",
		"data":    news,
	})
}

