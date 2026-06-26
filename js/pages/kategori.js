const KategoriPage = {
    render: function(kategori) {
        console.log('KategoriPage.render called with kategori:', kategori);
        
        // Mapping nama kategori untuk ditampilkan
        const kategoriNames = {
            lokal: 'Lokal',
            nasional: 'Nasional',
            internasional: 'Internasional',
            inspiratif: 'Inspiratif',
            politik: 'Politik'
        };
        
        const kategoriTitle = kategoriNames[kategori] || kategori;
        
        // Mock data berita berdasarkan kategori
        const allBerita = {
            lokal: {
                featured: {
                    id: 1,
                    judul: 'Arus Mudik Mulai Meroket, 116 Ribu Kendaraan Lintasi Tol Gempol-Pasuruan dalam Sepekan',
                    waktu: '10 menit',
                    penulis: 'Redaksi Pasuruan Info',
                    gambar: 'images/themes/photo.jpg',
                    kategori: 'LOKAL'
                },
                latest: [
                    {
                        id: 2,
                        judul: 'Festival Kuliner Pasuruan Meriahkan Akhir Pekan, Ribuan Pengunjung Hadir',
                        waktu: '5 menit',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'LOKAL'
                    },
                    {
                        id: 3,
                        judul: 'Pemkab Pasuruan Canangkan Program Pasuruan Bersih 2026',
                        waktu: '15 menit',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'LOKAL'
                    },
                    {
                        id: 4,
                        judul: 'Taman Kota Pasuruan Diresmikan, Jadi Tempat Wisata Baru Warga',
                        waktu: '25 menit',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'LOKAL'
                    },
                    {
                        id: 4,
                        judul: 'Taman Kota Pasuruan Diresmikan, Jadi Tempat Wisata Baru Warga',
                        waktu: '25 menit',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'LOKAL'
                    }
                ],
                list: [
                    {
                        id: 5,
                        judul: 'Ribuan Pelajar Ikuti Olimpiade Sains Tingkat Kabupaten Pasuruan',
                        waktu: '1 jam lalu',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'LOKAL'
                    },
                    {
                        id: 6,
                        judul: 'DPRD Pasuruan Gelar Rapat Paripurna Bahas APBD Perubahan',
                        waktu: '2 jam lalu',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'LOKAL'
                    },
                    {
                        id: 7,
                        judul: 'Pasar Tradisional Pasuruan Mulai Ramai Jelang Ramadhan',
                        waktu: '3 jam lalu',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'LOKAL'
                    },
                    {
                        id: 8,
                        judul: 'Sekolah Dasar di Pasuruan Terapkan Kurikulum Berbasis Lingkungan',
                        waktu: '5 jam lalu',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'LOKAL'
                    },
                ]
            },
            nasional: {
                featured: {
                    id: 101,
                    judul: 'Presiden Resmikan Tol Trans-Jawa Ruas Terakhir di Jawa Timur',
                    waktu: '15 menit',
                    penulis: 'Redaksi Nasional',
                    gambar: 'images/themes/photo.jpg',
                    kategori: 'NASIONAL'
                },
                latest: [
                    {
                        id: 102,
                        judul: 'DPR Sahkan RUU Cipta Kerja Jadi Undang-Undang',
                        waktu: '8 menit',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'NASIONAL'
                    },
                    {
                        id: 103,
                        judul: 'Menteri Keuangan Umumkan Kebijakan Ekonomi Baru',
                        waktu: '20 menit',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'NASIONAL'
                    },
                    {
                        id: 104,
                        judul: 'Golongan Darah Langka Mulai Langka di PMI Pusat',
                        waktu: '35 menit',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'NASIONAL'
                    },
                    {
                        id: 104,
                        judul: 'Golongan Darah Langka Mulai Langka di PMI Pusat',
                        waktu: '35 menit',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'NASIONAL'
                    }
                ],
                list: [
                    {
                        id: 105,
                        judul: 'Pemerintah Siapkan Bansos untuk Masyarakat Kurang Mampu',
                        waktu: '1 jam lalu',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'NASIONAL'
                    },
                    {
                        id: 106,
                        judul: 'KPU Tetapkan Jadwal Pilkada Serentak 2027',
                        waktu: '2 jam lalu',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'NASIONAL'
                    },
                    {
                        id: 107,
                        judul: 'Harga BBM Bersubsidi Resmi Naik Mulai April 2026',
                        waktu: '3 jam lalu',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'NASIONAL'
                    },
                    {
                        id: 108,
                        judul: 'Timnas Indonesia Menang Telak di Kualifikasi Piala Asia',
                        waktu: '5 jam lalu',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'NASIONAL'
                    }
                ]
            },
            internasional: {
                featured: {
                    id: 201,
                    judul: 'Konferensi Perdamaian Dunia Digelar di Singapura',
                    waktu: '30 menit',
                    penulis: 'Redaksi Internasional',
                    gambar: 'images/themes/photo.jpg',
                    kategori: 'INTERNASIONAL'
                },
                latest: [
                    {
                        id: 202,
                        judul: 'Harga Minyak Dunia Melonjak Akibat Konflik Timur Tengah',
                        waktu: '10 menit',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'INTERNASIONAL'
                    },
                    {
                        id: 203,
                        judul: 'Krisis Pangan Global Mengancam Negara Berkembang',
                        waktu: '25 menit',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'INTERNASIONAL'
                    },
                    {
                        id: 204,
                        judul: 'China dan AS Sepakati Kerja Sama Perdagangan Baru',
                        waktu: '45 menit',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'INTERNASIONAL'
                    },
                    {
                        id: 204,
                        judul: 'China dan AS Sepakati Kerja Sama Perdagangan Baru',
                        waktu: '45 menit',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'INTERNASIONAL'
                    }
                ],
                list: [
                    {
                        id: 205,
                        judul: 'Piala Dunia 2026 Resmi Dimulai di Amerika Serikat',
                        waktu: '2 jam lalu',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'INTERNASIONAL'
                    },
                    {
                        id: 206,
                        judul: 'Perubahan Iklim: Rekor Suhu Tertinggi Terjadi di Eropa',
                        waktu: '3 jam lalu',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'INTERNASIONAL'
                    },
                    {
                        id: 207,
                        judul: 'Rusia dan Ukraina Sepakat Gencatan Senjata Sementara',
                        waktu: '5 jam lalu',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'INTERNASIONAL'
                    },
                    {
                        id: 208,
                        judul: 'Rusia dan Ukraina Sepakat Gencatan Senjata Sementara',
                        waktu: '5 jam lalu',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'INTERNASIONAL'
                    }
                ]
            },
            inspiratif: {
                featured: {
                    id: 301,
                    judul: 'Kisah Pemuda Pasuruan Sukses Kembangkan Bisnis Kerajinan Tangan Hingga Ekspor',
                    waktu: '20 menit',
                    penulis: 'Redaksi Inspiratif',
                    gambar: 'images/themes/photo.jpg',
                    kategori: 'INSPIRATIF'
                },
                latest: [
                    {
                        id: 302,
                        judul: 'Guru Honorer 20 Tahun Akhirnya Diangkat Jadi ASN',
                        waktu: '5 menit',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'INSPIRATIF'
                    },
                    {
                        id: 303,
                        judul: 'Siswa Difabel Raih Medali Emas Olimpiade Matematika',
                        waktu: '18 menit',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'INSPIRATIF'
                    },
                    {
                        id: 304,
                        judul: 'Ibu Rumah Tangga Kembangkan Usaha Catering dari Modal Rp 500 Ribu',
                        waktu: '30 menit',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'INSPIRATIF'
                    },
                    {
                        id: 304,
                        judul: 'Ibu Rumah Tangga Kembangkan Usaha Catering dari Modal Rp 500 Ribu',
                        waktu: '30 menit',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'INSPIRATIF'
                    }
                ],
                list: [
                    {
                        id: 305,
                        judul: 'Nelayan Pasuruan Sukses Budidaya Lobster, Omzet Miliaran Rupiah',
                        waktu: '1 jam lalu',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'INSPIRATIF'
                    },
                    {
                        id: 306,
                        judul: 'Mahasiswa Ciptakan Aplikasi Deteksi Dini Kanker',
                        waktu: '2 jam lalu',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'INSPIRATIF'
                    },
                    {
                        id: 307,
                        judul: 'Komunitas Peduli Sampah Ubah Limbah Plastik Jadi Paving Block',
                        waktu: '4 jam lalu',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'INSPIRATIF'
                    },
                    {
                        id: 308,
                        judul: 'Komunitas Peduli Sampah Ubah Limbah Plastik Jadi Paving Block',
                        waktu: '4 jam lalu',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'INSPIRATIF'
                    }
                ]
            },
            politik: {
                featured: {
                    id: 401,
                    judul: 'Partai Politik Mulai Siapkan Kader untuk Pilkada 2027',
                    waktu: '25 menit',
                    penulis: 'Redaksi Politik',
                    gambar: 'images/themes/photo.jpg',
                    kategori: 'POLITIK'
                },
                latest: [
                    {
                        id: 402,
                        judul: 'Koalisi Partai Bentuk Sekretariat Bersama Hadapi Pemilu',
                        waktu: '12 menit',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'POLITIK'
                    },
                    {
                        id: 403,
                        judul: 'Tokoh Muda Pasuruan Maju Sebagai Calon Bupati',
                        waktu: '22 menit',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'POLITIK'
                    },
                    {
                        id: 404,
                        judul: 'Debat Publik Calon Legislatif Digelar Malam Ini',
                        waktu: '35 menit',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'POLITIK'
                    },
                    {
                        id: 404,
                        judul: 'Debat Publik Calon Legislatif Digelar Malam Ini',
                        waktu: '35 menit',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'POLITIK'
                    }
                ],
                list: [
                    {
                        id: 405,
                        judul: 'KPU Tetapkan Daftar Calon Tetap Anggota DPRD',
                        waktu: '1 jam lalu',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'POLITIK'
                    },
                    {
                        id: 406,
                        judul: 'Politikus Senior Serukan Persatuan Jelang Pemilu',
                        waktu: '2 jam lalu',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'POLITIK'
                    },
                    {
                        id: 407,
                        judul: 'Survei Elektabilitas Calon Bupati Pasuruan Rilis',
                        waktu: '3 jam lalu',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'POLITIK'
                    },
                    {
                        id: 408,
                        judul: 'Survei Elektabilitas Calon Bupati Pasuruan Rilis',
                        waktu: '3 jam lalu',
                        gambar: 'images/themes/photo.jpg',
                        kategori: 'POLITIK'
                    }
                ]
            }
        };
        
        // Ambil data berdasarkan kategori, fallback ke lokal jika tidak ada
        const data = allBerita[kategori] || allBerita.lokal;
        
        // Generate HTML untuk list berita
        const listBeritaHTML = data.list.map(berita => `
            <div class="kategori-berita-item" onclick="navigateTo('berita', ${berita.id})">
                <div class="kategori-berita-image">
                    <img src="${berita.gambar}" alt="${berita.judul}" onerror="this.src='images/placeholder.jpg'">
                </div>
                <div class="kategori-berita-content">
                    <h3 class="kategori-berita-judul">${berita.judul}</h3>
                    <span class="kategori-berita-waktu"><i class="far fa-clock"></i> ${berita.waktu}</span>
                </div>
            </div>
        `).join('');
        
        return `
            <div class="home-container">
                <!-- Judul Kategori -->
                <div class="kategori-header">
                    <h1 class="kategori-title">Berita ${kategoriTitle}</h1>
                    <div class="kategori-line"></div>
                </div>
                
                <!-- Featured News + Latest News -->
                <div class="featured-news">
                    <!-- Bagian Kiri - Gambar Besar -->
                    <div class="featured-left">
                        <div class="featured-card" onclick="navigateTo('berita', ${data.featured.id})">
                            <div class="featured-image">
                                <img src="${data.featured.gambar}" alt="${data.featured.judul}" onerror="this.src='images/placeholder.jpg'">
                                <div class="featured-overlay">
                                    <span class="featured-category">${data.featured.kategori}</span>
                                    <h2 class="featured-title">${data.featured.judul}</h2>
                                    <div class="featured-meta">
                                        <span><i class="far fa-clock"></i> ${data.featured.waktu}</span>
                                        <span class="separator"></span>
                                        <span><i class="far fa-user"></i> ${data.featured.penulis}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Bagian Kanan - Berita Terbaru -->
                    <div class="latest-news">
                        <h3 class="latest-title">Berita Terbaru</h3>
                        <div class="latest-list">
                            ${data.latest.map(berita => `
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
                
                <!-- List Berita Lainnya -->
                <div class="kategori-list-section">
                    <h2 class="section-title">Berita Lainnya</h2>
                    <div class="kategori-berita-grid">
                        ${listBeritaHTML}
                    </div>
                </div>
                
                <!-- Pasinfo Jelajah Section -->
                <div class="pasinfo-jelajah">
                    <div class="pasinfo-header">
                        <div class="pasinfo-logo">
                            <img src="images/pasinfo-jelajah-logo.png" alt="Pasinfo Jelajah" class="pasinfo-logo-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                            <span class="logo-fallback" style="display: none; font-size: 28px; font-weight: 700; color: #003366;">Pasinfo Jelajah</span>
                            <div class="pasinfo-description">Ingin mengenal Pasuruan lebih dalam?</div>
                        </div>
                    </div>
                    
                    <div class="pasinfo-grid">
                        <div class="pasinfo-item" onclick="navigateTo('jelajah', 'wisata')">
                            <div class="pasinfo-image">
                                <img src="images/themes/photo.jpg" alt="Wisata Pasuruan" onerror="this.src='images/placeholder.jpg'">
                            </div>
                            <div class="pasinfo-caption">Wisata</div>
                        </div>
                        <div class="pasinfo-item" onclick="navigateTo('jelajah', 'kuliner')">
                            <div class="pasinfo-image">
                                <img src="images/themes/photo.jpg" alt="Kuliner Pasuruan" onerror="this.src='images/placeholder.jpg'">
                            </div>
                            <div class="pasinfo-caption">Kuliner</div>
                        </div>
                        <div class="pasinfo-item" onclick="navigateTo('jelajah', 'budaya')">
                            <div class="pasinfo-image">
                                <img src="images/themes/photo.jpg" alt="Budaya Pasuruan" onerror="this.src='images/placeholder.jpg'">
                            </div>
                            <div class="pasinfo-caption">Budaya</div>
                        </div>
                        <div class="pasinfo-item" onclick="navigateTo('jelajah', 'acara')">
                            <div class="pasinfo-image">
                                <img src="images/themes/photo.jpg" alt="Acara Pasuruan" onerror="this.src='images/placeholder.jpg'">
                            </div>
                            <div class="pasinfo-caption">Acara</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};