<template>
  <div class="min-h-screen bg-gray-50 py-10 font-sans">
    <main class="container mx-auto px-4 max-w-3xl">
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          Hasil Pencarian: <span class="text-blue-600 font-extrabold">"{{ query }}"</span>
        </h2>

        <div v-if="loading" class="text-center py-16">
          <div class="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-gray-500 font-medium">Mencari berita...</p>
        </div>

        <div v-else-if="searchResults.length > 0" class="space-y-4">
          <div 
            v-for="berita in searchResults" 
            :key="berita.id"
            class="p-4 border border-gray-100 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer transition-all group"
            @click="navigateToBerita(berita.id, berita.judul)"
          >
            <h3 class="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors mb-2">
              {{ berita.judul }}
            </h3>
            <div class="flex items-center text-sm text-gray-500 gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>{{ berita.waktu }}</span>
              <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span class="uppercase font-medium text-blue-600">{{ berita.kategori }}</span>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-16 flex flex-col items-center">
          <div class="w-20 h-20 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-4">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <p class="text-lg font-medium text-gray-800">Maaf, tidak ditemukan berita dengan kata kunci "{{ query }}"</p>
          <p class="text-gray-500 mt-2">Coba gunakan kata kunci lain atau periksa ejaan Anda.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createSlug } from '../utils'

const route = useRoute()
const router = useRouter()

const query = computed(() => (route.query.q as string) || '')
const searchResults = ref<any[]>([])
const loading = ref(false)

const fetchResults = async () => {
  if (!query.value.trim()) return
  loading.value = true
  try {
    const res = await fetch(`http://localhost:8080/api/v1/news?q=${encodeURIComponent(query.value)}`)
    const json = await res.json()
    if (json.success) {
      searchResults.value = json.data
    }
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

onMounted(fetchResults)
watch(query, fetchResults)

const navigateToBerita = (id: number, judul: string) => {
  router.push({ name: 'berita', params: { id, slug: createSlug(judul) } })
}
</script>
