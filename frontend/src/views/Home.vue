<template>
  <div>
    
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        
        <div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 content-start">
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
                <span class="flex items-center gap-1">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  {{ news.waktu }}
                </span>
                <span class="w-1 h-1 bg-gray-400 rounded-full"></span>
                <span class="flex items-center gap-1 truncate">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  <span class="truncate">{{ news.penulis }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        
        <div class="bg-white rounded-xl shadow p-6 flex flex-col h-full lg:max-h-[calc(3*320px+2*0.75rem)] overflow-hidden">
          <h3 class="text-xl font-bold border-b pb-3 mb-4 text-gray-800 shrink-0">Berita Terbaru</h3>
          <div class="space-y-4">
            <div 
              v-for="berita in latestNews" 
              :key="berita.id"
              class="flex gap-4 cursor-pointer group"
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
              <div class="flex flex-col justify-center">
                <h4 class="font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {{ berita.judul }}
                </h4>
                <span class="text-xs text-gray-500 mt-2 flex items-center gap-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  {{ berita.waktu }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <template v-for="(categoryList, categoryName) in categoryNews" :key="categoryName">
          <div>
            <div 
              class="flex items-center justify-between border-b-2 border-gray-200 pb-2 mb-4 cursor-pointer group"
              @click="navigateToCategory(categoryName)"
            >
              <div class="flex items-center gap-2">
                <div class="w-1.5 h-6 bg-blue-600"></div>
                <h3 class="text-lg font-bold text-gray-800 uppercase">{{ categoryName }}</h3>
              </div>
              <svg class="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </div>
            
            <div class="space-y-5">
              <div 
                v-for="berita in categoryList" 
                :key="berita.id"
                class="flex gap-4 cursor-pointer group"
                @click="navigateToBerita(berita.id, berita.judul)"
              >
                <div class="w-20 h-20 shrink-0 overflow-hidden rounded-lg">
                  <img :src="(berita.images && berita.images.length > 0) ? berita.images[0] : '/images/themes/photo.jpg'" :alt="berita.judul" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div class="flex flex-col justify-center">
                  <h4 class="font-medium text-sm text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {{ berita.judul }}
                  </h4>
                  <span class="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    {{ berita.waktu }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>

      
      <div class="bg-white rounded-xl shadow-md p-8 mb-12">
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { createSlug } from '../utils'

const router = useRouter()

const featuredNews = ref<any[]>([])
const latestNews = ref<any[]>([])

const categoryNews = ref<Record<string, any[]>>({
  lokal: [],
  nasional: [],
  politik: []
})

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8080/api/v1/news')
    const result = await response.json()
    if (result.success && result.data) {
      featuredNews.value = result.data.slice(0, 6)
      latestNews.value = result.data.slice(6, 14)


      categoryNews.value.lokal    = result.data.filter((n: any) => n.kategori.toLowerCase() === 'lokal').slice(0, 4)
      categoryNews.value.nasional = result.data.filter((n: any) => n.kategori.toLowerCase() === 'nasional').slice(0, 4)
      categoryNews.value.politik  = result.data.filter((n: any) => n.kategori.toLowerCase() === 'politik').slice(0, 4)
    }
  } catch (err) {
    console.error('Failed to fetch news:', err)
  }
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
