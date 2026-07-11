<template>
  <div class="min-h-screen bg-white pb-24 font-sans text-gray-900 selection:bg-red-100 selection:text-red-700">
    
    
    <div class="relative h-[400px] md:h-[500px] w-full overflow-hidden bg-gray-900">
      <img 
        src="/bromo.jpg" 
        alt="Gunung Bromo Pasuruan" 
        class="w-full h-full object-cover opacity-80 transition-transform duration-1000 scale-105"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent"></div>
      <div class="absolute bottom-12 left-4 md:left-12 max-w-2xl text-white">
        <span class="inline-block bg-red-600 text-white text-[10px] md:text-xs font-bold tracking-widest uppercase px-3 py-1 rounded mb-4 shadow-sm">
          PANDUAN DESTINASI RESMI
        </span>
        <h1 class="text-4xl md:text-6xl font-black tracking-tight mb-4 drop-shadow-sm uppercase">
          PASURUAN RAYA
        </h1>
        <p class="text-base md:text-xl text-gray-200 leading-relaxed font-light drop-shadow-sm">
          Menjelajahi keindahan alam, budaya, dan sejarah legendaris di seluruh Kota dan Kabupaten Pasuruan.
        </p>
      </div>
    </div>

    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      
      
      <section class="mb-20">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-gray-200 pb-10">
          <div>
            <h2 class="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-4 uppercase">
              Jelajahi Wilayah
            </h2>
            <p class="text-gray-500 max-w-xl leading-relaxed">
              Mulai perjalanan Anda dengan mencari tempat wisata favorit berdasarkan wilayah administratif, geografi alam, atau kategori wisata terbaik di Pasuruan.
            </p>
          </div>
          
          
          <div class="relative w-full md:w-80 group">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Cari nama destinasi..." 
              class="w-full bg-gray-50 hover:bg-gray-100/80 border border-gray-300 rounded-lg py-3 pl-11 pr-4 outline-none focus:bg-white focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all text-sm font-medium"
            />
            <svg class="w-5 h-5 text-gray-400 absolute left-4 top-3.5 group-focus-within:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </section>

      
      <section class="mb-24">
        <h3 class="text-sm font-bold tracking-widest text-red-600 uppercase mb-8 flex items-center gap-2">
          <span class="w-2 h-2 bg-red-600 rounded-full"></span>
          CARI BERDASARKAN PETA & WILAYAH
        </h3>
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          
          <div class="lg:col-span-5 bg-gray-50 rounded-2xl border border-gray-100 p-6 md:p-8 flex flex-col justify-center items-center relative overflow-hidden min-h-[420px] shadow-sm">
            
            <div class="absolute inset-0 opacity-5 pointer-events-none" style="background-image: radial-gradient(#000 1.2px, transparent 1.2px); background-size: 20px 20px;"></div>
            
            <span class="absolute top-4 left-4 text-[10px] text-gray-400 font-bold uppercase tracking-wider select-none">PETA WILAYAH INTERAKTIF</span>
            
            
            <svg viewBox="0 0 500 400" class="w-full h-full max-h-[300px] drop-shadow-md select-none mt-4">
              
              <path d="M 30,50 Q 250,30 470,50" fill="none" stroke="#93c5fd" stroke-width="3" stroke-dasharray="6,4" />
              <text x="250" y="25" class="fill-blue-400 font-bold text-[9px] text-center select-none uppercase tracking-widest" text-anchor="middle">Selat Madura / Pesisir Utara</text>
              
              
              <path 
                d="M 60,80 C 130,70 180,75 230,80 C 220,130 215,160 210,180 C 150,185 100,180 60,170 Z" 
                @click="selectRegion('Pusaka & Religi')"
                @mouseenter="hoveredRegion = 'Pusaka & Religi'"
                @mouseleave="hoveredRegion = null"
                :class="['transition-all duration-300 cursor-pointer stroke-white stroke-2', 
                  activeRegion === 'Pusaka & Religi' ? 'fill-red-600' : 
                  hoveredRegion === 'Pusaka & Religi' ? 'fill-red-500/80' : 'fill-gray-200']"
              />
              
              
              <path 
                d="M 230,80 C 300,75 370,70 440,80 C 445,130 435,170 420,200 C 350,195 280,190 210,180 Z" 
                @click="selectRegion('Pesisir & Danau')"
                @mouseenter="hoveredRegion = 'Pesisir & Danau'"
                @mouseleave="hoveredRegion = null"
                :class="['transition-all duration-300 cursor-pointer stroke-white stroke-2', 
                  activeRegion === 'Pesisir & Danau' ? 'fill-red-600' : 
                  hoveredRegion === 'Pesisir & Danau' ? 'fill-red-500/80' : 'fill-gray-200']"
              />
              
              
              <path 
                d="M 60,170 C 110,180 160,185 210,180 C 200,240 180,300 160,340 C 110,340 80,310 60,170 Z" 
                @click="selectRegion('Arjuno Welirang')"
                @mouseenter="hoveredRegion = 'Arjuno Welirang'"
                @mouseleave="hoveredRegion = null"
                :class="['transition-all duration-300 cursor-pointer stroke-white stroke-2', 
                  activeRegion === 'Arjuno Welirang' ? 'fill-red-600' : 
                  hoveredRegion === 'Arjuno Welirang' ? 'fill-red-500/80' : 'fill-gray-200']"
              />
              
              
              <path 
                d="M 210,180 C 280,190 310,195 320,200 C 310,250 290,300 280,340 C 220,340 180,340 160,340 Z" 
                @click="selectRegion('Agrowisata Tengah')"
                @mouseenter="hoveredRegion = 'Agrowisata Tengah'"
                @mouseleave="hoveredRegion = null"
                :class="['transition-all duration-300 cursor-pointer stroke-white stroke-2', 
                  activeRegion === 'Agrowisata Tengah' ? 'fill-red-600' : 
                  hoveredRegion === 'Agrowisata Tengah' ? 'fill-red-500/80' : 'fill-gray-200']"
              />
              
              
              <path 
                d="M 320,200 C 350,195 390,195 420,200 C 410,240 395,300 380,340 C 330,340 300,340 280,340 Z" 
                @click="selectRegion('Bromo Tengger')"
                @mouseenter="hoveredRegion = 'Bromo Tengger'"
                @mouseleave="hoveredRegion = null"
                :class="['transition-all duration-300 cursor-pointer stroke-white stroke-2', 
                  activeRegion === 'Bromo Tengger' ? 'fill-red-600' : 
                  hoveredRegion === 'Bromo Tengger' ? 'fill-red-500/80' : 'fill-gray-200']"
              />
              
              
              <text x="145" y="130" class="font-extrabold text-[9px] pointer-events-none uppercase tracking-wider" text-anchor="middle" :class="[activeRegion === 'Pusaka & Religi' || hoveredRegion === 'Pusaka & Religi' ? 'fill-white' : 'fill-gray-800']">Pusaka & Religi</text>
              <text x="325" y="140" class="font-extrabold text-[9px] pointer-events-none uppercase tracking-wider" text-anchor="middle" :class="[activeRegion === 'Pesisir & Danau' || hoveredRegion === 'Pesisir & Danau' ? 'fill-white' : 'fill-gray-800']">Pesisir & Danau</text>
              <text x="135" y="260" class="font-extrabold text-[9px] pointer-events-none uppercase tracking-wider" text-anchor="middle" :class="[activeRegion === 'Arjuno Welirang' || hoveredRegion === 'Arjuno Welirang' ? 'fill-white' : 'fill-gray-800']">Arjuno Welirang</text>
              <text x="240" y="270" class="font-extrabold text-[9px] pointer-events-none uppercase tracking-wider" text-anchor="middle" :class="[activeRegion === 'Agrowisata Tengah' || hoveredRegion === 'Agrowisata Tengah' ? 'fill-white' : 'fill-gray-800']">Agrowisata</text>
              <text x="350" y="280" class="font-extrabold text-[9px] pointer-events-none uppercase tracking-wider" text-anchor="middle" :class="[activeRegion === 'Bromo Tengger' || hoveredRegion === 'Bromo Tengger' ? 'fill-white' : 'fill-gray-800']">Bromo Tengger</text>
            </svg>
            
            <div class="mt-6 text-center select-none z-10">
              <span class="text-[11px] text-gray-500 flex items-center justify-center gap-1.5 font-medium bg-white px-4 py-1.5 rounded-full border border-gray-100 shadow-sm">
                <span class="w-2 h-2 bg-red-600 rounded-full inline-block animate-pulse"></span>
                Sorot / klik wilayah peta untuk memfilter
              </span>
            </div>
          </div>

          
          <div class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-6 gap-4">
            
            
            <div 
              @click="selectRegion('Bromo Tengger')"
              @mouseenter="hoveredRegion = 'Bromo Tengger'"
              @mouseleave="hoveredRegion = null"
              :class="['sm:col-span-3 h-[190px] rounded-xl overflow-hidden relative cursor-pointer group transition-all duration-500 shadow-sm border border-gray-100', 
                activeRegion === 'Bromo Tengger' ? 'ring-4 ring-red-600' : '',
                hoveredRegion === 'Bromo Tengger' ? 'scale-[1.02] shadow-md border-red-300' : '']"
            >
              <img 
                src="https://images.unsplash.com/photo-1588668214407-6eb9527092c6?auto=format&fit=crop&q=80&w=800" 
                alt="Bromo Tengger" 
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent p-5 flex flex-col justify-end">
                <span class="text-red-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">Pasuruan Timur</span>
                <h4 class="text-white text-lg font-black mb-1 uppercase">Bromo Tengger</h4>
                <p class="text-gray-300 text-[11px] font-light line-clamp-2">
                  Kawasan kaldera vulkanik legendaris, pasir berbisik, dan kearifan suku Tengger.
                </p>
              </div>
            </div>

            
            <div 
              @click="selectRegion('Arjuno Welirang')"
              @mouseenter="hoveredRegion = 'Arjuno Welirang'"
              @mouseleave="hoveredRegion = null"
              :class="['sm:col-span-3 h-[190px] rounded-xl overflow-hidden relative cursor-pointer group transition-all duration-500 shadow-sm border border-gray-100', 
                activeRegion === 'Arjuno Welirang' ? 'ring-4 ring-red-600' : '',
                hoveredRegion === 'Arjuno Welirang' ? 'scale-[1.02] shadow-md border-red-300' : '']"
            >
              <img 
                src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800" 
                alt="Arjuno Welirang" 
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent p-5 flex flex-col justify-end">
                <span class="text-red-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">Pasuruan Barat</span>
                <h4 class="text-white text-lg font-black mb-1 uppercase">Arjuno Welirang</h4>
                <p class="text-gray-300 text-[11px] font-light line-clamp-2">
                  Pegunungan asri, pemandian sejuk, candi kuno, dan kawasan rekreasi keluarga.
                </p>
              </div>
            </div>

            
            <div 
              @click="selectRegion('Agrowisata Tengah')"
              @mouseenter="hoveredRegion = 'Agrowisata Tengah'"
              @mouseleave="hoveredRegion = null"
              :class="['sm:col-span-2 h-[160px] rounded-xl overflow-hidden relative cursor-pointer group transition-all duration-500 shadow-sm border border-gray-100', 
                activeRegion === 'Agrowisata Tengah' ? 'ring-4 ring-red-600' : '',
                hoveredRegion === 'Agrowisata Tengah' ? 'scale-[1.02] shadow-md border-red-300' : '']"
            >
              <img 
                src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800" 
                alt="Agrowisata Tengah" 
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent p-4 flex flex-col justify-end">
                <span class="text-red-400 text-[9px] font-bold uppercase tracking-wider mb-0.5">Pasuruan Tengah</span>
                <h4 class="text-white text-base font-bold mb-1 uppercase leading-tight">Agrowisata Tengah</h4>
                <p class="text-gray-300 text-[10px] font-light line-clamp-2">
                  Konservasi kebun botani terbesar, teh & apel.
                </p>
              </div>
            </div>

            
            <div 
              @click="selectRegion('Pesisir & Danau')"
              @mouseenter="hoveredRegion = 'Pesisir & Danau'"
              @mouseleave="hoveredRegion = null"
              :class="['sm:col-span-2 h-[160px] rounded-xl overflow-hidden relative cursor-pointer group transition-all duration-500 shadow-sm border border-gray-100', 
                activeRegion === 'Pesisir & Danau' ? 'ring-4 ring-red-600' : '',
                hoveredRegion === 'Pesisir & Danau' ? 'scale-[1.02] shadow-md border-red-300' : '']"
            >
              <img 
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800" 
                alt="Pesisir & Danau" 
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent p-4 flex flex-col justify-end">
                <span class="text-red-400 text-[9px] font-bold uppercase tracking-wider mb-0.5">Pasuruan Utara</span>
                <h4 class="text-white text-base font-bold mb-1 uppercase leading-tight">Pesisir & Danau</h4>
                <p class="text-gray-300 text-[10px] font-light line-clamp-2">
                  Legenda danau Ranu Grati, pantai, & mangrove.
                </p>
              </div>
            </div>

            
            <div 
              @click="selectRegion('Pusaka & Religi')"
              @mouseenter="hoveredRegion = 'Pusaka & Religi'"
              @mouseleave="hoveredRegion = null"
              :class="['sm:col-span-2 h-[160px] rounded-xl overflow-hidden relative cursor-pointer group transition-all duration-500 shadow-sm border border-gray-100', 
                activeRegion === 'Pusaka & Religi' ? 'ring-4 ring-red-600' : '',
                hoveredRegion === 'Pusaka & Religi' ? 'scale-[1.02] shadow-md border-red-300' : '']"
            >
              <img 
                src="https://images.unsplash.com/photo-1608958416715-4ba8c7b8a72b?auto=format&fit=crop&q=80&w=800" 
                alt="Pusaka & Religi" 
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent p-4 flex flex-col justify-end">
                <span class="text-red-400 text-[9px] font-bold uppercase tracking-wider mb-0.5">Kota & Religi</span>
                <h4 class="text-white text-base font-bold mb-1 uppercase leading-tight">Pusaka & Religi</h4>
                <p class="text-gray-300 text-[10px] font-light line-clamp-2">
                  Masjid Cheng Hoo, ziarah spiritual, & mebel kayu.
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      
      <section class="mb-12">
        <h3 class="text-sm font-bold tracking-widest text-red-600 uppercase mb-8 flex items-center gap-2">
          <span class="w-2 h-2 bg-red-600 rounded-full"></span>
          CARI BERDASARKAN MINAT & AKTIVITAS
        </h3>
        
        <div class="flex flex-wrap gap-3 border-b border-gray-200 pb-6">
          <button 
            v-for="cat in categories" 
            :key="cat"
            @click="selectCategory(cat)"
            :class="['px-6 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all uppercase', activeCategory === cat ? 'bg-red-600 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200']"
          >
            {{ cat }}
          </button>
        </div>
      </section>

      
      <section class="mb-24">
        
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center gap-3">
            <span class="text-sm font-bold text-gray-400 uppercase tracking-widest">
              Daftar Destinasi
            </span>
            <span v-if="activeRegion || activeCategory !== 'Semua'" class="text-xs bg-red-50 text-red-700 border border-red-200 px-3 py-1 rounded-full font-medium">
              Filter Aktif: {{ activeRegion || 'Semua Wilayah' }} &bull; {{ activeCategory }}
            </span>
          </div>
          <button 
            v-if="activeRegion || activeCategory !== 'Semua' || searchQuery"
            @click="resetFilters"
            class="text-xs text-red-600 font-bold hover:underline uppercase tracking-wide flex items-center gap-1.5"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H18" /></svg>
            Reset Pencarian
          </button>
        </div>

        
        <div v-if="filteredSpots.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="spot in filteredSpots" 
            :key="spot.id"
            @click="openSpotDetails(spot)"
            class="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 cursor-pointer flex flex-col h-full"
          >
            
            <div class="relative aspect-[4/3] overflow-hidden bg-gray-100">
              <img 
                :src="spot.gambar" 
                :alt="spot.nama" 
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                @error="handleImageError"
              />
              <span class="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                {{ spot.kategori }}
              </span>
            </div>
            
            
            <div class="p-6 flex flex-col flex-grow">
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs text-red-600 font-bold uppercase tracking-wider">
                  {{ spot.lokasi }}
                </span>
                <div class="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded border border-yellow-200 text-xs font-bold">
                  <svg class="w-3 h-3 text-yellow-500 fill-current" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192L12 .587z" /></svg>
                  {{ spot.rating.toFixed(1) }}
                </div>
              </div>
              <h4 class="text-lg font-black text-gray-900 leading-snug group-hover:text-red-600 transition-colors uppercase tracking-tight mb-2 line-clamp-1">
                {{ spot.nama }}
              </h4>
              <p class="text-gray-500 text-xs leading-relaxed font-light line-clamp-3 mb-6">
                {{ spot.deskripsi }}
              </p>
              <div class="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 font-medium">
                <span class="flex items-center gap-1"><i class="far fa-clock"></i> {{ spot.jamBuka }}</span>
                <span class="text-gray-800 font-bold">{{ spot.tarif }}</span>
              </div>
            </div>
          </div>
        </div>

        
        <div v-else class="text-center py-24 flex flex-col items-center bg-gray-50 rounded-2xl border border-dashed border-gray-300">
          <div class="w-20 h-20 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-4">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <p class="text-lg font-bold text-gray-800">Destinasi Tidak Ditemukan</p>
          <p class="text-gray-500 text-sm max-w-sm mt-2 leading-relaxed">
            Maaf, kami tidak menemukan tempat wisata yang sesuai dengan filter Anda. Silakan coba atur ulang filter pencarian Anda.
          </p>
          <button 
            @click="resetFilters"
            class="mt-6 px-6 py-2.5 bg-red-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition-colors shadow-sm"
          >
            Bersihkan Filter
          </button>
        </div>
      </section>

      
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-100">
        <div class="lg:col-span-5">
          <span class="text-red-600 text-xs font-bold uppercase tracking-widest block mb-3">PANDUAN INFORMASI</span>
          <h3 class="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tight mb-4 leading-tight">
            TIPS PERJALANAN PENTING DI PASURUAN
          </h3>
          <p class="text-gray-500 text-sm leading-relaxed mb-6 font-light">
            Sebelum Anda berkemas dan memulai petualangan di Pasuruan Raya, luangkan waktu sejenak untuk mempelajari panduan musiman, tata tertib, dan informasi logistik dasar kami.
          </p>
          <div class="w-24 h-1 bg-red-600"></div>
        </div>
        
        <div class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
          <div>
            <h4 class="font-extrabold text-gray-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span class="w-1.5 h-4 bg-red-600"></span> Cuaca & Waktu Terbaik
            </h4>
            <p class="text-gray-500 leading-relaxed font-light">
              Musim kemarau (Mei - September) adalah waktu terbaik untuk mengunjungi Gunung Bromo demi pemandangan matahari terbit tanpa hambatan mendung. Kawasan Prigen/Pandaan sejuk sepanjang tahun, pas untuk berakhir pekan.
            </p>
          </div>
          <div>
            <h4 class="font-extrabold text-gray-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span class="w-1.5 h-4 bg-red-600"></span> Transportasi Lokal
            </h4>
            <p class="text-gray-500 leading-relaxed font-light">
              Mobil pribadi atau sewaan sangat disarankan untuk fleksibilitas menjelajah. Untuk pendakian Bromo, Anda diwajibkan menyewa kendaraan Jeep/Jip 4x4 lokal yang sudah disediakan di pintu masuk Tosari.
            </p>
          </div>
          <div>
            <h4 class="font-extrabold text-gray-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span class="w-1.5 h-4 bg-red-600"></span> Tiket & Booking Online
            </h4>
            <p class="text-gray-500 leading-relaxed font-light">
              Khusus untuk kawasan Taman Nasional Bromo Tengger Semeru, tiket masuk wajib dipesan secara online terlebih dahulu karena kuota harian pengunjung dibatasi demi kenyamanan dan kelestarian ekologi.
            </p>
          </div>
          <div>
            <h4 class="font-extrabold text-gray-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span class="w-1.5 h-4 bg-red-600"></span> Etika Berwisata Religi
            </h4>
            <p class="text-gray-500 leading-relaxed font-light">
              Saat melakukan ziarah ke Masjid Cheng Hoo, Candi Jawi, atau Makam Wali di Pasuruan, pastikan untuk berpakaian sopan dan tertutup guna menghormati nilai budaya serta kesucian tempat peribadatan setempat.
            </p>
          </div>
        </div>
      </section>

    </main>

    
    <div 
      v-if="selectedSpot" 
      class="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn"
      @click.self="closeSpotDetails"
    >
      <div class="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col relative">
        
        <button 
          @click="closeSpotDetails"
          class="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white rounded-full p-2.5 transition-colors z-10"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="overflow-y-auto pr-1">
          
          <div class="h-64 sm:h-80 w-full relative">
            <img 
              :src="selectedSpot.gambar" 
              :alt="selectedSpot.nama" 
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"></div>
            <div class="absolute bottom-6 left-6 text-white pr-10">
              <span class="bg-red-600 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider inline-block mb-3">
                {{ selectedSpot.kategori }}
              </span>
              <h3 class="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-tight">
                {{ selectedSpot.nama }}
              </h3>
            </div>
          </div>

          
          <div class="p-6 sm:p-8">
            <div class="grid grid-cols-1 sm:grid-cols-12 gap-8 mb-8 border-b border-gray-100 pb-8 text-sm">
              <div class="sm:col-span-8">
                <h4 class="font-extrabold text-gray-900 uppercase tracking-wider mb-3">Tentang Destinasi</h4>
                <p class="text-gray-600 leading-relaxed font-light">
                  {{ selectedSpot.deskripsiDetail || selectedSpot.deskripsi }}
                </p>
              </div>
              <div class="sm:col-span-4 bg-gray-50 p-5 rounded-xl border border-gray-100">
                <h4 class="font-extrabold text-gray-900 uppercase tracking-wider mb-4 text-xs">Informasi Cepat</h4>
                <div class="space-y-3.5 text-xs text-gray-600">
                  <div class="flex items-start gap-2">
                    <span class="text-red-600 mt-0.5"><i class="fas fa-map-marker-alt"></i></span>
                    <div>
                      <p class="font-bold text-gray-900 uppercase text-[10px]">Lokasi</p>
                      <p>{{ selectedSpot.lokasi }}</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="text-red-600 mt-0.5"><i class="far fa-clock"></i></span>
                    <div>
                      <p class="font-bold text-gray-900 uppercase text-[10px]">Jam Operasional</p>
                      <p>{{ selectedSpot.jamBuka }}</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="text-red-600 mt-0.5"><i class="fas fa-ticket-alt"></i></span>
                    <div>
                      <p class="font-bold text-gray-900 uppercase text-[10px]">Harga Tiket</p>
                      <p>{{ selectedSpot.tarif }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            
            <div class="mb-2">
              <h4 class="font-extrabold text-gray-900 uppercase tracking-wider mb-4">Daya Tarik Utama</h4>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div 
                  v-for="(hl, idx) in selectedSpot.highlights" 
                  :key="idx"
                  class="bg-red-50/50 p-4 rounded-xl border border-red-100/50 text-center"
                >
                  <p class="text-red-800 font-bold text-sm uppercase tracking-wide mb-1">{{ hl.title }}</p>
                  <p class="text-gray-500 text-[11px] leading-relaxed">{{ hl.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const searchQuery = ref('');
const activeRegion = ref<string | null>(null);
const activeCategory = ref<string>('Semua');
const selectedSpot = ref<any | null>(null);
const hoveredRegion = ref<string | null>(null);

const categories = ref(['Semua', 'Wisata Alam', 'Rekreasi Keluarga', 'Sejarah & Budaya', 'Wisata Religi']);


const spots = ref([
  {
    id: 1,
    nama: 'Gunung Bromo & Penanjakan',
    region: 'Bromo Tengger',
    kategori: 'Wisata Alam',
    lokasi: 'Tosari',
    rating: 4.9,
    gambar: 'https://images.unsplash.com/photo-1588668214407-6eb9527092c6?auto=format&fit=crop&q=80&w=800',
    deskripsi: 'Saksikan keindahan matahari terbit legendaris berlatar belakang lautan pasir dan kaldera Bromo yang magis dari ketinggian Penanjakan.',
    deskripsiDetail: 'Gunung Bromo merupakan salah satu destinasi wisata alam paling populer di Indonesia. Terletak di kawasan Tosari Pasuruan, objek wisata ini menawarkan pemandangan kawah aktif, lautan pasir berbisik yang luas, serta perbukitan savana Teletubbies yang memanjakan mata. Wisatawan biasanya menaiki Jeep 4x4 saat subuh menuju Bukit Penanjakan untuk menyaksikan keindahan Golden Sunrise berlatar Gunung Bromo, Gunung Batok, dan Gunung Semeru.',
    jamBuka: 'Buka 24 Jam',
    tarif: 'Rp 29.000 - Rp 34.000',
    highlights: [
      { title: 'Golden Sunrise', desc: 'Matahari terbit keemasan terindah di Jawa Timur.' },
      { title: 'Kawah Bromo', desc: 'Berdiri tepat di bibir kawah aktif yang menakjubkan.' },
      { title: 'Jeep Adventure', desc: 'Sensasi melintasi lautan pasir dengan mobil jip 4x4.' }
    ]
  },
  {
    id: 2,
    nama: 'Taman Safari Indonesia II Prigen',
    region: 'Arjuno Welirang',
    kategori: 'Rekreasi Keluarga',
    lokasi: 'Prigen',
    rating: 4.8,
    gambar: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=800',
    deskripsi: 'Jelajahi safari alam liar terbesar di Asia, rumah bagi ribuan spesies satwa langka dari seluruh penjuru dunia di lereng Gunung Arjuna.',
    deskripsiDetail: 'Taman Safari Prigen merupakan salah satu kebun binatang safari terbesar di Asia. Terletak di kaki Gunung Arjuna dengan ketinggian 800 mdpl, objek wisata ini menyuguhkan udara sejuk dan lingkungan asri menyerupai habitat asli satwa. Di sini, pengunjung dapat berinteraksi langsung dengan satwa liar menggunakan kendaraan tertutup, menikmati aneka pertunjukan edukasi, serta bersenang-senang di area waterpark dan theme park.',
    jamBuka: '08:30 - 17:00 WIB',
    tarif: 'Rp 135.000 - Rp 150.000',
    highlights: [
      { title: 'Safari Adventure', desc: 'Berkendara sangat dekat di tengah hewan liar.' },
      { title: 'Baby Zoo', desc: 'Berfoto bersama bayi harimau, singa, dan orangutan.' },
      { title: 'Safari Water World', desc: 'Bermain air di kolam renang berstandar internasional.' }
    ]
  },
  {
    id: 3,
    nama: 'Candi Jawi',
    region: 'Arjuno Welirang',
    kategori: 'Sejarah & Budaya',
    lokasi: 'Pandaan',
    rating: 4.6,
    gambar: 'https://images.unsplash.com/photo-1608958416715-4ba8c7b8a72b?auto=format&fit=crop&q=80&w=800',
    deskripsi: 'Candi peninggalan Kerajaan Singhasari abad ke-13 yang eksotis, dibangun sebagai perpaduan arsitektur agama Hindu dan Buddha.',
    deskripsiDetail: 'Candi Jawi adalah candi kuno peninggalan Raja Kertanegara dari Kerajaan Singhasari. Candi ini unik karena memadukan unsur Buddha (pada bagian puncak stupa) dan Hindu (pada bagian kaki dan tubuh candi yang menyerupai Siwa). Dikelilingi parit air berhiaskan bunga teratai dan latar Gunung Penanggungan yang mempesona, candi ini merupakan bukti toleransi beragama di masa nusantara klasik.',
    jamBuka: '07:30 - 16:00 WIB',
    tarif: 'Gratis (Donasi Sukarela)',
    highlights: [
      { title: 'Relief Kuno', desc: 'Kisah pahatan dinding batu andesit bernilai sejarah tinggi.' },
      { title: 'Parit Teratai', desc: 'Parit keliling bersejarah yang indah dan terawat.' },
      { title: 'Gunung View', desc: 'Siluet Gunung Penanggungan yang megah di sore hari.' }
    ]
  },
  {
    id: 4,
    nama: 'Kebun Raya Purwodadi',
    region: 'Agrowisata Tengah',
    kategori: 'Wisata Alam',
    lokasi: 'Purwodadi',
    rating: 4.5,
    gambar: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800',
    deskripsi: 'Pusat konservasi tumbuhan dataran rendah kering yang luas, menampilkan ribuan koleksi flora langka, taman bambu, dan anggrek.',
    deskripsiDetail: 'Kebun Raya Purwodadi didirikan pada tahun 1941 sebagai cabang dari Kebun Raya Bogor. Lahan hijau seluas 85 hektar ini berfokus pada konservasi flora iklim kering. Wisatawan dapat menyewa sepeda, skuter listrik, atau berpiknik di bawah kanopi pepohonan rindang sambil mempelajari koleksi bambu raksasa, polong-polongan, pakis, palem, dan rumah kaca berisi anggrek langka.',
    jamBuka: '07:00 - 16:00 WIB',
    tarif: 'Rp 15.000 - Rp 25.000',
    highlights: [
      { title: 'Taman Bambu', desc: 'Hutan bambu estetik yang teduh dan cocok untuk foto.' },
      { title: 'Rumah Kaca Anggrek', desc: 'Konservasi aneka varietas anggrek liar yang cantik.' },
      { title: 'Piknik & Sepeda', desc: 'Jalan-jalan santai dengan sewa sepeda keliling kebun.' }
    ]
  },
  {
    id: 5,
    nama: 'Air Terjun Kakek Bodo',
    region: 'Arjuno Welirang',
    kategori: 'Wisata Alam',
    lokasi: 'Prigen',
    rating: 4.6,
    gambar: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800',
    deskripsi: 'Air terjun berketinggian 40 meter yang legendaris di kawasan pegunungan Prigen, dikelilingi hutan pinus lebat yang asri.',
    deskripsiDetail: 'Air Terjun Kakek Bodo terletak di lereng utara Gunung Welirang. Nama air terjun ini diambil dari kisah pertapaan seorang kakek pembantu keluarga Belanda yang meninggalkan kenyamanan duniawi demi bersemedi. Objek wisata alam ini menawarkan jalur treking santai menembus hutan pinus, kolam alami di bawah tumpahan air terjun, serta taman rekreasi keluarga di sekitarnya.',
    jamBuka: '07:00 - 16:00 WIB',
    tarif: 'Rp 20.000',
    highlights: [
      { title: 'Treking Hutan', desc: 'Jalan santai berbatu yang teduh diapit pohon pinus.' },
      { title: 'Kolam Alami', desc: 'Berenang menyegarkan di kolam air pegunungan dingin.' },
      { title: 'Makam Pertapa', desc: 'Situs makam Kakek Bodo yang dikeramatkan di dekat air terjun.' }
    ]
  },
  {
    id: 6,
    nama: 'Danau Ranu Grati',
    region: 'Pesisir & Danau',
    kategori: 'Wisata Alam',
    lokasi: 'Grati',
    rating: 4.3,
    gambar: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
    deskripsi: 'Nikmati suasana tenang danau vulkanik seluas 107 hektar dengan latar pegunungan Tengger, tempat terbaik untuk melihat matahari terbenam.',
    deskripsiDetail: 'Danau Ranu Grati merupakan danau tekto-vulkanik (maar) alami di Pasuruan. Memiliki pemandangan perairan yang luas dan berlatar pegunungan Tengger di kejauhan, danau ini menawarkan wisata perahu dayung, perahu motor, sepeda air, dan spot memancing yang melimpah. Di sore hari, pantulan senja di permukaan danau menyajikan pemandangan yang sangat memukau.',
    jamBuka: '06:00 - 18:00 WIB',
    tarif: 'Rp 5.000',
    highlights: [
      { title: 'Perahu Rekreasi', desc: 'Mengitari danau dengan perahu motor sewaan.' },
      { title: 'Senja Ranu', desc: 'Spot fotografi matahari terbenam terbaik di Pasuruan.' },
      { title: 'Sentra Karamba', desc: 'Budidaya ikan air tawar khas warga setempat.' }
    ]
  },
  {
    id: 7,
    nama: 'Masjid Jami Cheng Hoo',
    region: 'Pusaka & Religi',
    kategori: 'Wisata Religi',
    lokasi: 'Pandaan',
    rating: 4.7,
    gambar: 'https://images.unsplash.com/photo-1608958416715-4ba8c7b8a72b?auto=format&fit=crop&q=80&w=800',
    deskripsi: 'Masjid berasitektur khas klenteng Tiongkok dengan dominasi warna merah, hijau, dan kuning yang melambangkan akulturasi budaya.',
    deskripsiDetail: 'Masjid Jami Cheng Hoo Pandaan didirikan sebagai bentuk penghormatan atas jasa Laksamana Cheng Hoo yang menyebarkan ajaran Islam di tanah Jawa. Arsitektur masjid ini sangat unik karena menggabungkan gaya bangunan Tiongkok (menyerupai pagoda), ornamen Jawa tradisional, dan kaligrafi Arab. Masjid ini menjadi pusat ibadah sekaligus daya tarik wisata arsitektur yang ramai dikunjungi pejalan.',
    jamBuka: 'Buka 24 Jam',
    tarif: 'Gratis',
    highlights: [
      { title: 'Pagoda Minaret', desc: 'Menara masjid berbentuk pagoda Tionghoa bertingkat.' },
      { title: 'Akulturasi Budaya', desc: 'Detail ukiran kayu Arab-Mandarin yang menawan.' },
      { title: 'Pusat Kuliner', desc: 'Pasar kuliner halal dan suvenir di sekitar pelataran masjid.' }
    ]
  },
  {
    id: 8,
    nama: 'Agrowisata Perkebunan Teh Nongkojajar',
    region: 'Agrowisata Tengah',
    kategori: 'Wisata Alam',
    lokasi: 'Tutur',
    rating: 4.6,
    gambar: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800',
    deskripsi: 'Hamparan hijau perkebunan teh berbukit-bukit dengan udara sejuk, menawarkan pengalaman teh orisinal langsung dari kebun.',
    deskripsiDetail: 'Perkebunan Teh Nongkojajar terletak di kecamatan Tutur, kawasan perbukitan subur di lereng Bromo. Berada di ketinggian di atas 1000 mdpl, destinasi ini menawarkan udara sejuk berkabut yang menyegarkan. Wisatawan dapat berjalan-jalan di sela tanaman teh (tea walk), mengamati pemetikan daun teh tradisional, serta menikmati seduhan teh hangat premium langsung di kebun.',
    jamBuka: '06:00 - 15:00 WIB',
    tarif: 'Rp 10.000',
    highlights: [
      { title: 'Tea Walk', desc: 'Jalur treking sehat menyusuri hamparan hijau daun teh.' },
      { title: 'Edu-Wisata Teh', desc: 'Melihat proses pengolahan daun teh tradisional.' },
      { title: 'Sunrise Point', desc: 'Spot melihat kabut pagi di perbukitan kebun teh.' }
    ]
  },
  {
    id: 9,
    nama: 'Makam KH. Abdul Hamid Pasuruan',
    region: 'Pusaka & Religi',
    kategori: 'Wisata Religi',
    lokasi: 'Kota Pasuruan',
    rating: 4.9,
    gambar: 'https://images.unsplash.com/photo-1608958416715-4ba8c7b8a72b?auto=format&fit=crop&q=80&w=800',
    deskripsi: 'Destinasi ziarah utama umat Muslim di Jawa Timur, menghormati ulama kharismatik KH. Abdul Hamid yang wafat pada tahun 1982.',
    deskripsiDetail: 'Makam KH. Abdul Hamid terletak di kompleks Masjid Jami Al-Anwar, di utara Alun-alun Kota Pasuruan. Kiai Hamid merupakan ulama sufi kharismatik yang dihormati di Indonesia karena keluhuran budinya. Kompleks makam ini dikunjungi oleh ribuan peziarah setiap harinya dari berbagai kota untuk mendoakan beliau dan mencari ketenangan spiritual.',
    jamBuka: 'Buka 24 Jam',
    tarif: 'Gratis',
    highlights: [
      { title: 'Ziarah Spiritual', desc: 'Ibadah doa bersama dan pembacaan tahlil di makam.' },
      { title: 'Masjid Al-Anwar', desc: 'Masjid bersejarah megah bergaya kolonial-arab.' },
      { title: 'Wisata Belanja Religi', desc: 'Pertokoan suvenir, busana muslim, dan parfum.' }
    ]
  }
]);

const selectRegion = (regionName: string) => {
  if (activeRegion.value === regionName) {
    activeRegion.value = null;
  } else {
    activeRegion.value = regionName;
  }
};

const selectCategory = (categoryName: string) => {
  activeCategory.value = categoryName;
};

const resetFilters = () => {
  activeRegion.value = null;
  activeCategory.value = 'Semua';
  searchQuery.value = '';
};


const filteredSpots = computed(() => {
  return spots.value.filter(spot => {
    const matchesSearch = spot.nama.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          spot.lokasi.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          spot.kategori.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesRegion = activeRegion.value ? spot.region === activeRegion.value : true;
    const matchesCategory = activeCategory.value === 'Semua' ? true : spot.kategori === activeCategory.value;
    
    return matchesSearch && matchesRegion && matchesCategory;
  });
});

const openSpotDetails = (spot: any) => {
  selectedSpot.value = spot;
};

const closeSpotDetails = () => {
  selectedSpot.value = null;
};

const handleImageError = (e: Event) => {
  const target = e.target as HTMLImageElement;
  target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800';
};
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}
</style>
