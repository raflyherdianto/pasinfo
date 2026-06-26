const HomePage = {
    render: function(kategori = 'semua') {
        console.log('HomePage.render called with kategori:', kategori);
        
        // Data untuk berita utama (gambar besar)
        const featuredNews = {
            id: 1,
            kategori: 'LOKAL',
            judul: 'Arus Mudik Mulai Meroket, 116 Ribu Kendaraan Lintasi Tol Gempol-Pasuruan dalam Sepekan',
            waktu: '10 menit',
            penulis: 'Redaksi Pasuruan Info',
            gambar: 'images/themes/macet.jpg'
        };
        
        // Data untuk berita terbaru
        const latestNews = [
            {
                id: 2,
                kategori: 'NASIONAL',
                judul: 'Pemerintah Siapkan Skema One Way di Tol Trans-Jawa',
                waktu: '5 menit',
                gambar: 'images/themes/tol.jpeg'
            },
            {
                id: 3,
                kategori: 'INSPIRATIF',
                judul: 'Kisah Pemuda Pasuruan Sukses Kembangkan Bisnis Kerajinan Tangan',
                waktu: '15 menit',
                gambar: 'images/themes/pemuda.jpeg'
            },
            {
                id: 4,
                kategori: 'POLITIK',
                judul: 'DPRD Pasuruan Sahkan Perda Baru Tentang Penataan Ruang Terbuka Hijau',
                waktu: '25 menit',
                gambar: 'images/themes/dprd.jpeg'
            },
            {
                id: 17,
                kategori: 'POLITIK',
                judul: 'DPRD Pasuruan Sahkan Perda Baru Tentang Penataan Ruang Terbuka Hijau',
                waktu: '25 menit',
                gambar: 'images/themes/dprd.jpeg'
            }
        ];
        
        // Data untuk berita per kategori (masing-masing 4 berita)
        const categoryNews = {
            lokal: [
                {
                    id: 5,
                    judul: 'Festival Kuliner Pasuruan Meriahkan Akhir Pekan, Ribuan Pengunjung Hadir',
                    waktu: '10 menit',
                    gambar: 'images/themes/photo.jpg'
                },
                {
                    id: 6,
                    judul: 'Pemkab Pasuruan Canangkan Program Pasuruan Bersih 2026',
                    waktu: '25 menit',
                    gambar: 'images/themes/photo.jpg'
                },
                {
                    id: 7,
                    judul: 'Taman Kota Pasuruan Diresmikan, Jadi Tempat Wisata Baru Warga',
                    waktu: '45 menit',
                    gambar: 'images/themes/photo.jpg'
                },
                {
                    id: 8,
                    judul: 'Ribuan Pelajar Ikuti Olimpiade Sains Tingkat Kabupaten',
                    waktu: '1 jam',
                    gambar: 'images/themes/photo.jpg'
                }
            ],
            nasional: [
                {
                    id: 9,
                    judul: 'Presiden Resmikan Tol Trans-Jawa Ruas Terakhir di Jawa Timur',
                    waktu: '15 menit',
                    gambar: 'images/themes/photo.jpg'
                },
                {
                    id: 10,
                    judul: 'DPR Sahkan RUU Cipta Kerja Jadi Undang-Undang',
                    waktu: '30 menit',
                    gambar: 'images/themes/photo.jpg'
                },
                {
                    id: 11,
                    judul: 'Menteri Keuangan Umumkan Kebijakan Ekonomi Baru',
                    waktu: '50 menit',
                    gambar: 'images/themes/photo.jpg'
                },
                {
                    id: 12,
                    judul: 'Golongan Darah Langka Mulai Langka di PMI Pusat',
                    waktu: '2 jam',
                    gambar: 'images/themes/photo.jpg'
                }
            ],
            politik: [
                {
                    id: 13,
                    judul: 'Partai Politik Mulai Siapkan Kader untuk Pilkada 2027',
                    waktu: '20 menit',
                    gambar: 'images/themes/photo.jpg'
                },
                {
                    id: 14,
                    judul: 'Koalisi Partai Bentuk Sekretariat Bersama Hadapi Pemilu',
                    waktu: '35 menit',
                    gambar: 'images/themes/photo.jpg'
                },
                {
                    id: 15,
                    judul: 'Tokoh Muda Pasuruan Maju Sebagai Calon Bupati',
                    waktu: '55 menit',
                    gambar: 'images/themes/photo.jpg'
                },
                {
                    id: 16,
                    judul: 'Debat Publik Calon Legislatif Digelar Malam Ini',
                    waktu: '3 jam',
                    gambar: 'images/themes/photo.jpg'
                }
            ]
        };
        
        return `
            <div class="home-container">
                <!-- Featured News + Latest News -->
                <div class="featured-news">
                    <!-- Bagian Kiri - Gambar Besar -->
                    <div class="featured-left">
                        <div class="featured-card" onclick="navigateTo('berita', ${featuredNews.id})">
                            <div class="featured-image">
                                <img src="${featuredNews.gambar}" alt="${featuredNews.judul}" onerror="this.src='images/placeholder.jpg'">
                                <div class="featured-overlay">
                                    <span class="featured-category">${featuredNews.kategori}</span>
                                    <h2 class="featured-title">${featuredNews.judul}</h2>
                                    <div class="featured-meta">
                                        <span><i class="far fa-clock"></i> ${featuredNews.waktu}</span>
                                        <span class="separator"></span>
                                        <span><i class="far fa-user"></i> ${featuredNews.penulis}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Bagian Kanan - Berita Terbaru -->
                    <div class="latest-news">
                        <h3 class="latest-title">Berita Terbaru</h3>
                        <div class="latest-list">
                            ${latestNews.map(berita => `
                                <div class="latest-item" onclick="navigateTo('berita', ${berita.id})">
                                    <div class="latest-image">
                                        <span class="latest-category">${berita.kategori}</span>
                                        <img src="${berita.gambar}" alt="${berita.judul}" onerror="this.src='images/placeholder.jpg'">
                                    </div>
                                    <div class="latest-content">
                                        <h4>${berita.judul}</h4>
                                        <span class="latest-time"><i class="far fa-clock"></i> ${berita.waktu} yang lalu</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <!-- Category News Section - Lokal, Nasional, Politik -->
                <div class="category-news">
                    <div class="category-grid">
                        <!-- Kategori LOKAL -->
                        <div class="category-column">
                            <div class="category-header" onclick="navigateTo('home', 'lokal')">
                                <div class="vertical-line"></div>
                                <span class="category-name">LOKAL</span>
                                <span class="category-arrow"><i class="fas fa-arrow-right"></i></span>
                            </div>
                            <div class="category-news-list">
                                ${categoryNews.lokal.map(berita => `
                                    <div class="category-news-item" onclick="navigateTo('berita', ${berita.id})">
                                        <div class="category-news-image">
                                            <img src="${berita.gambar}" alt="${berita.judul}" onerror="this.src='images/placeholder.jpg'">
                                        </div>
                                        <div class="category-news-content">
                                            <h4 class="category-news-title">${berita.judul}</h4>
                                            <span class="category-news-time"><i class="far fa-clock"></i> ${berita.waktu} lalu</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <!-- Kategori NASIONAL -->
                        <div class="category-column">
                            <div class="category-header" onclick="navigateTo('home', 'nasional')">
                                <div class="vertical-line"></div>
                                <span class="category-name">NASIONAL</span>
                                <span class="category-arrow"><i class="fas fa-arrow-right"></i></span>
                            </div>
                            <div class="category-news-list">
                                ${categoryNews.nasional.map(berita => `
                                    <div class="category-news-item" onclick="navigateTo('berita', ${berita.id})">
                                        <div class="category-news-image">
                                            <img src="${berita.gambar}" alt="${berita.judul}" onerror="this.src='images/placeholder.jpg'">
                                        </div>
                                        <div class="category-news-content">
                                            <h4 class="category-news-title">${berita.judul}</h4>
                                            <span class="category-news-time"><i class="far fa-clock"></i> ${berita.waktu} lalu</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <!-- Kategori POLITIK -->
                        <div class="category-column">
                            <div class="category-header" onclick="navigateTo('home', 'politik')">
                                <div class="vertical-line"></div>
                                <span class="category-name">POLITIK</span>
                                <span class="category-arrow"><i class="fas fa-arrow-right"></i></span>
                            </div>
                            <div class="category-news-list">
                                ${categoryNews.politik.map(berita => `
                                    <div class="category-news-item" onclick="navigateTo('berita', ${berita.id})">
                                        <div class="category-news-image">
                                            <img src="${berita.gambar}" alt="${berita.judul}" onerror="this.src='images/placeholder.jpg'">
                                        </div>
                                        <div class="category-news-content">
                                            <h4 class="category-news-title">${berita.judul}</h4>
                                            <span class="category-news-time"><i class="far fa-clock"></i> ${berita.waktu} lalu</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="home-container">
        <!-- Featured News + Latest News -->
        <div class="featured-news">
            <!-- ... (kode yang sudah ada) ... -->
        </div>
        
        <!-- Category News Section -->
        <div class="category-news">
            <!-- ... (kode yang sudah ada) ... -->
        </div>
        
            <!-- Pasinfo Jelajah Section -->
<div class="pasinfo-jelajah">
    <div class="pasinfo-header">
        <div class="pasinfo-logo">
            <img src="images/pasinfo-jelajah-logo.png" alt="Pasinfo Jelajah" class="pasinfo-logo-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
            <span class="logo-fallback" style="display: none; font-size: 28px; font-weight: 700; color: #003366;">Pasinfo Jelajah</span>
            
            <!-- Teks deskripsi di bawah logo -->
            <div class="pasinfo-description">Ingin mengenal Pasuruan lebih dalam?</div>
        </div>
    </div>
    
    <div class="pasinfo-grid">
        <!-- Wisata -->
        <div class="pasinfo-item" onclick="navigateTo('wisata')">
            <div class="pasinfo-image">
                <img src="images/themes/photo.jpg" alt="Wisata Pasuruan" onerror="this.src='images/placeholder.jpg'">
            </div>
            <div class="pasinfo-caption">Wisata</div>
        </div>
        
        <!-- Kuliner -->
        <div class="pasinfo-item" onclick="navigateTo('jelajah', 'kuliner')">
            <div class="pasinfo-image">
                <img src="images/themes/photo.jpg" alt="Kuliner Pasuruan" onerror="this.src='images/placeholder.jpg'">
            </div>
            <div class="pasinfo-caption">Kuliner</div>
        </div>
        
        <!-- Budaya -->
        <div class="pasinfo-item" onclick="navigateTo('jelajah', 'budaya')">
            <div class="pasinfo-image">
                <img src="images/themes/photo.jpg" alt="Budaya Pasuruan" onerror="this.src='images/placeholder.jpg'">
            </div>
            <div class="pasinfo-caption">Budaya</div>
        </div>
        
        <!-- Acara -->
        <div class="pasinfo-item" onclick="navigateTo('jelajah', 'acara')">
            <div class="pasinfo-image">
                <img src="images/themes/photo.jpg" alt="Acara Pasuruan" onerror="this.src='images/placeholder.jpg'">
            </div>
            <div class="pasinfo-caption">Acara</div>
        </div>
    </div>
</div>

        <!-- Footer -->
        <footer class="footer">
            <div class="footer-container">
                <!-- Bagian Kiri - Logo dan Deskripsi -->
                <div class="footer-left">
                    <div class="footer-logo">
                        <img src="images/logo-putih.png" alt="Pasuruan Info" class="footer-logo-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                        <span class="footer-logo-fallback" style="display: none;">Pasuruan Info</span>
                    </div>
                    <p class="footer-description">
                        Portal informasi digital yang menyajikan berita terkini dan terpercaya seputar Pasuruan, meliputi peristiwa, cek fakta, ekonomi, pemerintahan, hiburan, kuliner, gaya hidup, pariwisata, serta dinamika lokal yang relevan bagi masyarakat.
                    </p>
                </div>
                
                <!-- Bagian Tengah - Ikuti Kami -->
                <div class="footer-middle">
                    <h3 class="footer-title">Ikuti Kami</h3>
                    <div class="social-icons">
                        <a href="https://www.instagram.com/pasuruaninfo" target="_blank" class="social-icon">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="https://www.facebook.com/pasuruaninfo" target="_blank" class="social-icon">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://twitter.com/pasuruaninfo_" target="_blank" class="social-icon">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="https://www.youtube.com/pasuruaninfo" target="_blank" class="social-icon">
                            <i class="fab fa-youtube"></i>
                        </a>
                        <a href="https://www.threads.net/pasuruaninfo" target="_blank" class="social-icon">
                            <i class="fab fa-threads"></i>
                        </a>
                    </div>
                </div>
                
                <!-- Bagian Kanan - Kontak -->
                <div class="footer-right">
                    <h3 class="footer-title">Kontak</h3>
                    <div class="contact-list">
                        <div class="contact-item">
                            <div class="contact-icon">
                                <i class="fas fa-map-marker-alt"></i>
                            </div>
                            <div class="contact-text">
                                Jl. KH. Samanhudi No. 29, Bugul Kidul, Kota Pasuruan
                            </div>
                        </div>
                        <div class="contact-item">
                            <div class="contact-icon">
                                <i class="fab fa-whatsapp"></i>
                            </div>
                            <div class="contact-text">
                                <a href="https://wa.me/6285161618669" target="_blank">0851-6161-8669</a>
                            </div>
                        </div>
                        <div class="contact-item">
                            <div class="contact-icon">
                                <i class="fas fa-envelope"></i>
                            </div>
                            <div class="contact-text">
                                <a href="mailto:pasuruaninfo93@gmail.com">pasuruaninfo93@gmail.com</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                &copy; ${new Date().getFullYear()} Pasuruan Info. All rights reserved. | <a href="#" onclick="navigateTo('home')">Beranda</a>
            </div>
        </footer>
    </div>
    </div>
`;
    }
};