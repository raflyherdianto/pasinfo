# Pasinfo — Portal Berita & Wisata Pasuruan

Pasinfo adalah sebuah platform portal berita dan eksplorasi destinasi wisata di wilayah Pasuruan. Proyek ini dibangun dengan arsitektur modern, aman, dan dirancang untuk deployment skala produksi di Oracle Cloud VM (ARM64) menggunakan Docker.

---

## 🛠️ Tech Stack & Fitur Utama

### 🖥️ Frontend (Vite + Vue 3)
* **Framework:** Vue 3 (Composition API / `<script setup>`) dengan TypeScript.
* **Styling:** Tailwind CSS v4 (Sleek, modern bento grid design, responsive mobile-first).
* **Security & Hardening:**
  * **XSS Sanitization:** Menggunakan `DOMPurify` pada semua rendering dinamis (`v-html`).
  * **File Upload Validation:** Validasi selektif untuk ukuran gambar (maks 5MB) dan format MIME (`JPG`, `PNG`, `WEBP`) langsung di sisi klien sebelum diproses.
  * **Non-Root NGINX:** Kontainer berjalan menggunakan image rootless unprivileged `nginxinc/nginx-unprivileged:1.27-alpine` pada port `8080`.

### ⚙️ Backend (Go 1.25)
* **Framework:** Go Fiber (High performance, low latency).
* **Database:** SQLite dengan GORM (Migration & Seed otomatis pada startup pertama).
* **Security & Hardening:**
  * **Non-Root Container:** Berjalan sepenuhnya di bawah UID/GID 10001 (`pasinfo`).
  * **CORS & CSP Headers:** Allowlist ketat hanya untuk domain utama (`pasinfo.com`).
  * **Rate Limiting:** Diterapkan 10 req/60s untuk endpoint autentikasi (`/login`, `/register`).
  * **JWT Hardening:** Algoritma tanda tangan di-pin hanya menggunakan `HS256`, dan menolak format kunci yang lemah.
  * **MIME Sniffing (File Uploads):** Validasi Magic Bytes di sisi server untuk mendeteksi berkas berbahaya yang disamarkan sebagai gambar.

### 🌐 DevOps & Infrastructure
* **Orchestration:** Docker Compose dengan pemisahan container frontend & backend yang terhubung via Docker Network `shared-network`.
* **CI/CD:** GitHub Actions dengan filter jalur perubahan terpisah (`frontend/**` dan `backend/**`), otomatis membangun image ARM64 dan melakukan push ke GHCR, lalu melakukan deploy ke VM via SSH.
* **SSL & Reverse Proxy:** Integrasi reverse proxy otomatis TLS gratis Let's Encrypt menggunakan Caddy.

---

## 📂 Struktur Proyek

```
wildan-projects/
├── .github/workflows/       # Pipeline CI/CD GitHub Actions (Deploy Frontend & Backend)
├── backend/                 # Kode sumber Go API
│   ├── cmd/api/             # Entry point aplikasi (main.go)
│   ├── internal/            # Handler, Router, Middleware, Models, Database
│   ├── Dockerfile           # Multi-stage build ARM64 Go
│   └── docker-compose.yml   # Konfigurasi container backend
├── frontend/                # Kode sumber Vue 3 SPA
│   ├── src/                 # Views, Components, Stores, Utils, Router
│   ├── Dockerfile           # Konfigurasi NGINX unprivileged & build stage
│   ├── nginx.conf           # Konfigurasi keamanan NGINX (HSTS, CSP, Block sensitive files)
│   └── docker-compose.yml   # Konfigurasi container frontend
└── README.md
```

---

## 🚀 Instalasi & Jalankan Secara Lokal

### Prasyarat
* [Go 1.25](https://go.dev/)
* [Node.js 20+](https://nodejs.org/)
* Git

### 1. Jalankan Backend
```bash
cd backend
cp .env.example .env
# Edit berkas .env dan berikan JWT_SECRET minimum 32 karakter

# Jalankan seeder wilayah dan user
go run ./cmd/seed_users
go run ./cmd/seed_wilayah

# Jalankan API server
go run ./cmd/api
```

### 2. Jalankan Frontend
```bash
cd frontend
npm install
npm run dev
```