const JelajahPage = {
    render: function(kategori) {
        console.log('JelajahPage.render called with kategori:', kategori);
        
        const konten = {
            wisata: {
                title: 'Wisata Pasuruan',
                description: 'Jelajahi keindahan alam dan tempat wisata di Pasuruan'
            },
            kuliner: {
                title: 'Kuliner Pasuruan',
                description: 'Nikmati kelezatan kuliner khas Pasuruan'
            },
            budaya: {
                title: 'Budaya Pasuruan',
                description: 'Mengenal lebih dalam tradisi dan budaya Pasuruan'
            },
            acara: {
                title: 'Acara Pasuruan',
                description: 'Informasi event dan acara terkini di Pasuruan'
            }
        };
        
        const data = konten[kategori] || konten.wisata;
        
        return `
            <div class="jelajah-container" style="max-width: 1200px; margin: 40px auto; padding: 0 30px;">
                <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 30px;">
                    <button onclick="navigateTo('home')" style="background: none; border: none; color: #003366; font-size: 16px; cursor: pointer;">
                        <i class="fas fa-arrow-left"></i> Kembali
                    </button>
                    <h1 style="color: #003366; font-size: 28px;">${data.title}</h1>
                </div>
                
                <div style="background-color: white; border-radius: 16px; padding: 40px; box-shadow: 0 5px 20px rgba(0,0,0,0.1);">
                    <img src="images/jelajah/${kategori}-detail.jpg" alt="${data.title}" style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 12px; margin-bottom: 30px;" onerror="this.src='images/placeholder.jpg'">
                    
                    <p style="font-size: 16px; line-height: 1.8; color: #444; margin-bottom: 20px;">
                        ${data.description}
                    </p>
                    
                    <p style="font-size: 16px; line-height: 1.8; color: #444;">
                        Halaman ini sedang dalam pengembangan. Akan segera hadir informasi lengkap seputar ${data.title.toLowerCase()}.
                    </p>
                </div>
            </div>
        `;
    }
};