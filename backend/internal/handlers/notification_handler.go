package handlers

import (
	"wildan-news-backend/internal/database"
	"wildan-news-backend/internal/models"

	"github.com/gofiber/fiber/v2"
)

// GetNotifications retrieves all notifications for the logged-in user
func GetNotifications(c *fiber.Ctx) error {
	userIDFloat := c.Locals("user_id").(float64)
	userID := uint(userIDFloat)

	var notifications []models.Notification
	result := database.DB.Where("user_id = ?", userID).Order("created_at desc").Find(&notifications)
	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{
			"success": false,
			"message": "Failed to fetch notifications",
		})
	}

	return c.JSON(fiber.Map{
		"success": true,
		"data":    notifications,
	})
}

// MarkNotificationRead marks a specific notification as read
func MarkNotificationRead(c *fiber.Ctx) error {
	userIDFloat := c.Locals("user_id").(float64)
	userID := uint(userIDFloat)
	notifID := c.Params("id")

	var notification models.Notification
	if err := database.DB.Where("id = ? AND user_id = ?", notifID, userID).First(&notification).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{
			"success": false,
			"message": "Notification not found",
		})
	}

	notification.IsRead = true
	database.DB.Save(&notification)

	return c.JSON(fiber.Map{
		"success": true,
		"message": "Notification marked as read",
	})
}
