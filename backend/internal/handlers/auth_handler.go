package handlers

import (
	cryptorand "crypto/rand"
	"encoding/hex"
	"fmt"
	"io"
	"mime/multipart"
	"os"
	"path/filepath"
	"strings"
	"time"
	"unicode/utf8"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"wildan-news-backend/internal/database"
	"wildan-news-backend/internal/models"
)

// ---------------------------------------------------------------------------
// JWT secret — shared from middleware via this package-level var
// Loaded at init() time from ENV; panics if missing (same guard as middleware).
// ---------------------------------------------------------------------------

var jwtSecret []byte

func init() {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		panic("[FATAL] JWT_SECRET environment variable is not set.")
	}
	jwtSecret = []byte(secret)
}

// ---------------------------------------------------------------------------
// Input structs
// ---------------------------------------------------------------------------

type RegisterInput struct {
	Name      string `json:"name"`
	Email     string `json:"email"`
	Phone     string `json:"phone"`
	Password  string `json:"password"`
	Provinsi  string `json:"provinsi"`
	KotaKab   string `json:"kota_kab"`
	Kecamatan string `json:"kecamatan"`
	Kelurahan string `json:"kelurahan"`
	Alamat    string `json:"alamat"`
	// Role and IsVerified are NOT accepted from client — set server-side
}

type LoginInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

func validateRegisterInput(input RegisterInput) string {
	if strings.TrimSpace(input.Name) == "" {
		return "Name is required"
	}
	if utf8.RuneCountInString(input.Name) > 100 {
		return "Name is too long (max 100 chars)"
	}
	if !isValidEmail(input.Email) {
		return "Invalid email address"
	}
	if len(input.Password) < 8 {
		return "Password must be at least 8 characters"
	}
	if len(input.Password) > 128 {
		return "Password is too long"
	}
	return ""
}

func isValidEmail(email string) bool {
	email = strings.TrimSpace(email)
	if len(email) == 0 || len(email) > 254 {
		return false
	}
	at := strings.LastIndex(email, "@")
	if at < 1 || at >= len(email)-1 {
		return false
	}
	domain := email[at+1:]
	return strings.Contains(domain, ".")
}

// ---------------------------------------------------------------------------
// Register
// ---------------------------------------------------------------------------

func Register(c *fiber.Ctx) error {
	var input RegisterInput
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false, "message": "Invalid request body",
		})
	}

	if msg := validateRegisterInput(input); msg != "" {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(fiber.Map{
			"success": false, "message": msg,
		})
	}

	// Sanitize strings
	input.Name = strings.TrimSpace(input.Name)
	input.Email = strings.ToLower(strings.TrimSpace(input.Email))
	input.Phone = strings.TrimSpace(input.Phone)

	// Check for duplicate email
	var existing models.User
	if err := database.DB.Where("email = ?", input.Email).First(&existing).Error; err == nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"success": false, "message": "Email already registered",
		})
	}

	// Use bcrypt cost 12 (higher than DefaultCost=10 for production hardening)
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), 12)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false, "message": "Registration failed",
		})
	}

	user := models.User{
		Name:       input.Name,
		Email:      input.Email,
		Phone:      input.Phone,
		Password:   string(hashedPassword),
		Role:       "member", // ALWAYS assign member — role cannot be supplied by client
		Provinsi:   input.Provinsi,
		KotaKab:    input.KotaKab,
		Kecamatan:  input.Kecamatan,
		Kelurahan:  input.Kelurahan,
		Alamat:     input.Alamat,
		IsVerified: 0, // must be verified through admin flow
	}

	if err := database.DB.Create(&user).Error; err != nil {
		// Do not leak DB error details to client
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false, "message": "Registration failed",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"success": true,
		"message": "Registration successful",
		"data": fiber.Map{
			"id":    user.ID,
			"name":  user.Name,
			"email": user.Email,
			"role":  user.Role,
		},
	})
}

// ---------------------------------------------------------------------------
// Login
// ---------------------------------------------------------------------------

func Login(c *fiber.Ctx) error {
	var input LoginInput
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false, "message": "Invalid request body",
		})
	}

	input.Email = strings.ToLower(strings.TrimSpace(input.Email))

	if !isValidEmail(input.Email) || len(input.Password) == 0 {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"success": false, "message": "Invalid credentials",
		})
	}

	var user models.User
	if err := database.DB.Where("email = ?", input.Email).First(&user).Error; err != nil {
		// Constant-time response to prevent user enumeration
		_ = bcrypt.CompareHashAndPassword([]byte("$2a$12$dummy.hash.to.prevent.timing.attacks"), []byte(input.Password))
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"success": false, "message": "Invalid credentials",
		})
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"success": false, "message": "Invalid credentials",
		})
	}

	// JWT with short expiry (24h) — implement refresh tokens for production
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"role":    user.Role,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
		"iat":     time.Now().Unix(),
	})

	t, err := token.SignedString(jwtSecret)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false, "message": "Authentication failed",
		})
	}

	return c.JSON(fiber.Map{
		"success": true,
		"message": "Login successful",
		"data": fiber.Map{
			"token": t,
			"user": fiber.Map{
				"id":          user.ID,
				"name":        user.Name,
				"email":       user.Email,
				"role":        user.Role,
				"photo":       user.Photo,
				"is_verified": user.IsVerified,
			},
		},
	})
}

// ---------------------------------------------------------------------------
// UploadImage — secure file upload endpoint
// POST /api/v1/upload/image
// Accepts: multipart/form-data, field name: "image"
// Returns: { "success": true, "url": "/uploads/images/<safe-filename>" }
// ---------------------------------------------------------------------------

func UploadImage(c *fiber.Ctx) error {
	file, err := c.FormFile("image")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false, "message": "No image file provided",
		})
	}

	// Delegate to the security validator
	if err := validateImageFile(file); err != nil {
		return c.Status(err.(*fiber.Error).Code).JSON(fiber.Map{
			"success": false, "message": err.Error(),
		})
	}

	// Generate a safe, unique filename — never trust the client filename
	ext := strings.ToLower(filepath.Ext(file.Filename))
	safeName := fmt.Sprintf("%d_%s%s", time.Now().UnixNano(), randomHex(8), ext)

	// Resolve upload directory — configurable via env
	uploadDir := os.Getenv("UPLOAD_DIR")
	if uploadDir == "" {
		uploadDir = "/app/uploads/images"
	}
	if err := os.MkdirAll(uploadDir, 0750); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false, "message": "Upload directory unavailable",
		})
	}

	// Construct the absolute destination path and verify it stays inside uploadDir
	destPath := filepath.Join(uploadDir, safeName)
	if !strings.HasPrefix(destPath, filepath.Clean(uploadDir)+string(os.PathSeparator)) {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false, "message": "Invalid filename",
		})
	}

	if err := c.SaveFile(file, destPath); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false, "message": "Failed to save file",
		})
	}

	// Return a relative URL — NGINX will serve /uploads/ as a static location
	relURL := fmt.Sprintf("/uploads/images/%s", safeName)
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"success": true,
		"url":     relURL,
	})
}

// validateImageFile performs multi-layer validation on a multipart file:
// 1. Size limit (5 MB)
// 2. Extension allowlist
// 3. Magic bytes MIME detection
func validateImageFile(fh *multipart.FileHeader) error {
	const maxSize = 5 * 1024 * 1024 // 5 MB

	if fh.Size > maxSize {
		return fiber.NewError(fiber.StatusRequestEntityTooLarge,
			"File too large. Maximum allowed size is 5 MB")
	}

	ext := strings.ToLower(filepath.Ext(fh.Filename))
	allowedExt := map[string]bool{".jpg": true, ".jpeg": true, ".png": true, ".webp": true}
	if !allowedExt[ext] {
		return fiber.NewError(fiber.StatusUnsupportedMediaType,
			"File extension not allowed. Accepted: jpg, jpeg, png, webp")
	}

	// Magic bytes check — open and read first 512 bytes
	f, err := fh.Open()
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Cannot open uploaded file")
	}
	defer f.Close()

	buf := make([]byte, 512)
	n, err := io.ReadFull(f, buf)
	if err != nil && err != io.ErrUnexpectedEOF {
		return fiber.NewError(fiber.StatusBadRequest, "Cannot read uploaded file")
	}

	detected := detectMIME(buf[:n])
	allowedMIME := map[string]bool{
		"image/jpeg": true,
		"image/png":  true,
		"image/webp": true,
	}
	if !allowedMIME[detected] {
		return fiber.NewError(fiber.StatusUnsupportedMediaType,
			"File content does not match an allowed image type (JPG/PNG/WEBP)")
	}

	return nil
}

// detectMIME reads magic bytes and returns the MIME type string.
func detectMIME(buf []byte) string {
	if len(buf) < 4 {
		return "application/octet-stream"
	}
	// JPEG: FF D8 FF
	if buf[0] == 0xFF && buf[1] == 0xD8 && buf[2] == 0xFF {
		return "image/jpeg"
	}
	// PNG: 89 50 4E 47 0D 0A 1A 0A
	if buf[0] == 0x89 && buf[1] == 0x50 && buf[2] == 0x4E && buf[3] == 0x47 {
		return "image/png"
	}
	// WebP: RIFF????WEBP
	if len(buf) >= 12 &&
		buf[0] == 0x52 && buf[1] == 0x49 && buf[2] == 0x46 && buf[3] == 0x46 &&
		buf[8] == 0x57 && buf[9] == 0x45 && buf[10] == 0x42 && buf[11] == 0x50 {
		return "image/webp"
	}
	return "application/octet-stream"
}

// randomHex returns n cryptographically-random hex bytes as a string.
func randomHex(n int) string {
	b := make([]byte, n)
	_, _ = cryptorand.Read(b)
	return hex.EncodeToString(b)
}
