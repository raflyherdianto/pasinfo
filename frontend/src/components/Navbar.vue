<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

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

const router = useRouter()
const isLoggedIn = ref(false)
const userData = ref<any>({})
const userRole = ref('')
const showDropdown = ref(false)
const showMobileMenu = ref(false)
const searchQuery = ref('')
const searchResults = ref<any[]>([])
const showSearchResults = ref(false)
const isSearching = ref(false)
let searchTimeout: any = null
const isScrolled = ref(false)

const updateAuthStatus = () => {
  isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true'
  userData.value = JSON.parse(localStorage.getItem('userData') || '{}')
  userRole.value = userData.value.role || ''
  if (isLoggedIn.value) {
    fetchNotifications()
  }
}

const notifications = ref<any[]>([])
const showNotifDropdown = ref(false)
const unreadCount = computed(() => notifications.value.filter(n => !n.is_read && !n.IsRead).length)

const fetchNotifications = async () => {
  const token = localStorage.getItem('token')
  if (!token) return
  try {
    const res = await fetch('http://localhost:8080/api/v1/notifications', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const json = await res.json()
    if (json.success && json.data) {
      notifications.value = json.data
    }
  } catch (err) {}
}

const toggleNotifDropdown = () => {
  showNotifDropdown.value = !showNotifDropdown.value
  if (showNotifDropdown.value) showDropdown.value = false
}

const markAsRead = async (id: number) => {
  const notif = notifications.value.find(n => (n.id || n.ID) === id)
  if (notif && !notif.is_read && !notif.IsRead) {
    notif.is_read = true
    notif.IsRead = true
    window.dispatchEvent(new CustomEvent('notification-read', { detail: { id } }))
    const token = localStorage.getItem('token')
    await fetch(`http://localhost:8080/api/v1/notifications/${id}/read`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` }
    })
  }
}

const handleNotificationReadEvent = (e: any) => {
  const notifId = e.detail?.id
  if (notifId) {
    const notif = notifications.value.find(n => (n.id || n.ID) === notifId)
    if (notif) {
      notif.is_read = true
      notif.IsRead = true
    }
  } else {
    fetchNotifications()
  }
}

const categories = ref<any[]>([])
const setCategories = (items: any[]) => {
  categories.value = items.filter((category) => {
    const slug = String(category?.slug || category?.name || '').toLowerCase()
    return slug !== 'wisata'
  })
}
const navContainer = ref<HTMLElement | null>(null)
let isDown = false
let startX = 0
let scrollLeft = 0
let isDragging = false

const scrollNav = (direction: 'left' | 'right') => {
  if (navContainer.value) {
    const scrollAmount = 150
    navContainer.value.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
  }
}

const startDrag = (e: MouseEvent) => {
  if (!navContainer.value) return
  isDown = true
  isDragging = false
  startX = e.pageX - navContainer.value.offsetLeft
  scrollLeft = navContainer.value.scrollLeft
}

const stopDrag = () => {
  isDown = false
}

const onDrag = (e: MouseEvent) => {
  if (!isDown || !navContainer.value) return
  e.preventDefault()
  const x = e.pageX - navContainer.value.offsetLeft
  const walk = (x - startX) * 1.5
  if (Math.abs(walk) > 5) {
    isDragging = true
  }
  navContainer.value.scrollLeft = scrollLeft - walk
}

const preventClickIfDragging = (e: MouseEvent) => {
  if (isDragging) {
    e.preventDefault()
    e.stopPropagation()

    setTimeout(() => {
      isDragging = false
    }, 50)
  }
}


const fetchCategories = async () => {
  try {
    const res = await fetch('http://localhost:8080/api/v1/categories')
    const json = await res.json()
    if (json.success && json.data) {
      setCategories(json.data)
    } else {
      setCategories(json.data || [])
    }
  } catch (err) {
    setCategories([
      { name: 'Nasional', slug: 'nasional' },
      { name: 'Lokal', slug: 'lokal' },
      { name: 'Politik', slug: 'politik' },
      { name: 'Ekonomi', slug: 'ekonomi' },
      { name: 'Olahraga', slug: 'olahraga' },
      { name: 'Teknologi', slug: 'teknologi' },
      { name: 'Hiburan', slug: 'hiburan' },
      { name: 'Kesehatan', slug: 'kesehatan' },
      { name: 'Inspiratif', slug: 'inspiratif' }
    ])
  }
}

onMounted(() => {
  updateAuthStatus()
  fetchCategories()
  document.addEventListener('click', closeDropdown)
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('auth-change', updateAuthStatus)
  window.addEventListener('notification-read', handleNotificationReadEvent)
  window.addEventListener('notifications-updated', fetchNotifications)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('auth-change', updateAuthStatus)
  window.removeEventListener('notification-read', handleNotificationReadEvent)
  window.removeEventListener('notifications-updated', fetchNotifications)
})

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

const closeDropdown = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('.user-dropdown')) {
    showDropdown.value = false
  }
  if (!target.closest('.notif-dropdown')) {
    showNotifDropdown.value = false
  }
  if (!target.closest('.search-dropdown-container')) {
    showSearchResults.value = false
  }
}

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
  if (showDropdown.value) showNotifDropdown.value = false
}
const toggleMobileMenu = () => showMobileMenu.value = !showMobileMenu.value

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('userData')
  localStorage.removeItem('userRole')
  localStorage.removeItem('userEmail')
  isLoggedIn.value = false
  showDropdown.value = false
  window.dispatchEvent(new Event('auth-change'))
  router.push('/login')
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: 'search', query: { q: searchQuery.value.trim() } })
    showMobileMenu.value = false
    showSearchResults.value = false
  }
}

const onSearchInput = () => {
  showSearchResults.value = true
  if (!searchQuery.value.trim()) {
    searchResults.value = []
    return
  }
  isSearching.value = true
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/v1/news?q=${encodeURIComponent(searchQuery.value)}`)
      const json = await res.json()
      if (json.success && json.data) {
        searchResults.value = json.data.slice(0, 5)
      } else {
        searchResults.value = []
      }
    } catch (e) {
      console.error(e)
    } finally {
      isSearching.value = false
    }
  }, 300)
}

const createSlug = (text: string) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

const goToNews = (id: number, judul: string) => {
  showSearchResults.value = false
  showMobileMenu.value = false
  router.push({ name: 'berita', params: { id, slug: createSlug(judul) } })
}
</script>

<template>
  <header :class="['fixed w-full top-0 z-50 transition-all duration-300 backdrop-blur-md', isScrolled ? 'bg-white/90 shadow-sm py-2' : 'bg-white py-4']">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center">
        
        <div class="flex items-center cursor-pointer" @click="router.push('/')">
          <img src="/logo.webp" alt="Pasuruan Info Logo" class="h-14 w-auto object-contain" />
        </div>

        
        <div class="hidden md:flex items-center relative flex-grow max-w-[280px] lg:max-w-[420px] mx-4 group/nav select-none">
          
          <button 
            @click="scrollNav('left')" 
            class="absolute -left-3 bg-white/95 border border-gray-100 hover:bg-gray-50 text-gray-600 rounded-full p-1.5 shadow-md z-10 transition opacity-0 group-hover/nav:opacity-100 focus:outline-none cursor-pointer"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
          </button>

          
          <nav 
            ref="navContainer"
            @mousedown="startDrag"
            @mouseleave="stopDrag"
            @mouseup="stopDrag"
            @mousemove="onDrag"
            @click.capture="preventClickIfDragging"
            class="flex items-center space-x-6 overflow-x-auto scrollbar-none scroll-smooth w-full py-1 cursor-grab active:cursor-grabbing"
            style="-ms-overflow-style: none; scrollbar-width: none;"
          >
            <router-link 
              to="/" 
              class="text-sm font-bold text-gray-500 hover:text-blue-600 transition shrink-0 tracking-wider"
              active-class="text-blue-600"
            >
              TERBARU
            </router-link>
            <router-link 
              v-for="cat in categories" 
              :key="cat.id || cat.slug"
              :to="`/kategori?type=${cat.slug}`" 
              class="text-sm font-bold text-gray-500 hover:text-blue-600 transition shrink-0 uppercase tracking-wider"
              :class="{ 'text-blue-600': $route.query.type === cat.slug }"
            >
              {{ cat.name }}
            </router-link>
            <router-link 
              to="/wisata"
              class="text-sm font-bold text-gray-500 hover:text-blue-600 transition shrink-0 uppercase tracking-wider"
              active-class="text-blue-600"
            >
              WISATA
            </router-link>
            <router-link 
              to="/#pasinfo-jelajah"
              class="text-sm font-bold text-gray-500 hover:text-blue-600 transition shrink-0 uppercase tracking-wider"
              active-class="text-blue-600"
            >
              JELAJAH
            </router-link>
          </nav>

          
          <button 
            @click="scrollNav('right')" 
            class="absolute -right-3 bg-white/95 border border-gray-100 hover:bg-gray-50 text-gray-600 rounded-full p-1.5 shadow-md z-10 transition opacity-0 group-hover/nav:opacity-100 focus:outline-none cursor-pointer"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>

        
        <div class="hidden md:flex items-center space-x-6">
          <div class="relative group search-dropdown-container">
            <input 
              v-model="searchQuery" 
              @input="onSearchInput"
              @keyup.enter="handleSearch"
              @focus="showSearchResults = true"
              type="text" 
              placeholder="Cari..." 
              class="w-48 bg-gray-100 text-base rounded-full pl-11 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 focus:w-64"
            />
            <svg class="w-5 h-5 text-gray-400 absolute left-4 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            
            <div v-if="showSearchResults && searchQuery" class="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100 max-h-96 overflow-y-auto">
               <div v-if="isSearching" class="px-4 py-3 text-sm text-gray-500 text-center">Mencari...</div>
               <div v-else-if="searchResults.length === 0" class="px-4 py-3 text-sm text-gray-500 text-center">Tidak ada hasil</div>
               <div v-else>
                  <div v-for="item in searchResults" :key="item.id" @click="goToNews(item.id, item.judul)" class="px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer flex gap-3">
                     <img :src="item.images && item.images.length ? item.images[0] : '/images/themes/photo.jpg'" class="w-12 h-12 object-cover rounded-md flex-shrink-0" />
                     <div>
                       <p class="text-sm font-semibold text-gray-900 line-clamp-2">{{ item.judul }}</p>
                       <p class="text-[10px] text-gray-500 mt-1">{{ item.waktu }}</p>
                     </div>
                  </div>
                  <div class="px-4 py-2 border-t border-gray-100 bg-gray-50 text-center">
                    <button @click="handleSearch" class="text-xs text-blue-600 font-semibold hover:underline">Lihat semua hasil (Enter)</button>
                  </div>
               </div>
            </div>
          </div>

          <div v-if="!isLoggedIn">
            <button @click="router.push('/login')" class="bg-gray-900 text-white text-base font-semibold px-6 py-2.5 rounded-full hover:bg-gray-800 transition">
              Masuk
            </button>
          </div>
          
          <div v-else class="flex items-center space-x-4">
            
            <div class="relative notif-dropdown">
              <button @click="toggleNotifDropdown" class="text-gray-500 hover:text-gray-700 focus:outline-none relative mt-1">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                <span v-if="unreadCount > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">{{ unreadCount }}</span>
              </button>
              <div v-if="showNotifDropdown" class="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl py-2 z-10 border border-gray-100 max-h-96 overflow-y-auto">
                <div class="px-4 py-2 border-b border-gray-100 font-bold text-gray-800">Notifikasi</div>
                <div v-if="notifications.length === 0" class="px-4 py-4 text-center text-sm text-gray-500">Belum ada notifikasi</div>
                <div v-for="notif in notifications" :key="notif.id || notif.ID" @click="markAsRead(notif.id || notif.ID)" class="px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer" :class="{ 'bg-blue-50/70': !notif.is_read && !notif.IsRead }">
                  <p class="text-sm font-semibold text-gray-900">{{ notif.title || notif.Title }}</p>
                  <p class="text-xs text-gray-600 mt-1">{{ notif.message || notif.Message }}</p>
                  <p class="text-[10px] text-gray-400 mt-1">{{ formatDate(notif.created_at || notif.CreatedAt) }}</p>
                </div>
              </div>
            </div>

            
            <div class="relative user-dropdown">
              <button @click="toggleDropdown" class="flex items-center space-x-2 focus:outline-none">
                <img :src="userData.photo || userData.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + (userData.nama || userData.name || 'User')" alt="Avatar" class="h-10 w-10 rounded-full border-2 border-gray-200" />
              </button>
            <div v-if="showDropdown" class="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl py-2 z-10 border border-gray-100">
              <div class="px-4 py-3 border-b border-gray-100">
                <p class="text-base font-semibold text-gray-900">{{ userData.nama || 'User' }}</p>
                <p class="text-sm text-gray-500 truncate">{{ userData.email || '' }}</p>
              </div>
              <button @click="router.push(`/dashboard-${userRole}`)" class="flex items-center w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-gray-50 transition">
                Dashboard
              </button>
              <button @click="logout" class="flex items-center w-full text-left px-4 py-2 text-base text-red-600 hover:bg-red-50 transition">
                Keluar
              </button>
            </div>
            </div>
          </div>
        </div>

        
        <button @click="toggleMobileMenu" class="md:hidden p-2 text-gray-600 focus:outline-none">
          <svg v-if="!showMobileMenu" class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          <svg v-else class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
    </div>



    
    <div v-if="showMobileMenu" class="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg">
      <div class="px-4 pt-4 pb-6 space-y-4">
        <div class="relative search-dropdown-container">
          <input 
            v-model="searchQuery" 
            @input="onSearchInput"
            @keyup.enter="handleSearch"
            @focus="showSearchResults = true"
            type="text" 
            placeholder="Cari berita..." 
            class="w-full bg-gray-100 text-base rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg class="w-5 h-5 text-gray-400 absolute left-4 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          
          <div v-if="showSearchResults && searchQuery" class="absolute w-full mt-2 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100 max-h-80 overflow-y-auto">
               <div v-if="isSearching" class="px-4 py-3 text-sm text-gray-500 text-center">Mencari...</div>
               <div v-else-if="searchResults.length === 0" class="px-4 py-3 text-sm text-gray-500 text-center">Tidak ada hasil</div>
               <div v-else>
                  <div v-for="item in searchResults" :key="item.id" @click="goToNews(item.id, item.judul)" class="px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer flex gap-3">
                     <img :src="item.images && item.images.length ? item.images[0] : '/images/themes/photo.jpg'" class="w-12 h-12 object-cover rounded-md flex-shrink-0" />
                     <div>
                       <p class="text-sm font-semibold text-gray-900 line-clamp-2">{{ item.judul }}</p>
                       <p class="text-[10px] text-gray-500 mt-1">{{ item.waktu }}</p>
                     </div>
                  </div>
                  <div class="px-4 py-2 border-t border-gray-100 bg-gray-50 text-center">
                    <button @click="handleSearch" class="text-xs text-blue-600 font-semibold hover:underline">Lihat semua hasil</button>
                  </div>
               </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-2 pb-4">
          <router-link 
            @click="showMobileMenu = false"
            to="/" 
            class="px-4 py-2.5 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-700 rounded-xl text-center text-sm font-semibold uppercase"
          >
            Terbaru
          </router-link>
          <router-link 
            v-for="cat in categories"
            :key="cat.id || cat.slug"
            @click="showMobileMenu = false"
            :to="`/kategori?type=${cat.slug}`" 
            class="px-4 py-2.5 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-700 rounded-xl text-center text-sm font-semibold uppercase"
            :class="{ 'bg-blue-50 text-blue-600': $route.query.type === cat.slug }"
          >
            {{ cat.name }}
          </router-link>
          <router-link 
            @click="showMobileMenu = false"
            to="/wisata"
            class="px-4 py-2.5 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-700 rounded-xl text-center text-sm font-semibold uppercase"
          >
            Wisata
          </router-link>
          <router-link 
            @click="showMobileMenu = false"
            to="/#pasinfo-jelajah"
            class="px-4 py-2.5 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-700 rounded-xl text-center text-sm font-semibold uppercase"
          >
            Jelajah
          </router-link>
        </div>
        <div class="pt-4 border-t border-gray-100">
          <button v-if="!isLoggedIn" @click="router.push('/login'); showMobileMenu = false" class="w-full bg-blue-600 text-white text-center text-lg font-semibold py-3 rounded-lg">
            Masuk / Daftar
          </button>
          <div v-else class="space-y-4">
            <div class="flex items-center space-x-3 mb-4">
              <img :src="userData.photo || userData.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + (userData.nama || userData.name || 'User')" alt="Avatar" class="h-12 w-12 rounded-full border border-gray-200" />
              <div>
                <p class="text-base font-bold text-gray-900">{{ userData.nama || 'User' }}</p>
                <p class="text-sm text-gray-500">{{ userData.email || '' }}</p>
              </div>
            </div>
            <button @click="router.push(`/dashboard-${userRole}`); showMobileMenu = false" class="w-full text-left text-lg font-semibold text-gray-700 py-2">Dashboard</button>
            <button @click="logout" class="w-full text-left text-lg font-semibold text-red-600 py-2">Keluar</button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
