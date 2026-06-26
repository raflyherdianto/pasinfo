const DashboardPenulis = {
    currentPage: 1, // 1 = Tulis Berita, 2 = Riwayat Berita
    editingBeritaId: null, // Untuk menyimpan ID berita yang sedang diedit
    
    render: function() {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        
        // Mock data berita penulis (dengan konten lengkap untuk edit)
        const riwayatBerita = [
            { 
                id: 1, 
                judul: 'Arus Mudik Mulai Meroket di Tol Gempol-Pasuruan', 
                status: 'rilis', 
                views: 15234, 
                tanggal: '2026-03-20',
                kategori: 'lokal',
                konten: 'Arus mudik Lebaran tahun ini mulai menunjukkan peningkatan signifikan. Data dari PT Jasamarga Pasuruan-Probolinggo mencatat sebanyak 116 ribu kendaraan telah melintasi Tol Gempol-Pasuruan dalam sepekan terakhir...',
                caption: 'Ilustrasi arus mudik di Tol Gempol-Pasuruan',
                lokasi: { desa: 'Bugul Kidul', kecamatan: 'Bugul Kidul', kota: 'Pasuruan', provinsi: 'Jawa Timur' }
            },
            { 
                id: 2, 
                judul: 'Festival Kuliner Pasuruan Meriahkan Akhir Pekan', 
                status: 'rilis', 
                views: 8921, 
                tanggal: '2026-03-18',
                kategori: 'lokal',
                konten: 'Festival Kuliner Pasuruan kembali digelar di Alun-alun Kota Pasuruan. Ribuan pengunjung hadir menikmati berbagai makanan khas...',
                caption: 'Suasana Festival Kuliner Pasuruan',
                lokasi: { desa: 'Panggungrejo', kecamatan: 'Panggungrejo', kota: 'Pasuruan', provinsi: 'Jawa Timur' }
            },
            { 
                id: 3, 
                judul: 'Pemkab Pasuruan Canangkan Program Hijau', 
                status: 'dikoreksi', 
                views: 0, 
                tanggal: '2026-03-22',
                kategori: 'inspiratif',
                konten: 'Pemerintah Kabupaten Pasuruan meluncurkan program penghijauan di area Gunung Bromo...',
                caption: 'Penanaman pohon di area Bromo',
                lokasi: { desa: 'Tosari', kecamatan: 'Tosari', kota: 'Pasuruan', provinsi: 'Jawa Timur' }
            },
            { 
                id: 4, 
                judul: 'Wisata Baru di Kaki Gunung Bromo', 
                status: 'revisi', 
                views: 0, 
                tanggal: '2026-03-21',
                kategori: 'wisata',
                konten: 'Destinasi wisata baru dibuka di kawasan Bromo. Pengunjung bisa menikmati sunrise dari spot baru...',
                caption: 'Spot sunrise baru di Bromo',
                lokasi: { desa: 'Wonokitri', kecamatan: 'Tosari', kota: 'Pasuruan', provinsi: 'Jawa Timur' }
            },
            { 
                id: 5, 
                judul: 'Dialog Publik Tentang Pendidikan', 
                status: 'draft', 
                views: 0, 
                tanggal: '2026-03-23',
                kategori: 'nasional',
                konten: 'Dialog publik membahas masa depan pendidikan di Pasuruan digelar di Balai Kota...',
                caption: 'Suasana dialog publik',
                lokasi: { desa: 'Kebonsari', kecamatan: 'Kebonsari', kota: 'Pasuruan', provinsi: 'Jawa Timur' }
            }
        ];
        
        // Mock data notifikasi dengan status baca
        const notifikasiList = [
            { id: 1, judul: 'Berita "Arus Mudik" telah disetujui', isi: 'Berita Anda telah melalui proses review dan dinyatakan layak tayang. Selamat!', waktu: '2 jam lalu', dibaca: false, icon: 'fa-check-circle', warna: '#28a745' },
            { id: 2, judul: 'Berita "Program Hijau" memerlukan revisi', isi: 'Mohon perhatikan catatan dari editor: Tambahkan data statistik dan foto pendukung.', waktu: '5 jam lalu', dibaca: true, icon: 'fa-edit', warna: '#fd7e14' },
            { id: 3, judul: 'Peringatan: Batas waktu submit', isi: 'Jangan lupa untuk menyelesaikan draft berita Anda sebelum tanggal 25 Maret 2026.', waktu: '1 hari lalu', dibaca: false, icon: 'fa-clock', warna: '#ffc107' },
            { id: 4, judul: 'Selamat! Artikel Anda trending', isi: 'Berita "Festival Kuliner" masuk dalam 5 besar artikel terpopuler minggu ini.', waktu: '2 hari lalu', dibaca: true, icon: 'fa-fire', warna: '#ff6b6b' }
        ];
        
        const statusConfig = {
            draft: { label: 'Draft', color: '#6c757d', icon: 'fa-pen' },
            dikoreksi: { label: 'Dikoreksi Editor', color: '#fd7e14', icon: 'fa-edit' },
            revisi: { label: 'Perlu Revisi', color: '#dc3545', icon: 'fa-undo' },
            rilis: { label: 'Telah Rilis', color: '#28a745', icon: 'fa-check-circle' }
        };
        
        // Jika sedang dalam mode edit, tampilkan form dengan data berita yang dipilih
        const editingBerita = this.editingBeritaId ? riwayatBerita.find(b => b.id === this.editingBeritaId) : null;
        
        return `
            <div class="dashboard-penulis">
                <!-- Sidebar Kiri - Profile -->
                <div class="penulis-sidebar">
                    <div class="penulis-avatar">
                        <img src="${userData.avatar || 'images/avatar-default.jpg'}" alt="Avatar">
                    </div>
                    <h3>${userData.nama || userData.email.split('@')[0]}</h3>
                    <span class="penulis-role">Penulis</span>
                    <div class="xp-display">
                        <i class="fas fa-star"></i> ${userData.xp || 1250} XP
                    </div>
                    
                    <div class="stats-card">
                        <div class="stat-item">
                            <span class="stat-value">12</span>
                            <span class="stat-label">Artikel Rilis</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">45.2K</span>
                            <span class="stat-label">Total Views</span>
                        </div>
                    </div>
                </div>
                
                <!-- Main Content - Form & Riwayat -->
                <div class="penulis-main">
                    <!-- Status Tabs (sembunyikan saat mode edit) -->
                    <div class="status-tabs ${this.editingBeritaId ? 'hidden' : ''}">
                        <button class="status-btn ${this.currentPage === 1 && !this.editingBeritaId ? 'active' : ''}" onclick="DashboardPenulis.switchPage(1)">
                            <i class="fas fa-edit"></i> Tulis Berita
                        </button>
                        <button class="status-btn ${this.currentPage === 2 && !this.editingBeritaId ? 'active' : ''}" onclick="DashboardPenulis.switchPage(2)">
                            <i class="fas fa-history"></i> Riwayat Berita
                        </button>
                    </div>
                    
                    <!-- Tombol kembali jika dalam mode edit -->
                    ${this.editingBeritaId ? `
                        <div class="edit-header">
                            <button class="btn-back" onclick="DashboardPenulis.cancelEdit()">
                                <i class="fas fa-arrow-left"></i> Kembali ke Riwayat
                            </button>
                            <span class="edit-badge">Mengedit: ${editingBerita.judul.substring(0, 40)}${editingBerita.judul.length > 40 ? '...' : ''}</span>
                        </div>
                    ` : ''}
                    
                    <!-- Page 1: Form Tulis Berita (atau Form Edit) -->
                    <div id="form-berita" class="page-content ${(this.currentPage === 1 || this.editingBeritaId) ? 'active' : ''}">
                        <div class="form-berita">
                            <h3>${this.editingBeritaId ? 'Edit Berita' : 'Tulis Berita Baru'}</h3>
                            
                            <!-- Upload Gambar -->
                            <div class="form-group">
                                <label>Upload Gambar <small>(Bisa lebih dari 1, pilih 1 utama)</small></label>
                                <div class="upload-area" id="uploadArea">
                                    <i class="fas fa-cloud-upload-alt"></i>
                                    <p>Klik atau drag gambar ke sini</p>
                                    <small>Gambar utama akan ditampilkan di thumbnail</small>
                                    <input type="file" id="gambarInput" multiple accept="image/*" style="display: none;">
                                </div>
                                <div id="gambarPreview" class="gambar-preview"></div>
                            </div>
                            
                            <!-- Keterangan Gambar -->
                            <div class="form-group">
                                <label>Keterangan Gambar</label>
                                <input type="text" id="captionGambar" placeholder="Caption untuk gambar ini" value="${editingBerita ? editingBerita.caption || '' : ''}">
                            </div>
                            
                            <!-- Lokasi -->
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Desa/Kelurahan</label>
                                    <input type="text" id="desa" placeholder="Nama desa/kelurahan" value="${editingBerita ? editingBerita.lokasi?.desa || '' : ''}">
                                </div>
                                <div class="form-group">
                                    <label>Kecamatan</label>
                                    <input type="text" id="kecamatan" placeholder="Nama kecamatan" value="${editingBerita ? editingBerita.lokasi?.kecamatan || '' : ''}">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Kota/Kabupaten</label>
                                    <input type="text" id="kota" placeholder="Nama kota/kabupaten" value="${editingBerita ? editingBerita.lokasi?.kota || '' : ''}">
                                </div>
                                <div class="form-group">
                                    <label>Provinsi</label>
                                    <input type="text" id="provinsi" placeholder="Nama provinsi" value="${editingBerita ? editingBerita.lokasi?.provinsi || '' : ''}">
                                </div>
                            </div>
                            
                            <!-- Kategori -->
                            <div class="form-group">
                                <label>Kategori</label>
                                <select id="kategori">
                                    <option value="lokal" ${editingBerita && editingBerita.kategori === 'lokal' ? 'selected' : ''}>Lokal</option>
                                    <option value="nasional" ${editingBerita && editingBerita.kategori === 'nasional' ? 'selected' : ''}>Nasional</option>
                                    <option value="internasional" ${editingBerita && editingBerita.kategori === 'internasional' ? 'selected' : ''}>Internasional</option>
                                    <option value="inspiratif" ${editingBerita && editingBerita.kategori === 'inspiratif' ? 'selected' : ''}>Inspiratif</option>
                                    <option value="politik" ${editingBerita && editingBerita.kategori === 'politik' ? 'selected' : ''}>Politik</option>
                                    <option value="wisata" ${editingBerita && editingBerita.kategori === 'wisata' ? 'selected' : ''}>Wisata</option>
                                    <option value="kuliner" ${editingBerita && editingBerita.kategori === 'kuliner' ? 'selected' : ''}>Kuliner</option>
                                </select>
                            </div>
                            
                            <!-- Judul -->
                            <div class="form-group">
                                <label>Judul Berita</label>
                                <input type="text" id="judul" placeholder="Masukkan judul berita" value="${editingBerita ? editingBerita.judul : ''}">
                            </div>
                            
                            <!-- Isi Berita -->
                            <div class="form-group">
                                <label>Isi Berita</label>
                                <textarea id="isiBerita" rows="12" placeholder="Tulis isi berita di sini...">${editingBerita ? editingBerita.konten : ''}</textarea>
                                <small style="color: #888; display: block; margin-top: 5px;">Anda dapat menulis berita dengan format paragraf yang rapi</small>
                            </div>
                            
                            <!-- Action Buttons -->
                            <div class="form-actions">
                                <button type="button" class="btn-draft" onclick="DashboardPenulis.saveDraft()">
                                    <i class="fas fa-save"></i> Simpan Draft
                                </button>
                                <button type="button" class="btn-submit" onclick="DashboardPenulis.submitBerita()">
                                    <i class="fas fa-paper-plane"></i> Kirim ke Editor
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Page 2: Riwayat Berita -->
                    <div id="riwayat-berita" class="page-content ${this.currentPage === 2 && !this.editingBeritaId ? 'active' : ''}">
                        <div class="riwayat-berita">
                            <div class="riwayat-header">
                                <h3>Riwayat Berita</h3>
                                <button class="lihat-semua" onclick="DashboardPenulis.lihatSemua()">
                                    Lihat Semua <i class="fas fa-arrow-right"></i>
                                </button>
                            </div>
                            
                            <div class="riwayat-list">
                                ${riwayatBerita.map(berita => `
                                    <div class="riwayat-item" onclick="DashboardPenulis.editBerita(${berita.id})">
                                        <div class="riwayat-info">
                                            <h4>${berita.judul}</h4>
                                            <div class="riwayat-meta">
                                                <span><i class="far fa-calendar"></i> ${berita.tanggal}</span>
                                                ${berita.status === 'rilis' ? `<span><i class="far fa-eye"></i> ${berita.views.toLocaleString()} dibaca</span>` : ''}
                                            </div>
                                        </div>
                                        <div class="riwayat-status ${berita.status}">
                                            <i class="fas ${statusConfig[berita.status].icon}"></i> ${statusConfig[berita.status].label}
                                        </div>
                                        ${berita.status === 'revisi' ? `
                                            <button class="btn-revisi" onclick="event.stopPropagation(); DashboardPenulis.revisiBerita(${berita.id})">
                                                <i class="fas fa-edit"></i> Revisi
                                            </button>
                                        ` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Sidebar Kanan - Notifikasi & Chat -->
                <div class="penulis-sidebar-right">
                    <div class="chat-section" onclick="DashboardPenulis.openChat()">
                        <div class="chat-header">
                            <i class="fas fa-comment-dots"></i>
                            <span>Konsultasi dengan Editor</span>
                            <span class="badge">1</span>
                        </div>
                        <div class="chat-preview">
                            <p>Editor: Berita Anda sedang direview, tunggu kabar selanjutnya.</p>
                            <small>5 menit lalu</small>
                        </div>
                    </div>
                    
                    <div class="notifikasi-section">
                        <h4><i class="fas fa-bell"></i> Notifikasi</h4>
                        <div class="notifikasi-list">
                            ${notifikasiList.map(notif => `
                                <div class="notifikasi-item ${notif.dibaca ? '' : 'unread'}" onclick="DashboardPenulis.openNotifikasi(${notif.id})">
                                    <i class="fas ${notif.icon}" style="color: ${notif.warna};"></i>
                                    <div>
                                        <p><strong>${notif.judul}</strong></p>
                                        <p class="notif-preview">${notif.isi.substring(0, 60)}${notif.isi.length > 60 ? '...' : ''}</p>
                                        <small><i class="far fa-clock"></i> ${notif.waktu}</small>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    
    switchPage: function(page) {
        this.currentPage = page;
        this.editingBeritaId = null; // Reset edit mode saat ganti tab
        this.renderDashboard();
    },
    
    editBerita: function(id) {
        this.editingBeritaId = id;
        this.renderDashboard();
    },
    
    cancelEdit: function() {
        this.editingBeritaId = null;
        this.currentPage = 2; // Kembali ke halaman riwayat
        this.renderDashboard();
    },
    
    renderDashboard: function() {
        const navbar = document.getElementById('navbar');
        const mainContent = document.getElementById('main-content');
        
        const currentPage = Router.currentPage;
        const selectedKategori = Router.currentParams?.kategori || 
                                (currentPage === 'home' ? 'lokal' : null);
        navbar.innerHTML = Navbar.render('dashboard-penulis', selectedKategori);
        mainContent.innerHTML = this.render();
        
        setTimeout(() => {
            this.initUploadArea();
        }, 100);
    },
    
    initUploadArea: function() {
        const uploadArea = document.getElementById('uploadArea');
        const gambarInput = document.getElementById('gambarInput');
        
        if (uploadArea && gambarInput) {
            const newUploadArea = uploadArea.cloneNode(true);
            uploadArea.parentNode.replaceChild(newUploadArea, uploadArea);
            
            const newGambarInput = document.getElementById('gambarInput');
            const newUploadAreaElem = document.getElementById('uploadArea');
            
            if (newUploadAreaElem && newGambarInput) {
                newUploadAreaElem.addEventListener('click', () => newGambarInput.click());
                
                newUploadAreaElem.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    newUploadAreaElem.style.borderColor = '#003366';
                });
                
                newUploadAreaElem.addEventListener('dragleave', () => {
                    newUploadAreaElem.style.borderColor = '#ddd';
                });
                
                newUploadAreaElem.addEventListener('drop', (e) => {
                    e.preventDefault();
                    const files = e.dataTransfer.files;
                    this.handleFiles(files);
                });
                
                newGambarInput.addEventListener('change', (e) => {
                    this.handleFiles(e.target.files);
                });
            }
        }
    },
    
    handleFiles: function(files) {
        const preview = document.getElementById('gambarPreview');
        if (!preview) return;
        
        preview.innerHTML = '';
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const imgDiv = document.createElement('div');
                    imgDiv.className = 'preview-item';
                    imgDiv.innerHTML = `
                        <img src="${e.target.result}" alt="Preview">
                        <button class="remove-preview" onclick="this.parentElement.remove()">&times;</button>
                    `;
                    preview.appendChild(imgDiv);
                };
                reader.readAsDataURL(file);
            }
        });
    },
    
    saveDraft: function() {
        const judul = document.getElementById('judul')?.value;
        if (!judul) {
            alert('Judul berita harus diisi!');
            return;
        }
        alert(`Berita ${this.editingBeritaId ? 'diperbarui' : 'disimpan'} sebagai draft! (Simulasi)`);
    },
    
    submitBerita: function() {
        const judul = document.getElementById('judul')?.value;
        if (!judul) {
            alert('Judul berita harus diisi!');
            return;
        }
        alert(`Berita telah ${this.editingBeritaId ? 'diperbarui dan' : ''} dikirim ke editor untuk dikoreksi. Terima kasih!`);
        
        // Reset setelah submit
        if (!this.editingBeritaId) {
            const judulInput = document.getElementById('judul');
            const isiInput = document.getElementById('isiBerita');
            if (judulInput) judulInput.value = '';
            if (isiInput) isiInput.value = '';
            const preview = document.getElementById('gambarPreview');
            if (preview) preview.innerHTML = '';
        } else {
            // Jika edit, kembali ke riwayat
            this.cancelEdit();
        }
    },
    
    revisiBerita: function(id) {
        this.editBerita(id);
    },
    
    lihatSemua: function() {
        alert('Fitur lihat semua berita akan tersedia di tahap berikutnya');
    },
    
    openChat: function() {
        alert('Fitur chat dengan editor akan tersedia di tahap berikutnya');
    },
    
    openNotifikasi: function(id) {
        // Simulasi menandai notifikasi sebagai sudah dibaca
        alert(`Membuka notifikasi ID: ${id}\n\nFitur detail notifikasi akan tersedia di tahap berikutnya.`);
        
        // Di sini nanti akan ada logic untuk update status baca di database
        // Untuk sekarang, kita refresh dashboard untuk simulasi
        this.renderDashboard();
    }
};