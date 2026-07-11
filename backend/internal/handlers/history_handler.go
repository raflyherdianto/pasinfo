package handlers

import (
	"github.com/gofiber/fiber/v2"
	"wildan-news-backend/internal/database"
	"wildan-news-backend/internal/models"
)

type HistoryRequest struct {
	NewsID       uint   `json:"news_id"`
	ActivityType string `json:"activity_type"` // "read" or "bookmark"
}

func CreateHistory(c *fiber.Ctx) error {
	userIDFloat := c.Locals("user_id").(float64)
	userID := uint(userIDFloat)

	var req HistoryRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": false, "message": "Invalid input"})
	}

	if req.ActivityType != "read" && req.ActivityType != "bookmark" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": false, "message": "Invalid activity type"})
	}

	// Verify news exists
	var news models.News
	if err := database.DB.First(&news, req.NewsID).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"success": false, "message": "News not found"})
	}

	// Check if already exists
	var existing models.History
	err := database.DB.Where("user_id = ? AND news_id = ? AND activity_type = ?", userID, req.NewsID, req.ActivityType).First(&existing).Error

	if err == nil {
		// Already exists, just return success (no double XP)
		return c.JSON(fiber.Map{"success": true, "message": "History already recorded"})
	}

	// Create history
	history := models.History{
		UserID:       userID,
		NewsID:       req.NewsID,
		ActivityType: req.ActivityType,
	}

	if err := database.DB.Create(&history).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"success": false, "message": "Failed to save history"})
	}

	// Calculate and update user's total_xp
	xpReward := 0
	if req.ActivityType == "read" {
		xpReward = 10
	} else if req.ActivityType == "bookmark" {
		xpReward = 20
	}

	if xpReward > 0 {
		var user models.User
		if err := database.DB.First(&user, userID).Error; err == nil {
			user.TotalXP += xpReward
			database.DB.Save(&user)
		}
	}

	return c.JSON(fiber.Map{"success": true, "message": "History recorded successfully"})
}

func GetMyHistories(c *fiber.Ctx) error {
	userIDFloat := c.Locals("user_id").(float64)
	userID := uint(userIDFloat)

	activityType := c.Query("activity_type") // Optional filter

	var histories []models.History
	query := database.DB.Preload("News").Preload("News.Category").Preload("News.Images").Preload("News.Author").Where("user_id = ?", userID)
	if activityType != "" {
		query = query.Where("activity_type = ?", activityType)
	}

	if err := query.Order("created_at desc").Find(&histories).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"success": false, "message": "Failed to fetch histories"})
	}

	// Format response to match frontend expectations
	var formattedList []fiber.Map
	for _, h := range histories {
		// Prepare images
		var imgList []string
		for _, img := range h.News.Images {
			imgList = append(imgList, img.ImagePath)
		}

		formattedList = append(formattedList, fiber.Map{
			"id":         h.News.ID,
			"judul":      h.News.Title,
			"kategori":   h.News.Category.Name,
			"konten":     h.News.Content,
			"waktu":      h.News.CreatedAt.Format("02 January 2006 15:04") + " WIB",
			"images":     imgList,
			"penulis":    h.News.Author.Name,
			"readAt":     h.CreatedAt,
			"created_at": h.News.CreatedAt,
		})
	}

	return c.JSON(fiber.Map{"success": true, "data": formattedList})
}

func DeleteHistory(c *fiber.Ctx) error {
	userIDFloat := c.Locals("user_id").(float64)
	userID := uint(userIDFloat)

	newsID := c.QueryInt("news_id")
	activityType := c.Query("activity_type")

	if newsID == 0 || activityType == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": false, "message": "Missing parameters"})
	}

	var history models.History
	err := database.DB.Where("user_id = ? AND news_id = ? AND activity_type = ?", userID, newsID, activityType).First(&history).Error
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"success": false, "message": "History record not found"})
	}

	if err := database.DB.Delete(&history).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"success": false, "message": "Failed to delete history"})
	}

	// If deleting bookmark, subtract 20 XP
	if activityType == "bookmark" {
		var user models.User
		if err := database.DB.First(&user, userID).Error; err == nil {
			user.TotalXP -= 20
			if user.TotalXP < 0 {
				user.TotalXP = 0
			}
			database.DB.Save(&user)
		}
	}

	return c.JSON(fiber.Map{"success": true, "message": "History deleted successfully"})
}
