// Router Object
const Router = {
    currentPage: 'home',
    currentParams: null,
    
    routes: {
        home: (params) => {
            console.log('Rendering home page with params:', params);
            return HomePage.render(params?.kategori || 'lokal');
        },
        kategori: (params) => {
            console.log('Rendering kategori page with params:', params);
            return KategoriPage.render(params?.kategori || 'lokal');
        },
        login: () => {
            console.log('Rendering login page');
            return LoginPage.render();
        },
        register: () => {
            console.log('Rendering register page');
            return RegisterPage.render();
        },
        berita: (params) => {
            console.log('Rendering berita page with params:', params);
            return BeritaPage.render(params?.id || 1);
        },
        search: (params) => {
            console.log('Rendering search results for:', params);
            return SearchPage.render(params);
        },
        jelajah: (params) => {
            console.log('Rendering jelajah page with params:', params);
            return JelajahPage.render(params);
        },
        wisata: () => { 
            console.log('Rendering wisata page');
            const html = WisataPage.render();
            setTimeout(() => {
                if (WisataPage.afterRender) WisataPage.afterRender();
            }, 100);
            return html;
        },
        'dashboard-member': () => DashboardMember.render(),
        'dashboard-penulis': () => DashboardPenulis.render()
    },
    
    navigate: function(page, params = null) {
        console.log('Navigating to:', page, params);
        
        // Update state
        this.currentPage = page;
        this.currentParams = params;
        
        // Update URL (optional, untuk bookmark)
        if (params) {
            if (page === 'berita') {
                window.location.hash = `#${page}/${params.id}`;
            } else if (page === 'home' && params.kategori) {
                window.location.hash = `#${page}/${params.kategori}`;
            } else if (page === 'search' && params) {
                window.location.hash = `#${page}/${encodeURIComponent(params)}`;
            } else if (page === 'jelajah' && params) {
                window.location.hash = `#${page}/${encodeURIComponent(params)}`;
            } else {
                window.location.hash = `#${page}`;
            }
        } else {
            window.location.hash = `#${page}`;
        }
        
        // Render halaman
        this.render();
    },
    
    render: function() {
        console.log('Rendering page:', this.currentPage);
        
        // Untuk halaman wisata, navbar-nya khusus (tidak menggunakan Navbar biasa)
        // Karena halaman wisata memiliki navbar sendiri di dalam WisataPage
        const navbar = document.getElementById('navbar');
        
        // Jika halaman wisata, sembunyikan navbar default
        if (this.currentPage === 'wisata') {
            if (navbar) navbar.style.display = 'none';
        } else {
            if (navbar) navbar.style.display = 'block';
            const selectedKategori = this.currentParams?.kategori || 
                                    (this.currentPage === 'home' ? 'lokal' : null);
            navbar.innerHTML = Navbar.render(this.currentPage, selectedKategori);
        }
        
        // Render main content
        const mainContent = document.getElementById('main-content');
        const renderFunction = this.routes[this.currentPage];
        
        if (mainContent) {
            if (renderFunction) {
                try {
                    mainContent.innerHTML = renderFunction(this.currentParams);
                } catch (error) {
                    console.error('Error rendering page:', error);
                    mainContent.innerHTML = '<div class="error">Terjadi kesalahan saat memuat halaman</div>';
                }
            } else {
                mainContent.innerHTML = '<div class="error">Halaman tidak ditemukan</div>';
            }
        } else {
            console.error('Main content element not found');
        }
        

        window.scrollTo(0, 0);
    },
    
    handleHashChange: function() {
        const hash = window.location.hash.slice(1); 
        console.log('Hash changed:', hash);
        
        if (!hash || hash === '') {
            this.navigate('home');
            return;
        }
        
        const parts = hash.split('/');
        const page = parts[0];
        
        if (page === 'berita' && parts[1]) {
            this.navigate('berita', { id: parts[1] });
        } else if (page === 'jelajah' && parts[1]) {
            this.navigate('jelajah', parts[1]);
        } else if (page === 'dashboard-member') {
            this.navigate('dashboard-member');
        } else if (page === 'dashboard-penulis') {
            this.navigate('dashboard-penulis');
        } else if (page === 'home' && parts[1]) {
            this.navigate('home', { kategori: parts[1] });
        } else if (page === 'kategori' && parts[1]) {
            this.navigate('kategori', { kategori: parts[1] });
        } else if (page === 'wisata') {  
            this.navigate('wisata');
        } else if (this.routes[page]) {
            this.navigate(page);
        } else {
            this.navigate('home');
        }
    }
};

window.navigateTo = function(page, param = null) {
    console.log('Global navigateTo called:', page, param);
    if (page === 'berita') {
        Router.navigate('berita', { id: param });
    } else if (page === 'home' && param) {
        Router.navigate('home', { kategori: param });
    } else if (page === 'search') {
        Router.navigate('search', param);
    } else if (page === 'kategori') { 
        Router.navigate('kategori', { kategori: param });
    } else if (page === 'jelajah') { 
        Router.navigate('jelajah', param);
    } else if (page === 'wisata') { 
        Router.navigate('wisata');
    } else {
        Router.navigate(page);
    }
};