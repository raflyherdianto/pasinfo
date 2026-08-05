<template>
  <div class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6">
    
    <div class="w-full lg:w-1/4 flex flex-col gap-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
        <div class="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-gray-50">
          <img :src="userData.photo || userData.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + (userData.nama || 'Editor')" alt="Avatar" class="w-full h-full object-cover">
        </div>
        <h3 class="text-xl font-bold text-gray-800">{{ userData.nama || userData.email.split('@')[0] }}</h3>
        <div class="mt-2 flex flex-col items-center gap-1.5">
          <span class="inline-block px-3 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">Editor</span>
          <span v-if="userData.is_verified === 1" class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
            <i class="fas fa-check-circle mr-1 text-green-500"></i> Terverifikasi
          </span>
          <span v-else class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800">
            <i class="fas fa-exclamation-circle mr-1 text-red-500"></i> Belum Terverifikasi
          </span>
          <button @click="openEditProfileModal" class="mt-4 px-4 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition-colors">
            <i class="fas fa-user-edit text-xs"></i> <span>Edit Profil</span>
          </button>
        </div>
        
        <div class="w-full grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100">
          <div class="flex flex-col">
            <span class="text-2xl font-bold text-gray-800">{{ pendingNews.length }}</span>
            <span class="text-xs text-gray-500 font-medium uppercase tracking-wider">Tugas</span>
          </div>
          <div class="flex flex-col border-l border-gray-100">
            <span class="text-2xl font-bold text-gray-800">{{ notifikasiList.length }}</span>
            <span class="text-xs text-gray-500 font-medium uppercase tracking-wider">Notif</span>
          </div>
        </div>
      </div>
    </div>
    
    
    <div class="w-full lg:w-2/4 flex flex-col gap-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        
        
        <div v-if="!selectedBerita" class="flex border-b border-gray-200">
          <div class="flex-1 py-4 text-center font-medium bg-blue-50/50 text-blue-600 border-b-2 border-blue-600 flex items-center justify-center space-x-2">
            <i class="fas fa-tasks"></i> <span>Daftar Berita Perlu Review</span>
          </div>
        </div>

        
        <div v-if="selectedBerita" class="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
          <button @click="selectedBerita = null" class="text-gray-600 hover:text-gray-900 font-medium flex items-center space-x-2 transition-colors">
            <i class="fas fa-arrow-left"></i> <span>Kembali ke Review</span>
          </button>
          <span class="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
            Review Berita
          </span>
        </div>

        
        <div v-if="!selectedBerita" class="p-6">
          <div v-if="pendingNews.length === 0" class="text-center py-8 text-gray-500">
            Tidak ada berita yang perlu direview saat ini.
          </div>
          <div class="space-y-4">
            <div v-for="berita in pendingNews" :key="berita.id || berita.ID" 
                 @click="reviewBerita(berita)"
                 class="p-4 border border-gray-200 rounded-xl hover:shadow-md hover:border-gray-300 transition-all cursor-pointer bg-white group">
              <h4 class="font-bold text-gray-800 text-lg group-hover:text-blue-600 transition-colors mb-2">{{ berita.judul || berita.Title }}</h4>
              <div class="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-2">
                <span class="flex items-center space-x-1"><i class="far fa-folder"></i> <span>Kategori: {{ berita.kategori?.name || berita.Category?.name || 'Umum' }}</span></span>
                <span class="flex items-center space-x-1"><i class="far fa-user"></i> <span>Penulis: {{ berita.penulis?.name || berita.Author?.name || ('Penulis ID: ' + (berita.author_id || berita.AuthorID)) }}</span></span>
                <span class="flex items-center space-x-1"><i class="far fa-calendar"></i> <span>{{ formatDate(berita.created_at || berita.CreatedAt) }}</span></span>
                <span class="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-bold uppercase">Menunggu Review</span>
              </div>
            </div>
          </div>
        </div>

        
        <div v-else class="p-6">

          <div class="prose max-w-none mb-8">
            <h1 class="text-3xl font-extrabold text-gray-900 mb-4">{{ selectedBerita.judul || selectedBerita.Title }}</h1>
            <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-4 border-b border-gray-100">
              <span><strong>Kategori:</strong> {{ selectedBerita.kategori?.name || selectedBerita.Category?.name || 'Umum' }}</span>
              <span><strong>Penulis:</strong> {{ selectedBerita.penulis?.name || selectedBerita.Author?.name || ('Penulis ID: ' + (selectedBerita.author_id || selectedBerita.AuthorID)) }}</span>
              <span><strong>Tgl:</strong> {{ formatDate(selectedBerita.created_at || selectedBerita.CreatedAt) }}</span>
            </div>
            
            <div class="relative w-full rounded-xl overflow-hidden mb-6 bg-gray-100 min-h-[300px] max-h-[500px] flex items-center justify-center group border border-gray-200/50">
              <span v-if="!currentImages || currentImages.length === 0" class="text-gray-400">Tidak ada gambar</span>
              <div v-else class="w-full h-full relative flex items-center justify-center">
                <img :src="currentImages[activeImgIndex]?.image_path || currentImages[activeImgIndex]?.ImagePath" 
                     alt="News Image" 
                     class="max-w-full max-h-[500px] object-contain rounded shadow">
                
                <template v-if="currentImages.length > 1">
                  <button @click="prevImage" 
                          class="absolute left-0 top-0 bottom-0 w-16 bg-transparent hover:bg-black/10 text-white flex items-center justify-center transition-colors z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 stroke-current text-white/70 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button @click="nextImage" 
                          class="absolute right-0 top-0 bottom-0 w-16 bg-transparent hover:bg-black/10 text-white flex items-center justify-center transition-colors z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 stroke-current text-white/70 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  <div class="absolute bottom-4 px-3 py-1 bg-black/60 backdrop-blur-sm text-white rounded-full text-xs font-semibold tracking-wide">
                    {{ activeImgIndex + 1 }} / {{ currentImages.length }}
                  </div>
                </template>
              </div>
            </div>
            <p v-if="currentImages && currentImages[activeImgIndex] && (currentImages[activeImgIndex].image_caption || currentImages[activeImgIndex].ImageCaption)" class="text-center text-sm text-gray-500 italic mt-2">
              {{ currentImages[activeImgIndex].image_caption || currentImages[activeImgIndex].ImageCaption }}
            </p>
            <p v-else-if="selectedBerita.image_caption || selectedBerita.ImageCaption" class="text-center text-sm text-gray-500 italic mt-2">
              {{ selectedBerita.image_caption || selectedBerita.ImageCaption }}
            </p>

            <div class="mt-8 bg-gray-50 p-6 rounded-xl border border-gray-100 article-content" v-html="formatArticleContent(selectedBerita.konten || selectedBerita.Content)"></div>
          </div>

          <div class="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6">
            <h4 class="font-bold text-blue-800 mb-2">Tindakan Editor</h4>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Pesan / Alasan (wajib jika Revisi)</label>
              <textarea v-model="reviewMessage" rows="3" class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border bg-white" placeholder="Masukkan pesan untuk penulis..."></textarea>
            </div>
            <div class="flex gap-3">
              <button @click="submitReview('revision')" class="flex-1 py-2.5 px-4 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded-lg transition-colors" :disabled="isSubmitting">
                <i class="fas fa-undo mr-1"></i> Minta Revisi
              </button>
              <button @click="submitReview('published')" class="flex-1 py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm transition-colors" :disabled="isSubmitting">
                <i class="fas fa-check-circle mr-1"></i> Setujui & Rilis
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    
    <div class="w-full lg:w-1/4 flex flex-col gap-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h4 class="font-bold text-gray-800 mb-4 flex items-center space-x-2">
          <i class="fas fa-bell text-gray-500"></i> <span>Notifikasi</span>
        </h4>
        <div class="space-y-4">
          <div v-for="notif in notifikasiList" :key="notif.ID"
               @click="openNotifikasi(notif.ID)"
               class="flex gap-3 cursor-pointer p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors relative"
               :class="{ 'opacity-70': notif.is_read }">
            <div v-if="!notif.is_read" class="absolute w-2 h-2 bg-blue-500 rounded-full top-3 right-0"></div>
            <div class="mt-1 shrink-0">
              <i class="fas fa-info-circle text-blue-500 text-lg"></i>
            </div>
            <div>
              <p class="text-sm font-bold text-gray-800" :class="{ 'text-gray-600': notif.is_read }">{{ notif.title }}</p>
              <p class="text-xs text-gray-600 mt-0.5 line-clamp-2">{{ notif.message }}</p>
              <span class="text-[10px] text-gray-400 mt-1 block">{{ formatDate(notif.CreatedAt) }}</span>
            </div>
          </div>
          <div v-if="notifikasiList.length === 0" class="text-sm text-gray-500 text-center py-4">
            Belum ada notifikasi
          </div>
        </div>
      </div>
    </div>
  </div>

  
  <div v-if="showProfileModal" class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
    <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-100">
      <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-xl">
        <h3 class="text-xl font-bold text-gray-800 flex items-center space-x-2">
          <i class="fas fa-user-edit text-blue-600"></i>
          <span>Edit Profil Editor</span>
        </h3>
        <button @click="showProfileModal = false" class="text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
      </div>
      
      <form @submit.prevent="handleUpdateProfile" class="p-6 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Foto Profil</label>
          <div class="mt-1.5 flex items-center space-x-4">
            <div class="w-16 h-16 rounded-full overflow-hidden border border-gray-200 bg-gray-50 flex-shrink-0">
              <img :src="profileForm.photo || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User'" alt="Preview" class="w-full h-full object-cover">
            </div>
            <input 
              type="file" 
              accept="image/*" 
              @change="handleProfilePhotoUpload" 
              class="text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border file:border-gray-300 file:text-xs file:font-semibold file:bg-white file:text-gray-700 hover:file:bg-gray-50 cursor-pointer"
            >
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Nama Lengkap</label>
          <input type="text" v-model="profileForm.name" required class="mt-1 w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-blue-500 focus:border-blue-500">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" v-model="profileForm.email" required class="mt-1 w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-blue-500 focus:border-blue-500">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700">Nomor Telepon</label>
          <input type="tel" v-model="profileForm.phone" required class="mt-1 w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-blue-500 focus:border-blue-500">
        </div>
        
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Provinsi</label>
            <v-select 
              v-model="profileSelectedProv" 
              :options="provinces" 
              label="name" 
              placeholder="Pilih Provinsi"
              @update:modelValue="onProfileProvChange"
            ></v-select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Kota/Kabupaten</label>
            <v-select 
              v-model="profileSelectedRegency" 
              :options="profileRegencies" 
              label="name" 
              placeholder="Pilih Kota/Kabupaten"
              :disabled="!profileSelectedProv"
              @update:modelValue="onProfileRegencyChange"
            ></v-select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Kecamatan</label>
            <v-select 
              v-model="profileSelectedDistrict" 
              :options="profileDistricts" 
              label="name" 
              placeholder="Pilih Kecamatan"
              :disabled="!profileSelectedRegency"
              @update:modelValue="onProfileDistrictChange"
            ></v-select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Desa/Kelurahan</label>
            <v-select 
              v-model="profileSelectedVillage" 
              :options="profileVillages" 
              label="name" 
              placeholder="Pilih Desa/Kelurahan"
              :disabled="!profileSelectedDistrict"
              @update:modelValue="onProfileVillageChange"
            ></v-select>
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700">Alamat Lengkap</label>
          <textarea v-model="profileForm.alamat" required rows="2" class="mt-1 w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700">Password Baru <span class="text-gray-400 font-normal text-xs">(Kosongkan jika tidak diganti)</span></label>
          <input type="password" v-model="profileForm.password" class="mt-1 w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Minimal 6 karakter">
        </div>
        
        <div class="pt-4 border-t border-gray-100 flex justify-end space-x-3">
          <button type="button" @click="showProfileModal = false" class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors">Batal</button>
          <button type="submit" :disabled="isSavingProfile" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors disabled:bg-blue-400">
            {{ isSavingProfile ? 'Menyimpan...' : 'Simpan Perubahan' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { sanitizeHTML } from '../utils/sanitize'
import Swal from 'sweetalert2'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

const activeImgIndex = ref(0)

const formatArticleContent = (content: string) => {
  if (!content) return ''
  let sanitized = sanitizeHTML(content)
  // Remove empty paragraphs containing only <br>, &nbsp; or whitespace
  sanitized = sanitized.replace(/<p>\s*(<br\s*\/?>|&nbsp;|\s*)\s*<\/p>/gi, '')
  // Replace 2 or more consecutive <br> with a single <br>
  sanitized = sanitized.replace(/(<br\s*\/?>\s*){2,}/gi, '<br>')
  return sanitized
}

const currentImages = computed(() => {
  return selectedBerita.value ? (selectedBerita.value.images || selectedBerita.value.Images || []) : []
})

const nextImage = () => {
  if (currentImages.value.length > 0) {
    activeImgIndex.value = (activeImgIndex.value + 1) % currentImages.value.length
  }
}

const prevImage = () => {
  if (currentImages.value.length > 0) {
    activeImgIndex.value = (activeImgIndex.value - 1 + currentImages.value.length) % currentImages.value.length
  }
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  const t = new Date(dateStr)
  if (isNaN(t.getTime())) return ''
  
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ]
  
  const pad = (num: number) => String(num).padStart(2, '0')
  
  return `${t.getDate()} ${months[t.getMonth()]} ${t.getFullYear()}, ${pad(t.getHours())}:${pad(t.getMinutes())} WIB`
}

const userData = ref({
  id: null,
  nama: '',
  email: '',
  photo: '',
  avatar: '',
  role: '',
  is_verified: 0
})

const pendingNews = ref<any[]>([])
const selectedBerita = ref<any>(null)
const reviewMessage = ref('')
const isSubmitting = ref(false)
const notifikasiList = ref<any[]>([])

onMounted(async () => {
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
        role: parsed.role || '',
        is_verified: parsed.is_verified || 0
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
            role: u.role,
            is_verified: u.is_verified
          }
          localStorage.setItem('userData', JSON.stringify(json.data))
        }
      }
    } catch (e) {
      console.error(e)
    }
  }
  fetchPendingNews()
  fetchNotifikasi()

  try {
    const res = await fetch('http://localhost:8080/api/v1/wilayah/provinces', { method: 'GET', mode: 'cors' })
    const json = await res.json()
    provinces.value = json.data
  } catch (err) {
    console.error('Error fetching provinces:', err)
  }
})

const fetchPendingNews = async () => {
  const token = localStorage.getItem('token')
  if (!token) return
  try {
    const res = await fetch('http://localhost:8080/api/v1/news/pending', { 
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const json = await res.json()
    if (json.success) {
      pendingNews.value = json.data
    }
  } catch (err) {
    console.error('Error fetching pending news:', err)
  }
}

const fetchNotifikasi = async () => {
  const token = localStorage.getItem('token')
  if (!token) return
  try {
    const res = await fetch('http://localhost:8080/api/v1/notifications', { 
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const json = await res.json()
    if (json.success) {
      notifikasiList.value = json.data
    }
  } catch (err) {}
}

const openNotifikasi = async (id: number) => {
  const notif = notifikasiList.value.find(n => n.ID === id)
  if (notif && !notif.is_read) {
    notif.is_read = true
    const token = localStorage.getItem('token')
    await fetch(`http://localhost:8080/api/v1/notifications/${id}/read`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` }
    })
  }
}

const reviewBerita = (berita: any) => {
  selectedBerita.value = berita
  reviewMessage.value = ''
  activeImgIndex.value = 0
}

const submitReview = async (status: string) => {
  if (status === 'revision' && !reviewMessage.value.trim()) {
    Swal.fire({
      icon: 'warning',
      title: 'Pesan Wajib Diisi',
      text: 'Silakan masukkan alasan revisi untuk penulis.',
      confirmButtonColor: '#3085d6'
    })
    return
  }

  isSubmitting.value = true
  const token = localStorage.getItem('token')
  
  try {
    const res = await fetch(`http://localhost:8080/api/v1/news/${selectedBerita.value.id || selectedBerita.value.ID}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        status: status,
        message: reviewMessage.value
      })
    })

    if (res.ok) {
      Swal.fire({
        icon: 'success',
        title: status === 'published' ? 'Berita Diterbitkan!' : 'Permintaan Revisi Dikirim!',
        text: status === 'published' ? 'Berita telah disetujui dan berhasil dipublikasikan.' : 'Permintaan revisi telah berhasil dikirim ke penulis.',
        confirmButtonColor: '#3085d6'
      })
      selectedBerita.value = null
      fetchPendingNews()
    } else {
      const data = await res.json()
      Swal.fire({
        icon: 'error',
        title: 'Gagal Memperbarui Status',
        text: data.message || 'Terjadi kesalahan.',
        confirmButtonColor: '#d33'
      })
    }
  } catch (err) {
    console.error(err)
    Swal.fire({
      icon: 'error',
      title: 'Kesalahan Server',
      text: 'Gagal menghubungkan ke server.',
      confirmButtonColor: '#d33'
    })
  } finally {
    isSubmitting.value = false
  }
}


const showProfileModal = ref(false)
const isSavingProfile = ref(false)
const profileForm = ref({
  name: '',
  email: '',
  phone: '',
  password: '',
  provinsi: '',
  kota_kab: '',
  kecamatan: '',
  kelurahan: '',
  alamat: '',
  photo: ''
})

const provinces = ref<any[]>([])
const profileSelectedProv = ref<any>(null)
const profileSelectedRegency = ref<any>(null)
const profileSelectedDistrict = ref<any>(null)
const profileSelectedVillage = ref<any>(null)

const profileRegencies = ref<any[]>([])
const profileDistricts = ref<any[]>([])
const profileVillages = ref<any[]>([])

const convertToWebP = (file: File, quality = 0.85): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Failed to get canvas context'))
          return
        }

        let width = img.width
        let height = img.height
        const maxDim = 800
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width)
            width = maxDim
          } else {
            width = Math.round((width * maxDim) / height)
            height = maxDim
          }
        }

        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0, width, height)

        const webpDataUrl = canvas.toDataURL('image/webp', quality)
        resolve(webpDataUrl)
      }
      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = e.target?.result as string
    }
    reader.onerror = () => reject(reader.error || new Error('FileReader error'))
    reader.readAsDataURL(file)
  })
}

const onProfileProvChange = async (val: any) => {
  clearProfileRegencies()
  if (val && val.code) {
    profileForm.value.provinsi = val.name
    try {
      const res = await fetch(`http://localhost:8080/api/v1/wilayah/regencies/${val.code}`)
      const json = await res.json()
      profileRegencies.value = json.data
    } catch (err) {}
  } else {
    profileForm.value.provinsi = ''
  }
}

const onProfileRegencyChange = async (val: any) => {
  clearProfileDistricts()
  if (val && val.code) {
    profileForm.value.kota_kab = val.name
    try {
      const res = await fetch(`http://localhost:8080/api/v1/wilayah/districts/${val.code}`)
      const json = await res.json()
      profileDistricts.value = json.data
    } catch (err) {}
  } else {
    profileForm.value.kota_kab = ''
  }
}

const onProfileDistrictChange = async (val: any) => {
  clearProfileVillages()
  if (val && val.code) {
    profileForm.value.kecamatan = val.name
    try {
      const res = await fetch(`http://localhost:8080/api/v1/wilayah/villages/${val.code}`)
      const json = await res.json()
      profileVillages.value = json.data
    } catch (err) {}
  } else {
    profileForm.value.kecamatan = ''
  }
}

const onProfileVillageChange = (val: any) => {
  if (val && val.name) {
    profileForm.value.kelurahan = val.name
  } else {
    profileForm.value.kelurahan = ''
  }
}

const clearProfileRegencies = () => {
  profileSelectedRegency.value = null
  profileForm.value.kota_kab = ''
  profileRegencies.value = []
  clearProfileDistricts()
}

const clearProfileDistricts = () => {
  profileSelectedDistrict.value = null
  profileForm.value.kecamatan = ''
  profileDistricts.value = []
  clearProfileVillages()
}

const clearProfileVillages = () => {
  profileSelectedVillage.value = null
  profileForm.value.kelurahan = ''
  profileVillages.value = []
}

const openEditProfileModal = async () => {
  const token = localStorage.getItem('token')
  if (!token || !userData.value.id) {
    Swal.fire('Error', 'Sesi tidak valid', 'error')
    return
  }
  
  try {
    const res = await fetch(`http://localhost:8080/api/v1/users/${userData.value.id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const json = await res.json()
    if (json.success) {
      const u = json.data
      profileForm.value = {
        name: u.name || '',
        email: u.email || '',
        phone: u.phone || '',
        password: '',
        provinsi: u.provinsi || '',
        kota_kab: u.kota_kab || '',
        kecamatan: u.kecamatan || '',
        kelurahan: u.kelurahan || '',
        alamat: u.alamat || '',
        photo: u.photo || ''
      }
      

      profileSelectedProv.value = provinces.value.find((p: any) => p.name === u.provinsi) || { name: u.provinsi, code: '' }
      
      if (profileSelectedProv.value && profileSelectedProv.value.code) {
        const regRes = await fetch(`http://localhost:8080/api/v1/wilayah/regencies/${profileSelectedProv.value.code}`)
        const regJson = await regRes.json()
        profileRegencies.value = regJson.data
        profileSelectedRegency.value = profileRegencies.value.find((r: any) => r.name === u.kota_kab) || { name: u.kota_kab, code: '' }
        
        if (profileSelectedRegency.value && profileSelectedRegency.value.code) {
          const distRes = await fetch(`http://localhost:8080/api/v1/wilayah/districts/${profileSelectedRegency.value.code}`)
          const distJson = await distRes.json()
          profileDistricts.value = distJson.data
          profileSelectedDistrict.value = profileDistricts.value.find((d: any) => d.name === u.kecamatan) || { name: u.kecamatan, code: '' }
          
          if (profileSelectedDistrict.value && profileSelectedDistrict.value.code) {
            const vilRes = await fetch(`http://localhost:8080/api/v1/wilayah/villages/${profileSelectedDistrict.value.code}`)
            const vilJson = await vilRes.json()
            profileVillages.value = vilJson.data
            profileSelectedVillage.value = profileVillages.value.find((v: any) => v.name === u.kelurahan) || { name: u.kelurahan, code: '' }
          }
        }
      }
      
      showProfileModal.value = true
    } else {
      Swal.fire('Error', json.message || 'Gagal memuat profil', 'error')
    }
  } catch (err) {
    Swal.fire('Error', 'Gagal menghubungi server', 'error')
  }
}

const handleUpdateProfile = async () => {
  if (profileForm.value.password && profileForm.value.password.length < 6) {
    Swal.fire('Error', 'Password baru minimal 6 karakter!', 'error')
    return
  }
  
  isSavingProfile.value = true
  const token = localStorage.getItem('token')
  try {
    const res = await fetch(`http://localhost:8080/api/v1/users/${userData.value.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: profileForm.value.name,
        email: profileForm.value.email,
        phone: profileForm.value.phone,
        password: profileForm.value.password || undefined,
        provinsi: profileForm.value.provinsi,
        kota_kab: profileForm.value.kota_kab,
        kecamatan: profileForm.value.kecamatan,
        kelurahan: profileForm.value.kelurahan,
        alamat: profileForm.value.alamat,
        photo: profileForm.value.photo
      })
    })
    
    const json = await res.json()
    if (json.success) {
      const updatedUser = {
        ...userData.value,
        name: profileForm.value.name,
        nama: profileForm.value.name,
        email: profileForm.value.email,
        photo: profileForm.value.photo
      }
      localStorage.setItem('userData', JSON.stringify(updatedUser))
      userData.value = updatedUser
      
      window.dispatchEvent(new Event('auth-change'))
      
      Swal.fire({
        icon: 'success',
        title: 'Profil Diperbarui',
        text: 'Profil Anda telah berhasil diperbarui.',
        confirmButtonColor: '#2563eb'
      })
      showProfileModal.value = false
    } else {
      Swal.fire('Gagal', json.message || 'Gagal memperbarui profil', 'error')
    }
  } catch (err) {
    Swal.fire('Error', 'Koneksi ke server terputus', 'error')
  } finally {
    isSavingProfile.value = false
  }
}

const handleProfilePhotoUpload = async (e: Event) => {
  const input = e.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    const allowedMime = ['image/jpeg', 'image/png', 'image/webp']
    const maxBytes = 5 * 1024 * 1024 // 5 MB

    if (!allowedMime.includes(file.type)) {
      Swal.fire('Format Tidak Didukung', 'Foto profil harus berupa JPG, PNG, atau WEBP.', 'error')
      return
    }
    if (file.size > maxBytes) {
      Swal.fire('Berkas Terlalu Besar', 'Ukuran foto profil maksimal adalah 5 MB.', 'error')
      return
    }
    try {
      const webpData = await convertToWebP(file, 0.85)
      profileForm.value.photo = webpData
    } catch (err) {
      console.error('Failed to convert profile photo to WebP:', err)
    }
  }
}
</script>

<style scoped>
.article-content :deep(p) {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}
.article-content :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
