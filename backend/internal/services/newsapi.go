package services

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/go-shiori/go-readability"
	"wildan-news-backend/internal/database"
	"wildan-news-backend/internal/models"
)

// --- Berita Indo API Response Types ---

type beritaArticleImage struct {
	Small string
	Large string
}

// UnmarshalJSON menangani dua format image:
// - object: {"small":"...","large":"..."} (CNN, CNBC, Tempo)
// - string:  "https://..." (Antara)
func (img *beritaArticleImage) UnmarshalJSON(data []byte) error {
	// Coba sebagai string dulu
	var s string
	if json.Unmarshal(data, &s) == nil {
		img.Small = s
		img.Large = s
		return nil
	}
	// Coba sebagai object
	var obj struct {
		Small string `json:"small"`
		Large string `json:"large"`
	}
	if json.Unmarshal(data, &obj) == nil {
		img.Small = obj.Small
		img.Large = obj.Large
	}
	return nil // abaikan error parse image
}

type beritaArticle struct {
	Title          string             `json:"title"`
	Link           string             `json:"link"`
	ContentSnippet string             `json:"contentSnippet"`
	IsoDate        string             `json:"isoDate"`
	Image          beritaArticleImage `json:"image"`
}

type beritaAPIResponse struct {
	Data     []beritaArticle `json:"data"`
	Messages string          `json:"messages"`
	Total    int             `json:"total"`
}

// FetchResult berisi statistik hasil fetch
type FetchResult struct {
	Fetched int
	Saved   int
	Skipped int
	Errors  int
}

const beritaBaseURL = "https://berita-indo-api-next.vercel.app/api"

// getOrCreateSystemUser memastikan ada system user untuk artikel yang difetch
func getOrCreateNewsAPIUser() (models.User, error) {
	var user models.User
	result := database.DB.Where("email = ?", "newsapi@pasinfo.com").First(&user)
	if result.Error == nil {
		return user, nil
	}
	user = models.User{
		Name:     "Berita Indo Bot",
		Email:    "newsapi@pasinfo.com",
		Password: "",
		Role:     "penulis",
	}
	if err := database.DB.Create(&user).Error; err != nil {
		return user, fmt.Errorf("gagal membuat system user: %w", err)
	}
	log.Println("[BeritaIndo] System user dibuat")
	return user, nil
}

// fetchFromBeritaIndo mengambil artikel dari satu endpoint berita-indo-api
func fetchFromBeritaIndo(client *http.Client, url string, categoryID uint, sysUser models.User, result *FetchResult) {
	resp, err := client.Get(url)
	if err != nil {
		log.Printf("[BeritaIndo] Gagal fetch %s: %v", url, err)
		result.Errors++
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		log.Printf("[BeritaIndo] HTTP %d dari %s", resp.StatusCode, url)
		result.Errors++
		return
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Printf("[BeritaIndo] Gagal baca response: %v", err)
		result.Errors++
		return
	}

	var apiResp beritaAPIResponse
	if err := json.Unmarshal(body, &apiResp); err != nil {
		log.Printf("[BeritaIndo] Gagal parse JSON dari %s: %v", url, err)
		result.Errors++
		return
	}

	result.Fetched += len(apiResp.Data)

	for _, article := range apiResp.Data {
		// Lewati artikel tanpa judul atau URL
		if strings.TrimSpace(article.Title) == "" || strings.TrimSpace(article.Link) == "" {
			result.Skipped++
			continue
		}

		// Cek duplikasi berdasarkan SourceURL
		var existing models.News
		if database.DB.Where("source_url = ?", article.Link).First(&existing).Error == nil {
			result.Skipped++
			continue
		}

		// Parse waktu publikasi (ISO 8601)
		pubTime, err := time.Parse(time.RFC3339, article.IsoDate)
		if err != nil {
			pubTime = time.Now()
		}

		// Scrape full article content using readability instead of snippet
		content := ""
		scraped, err := readability.FromURL(article.Link, 5*time.Second)
		if err == nil && scraped.TextContent != "" {
			content = strings.TrimSpace(scraped.TextContent)
		}
		if content == "" {
			content = strings.TrimSpace(article.ContentSnippet)
		}
		if content == "" {
			content = article.Title
		}

		// Gambar: prioritas large → small → fallback
		imageURL := article.Image.Large
		if imageURL == "" {
			imageURL = article.Image.Small
		}
		if imageURL == "" {
			imageURL = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800"
		}

		news := models.News{
			Title:     article.Title,
			CategoryID: categoryID,
			Content:   content,
			Images:    []models.NewsImage{{ImagePath: imageURL}},
			AuthorID:  sysUser.ID,
			Views:     0,
			Status:    "published",
			SourceURL: article.Link,
			Source:    sourceName(url),
		}
		news.CreatedAt = pubTime

		if err := database.DB.Create(&news).Error; err != nil {
			log.Printf("[BeritaIndo] Gagal simpan '%s': %v", article.Title, err)
			result.Errors++
			continue
		}
		result.Saved++
	}
}

// sourceName mengekstrak nama sumber dari URL endpoint
func sourceName(endpointURL string) string {
	parts := strings.Split(endpointURL, "/api/")
	if len(parts) < 2 {
		return "berita-indo-api"
	}
	// Ambil bagian pertama sebelum '/'
	name := strings.Split(parts[1], "/")[0]
	// Mapping ke nama manusiawi
	switch {
	case strings.HasPrefix(name, "cnn"):
		return "CNN Indonesia"
	case strings.HasPrefix(name, "cnbc"):
		return "CNBC Indonesia"
	case strings.HasPrefix(name, "republika"):
		return "Republika"
	case strings.HasPrefix(name, "tempo"):
		return "Tempo"
	case strings.HasPrefix(name, "antara"):
		return "Antara News"
	case strings.HasPrefix(name, "kumparan"):
		return "Kumparan"
	case strings.HasPrefix(name, "okezone"):
		return "Okezone"
	default:
		return "Berita Indo"
	}
}

// FetchAndSaveNews mengambil berita dari berita-indo-api dan menyimpannya ke database.
// Tidak memerlukan API key — gratis dan terbuka.
func FetchAndSaveNews() (FetchResult, error) {
	var result FetchResult

	sysUser, err := getOrCreateNewsAPIUser()
	if err != nil {
		return result, err
	}

	// Daftar endpoint berita-indo-api (Hanya Tempo & Antara)
	endpoints := []struct {
		url      string
		category string
	}{
		// TEMPO
		{url: beritaBaseURL + "/tempo-news/nasional", category: "NASIONAL"},
		{url: beritaBaseURL + "/tempo-news/metro", category: "LOKAL"},
		{url: beritaBaseURL + "/tempo-news/bisnis", category: "POLITIK"},
		{url: beritaBaseURL + "/tempo-news/travel", category: "WISATA"},
		{url: beritaBaseURL + "/tempo-news/cantik", category: "INSPIRATIF"},
		
		// ANTARA
		{url: beritaBaseURL + "/antara-news/ekonomi", category: "LOKAL"},
		{url: beritaBaseURL + "/antara-news/olahraga", category: "LOKAL"},
		{url: beritaBaseURL + "/antara-news/humaniora", category: "INSPIRATIF"},
		{url: beritaBaseURL + "/antara-news/politik", category: "POLITIK"},
	}

	client := &http.Client{Timeout: 20 * time.Second}

	for _, ep := range endpoints {
		// find or create category
		var cat models.Category
		if err := database.DB.Where("name = ?", ep.category).FirstOrCreate(&cat, models.Category{Name: ep.category, Slug: strings.ToLower(ep.category)}).Error; err == nil {
			fetchFromBeritaIndo(client, ep.url, cat.ID, sysUser, &result)
		}
	}

	log.Printf("[BeritaIndo] Selesai — fetched=%d saved=%d skipped=%d errors=%d",
		result.Fetched, result.Saved, result.Skipped, result.Errors)

	return result, nil
}
