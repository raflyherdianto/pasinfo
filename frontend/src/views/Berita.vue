<template>
  <div class="min-h-screen bg-gray-50 pt-1 sm:pt-2 pb-6 sm:pb-10 font-sans">
    <main class="container mx-auto px-2.5 sm:px-4 md:px-6 max-w-7xl">
      
      <button
        @click="router.back()"
        class="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-3 sm:mb-4 transition-colors font-medium text-sm sm:text-base px-1"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        Kembali
      </button>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        
        <div class="lg:col-span-2">

      
      <div v-if="loading" class="flex flex-col items-center justify-center py-32 gap-4">
        <div class="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p class="text-gray-500">Memuat berita...</p>
      </div>

      
      <div v-else-if="error" class="text-center py-32">
        <p class="text-red-500 font-semibold text-lg mb-2">Gagal memuat berita</p>
        <p class="text-gray-400 text-sm">{{ error }}</p>
        <button @click="fetchBerita" class="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Coba Lagi
        </button>
      </div>

      
      <article v-else-if="berita" class="bg-white rounded-xl sm:rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        <div class="p-5 sm:p-6 md:p-8">
          
          <div class="mb-5 sm:mb-6">
            <div class="flex justify-between items-center mb-3">
              <span class="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                {{ berita.kategori }}
              </span>
              <button 
                @click="toggleBookmark"
                class="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 hover:text-red-600 transition-colors font-semibold"
                :title="isBookmarked ? 'Hapus Bookmark' : 'Simpan Bookmark'"
              >
                <svg 
                  class="w-4 h-4 sm:w-5 sm:h-5" 
                  :class="isBookmarked ? 'fill-red-500 text-red-500' : 'text-gray-400'"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <span>{{ isBookmarked ? 'Tersimpan' : 'Bookmark' }}</span>
              </button>
            </div>
            <h1 class="text-lg sm:text-2xl md:text-3xl font-bold md:font-extrabold text-gray-900 leading-snug md:leading-tight mb-3">
              {{ berita.judul }}
            </h1>
            <div class="flex flex-wrap items-center text-xs sm:text-sm text-gray-500 gap-x-3 gap-y-1.5 py-3 border-y border-gray-100 my-4">
              <span class="flex items-center gap-1.5 font-medium text-gray-700">
                <svg class="w-4 h-4 text-blue-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                {{ getPenulisName(berita) }}
              </span>
              <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span class="flex items-center gap-1.5 shrink-0">
                <svg class="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {{ formatDateOnly(berita.waktu) }}
              </span>
              <template v-if="berita.source_url && !berita.source_url.startsWith('manual') && berita.source_url !== 'manual' && berita.source !== 'Pasinfo'">
                <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
                <a
                  :href="berita.source_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-1 text-blue-600 hover:underline text-xs"
                >
                  <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                  </svg>
                  Sumber Asli
                </a>
              </template>
            </div>
          </div>

          
          <!-- Large Main Featured Image Card (Mobile: h-64 sm:h-80) -->
          <div class="mb-6 sm:mb-8 relative group">
            <div class="relative rounded-xl overflow-hidden bg-gray-100 h-64 sm:h-80 md:h-auto md:aspect-video shadow-md border border-gray-100">
              <img
                :src="(berita.images && berita.images.length > 0) ? berita.images[activeImgIndex] : '/images/themes/photo.jpg'"
                :alt="berita.judul"
                class="w-full h-full object-cover cursor-zoom-in hover:scale-105 transition-transform duration-500"
                @error="handleImageError"
                @click="openImageModal"
              />
              
              
              <button 
                v-if="berita.images && berita.images.length > 1" 
                @click.stop="prevImage" 
                class="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2.5 sm:p-3 rounded-full transition-all backdrop-blur-sm flex items-center justify-center"
              >
                <svg class="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              
              <button 
                v-if="berita.images && berita.images.length > 1" 
                @click.stop="nextImage" 
                class="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2.5 sm:p-3 rounded-full transition-all backdrop-blur-sm flex items-center justify-center"
              >
                <svg class="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              
              <div 
                v-if="berita.images && berita.images.length > 1" 
                class="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-medium"
              >
                {{ activeImgIndex + 1 }} / {{ berita.images.length }}
              </div>
            </div>
            <p v-if="getActiveImageCaption(berita, activeImgIndex)" class="mt-2.5 text-center text-sm sm:text-base text-gray-600 font-normal max-w-3xl mx-auto px-2">
              {{ getActiveImageCaption(berita, activeImgIndex) }}
            </p>
          </div>

          
          <div 
            class="prose prose-base sm:prose-lg max-w-none text-gray-800 leading-relaxed text-base sm:text-lg prose-p:my-2.5 sm:prose-p:my-3.5 prose-p:leading-relaxed prose-headings:font-bold prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:mt-6 prose-h2:mb-3 prose-img:rounded-xl article-content" 
            v-html="formattedKonten"
            @click="handleContentClick"
          ></div>

          
          <div class="mt-6 pt-5 sm:mt-8 sm:pt-6 border-t border-gray-100 flex flex-wrap items-center gap-3.5 sm:gap-4">
            <span class="text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider flex items-center gap-2 shrink-0">
              <svg class="w-4 h-4 text-blue-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 10.742l4.636-2.318M8.684 13.258l4.636 2.318m6.037-7.04a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm-10 5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm10 5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              Bagikan Artikel:
            </span>
            <div class="flex items-center gap-2">
              <!-- Facebook -->
              <a 
                :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Bagikan ke Facebook"
                class="w-9 h-9 flex items-center justify-center bg-[#1877f2]/10 hover:bg-[#1877f2] text-[#1877f2] hover:text-white rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-sm"
              >
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              
              <!-- X / Twitter -->
              <a 
                :href="`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(berita.judul)}`" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Bagikan ke X (Twitter)"
                class="w-9 h-9 flex items-center justify-center bg-black/5 hover:bg-black text-gray-800 hover:text-white rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-sm"
              >
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              
              <!-- WhatsApp -->
              <a 
                :href="`https://api.whatsapp.com/send?text=${encodeURIComponent(berita.judul + ' ' + currentUrl)}`" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Bagikan ke WhatsApp"
                class="w-9 h-9 flex items-center justify-center bg-[#25d366]/10 hover:bg-[#25d366] text-[#25d366] hover:text-white rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-sm"
              >
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              
              <!-- Instagram -->
              <button 
                @click="shareInstagram"
                title="Bagikan ke Instagram"
                class="w-9 h-9 flex items-center justify-center bg-[#e1306c]/10 hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] text-[#e1306c] hover:text-white rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-sm"
              >
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </button>
              
              <!-- Salin Link -->
              <button 
                @click="copyUrl"
                title="Salin Link"
                class="w-9 h-9 flex items-center justify-center bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-sm"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </article>

        </div>

        
        <aside class="lg:col-span-1">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h3 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div class="w-1.5 h-5 bg-red-600 rounded-full"></div>
              Berita Terpopuler
            </h3>
            <div class="flex flex-col gap-5">
              <div
                v-for="item in popularNews"
                :key="'pop-'+item.id"
                class="flex gap-4 group cursor-pointer"
                @click="router.push({ name: 'berita', params: { id: item.id, slug: createSlug(item.judul) } })"
              >
                <div class="w-24 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                  <img
                    :src="(item.images && item.images.length > 0) ? item.images[0] : '/images/themes/photo.jpg'"
                    :alt="item.judul"
                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    @error="handleImageError"
                  />
                </div>
                <div class="flex flex-col justify-center">
                  <h4 class="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors mb-1">
                    {{ item.judul }}
                  </h4>
                  <span class="text-xs text-gray-500 flex items-center gap-2">
                    <span>{{ getPenulisName(item) }}</span>
                    <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>{{ formatDateOnly(item.waktu) }}</span>
                  </span>
                </div>
              </div>
            </div>

            
            <div class="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-4 text-center text-gray-400 font-semibold text-xs flex flex-col items-center justify-center min-h-[250px] gap-1">
              <span class="font-bold text-gray-500 uppercase tracking-wider">Space Ads Available</span>
              <span>Contact Admin for more information</span>
            </div>
          </div>
        </aside>
      </div>

      
      <!-- Iklan Sebelum Berita Terkait -->
      <div v-if="relatedNews.length > 0" class="mt-10 bg-gray-100 border border-gray-200 rounded-lg p-6 text-center text-gray-400 font-semibold text-xs sm:text-sm flex flex-col items-center justify-center min-h-[120px] gap-1">
        <span class="font-bold text-gray-500 uppercase tracking-wider">Space Ads Available</span>
        <span>Contact Admin for more information</span>
      </div>

      <!-- Section Berita Terkait -->
      <section v-if="relatedNews.length > 0" class="mt-8">
        <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <div class="w-1.5 h-6 bg-blue-600 rounded-full"></div>
          Berita Terkait
        </h3>
        <div class="w-full relative">
          <div 
            class="flex overflow-x-auto gap-4 pb-4 hide-scrollbar cursor-grab active:cursor-grabbing select-none"
            ref="scrollContainer"
            @mousedown="onMouseDown"
            @mouseleave="onMouseLeave"
            @mouseup="onMouseUp"
            @mousemove="onMouseMove"
          >
            <div
              v-for="item in relatedNews"
              :key="'rel-'+item.id"
              class="w-64 sm:w-72 flex-none bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group shrink-0"
              @click="navigateToBerita(item.id, item.judul, $event)"
              @dragstart.prevent
            >
              <div class="aspect-[4/3] overflow-hidden pointer-events-none">
                <img
                  :src="(item.images && item.images.length > 0) ? item.images[0] : '/images/themes/photo.jpg'"
                  :alt="item.judul"
                  draggable="false"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  @error="handleImageError"
                />
              </div>
              <div class="p-4">
                <h4 class="font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors mb-2">
                  {{ item.judul }}
                </h4>
                <span class="text-xs text-gray-500 flex items-center gap-2">
                  <span>{{ getPenulisName(item) }}</span>
                  <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>{{ formatDateOnly(item.waktu) }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section Berita Terbaru -->
      <section v-if="latestNews.length > 0" class="mt-12">
        <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <div class="w-1.5 h-6 bg-green-600 rounded-full"></div>
          Berita Terbaru
        </h3>
        <div class="w-full relative">
          <div 
            class="flex overflow-x-auto gap-4 pb-4 hide-scrollbar cursor-grab active:cursor-grabbing select-none"
            ref="latestScrollContainer"
            @mousedown="onLatestMouseDown"
            @mouseleave="onLatestMouseLeave"
            @mouseup="onLatestMouseUp"
            @mousemove="onLatestMouseMove"
          >
            <div
              v-for="item in latestNews"
              :key="'lat-'+item.id"
              class="w-64 sm:w-72 flex-none bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group shrink-0 border-t-2 border-t-green-500"
              @click="navigateToBerita(item.id, item.judul, $event)"
              @dragstart.prevent
            >
              <div class="aspect-[4/3] overflow-hidden pointer-events-none">
                <img
                  :src="(item.images && item.images.length > 0) ? item.images[0] : '/images/themes/photo.jpg'"
                  :alt="item.judul"
                  draggable="false"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  @error="handleImageError"
                />
              </div>
              <div class="p-4">
                <h4 class="font-semibold text-gray-800 line-clamp-2 group-hover:text-green-600 transition-colors mb-2">
                  {{ item.judul }}
                </h4>
                <span class="text-xs text-gray-500 flex items-center gap-2">
                  <span>{{ getPenulisName(item) }}</span>
                  <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>{{ formatDateOnly(item.waktu) }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Iklan di Bawah Berita Terbaru -->
      <div v-if="latestNews.length > 0" class="mt-8 overflow-hidden rounded-xl">
        <template v-if="adLatestBottom && (adLatestBottom.image_url || adLatestBottom.image)">
          <a :href="adLatestBottom.redirect_url || adLatestBottom.url || '#'" target="_blank" class="block w-full overflow-hidden rounded-xl border border-gray-100 shadow-sm">
            <img :src="adLatestBottom.image_url || adLatestBottom.image" :alt="adLatestBottom.title || 'Iklan'" class="w-full max-h-[160px] object-cover sm:object-contain rounded-xl hover:opacity-95 transition-opacity" />
          </a>
        </template>
        <template v-else>
          <div class="bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 border border-dashed border-gray-300 rounded-xl p-6 sm:p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[160px] text-center shadow-sm">
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
    </main>

    
    <div 
      v-if="showModal && berita" 
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-zoom-out"
      @click="closeImageModal"
    >
      <div class="relative max-w-5xl max-h-[85vh] flex flex-col items-center group/modal" @click.stop>
        <img 
          :src="(berita.images && berita.images.length > 0) ? berita.images[activeImgIndex] : '/images/themes/photo.jpg'" 
          :alt="berita.judul" 
          class="max-w-full max-h-[80vh] rounded-lg object-contain shadow-2xl" 
        />
        
        
        <button 
          v-if="berita.images && berita.images.length > 1" 
          @click.stop="prevImage" 
          class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all backdrop-blur-sm flex items-center justify-center border border-white/10"
        >
          <svg class="w-6 h-6 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        
        <button 
          v-if="berita.images && berita.images.length > 1" 
          @click.stop="nextImage" 
          class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all backdrop-blur-sm flex items-center justify-center border border-white/10"
        >
          <svg class="w-6 h-6 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        
        <div 
          v-if="berita.images && berita.images.length > 1" 
          class="absolute bottom-4 bg-black/60 backdrop-blur-md text-white text-xs px-4 py-1.5 rounded-full font-medium"
        >
          {{ activeImgIndex + 1 }} / {{ berita.images.length }}
        </div>

        <button 
          @click="closeImageModal" 
          class="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2.5 transition-all border border-white/10"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { createSlug } from '../utils'
import { sanitizeHTML } from '../utils/sanitize'
import Swal from 'sweetalert2'

const setMetaTag = (attrName: string, attrVal: string, content: string) => {
  let element = document.querySelector(`meta[${attrName}="${attrVal}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attrName, attrVal)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

const getPenulisName = (item: any): string => {
  if (!item) return 'Redaksi Pasuruan Info'
  if (typeof item.penulis === 'string' && item.penulis.trim() !== '') return item.penulis.trim()
  if (item.penulis && typeof item.penulis === 'object' && item.penulis.name) return item.penulis.name
  if (item.Author && typeof item.Author === 'object' && item.Author.name) return item.Author.name
  if (item.author && typeof item.author === 'object' && item.author.name) return item.author.name
  if (item.author_name && typeof item.author_name === 'string' && item.author_name.trim() !== '') return item.author_name.trim()
  if (item.source && typeof item.source === 'string' && item.source.trim() !== '') return item.source.trim()
  return 'Redaksi Pasuruan Info'
}

const getImageUrl = (input: any): string => {
  if (!input) return `${window.location.origin}/images/themes/photo.jpg`
  if (typeof input === 'string') {
    const trimmed = input.trim()
    if (!trimmed) return `${window.location.origin}/images/themes/photo.jpg`
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed
    if (trimmed.startsWith('/')) return `${window.location.origin}${trimmed}`
    return `${window.location.origin}/${trimmed}`
  }
  if (Array.isArray(input) && input.length > 0) {
    return getImageUrl(input[0])
  }
  if (typeof input === 'object') {
    if (input.images && Array.isArray(input.images) && input.images.length > 0) {
      return getImageUrl(input.images[0])
    }
    if (input.gambar) return getImageUrl(input.gambar)
    if (input.image) return getImageUrl(input.image)
    if (input.image_path) return getImageUrl(input.image_path)
  }
  return `${window.location.origin}/images/themes/photo.jpg`
}

const getSafeIsoDate = (rawDate: any): string => {
  if (!rawDate) return new Date().toISOString()
  if (rawDate instanceof Date) {
    return isNaN(rawDate.getTime()) ? new Date().toISOString() : rawDate.toISOString()
  }
  if (typeof rawDate === 'string') {
    const parsed = new Date(rawDate)
    if (!isNaN(parsed.getTime())) {
      return parsed.toISOString()
    }
  }
  return new Date().toISOString()
}

const updateMetaAndSchema = (item: any) => {
  if (!item) return
  try {
    const fullTitle = `${item.judul || 'Berita'} - Pasuruan Info`
    document.title = fullTitle

    const rawExcerpt = item.ringkasan || item.deskripsi || item.isi || item.judul || ''
    const cleanExcerpt = rawExcerpt.replace(/<[^>]*>?/gm, '').substring(0, 160).trim()
    const authorName = getPenulisName(item)
    const imageUrl = getImageUrl(item)
    const pageUrl = window.location.href
    const dateIso = getSafeIsoDate(item.created_at || item.CreatedAt || item.waktu)

    setMetaTag('name', 'description', cleanExcerpt)
    setMetaTag('name', 'author', authorName)
    setMetaTag('name', 'keywords', `${item.kategori || 'Berita'}, Berita Pasuruan, Pasuruan Info, ${(item.judul || '').split(' ').slice(0, 5).join(' ')}`)

    setMetaTag('property', 'og:type', 'article')
    setMetaTag('property', 'og:title', fullTitle)
    setMetaTag('property', 'og:description', cleanExcerpt)
    setMetaTag('property', 'og:image', imageUrl)
    setMetaTag('property', 'og:url', pageUrl)
    setMetaTag('property', 'article:published_time', dateIso)
    setMetaTag('property', 'article:author', authorName)
    setMetaTag('property', 'article:section', item.kategori || 'Berita')

    setMetaTag('name', 'twitter:card', 'summary_large_image')
    setMetaTag('name', 'twitter:title', fullTitle)
    setMetaTag('name', 'twitter:description', cleanExcerpt)
    setMetaTag('name', 'twitter:image', imageUrl)

    let schemaScript = document.getElementById('news-article-schema')
    if (!schemaScript) {
      schemaScript = document.createElement('script')
      schemaScript.id = 'news-article-schema'
      schemaScript.setAttribute('type', 'application/ld+json')
      document.head.appendChild(schemaScript)
    }
    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      'headline': item.judul || '',
      'description': cleanExcerpt,
      'image': [imageUrl],
      'datePublished': dateIso,
      'dateModified': dateIso,
      'author': {
        '@type': 'Person',
        'name': authorName
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Pasuruan Info',
        'logo': {
          '@type': 'ImageObject',
          'url': `${window.location.origin}/Logo%20favicon.png`
        }
      },
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': pageUrl
      }
    }
    schemaScript.textContent = JSON.stringify(schemaData)
  } catch (e) {
    console.warn('Error updating meta tags or schema:', e)
  }
}

const props = defineProps<{ id: string | number }>()
const router = useRouter()

const currentUrl = computed(() => window.location.href)

const getKotaName = (item: NewsItem) => {
  if (item.kota && isNaN(Number(item.kota)) && !item.kota.includes('.')) {
    return item.kota
  }
  const code = item.regency_id || item.kota
  if (code === '35.14' || code === '3514') return 'KABUPATEN PASURUAN'
  if (code === '35.75' || code === '3575') return 'KOTA PASURUAN'
  return 'PASURUAN'
}

const formattedKonten = computed(() => {
  if (!berita.value || !berita.value.konten) return ''
  const kotaStr = `<strong>${getKotaName(berita.value).toUpperCase()}</strong> - `
  const content = berita.value.konten
  
  let rawHTML = ''
  if (content.toLowerCase().startsWith('<p>')) {
    rawHTML = '<p>' + kotaStr + content.substring(3)
  } else {
    const pMatch = content.match(/^<p[^>]*>/i)
    if (pMatch) {
      const openingTag = pMatch[0]
      rawHTML = openingTag + kotaStr + content.substring(openingTag.length)
    } else {
      rawHTML = '<p>' + kotaStr + '</p>' + content
    }
  }
  let sanitized = sanitizeHTML(rawHTML)
  // Remove empty paragraphs containing only <br>, &nbsp; or whitespace
  sanitized = sanitized.replace(/<p>\s*(<br\s*\/?>|&nbsp;|\s*)\s*<\/p>/gi, '')
  // Replace 2 or more consecutive <br> with a single <br>
  sanitized = sanitized.replace(/(<br\s*\/?>\s*){2,}/gi, '<br>')

  // Function to build Baca Juga + Ad block
  const getAddonBlock = (index: number) => {
    let html = ''
    const otherNews = (relatedNews.value || []).filter((p: any) => String(p.id) !== String(berita.value?.id))
    
    if (otherNews.length > 0) {
      const recItem = otherNews[index % otherNews.length]
      if (recItem) {
        const recUrl = `/berita/${recItem.id}/${createSlug(recItem.judul)}`
        html += `
          <div class="my-6 p-4 bg-blue-50/80 border-l-4 border-blue-600 rounded-r-xl not-prose flex items-start gap-3 shadow-sm">
            <span class="font-bold text-blue-800 shrink-0 text-sm sm:text-base">Baca Juga:</span>
            <a href="${recUrl}" class="font-semibold text-blue-700 hover:text-blue-900 hover:underline text-sm sm:text-base line-clamp-2">
              ${recItem.judul}
            </a>
          </div>
        `
      }
    }

    const activeAd = activeAds.value.length > 0 ? activeAds.value[index % activeAds.value.length] : null
    if (activeAd && (activeAd.image_url || activeAd.image)) {
      const imgSrc = activeAd.image_url || activeAd.image
      const redirect = activeAd.redirect_url || activeAd.url || '#'
      html += `
        <div class="my-6 overflow-hidden rounded-xl border border-gray-100 shadow-sm not-prose">
          <a href="${redirect}" target="_blank" rel="noopener font-normal">
            <img src="${imgSrc}" alt="${activeAd.title || 'Iklan'}" class="w-full max-h-36 object-cover rounded-xl hover:opacity-95 transition-opacity" />
          </a>
        </div>
      `
    } else {
      html += `
        <div class="my-6 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 border border-dashed border-gray-300 rounded-xl p-5 text-center text-gray-400 font-bold tracking-widest flex flex-col items-center justify-center min-h-[100px] not-prose shadow-inner">
          <span class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Space Ads Available</span>
          <span class="text-xs text-gray-400 font-normal">Contact Admin for more information</span>
        </div>
      `
    }
    return html
  }

  // Insert after every 2nd </p> tag
  const pMatches = sanitized.match(/<\/p>/gi)
  const pCount = pMatches ? pMatches.length : 0

  if (pCount >= 2) {
    let currentP = 0
    let addonIdx = 0
    return sanitized.replace(/<\/p>/gi, (match) => {
      currentP++
      if (currentP % 2 === 0) {
        return match + getAddonBlock(addonIdx++)
      }
      return match
    })
  } else if (pCount === 1) {
    return sanitized.replace(/<\/p>/i, (match) => match + getAddonBlock(0))
  } else if (sanitized.includes('<br')) {
    let brCount = 0
    let addonIdx = 0
    return sanitized.replace(/<br\s*\/?>/gi, (match) => {
      brCount++
      if (brCount % 2 === 0) {
        return match + getAddonBlock(addonIdx++)
      }
      return match
    })
  }

  return sanitized + getAddonBlock(0)
})

const handleContentClick = (e: MouseEvent) => {
  const target = (e.target as HTMLElement).closest('a')
  if (target) {
    const href = target.getAttribute('href')
    if (href && href.startsWith('/berita/')) {
      e.preventDefault()
      router.push(href)
    }
  }
}

const copyUrl = () => {
  navigator.clipboard.writeText(currentUrl.value)
  Swal.fire({
    icon: 'success',
    title: 'Link Berhasil Disalin',
    text: 'Tautan berita telah disalin ke papan klip!',
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true
  })
}

const shareInstagram = () => {
  navigator.clipboard.writeText(currentUrl.value)
  Swal.fire({
    icon: 'info',
    title: 'Bagikan ke Instagram',
    text: 'Instagram tidak mendukung tautan langsung di web. Tautan berita telah otomatis disalin ke papan klip Anda!',
    confirmButtonColor: '#e1306c',
    confirmButtonText: 'Buka Instagram'
  }).then((result) => {
    if (result.isConfirmed) {
      window.open('https://www.instagram.com', '_blank')
    }
  })
}

const formatDateOnly = (waktuStr?: string): string => {
  if (!waktuStr) return ''
  let clean = waktuStr.replace(/\s*WIB\s*/gi, '').trim()
  clean = clean.replace(/,?\s+\d{1,2}:\d{2}(:\d{2})?$/, '').trim()
  return clean
}

const getActiveImageCaption = (item: any, index: number): string => {
  if (!item) return ''
  if (item.image_captions && Array.isArray(item.image_captions) && item.image_captions[index]) {
    return item.image_captions[index]
  }
  if (item.ImageCaptions && Array.isArray(item.ImageCaptions) && item.ImageCaptions[index]) {
    return item.ImageCaptions[index]
  }
  if (item.images && Array.isArray(item.images) && typeof item.images[index] === 'object' && item.images[index].image_caption) {
    return item.images[index].image_caption
  }
  return item.image_caption || item.ImageCaption || ''
}

interface NewsItem {
  id: number
  judul: string
  kategori: string
  konten: string
  images: string[]
  penulis: string
  waktu: string
  source_url?: string
  image_caption?: string
  created_at: string
  kota?: string
  regency_id?: string
}

const berita = ref<NewsItem | null>(null)
const relatedNews = ref<NewsItem[]>([])
const latestNews = ref<NewsItem[]>([])
const popularNews = ref<NewsItem[]>([])
const activeAds = ref<any[]>([])
const adPopularBottom = ref<any>(null)
const adRelatedTop = ref<any>(null)
const adLatestBottom = ref<any>(null)
const loading = ref(true)
const error = ref('')

const fetchBerita = async () => {
  loading.value = true
  error.value = ''
  try {
    const [detailRes, allRes, adRes, adPopRes, adRelRes, adLatRes] = await Promise.all([
      fetch(`http://localhost:8080/api/v1/news/${props.id}`),
      fetch('http://localhost:8080/api/v1/news'),
      fetch('http://localhost:8080/api/v1/ads/slot/berita_inline'),
      fetch('http://localhost:8080/api/v1/ads/slot/berita_popular_bottom'),
      fetch('http://localhost:8080/api/v1/ads/slot/berita_related_top'),
      fetch('http://localhost:8080/api/v1/ads/slot/berita_latest_bottom')
    ])

    try {
      const adData = await adRes.json()
      if (adData.success) activeAds.value = adData.data || []
    } catch (e) {}

    try {
      const popData = await adPopRes.json()
      if (popData.success && popData.data?.length > 0) adPopularBottom.value = popData.data[0]
    } catch (e) {}

    try {
      const relData = await adRelRes.json()
      if (relData.success && relData.data?.length > 0) adRelatedTop.value = relData.data[0]
    } catch (e) {}

    try {
      const latData = await adLatRes.json()
      if (latData.success && latData.data?.length > 0) adLatestBottom.value = latData.data[0]
    } catch (e) {}

    const detailData = await detailRes.json()
    if (!detailData.success) throw new Error(detailData.message || 'Berita tidak ditemukan')
    berita.value = detailData.data
    if (berita.value) {
      updateMetaAndSchema(berita.value)
    }
    saveToHistory(detailData.data)
    checkIfBookmarked()

    const allData = await allRes.json()
    if (allData.success && allData.data) {
      const allNews = allData.data as NewsItem[]
      
      relatedNews.value = allNews
        .filter(n => n.id !== Number(props.id) && n.kategori === berita.value?.kategori)
        .slice(0, 6)

      if (relatedNews.value.length === 0) {
        relatedNews.value = allNews
          .filter(n => n.id !== Number(props.id))
          .slice(0, 6)
      }

      latestNews.value = [...allNews]
        .filter(n => n.id !== Number(props.id))
        .sort((a, b) => b.id - a.id)
        .slice(0, 6)

      popularNews.value = [...allNews]
        .sort((a, b) => b.id - a.id)
        .filter(n => n.id !== Number(props.id))
        .slice(0, 5)
    }
  } catch (err: any) {
    error.value = err.message || 'Terjadi kesalahan'
  } finally {
    loading.value = false
  }
}

const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800'
}

const scrollContainer = ref<HTMLElement | null>(null)
let isDown = false
let startX = 0
let scrollLeft = 0

const latestScrollContainer = ref<HTMLElement | null>(null)
let isLatestDown = false
let latestStartX = 0
let latestScrollLeft = 0

const onLatestMouseDown = (e: MouseEvent) => {
  if (!latestScrollContainer.value) return
  isLatestDown = true
  latestStartX = e.pageX - latestScrollContainer.value.offsetLeft
  latestScrollLeft = latestScrollContainer.value.scrollLeft
}

const onLatestMouseLeave = () => {
  isLatestDown = false
}

const onLatestMouseUp = () => {
  isLatestDown = false
}

const onLatestMouseMove = (e: MouseEvent) => {
  if (!isLatestDown || !latestScrollContainer.value) return
  e.preventDefault()
  const x = e.pageX - latestScrollContainer.value.offsetLeft
  const walk = (x - latestStartX) * 2
  latestScrollContainer.value.scrollLeft = latestScrollLeft - walk
}
let isDragging = false

const onMouseDown = (e: MouseEvent) => {
  if (!scrollContainer.value) return
  isDown = true
  isDragging = false
  startX = e.pageX - scrollContainer.value.offsetLeft
  scrollLeft = scrollContainer.value.scrollLeft
}

const onMouseLeave = () => {
  isDown = false
}

const onMouseUp = () => {
  isDown = false
}

const onMouseMove = (e: MouseEvent) => {
  if (!isDown || !scrollContainer.value) return
  e.preventDefault()
  const x = e.pageX - scrollContainer.value.offsetLeft
  const walk = (x - startX) * 2
  scrollContainer.value.scrollLeft = scrollLeft - walk
  if (Math.abs(walk) > 5) {
    isDragging = true
  }
}

const navigateToBerita = (id: number, judul: string, e: Event) => {
  if (isDragging) {
    e.preventDefault()
    e.stopPropagation()
    return
  }
  router.push({ name: 'berita', params: { id, slug: createSlug(judul) } })
}

const isBookmarked = ref(false)

const saveToHistory = async (item: NewsItem) => {
  const token = localStorage.getItem('token')
  if (!token) return
  try {
    await fetch('http://localhost:8080/api/v1/histories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        news_id: item.id,
        activity_type: 'read'
      })
    })
  } catch (e) {
    console.error('Failed to save to database history:', e)
  }
}

const checkIfBookmarked = async () => {
  const token = localStorage.getItem('token')
  if (!token || !berita.value) {
    isBookmarked.value = false
    return
  }
  try {
    const res = await fetch(`http://localhost:8080/api/v1/histories?activity_type=bookmark`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const json = await res.json()
    if (json.success) {
      const list: any[] = json.data || []
      isBookmarked.value = list.some((n: any) => n.id === berita.value!.id)
    }
  } catch (e) {
    isBookmarked.value = false
  }
}

const toggleBookmark = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    Swal.fire({
      icon: 'warning',
      title: 'Akses Dibatasi',
      text: 'Silakan login terlebih dahulu untuk menyimpan bookmark!',
      confirmButtonColor: '#3085d6'
    })
    return
  }
  if (!berita.value) return
  try {
    if (isBookmarked.value) {
      const res = await fetch(`http://localhost:8080/api/v1/histories?news_id=${berita.value.id}&activity_type=bookmark`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const json = await res.json()
      if (json.success) {
        isBookmarked.value = false
      }
    } else {
      const res = await fetch('http://localhost:8080/api/v1/histories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          news_id: berita.value.id,
          activity_type: 'bookmark'
        })
      })
      const json = await res.json()
      if (json.success) {
        isBookmarked.value = true
      }
    }
  } catch (e) {
    console.error(e)
  }
}


const activeImgIndex = ref(0)
const showModal = ref(false)

const prevImage = () => {
  if (berita.value?.images && berita.value.images.length > 0) {
    activeImgIndex.value = (activeImgIndex.value - 1 + berita.value.images.length) % berita.value.images.length
  }
}

const nextImage = () => {
  if (berita.value?.images && berita.value.images.length > 0) {
    activeImgIndex.value = (activeImgIndex.value + 1) % berita.value.images.length
  }
}

const openImageModal = () => {
  showModal.value = true
}

const closeImageModal = () => {
  showModal.value = false
}


watch(() => props.id, () => {
  activeImgIndex.value = 0
  fetchBerita()
})

onMounted(fetchBerita)
onUnmounted(() => {
  const schemaScript = document.getElementById('news-article-schema')
  if (schemaScript) schemaScript.remove()
})
</script>
