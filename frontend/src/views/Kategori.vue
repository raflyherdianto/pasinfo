<template>
  <div class="container mx-auto px-4 py-8 max-w-7xl">
    
    <div class="mb-8 relative">
      <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 uppercase inline-block pr-6 bg-gray-50 relative z-10">
        Berita <span class="text-blue-600">{{ kategoriTitle }}</span>
      </h1>
      <div class="absolute top-1/2 left-0 w-full h-[3px] bg-gray-200 -z-0 transform -translate-y-1/2 rounded-full"></div>
    </div>
    
    
    <div v-if="loading" class="space-y-12">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 h-[450px] bg-gray-200 animate-pulse rounded-2xl"></div>
        <div class="space-y-4 bg-white border border-gray-100 shadow-md rounded-2xl p-6">
          <div class="h-6 w-1/3 bg-gray-200 animate-pulse rounded mb-6"></div>
          <div v-for="i in 4" :key="i" class="flex gap-4">
            <div class="w-20 h-20 bg-gray-200 animate-pulse rounded-xl shrink-0"></div>
            <div class="flex-grow space-y-2">
              <div class="h-4 bg-gray-200 animate-pulse rounded"></div>
              <div class="h-4 bg-gray-200 animate-pulse rounded w-5/6"></div>
              <div class="h-3 w-1/4 bg-gray-200 animate-pulse rounded mt-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    
    <div v-else-if="!data.featured" class="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-3xl border border-gray-100 shadow-sm max-w-3xl mx-auto my-8">
      <div class="bg-blue-50 text-blue-600 p-6 rounded-full mb-6">
        <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15M9 11l3 3m0 0l3-3m-3 3V8"></path></svg>
      </div>
      <h3 class="text-xl font-bold text-gray-800 mb-2">Belum Ada Berita</h3>
      <p class="text-gray-500 max-w-md mb-8">Berita untuk kategori "{{ kategoriTitle }}" saat ini belum tersedia. Silakan telusuri berita-berita menarik di kategori lainnya!</p>
      <button @click="router.push('/')" class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition duration-300 shadow-md">
        Kembali ke Beranda
      </button>
    </div>

    
    <div v-else>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        
        <div class="lg:col-span-2">
          <div class="relative rounded-2xl overflow-hidden cursor-pointer group h-[400px] lg:h-[500px] shadow-lg transition duration-300 hover:shadow-xl" @click="navigateToBerita(data.featured.id, data.featured.judul)">
            <img :src="(data.featured.images && data.featured.images.length > 0) ? data.featured.images[0] : '/images/themes/photo.jpg'" :alt="data.featured.judul" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" @error="handleImageError">
            <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-8">
              <span class="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 w-max shadow-sm">{{ data.featured.kategori }}</span>
              <h2 class="text-white text-2xl md:text-3xl font-extrabold mb-4 leading-tight group-hover:text-blue-300 transition-colors">{{ data.featured.judul }}</h2>
              <div class="flex items-center text-gray-300 text-sm gap-4">
                <span class="flex items-center"><i class="far fa-clock mr-1.5"></i>{{ data.featured.waktu }}</span>
                <span class="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                <span class="flex items-center"><i class="far fa-user mr-1.5"></i>{{ data.featured.penulis || 'Redaksi Pasinfo' }}</span>
              </div>
            </div>
          </div>
        </div>
        
        
        <div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-md flex flex-col justify-between">
          <div>
            <h3 class="text-lg font-extrabold text-gray-900 mb-6 border-l-4 border-blue-600 pl-3">Terbaru di Kategori Ini</h3>
            <div class="space-y-6">
              <div v-for="berita in data.latest" :key="berita.id" class="flex gap-4 cursor-pointer group" @click="navigateToBerita(berita.id, berita.judul)">
                <div class="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden shadow-sm">
                  <img :src="(berita.images && berita.images.length > 0) ? berita.images[0] : '/images/themes/photo.jpg'" :alt="berita.judul" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" @error="handleImageError">
                </div>
                <div class="flex flex-col justify-center">
                  <h4 class="font-bold text-gray-800 text-sm leading-snug group-hover:text-blue-600 line-clamp-2 mb-1.5 transition-colors">{{ berita.judul }}</h4>
                  <span class="text-gray-500 text-xs flex items-center"><i class="far fa-clock mr-1"></i>{{ berita.waktu }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      
      <div v-if="data.list.length > 0" class="mb-16">
        <h2 class="text-2xl font-extrabold text-gray-900 mb-8 border-b-2 border-gray-100 pb-3 inline-block relative after:absolute after:bottom-0 after:left-0 after:w-1/2 after:h-[3px] after:bg-blue-600">Berita Lainnya</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="berita in data.list" :key="berita.id" class="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden group flex flex-col" @click="navigateToBerita(berita.id, berita.judul)">
            <div class="h-48 overflow-hidden relative">
              <img :src="(berita.images && berita.images.length > 0) ? berita.images[0] : '/images/themes/photo.jpg'" :alt="berita.judul" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" @error="handleImageError">
              <span class="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase shadow-md">{{ berita.kategori }}</span>
            </div>
            <div class="p-5 flex-1 flex flex-col">
              <h3 class="font-bold text-gray-800 text-base leading-snug mb-3 group-hover:text-blue-600 line-clamp-3 transition-colors flex-1">{{ berita.judul }}</h3>
              <span class="text-gray-500 text-xs flex items-center border-t border-gray-50 pt-3 mt-auto"><i class="far fa-clock mr-1.5 text-gray-400"></i>{{ berita.waktu }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    
    <div class="bg-white rounded-xl shadow-md p-8 mb-12 mt-12">
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
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const props = defineProps<{
  kategori?: string;
}>();

const router = useRouter();
const route = useRoute();
const allNews = ref<any[]>([]);
const loading = ref(true);

const currentKategori = computed(() => {
  const k = props.kategori || route.query.type?.toString() || route.params.kategori?.toString() || 'lokal';
  return k.toLowerCase();
});

const kategoriNames: Record<string, string> = {
  lokal: 'Lokal',
  nasional: 'Nasional',
  wisata: 'Wisata',
  politik: 'Politik',
  ekonomi: 'Ekonomi',
  olahraga: 'Olahraga',
  teknologi: 'Teknologi',
  hiburan: 'Hiburan',
  kesehatan: 'Kesehatan',
  inspiratif: 'Inspiratif'
};

const kategoriTitle = computed(() => {
  const raw = currentKategori.value;
  return kategoriNames[raw] || raw.charAt(0).toUpperCase() + raw.slice(1);
});

watch(kategoriTitle, (newVal) => {
  document.title = `Berita ${newVal} - Pasinfo`;
}, { immediate: true });

const fetchAllNews = async () => {
  loading.value = true;
  try {
    const res = await fetch(`http://localhost:8080/api/v1/news/category/${currentKategori.value}`);
    if (res.status === 404) {
      allNews.value = [];
      return;
    }
    const json = await res.json();
    if (json.success && json.data) {
      allNews.value = json.data;
    } else {
      allNews.value = [];
    }
  } catch (err) {
    console.error('Failed to load category news:', err);
    allNews.value = [];
  } finally {
    loading.value = false;
  }
};

const data = computed(() => {
  const news = allNews.value;
  return {
    featured: news[0] || null,
    latest: news.slice(1, 5),
    list: news.slice(5)
  };
});

onMounted(() => {
  fetchAllNews();
});


watch(currentKategori, () => {
  fetchAllNews();
});

const createSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const navigateToBerita = (id: number, title: string) => {
  router.push({ name: 'berita', params: { id, slug: createSlug(title) } });
};

const handleImageError = (e: Event) => {
  const target = e.target as HTMLImageElement;
  target.src = '/images/themes/photo.jpg';
};

const jelajahItems = ref([
  { name: 'Wisata',  path: 'wisata',  image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&q=80&w=400' },
  { name: 'Kuliner', path: 'kuliner', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=400' },
  { name: 'Budaya',  path: 'budaya',  image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=400' },
  { name: 'Acara',   path: 'acara',   image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=400' }
]);

const navigateToJelajah = (path: string) => {
  if (path === 'wisata') {
    router.push('/wisata');
  } else {
    router.push({ path: '/jelajah', query: { tab: path } });
  }
};
</script>
