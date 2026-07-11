<template>
  <div class="min-h-screen bg-gray-50 py-8 font-sans">
    <main class="container mx-auto px-4 max-w-7xl">
      
      <button
        @click="router.back()"
        class="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors font-medium"
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

      
      <article v-else-if="berita" class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-6 md:p-8">
          
          <div class="mb-6">
            <div class="flex justify-between items-start">
              <span class="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full mb-4 uppercase tracking-wide">
                {{ berita.kategori }}
              </span>
              <button 
                @click="toggleBookmark"
                class="flex items-center gap-2 text-base text-gray-500 hover:text-red-600 transition-colors font-semibold"
                :title="isBookmarked ? 'Hapus Bookmark' : 'Simpan Bookmark'"
              >
                <svg 
                  class="w-5 h-5" 
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
            <h1 class="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-4">
              {{ berita.judul }}
            </h1>
            <div class="flex flex-wrap items-center text-sm text-gray-500 gap-4">
              <span class="flex items-center gap-1.5">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {{ berita.waktu }}
              </span>
              <span class="flex items-center gap-1.5">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                {{ berita.penulis }}
              </span>
              <a
                v-if="berita.source_url"
                :href="berita.source_url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-1.5 text-blue-500 hover:underline"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                </svg>
                Sumber Asli
              </a>
            </div>
          </div>

          
          <div class="mb-8 relative group">
            <div class="relative rounded-xl overflow-hidden bg-gray-100 aspect-video shadow-sm border border-gray-100">
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
                class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2.5 rounded-full transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center"
              >
                <svg class="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              
              <button 
                v-if="berita.images && berita.images.length > 1" 
                @click.stop="nextImage" 
                class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2.5 rounded-full transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center"
              >
                <svg class="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              
              <div 
                v-if="berita.images && berita.images.length > 1" 
                class="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-medium"
              >
                {{ activeImgIndex + 1 }} / {{ berita.images.length }}
              </div>
            </div>
            <p v-if="berita.image_caption" class="mt-3.5 text-center text-sm md:text-base text-gray-500 italic max-w-3xl mx-auto px-4">
              {{ berita.image_caption }}
            </p>
          </div>

          
          <div 
            class="prose prose-lg max-w-none text-gray-700 leading-relaxed prose-headings:mt-6 prose-headings:mb-3 prose-p:my-4 prose-h1:mt-8 prose-h1:mb-4 prose-h2:mt-7 prose-h2:mb-3.5 prose-h3:mt-6 prose-h3:mb-3" 
            v-html="formattedKonten"
          ></div>

          
          <div class="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <span class="text-sm font-bold text-gray-600 uppercase tracking-wider flex items-center gap-2">
              <svg class="w-4 h-4 text-blue-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 10.742l4.636-2.318M8.684 13.258l4.636 2.318m6.037-7.04a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm-10 5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm10 5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              Bagikan Artikel:
            </span>
            <div class="flex flex-wrap gap-2.5">
              
              <a 
                :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`" 
                target="_blank" 
                rel="noopener noreferrer"
                class="flex items-center gap-2 px-3 py-1.5 bg-[#1877f2]/10 hover:bg-[#1877f2] text-[#1877f2] hover:text-white rounded-lg font-semibold text-xs transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-sm"
              >
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </a>
              
              <a 
                :href="`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(berita.judul)}`" 
                target="_blank" 
                rel="noopener noreferrer"
                class="flex items-center gap-2 px-3 py-1.5 bg-black/5 hover:bg-black text-gray-800 hover:text-white rounded-lg font-semibold text-xs transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-sm"
              >
                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                X (Twitter)
              </a>
              
              <a 
                :href="`https://api.whatsapp.com/send?text=${encodeURIComponent(berita.judul + ' ' + currentUrl)}`" 
                target="_blank" 
                rel="noopener noreferrer"
                class="flex items-center gap-2 px-3 py-1.5 bg-[#25d366]/10 hover:bg-[#25d366] text-[#25d366] hover:text-white rounded-lg font-semibold text-xs transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-sm"
              >
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
              
              <button 
                @click="shareInstagram"
                class="flex items-center gap-2 px-3 py-1.5 bg-[#e1306c]/10 hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] text-[#e1306c] hover:text-white rounded-lg font-semibold text-xs transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-sm"
              >
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                Instagram
              </button>
              
              <button 
                @click="copyUrl"
                class="flex items-center gap-2 px-3 py-1.5 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white rounded-lg font-semibold text-xs transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-sm"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Salin Link
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
                  <span class="text-xs text-gray-500">{{ item.waktu }}</span>
                </div>
              </div>
            </div>

            
            <div class="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-4 text-center text-gray-400 font-bold tracking-widest flex items-center justify-center min-h-[250px]">
              IKLAN SIDEBAR
            </div>
          </div>
        </aside>
      </div>

      
      <section v-if="relatedNews.length > 0" class="mt-12">
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
              :key="item.id"
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
              <span class="text-xs text-gray-500">{{ item.waktu }}</span>
            </div>
          </div>
        </div>
        </div>


        
        <div class="mt-8 bg-gray-100 border border-gray-200 rounded-lg p-6 text-center text-gray-400 font-bold tracking-widest flex items-center justify-center min-h-[120px]">
          IKLAN RELATED
        </div>
      </section>
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
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { createSlug } from '../utils'
import { sanitizeHTML } from '../utils/sanitize'
import Swal from 'sweetalert2'

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
  return sanitizeHTML(rawHTML)
})

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
const popularNews = ref<NewsItem[]>([])
const loading = ref(true)
const error = ref('')

const fetchBerita = async () => {
  loading.value = true
  error.value = ''
  try {
    const [detailRes, allRes] = await Promise.all([
      fetch(`http://localhost:8080/api/v1/news/${props.id}`),
      fetch('http://localhost:8080/api/v1/news')
    ])

    const detailData = await detailRes.json()
    if (!detailData.success) throw new Error(detailData.message || 'Berita tidak ditemukan')
    berita.value = detailData.data
    if (berita.value && berita.value.judul) {
      document.title = `${berita.value.judul} - Pasinfo`
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
</script>
