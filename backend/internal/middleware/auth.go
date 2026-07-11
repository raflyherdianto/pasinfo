package middleware

import (
	"crypto/rand"
	"encoding/hex"
	"os"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

// ---------------------------------------------------------------------------
// JWT secret — loaded once at startup from env; panics if missing/short
// ---------------------------------------------------------------------------

var jwtSecret []byte

func init() {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		panic("[FATAL] JWT_SECRET environment variable is not set. Refusing to start.")
	}
	if len(secret) < 32 {
		panic("[FATAL] JWT_SECRET must be at least 32 characters long.")
	}
	jwtSecret = []byte(secret)
}

// ---------------------------------------------------------------------------
// SecurityHeaders — applied globally to every response
// ---------------------------------------------------------------------------

func SecurityHeaders() fiber.Handler {
	return func(c *fiber.Ctx) error {
		c.Set("X-Content-Type-Options", "nosniff")
		c.Set("X-Frame-Options", "DENY")
		c.Set("X-XSS-Protection", "1; mode=block")
		c.Set("Referrer-Policy", "strict-origin-when-cross-origin")
		c.Set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
		c.Set("Content-Security-Policy",
			"default-src 'self'; "+
				"script-src 'self'; "+
				"style-src 'self' 'unsafe-inline'; "+
				"img-src 'self' data: https:; "+
				"connect-src 'self' https://api.pasuruaninfo.com https://wilayah.id; "+
				"font-src 'self' https://fonts.gstatic.com; "+
				"frame-ancestors 'none'")
		if os.Getenv("HTTPS") == "true" {
			c.Set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload")
		}
		return c.Next()
	}
}

// ---------------------------------------------------------------------------
// CORSConfig — strict origin allowlist (never wildcard in production)
// ---------------------------------------------------------------------------

func CORSConfig() fiber.Handler {
	allowedOrigins := map[string]struct{}{
		"https://pasuruaninfo.com":     {},
		"https://www.pasuruaninfo.com": {},
	}
	if os.Getenv("APP_ENV") != "production" {
		allowedOrigins["http://localhost:5173"] = struct{}{}
		allowedOrigins["http://localhost:3000"] = struct{}{}
	}

	return func(c *fiber.Ctx) error {
		origin := c.Get("Origin")
		if _, ok := allowedOrigins[origin]; ok {
			c.Set("Access-Control-Allow-Origin", origin)
			c.Set("Vary", "Origin")
		}
		c.Set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
		c.Set("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization, X-Request-ID")
		c.Set("Access-Control-Max-Age", "86400")

		if c.Method() == fiber.MethodOptions {
			return c.SendStatus(fiber.StatusNoContent)
		}
		return c.Next()
	}
}

// ---------------------------------------------------------------------------
// RateLimiter — simple in-memory per-IP bucket
// For multi-instance: replace store with Redis-backed limiter.
// ---------------------------------------------------------------------------

func RateLimiter(max int, windowSec int64) fiber.Handler {
	type entry struct {
		count   int
		resetAt int64
	}
	store := make(map[string]*entry)

	return func(c *fiber.Ctx) error {
		ip := c.IP()
		now := time.Now().Unix()

		e, exists := store[ip]
		if !exists || now >= e.resetAt {
			store[ip] = &entry{count: 1, resetAt: now + windowSec}
			return c.Next()
		}
		e.count++
		if e.count > max {
			c.Set("Retry-After", "60")
			return c.Status(fiber.StatusTooManyRequests).JSON(fiber.Map{
				"success": false,
				"message": "Too many requests. Please slow down.",
			})
		}
		return c.Next()
	}
}

// ---------------------------------------------------------------------------
// RequestID — attach a unique trace ID to every request
// ---------------------------------------------------------------------------

func RequestID() fiber.Handler {
	return func(c *fiber.Ctx) error {
		id := c.Get("X-Request-ID")
		if id == "" {
			b := make([]byte, 8)
			_, _ = rand.Read(b)
			id = hex.EncodeToString(b)
		}
		c.Set("X-Request-ID", id)
		c.Locals("request_id", id)
		return c.Next()
	}
}

// ---------------------------------------------------------------------------
// Protected — JWT Bearer token validation
// ---------------------------------------------------------------------------

func Protected() fiber.Handler {
	return func(c *fiber.Ctx) error {
		authHeader := c.Get("Authorization")
		if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer ") {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"success": false,
				"message": "Missing or invalid authorization header",
			})
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
		token, err := jwt.Parse(tokenString,
			func(t *jwt.Token) (interface{}, error) {
				// Enforce signing algorithm — reject 'none' and any non-HMAC alg
				if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, fiber.ErrUnauthorized
				}
				return jwtSecret, nil
			},
			jwt.WithValidMethods([]string{"HS256"}),
		)

		if err != nil || !token.Valid {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"success": false,
				"message": "Invalid or expired token",
			})
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"success": false,
				"message": "Invalid token claims",
			})
		}

		c.Locals("user_id", claims["user_id"])
		c.Locals("role", claims["role"])
		return c.Next()
	}
}

// ---------------------------------------------------------------------------
// RoleMiddleware — RBAC enforcement
// ---------------------------------------------------------------------------

func RoleMiddleware(allowedRoles ...string) fiber.Handler {
	roleSet := make(map[string]struct{}, len(allowedRoles))
	for _, r := range allowedRoles {
		roleSet[r] = struct{}{}
	}

	return func(c *fiber.Ctx) error {
		userRole, ok := c.Locals("role").(string)
		if !ok || userRole == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"success": false,
				"message": "Unauthorized",
			})
		}
		if _, allowed := roleSet[userRole]; !allowed {
			return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
				"success": false,
				"message": "Forbidden: insufficient permissions",
			})
		}
		return c.Next()
	}
}
