const SearchPage = {
    render: function(query) {
        console.log('SearchPage.render called for query:', query);
        
        // Data berita contoh (nanti diganti dengan API)
        const allBerita = [
            {
                id: 1,
                judul: 'Arus Mudik Mulai Meroket, 116 Ribu Kendaraan Lintasi Tol Gempol-Pasuruan dalam Sepekan',
                waktu: '12 menit yang lalu',
                kategori: 'lokal'
            },
            {
                id: 2,
                judul: 'Pemerintah Kabupaten Pasuruan Luncurkan Program Bedah Rumah untuk Warga Kurang Mampu',
                waktu: '1 jam yang lalu',
                kategori: 'inspiratif'
            },
            {
                id: 3,
                judul: 'Debat Publik Calon Bupati Pasuruan Digelar Malam Ini',
                waktu: '3 jam yang lalu',
                kategori: 'politik'
            },
            {
                id: 4,
                judul: 'Festival Kuliner Pasuruan Meriahkan Akhir Pekan',
                waktu: '5 jam yang lalu',
                kategori: 'lokal'
            }
        ];
        
        // Filter berita berdasarkan query
        const searchResults = allBerita.filter(berita => 
            berita.judul.toLowerCase().includes(query.toLowerCase())
        );
        
        let resultsHTML = '';
        
        if (searchResults.length > 0) {
            searchResults.forEach(berita => {
                resultsHTML += `
                    <div class="berita-item" onclick="navigateTo('berita', ${berita.id})">
                        <div class="berita-content">
                            <h3 class="berita-judul">${berita.judul}</h3>
                            <span class="berita-waktu"><i class="far fa-clock"></i> ${berita.waktu} • ${berita.kategori}</span>
                        </div>
                    </div>
                `;
            });
        } else {
            resultsHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>Maaf, tidak ditemukan berita dengan kata kunci "${query}"</p>
                    <p style="font-size: 14px; margin-top: 10px;">Coba gunakan kata kunci lain</p>
                </div>
            `;
        }
        
        return `
            <div class="search-results">
                <h2 class="search-results-title">
                    <i class="fas fa-search" style="margin-right: 10px;"></i>
                    Hasil Pencarian: "${query}"
                </h2>
                <div class="berita-list">
                    ${resultsHTML}
                </div>
            </div>
        `;
    }
};