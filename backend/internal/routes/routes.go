package routes

import (
	"github.com/gofiber/fiber/v2"
	"wildan-news-backend/internal/handlers"
	"wildan-news-backend/internal/middleware"
)

// SetupRoutes registers all API routes for the application.
// Security layers applied:
//   - SecurityHeaders: applied globally on every response
//   - CORSConfig: strict allowlist (pasinfo.com only in production)
//   - RequestID: unique ID attached to every request for traceability
//   - RateLimiter: per-IP rate limiting on auth endpoints
func SetupRoutes(app *fiber.App) {
	// ── Global middleware ────────────────────────────────────────────────────
	app.Use(middleware.RequestID())
	app.Use(middleware.SecurityHeaders())
	app.Use(middleware.CORSConfig())

	// ── Health check (unauthenticated, no rate limit) ────────────────────────
	app.Get("/api/v1/health", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"status": "ok"})
	})

	api := app.Group("/api/v1")

	// ── Auth endpoints (rate-limited: 10 req / 60s per IP) ───────────────────
	auth := api.Group("/auth", middleware.RateLimiter(10, 60))
	auth.Post("/register", handlers.Register)
	auth.Post("/login", handlers.Login)

	// ── File upload (authenticated, rate-limited) ─────────────────────────────
	upload := api.Group("/upload", middleware.Protected(), middleware.RateLimiter(20, 60))
	upload.Post("/image", handlers.UploadImage)

	// ── Categories ────────────────────────────────────────────────────────────
	api.Get("/categories", handlers.GetCategories)
	api.Post("/categories",
		middleware.Protected(),
		middleware.RoleMiddleware("admin"),
		handlers.CreateCategory)
	api.Put("/categories/:id",
		middleware.Protected(),
		middleware.RoleMiddleware("admin"),
		handlers.UpdateCategory)
	api.Delete("/categories/:id",
		middleware.Protected(),
		middleware.RoleMiddleware("admin"),
		handlers.DeleteCategory)

	// ── Users (all protected) ─────────────────────────────────────────────────
	users := api.Group("/users", middleware.Protected())
	users.Get("/", middleware.RoleMiddleware("admin", "editor"), handlers.GetUsers)
	users.Get("/:id", handlers.GetUserDetail)
	users.Post("/", middleware.RoleMiddleware("admin"), handlers.CreateUser)
	// UpdateUser: users can only update themselves (enforced inside handler)
	users.Put("/:id", handlers.UpdateUser)
	users.Delete("/:id", middleware.RoleMiddleware("admin"), handlers.DeleteUser)

	// ── News — public reads ───────────────────────────────────────────────────
	api.Get("/news", handlers.GetNews)
	api.Get("/news/category/:category", handlers.GetNewsByCategory)

	// ── News — protected writes ───────────────────────────────────────────────
	// NOTE: specific sub-routes MUST be declared BEFORE :id wildcard
	api.Post("/news",
		middleware.Protected(),
		middleware.RoleMiddleware("penulis"),
		handlers.CreateNews)
	api.Get("/news/mine",
		middleware.Protected(),
		middleware.RoleMiddleware("penulis"),
		handlers.GetMyNews)
	api.Get("/news/pending",
		middleware.Protected(),
		middleware.RoleMiddleware("editor", "admin"),
		handlers.GetPendingNews)
	api.Put("/news/:id/status",
		middleware.Protected(),
		middleware.RoleMiddleware("penulis", "editor", "admin"),
		handlers.UpdateNewsStatus)
	api.Put("/news/:id",
		middleware.Protected(),
		middleware.RoleMiddleware("penulis", "editor", "admin"),
		handlers.UpdateNews)
	api.Delete("/news/:id",
		middleware.Protected(),
		middleware.RoleMiddleware("admin"),
		handlers.DeleteNews)

	// Wildcard MUST be last
	api.Get("/news/:id", handlers.GetNewsDetail)

	// ── Internal fetch trigger (admin only) ───────────────────────────────────
	api.Post("/news/fetch",
		middleware.Protected(),
		middleware.RoleMiddleware("admin"),
		handlers.FetchNewsFromAPI)

	// ── Notifications ─────────────────────────────────────────────────────────
	notifications := api.Group("/notifications", middleware.Protected())
	notifications.Get("/", handlers.GetNotifications)
	notifications.Put("/:id/read", handlers.MarkNotificationRead)

	// ── Wilayah (public, no auth needed) ─────────────────────────────────────
	wilayah := api.Group("/wilayah")
	wilayah.Get("/provinces", handlers.GetProvinces)
	wilayah.Get("/regencies/:province_code", handlers.GetRegencies)
	wilayah.Get("/districts/:regency_code", handlers.GetDistricts)
	wilayah.Get("/villages/:district_code", handlers.GetVillages)

	// ── Reading history ───────────────────────────────────────────────────────
	histories := api.Group("/histories", middleware.Protected())
	histories.Post("/", handlers.CreateHistory)
	histories.Get("/", handlers.GetMyHistories)
	histories.Delete("/", handlers.DeleteHistory)
}
