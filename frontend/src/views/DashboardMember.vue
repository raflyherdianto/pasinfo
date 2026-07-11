<template>
  <div class="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
    
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-6">
      <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0 border-4 border-gray-50 bg-gray-100">
        <img :src="userData.photo || userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userData.nama || 'User')}`" alt="Avatar" class="w-full h-full object-cover">
      </div>
      <div>
        <div class="flex flex-wrap items-center gap-2">
          <h2 class="text-2xl font-bold text-gray-800">{{ userData.nama || userData.email.split('@')[0] }}</h2>
          <span v-if="userData.is_verified === 1" class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
            <i class="fas fa-check-circle mr-1 text-green-500"></i> Terverifikasi
          </span>
          <span v-else class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800">
            <i class="fas fa-exclamation-circle mr-1 text-red-500"></i> Belum Terverifikasi
          </span>
        </div>
        <div class="inline-flex items-center space-x-2 px-3 py-1 mt-2 rounded-full text-sm font-semibold"
             :style="{ backgroundColor: currentLevel.bgColor, color: currentLevel.color }">
          <i class="fas" :class="currentLevel.icon"></i>
          <span>Member {{ currentLevel.name }}</span>
        </div>
        <p class="text-gray-500 text-sm mt-2">Member sejak: {{ memberSince }}</p>
      </div>
    </div>
    
    
    <div v-if="memberLevel !== 'gold'" class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div class="flex justify-between items-center mb-2">
        <span class="font-medium text-gray-700">
          <i class="fas fa-chart-line text-blue-500 mr-2"></i> Menuju {{ currentLevel.nextLevel }}
        </span>
        <span class="text-sm font-bold text-gray-700">{{ currentXp }} / {{ currentLevel.nextLevelXp }} XP</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2.5 mb-2">
        <div class="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
             :style="{ width: `${Math.min(100, (currentXp / currentLevel.nextLevelXp) * 100)}%` }"></div>
      </div>
      <p class="text-sm text-gray-500">⭐ Dapatkan XP tambahan dengan membaca artikel berita (+10 XP) dan mem-bookmark berita (+20 XP)!</p>
    </div>
    <div v-else class="bg-yellow-100 border border-yellow-200 text-yellow-800 p-4 rounded-xl flex items-center space-x-3">
      <i class="fas fa-crown text-2xl"></i>
      <span class="font-medium">Selamat! Anda adalah Member Gold. Nikmati semua akses premium!</span>
    </div>

    
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 class="text-xl font-bold text-gray-800 mb-4">Fitur Anda</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div v-for="(feature, index) in features[memberLevel]" :key="index"
             class="flex items-center space-x-2 text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
          <span class="font-medium">{{ feature }}</span>
        </div>
      </div>
    </div>
    
    
    <div v-if="memberLevel !== 'gold'" class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6 flex flex-col sm:flex-row items-center justify-between">
      <div class="mb-4 sm:mb-0">
        <h3 class="text-xl font-bold text-gray-800">Upgrade Ke {{ currentLevel.nextLevel }}</h3>
        <p class="text-gray-600">Dapatkan akses lebih lengkap dengan menjadi Member {{ currentLevel.nextLevel }}</p>
      </div>
      <button @click="upgrade"
              class="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm flex items-center space-x-2 shrink-0">
        <i class="fas fa-arrow-up"></i>
        <span>Upgrade Sekarang</span>
      </button>
    </div>

    
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="flex border-b border-gray-200">
        <button @click="switchTab('bookmark')"
                class="flex-1 py-4 text-center font-medium transition-colors"
                :class="activeTab === 'bookmark' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'">
          Bookmark
        </button>
        <button @click="switchTab('history')"
                class="flex-1 py-4 text-center font-medium transition-colors"
                :class="activeTab === 'history' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'">
          Riwayat Baca
        </button>
      </div>
      
      <div class="p-6">
        
        <div v-if="activeTab === 'bookmark'">
          <div v-if="bookmarks.length > 0" class="space-y-4">
            <div 
              v-for="item in bookmarks" 
              :key="'bookmark-'+item.id"
              class="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-blue-100 hover:bg-blue-50/20 transition-all cursor-pointer group"
              @click="navigateToBerita(item.id, item.judul)"
            >
              <div class="flex-grow">
                <h4 class="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-1">{{ item.judul }}</h4>
                <div class="flex items-center gap-3 text-xs text-gray-500">
                  <span class="bg-blue-50 text-blue-600 px-2 py-0.5 rounded uppercase font-semibold">{{ item.kategori }}</span>
                  <span>{{ item.waktu }}</span>
                </div>
              </div>
              <button 
                @click.stop="removeBookmark(item.id)" 
                class="p-2 text-gray-400 hover:text-red-600 transition-colors hover:bg-red-50 rounded-lg shrink-0 ml-4"
                title="Hapus Bookmark"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
          <div v-else class="text-center py-12 flex flex-col items-center justify-center text-gray-400">
            <i class="far fa-bookmark text-5xl mb-4 text-gray-300"></i>
            <p class="text-lg font-medium text-gray-600">Belum ada artikel yang disimpan</p>
            <small class="text-gray-500 mt-1">Klik tombol bookmark pada halaman detail artikel untuk menyimpannya</small>
          </div>
        </div>

        
        <div v-else>
          <div v-if="history.length > 0" class="space-y-4">
            <div 
              v-for="item in history" 
              :key="'history-'+item.id"
              class="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-blue-100 hover:bg-blue-50/20 transition-all cursor-pointer group"
              @click="navigateToBerita(item.id, item.judul)"
            >
              <div class="flex-grow">
                <h4 class="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-1">{{ item.judul }}</h4>
                <div class="flex items-center gap-3 text-xs text-gray-500">
                  <span class="bg-gray-100 text-gray-600 px-2 py-0.5 rounded uppercase font-semibold">{{ item.kategori }}</span>
                  <span>{{ item.waktu }}</span>
                </div>
              </div>
              <span class="text-xs text-gray-400 shrink-0 ml-4">Dibaca: {{ formatRelativeDate(item.readAt) }}</span>
            </div>
          </div>
          <div v-else class="text-center py-12 flex flex-col items-center justify-center text-gray-400">
            <i class="far fa-clock text-5xl mb-4 text-gray-300"></i>
            <p class="text-lg font-medium text-gray-600">Belum ada riwayat baca</p>
            <small class="text-gray-500 mt-1">Artikel berita yang Anda baca akan muncul di sini</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { createSlug } from '../utils'
import Swal from 'sweetalert2'

const router = useRouter()

const userData = ref({
  id: null,
  nama: '',
  email: '',
  photo: '',
  avatar: '',
  CreatedAt: '',
  is_verified: 0
})

const memberSince = ref('')
const activeTab = ref<'bookmark' | 'history'>('bookmark')

const bookmarks = ref<any[]>([])
const history = ref<any[]>([])

const loadUserData = async () => {
  const localUserData = localStorage.getItem('userData')
  const token = localStorage.getItem('token')
  if (localUserData) {
    try {
      const parsed = JSON.parse(localUserData)
      userData.value = {
        id: parsed.id,
        nama: parsed.name || parsed.nama || '',
        email: parsed.email || '',
        photo: parsed.photo || '',
        avatar: parsed.photo || '',
        CreatedAt: parsed.CreatedAt || parsed.created_at || '',
        is_verified: parsed.is_verified || 0,
        total_xp: parsed.total_xp || 0
      }
      
      const createdAt = parsed.CreatedAt || parsed.created_at
      if (createdAt) {
        memberSince.value = new Date(createdAt).toLocaleDateString('id-ID')
      } else {
        memberSince.value = new Date().toLocaleDateString('id-ID')
      }

      if (parsed.id && token) {
        const res = await fetch(`http://localhost:8080/api/v1/users/${parsed.id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const json = await res.json()
        if (json.success) {
          const u = json.data
          userData.value = {
            id: u.id,
            nama: u.name,
            email: u.email,
            photo: u.photo,
            avatar: u.photo,
            CreatedAt: u.created_at,
            is_verified: u.is_verified,
            total_xp: u.total_xp
          }
          if (u.created_at) {
            memberSince.value = new Date(u.created_at).toLocaleDateString('id-ID')
          }
        }
      }
    } catch (e) {
      console.error(e)
    }
  } else {
    userData.value = {
      id: null,
      nama: 'Member Pasinfo',
      email: 'member@pasinfo.com',
      photo: '',
      avatar: '',
      CreatedAt: '',
      is_verified: 0
    }
    memberSince.value = new Date().toLocaleDateString('id-ID')
  }
}

const loadBookmarksAndHistory = async () => {
  const token = localStorage.getItem('token')
  if (!token) return
  
  try {
    const [bRes, hRes] = await Promise.all([
      fetch('http://localhost:8080/api/v1/histories?activity_type=bookmark', {
        headers: { 'Authorization': `Bearer ${token}` }
      }),
      fetch('http://localhost:8080/api/v1/histories?activity_type=read', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
    ])

    const bJson = await bRes.json()
    const hJson = await hRes.json()

    if (bJson.success) bookmarks.value = bJson.data || []
    if (hJson.success) history.value = hJson.data || []
  } catch (e) {
    console.error('Failed to load histories from database:', e)
  }
}

onMounted(async () => {
  await loadUserData()
  await loadBookmarksAndHistory()
})

const currentXp = computed(() => {
  return userData.value.total_xp !== undefined && userData.value.total_xp !== null
    ? userData.value.total_xp
    : (bookmarks.value.length * 20 + history.value.length * 10 + 50)
})

const memberLevel = computed(() => {
  const xp = currentXp.value
  if (xp >= 1500) return 'gold'
  if (xp >= 500) return 'silver'
  return 'bronze'
})

const levelConfig = {
  bronze: { name: 'Bronze', color: '#cd7f32', bgColor: '#f5e6d3', icon: 'fa-medal', nextLevel: 'Silver', nextLevelXp: 500 },
  silver: { name: 'Silver', color: '#6b7280', bgColor: '#f3f4f6', icon: 'fa-star', nextLevel: 'Gold', nextLevelXp: 1500 },
  gold: { name: 'Gold', color: '#d97706', bgColor: '#fef3c7', icon: 'fa-crown', nextLevel: null, nextLevelXp: null }
}

const features = {
  bronze: [
    '✅ Bisa komentar & diskusi',
    '✅ Bookmark / simpan artikel',
    '✅ Notifikasi berita sesuai minat'
  ],
  silver: [
    '✅ Bisa komentar & diskusi',
    '✅ Bookmark / simpan artikel',
    '✅ Notifikasi berita sesuai minat',
    '⭐ Akses artikel premium / investigasi',
    '⭐ Ringkasan berita (daily/weekly digest)',
    '⭐ Early access (berita lebih cepat)',
    '⭐ Newsletter eksklusif'
  ],
  gold: [
    '✅ Bisa komentar & diskusi',
    '✅ Bookmark / simpan artikel',
    '✅ Notifikasi berita sesuai minat',
    '⭐ Akses artikel premium / investigasi',
    '⭐ Ringkasan berita (daily/weekly digest)',
    '⭐ Early access (berita lebih cepat)',
    '⭐ Newsletter eksklusif',
    '👑 Akses laporan mendalam (deep analysis)',
    '👑 Bisa request topik berita',
    '👑 Insight khusus (trend, data, opini expert)',
    '👑 Download report / PDF premium'
  ]
}

const currentLevel = computed(() => levelConfig[memberLevel.value])

const upgrade = () => {
  Swal.fire({
    icon: 'info',
    title: 'Info Level Member',
    text: 'Fitur upgrade level member akan otomatis naik seiring dengan bertambahnya XP Anda!',
    confirmButtonColor: '#3085d6'
  })
}

const switchTab = (tab: 'bookmark' | 'history') => {
  activeTab.value = tab
}

const removeBookmark = async (id: number) => {
  const token = localStorage.getItem('token')
  if (!token) return
  
  try {
    const res = await fetch(`http://localhost:8080/api/v1/histories?news_id=${id}&activity_type=bookmark`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const json = await res.json()
    if (json.success) {
      bookmarks.value = bookmarks.value.filter(n => n.id !== id)
      await loadUserData()
    }
  } catch (e) {
    console.error('Failed to delete bookmark:', e)
  }
}

const navigateToBerita = (id: number, judul: string) => {
  router.push({ name: 'berita', params: { id, slug: createSlug(judul) } })
}

const formatRelativeDate = (isoStr: string) => {
  if (!isoStr) return ''
  try {
    const d = new Date(isoStr)
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Jakarta'
    }
    return d.toLocaleDateString('id-ID', options).replace(/\./g, ':') + ' WIB'
  } catch (e) {
    return ''
  }
}
</script>
