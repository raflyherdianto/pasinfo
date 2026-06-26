const WisataPage = {
    currentKecamatan: null,
    currentIndex: 0,
    currentSlideIndex: 0,
    map: null,
    
    // Daftar kecamatan dalam urutan
    kecamatanList: [
        'Gempol', 'Bangil', 'Pandaan', 'Prigen', 'Tosari', 'Pasrepan', 
        'Purwodadi', 'Nongkojajar', 'Winongan', 'Kota Pasuruan',
        'Grati', 'Lumbang', 'Beji', 'Sukorejo', 'Kraton', 'Pohjentrek',
        'Kejayan', 'Rembang', 'Lekok', 'Nguling', 'Rejoso', 'Wonorejo',
        'Tutur', 'Puspo', 'Purwosari'
    ],

        // Data atraksi perjalanan (12 gambar)
    atraksiData: [
        { id: 1, nama: 'Gunung Bromo', gambar: 'images/themes/photo.jpg', link: 'https://example.com/bromo' },
        { id: 2, nama: 'Taman Safari Prigen', gambar: 'images/themes/photo.jpg', link: 'https://example.com/taman-safari' },
        { id: 3, nama: 'Museum Angkut', gambar: 'images/themes/photo.jpg', link: 'https://example.com/museum-angkut' },
        { id: 4, nama: 'Cimory Dairyland', gambar: 'images/themes/photo.jpg', link: 'https://example.com/cimory' },
        { id: 5, nama: 'Kebun Raya Purwodadi', gambar: 'images/themes/photo.jpg', link: 'https://example.com/kebun-raya' },
        { id: 6, nama: 'Air Terjun Kakek Bodo', gambar: 'images/themes/photo.jpg', link: 'https://example.com/kakek-bodo' },
        { id: 7, nama: 'Alun-alun Kota Pasuruan', gambar: 'images/themes/photo.jpg', link: 'https://example.com/alun-alun' },
        { id: 8, nama: 'Pemandian Air Panas Grati', gambar: 'images/themes/photo.jpg', link: 'https://example.com/grati' },
        { id: 9, nama: 'Wisata Belanja Gempol', gambar: 'images/themes/photo.jpg', link: 'https://example.com/gempol' },
        { id: 10, nama: 'Kuliner Pecel Semanggi', gambar: 'images/themes/photo.jpg', link: 'https://example.com/pecel' },
        { id: 11, nama: 'Sentra Batik Pasuruan', gambar: 'images/themes/photo.jpg', link: 'https://example.com/batik' },
        { id: 12, nama: 'Festival Pasuruan', gambar: 'images/themes/photo.jpg', link: 'https://example.com/festival' }
    ],
    
    // Data kecamatan dengan koordinat GPS (lat, lng)
    kecamatanData: {
        'Gempol': {
            nama: 'Gempol',
            gambar: 'images/themes/photo.jpg',
            deskripsi: 'Gempol merupakan kecamatan paling barat Kabupaten Pasuruan yang berbatasan langsung dengan Kota Surabaya dan Sidoarjo. Daerah ini menjadi pintu gerbang utama menuju Pasuruan dengan kawasan industri yang berkembang pesat.',
            wisataUnggulan: ['Wisata Belanja di Gempol Mall', 'Kuliner Sego Krawu', 'Pusat Oleh-oleh Khas Pasuruan'],
            lat: -7.55,
            lng: 112.70,
            icon: '🏭'
        },
        'Bangil': {
            nama: 'Bangil',
            gambar: 'images/themes/photo.jpg',
            deskripsi: 'Bangil adalah ibu kota Kabupaten Pasuruan yang menjadi pusat pemerintahan dan perekonomian. Kota ini dikenal dengan julukan Kota Santri karena banyaknya pondok pesantren.',
            wisataUnggulan: ['Alun-alun Bangil', 'Pondok Pesantren Bangil', 'Wisata Kuliner Pasar Bangil'],
            lat: -7.60,
            lng: 112.78,
            icon: '🏛️'
        },
        'Pandaan': {
            nama: 'Pandaan',
            gambar: 'images/themes/photo.jpg',
            deskripsi: 'Pandaan merupakan kecamatan strategis yang menjadi gerbang menuju kawasan wisata Gunung Bromo. Daerah ini terkenal dengan agrowisata dan pusat oleh-oleh.',
            wisataUnggulan: ['Taman Dayu', 'Air Terjun Kakek Bodo', 'Pasar Buah Pandaan', 'Gunung Welirang'],
            lat: -7.65,
            lng: 112.68,
            icon: '⛰️'
        },
        'Prigen': {
            nama: 'Prigen',
            gambar: 'images/themes/photo.jpg',
            deskripsi: 'Prigen adalah kawasan wisata pegunungan dengan udara sejuk dan pemandangan alam yang indah. Banyak resor dan tempat wisata keluarga berdiri di daerah ini.',
            wisataUnggulan: ['Taman Safari Prigen', 'Cimory Dairyland', 'Jawa Timur Park 2', 'Museum Angkut'],
            lat: -7.70,
            lng: 112.62,
            icon: '🎢'
        },
        'Tosari': {
            nama: 'Tosari',
            gambar: 'images/themes/photo.jpg',
            deskripsi: 'Tosari berada di lereng Gunung Bromo dengan pemandangan yang spektakuler. Daerah ini menjadi basecamp utama bagi pendaki yang ingin menikmati keindahan Bromo.',
            wisataUnggulan: ['Gunung Bromo', 'Bukit Teletubbies', 'Pasir Berbisik', 'Budidaya Sayur Organik'],
            lat: -7.88,
            lng: 112.95,
            icon: '🌋'
        },
        'Pasrepan': {
            nama: 'Pasrepan',
            gambar: 'images/themes/photo.jpg',
            deskripsi: 'Pasrepan dikenal dengan perkebunan apelnya yang luas. Daerah ini juga menjadi jalur alternatif menuju kawasan wisata Bromo dari sisi selatan.',
            wisataUnggulan: ['Kebun Apel Pasrepan', 'Air Terjun Coban Sewu', 'Agrowisata Petik Apel'],
            lat: -7.75,
            lng: 112.85,
            icon: '🍎'
        },
        'Purwodadi': {
            nama: 'Purwodadi',
            gambar: 'images/themes/photo.jpg',
            deskripsi: 'Purwodadi terkenal dengan Kebun Raya Purwodadi yang menjadi pusat konservasi tanaman kering. Daerah ini juga memiliki potensi pertanian yang baik.',
            wisataUnggulan: ['Kebun Raya Purwodadi', 'Wisata Edukasi Tanaman Langka', 'Pusat Penelitian Hortikultura'],
            lat: -7.68,
            lng: 112.72,
            icon: '🌳'
        },
        'Nongkojajar': {
            nama: 'Nongkojajar',
            gambar: 'images/themes/photo.jpg',
            deskripsi: 'Nongkojajar adalah kawasan pegunungan dengan perkebunan teh yang indah. Daerah ini juga terkenal dengan buah duriannya yang manis.',
            wisataUnggulan: ['Perkebunan Teh Nongkojajar', 'Durian Khas Pasuruan', 'Air Terjun Coban Rais'],
            lat: -7.80,
            lng: 112.90,
            icon: '🍃'
        },
        'Winongan': {
            nama: 'Winongan',
            gambar: 'images/themes/photo.jpg',
            deskripsi: 'Winongan merupakan kecamatan yang subur dengan potensi pertanian dan perikanan. Daerah ini juga memiliki situs sejarah yang menarik.',
            wisataUnggulan: ['Makam Syekh Maulana Malik Ibrahim', 'Wisata Kuliner Ikan Bakar', 'Pusat Kerajinan Bambu'],
            lat: -7.72,
            lng: 112.95,
            icon: '🐟'
        },
        'Kota Pasuruan': {
            nama: 'Kota Pasuruan',
            gambar: 'images/themes/photo.jpg',
            deskripsi: 'Kota Pasuruan adalah pusat pemerintahan dan perekonomian dengan sejarah panjang sebagai kota pelabuhan. Kota ini memiliki beragam wisata sejarah dan kuliner.',
            wisataUnggulan: ['Alun-alun Kota Pasuruan', 'Wisata Religi Makam KH. Abdul Hamid', 'Kuliner Pecel Semanggi', 'Sentra Batik Pasuruan'],
            lat: -7.64,
            lng: 112.90,
            icon: '🏙️'
        }
    },
    
        // Data Tempat Populer (10 tempat)
    tempatPopulerData: [
        { id: 1, nama: 'Gunung Bromo', rating: 4.8, lokasi: 'Tosari', gambar: 'images/tempat/bromo.jpg', link: 'https://example.com/bromo' },
        { id: 2, nama: 'Taman Safari Prigen', rating: 4.7, lokasi: 'Prigen', gambar: 'images/tempat/taman-safari.jpg', link: 'https://example.com/taman-safari' },
        { id: 3, nama: 'Museum Angkut', rating: 4.6, lokasi: 'Pandaan', gambar: 'images/tempat/museum-angkut.jpg', link: 'https://example.com/museum-angkut' },
        { id: 4, nama: 'Cimory Dairyland', rating: 4.5, lokasi: 'Pandaan', gambar: 'images/tempat/cimory.jpg', link: 'https://example.com/cimory' },
        { id: 5, nama: 'Kebun Raya Purwodadi', rating: 4.4, lokasi: 'Purwodadi', gambar: 'images/tempat/kebun-raya.jpg', link: 'https://example.com/kebun-raya' },
        { id: 6, nama: 'Air Terjun Kakek Bodo', rating: 4.6, lokasi: 'Pandaan', gambar: 'images/tempat/kakek-bodo.jpg', link: 'https://example.com/kakek-bodo' },
        { id: 7, nama: 'Alun-alun Kota Pasuruan', rating: 4.3, lokasi: 'Kota Pasuruan', gambar: 'images/tempat/alun-alun.jpg', link: 'https://example.com/alun-alun' },
        { id: 8, nama: 'Pemandian Air Panas Grati', rating: 4.2, lokasi: 'Grati', gambar: 'images/tempat/grati.jpg', link: 'https://example.com/grati' },
        { id: 9, nama: 'Wisata Belanja Gempol Mall', rating: 4.1, lokasi: 'Gempol', gambar: 'images/tempat/gempol.jpg', link: 'https://example.com/gempol' },
        { id: 10, nama: 'Sentra Batik Pasuruan', rating: 4.4, lokasi: 'Kota Pasuruan', gambar: 'images/tempat/batik.jpg', link: 'https://example.com/batik' }
    ],

    render: function() {
        const slidesHTML = this.generateSlides();

        return `
            <div class="wisata-container">
                <!-- Navbar Khusus Wisata -->
                <div class="wisata-navbar">
                        <div class="wisata-nav-left">
                            <div class="wisata-logo" onclick="navigateTo('home')">
                                <img src="images/logo.png" alt="Pasuruan Info" class="wisata-logo-img" 
                                    onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='block';">
                                <span class="wisata-logo-fallback" style="display: none; font-size: 24px; font-weight: 700; color: white;">Pasuruan Info</span>
                            </div>
                        </div>
                        <div class="wisata-nav-right">
                            <div class="search-container wisata-search">
                                <input type="text" class="search-input" placeholder="Cari kecamatan..." id="wisataSearchInput">
                                <button class="search-btn" onclick="WisataPage.searchKecamatan()">
                                    <i class="fas fa-search"></i>
                                </button>
                            </div>
                            ${this.renderUserDropdown()}
                        </div>
                </div>
                
                <!-- Main Content -->
                <div class="wisata-main">
                    <div class="wisata-map-container">
                        <div class="wisata-map-frame">
                            <div id="wisata-map" class="wisata-map"></div>
                        </div>
                        <div class="map-legend">
                            <div class="legend-title"><i class="fas fa-info-circle"></i> Keterangan</div>
                            <div class="legend-items">
                                <div class="legend-item"><span class="legend-marker"></span> Titik Wisata & Kecamatan</div>
                                <div class="legend-item"><span class="legend-color-hover"></span> Klik untuk melihat informasi</div>
                            </div>
                        </div>
                    </div>
                    <div class="wisata-info-container">
                        <div class="wisata-info-header">
                            <h2><i class="fas fa-landmark"></i> Informasi Kecamatan</h2>
                            <p>Klik pada marker atau gunakan panah untuk navigasi</p>
                        </div>
                        
                        <!-- Navigasi Panah -->
                        <div class="kecamatan-navigation">
                            <button class="nav-arrow prev" onclick="WisataPage.prevKecamatan()">
                                <i class="fas fa-chevron-left"></i>
                            </button>
                            <div class="kecamatan-indicator">
                                <span id="currentKecamatanName">-</span>
                                <span class="separator">/</span>
                                <span id="totalKecamatan">${Object.keys(this.kecamatanData).length}</span>
                            </div>
                            <button class="nav-arrow next" onclick="WisataPage.nextKecamatan()">
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                        
                        <div id="kecamatan-info" class="kecamatan-info">
                            <div class="kecamatan-info-placeholder">
                                <i class="fas fa-map-marker-alt"></i>
                                <p>Pilih kecamatan pada peta di samping</p>
                                <small>Klik marker atau gunakan panah untuk menjelajah</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

                <!-- Atraksi Perjalanan Section - Full Width -->
                <div class="atraksi-section">
                    <div class="atraksi-header">
                        <h2><i class="fas fa-camera-retro"></i> Atraksi Perjalanan</h2>
                        <p>Jelajahi keindahan wisata Pasuruan</p>
                    </div>
                    
                    <div class="atraksi-carousel-container">
                        <button class="carousel-btn prev-btn" onclick="WisataPage.prevSlide()">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        
                        <div class="carousel-wrapper" id="carouselWrapper">
                            <div class="carousel-slides" id="carouselSlides">
                                ${slidesHTML}
                            </div>
                        </div>
                        
                        <button class="carousel-btn next-btn" onclick="WisataPage.nextSlide()">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                    
                    <div class="carousel-dots" id="carouselDots">
                        ${this.generateDots()}
                    </div>
                </div>

                    <!-- Tempat Populer Section -->
                    <div class="tempat-populer-section">
                        <div class="tempat-populer-header">
                            <h2><i class="fas fa-fire"></i> Tempat Populer</h2>
                            <p>Destinasi wisata favorit pengunjung Pasuruan Info</p>
                        </div>
                        
                        <!-- Baris 1: Gambar Besar di Kiri + 4 Gambar Kecil di Kanan -->
                        <div class="tempat-row">
                            ${this.generateLargeCard(this.tempatPopulerData[0], 'left')}
                            <div class="small-grid">
                                ${this.generateSmallCards(this.tempatPopulerData.slice(1, 5))}
                            </div>
                        </div>
                        
                        <!-- Baris 2: 4 Gambar Kecil di Kiri + Gambar Besar di Kanan -->
                        <div class="tempat-row reverse">
                            <div class="small-grid">
                                ${this.generateSmallCards(this.tempatPopulerData.slice(5, 9))}
                            </div>
                            ${this.generateLargeCard(this.tempatPopulerData[9], 'right')}
                        </div>
                    </div>
                </div>
            `;
        },
        
        generateLargeCard: function(data, position) {
            const ratingStars = this.generateRatingStars(data.rating);
            
            return `
                <div class="large-card" onclick="WisataPage.openTempat(${data.id})">
                    <div class="large-card-image">
                        <img src="${data.gambar}" alt="${data.nama}" onerror="this.src='images/themes/photo.jpg'">
                    </div>
                    <div class="large-card-info">
                        <h3 class="large-card-title">${data.nama}</h3>
                        <div class="large-card-rating">
                            ${ratingStars}
                            <span class="rating-value">(${data.rating})</span>
                        </div>
                        <div class="large-card-location">
                            <i class="fas fa-map-marker-alt"></i> ${data.lokasi}
                        </div>
                    </div>
                </div>
            `;
        },
        
        generateSmallCards: function(dataArray) {
            return dataArray.map(data => this.generateSmallCard(data)).join('');
        },
        
        generateSmallCard: function(data) {
            const ratingStars = this.generateRatingStars(data.rating);
            
            return `
                <div class="small-card" onclick="WisataPage.openTempat(${data.id})">
                    <div class="small-card-image">
                        <img src="${data.gambar}" alt="${data.nama}" onerror="this.src='images/themes/photo.jpg'">
                    </div>
                    <div class="small-card-info">
                        <h4 class="small-card-title">${data.nama}</h4>
                        <div class="small-card-rating">
                            ${ratingStars}
                            <span class="rating-value">(${data.rating})</span>
                        </div>
                        <div class="small-card-location">
                            <i class="fas fa-map-marker-alt"></i> ${data.lokasi}
                        </div>
                    </div>
                </div>
        `;
    },
    
    generateSlides: function() {
        return this.atraksiData.map((atraksi, index) => `
            <div class="atraksi-slide" data-index="${index}">
                <div class="atraksi-frame" onclick="WisataPage.openAtraksi(${atraksi.id})">
                    <img src="${atraksi.gambar}" alt="${atraksi.nama}" 
                         onerror="this.src='images/placeholder.jpg'">
                </div>
            </div>
        `).join('');
    },
    
    generateDots: function() {
        let dots = '';
        for (let i = 0; i < this.atraksiData.length; i++) {
            dots += `<span class="dot ${i === this.currentSlideIndex ? 'active' : ''}" onclick="WisataPage.goToSlide(${i})"></span>`;
        }
        return dots;
    },
    
    openAtraksi: function(id) {
        const atraksi = this.atraksiData.find(a => a.id === id);
        if (atraksi && atraksi.link) {
            window.open(atraksi.link, '_blank');
        } else {
            alert(`Informasi tentang ${atraksi.nama} akan segera hadir.`);
        }
    },
    
    prevSlide: function() {
        const slides = document.querySelectorAll('.atraksi-slide');
        const dots = document.querySelectorAll('.dot');
        
        if (slides.length === 0) return;
        
        this.currentSlideIndex--;
        if (this.currentSlideIndex < 0) {
            this.currentSlideIndex = slides.length - 1;
        }
        
        this.updateCarousel(slides, dots);
    },
    
    nextSlide: function() {
        const slides = document.querySelectorAll('.atraksi-slide');
        const dots = document.querySelectorAll('.dot');
        
        if (slides.length === 0) return;
        
        this.currentSlideIndex++;
        if (this.currentSlideIndex >= slides.length) {
            this.currentSlideIndex = 0;
        }
        
        this.updateCarousel(slides, dots);
    },
    
    goToSlide: function(index) {
        const slides = document.querySelectorAll('.atraksi-slide');
        const dots = document.querySelectorAll('.dot');
        
        this.currentSlideIndex = index;
        this.updateCarousel(slides, dots);
    },
    
    updateCarousel: function(slides, dots) {
        const carouselSlides = document.getElementById('carouselSlides');
        if (carouselSlides) {
            const slideWidth = slides[0]?.offsetWidth || 220;
            const newPosition = -this.currentSlideIndex * slideWidth;
            carouselSlides.style.transform = `translateX(${newPosition}px)`;
        }
        
        // Update active class pada dots
        dots.forEach((dot, i) => {
            if (i === this.currentSlideIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Update active class pada slides (opsional)
        slides.forEach((slide, i) => {
            if (i === this.currentSlideIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    },
    
    initMap: function() {
        // Koordinat pusat Kabupaten Pasuruan
        const centerLat = -7.73;
        const centerLng = 112.85;
        
        // Inisialisasi peta
        this.map = L.map('wisata-map').setView([centerLat, centerLng], 10);
        
        // Base map dari OpenStreetMap
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            subdomains: 'abcd',
            maxZoom: 13,
            minZoom: 9
        }).addTo(this.map);
        
        // Tambahkan marker untuk setiap kecamatan
        this.addMarkers();
        
        // Resize peta setelah render
        setTimeout(() => {
            this.map.invalidateSize();
        }, 200);
    },
    
    addMarkers: function() {
        const markers = [];
        
        for (const [nama, data] of Object.entries(this.kecamatanData)) {
            // Buat custom icon
            const customIcon = L.divIcon({
                html: `
                    <div class="custom-marker">
                        <div class="marker-dot"></div>
                        <div class="marker-icon">${data.icon}</div>
                        <div class="marker-label">${nama}</div>
                    </div>
                `,
                className: 'custom-marker-container',
                iconSize: [30, 40],
                iconAnchor: [15, 20],
                popupAnchor: [0, -20]
            });
            
            // Tambah marker ke peta
            const marker = L.marker([data.lat, data.lng], { icon: customIcon })
                .addTo(this.map)
                .bindTooltip(nama, {
                    sticky: true,
                    className: 'kecamatan-tooltip'
                })
                .on('click', () => {
                    this.showKecamatanInfo(nama);
                    this.highlightMarker(nama);
                });
            
            markers.push({ nama, marker });
        }
        
        this.markers = markers;
    },
    
    highlightMarker: function(namaKecamatan) {
        // Hapus highlight dari semua marker
        document.querySelectorAll('.custom-marker').forEach(m => {
            m.classList.remove('active');
        });
        
        // Tambah highlight ke marker yang dipilih
        const activeMarker = document.querySelector(`.custom-marker[data-nama="${namaKecamatan}"]`);
        if (activeMarker) {
            activeMarker.classList.add('active');
        }
        
        // Juga highlight menggunakan class di marker
        if (this.markers) {
            this.markers.forEach(({ nama, marker }) => {
                const markerElement = marker.getElement();
                if (markerElement) {
                    const customMarker = markerElement.querySelector('.custom-marker');
                    if (customMarker) {
                        if (nama === namaKecamatan) {
                            customMarker.classList.add('active');
                        } else {
                            customMarker.classList.remove('active');
                        }
                    }
                }
            });
        }
    },
    
    showKecamatanInfo: function(namaKecamatan) {
        const data = this.kecamatanData[namaKecamatan];
        
        if (!data) {
            this.renderInfoPlaceholder(namaKecamatan);
            return;
        }
        
        // Update current index
        this.currentIndex = this.kecamatanList.indexOf(namaKecamatan);
        this.currentKecamatan = namaKecamatan;
        
        // Update indicator
        const indicator = document.getElementById('currentKecamatanName');
        if (indicator) {
            indicator.textContent = namaKecamatan;
        }
        
        // Highlight marker
        this.highlightMarker(namaKecamatan);
        
        // Pindah peta ke lokasi marker
        if (this.map) {
            this.map.setView([data.lat, data.lng], 12);
        }
        
        // Update informasi
        const infoContainer = document.getElementById('kecamatan-info');
        if (infoContainer) {
            infoContainer.innerHTML = `
                <div class="kecamatan-info-content">
                    <img src="${data.gambar}" alt="${data.nama}" onerror="this.src='images/placeholder.jpg'">
                    <h3>${data.nama} ${data.icon}</h3>
                    <p class="kecamatan-deskripsi">${data.deskripsi}</p>
                    <div class="wisata-unggulan">
                        <h4><i class="fas fa-star"></i> Wisata Unggulan</h4>
                        <ul>
                            ${data.wisataUnggulan.map(wisata => `<li><i class="fas fa-map-marker-alt"></i> ${wisata}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        }
    },
    
    prevKecamatan: function() {
        if (this.kecamatanList.length === 0) return;
        
        let newIndex = this.currentIndex - 1;
        if (newIndex < 0) {
            newIndex = this.kecamatanList.length - 1;
        }
        
        const kecamatanName = this.kecamatanList[newIndex];
        if (this.kecamatanData[kecamatanName]) {
            this.showKecamatanInfo(kecamatanName);
        }
    },
    
    nextKecamatan: function() {
        if (this.kecamatanList.length === 0) return;
        
        let newIndex = this.currentIndex + 1;
        if (newIndex >= this.kecamatanList.length) {
            newIndex = 0;
        }
        
        const kecamatanName = this.kecamatanList[newIndex];
        if (this.kecamatanData[kecamatanName]) {
            this.showKecamatanInfo(kecamatanName);
        }
    },
    
    randomKecamatan: function() {
        const kecamatanNames = Object.keys(this.kecamatanData);
        const randomIndex = Math.floor(Math.random() * kecamatanNames.length);
        const kecamatanName = kecamatanNames[randomIndex];
        this.showKecamatanInfo(kecamatanName);
    },
    
    renderInfoPlaceholder: function(namaKecamatan) {
        const infoContainer = document.getElementById('kecamatan-info');
        if (infoContainer) {
            infoContainer.innerHTML = `
                <div class="kecamatan-info-placeholder">
                    <i class="fas fa-info-circle"></i>
                    <h3>${namaKecamatan}</h3>
                    <p>Informasi lengkap tentang ${namaKecamatan} akan segera ditambahkan.</p>
                    <small>Data sedang dalam pengembangan</small>
                </div>
            `;
        }
        
        const indicator = document.getElementById('currentKecamatanName');
        if (indicator) {
            indicator.textContent = namaKecamatan;
        }
    },
    
    renderUserDropdown: function() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        
        if (!isLoggedIn) {
            return `<button class="login-btn" onclick="navigateTo('login')">Login</button>`;
        }
        
        const displayName = userData.nama || userData.email.split('@')[0];
        const userRole = userData.role;
        
        return `
            <div class="user-dropdown">
                <button class="user-btn" onclick="Navbar.toggleDropdown()">
                    <img src="${userData.avatar || 'images/avatar-default.jpg'}" alt="Avatar" class="user-avatar">
                    <span class="user-name">${displayName}</span>
                    <i class="fas fa-chevron-down dropdown-icon"></i>
                </button>
                <div class="dropdown-menu" id="dropdownMenuWisata">
                    <div class="dropdown-item" onclick="navigateTo('dashboard-${userRole}')">
                        <i class="fas fa-tachometer-alt"></i> Dashboard
                    </div>
                    <div class="dropdown-item" onclick="Navbar.logout()">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </div>
                </div>
            </div>
        `;
    },
    
    searchKecamatan: function() {
        const searchInput = document.getElementById('wisataSearchInput');
        const query = searchInput.value.trim().toLowerCase();
        
        if (!query) return;
        
        const foundKecamatan = Object.keys(this.kecamatanData).find(
            nama => nama.toLowerCase().includes(query)
        );
        
        if (foundKecamatan) {
            this.showKecamatanInfo(foundKecamatan);
            searchInput.value = '';
        } else {
            alert('Kecamatan tidak ditemukan. Coba kata kunci lain.');
        }
    },
    
    afterRender: function() {
        // Inisialisasi peta setelah render
        setTimeout(() => {
            this.initMap();
        }, 200);
        
        // Event listener untuk search
        const searchInput = document.getElementById('wisataSearchInput');
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.searchKecamatan();
                }
            });
        }
        
        // Update total kecamatan
        const totalSpan = document.getElementById('totalKecamatan');
        if (totalSpan) {
            totalSpan.textContent = Object.keys(this.kecamatanData).length;
        }
    },

        generateRatingStars: function(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars += '<i class="fas fa-star star-full"></i>';
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars += '<i class="fas fa-star-half-alt star-half"></i>';
            } else {
                stars += '<i class="far fa-star star-empty"></i>';
            }
        }
        
        return `<div class="stars">${stars}</div>`;
    },
    
    openTempat: function(id) {
        const tempat = this.tempatPopulerData.find(t => t.id === id);
        if (tempat && tempat.link) {
            window.open(tempat.link, '_blank');
        } else {
            alert(`Informasi tentang ${tempat.nama} akan segera hadir.`);
        }
    }
};