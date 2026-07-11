package main

import (
	"log"
	"os"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/joho/godotenv"
	"wildan-news-backend/internal/database"
	"wildan-news-backend/internal/models"
	"wildan-news-backend/internal/routes"
	"wildan-news-backend/internal/services"
)

func main() {
	// Load .env — only fatal if explicitly required; in containers the .env
	// is provided by the host and godotenv failing is acceptable.
	if err := godotenv.Load(); err != nil {
		log.Println("[Info] No .env file found — using environment variables from OS/container")
	}

	// Guard: refuse to start without critical secrets
	if os.Getenv("JWT_SECRET") == "" {
		log.Fatal("[FATAL] JWT_SECRET is not set. Refusing to start.")
	}

	// Connect to database
	database.ConnectDB()

	// Seed news on first run (non-blocking)
	var newsCount int64
	database.DB.Model(&models.News{}).Count(&newsCount)
	if newsCount == 0 {
		log.Println("[Seed] News table is empty — fetching initial articles...")
		go func() {
			result, err := services.FetchAndSaveNews()
			if err != nil {
				log.Printf("[Seed] Failed: %v", err)
				return
			}
			log.Printf("[Seed] Done — saved=%d skipped=%d errors=%d",
				result.Saved, result.Skipped, result.Errors)
		}()
	}

	// Parse body limit from env (default 10 MB; upload is gated separately)
	bodyLimitMB := 10
	if v := os.Getenv("BODY_LIMIT_MB"); v != "" {
		if n, err := strconv.Atoi(v); err == nil && n > 0 {
			bodyLimitMB = n
		}
	}

	app := fiber.New(fiber.Config{
		// Never expose Fiber version or Go runtime details
		ServerHeader: "",
		AppName:      "",

		// Strict body size limit (DoS protection)
		BodyLimit: bodyLimitMB * 1024 * 1024,

		// Read/Write timeouts to prevent slowloris attacks
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
		IdleTimeout:  120 * time.Second,

		// Disable X-Powered-By equivalent
		DisableDefaultDate: false,

		// Central error handler — never leak internal error details to client
		ErrorHandler: func(c *fiber.Ctx, err error) error {
			code := fiber.StatusInternalServerError
			msg := "An internal error occurred"

			if e, ok := err.(*fiber.Error); ok {
				code = e.Code
				// Only expose user-safe messages for 4xx errors
				if code < 500 {
					msg = e.Message
				}
			}

			requestID, _ := c.Locals("request_id").(string)
			log.Printf("[ERROR] request_id=%s status=%d error=%v", requestID, code, err)

			return c.Status(code).JSON(fiber.Map{
				"success": false,
				"message": msg,
			})
		},
	})

	// Recovery middleware — prevents panics from crashing the whole server
	app.Use(recover.New(recover.Config{
		EnableStackTrace: false, // Never expose stack traces in production
	}))

	// Structured request logging
	app.Use(logger.New(logger.Config{
		Format: "[${time}] ${status} ${method} ${path} latency=${latency} ip=${ip} reqid=${locals:request_id}\n",
		// Do NOT log request bodies — may contain passwords/tokens
	}))

	// Serve static files in the upload directory
	uploadDir := os.Getenv("UPLOAD_DIR")
	if uploadDir == "" {
		uploadDir = "./uploads"
	}
	app.Static("/uploads", uploadDir)

	// Register all routes (security middleware applied inside)
	routes.SetupRoutes(app)

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("[Info] Pasinfo API starting on :%s (env=%s)", port, os.Getenv("APP_ENV"))
	if err := app.Listen(":" + port); err != nil {
		log.Fatalf("[FATAL] Server failed to start: %v", err)
	}
}
