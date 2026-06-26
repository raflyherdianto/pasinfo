const DashboardMember = {
    render: function() {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        const memberLevel = userData.memberLevel || 'bronze';
        
        // Level member dengan warna dan icon
        const levelConfig = {
            bronze: {
                name: 'Bronze',
                color: '#cd7f32',
                bgColor: '#f5e6d3',
                icon: 'fa-medal',
                nextLevel: 'Silver',
                nextLevelXp: 500
            },
            silver: {
                name: 'Silver',
                color: '#c0c0c0',
                bgColor: '#f0f0f0',
                icon: 'fa-star',
                nextLevel: 'Gold',
                nextLevelXp: 1500
            },
            gold: {
                name: 'Gold',
                color: '#ffd700',
                bgColor: '#fff8e7',
                icon: 'fa-crown',
                nextLevel: null,
                nextLevelXp: null
            }
        };
        
        const currentLevel = levelConfig[memberLevel];
        const currentXp = 320; // Mock XP
        
        // Fitur berdasarkan level
        const features = {
            bronze: [
                '✅ Bisa komentar & diskusi',
                '✅ Bookmark / simpan artikel',
                '✅ Notifikasi berita sesuai minat'
            ],
            silver: [
                '✅ Bisa komentar & diskusi',
                '✅ Bookmark / simpan artikel',
                '✅ Notifikasi berita sesuai minat',
                '⭐ Akses artikel premium / investigasi',
                '⭐ Ringkasan berita (daily/weekly digest)',
                '⭐ Early access (berita lebih cepat)',
                '⭐ Newsletter eksklusif'
            ],
            gold: [
                '✅ Bisa komentar & diskusi',
                '✅ Bookmark / simpan artikel',
                '✅ Notifikasi berita sesuai minat',
                '⭐ Akses artikel premium / investigasi',
                '⭐ Ringkasan berita (daily/weekly digest)',
                '⭐ Early access (berita lebih cepat)',
                '⭐ Newsletter eksklusif',
                '👑 Akses laporan mendalam (deep analysis)',
                '👑 Bisa request topik berita',
                '👑 Insight khusus (trend, data, opini expert)',
                '👑 Download report / PDF premium'
            ]
        };
        
        return `
            <div class="dashboard-member">
                <!-- Profile Header -->
                <div class="profile-header">
                    <div class="profile-avatar">
                        <img src="${userData.avatar || 'images/avatar-default.jpg'}" alt="Avatar">
                    </div>
                    <div class="profile-info">
                        <h2>${userData.nama || userData.email.split('@')[0]}</h2>
                        <div class="member-badge" style="background: ${currentLevel.bgColor}; color: ${currentLevel.color};">
                            <i class="fas ${currentLevel.icon}"></i> ${currentLevel.name}
                        </div>
                        <p class="member-since">Member sejak: ${new Date().toLocaleDateString('id-ID')}</p>
                    </div>
                </div>
                
                <!-- XP Progress (untuk Bronze/Silver) -->
                ${memberLevel !== 'gold' ? `
                <div class="xp-progress">
                    <div class="xp-header">
                        <span><i class="fas fa-chart-line"></i> Menuju ${currentLevel.nextLevel}</span>
                        <span>${currentXp} / ${currentLevel.nextLevelXp} XP</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(currentXp / currentLevel.nextLevelXp) * 100}%"></div>
                    </div>
                    <p class="xp-note">⭐ Kumpulkan XP dengan membaca artikel, berkomentar, dan berbagi berita</p>
                </div>
                ` : `
                <div class="gold-banner">
                    <i class="fas fa-crown"></i> Selamat! Anda adalah Member Gold. Nikmati semua akses premium!
                </div>
                `}
                
                <!-- Fitur Berdasarkan Level -->
                <div class="features-section">
                    <h3>Fitur Anda</h3>
                    <div class="features-list">
                        ${features[memberLevel].map(f => `<div class="feature-item">${f}</div>`).join('')}
                    </div>
                </div>
                
                <!-- Upgrade Section (untuk Bronze/Silver) -->
                ${memberLevel !== 'gold' ? `
                <div class="upgrade-section">
                    <h3>Upgrade Ke ${currentLevel.nextLevel}</h3>
                    <p>Dapatkan akses lebih lengkap dengan menjadi Member ${currentLevel.nextLevel}</p>
                    <button class="upgrade-btn" onclick="DashboardMember.upgrade()">
                        <i class="fas fa-arrow-up"></i> Upgrade Sekarang
                    </button>
                </div>
                ` : ''}
                
                <!-- Bookmark & Riwayat Baca -->
                <div class="saved-section">
                    <div class="saved-tabs">
                        <button class="tab-btn active" onclick="DashboardMember.switchTab('bookmark')">Bookmark</button>
                        <button class="tab-btn" onclick="DashboardMember.switchTab('history')">Riwayat Baca</button>
                    </div>
                    <div id="saved-content" class="saved-content">
                        <div class="saved-placeholder">
                            <i class="far fa-bookmark"></i>
                            <p>Belum ada artikel yang disimpan</p>
                            <small>Klik icon bookmark pada artikel untuk menyimpannya</small>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    
    upgrade: function() {
        alert('Fitur upgrade akan tersedia di tahap berikutnya. Silakan hubungi admin untuk informasi lebih lanjut.');
    },
    
    switchTab: function(tab) {
        const tabs = document.querySelectorAll('.tab-btn');
        tabs.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        const contentDiv = document.getElementById('saved-content');
        
        if (tab === 'bookmark') {
            contentDiv.innerHTML = `
                <div class="saved-placeholder">
                    <i class="far fa-bookmark"></i>
                    <p>Belum ada artikel yang disimpan</p>
                    <small>Klik icon bookmark pada artikel untuk menyimpannya</small>
                </div>
            `;
        } else {
            contentDiv.innerHTML = `
                <div class="saved-placeholder">
                    <i class="far fa-clock"></i>
                    <p>Belum ada riwayat baca</p>
                    <small>Artikel yang Anda baca akan muncul di sini</small>
                </div>
            `;
        }
    }
};