<template>
  <div>
    
      <!-- Loading State -->
      <div v-if="loadingNews" class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12 animate-pulse">
        <div class="lg:col-span-2 h-80 sm:h-96 md:h-[450px] bg-gray-200 rounded-2xl"></div>
        <div class="space-y-4 bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div class="h-6 w-1/3 bg-gray-200 rounded mb-4"></div>
          <div v-for="i in 3" :key="i" class="flex gap-4">
            <div class="w-24 h-24 bg-gray-200 rounded-lg shrink-0"></div>
            <div class="flex-1 space-y-2 py-2">
              <div class="h-4 bg-gray-200 rounded"></div>
              <div class="h-4 bg-gray-200 rounded w-4/5"></div>
              <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State for Main Section -->
      <div v-else-if="featuredNews.length === 0" class="bg-white rounded-3xl border border-gray-100 shadow-sm p-10 sm:p-16 text-center my-6 max-w-2xl mx-auto flex flex-col items-center justify-center">
        <div class="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15M9 11l3 3m0 0l3-3m-3 3V8"></path></svg>
        </div>
        <h3 class="text-xl font-bold text-gray-800 mb-2">Belum Ada Berita</h3>
        <p class="text-gray-500 text-sm sm:text-base">Berita akan muncul segera. Mohon tunggu update terbaru.</p>
      </div>

      <!-- Main News Content (6 Berita Utama & Berita Terbaru) -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        
        <div class="lg:col-span-2">
          
          <!-- 6 Berita Utama Mobile Slider -->
          <div 
            class="relative rounded-xl overflow-hidden shadow-xl h-80 sm:h-96 md:hidden group"
            @mouseenter="stopAutoSlider"
            @mouseleave="startAutoSlider"
            @touchstart="stopAutoSlider"
            @touchend="startAutoSlider"
          >
            <div v-if="featuredNews.length > 0" class="w-full h-full relative">
              <div 
                v-for="(news, index) in featuredNews"
                :key="'slide-' + news.id"
                class="absolute inset-0 transition-opacity duration-500 cursor-pointer"
                :class="index === currentSlide ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'"
                @click="navigateToBerita(news.id, news.judul)"
              >
                <img 
                  :src="(news.images && news.images.length > 0) ? news.images[0] : '/images/themes/photo.jpg'" 
                  :alt="news.judul" 
                  class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-5 sm:p-6">
                  <span class="bg-blue-600 text-white text-xs font-bold px-2.5 py-0.5 rounded w-max mb-2">
                    {{ news.kategori }}
                  </span>
                  <h2 class="text-lg sm:text-xl font-bold text-white mb-2 leading-snug line-clamp-3">
                    {{ news.judul }}
                  </h2>
                  <div class="flex items-center text-gray-300 text-xs gap-3">
                    <span class="flex items-center gap-1 truncate">
                      <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                      <span class="truncate">{{ getPenulisName(news) }}</span>
                    </span>
                    <span class="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <span class="flex items-center gap-1 shrink-0">
                      <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      {{ formatDateOnly(news.waktu) }}
                    </span>
                  </div>
                </div>
              </div>

              
              <button 
                @click.stop="prevSlide" 
                class="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-all"
                aria-label="Previous Slide"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
              </button>
              <button 
                @click.stop="nextSlide" 
                class="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-all"
                aria-label="Next Slide"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
              </button>

              
              <div class="absolute bottom-2.5 right-4 z-20 flex gap-1.5">
                <button 
                  v-for="(_, idx) in featuredNews" 
                  :key="'dot-' + idx"
                  @click.stop="currentSlide = idx"
                  class="h-1.5 rounded-full transition-all duration-300"
                  :class="idx === currentSlide ? 'w-5 bg-blue-500' : 'w-1.5 bg-white/60'"
                  :aria-label="'Go to slide ' + (idx + 1)"
                ></button>
              </div>
            </div>
          </div>

          
          <div class="hidden md:grid md:grid-cols-2 gap-3 content-start">
            <div 
              v-for="news in featuredNews"
              :key="news.id"
              class="relative rounded-xl overflow-hidden group cursor-pointer shadow-lg h-[320px]"
              @click="navigateToBerita(news.id, news.judul)"
            >
              <img 
                :src="(news.images && news.images.length > 0) ? news.images[0] : '/images/themes/photo.jpg'" 
                :alt="news.judul" 
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-4 md:p-5">
                <span class="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded w-max mb-2">
                  {{ news.kategori }}
                </span>
                <h2 class="text-base md:text-lg font-bold text-white mb-2 leading-snug line-clamp-3">
                  {{ news.judul }}
                </h2>
                <div class="flex items-center text-gray-300 text-xs gap-3">
                  <span class="flex items-center gap-1 truncate">
                    <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    <span class="truncate">{{ getPenulisName(news) }}</span>
                  </span>
                  <span class="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span class="flex items-center gap-1 shrink-0">
                    <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    {{ formatDateOnly(news.waktu) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <!-- Sidebar Column (Berita Terbaru & Sidebar Ad) -->
        <div class="space-y-6">
          <div class="bg-white rounded-xl shadow p-6 flex flex-col overflow-hidden">
            <h3 class="text-xl font-bold border-b pb-3 mb-4 text-gray-800 shrink-0">Berita Terbaru</h3>
            
            <!-- Mobile Main Card (6 Berita Utama Style) -->
            <div 
              v-if="latestNews.length > 0"
              class="relative rounded-xl overflow-hidden shadow-lg h-72 sm:h-80 group cursor-pointer mb-4 md:hidden"
              @click="navigateToBerita(latestNews[0].id, latestNews[0].judul)"
            >
              <img 
                :src="(latestNews[0].images && latestNews[0].images.length > 0) ? latestNews[0].images[0] : '/images/themes/photo.jpg'" 
                :alt="latestNews[0].judul" 
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-5">
                <span class="bg-blue-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded w-max mb-2">
                  {{ latestNews[0].kategori }}
                </span>
                <h2 class="text-base sm:text-lg font-bold text-white mb-2 leading-snug line-clamp-3">
                  {{ latestNews[0].judul }}
                </h2>
                <div class="flex items-center text-gray-300 text-xs gap-3">
                  <span class="flex items-center gap-1 truncate">
                    <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    <span class="truncate">{{ getPenulisName(latestNews[0]) }}</span>
                  </span>
                  <span class="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span class="flex items-center gap-1 shrink-0">
                    <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    {{ formatDateOnly(latestNews[0].waktu) }}
                  </span>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <div 
                v-for="(berita, idx) in latestNews" 
                :key="berita.id"
                :class="[idx === 0 ? 'hidden md:flex' : 'flex', 'gap-4 cursor-pointer group items-center']"
                @click="navigateToBerita(berita.id, berita.judul)"
              >
                <div class="relative w-24 h-24 shrink-0 overflow-hidden rounded-lg">
                  <span class="absolute top-0 left-0 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 z-10 rounded-br-lg">
                    {{ berita.kategori }}
                  </span>
                  <img 
                    :src="(berita.images && berita.images.length > 0) ? berita.images[0] : '/images/themes/photo.jpg'" 
                    :alt="berita.judul" 
                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div class="flex flex-col justify-center min-w-0">
                  <h4 class="font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors mb-1">
                    {{ berita.judul }}
                  </h4>
                  <div class="flex items-center text-xs text-gray-500 gap-2 flex-wrap">
                    <span class="flex items-center gap-1 truncate max-w-[120px]">
                      <svg class="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                      <span class="truncate">{{ getPenulisName(berita) }}</span>
                    </span>
                    <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span class="flex items-center gap-1 shrink-0">
                      <svg class="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      {{ formatDateOnly(berita.waktu) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Section Iklan Beranda - Sidebar Samping (home_sidebar) -->
          <div class="overflow-hidden rounded-xl">
            <template v-if="adsHomeSidebar && (adsHomeSidebar.image_url || adsHomeSidebar.image)">
              <a :href="adsHomeSidebar.redirect_url || adsHomeSidebar.url || '#'" target="_blank" class="block w-full overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                <img :src="adsHomeSidebar.image_url || adsHomeSidebar.image" :alt="adsHomeSidebar.title || 'Iklan Sidebar'" class="w-full max-h-[300px] object-cover rounded-xl hover:opacity-95 transition-opacity" />
              </a>
            </template>
            <template v-else>
              <div class="bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 border border-dashed border-gray-300 rounded-xl p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[180px] text-center shadow-sm">
                <span class="absolute top-3 right-3 text-[11px] uppercase tracking-widest text-gray-400 font-bold bg-white/90 px-2.5 py-0.5 rounded border border-gray-200 shadow-2xs">SPONSORED / IKLAN</span>
                <div class="flex flex-col items-center gap-2 z-10 my-auto">
                  <svg class="w-9 h-9 sm:w-10 sm:h-10 text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                  <span class="text-sm sm:text-base font-bold text-gray-600 tracking-wider uppercase">Space Ads Available</span>
                  <p class="text-xs sm:text-sm text-gray-400 max-w-md px-2">Contact Admin for more information</p>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- Section Iklan Responsif di atas Kategori (Lokal, Nasional, Politik) -->
      <div class="mb-8 sm:mb-12 overflow-hidden rounded-xl">
        <template v-if="adsHomeTop && (adsHomeTop.image_url || adsHomeTop.image)">
          <a :href="adsHomeTop.redirect_url || adsHomeTop.url || '#'" target="_blank" class="block w-full overflow-hidden rounded-xl border border-gray-100 shadow-sm">
            <img :src="adsHomeTop.image_url || adsHomeTop.image" :alt="adsHomeTop.title || 'Iklan'" class="w-full max-h-[220px] object-cover sm:object-contain rounded-xl hover:opacity-95 transition-opacity" />
          </a>
        </template>
        <template v-else>
          <div class="bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 border border-dashed border-gray-300 rounded-xl p-6 sm:p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[180px] sm:min-h-[200px] md:min-h-[220px] text-center shadow-sm">
            <span class="absolute top-3 right-3 text-[11px] uppercase tracking-widest text-gray-400 font-bold bg-white/90 px-2.5 py-0.5 rounded border border-gray-200 shadow-2xs">SPONSORED / IKLAN</span>
            <div class="flex flex-col items-center gap-2 z-10 my-auto">
              <svg class="w-9 h-9 sm:w-10 sm:h-10 text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
              <span class="text-sm sm:text-base font-bold text-gray-600 tracking-wider uppercase">Space Ads Available</span>
              <p class="text-xs sm:text-sm text-gray-400 max-w-md px-2">Contact Admin for more information</p>
            </div>
          </div>
        </template>
      </div>

      <!-- Category Sections (Lokal, Nasional, Politik) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <template v-for="(categoryList, categoryName) in categoryNews" :key="categoryName">
          <div>
            <div 
              class="flex items-center justify-between border-b-2 border-gray-200 pb-2 mb-4 cursor-pointer group"
              @click="navigateToCategory(categoryName)"
            >
              <div class="flex items-center gap-2">
                <div class="w-1.5 h-6 bg-blue-600"></div>
                <h3 class="text-lg font-bold text-gray-800 capitalize">{{ categoryName }}</h3>
              </div>
              <svg class="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </div>
            
            <div v-if="categoryList.length > 0" class="space-y-4">
              <div 
                v-for="news in categoryList" 
                :key="news.id"
                class="flex gap-4 cursor-pointer group items-center"
                @click="navigateToBerita(news.id, news.judul)"
              >
                <img 
                  :src="(news.images && news.images.length > 0) ? news.images[0] : '/images/themes/photo.jpg'" 
                  :alt="news.judul" 
                  class="w-20 h-20 object-cover rounded-lg shrink-0 group-hover:opacity-90 transition-opacity"
                />
                <div class="flex flex-col justify-center min-w-0">
                  <h4 class="font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors text-sm mb-1">
                    {{ news.judul }}
                  </h4>
                  <div class="flex items-center text-xs text-gray-500 gap-2">
                    <span class="truncate max-w-[100px]">{{ getPenulisName(news) }}</span>
                    <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>{{ formatDateOnly(news.waktu) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="bg-gray-50/80 rounded-xl p-5 text-center border border-dashed border-gray-200">
              <p class="text-xs text-gray-500 font-medium">Berita akan muncul segera. Mohon tunggu update terbaru.</p>
            </div>
          </div>
        </template>
      </div>

      
      <!-- Section Iklan Responsif di atas Pasinfo Jelajah -->
      <div class="mb-8 sm:mb-12 overflow-hidden rounded-xl">
        <template v-if="adsHomeMiddle && (adsHomeMiddle.image_url || adsHomeMiddle.image)">
          <a :href="adsHomeMiddle.redirect_url || adsHomeMiddle.url || '#'" target="_blank" class="block w-full overflow-hidden rounded-xl border border-gray-100 shadow-sm">
            <img :src="adsHomeMiddle.image_url || adsHomeMiddle.image" :alt="adsHomeMiddle.title || 'Iklan'" class="w-full max-h-[220px] object-cover sm:object-contain rounded-xl hover:opacity-95 transition-opacity" />
          </a>
        </template>
        <template v-else>
          <div class="bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 border border-dashed border-gray-300 rounded-xl p-6 sm:p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[180px] sm:min-h-[200px] md:min-h-[220px] text-center shadow-sm">
            <span class="absolute top-3 right-3 text-[11px] uppercase tracking-widest text-gray-400 font-bold bg-white/90 px-2.5 py-0.5 rounded border border-gray-200 shadow-2xs">SPONSORED / IKLAN</span>
            <div class="flex flex-col items-center gap-2 z-10 my-auto">
              <svg class="w-9 h-9 sm:w-10 sm:h-10 text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
              <span class="text-sm sm:text-base font-bold text-gray-600 tracking-wider uppercase">Space Ads Available</span>
              <p class="text-xs sm:text-sm text-gray-400 max-w-md px-2">Contact Admin for more information</p>
            </div>
          </div>
        </template>
      </div>

      <!-- Section Pasinfo Jelajah -->
      <div class="bg-white rounded-xl shadow-md p-8 mb-8">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-extrabold text-blue-900 mb-2">Pasinfo Jelajah</h2>
          <p class="text-gray-600">Ingin mengenal Pasuruan lebih dalam?</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div 
            v-for="item in jelajahItems" 
            :key="item.name"
            class="relative rounded-lg overflow-hidden group cursor-pointer aspect-square"
            @click="navigateToJelajah(item.path)"
          >
            <img :src="item.image" :alt="item.name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <span class="text-white font-bold text-xl drop-shadow-md">{{ item.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Section Iklan Responsif di bawah Pasinfo Jelajah -->
      <div class="mb-0 sm:mb-2 overflow-hidden rounded-xl">
        <template v-if="adsHomeBottom && (adsHomeBottom.image_url || adsHomeBottom.image)">
          <a :href="adsHomeBottom.redirect_url || adsHomeBottom.url || '#'" target="_blank" class="block w-full overflow-hidden rounded-xl border border-gray-100 shadow-sm">
            <img :src="adsHomeBottom.image_url || adsHomeBottom.image" :alt="adsHomeBottom.title || 'Iklan'" class="w-full max-h-[220px] object-cover sm:object-contain rounded-xl hover:opacity-95 transition-opacity" />
          </a>
        </template>
        <template v-else>
          <div class="bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 border border-dashed border-gray-300 rounded-xl p-6 sm:p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[180px] sm:min-h-[200px] md:min-h-[220px] text-center shadow-sm">
            <span class="absolute top-3 right-3 text-[11px] uppercase tracking-widest text-gray-400 font-bold bg-white/90 px-2.5 py-0.5 rounded border border-gray-200 shadow-2xs">SPONSORED / IKLAN</span>
            <div class="flex flex-col items-center gap-2 z-10 my-auto">
              <svg class="w-9 h-9 sm:w-10 sm:h-10 text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
              <span class="text-sm sm:text-base font-bold text-gray-600 tracking-wider uppercase">Space Ads Available</span>
              <p class="text-xs sm:text-sm text-gray-400 max-w-md px-2">Contact Admin for more information</p>
            </div>
          </div>
        </template>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { createSlug } from '../utils'

const router = useRouter()

const getPenulisName = (item: any): string => {
  if (!item) return 'Redaksi Pasinfo'
  if (typeof item.penulis === 'string' && item.penulis.trim() !== '') return item.penulis.trim()
  if (item.penulis && typeof item.penulis === 'object' && item.penulis.name) return item.penulis.name
  if (item.Author && typeof item.Author === 'object' && item.Author.name) return item.Author.name
  if (item.author && typeof item.author === 'object' && item.author.name) return item.author.name
  if (item.author_name && typeof item.author_name === 'string' && item.author_name.trim() !== '') return item.author_name.trim()
  if (item.source && typeof item.source === 'string' && item.source.trim() !== '') return item.source.trim()
  return 'Redaksi Pasinfo'
}

const formatDateOnly = (waktuStr?: string): string => {
  if (!waktuStr) return ''
  let clean = waktuStr.replace(/\s*WIB\s*/gi, '').trim()
  clean = clean.replace(/,?\s+\d{1,2}:\d{2}(:\d{2})?$/, '').trim()
  return clean
}

const featuredNews = ref<any[]>([])
const latestNews = ref<any[]>([])
const loadingNews = ref(true)

const currentSlide = ref(0)
let sliderInterval: any = null

const nextSlide = () => {
  if (featuredNews.value.length > 0) {
    currentSlide.value = (currentSlide.value + 1) % featuredNews.value.length
  }
}

const prevSlide = () => {
  if (featuredNews.value.length > 0) {
    currentSlide.value = (currentSlide.value - 1 + featuredNews.value.length) % featuredNews.value.length
  }
}

const startAutoSlider = () => {
  stopAutoSlider()
  sliderInterval = setInterval(nextSlide, 4000)
}

const stopAutoSlider = () => {
  if (sliderInterval) {
    clearInterval(sliderInterval)
    sliderInterval = null
  }
}

const categoryNews = ref<Record<string, any[]>>({
  lokal: [],
  nasional: [],
  politik: []
})

const adsHomeTop = ref<any>(null)
const adsHomeMiddle = ref<any>(null)
const adsHomeBottom = ref<any>(null)
const adsHomeSidebar = ref<any>(null)

const fetchHomeAds = async () => {
  try {
    const slots = ['home_top', 'home_middle', 'home_bottom', 'home_sidebar']
    const responses = await Promise.all(
      slots.map(slot => fetch(`http://localhost:8080/api/v1/ads/slot/${slot}`).then(res => res.json()).catch(() => null))
    )

    if (responses[0] && responses[0].success && responses[0].data?.length > 0) {
      adsHomeTop.value = responses[0].data[0]
    }
    if (responses[1] && responses[1].success && responses[1].data?.length > 0) {
      adsHomeMiddle.value = responses[1].data[0]
    }
    if (responses[2] && responses[2].success && responses[2].data?.length > 0) {
      adsHomeBottom.value = responses[2].data[0]
    }
    if (responses[3] && responses[3].success && responses[3].data?.length > 0) {
      adsHomeSidebar.value = responses[3].data[0]
    }
  } catch (err) {
    console.error('Failed to fetch home ads:', err)
  }
}

onMounted(async () => {
  fetchHomeAds()
  loadingNews.value = true
  try {
    const response = await fetch('http://localhost:8080/api/v1/news')
    const result = await response.json()
    if (result.success && result.data) {
      featuredNews.value = result.data.slice(0, 6)
      latestNews.value = result.data.slice(6, 12)

      categoryNews.value.lokal    = result.data.filter((n: any) => n.kategori && n.kategori.toLowerCase() === 'lokal').slice(0, 4)
      categoryNews.value.nasional = result.data.filter((n: any) => n.kategori && n.kategori.toLowerCase() === 'nasional').slice(0, 4)
      categoryNews.value.politik  = result.data.filter((n: any) => n.kategori && n.kategori.toLowerCase() === 'politik').slice(0, 4)

      startAutoSlider()
    }
  } catch (err) {
    console.error('Failed to fetch news:', err)
  } finally {
    loadingNews.value = false
  }
})

onUnmounted(() => {
  stopAutoSlider()
})

const jelajahItems = ref([
  { name: 'Wisata',  path: 'wisata',  image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&q=80&w=400' },
  { name: 'Kuliner', path: 'kuliner', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=400' },
  { name: 'Budaya',  path: 'budaya',  image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=400' },
  { name: 'Acara',   path: 'acara',   image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=400' }
])

const navigateToBerita = (id: number, title: string) => {
  router.push({ name: 'berita', params: { id, slug: createSlug(title) } })
}

const navigateToCategory = (category: string) => {
  router.push({ name: 'kategori', query: { cat: category } })
}

const navigateToJelajah = (path: string) => {
  if (path === 'wisata') {
    router.push('/wisata')
  } else {
    router.push({ path: '/jelajah', query: { tab: path } })
  }
}
</script>
