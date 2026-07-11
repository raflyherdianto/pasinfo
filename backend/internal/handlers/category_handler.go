package handlers

import (
	"github.com/gofiber/fiber/v2"
	"wildan-news-backend/internal/database"
	"wildan-news-backend/internal/models"
)

func GetCategories(c *fiber.Ctx) error {
	var categories []models.Category
	if err := database.DB.Find(&categories).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"success": false,
			"message": "Failed to fetch categories",
		})
	}
	
	return c.JSON(fiber.Map{
		"success": true,
		"data":    categories,
	})
}

func CreateCategory(c *fiber.Ctx) error {
	type Request struct {
		Name string `json:"name"`
		Slug string `json:"slug"`
	}
	var req Request
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "message": "Invalid request body"})
	}
	if req.Name == "" || req.Slug == "" {
		return c.Status(400).JSON(fiber.Map{"success": false, "message": "Name and Slug are required"})
	}
	cat := models.Category{Name: req.Name, Slug: req.Slug}
	if err := database.DB.Create(&cat).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "message": "Failed to create category"})
	}
	return c.JSON(fiber.Map{"success": true, "data": cat})
}

func UpdateCategory(c *fiber.Ctx) error {
	id := c.Params("id")
	var cat models.Category
	if err := database.DB.First(&cat, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"success": false, "message": "Category not found"})
	}
	type Request struct {
		Name string `json:"name"`
		Slug string `json:"slug"`
	}
	var req Request
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "message": "Invalid request body"})
	}
	if req.Name != "" {
		cat.Name = req.Name
	}
	if req.Slug != "" {
		cat.Slug = req.Slug
	}
	if err := database.DB.Save(&cat).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "message": "Failed to update category"})
	}
	return c.JSON(fiber.Map{"success": true, "data": cat})
}

func DeleteCategory(c *fiber.Ctx) error {
	id := c.Params("id")
	var cat models.Category
	if err := database.DB.First(&cat, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"success": false, "message": "Category not found"})
	}
	if err := database.DB.Delete(&cat).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "message": "Failed to delete category"})
	}
	return c.JSON(fiber.Map{"success": true, "message": "Category deleted successfully"})
}
