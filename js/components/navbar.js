const Navbar = {
    render: function(currentPage = 'home', selectedKategori = 'lokal') {
        console.log('Navbar.render called', { currentPage, selectedKategori });
        
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        const userRole = userData.role;

        let loginButtonHTML = '';

        if (!isLoggedIn) {
            loginButtonHTML = `
                <button class="login-btn" onclick="navigateTo('login')">
                    <i class="fas fa-key"></i> Login
                </button>
            `;
        } else {
            // Tampilkan dropdown dengan nama user
            let displayName = '';
            let badgeIcon = '';
            
            if (userRole === 'member') {
                const level = userData.memberLevel || 'bronze';
                const levelIcon = level === 'bronze' ? '🥉' : level === 'silver' ? '🥈' : '🥇';
                displayName = `${userData.nama || userData.email.split('@')[0]}`;
                badgeIcon = `<span class="level-badge ${level}">${levelIcon} ${level.toUpperCase()}</span>`;
            } else if (userRole === 'penulis') {
                displayName = `${userData.nama || userData.email.split('@')[0]}`;
                badgeIcon = `<span class="level-badge penulis">✍️ PENULIS</span>`;
            }
            
            loginButtonHTML = `
                <div class="user-dropdown">
                    <button class="user-btn" onclick="Navbar.toggleDropdown()">
                        <img src="${userData.avatar || 'images/avatar-default.jpg'}" alt="Avatar" class="user-avatar">
                        <span class="user-name">${displayName}</span>
                        ${badgeIcon}
                        <i class="fas fa-chevron-down dropdown-icon"></i>
                    </button>
                    <div class="dropdown-menu" id="dropdownMenu">
                        <div class="dropdown-item" onclick="navigateTo('dashboard-${userRole}')">
                            <i class="fas fa-tachometer-alt"></i> Dashboard
                        </div>
                        <div class="dropdown-item" onclick="Navbar.logout()">
                            <i class="fas fa-sign-out-alt"></i> Logout
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Dapatkan tema frame dari localStorage atau gunakan default
        const currentTheme = localStorage.getItem('themeFrame') || 'default';
        
// BARIS 1: Logo (1/4) dan Theme Frame (3/4)
                return `
                    <div class="navbar">
                    <div class="navbar">
                        <!-- BARIS 1: Logo (1/4) dan Theme Container (3/4) - LANGSUNG tempat gambar -->
                        <div class="navbar-top">
                            <!-- Logo Container dengan Gradasi Biru (1/4) -->
                            <div class="logo-container">
                                <div class="logo" onclick="navigateTo('home')">
                                    <img src="images/logo.png" alt="Pasuruan Info" class="logo-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                                    <span class="logo-fallback" style="display: none;">Pasuruan Info</span>
                                </div>
                            </div>
                            
                            <!-- Theme Container (3/4) - LANGSUNG sebagai tempat gambar -->
                            <div class="theme-container" onclick="Navbar.changeTheme()" title="Klik untuk ganti gambar ucapan">
                                ${Navbar.getThemeImage(currentTheme)}
                            </div>
                        </div>
                    </div>
                
                <!-- BARIS 2: Navigasi dan Search dengan Background Biru Muda -->
                <div class="navbar-bottom">
                    <div class="nav-left">
                        ${loginButtonHTML}
                        
                        <div class="nav-kategori">
                            <span class="kategori-link ${selectedKategori === 'lokal' ? 'active' : ''}" onclick="navigateTo('kategori', 'lokal')">Lokal</span>
                            <span class="kategori-link ${selectedKategori === 'nasional' ? 'active' : ''}" onclick="navigateTo('kategori', 'nasional')">Nasional</span>
                            <span class="kategori-link ${selectedKategori === 'internasional' ? 'active' : ''}" onclick="navigateTo('kategori', 'internasional')">Internasional</span>
                            <span class="kategori-link ${selectedKategori === 'inspiratif' ? 'active' : ''}" onclick="navigateTo('kategori', 'inspiratif')">Inspiratif</span>
                            <span class="kategori-link ${selectedKategori === 'politik' ? 'active' : ''}" onclick="navigateTo('kategori', 'politik')">Politik</span>
                        </div>
                    </div>
                    
                    <!-- Search Box -->
                    <div class="search-container">
                        <input type="text" class="search-input" placeholder="Cari berita..." id="searchInput" onkeypress="Navbar.handleSearchKeyPress(event)">
                        <button class="search-btn" onclick="Navbar.handleSearch()">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    },
    
    getThemeImage: function(theme) {
    // Cek apakah ada gambar di folder themes
    const imagePath = `images/themes/photo.jpg`;
    
    // Coba load gambar, jika gagal tampilkan placeholder
    const img = new Image();
    img.src = imagePath;
    
    // Langsung return elemen yang akan ditampilkan
    return `<img src="${imagePath}" alt="Theme" class="theme-image" onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=theme-placeholder><i class=fas fa-image></i> Gambar Ucapan</div>'">`;
    },

    toggleDropdown: function() {
    const dropdown = document.getElementById('dropdownMenu');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
},

    logout: function() {
        // Hapus data user dari localStorage
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userData');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userEmail');
        
        // Arahkan ke halaman home
        navigateTo('home');
        
        // Tutup dropdown jika terbuka
        const dropdown = document.getElementById('dropdownMenu');
        if (dropdown) {
            dropdown.classList.remove('show');
        }
    },

    handleSearch: function() {
        const searchInput = document.getElementById('searchInput');
        const query = searchInput.value.trim();
        
        if (query) {
            console.log('Searching for:', query);
            // Pindah ke halaman search dengan query
            navigateTo('search', query);
        } else {
            alert('Masukkan kata kunci pencarian');
        }
    },
    
    handleSearchKeyPress: function(event) {
        if (event.key === 'Enter') {
            this.handleSearch();
        }
    }
};

document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('dropdownMenu');
    const userBtn = document.querySelector('.user-btn');
    
    if (dropdown && userBtn && !userBtn.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.remove('show');
    }
});