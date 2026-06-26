// ============================================
// MANAJER IKLAN
// ============================================
const AdManager = {
    // Konfigurasi iklan - bisa diubah dari backend
    config: {
        enabled: true,  // Set false untuk menonaktifkan semua iklan
        positions: {
            'content-1': { enabled: true, id: 'ad-content-1' },
            'content-2': { enabled: true, id: 'ad-content-2' },
            'related': { enabled: true, id: 'ad-related' },
            'latest': { enabled: true, id: 'ad-latest' },
            'footer': { enabled: true, id: 'ad-footer' }
        }
    },

    // Cek apakah iklan aktif secara global
    isEnabled: function() {
        return this.config.enabled;
    },

    // Cek apakah posisi tertentu aktif
    isPositionEnabled: function(position) {
        return this.config.enabled && 
               this.config.positions[position] && 
               this.config.positions[position].enabled;
    },

    // Render slot iklan
    renderSlot: function(position, customClass = '') {
        if (!this.isPositionEnabled(position)) {
            return ''; // Tidak menampilkan apa-apa jika iklan tidak aktif
        }

        // ============================================
        // UNTUK PRODUKSI - Ganti dengan kode AdSense
        // ============================================
        /*
        return `
            <div class="ad-slot ${customClass}" data-position="${position}">
                <ins class="adsbygoogle"
                     style="display:block"
                     data-ad-client="ca-pub-xxxxxxxxxxxxx"
                     data-ad-slot="${this.config.positions[position].id}"
                     data-ad-format="auto"></ins>
                <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
            </div>
        `;
        */

        // ============================================
        // UNTUK DEVELOPMENT - Tampilkan placeholder
        // ============================================
        return `
            <div class="ad-slot ${customClass}" data-position="${position}">
                <div class="ad-placeholder">IKLAN ${position.toUpperCase()}</div>
            </div>
        `;
    },

    // Untuk debugging - tampilkan status iklan
    getStatus: function() {
        return {
            globalEnabled: this.config.enabled,
            positions: Object.keys(this.config.positions).map(key => ({
                name: key,
                enabled: this.config.positions[key].enabled
            }))
        };
    }
};

// ============================================
// HALAMAN BERITA
// ============================================
const BeritaPage = {
    // Menyimpan data berita yang sedang aktif
    currentBerita: null,
    currentMainImage: null,
    
    // Data berita (sama seperti sebelumnya)
    allBerita: {
        1: {
            id: 1,
            judul: 'Arus Mudik Mulai Meroket, 116 Ribu Kendaraan Lintasi Tol Gempol-Pasuruan dalam Sepekan',
            kategori: 'LOKAL',
            waktu: '12 menit yang lalu',
            penulis: 'Redaksi Pasuruan Info',
            konten: [
                'Pasuruan - Arus mudik Lebaran tahun ini mulai menunjukkan peningkatan signifikan. Data dari PT Jasamarga Pasuruan-Probolinggo mencatat sebanyak 116 ribu kendaraan telah melintasi Tol Gempol-Pasuruan dalam sepekan terakhir.',
                'General Manager PT Jasamarga Pasuruan-Probolinggo, Ahmad Fauzi, mengatakan bahwa jumlah tersebut meningkat 15% dibandingkan periode yang sama tahun lalu. "Puncak arus mudik diprediksi akan terjadi pada H-3 Lebaran," ujarnya, Jumat (15/3/2026).',
                'Untuk mengantisipasi kepadatan, pihaknya telah menyiapkan sejumlah rekayasa lalu lintas termasuk contra flow dan buka tutup gerbang tol jika diperlukan. "Kami imbau pengendara untuk memastikan kondisi kendaraan prima dan mengisi saldo e-toll yang cukup sebelum memasuki tol," tambah Fauzi.',
                'Sementara itu, Kepala Dinas Perhubungan Pasuruan, Bambang Sugeng, mengungkapkan bahwa pihaknya telah berkoordinasi dengan berbagai instansi terkait untuk kelancaran arus mudik. Posko-posko pelayanan juga telah disiapkan di beberapa titik strategis.',
                '"Kami juga mengingatkan pemudik untuk selalu berhati-hati dan mematuhi rambu-rambu lalu lintas. Istirahat jika lelah dan jangan paksakan diri," pungkas Bambang.'
            ],
            images: [
                {
                    id: 1,
                    url: 'images/themes/photo.jpg',
                    caption: 'Suasana padat kendaraan di Tol Gempol-Pasuruan saat arus mudik',
                    isMain: true
                }
            ]
        },
        2: {
            id: 2,
            judul: 'Festival Kuliner Pasuruan Meriahkan Akhir Pekan, Ribuan Pengunjung Hadir',
            kategori: 'LOKAL',
            waktu: '5 menit yang lalu',
            penulis: 'Redaksi Pasuruan Info',
            konten: [
                'Festival Kuliner Pasuruan kembali digelar di Alun-alun Kota Pasuruan. Ribuan pengunjung hadir menikmati berbagai makanan khas daerah.',
                'Acara yang berlangsung selama tiga hari ini menampilkan lebih dari 100 stan kuliner dari berbagai UMKM lokal. Pengunjung dapat menikmati beragam hidangan tradisional hingga modern.',
                '"Kami sangat antusias dengan antusiasme masyarakat yang begitu tinggi. Ini menjadi bukti bahwa kuliner Pasuruan memiliki daya tarik yang luar biasa," ujar Kepala Dinas Pariwisata Pasuruan.',
                'Selain kuliner, acara ini juga dimeriahkan dengan pertunjukan musik dan lomba memasak. Pengunjung juga bisa mengikuti workshop kuliner gratis.'
            ],
            images: [
                {
                    id: 1,
                    url: 'images/themes/photo.jpg',
                    caption: 'Suasana meriah Festival Kuliner Pasuruan di Alun-alun Kota',
                    isMain: true
                },
                {
                    id: 2,
                    url: 'images/themes/photo.jpg',
                    caption: 'Berbagai macam makanan khas Pasuruan yang tersedia di festival',
                    isMain: false
                },
                {
                    id: 3,
                    url: 'images/themes/photo.jpg',
                    caption: 'Pengunjung antusias mencicipi hidangan tradisional',
                    isMain: false
                }
            ]
        },
        3: {
            id: 3,
            judul: 'Pemkab Pasuruan Canangkan Program Pasuruan Bersih 2026',
            kategori: 'LOKAL',
            waktu: '25 menit yang lalu',
            penulis: 'Redaksi Pasuruan Info',
            konten: [
                'Pemerintah Kabupaten Pasuruan meluncurkan program "Pasuruan Bersih 2026" yang bertujuan untuk meningkatkan kebersihan dan keindahan lingkungan di seluruh wilayah Pasuruan.',
                'Program ini mencakup pengelolaan sampah terpadu, penghijauan kota, dan edukasi masyarakat tentang pentingnya menjaga kebersihan.',
                '"Kami ingin Pasuruan menjadi kota yang bersih, hijau, dan nyaman untuk ditinggali. Program ini membutuhkan partisipasi aktif dari seluruh masyarakat," ujar Bupati Pasuruan.',
                'Sebagai tahap awal, program ini akan difokuskan di 10 kecamatan prioritas yang memiliki tingkat kepadatan penduduk tinggi.'
            ],
            images: [
                {
                    id: 1,
                    url: 'images/themes/photo.jpg',
                    caption: 'Peluncuran program Pasuruan Bersih 2026 di halaman kantor Bupati',
                    isMain: true
                },
                {
                    id: 2,
                    url: 'images/themes/photo.jpg',
                    caption: 'Warga bersama-sama membersihkan sungai di wilayah Bugul Kidul',
                    isMain: false
                },
                {
                    id: 3,
                    url: 'images/themes/photo.jpg',
                    caption: 'Penanaman pohon perdana di area Taman Kota Pasuruan',
                    isMain: false
                },
                {
                    id: 4,
                    url: 'images/themes/photo.jpg',
                    caption: 'Sosialisasi pengelolaan sampah kepada siswa sekolah dasar',
                    isMain: false
                },
                {
                    id: 5,
                    url: 'images/themes/photo.jpg',
                    caption: 'Bank sampah digital pertama di Pasuruan mulai beroperasi',
                    isMain: false
                }
            ]
        },
        4: {
            id: 4,
            judul: 'Wisata Baru di Kaki Gunung Bromo Resmi Dibuka',
            kategori: 'INSPIRATIF',
            waktu: '1 jam yang lalu',
            penulis: 'Redaksi Wisata',
            konten: [
                'Destinasi wisata baru "Bromo Sunrise Hill" resmi dibuka untuk umum. Lokasi ini menawarkan pemandangan matahari terbit yang spektakuler dari ketinggian.',
                'Berlokasi di Desa Wonokitri, Kecamatan Tosari, tempat wisata ini meguguhkan spot foto instagramable dan area camping yang nyaman.',
                '"Kami ingin memberikan alternatif wisata bagi pengunjung yang ingin menikmati keindahan Bromo tanpa harus naik jeep," ujar pengelola wisata.'
            ],
            images: [
                {
                    id: 1,
                    url: 'images/themes/photo.jpg',
                    caption: 'Pemandangan matahari terbit dari Bromo Sunrise Hill',
                    isMain: true
                },
                {
                    id: 2,
                    url: 'images/themes/photo.jpg',
                    caption: 'Area camping yang nyaman dengan pemandangan Gunung Bromo',
                    isMain: false
                }
            ]
        },
        101: {
            id: 101,
            judul: 'Presiden Resmikan Tol Trans-Jawa Ruas Terakhir di Jawa Timur',
            kategori: 'NASIONAL',
            waktu: '15 menit yang lalu',
            penulis: 'Redaksi Nasional',
            konten: [
                'Presiden RI meresmikan ruas terakhir Tol Trans-Jawa yang menghubungkan Surabaya hingga Probolinggo. Peresmian ini menandai rampungnya pembangunan jalan tol sepanjang 1.200 km yang membentang dari Merak hingga Banyuwangi.',
                '"Ini adalah infrastruktur strategis yang akan memperlancar arus logistik dan mobilitas masyarakat," ujar Presiden dalam sambutannya.',
                'Dengan selesainya proyek ini, waktu tempuh dari Jakarta ke Surabaya diprediksi hanya sekitar 12 jam.'
            ],
            images: [
                {
                    id: 1,
                    url: 'images/themes/photo.jpg',
                    caption: 'Presiden meresmikan ruas terakhir Tol Trans-Jawa',
                    isMain: true
                },
                {
                    id: 2,
                    url: 'images/themes/photo.jpg',
                    caption: 'Suasana peresmian yang dihadiri para menteri dan gubernur',
                    isMain: false
                }
            ]
        }
    },
    
    // Render konten berita dengan slot iklan yang terkontrol
    renderContent: function(paragraphs) {
        let html = '';
        const totalParagraphs = paragraphs.length;
        
        paragraphs.forEach((p, index) => {
            // Tambahkan paragraf
            html += `<p>${p}</p>`;
            
            // Tambahkan iklan di posisi tertentu
            if (index === 1 && totalParagraphs > 3) {
                html += AdManager.renderSlot('content-1', 'ad-mid-content');
            }
            
            if (index === Math.floor(totalParagraphs / 2) && totalParagraphs > 4) {
                html += AdManager.renderSlot('content-2', 'ad-mid-content');
            }
        });
        
        return html;
    },
    
    render: function(beritaId) {
        const berita = this.allBerita[beritaId] || this.allBerita[1];
        this.currentBerita = berita;
        
        const mainImage = berita.images.find(img => img.isMain === true) || berita.images[0];
        this.currentMainImage = mainImage;
        
        const otherImages = berita.images.filter(img => img.id !== mainImage.id);
        
        const thumbnailHTML = otherImages.map(img => `
            <div class="gallery-thumb" onclick="BeritaPage.changeMainImage(${berita.id}, ${img.id})">
                <img src="${img.url}" alt="${img.caption}" onerror="this.src='images/placeholder.jpg'">
                <div class="thumb-overlay">
                    <i class="fas fa-search-plus"></i>
                </div>
            </div>
        `).join('');
        
        const allBeritaArray = Object.values(this.allBerita);
        const relatedNews = allBeritaArray
            .filter(b => b.id !== berita.id && b.kategori === berita.kategori)
            .slice(0, 4)
            .map(b => `
                <div class="related-news-item" onclick="BeritaPage.render(${b.id})">
                    <img src="${b.images[0]?.url || 'images/placeholder.jpg'}" alt="${b.judul}" onerror="this.src='images/placeholder.jpg'">
                    <div class="related-news-content">
                        <h4>${b.judul}</h4>
                        <span class="related-time">${b.waktu}</span>
                    </div>
                </div>
            `).join('');
        
        const latestNews = allBeritaArray
            .filter(b => b.id !== berita.id)
            .slice(0, 4)
            .map(b => `
                <div class="related-news-item" onclick="BeritaPage.render(${b.id})">
                    <img src="${b.images[0]?.url || 'images/placeholder.jpg'}" alt="${b.judul}" onerror="this.src='images/placeholder.jpg'">
                    <div class="related-news-content">
                        <h4>${b.judul}</h4>
                        <span class="related-time">${b.waktu}</span>
                    </div>
                </div>
            `).join('');
        
        const kontenHTML = this.renderContent(berita.konten);
        
        return `
            <div class="berita-detail-container">
                <button class="btn-back-berita" onclick="navigateTo('home')">
                    <i class="fas fa-arrow-left"></i> Kembali
                </button>
                
                <div class="berita-container">
                    <span class="kategori-badge">${berita.kategori}</span>
                    <h1 class="berita-judul-large">${berita.judul}</h1>
                    
                    <div class="berita-meta">
                        <span><i class="far fa-clock"></i> ${berita.waktu}</span>
                        <span><i class="far fa-user"></i> ${berita.penulis}</span>
                    </div>
                    
                    <div class="berita-galeri">
                        <div class="gallery-main">
                            <img id="mainGalleryImage" src="${mainImage.url}" alt="${mainImage.caption}" onerror="this.src='images/placeholder.jpg'">
                            <div class="gallery-caption" id="galleryCaption">${mainImage.caption}</div>
                        </div>
                        
                        ${otherImages.length > 0 ? `
                            <div class="gallery-thumbnails">
                                ${thumbnailHTML}
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="berita-konten">
                        ${kontenHTML}
                    </div>
                    
                    <div class="related-news-section">
                        <h3>Related News</h3>
                        <div class="related-news-list">
                            ${relatedNews}
                        </div>
                        ${AdManager.renderSlot('related', 'ad-related')}
                    </div>
                    
                    <div class="latest-news-section">
                        <h3>Latest News</h3>
                        <div class="related-news-list">
                            ${latestNews}
                        </div>
                        ${AdManager.renderSlot('latest', 'ad-latest')}
                    </div>
                    
                    <div class="berita-footer">
                        ${AdManager.renderSlot('footer', 'ad-footer')}
                    </div>
                </div>
            </div>
        `;
    },
    
    changeMainImage: function(beritaId, imageId) {
        const berita = this.allBerita[beritaId];
        if (!berita) return;
        
        const selectedImage = berita.images.find(img => img.id === imageId);
        if (!selectedImage) return;
        
        const mainImage = document.getElementById('mainGalleryImage');
        const caption = document.getElementById('galleryCaption');
        
        if (mainImage && caption) {
            mainImage.src = selectedImage.url;
            caption.textContent = selectedImage.caption;
        }
        
        const thumbs = document.querySelectorAll('.gallery-thumb');
        thumbs.forEach(thumb => {
            const thumbImg = thumb.querySelector('img');
            if (thumbImg && thumbImg.src.includes(selectedImage.url.split('/').pop())) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
        
        this.currentMainImage = selectedImage;
    },
    
    // Fungsi untuk toggle iklan
    toggleAds: function(enabled) {
        AdManager.config.enabled = enabled !== undefined ? enabled : !AdManager.config.enabled;
        console.log('Iklan status:', AdManager.config.enabled ? 'AKTIF' : 'NONAKTIF');
        if (this.currentBerita) {
            this.render(this.currentBerita.id);
        }
        return AdManager.config.enabled;
    },
    
    toggleAdPosition: function(position, enabled) {
        if (AdManager.config.positions[position]) {
            AdManager.config.positions[position].enabled = enabled !== undefined ? enabled : !AdManager.config.positions[position].enabled;
            console.log(`Iklan posisi ${position}:`, AdManager.config.positions[position].enabled ? 'AKTIF' : 'NONAKTIF');
            if (this.currentBerita) {
                this.render(this.currentBerita.id);
            }
        }
        return AdManager.config.positions[position]?.enabled;
    }
};