<template>
  <div class="min-h-screen bg-gray-50/50 py-8 font-sans">
    <main class="container mx-auto px-4 max-w-7xl">
      
      <div class="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center space-x-3">
            <span>Dashboard Admin Pasinfo</span>
          </h1>
          <p class="mt-2 text-gray-600">Portal manajemen konten, kategori, destinasi wisata, iklan, dan pengguna sistem</p>
        </div>
        <div class="flex items-center gap-3">
          <button 
            v-if="activeSection === 'users'"
            @click="openUserCreateModal" 
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center space-x-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
            </svg>
            <span>Tambah Pengguna</span>
          </button>
          <button 
            v-if="activeSection === 'categories'"
            @click="openCategoryCreateModal" 
            class="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center space-x-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>Tambah Kategori</span>
          </button>
          <button 
            v-if="activeSection === 'wisata'"
            @click="openWisataCreateModal" 
            class="bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2.5 px-5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center space-x-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>Tambah Wisata</span>
          </button>
          <button 
            v-if="activeSection === 'iklan'"
            @click="openIklanCreateModal" 
            class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center space-x-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>Tambah Iklan</span>
          </button>
        </div>
      </div>

      
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-sm p-6 text-white flex items-center justify-between">
          <div>
            <p class="text-white/80 text-sm font-semibold uppercase tracking-wider mb-1">Total Pengguna</p>
            <h3 class="text-3xl font-extrabold">{{ stats.users }}</h3>
          </div>
          <div class="text-4xl opacity-30">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
          </div>
        </div>

        <div class="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-sm p-6 text-white flex items-center justify-between">
          <div>
            <p class="text-white/80 text-sm font-semibold uppercase tracking-wider mb-1">Total Kategori</p>
            <h3 class="text-3xl font-extrabold">{{ stats.categories }}</h3>
          </div>
          <div class="text-4xl opacity-30">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
        </div>

        <div class="bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl shadow-sm p-6 text-white flex items-center justify-between">
          <div>
            <p class="text-white/80 text-sm font-semibold uppercase tracking-wider mb-1">Total Artikel</p>
            <h3 class="text-3xl font-extrabold">{{ stats.news }}</h3>
          </div>
          <div class="text-4xl opacity-30">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
            </svg>
          </div>
        </div>

        <div class="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl shadow-sm p-6 text-white flex items-center justify-between">
          <div>
            <p class="text-white/80 text-sm font-semibold uppercase tracking-wider mb-1">Total Views</p>
            <h3 class="text-3xl font-extrabold">{{ totalViews }}</h3>
          </div>
          <div class="text-4xl opacity-30">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
          </div>
        </div>
      </div>

      
      <div v-if="mostReadNews" class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div class="flex items-start gap-4">
          <div class="bg-amber-50 text-amber-600 p-3 rounded-xl flex-shrink-0">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
            </svg>
          </div>
          <div>
            <span class="px-2.5 py-0.5 text-xs font-bold bg-amber-100 text-amber-800 rounded-full">Berita Paling Banyak Dibaca</span>
            <h4 class="text-lg font-bold text-gray-900 mt-1.5 truncate max-w-xl" :title="mostReadNews.judul">{{ mostReadNews.judul }}</h4>
            <p class="text-sm text-gray-500 mt-0.5">Penulis: {{ mostReadNews.penulis }} | Kategori: {{ mostReadNews.kategori }}</p>
          </div>
        </div>
        <div class="flex items-center gap-6 flex-shrink-0 bg-gray-50 px-5 py-3 rounded-xl border border-gray-100 self-start md:self-auto">
          <div class="text-center">
            <p class="text-xs text-gray-400 font-semibold uppercase tracking-wider">Total Views</p>
            <p class="text-2xl font-black text-gray-800 mt-0.5">{{ mostReadNews.views || 0 }}</p>
          </div>
          <router-link :to="{ name: 'berita', params: { id: mostReadNews.id } }" class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-sm shadow-sm transition">
            Baca Berita
          </router-link>
        </div>
      </div>

      
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="sec in sections"
            :key="sec.id"
            @click="activeSection = sec.id"
            class="px-5 py-3 rounded-xl font-bold transition-all flex items-center space-x-2"
            :class="[
              activeSection === sec.id
                ? 'bg-blue-50 text-blue-600 border border-blue-100 shadow-sm'
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50 border border-transparent'
            ]"
          >
            <i class="fas" :class="sec.icon"></i>
            <span>{{ sec.label }}</span>
          </button>
        </div>
      </div>

      
      <div v-if="loading" class="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
        <div class="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-gray-500 font-medium">Memuat data dari server...</p>
      </div>

      
      <div v-else-if="activeSection === 'users'" class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        
        <div class="border-b border-gray-100 bg-gray-50/50 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div class="flex gap-2 bg-gray-200/50 p-1 rounded-xl">
            <button
              v-for="role in ['member', 'penulis', 'editor', 'admin']"
              :key="role"
              @click="activeUserTab = role; fetchUsers()"
              class="px-4 py-2 rounded-lg font-bold text-xs capitalize transition-all"
              :class="activeUserTab === role ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-800'"
            >
              {{ role }}
            </button>
          </div>
          <div class="flex items-center gap-2 w-full sm:w-auto">
            <div class="relative w-full sm:w-64">
              <span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input 
                v-model="userSearchQuery"
                type="text" 
                placeholder="Cari pengguna..."
                class="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-100">
            <thead class="bg-gray-50">
              <tr>
                <th @click="sortUsers('name')" class="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 transition">
                  <div class="flex items-center space-x-1.5">
                    <span>Nama</span>
                    <span v-if="userSortKey === 'name'">
                      <svg v-if="userSortOrder === 'asc'" class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"></path></svg>
                      <svg v-else class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
                    </span>
                    <span v-else class="opacity-30">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
                    </span>
                  </div>
                </th>
                <th @click="sortUsers('email')" class="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 transition">
                  <div class="flex items-center space-x-1.5">
                    <span>Email</span>
                    <span v-if="userSortKey === 'email'">
                      <svg v-if="userSortOrder === 'asc'" class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"></path></svg>
                      <svg v-else class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
                    </span>
                    <span v-else class="opacity-30">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
                    </span>
                  </div>
                </th>
                <th @click="sortUsers('lokasi')" class="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 transition">
                  <div class="flex items-center space-x-1.5">
                    <span>Lokasi</span>
                    <span v-if="userSortKey === 'lokasi'">
                      <svg v-if="userSortOrder === 'asc'" class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"></path></svg>
                      <svg v-else class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
                    </span>
                    <span v-else class="opacity-30">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
                    </span>
                  </div>
                </th>
                <th @click="sortUsers('is_verified')" class="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 transition">
                  <div class="flex items-center space-x-1.5">
                    <span>Status</span>
                    <span v-if="userSortKey === 'is_verified'">
                      <svg v-if="userSortOrder === 'asc'" class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"></path></svg>
                      <svg v-else class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
                    </span>
                    <span v-else class="opacity-30">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
                    </span>
                  </div>
                </th>
                <th class="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-50">
              <tr v-for="u in filteredUsers" :key="u.id" class="hover:bg-gray-50/50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center space-x-3">
                    <img 
                      :src="u.photo || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + u.name" 
                      alt="Avatar" 
                      class="w-9 h-9 rounded-full object-cover border"
                    />
                    <div class="text-sm font-semibold text-gray-900 truncate max-w-[200px]" :title="u.name">{{ u.name }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ u.email }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatLokasi(u) }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span 
                    class="px-2.5 py-1 text-xs font-bold rounded-full uppercase"
                    :class="u.is_verified ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-amber-50 text-amber-700 border border-amber-100'"
                  >
                    {{ u.is_verified ? 'Verified' : 'Unverified' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold space-x-1">
                  
                  <button @click="openUserEditModal(u)" class="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg inline-flex items-center transition" title="Edit Pengguna">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button @click="deleteUser(u.id)" class="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg inline-flex items-center transition" title="Hapus Pengguna">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </td>
              </tr>
              <tr v-if="filteredUsers.length === 0">
                <td colspan="5" class="px-6 py-12 text-center text-gray-400">Tidak ada data pengguna</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      
      <div v-else-if="activeSection === 'categories'" class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="border-b border-gray-100 bg-gray-50/50 px-6 py-4 flex justify-between items-center">
          <h4 class="font-bold text-gray-800 text-base">Daftar Kategori</h4>
          <div class="flex items-center gap-2">
            <div class="relative w-64">
              <span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input 
                v-model="categorySearchQuery"
                type="text" 
                placeholder="Cari kategori..."
                class="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-100">
            <thead class="bg-gray-50">
              <tr>
                <th @click="sortCategories('name')" class="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 transition">
                  <div class="flex items-center space-x-1.5">
                    <span>Nama Kategori</span>
                    <span v-if="categorySortKey === 'name'">
                      <svg v-if="categorySortOrder === 'asc'" class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"></path></svg>
                      <svg v-else class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
                    </span>
                    <span v-else class="opacity-30">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
                    </span>
                  </div>
                </th>
                <th @click="sortCategories('slug')" class="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 transition">
                  <div class="flex items-center space-x-1.5">
                    <span>Slug</span>
                    <span v-if="categorySortKey === 'slug'">
                      <svg v-if="categorySortOrder === 'asc'" class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"></path></svg>
                      <svg v-else class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
                    </span>
                    <span v-else class="opacity-30">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
                    </span>
                  </div>
                </th>
                <th class="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-50">
              <tr v-for="cat in filteredCategories" :key="cat.ID" class="hover:bg-gray-50/50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 truncate max-w-[200px]" :title="cat.name">{{ cat.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ cat.slug }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold space-x-1">
                  
                  <button @click="openCategoryEditModal(cat)" class="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg inline-flex items-center transition" title="Edit Kategori">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button @click="deleteCategory(cat.ID)" class="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg inline-flex items-center transition" title="Hapus Kategori">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </td>
              </tr>
              <tr v-if="filteredCategories.length === 0">
                <td colspan="3" class="px-6 py-12 text-center text-gray-400">Tidak ada kategori</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      
      <div v-else-if="activeSection === 'news'" class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="border-b border-gray-100 bg-gray-50/50 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h4 class="font-bold text-gray-800 text-base">Seluruh Berita / Artikel</h4>
          <div class="flex items-center gap-2 w-full sm:w-auto">
            <div class="relative w-full sm:w-64">
              
              <span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input 
                v-model="newsSearchQuery"
                type="text" 
                placeholder="Cari berita..."
                class="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-100">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Judul Berita</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Kategori</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Penulis</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Views</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Diperbarui</th>
                <th class="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-50">
              <tr v-for="item in filteredNews" :key="item.id" class="hover:bg-gray-50/50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                  <span class="block truncate max-w-[280px]" :title="item.judul">
                    {{ item.judul }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.kategori }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.penulis }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">{{ item.views || 0 }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <span 
                    class="px-2.5 py-1 text-xs font-bold rounded-full uppercase border flex items-center w-fit gap-1"
                    :style="statusConfig[item.status] ? { color: statusConfig[item.status].color, borderColor: statusConfig[item.status].color, backgroundColor: statusConfig[item.status].color + '10' } : {}"
                  >
                    <i class="fas" :class="statusConfig[item.status]?.icon || 'fa-question-circle'"></i>
                    <span>{{ statusConfig[item.status]?.label || item.status }}</span>
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                  {{ item.waktu_update || item.waktu }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold space-x-1">
                  <router-link :to="{ name: 'berita', params: { id: item.id } }" class="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg inline-flex items-center transition" title="Lihat Detail Berita">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </router-link>
                  <button @click="deleteNewsItem(item.id)" class="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg inline-flex items-center transition" title="Hapus Berita">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </td>
              </tr>
              <tr v-if="filteredNews.length === 0">
                <td colspan="7" class="px-6 py-12 text-center text-gray-400">Tidak ada artikel berita</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      
      <div v-else-if="activeSection === 'wisata'" class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in duration-200">
        <div class="border-b border-gray-100 bg-gray-50/50 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h4 class="font-bold text-gray-800 text-base">Manajemen Destinasi Wisata</h4>
          <div class="relative w-full sm:w-64">
            <span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </span>
            <input 
              v-model="wisataSearchQuery"
              type="text" 
              placeholder="Cari destinasi..."
              class="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-100">
            <thead class="bg-gray-50">
              <tr>
                <th @click="sortWisata('name')" class="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 transition">
                  <div class="flex items-center space-x-1.5">
                    <span>Nama Tempat</span>
                    <span v-if="wisataSortKey === 'name'">
                      <svg v-if="wisataSortOrder === 'asc'" class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"></path></svg>
                      <svg v-else class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
                    </span>
                    <span v-else class="opacity-30">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
                    </span>
                  </div>
                </th>
                <th @click="sortWisata('category')" class="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 transition">
                  <div class="flex items-center space-x-1.5">
                    <span>Kategori</span>
                    <span v-if="wisataSortKey === 'category'">
                      <svg v-if="wisataSortOrder === 'asc'" class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"></path></svg>
                      <svg v-else class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
                    </span>
                    <span v-else class="opacity-30">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
                    </span>
                  </div>
                </th>
                <th @click="sortWisata('location')" class="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 transition">
                  <div class="flex items-center space-x-1.5">
                    <span>Kecamatan</span>
                    <span v-if="wisataSortKey === 'location'">
                      <svg v-if="wisataSortOrder === 'asc'" class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"></path></svg>
                      <svg v-else class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
                    </span>
                    <span v-else class="opacity-30">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
                    </span>
                  </div>
                </th>
                <th @click="sortWisata('jam')" class="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 transition">
                  <div class="flex items-center space-x-1.5">
                    <span>Jam Buka</span>
                    <span v-if="wisataSortKey === 'jam'">
                      <svg v-if="wisataSortOrder === 'asc'" class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"></path></svg>
                      <svg v-else class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
                    </span>
                    <span v-else class="opacity-30">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
                    </span>
                  </div>
                </th>
                <th @click="sortWisata('ticket')" class="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 transition">
                  <div class="flex items-center space-x-1.5">
                    <span>Harga Tiket</span>
                    <span v-if="wisataSortKey === 'ticket'">
                      <svg v-if="wisataSortOrder === 'asc'" class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"></path></svg>
                      <svg v-else class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
                    </span>
                    <span v-else class="opacity-30">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
                    </span>
                  </div>
                </th>
                <th class="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-50">
              <tr v-for="w in filteredWisata" :key="w.id" class="hover:bg-gray-50/50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 truncate max-w-[200px]" :title="w.name">{{ w.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ w.category }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ w.location }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ w.jam }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">{{ w.ticket }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold space-x-1">
                  <button @click="openWisataEditModal(w)" class="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg inline-flex items-center transition" title="Edit Wisata">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button @click="deleteWisata(w.id)" class="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg inline-flex items-center transition" title="Hapus Wisata">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </td>
              </tr>
              <tr v-if="filteredWisata.length === 0">
                <td colspan="6" class="px-6 py-12 text-center text-gray-400">Tidak ada destinasi wisata</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      
      <div v-else-if="activeSection === 'iklan'" class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in duration-200">
        <div class="border-b border-gray-100 bg-gray-50/50 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h4 class="font-bold text-gray-800 text-base">Manajemen Penempatan Iklan</h4>
          <div class="relative w-full sm:w-64">
            <span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </span>
            <input 
              v-model="iklanSearchQuery"
              type="text" 
              placeholder="Cari iklan..."
              class="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-100">
            <thead class="bg-gray-50">
              <tr>
                <th @click="sortIklan('name')" class="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 transition">
                  <div class="flex items-center space-x-1.5">
                    <span>Nama Iklan</span>
                    <span v-if="iklanSortKey === 'name'">
                      <svg v-if="iklanSortOrder === 'asc'" class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"></path></svg>
                      <svg v-else class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
                    </span>
                    <span v-else class="opacity-30">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
                    </span>
                  </div>
                </th>
                <th @click="sortIklan('slot')" class="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 transition">
                  <div class="flex items-center space-x-1.5">
                    <span>Slot Penempatan</span>
                    <span v-if="iklanSortKey === 'slot'">
                      <svg v-if="iklanSortOrder === 'asc'" class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"></path></svg>
                      <svg v-else class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
                    </span>
                    <span v-else class="opacity-30">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
                    </span>
                  </div>
                </th>
                <th @click="sortIklan('url')" class="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 transition">
                  <div class="flex items-center space-x-1.5">
                    <span>Redirect Link</span>
                    <span v-if="iklanSortKey === 'url'">
                      <svg v-if="iklanSortOrder === 'asc'" class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"></path></svg>
                      <svg v-else class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
                    </span>
                    <span v-else class="opacity-30">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
                    </span>
                  </div>
                </th>
                <th @click="sortIklan('status')" class="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 transition">
                  <div class="flex items-center space-x-1.5">
                    <span>Status</span>
                    <span v-if="iklanSortKey === 'status'">
                      <svg v-if="iklanSortOrder === 'asc'" class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"></path></svg>
                      <svg v-else class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
                    </span>
                    <span v-else class="opacity-30">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
                    </span>
                  </div>
                </th>
                <th class="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-50">
              <tr v-for="ad in filteredIklan" :key="ad.id" class="hover:bg-gray-50/50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 truncate max-w-[200px]" :title="ad.name">
                  <div class="flex items-center space-x-3">
                    <img :src="ad.image" class="w-10 h-7 rounded object-cover border" alt="Ad Preview" />
                    <span>{{ ad.name }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ ad.slot }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-[240px]" :title="ad.url">{{ ad.url }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <span 
                    class="px-2.5 py-1 text-xs font-bold rounded-full uppercase"
                    :class="ad.status === 'Aktif' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-gray-50 text-gray-600 border border-gray-200'"
                  >
                    {{ ad.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold space-x-1">
                  <button @click="openIklanEditModal(ad)" class="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg inline-flex items-center transition" title="Edit Iklan">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button @click="deleteIklan(ad.id)" class="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg inline-flex items-center transition" title="Hapus Iklan">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </td>
              </tr>
              <tr v-if="filteredIklan.length === 0">
                <td colspan="5" class="px-6 py-12 text-center text-gray-400">Tidak ada iklan terpasang</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      
      <div v-if="showUserModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
        <div class="bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden my-8 animate-in fade-in duration-200">
          <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 class="text-lg font-bold text-gray-800">
              {{ isEditingUser ? 'Edit Pengguna' : 'Tambah Pengguna Baru' }}
            </h3>
            <button @click="closeUserModal" class="text-gray-400 hover:text-gray-600"><i class="fas fa-times"></i></button>
          </div>
          
          <div class="px-6 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Nama Lengkap</label>
              <input type="text" v-model="userForm.name" placeholder="Contoh: Herdianto Wildan" class="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm">
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <input type="email" v-model="userForm.email" placeholder="Contoh: herdianto@pasuruaninfo.com" class="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm">
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">{{ isEditingUser ? 'Password Baru (Opsional)' : 'Password' }}</label>
              <input type="password" v-model="userForm.password" :placeholder="isEditingUser ? 'Kosongkan jika tidak ingin mengubah password' : 'Masukkan password aman untuk akun baru'" class="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm">
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Role</label>
              <select v-model="userForm.role" class="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm bg-white">
                <option value="member">Member</option>
                <option value="penulis">Penulis</option>
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Status Verifikasi</label>
              <select v-model="userForm.is_verified" class="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm bg-white">
                <option :value="0">Belum Terverifikasi</option>
                <option :value="1">Terverifikasi</option>
              </select>
            </div>

            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-100 pt-4">
              <div>
                <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Provinsi</label>
                <v-select 
                  :options="provinces" 
                  label="name" 
                  v-model="userSelectedProv" 
                  @option:selected="onUserProvChange"
                  @option:deselected="clearUserRegencies"
                  placeholder="Pilih Provinsi"
                  class="w-full text-sm"
                />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Kota / Kabupaten</label>
                <v-select 
                  :options="userRegencies" 
                  label="name" 
                  v-model="userSelectedRegency" 
                  @option:selected="onUserRegencyChange"
                  @option:deselected="clearUserDistricts"
                  :disabled="!userSelectedProv"
                  placeholder="Pilih Kota/Kab"
                  class="w-full text-sm"
                />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Kecamatan</label>
                <v-select 
                  :options="userDistricts" 
                  label="name" 
                  v-model="userSelectedDistrict" 
                  @option:selected="onUserDistrictChange"
                  @option:deselected="clearUserVillages"
                  :disabled="!userSelectedRegency"
                  placeholder="Pilih Kecamatan"
                  class="w-full text-sm"
                />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Kelurahan</label>
                <v-select 
                  :options="userVillages" 
                  label="name" 
                  v-model="userSelectedVillage" 
                  @option:selected="onUserVillageChange"
                  :disabled="!userSelectedDistrict"
                  placeholder="Pilih Kelurahan"
                  class="w-full text-sm"
                />
              </div>
            </div>
          </div>

          <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 sm:flex sm:flex-row-reverse gap-3">
            <button @click="saveUser" class="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm transition">
              Simpan
            </button>
            <button @click="closeUserModal" class="w-full sm:w-auto px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition mt-3 sm:mt-0">
              Batal
            </button>
          </div>
        </div>
      </div>

      
      <div v-if="showCategoryModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
        <div class="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 class="text-lg font-bold text-gray-800">
              {{ isEditingCategory ? 'Edit Kategori' : 'Tambah Kategori Baru' }}
            </h3>
            <button @click="closeCategoryModal" class="text-gray-400 hover:text-gray-600"><i class="fas fa-times"></i></button>
          </div>
          
          <div class="px-6 py-4 space-y-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Nama Kategori</label>
              <input type="text" v-model="categoryForm.name" @input="generateSlug" class="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm" placeholder="Contoh: Otomotif">
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Slug</label>
              <input type="text" v-model="categoryForm.slug" class="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm bg-gray-50" placeholder="otomotif" readonly>
            </div>
          </div>

          <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 sm:flex sm:flex-row-reverse gap-3">
            <button @click="saveCategory" class="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm transition">
              Simpan
            </button>
            <button @click="closeCategoryModal" class="w-full sm:w-auto px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition mt-3 sm:mt-0">
              Batal
            </button>
          </div>
        </div>
      </div>

      
      <div v-if="showWisataModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
        <div class="bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden my-8 animate-in fade-in duration-200">
          <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 class="text-lg font-bold text-gray-800">
              {{ isEditingWisata ? 'Edit Destinasi Wisata' : 'Tambah Destinasi Wisata Baru' }}
            </h3>
            <button @click="closeWisataModal" class="text-gray-400 hover:text-gray-600"><i class="fas fa-times"></i></button>
          </div>
          
          <div class="px-6 py-4 space-y-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Nama Tempat Wisata</label>
              <input type="text" v-model="wisataForm.name" placeholder="Contoh: Danau Ranu Grati" class="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm">
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Kategori Wisata</label>
              <select v-model="wisataForm.category" class="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm bg-white">
                <option value="Wisata Alam">Wisata Alam</option>
                <option value="Rekreasi Keluarga">Rekreasi Keluarga</option>
                <option value="Sejarah & Budaya">Sejarah & Budaya</option>
                <option value="Wisata Religi">Wisata Religi</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Kecamatan / Lokasi</label>
              <input type="text" v-model="wisataForm.location" placeholder="Contoh: Grati" class="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm">
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Jam Operasional</label>
              <input type="text" v-model="wisataForm.jam" placeholder="Contoh: 08:00 - 17:00 WIB" class="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm">
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Harga Tiket Masuk</label>
              <input type="text" v-model="wisataForm.ticket" placeholder="Contoh: Rp 15.000" class="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm">
            </div>
          </div>

          <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 sm:flex sm:flex-row-reverse gap-3">
            <button @click="saveWisataSpot" class="w-full sm:w-auto px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-sm transition">
              Simpan
            </button>
            <button @click="closeWisataModal" class="w-full sm:w-auto px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition mt-3 sm:mt-0">
              Batal
            </button>
          </div>
        </div>
      </div>

      
      <div v-if="showIklanModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
        <div class="bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden my-8 animate-in fade-in duration-200">
          <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 class="text-lg font-bold text-gray-800">
              {{ isEditingIklan ? 'Edit Penempatan Iklan' : 'Pasang Iklan Baru' }}
            </h3>
            <button @click="closeIklanModal" class="text-gray-400 hover:text-gray-600"><i class="fas fa-times"></i></button>
          </div>
          
          <div class="px-6 py-4 space-y-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Nama Iklan / Deskripsi Campaign</label>
              <input type="text" v-model="iklanForm.name" placeholder="Contoh: Promo Ramadhan Hotel Royal" class="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm">
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Slot Penempatan Iklan</label>
              <select v-model="iklanForm.slot" class="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm bg-white">
                <option value="Header">Header (Banner Atas)</option>
                <option value="Sidebar">Sidebar (Panel Samping)</option>
                <option value="Content">Content (Di Tengah Artikel)</option>
                <option value="Footer">Footer (Bagian Bawah)</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Gambar URL Banner</label>
              <input type="text" v-model="iklanForm.image" placeholder="Contoh: https://images.unsplash.com/..." class="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm">
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Redirect Link (Tujuan Klik)</label>
              <input type="text" v-model="iklanForm.url" placeholder="Contoh: https://royalhotel.com/promo" class="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm">
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Status Penayangan</label>
              <select v-model="iklanForm.status" class="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm bg-white">
                <option value="Aktif">Aktif (Ditayangkan)</option>
                <option value="Non-Aktif">Non-Aktif (Diarsipkan)</option>
              </select>
            </div>
          </div>

          <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 sm:flex sm:flex-row-reverse gap-3">
            <button @click="saveIklanCampaign" class="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-sm transition">
              Simpan
            </button>
            <button @click="closeIklanModal" class="w-full sm:w-auto px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition mt-3 sm:mt-0">
              Batal
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Swal from 'sweetalert2';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

const loading = ref(false);
const activeSection = ref('users');
const activeUserTab = ref('member');

const sections = [
  { id: 'users', label: 'Manajemen Pengguna', icon: 'fa-users-cog' },
  { id: 'categories', label: 'Manajemen Kategori', icon: 'fa-tags' },
  { id: 'news', label: 'Manajemen Berita', icon: 'fa-newspaper' },
  { id: 'wisata', label: 'Manajemen Wisata', icon: 'fa-map-marked-alt' },
  { id: 'iklan', label: 'Manajemen Iklan', icon: 'fa-ad' }
];

const statusConfig: Record<string, { label: string; color: string; icon: string }> = {
  draft: { label: 'Draft', color: '#6b7280', icon: 'fa-file-alt' },
  pending: { label: 'Review', color: '#eab308', icon: 'fa-clock' },
  revision: { label: 'Revisi', color: '#ea580c', icon: 'fa-undo' },
  published: { label: 'Rilis', color: '#16a34a', icon: 'fa-check-circle' }
};


const users = ref<any[]>([]);
const categories = ref<any[]>([]);
const newsList = ref<any[]>([]);
const wisataList = ref<any[]>([]);
const iklanList = ref<any[]>([]);

const stats = ref({
  users: 0,
  categories: 0,
  news: 0,
  wisata: 0,
  iklan: 0
});


const userSearchQuery = ref('');
const categorySearchQuery = ref('');
const newsSearchQuery = ref('');
const wisataSearchQuery = ref('');
const iklanSearchQuery = ref('');


const userSortKey = ref<'name' | 'email' | 'lokasi' | 'is_verified'>('name');
const userSortOrder = ref<'asc' | 'desc'>('asc');

const categorySortKey = ref<'name' | 'slug'>('name');
const categorySortOrder = ref<'asc' | 'desc'>('asc');

const wisataSortKey = ref<'name' | 'category' | 'location' | 'jam' | 'ticket'>('name');
const wisataSortOrder = ref<'asc' | 'desc'>('asc');

const iklanSortKey = ref<'name' | 'slot' | 'url' | 'status'>('name');
const iklanSortOrder = ref<'asc' | 'desc'>('asc');


const showUserModal = ref(false);
const isEditingUser = ref(false);
const userForm = ref({
  id: 0,
  name: '',
  email: '',
  password: '',
  role: 'member',
  is_verified: 0,
  provinsi: '',
  kota_kab: '',
  kecamatan: '',
  kelurahan: ''
});


const provinces = ref<any[]>([]);
const userSelectedProv = ref<any>(null);
const userSelectedRegency = ref<any>(null);
const userSelectedDistrict = ref<any>(null);
const userSelectedVillage = ref<any>(null);

const userRegencies = ref<any[]>([]);
const userDistricts = ref<any[]>([]);
const userVillages = ref<any[]>([]);


const showCategoryModal = ref(false);
const isEditingCategory = ref(false);
const categoryForm = ref({
  id: 0,
  name: '',
  slug: ''
});


const showWisataModal = ref(false);
const isEditingWisata = ref(false);
const wisataForm = ref({
  id: 0,
  name: '',
  category: 'Wisata Alam',
  location: '',
  jam: '',
  ticket: ''
});


const showIklanModal = ref(false);
const isEditingIklan = ref(false);
const iklanForm = ref({
  id: 0,
  name: '',
  slot: 'Header',
  image: '',
  url: '',
  status: 'Aktif'
});

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};


const loadWisataData = () => {
  const local = localStorage.getItem('pasinfo_wisata');
  if (local) {
    wisataList.value = JSON.parse(local);
  } else {
    wisataList.value = [
      { id: 1, name: 'Gunung Bromo & Penanjakan', category: 'Wisata Alam', location: 'Tosari', jam: 'Buka 24 Jam', ticket: 'Rp 29.000 - Rp 34.000' },
      { id: 2, name: 'Taman Safari Indonesia II Prigen', category: 'Rekreasi Keluarga', location: 'Prigen', jam: '08:30 - 17:00 WIB', ticket: 'Rp 135.000 - Rp 150.000' },
      { id: 3, name: 'Candi Jawi', category: 'Sejarah & Budaya', location: 'Pandaan', jam: '07:30 - 16:00 WIB', ticket: 'Gratis' },
      { id: 4, name: 'Kebun Raya Purwodadi', category: 'Wisata Alam', location: 'Purwodadi', jam: '07:00 - 16:00 WIB', ticket: 'Rp 15.000 - Rp 25.000' }
    ];
    saveWisataData();
  }
};
const saveWisataData = () => {
  localStorage.setItem('pasinfo_wisata', JSON.stringify(wisataList.value));
};


const loadIklanData = () => {
  const local = localStorage.getItem('pasinfo_iklan');
  if (local) {
    iklanList.value = JSON.parse(local);
  } else {
    iklanList.value = [
      { id: 1, name: 'Iklan Banner Utama', slot: 'Header', image: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=600', url: 'https://pasuruaninfo.com/promo', status: 'Aktif' },
      { id: 2, name: 'Sponsor Lokal Bromo', slot: 'Sidebar', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600', url: 'https://bromojeep.com', status: 'Aktif' },
      { id: 3, name: 'Promo Hotel Pasuruan', slot: 'Content', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600', url: 'https://hotelpasuruan.com', status: 'Non-Aktif' }
    ];
    saveIklanData();
  }
};
const saveIklanData = () => {
  localStorage.setItem('pasinfo_iklan', JSON.stringify(iklanList.value));
};

const fetchStats = async () => {
  const token = localStorage.getItem('token');
  if (!token) return;
  try {
    const [uRes, cRes, nRes] = await Promise.all([
      fetch('http://localhost:8080/api/v1/users', { headers: getHeaders() }),
      fetch('http://localhost:8080/api/v1/categories'),
      fetch('http://localhost:8080/api/v1/news')
    ]);
    const uJson = await uRes.json();
    const cJson = await cRes.json();
    const nJson = await nRes.json();
    
    stats.value = {
      users: uJson.data ? uJson.data.length : 0,
      categories: cJson.data ? cJson.data.length : 0,
      news: nJson.data ? nJson.data.length : 0,
      wisata: wisataList.value.length,
      iklan: iklanList.value.length
    };
  } catch (err) {
    console.error('Error fetching statistics:', err);
  }
};

const fetchUsers = async () => {
  loading.value = true;
  try {
    const res = await fetch(`http://localhost:8080/api/v1/users?role=${activeUserTab.value}`, {
      headers: getHeaders()
    });
    const data = await res.json();
    if (data.success) {
      users.value = data.data || [];
    }
  } catch (error) {
    console.error('Error fetching users:', error);
  } finally {
    loading.value = false;
  }
};

const fetchCategories = async () => {
  try {
    const res = await fetch('http://localhost:8080/api/v1/categories');
    const data = await res.json();
    if (data.success) {
      categories.value = data.data || [];
    }
  } catch (err) {
    console.error(err);
  }
};

const fetchNews = async () => {
  try {
    const res = await fetch('http://localhost:8080/api/v1/news');
    const data = await res.json();
    if (data.success) {
      newsList.value = data.data || [];
    }
  } catch (err) {
    console.error(err);
  }
};

const formatLokasi = (u: any) => {
  const parts = [];
  if (u.provinsi) parts.push(u.provinsi);
  if (u.kota_kab) parts.push(u.kota_kab);
  return parts.length > 0 ? parts.join(', ') : 'Belum diisi';
};


const totalViews = computed(() => {
  return newsList.value.reduce((sum, item) => sum + (item.views || 0), 0);
});

const mostReadNews = computed(() => {
  if (newsList.value.length === 0) return null;
  return [...newsList.value].sort((a, b) => (b.views || 0) - (a.views || 0))[0];
});


const sortUsers = (key: 'name' | 'email' | 'lokasi' | 'is_verified') => {
  if (userSortKey.value === key) {
    userSortOrder.value = userSortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    userSortKey.value = key;
    userSortOrder.value = 'asc';
  }
};

const sortCategories = (key: 'name' | 'slug') => {
  if (categorySortKey.value === key) {
    categorySortOrder.value = categorySortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    categorySortKey.value = key;
    categorySortOrder.value = 'asc';
  }
};

const sortWisata = (key: 'name' | 'category' | 'location' | 'jam' | 'ticket') => {
  if (wisataSortKey.value === key) {
    wisataSortOrder.value = wisataSortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    wisataSortKey.value = key;
    wisataSortOrder.value = 'asc';
  }
};

const sortIklan = (key: 'name' | 'slot' | 'url' | 'status') => {
  if (iklanSortKey.value === key) {
    iklanSortOrder.value = iklanSortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    iklanSortKey.value = key;
    iklanSortOrder.value = 'asc';
  }
};


const filteredUsers = computed(() => {
  let result = users.value;
  if (userSearchQuery.value) {
    const q = userSearchQuery.value.toLowerCase();
    result = result.filter(u => 
      (u.name || '').toLowerCase().includes(q) || 
      (u.email || '').toLowerCase().includes(q) || 
      (u.provinsi || '').toLowerCase().includes(q)
    );
  }
  return [...result].sort((a, b) => {
    let valA = '';
    let valB = '';
    
    if (userSortKey.value === 'name') {
      valA = (a.name || '').toLowerCase();
      valB = (b.name || '').toLowerCase();
    } else if (userSortKey.value === 'email') {
      valA = (a.email || '').toLowerCase();
      valB = (b.email || '').toLowerCase();
    } else if (userSortKey.value === 'lokasi') {
      valA = formatLokasi(a).toLowerCase();
      valB = formatLokasi(b).toLowerCase();
    } else if (userSortKey.value === 'is_verified') {
      return userSortOrder.value === 'asc'
        ? (a.is_verified || 0) - (b.is_verified || 0)
        : (b.is_verified || 0) - (a.is_verified || 0);
    }
    
    return userSortOrder.value === 'asc' 
      ? valA.localeCompare(valB) 
      : valB.localeCompare(valA);
  });
});

const filteredCategories = computed(() => {
  let result = categories.value;
  if (categorySearchQuery.value) {
    const q = categorySearchQuery.value.toLowerCase();
    result = result.filter(c => 
      (c.name || '').toLowerCase().includes(q) || 
      (c.slug || '').toLowerCase().includes(q)
    );
  }
  return [...result].sort((a, b) => {
    let valA = '';
    let valB = '';
    if (categorySortKey.value === 'name') {
      valA = (a.name || '').toLowerCase();
      valB = (b.name || '').toLowerCase();
    } else if (categorySortKey.value === 'slug') {
      valA = (a.slug || '').toLowerCase();
      valB = (b.slug || '').toLowerCase();
    }
    return categorySortOrder.value === 'asc' 
      ? valA.localeCompare(valB) 
      : valB.localeCompare(valA);
  });
});

const filteredNews = computed(() => {
  let result = newsList.value;
  if (newsSearchQuery.value) {
    const q = newsSearchQuery.value.toLowerCase();
    result = result.filter(n => 
      (n.judul || '').toLowerCase().includes(q) || 
      (n.kategori || '').toLowerCase().includes(q) || 
      (n.penulis || '').toLowerCase().includes(q)
    );
  }
  return [...result].sort((a, b) => {
    const timeA = a.updated_at ? new Date(a.updated_at).getTime() : (a.created_at ? new Date(a.created_at).getTime() : 0);
    const timeB = b.updated_at ? new Date(b.updated_at).getTime() : (b.created_at ? new Date(b.created_at).getTime() : 0);
    return timeB - timeA;
  });
});

const filteredWisata = computed(() => {
  let result = wisataList.value;
  if (wisataSearchQuery.value) {
    const q = wisataSearchQuery.value.toLowerCase();
    result = result.filter(w => 
      (w.name || '').toLowerCase().includes(q) || 
      (w.category || '').toLowerCase().includes(q) || 
      (w.location || '').toLowerCase().includes(q)
    );
  }
  return [...result].sort((a, b) => {
    let valA = '';
    let valB = '';
    if (wisataSortKey.value === 'name') {
      valA = (a.name || '').toLowerCase();
      valB = (b.name || '').toLowerCase();
    } else if (wisataSortKey.value === 'category') {
      valA = (a.category || '').toLowerCase();
      valB = (b.category || '').toLowerCase();
    } else if (wisataSortKey.value === 'location') {
      valA = (a.location || '').toLowerCase();
      valB = (b.location || '').toLowerCase();
    } else if (wisataSortKey.value === 'jam') {
      valA = (a.jam || '').toLowerCase();
      valB = (b.jam || '').toLowerCase();
    } else if (wisataSortKey.value === 'ticket') {
      valA = (a.ticket || '').toLowerCase();
      valB = (b.ticket || '').toLowerCase();
    }
    return wisataSortOrder.value === 'asc' 
      ? valA.localeCompare(valB) 
      : valB.localeCompare(valA);
  });
});

const filteredIklan = computed(() => {
  let result = iklanList.value;
  if (iklanSearchQuery.value) {
    const q = iklanSearchQuery.value.toLowerCase();
    result = result.filter(ad => 
      (ad.name || '').toLowerCase().includes(q) || 
      (ad.slot || '').toLowerCase().includes(q) || 
      (ad.url || '').toLowerCase().includes(q)
    );
  }
  return [...result].sort((a, b) => {
    let valA = '';
    let valB = '';
    if (iklanSortKey.value === 'name') {
      valA = (a.name || '').toLowerCase();
      valB = (b.name || '').toLowerCase();
    } else if (iklanSortKey.value === 'slot') {
      valA = (a.slot || '').toLowerCase();
      valB = (b.slot || '').toLowerCase();
    } else if (iklanSortKey.value === 'url') {
      valA = (a.url || '').toLowerCase();
      valB = (b.url || '').toLowerCase();
    } else if (iklanSortKey.value === 'status') {
      valA = (a.status || '').toLowerCase();
      valB = (b.status || '').toLowerCase();
    }
    return iklanSortOrder.value === 'asc' 
      ? valA.localeCompare(valB) 
      : valB.localeCompare(valA);
  });
});


const onUserProvChange = async (val: any) => {
  clearUserRegencies();
  if (val && val.code) {
    userForm.value.provinsi = val.name;
    try {
      const res = await fetch(`http://localhost:8080/api/v1/wilayah/regencies/${val.code}`);
      const json = await res.json();
      userRegencies.value = json.data;
    } catch (err) {}
  } else {
    userForm.value.provinsi = '';
  }
};

const onUserRegencyChange = async (val: any) => {
  clearUserDistricts();
  if (val && val.code) {
    userForm.value.kota_kab = val.name;
    try {
      const res = await fetch(`http://localhost:8080/api/v1/wilayah/districts/${val.code}`);
      const json = await res.json();
      userDistricts.value = json.data;
    } catch (err) {}
  } else {
    userForm.value.kota_kab = '';
  }
};

const onUserDistrictChange = async (val: any) => {
  clearUserVillages();
  if (val && val.code) {
    userForm.value.kecamatan = val.name;
    try {
      const res = await fetch(`http://localhost:8080/api/v1/wilayah/villages/${val.code}`);
      const json = await res.json();
      userVillages.value = json.data;
    } catch (err) {}
  } else {
    userForm.value.kecamatan = '';
  }
};

const onUserVillageChange = (val: any) => {
  if (val && val.name) {
    userForm.value.kelurahan = val.name;
  } else {
    userForm.value.kelurahan = '';
  }
};

const clearUserRegencies = () => {
  userSelectedRegency.value = null;
  userForm.value.kota_kab = '';
  userRegencies.value = [];
  clearUserDistricts();
};

const clearUserDistricts = () => {
  userSelectedDistrict.value = null;
  userForm.value.kecamatan = '';
  userDistricts.value = [];
  clearUserVillages();
};

const clearUserVillages = () => {
  userSelectedVillage.value = null;
  userForm.value.kelurahan = '';
  userVillages.value = [];
};


const openUserCreateModal = () => {
  isEditingUser.value = false;
  userForm.value = {
    id: 0,
    name: '',
    email: '',
    password: '',
    role: activeUserTab.value,
    is_verified: 0,
    provinsi: '',
    kota_kab: '',
    kecamatan: '',
    kelurahan: ''
  };
  
  userSelectedProv.value = null;
  clearUserRegencies();
  showUserModal.value = true;
};

const openUserEditModal = async (u: any) => {
  isEditingUser.value = true;
  userForm.value = {
    id: u.id,
    name: u.name || '',
    email: u.email || '',
    password: '',
    role: u.role || 'member',
    is_verified: u.is_verified || 0,
    provinsi: u.provinsi || '',
    kota_kab: u.kota_kab || '',
    kecamatan: u.kecamatan || '',
    kelurahan: u.kelurahan || ''
  };

  userSelectedProv.value = provinces.value.find((p: any) => p.name === u.provinsi) || (u.provinsi ? { name: u.provinsi, code: '' } : null);
  
  if (userSelectedProv.value && userSelectedProv.value.code) {
    try {
      const regRes = await fetch(`http://localhost:8080/api/v1/wilayah/regencies/${userSelectedProv.value.code}`);
      const regJson = await regRes.json();
      userRegencies.value = regJson.data;
      userSelectedRegency.value = userRegencies.value.find((r: any) => r.name === u.kota_kab) || (u.kota_kab ? { name: u.kota_kab, code: '' } : null);
      
      if (userSelectedRegency.value && userSelectedRegency.value.code) {
        const distRes = await fetch(`http://localhost:8080/api/v1/wilayah/districts/${userSelectedRegency.value.code}`);
        const distJson = await distRes.json();
        userDistricts.value = distJson.data;
        userSelectedDistrict.value = userDistricts.value.find((d: any) => d.name === u.kecamatan) || (u.kecamatan ? { name: u.kecamatan, code: '' } : null);
        
        if (userSelectedDistrict.value && userSelectedDistrict.value.code) {
          const vilRes = await fetch(`http://localhost:8080/api/v1/wilayah/villages/${userSelectedDistrict.value.code}`);
          const vilJson = await vilRes.json();
          userVillages.value = vilJson.data;
          userSelectedVillage.value = userVillages.value.find((v: any) => v.name === u.kelurahan) || (u.kelurahan ? { name: u.kelurahan, code: '' } : null);
        }
      }
    } catch (err) {}
  }
  showUserModal.value = true;
};

const closeUserModal = () => {
  showUserModal.value = false;
};

const saveUser = async () => {
  if (!userForm.value.name || !userForm.value.email) {
    Swal.fire('Error', 'Nama dan Email harus diisi!', 'error');
    return;
  }
  
  const url = isEditingUser.value 
    ? `http://localhost:8080/api/v1/users/${userForm.value.id}` 
    : 'http://localhost:8080/api/v1/users';
  const method = isEditingUser.value ? 'PUT' : 'POST';

  try {
    const res = await fetch(url, {
      method,
      headers: getHeaders(),
      body: JSON.stringify({
        name: userForm.value.name,
        email: userForm.value.email,
        password: userForm.value.password || undefined,
        role: userForm.value.role,
        is_verified: userForm.value.is_verified,
        provinsi: userForm.value.provinsi,
        kota_kab: userForm.value.kota_kab,
        kecamatan: userForm.value.kecamatan,
        kelurahan: userForm.value.kelurahan
      })
    });
    
    const data = await res.json();
    if (data.success) {
      Swal.fire('Berhasil', isEditingUser.value ? 'Pengguna berhasil diubah!' : 'Pengguna baru berhasil ditambahkan!', 'success');
      showUserModal.value = false;
      fetchUsers();
      fetchStats();
    } else {
      Swal.fire('Gagal', data.message || 'Gagal menyimpan data pengguna', 'error');
    }
  } catch (err) {
    Swal.fire('Error', 'Kesalahan koneksi ke server', 'error');
  }
};

const deleteUser = async (id: number) => {
  Swal.fire({
    title: 'Hapus Pengguna?',
    text: 'Aksi ini tidak dapat dibatalkan.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Ya, Hapus!',
    cancelButtonText: 'Batal'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:8080/api/v1/users/${id}`, {
          method: 'DELETE',
          headers: getHeaders()
        });
        const data = await res.json();
        if (data.success) {
          Swal.fire('Terhapus', 'Pengguna telah dihapus.', 'success');
          fetchUsers();
          fetchStats();
        } else {
          Swal.fire('Gagal', data.message || 'Gagal menghapus pengguna', 'error');
        }
      } catch (err) {
        Swal.fire('Error', 'Gagal memproses penghapusan', 'error');
      }
    }
  });
};


const openCategoryCreateModal = () => {
  isEditingCategory.value = false;
  categoryForm.value = {
    id: 0,
    name: '',
    slug: ''
  };
  showCategoryModal.value = true;
};

const openCategoryEditModal = (cat: any) => {
  isEditingCategory.value = true;
  categoryForm.value = {
    id: cat.id || cat.ID,
    name: cat.name || '',
    slug: cat.slug || ''
  };
  showCategoryModal.value = true;
};

const closeCategoryModal = () => {
  showCategoryModal.value = false;
};

const generateSlug = () => {
  categoryForm.value.slug = categoryForm.value.name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const saveCategory = async () => {
  if (!categoryForm.value.name) {
    Swal.fire('Error', 'Nama kategori wajib diisi!', 'error');
    return;
  }

  const url = isEditingCategory.value
    ? `http://localhost:8080/api/v1/categories/${categoryForm.value.id}`
    : 'http://localhost:8080/api/v1/categories';
  const method = isEditingCategory.value ? 'PUT' : 'POST';

  try {
    const res = await fetch(url, {
      method,
      headers: getHeaders(),
      body: JSON.stringify({
        name: categoryForm.value.name,
        slug: categoryForm.value.slug
      })
    });

    const data = await res.json();
    if (data.success) {
      Swal.fire('Berhasil', isEditingCategory.value ? 'Kategori berhasil diubah!' : 'Kategori baru berhasil ditambahkan!', 'success');
      showCategoryModal.value = false;
      fetchCategories();
      fetchStats();
    } else {
      Swal.fire('Gagal', data.message || 'Gagal menyimpan kategori', 'error');
    }
  } catch (err) {
    Swal.fire('Error', 'Kesalahan server', 'error');
  }
};

const deleteCategory = async (id: number) => {
  Swal.fire({
    title: 'Hapus Kategori?',
    text: 'Aksi ini akan menghapus kategori yang dipilih.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Ya, Hapus!',
    cancelButtonText: 'Batal'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:8080/api/v1/categories/${id}`, {
          method: 'DELETE',
          headers: getHeaders()
        });
        const data = await res.json();
        if (data.success) {
          Swal.fire('Terhapus', 'Kategori berhasil dihapus.', 'success');
          fetchCategories();
          fetchStats();
        } else {
          Swal.fire('Gagal', data.message || 'Gagal menghapus kategori', 'error');
        }
      } catch (err) {}
    }
  });
};


const deleteNewsItem = async (id: number) => {
  Swal.fire({
    title: 'Hapus Artikel Berita?',
    text: 'Aksi ini akan menghapus artikel berita secara permanen.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Ya, Hapus!',
    cancelButtonText: 'Batal'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:8080/api/v1/news/${id}`, {
          method: 'DELETE',
          headers: getHeaders()
        });
        const data = await res.json();
        if (data.success) {
          Swal.fire('Terhapus', 'Artikel berita berhasil dihapus.', 'success');
          fetchNews();
          fetchStats();
        } else {
          Swal.fire('Gagal', data.message || 'Gagal menghapus artikel berita', 'error');
        }
      } catch (err) {
        Swal.fire('Error', 'Gagal memproses penghapusan', 'error');
      }
    }
  });
};


const openWisataCreateModal = () => {
  isEditingWisata.value = false;
  wisataForm.value = {
    id: 0,
    name: '',
    category: 'Wisata Alam',
    location: '',
    jam: '08:00 - 17:00 WIB',
    ticket: 'Rp 15.000'
  };
  showWisataModal.value = true;
};

const openWisataEditModal = (w: any) => {
  isEditingWisata.value = true;
  wisataForm.value = {
    id: w.id,
    name: w.name,
    category: w.category,
    location: w.location,
    jam: w.jam,
    ticket: w.ticket
  };
  showWisataModal.value = true;
};

const closeWisataModal = () => {
  showWisataModal.value = false;
};

const saveWisataSpot = () => {
  if (!wisataForm.value.name || !wisataForm.value.location) {
    Swal.fire('Error', 'Nama tempat dan lokasi wajib diisi!', 'error');
    return;
  }

  if (isEditingWisata.value) {
    const idx = wisataList.value.findIndex(w => w.id === wisataForm.value.id);
    if (idx !== -1) {
      wisataList.value[idx] = { ...wisataForm.value };
    }
    Swal.fire('Berhasil', 'Destinasi wisata berhasil diperbarui!', 'success');
  } else {
    const nextId = wisataList.value.length > 0 ? Math.max(...wisataList.value.map(w => w.id)) + 1 : 1;
    wisataList.value.push({
      id: nextId,
      name: wisataForm.value.name,
      category: wisataForm.value.category,
      location: wisataForm.value.location,
      jam: wisataForm.value.jam,
      ticket: wisataForm.value.ticket
    });
    Swal.fire('Berhasil', 'Destinasi wisata baru berhasil ditambahkan!', 'success');
  }

  saveWisataData();
  fetchStats();
  showWisataModal.value = false;
};

const deleteWisata = (id: number) => {
  Swal.fire({
    title: 'Hapus Destinasi Wisata?',
    text: 'Aksi ini akan menghapus destinasi terpilih.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Ya, Hapus!',
    cancelButtonText: 'Batal'
  }).then((result) => {
    if (result.isConfirmed) {
      wisataList.value = wisataList.value.filter(w => w.id !== id);
      saveWisataData();
      fetchStats();
      Swal.fire('Terhapus', 'Destinasi wisata berhasil dihapus.', 'success');
    }
  });
};


const openIklanCreateModal = () => {
  isEditingIklan.value = false;
  iklanForm.value = {
    id: 0,
    name: '',
    slot: 'Header',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=600',
    url: 'https://pasuruaninfo.com/promo',
    status: 'Aktif'
  };
  showIklanModal.value = true;
};

const openIklanEditModal = (ad: any) => {
  isEditingIklan.value = true;
  iklanForm.value = {
    id: ad.id,
    name: ad.name,
    slot: ad.slot,
    image: ad.image,
    url: ad.url,
    status: ad.status
  };
  showIklanModal.value = true;
};

const closeIklanModal = () => {
  showIklanModal.value = false;
};

const saveIklanCampaign = () => {
  if (!iklanForm.value.name || !iklanForm.value.image || !iklanForm.value.url) {
    Swal.fire('Error', 'Nama, Gambar Banner, dan Redirect Link wajib diisi!', 'error');
    return;
  }

  if (isEditingIklan.value) {
    const idx = iklanList.value.findIndex(ad => ad.id === iklanForm.value.id);
    if (idx !== -1) {
      iklanList.value[idx] = { ...iklanForm.value };
    }
    Swal.fire('Berhasil', 'Iklan berhasil diperbarui!', 'success');
  } else {
    const nextId = iklanList.value.length > 0 ? Math.max(...iklanList.value.map(ad => ad.id)) + 1 : 1;
    iklanList.value.push({
      id: nextId,
      name: iklanForm.value.name,
      slot: iklanForm.value.slot,
      image: iklanForm.value.image,
      url: iklanForm.value.url,
      status: iklanForm.value.status
    });
    Swal.fire('Berhasil', 'Iklan baru berhasil ditambahkan!', 'success');
  }

  saveIklanData();
  fetchStats();
  showIklanModal.value = false;
};

const deleteIklan = (id: number) => {
  Swal.fire({
    title: 'Hapus Iklan?',
    text: 'Aksi ini akan menghapus penempatan iklan terpilih.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Ya, Hapus!',
    cancelButtonText: 'Batal'
  }).then((result) => {
    if (result.isConfirmed) {
      iklanList.value = iklanList.value.filter(ad => ad.id !== id);
      saveIklanData();
      fetchStats();
      Swal.fire('Terhapus', 'Penempatan iklan berhasil dihapus.', 'success');
    }
  });
};

onMounted(async () => {

  try {
    const res = await fetch('http://localhost:8080/api/v1/wilayah/provinces');
    const json = await res.json();
    provinces.value = json.data || [];
  } catch (err) {}


  loadWisataData();
  loadIklanData();

  fetchStats();
  fetchUsers();
  fetchCategories();
  fetchNews();
});
</script>
