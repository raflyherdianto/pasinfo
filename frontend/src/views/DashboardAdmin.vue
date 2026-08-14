<template>
  <div class="min-h-screen bg-gray-50/50 py-8 font-sans">
    <main class="container mx-auto px-4 max-w-7xl">
      
      <div class="mb-8">
        <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center space-x-3">
          <span>Dashboard Admin Pasinfo</span>
        </h1>
        <p class="mt-2 text-gray-600">Portal manajemen konten, kategori, destinasi wisata, iklan, dan pengguna sistem</p>
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
            class="px-5 py-3 rounded-xl font-bold transition-all text-center justify-center flex items-center"
            :class="[
              activeSection === sec.id
                ? 'bg-blue-50 text-blue-600 border border-blue-100 shadow-sm'
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50 border border-transparent'
            ]"
          >
            {{ sec.label }}
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
          <div class="flex items-center gap-3 w-full sm:w-auto">
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
            <button 
              @click="openUserCreateModal" 
              class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow-xs hover:shadow transition-all flex items-center space-x-2 text-sm shrink-0"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
              </svg>
              <span>Tambah Pengguna</span>
            </button>
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
            <button 
              @click="openCategoryCreateModal" 
              class="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-xl shadow-xs hover:shadow transition-all flex items-center space-x-2 text-sm shrink-0"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              <span>Tambah Kategori</span>
            </button>
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
                <th @click="sortNews('title')" class="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 transition">
                  <div class="flex items-center space-x-1.5">
                    <span>Judul Berita</span>
                    <span v-if="newsSortKey === 'title'">
                      <svg v-if="newsSortOrder === 'asc'" class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"></path></svg>
                      <svg v-else class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
                    </span>
                    <span v-else class="opacity-30">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
                    </span>
                  </div>
                </th>
                <th @click="sortNews('category')" class="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 transition">
                  <div class="flex items-center space-x-1.5">
                    <span>Kategori</span>
                    <span v-if="newsSortKey === 'category'">
                      <svg v-if="newsSortOrder === 'asc'" class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"></path></svg>
                      <svg v-else class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
                    </span>
                    <span v-else class="opacity-30">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
                    </span>
                  </div>
                </th>
                <th @click="sortNews('author')" class="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 transition">
                  <div class="flex items-center space-x-1.5">
                    <span>Penulis</span>
                    <span v-if="newsSortKey === 'author'">
                      <svg v-if="newsSortOrder === 'asc'" class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"></path></svg>
                      <svg v-else class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
                    </span>
                    <span v-else class="opacity-30">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
                    </span>
                  </div>
                </th>
                <th @click="sortNews('views')" class="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 transition">
                  <div class="flex items-center space-x-1.5">
                    <span>Views</span>
                    <span v-if="newsSortKey === 'views'">
                      <svg v-if="newsSortOrder === 'asc'" class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"></path></svg>
                      <svg v-else class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
                    </span>
                    <span v-else class="opacity-30">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
                    </span>
                  </div>
                </th>
                <th @click="sortNews('status')" class="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 transition">
                  <div class="flex items-center space-x-1.5">
                    <span>Status</span>
                    <span v-if="newsSortKey === 'status'">
                      <svg v-if="newsSortOrder === 'asc'" class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"></path></svg>
                      <svg v-else class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
                    </span>
                    <span v-else class="opacity-30">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
                    </span>
                  </div>
                </th>
                <th @click="sortNews('updated_at')" class="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 transition">
                  <div class="flex items-center space-x-1.5">
                    <span>Diperbarui</span>
                    <span v-if="newsSortKey === 'updated_at'">
                      <svg v-if="newsSortOrder === 'asc'" class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"></path></svg>
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
              <tr v-for="item in paginatedNews" :key="item.id" class="hover:bg-gray-50/50 transition-colors">
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
                  <button @click="openEditNewsModal(item)" class="p-2 text-amber-600 hover:text-amber-800 hover:bg-amber-50 rounded-lg inline-flex items-center transition" title="Edit Berita">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
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

        <!-- News Pagination Footer Controls -->
        <div v-if="filteredNews.length > 0" class="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div class="text-sm text-gray-500 text-center sm:text-left">
            Menampilkan <span class="font-semibold text-gray-800">{{ newsStartIndex + 1 }}</span> sampai <span class="font-semibold text-gray-800">{{ Math.min(newsStartIndex + newsPerPage, filteredNews.length) }}</span> dari <span class="font-semibold text-gray-800">{{ filteredNews.length }}</span> berita
          </div>
          <div class="flex items-center gap-1.5">
            <button 
              @click="goToNewsPage(newsPage - 1)" 
              :disabled="newsPage === 1"
              class="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1 shadow-xs cursor-pointer"
              title="Halaman Sebelumnya"
            >
              <i class="fas fa-chevron-left text-[10px]"></i>
              <span>Prev</span>
            </button>

            <div class="flex items-center gap-1">
              <template v-for="p in visibleNewsPages" :key="p">
                <span v-if="p === '...'" class="px-2 py-1 text-xs text-gray-400">...</span>
                <button 
                  v-else
                  @click="goToNewsPage(p as number)"
                  class="w-8 h-8 text-xs font-bold rounded-lg transition flex items-center justify-center shadow-xs cursor-pointer"
                  :class="newsPage === p ? 'bg-blue-600 text-white shadow-blue-500/20' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'"
                >
                  {{ p }}
                </button>
              </template>
            </div>

            <button 
              @click="goToNewsPage(newsPage + 1)" 
              :disabled="newsPage >= totalNewsPages"
              class="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1 shadow-xs cursor-pointer"
              title="Halaman Selanjutnya"
            >
              <span>Next</span>
              <i class="fas fa-chevron-right text-[10px]"></i>
            </button>
          </div>
        </div>
      </div>

      
      <div v-else-if="activeSection === 'wisata'" class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in duration-200">
        <div class="border-b border-gray-100 bg-gray-50/50 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h4 class="font-bold text-gray-800 text-base">Manajemen Destinasi Wisata</h4>
          <div class="flex items-center gap-3 w-full sm:w-auto">
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
            <button 
              @click="openWisataCreateModal" 
              class="bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 px-4 rounded-xl shadow-xs hover:shadow transition-all flex items-center space-x-2 text-sm shrink-0"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              <span>Tambah Wisata</span>
            </button>
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
          <div class="flex items-center gap-3 w-full sm:w-auto">
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
            <button 
              @click="openIklanCreateModal" 
              class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-xl shadow-xs hover:shadow transition-all flex items-center space-x-2 text-sm shrink-0"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              <span>Pasang Iklan Baru</span>
            </button>
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
                <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 truncate max-w-[220px]" :title="ad.title || ad.name">
                  <div class="flex items-center space-x-3">
                    <img :src="ad.image_url || ad.image || '/images/themes/photo.jpg'" class="w-12 h-8 rounded object-cover border border-gray-200 shrink-0" alt="Ad Preview" />
                    <span class="truncate">{{ ad.title || ad.name }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                  <span class="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-100">
                    {{ slotLabels[ad.slot] || ad.slot }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-[240px]" :title="ad.redirect_url || ad.url">
                  <a :href="ad.redirect_url || ad.url" target="_blank" class="text-blue-600 hover:underline flex items-center gap-1">
                    <span class="truncate">{{ ad.redirect_url || ad.url || '-' }}</span>
                  </a>
                </td>
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

      
      <div v-if="showUserModal" @click.self="closeUserModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
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
              <input type="text" v-model="userForm.name" placeholder="Contoh: Wildan Cihuy" class="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm">
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <input type="email" v-model="userForm.email" placeholder="Contoh: wildan@pasuruaninfo.com" class="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm">
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">{{ isEditingUser ? 'Password Baru (Opsional)' : 'Password' }}</label>
              <div class="relative">
                <input :type="showPassword ? 'text' : 'password'" v-model="userForm.password" :placeholder="isEditingUser ? 'Kosongkan jika tidak ingin mengubah password' : 'Masukkan password aman untuk akun baru'" class="w-full px-3.5 py-2 pr-10 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm">
                <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1" :title="showPassword ? 'Sembunyikan password' : 'Tampilkan password'">
                  <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.03 10.03 0 013.982-.863c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18"/>
                  </svg>
                </button>
              </div>
              <div v-if="userForm.password" class="mt-2 space-y-1">
                <div class="flex justify-between items-center text-xs font-semibold">
                  <span class="text-gray-500">Kekuatan Password:</span>
                  <span :class="passwordStrength.color">{{ passwordStrength.label }}</span>
                </div>
                <div class="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div class="h-full transition-all duration-300 rounded-full" :class="passwordStrength.barColor" :style="{ width: passwordStrength.percent }"></div>
                </div>
              </div>
              <p class="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
                <svg class="w-3.5 h-3.5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Minimal 8 karakter, kombinasi huruf kapital (A-Z), angka (0-9) &amp; simbol (!@#$%^&*).</span>
              </p>
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

            
            <div class="grid grid-cols-1 gap-4 border-t border-gray-100 pt-4">
              <div>
                <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Nomor Telepon</label>
                <input type="text" v-model="userForm.phone" placeholder="Contoh: 081234567890" class="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm">
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Alamat Lengkap</label>
                <textarea v-model="userForm.alamat" rows="2" placeholder="Contoh: Jl. Pahlawan No. 123, Pasuruan" class="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm resize-none"></textarea>
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

      
      <div v-if="showCategoryModal" @click.self="closeCategoryModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
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

      
      <div v-if="showNewsEditModal" @click.self="closeNewsEditModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
        <div class="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden my-8 animate-in fade-in duration-200">
          <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 class="text-lg font-bold text-gray-800">Edit Artikel Berita</h3>
            <button @click="closeNewsEditModal" class="text-gray-400 hover:text-gray-600"><i class="fas fa-times"></i></button>
          </div>
          
          <div class="px-6 py-4 space-y-4 max-h-[75vh] overflow-y-auto">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Judul Berita</label>
              <input type="text" v-model="newsForm.title" placeholder="Masukkan judul berita..." class="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm font-semibold">
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Kategori</label>
                <select v-model="newsForm.category_id" class="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm bg-white">
                  <option :value="0" disabled>Pilih Kategori</option>
                  <option v-for="cat in categories" :key="cat.ID || cat.id" :value="cat.ID || cat.id">
                    {{ cat.name }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Status Rilis</label>
                <select v-model="newsForm.status" class="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm bg-white font-medium">
                  <option value="draft">Draft</option>
                  <option value="pending">Review (Pending)</option>
                  <option value="revision">Revisi</option>
                  <option value="published">Rilis (Published)</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Konten Berita</label>
              <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <QuillEditor 
                  theme="snow" 
                  v-model:content="newsForm.content" 
                  contentType="html" 
                  class="w-full bg-white border-0 cursor-text" 
                  style="min-height: 300px; font-size: 15px;" 
                />
              </div>
            </div>

            <!-- Kelola Gambar & Caption -->
            <div class="pt-2">
              <div class="flex items-center justify-between mb-2">
                <label class="block text-sm font-semibold text-gray-700">Gambar Artikel & Caption</label>
                <button type="button" @click="triggerNewsImageUpload" class="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-bold transition flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                  Tambah Gambar
                </button>
                <input type="file" ref="editNewsImageInputRef" @change="handleEditNewsFileSelect" multiple accept="image/*" class="hidden">
              </div>

              <div v-if="newsForm.images.length === 0" class="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
                <p class="text-xs text-gray-400 font-medium">Belum ada gambar disematkan. Klik tombol "Tambah Gambar" untuk mengunggah gambar.</p>
              </div>

              <div v-else class="space-y-3">
                <div v-for="(img, idx) in newsForm.images" :key="idx" class="p-3 bg-gray-50 border border-gray-200 rounded-xl flex flex-col sm:flex-row items-center gap-3">
                  <div class="relative w-full sm:w-28 h-20 bg-gray-200 rounded-lg overflow-hidden shrink-0 border border-gray-200">
                    <img :src="img" alt="Preview" class="w-full h-full object-cover">
                    <span class="absolute top-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">#{{ idx + 1 }}</span>
                  </div>
                  <div class="flex-1 w-full">
                    <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Caption Gambar #{{ idx + 1 }}</label>
                    <input type="text" v-model="newsForm.image_captions[idx]" placeholder="Masukkan keterangan gambar (caption)..." class="w-full px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-xs bg-white">
                  </div>
                  <button type="button" @click="removeNewsImage(idx)" class="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition self-end sm:self-center shrink-0" title="Hapus Gambar Ini">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 sm:flex sm:flex-row-reverse gap-3">
            <button @click="saveNewsEdit" class="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm transition">
              Simpan Perubahan
            </button>
            <button @click="closeNewsEditModal" class="w-full sm:w-auto px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition mt-3 sm:mt-0">
              Batal
            </button>
          </div>
        </div>
      </div>

      
      <div v-if="showWisataModal" @click.self="closeWisataModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
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

      
      <div v-if="showIklanModal" @click.self="closeIklanModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
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
              <select v-model="iklanForm.slot" class="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm bg-white font-medium">
                <option v-for="(spec, key) in slotSpecs" :key="key" :value="key">
                  {{ spec.label }} ({{ spec.size }})
                </option>
              </select>

              <div v-if="slotSpecs[iklanForm.slot]" class="mt-2.5 p-3 bg-blue-50/80 border border-blue-200/70 rounded-xl flex items-start gap-2.5 text-xs text-blue-950">
                <svg class="w-4 h-4 text-blue-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <div class="space-y-0.5">
                  <p class="font-bold text-blue-950">Rekomendasi Ukuran Pixel: <span class="text-blue-700 font-extrabold bg-blue-100/90 px-1.5 py-0.5 rounded border border-blue-200">{{ slotSpecs[iklanForm.slot].size }}</span></p>
                  <p class="text-blue-800/80">{{ slotSpecs[iklanForm.slot].desc }}</p>
                  <p class="text-[11px] text-blue-600/90 italic font-medium pt-0.5">*Sistem otomatis menyesuaikan (auto-fit & object-cover) tampilan gambar secara responsif di semua layar.</p>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Metode Sumber Gambar Banner</label>
              <div class="flex items-center gap-4 mb-3">
                <label class="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer">
                  <input type="radio" value="url" v-model="iklanImageMode" class="text-blue-600 focus:ring-blue-500">
                  <span>URL Gambar Direct (Link)</span>
                </label>
                <label class="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer">
                  <input type="radio" value="upload" v-model="iklanImageMode" class="text-blue-600 focus:ring-blue-500">
                  <span>Upload Gambar Manual (File)</span>
                </label>
              </div>

              <div v-if="iklanImageMode === 'url'">
                <input type="text" v-model="iklanForm.image_url" placeholder="Masukkan URL gambar banner (https://...)" class="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm">
              </div>

              <div v-else class="space-y-2">
                <input type="file" @change="handleIklanFileUpload" accept="image/*" class="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer">
              </div>

              <div v-if="iklanForm.image_url" class="mt-3 p-2.5 bg-gray-50 border border-gray-200 rounded-xl flex items-center gap-3">
                <img :src="iklanForm.image_url" alt="Preview Banner" class="h-14 w-28 object-cover rounded-lg border border-gray-200 shrink-0">
                <div class="text-xs text-gray-500 overflow-hidden">
                  <span class="font-bold block text-gray-700">Preview Banner</span>
                  <span class="truncate block text-[11px] text-gray-400 max-w-[300px]">{{ iklanForm.image_url }}</span>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Redirect Link (Tujuan Klik)</label>
              <input type="text" v-model="iklanForm.redirect_url" placeholder="Contoh: https://royalhotel.com/promo" class="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm">
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Status Penayangan</label>
              <select v-model="iklanForm.status" class="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm bg-white font-medium">
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
import { ref, onMounted, computed, watch } from 'vue';
import Swal from 'sweetalert2';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

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

const newsSortKey = ref<'title' | 'category' | 'author' | 'views' | 'status' | 'updated_at'>('updated_at');
const newsSortOrder = ref<'asc' | 'desc'>('desc');

const categorySortKey = ref<'name' | 'slug'>('name');
const categorySortOrder = ref<'asc' | 'desc'>('asc');

const wisataSortKey = ref<'name' | 'category' | 'location' | 'jam' | 'ticket'>('name');
const wisataSortOrder = ref<'asc' | 'desc'>('asc');

const iklanSortKey = ref<'name' | 'slot' | 'url' | 'status'>('name');
const iklanSortOrder = ref<'asc' | 'desc'>('asc');


const showUserModal = ref(false);
const isEditingUser = ref(false);
const showPassword = ref(false);
const userForm = ref({
  id: 0,
  name: '',
  email: '',
  password: '',
  role: 'member',
  is_verified: 0,
  phone: '',
  provinsi: '',
  kota_kab: '',
  kecamatan: '',
  kelurahan: '',
  alamat: ''
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

const showNewsEditModal = ref(false);
const editNewsImageInputRef = ref<HTMLInputElement | null>(null);
const newsForm = ref({
  id: 0,
  title: '',
  category_id: 0,
  status: 'published',
  content: '',
  images: [] as string[],
  image_captions: [] as string[]
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


const slotSpecs: Record<string, { label: string; size: string; desc: string }> = {
  header_top: { label: 'Header Top Banner', size: '728 × 90 px / 970 × 90 px', desc: 'Tampil paling atas di seluruh halaman utama & header.' },
  home_top: { label: 'Beranda - Atas Kategori', size: '728 × 90 px / 970 × 90 px', desc: 'Tampil di beranda di atas daftar berita kategori.' },
  home_middle: { label: 'Beranda - Atas Pasinfo Jelajah', size: '728 × 90 px / 970 × 90 px', desc: 'Tampil di beranda persis di atas section Jelajah.' },
  home_bottom: { label: 'Beranda - Bawah Pasinfo Jelajah', size: '728 × 90 px / 970 × 90 px', desc: 'Tampil di beranda di paling bawah halaman.' },
  home_sidebar: { label: 'Beranda - Sidebar Samping', size: '300 × 250 px / 300 × 600 px', desc: 'Tampil di panel kanan (sidebar) beranda.' },
  berita_inline: { label: 'Detail Berita - Sela Paragraf Konten', size: '728 × 90 px / 728 × 120 px', desc: 'Tampil otomatis di dalam isi artikel setiap 2 paragraf.' },
  berita_popular_bottom: { label: 'Detail Berita - Bawah Berita Terpopuler', size: '300 × 250 px (Medium Rectangle)', desc: 'Tampil di paling bawah section Berita Terpopuler (sidebar).' },
  berita_related_top: { label: 'Detail Berita - Atas Berita Terkait', size: '728 × 90 px / 970 × 90 px', desc: 'Tampil di atas slider section Berita Terkait.' },
  berita_latest_bottom: { label: 'Detail Berita - Bawah Berita Terbaru', size: '728 × 90 px / 970 × 90 px', desc: 'Tampil di bawah section Berita Terbaru di paling bawah artikel.' },
  wisata_banner: { label: 'Destinasi Wisata - Banner Utama', size: '728 × 90 px / 970 × 90 px', desc: 'Tampil di halaman eksplorasi destinasi wisata.' }
};

const slotLabels: Record<string, string> = Object.fromEntries(
  Object.entries(slotSpecs).map(([key, spec]) => [key, `${spec.label} (${spec.size})`])
);

const showIklanModal = ref(false);
const isEditingIklan = ref(false);
const iklanImageMode = ref<'url' | 'upload'>('url');
const iklanForm = ref({
  id: 0,
  name: '',
  slot: 'header_top',
  image_url: '',
  redirect_url: '',
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

const sortNews = (key: 'title' | 'category' | 'author' | 'views' | 'status' | 'updated_at') => {
  if (newsSortKey.value === key) {
    newsSortOrder.value = newsSortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    newsSortKey.value = key;
    newsSortOrder.value = 'asc';
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
    let valA: any = '';
    let valB: any = '';

    if (newsSortKey.value === 'title') {
      valA = (a.judul || '').toLowerCase();
      valB = (b.judul || '').toLowerCase();
    } else if (newsSortKey.value === 'category') {
      valA = (a.kategori || '').toLowerCase();
      valB = (b.kategori || '').toLowerCase();
    } else if (newsSortKey.value === 'author') {
      valA = (a.penulis || '').toLowerCase();
      valB = (b.penulis || '').toLowerCase();
    } else if (newsSortKey.value === 'views') {
      return newsSortOrder.value === 'asc'
        ? (a.views || 0) - (b.views || 0)
        : (b.views || 0) - (a.views || 0);
    } else if (newsSortKey.value === 'status') {
      valA = (a.status || '').toLowerCase();
      valB = (b.status || '').toLowerCase();
    } else if (newsSortKey.value === 'updated_at') {
      const timeA = a.updated_at ? new Date(a.updated_at).getTime() : (a.created_at ? new Date(a.created_at).getTime() : 0);
      const timeB = b.updated_at ? new Date(b.updated_at).getTime() : (b.created_at ? new Date(b.created_at).getTime() : 0);
      return newsSortOrder.value === 'asc' ? timeA - timeB : timeB - timeA;
    }

    return newsSortOrder.value === 'asc'
      ? valA.localeCompare(valB)
      : valB.localeCompare(valA);
  });
});

const newsPage = ref(1);
const newsPerPage = ref(20);

const totalNewsPages = computed(() => {
  return Math.ceil(filteredNews.value.length / newsPerPage.value) || 1;
});

const newsStartIndex = computed(() => {
  return (newsPage.value - 1) * newsPerPage.value;
});

const paginatedNews = computed(() => {
  const start = newsStartIndex.value;
  return filteredNews.value.slice(start, start + newsPerPage.value);
});

const visibleNewsPages = computed(() => {
  const total = totalNewsPages.value;
  const current = newsPage.value;
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 4) {
    return [1, 2, 3, 4, 5, '...', total];
  }
  if (current >= total - 3) {
    return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
  }
  return [1, '...', current - 1, current, current + 1, '...', total];
});

const goToNewsPage = (p: number | string) => {
  if (typeof p === 'number' && p >= 1 && p <= totalNewsPages.value) {
    newsPage.value = p;
  }
};

watch(newsSearchQuery, () => {
  newsPage.value = 1;
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
  showPassword.value = false;
  userForm.value = {
    id: 0,
    name: '',
    email: '',
    password: '',
    role: activeUserTab.value,
    is_verified: 0,
    phone: '',
    provinsi: '',
    kota_kab: '',
    kecamatan: '',
    kelurahan: '',
    alamat: ''
  };
  
  userSelectedProv.value = null;
  clearUserRegencies();
  showUserModal.value = true;
};

const openUserEditModal = async (u: any) => {
  isEditingUser.value = true;
  showPassword.value = false;
  userForm.value = {
    id: u.id,
    name: u.name || '',
    email: u.email || '',
    password: '',
    role: u.role || 'member',
    is_verified: u.is_verified || 0,
    phone: u.phone || '',
    provinsi: u.provinsi || '',
    kota_kab: u.kota_kab || '',
    kecamatan: u.kecamatan || '',
    kelurahan: u.kelurahan || '',
    alamat: u.alamat || ''
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

const passwordStrength = computed(() => {
  const pwd = userForm.value.password || '';
  if (!pwd) return { score: 0, label: '', color: '', barColor: '', percent: '0%' };

  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;

  if (score <= 1) {
    return { score, label: 'Weak (Lemah)', color: 'text-red-500', barColor: 'bg-red-500', percent: '33%' };
  } else if (score <= 3) {
    return { score, label: 'Moderate (Sedang)', color: 'text-amber-500', barColor: 'bg-amber-500', percent: '66%' };
  } else {
    return { score, label: 'Strong (Sangat Kuat)', color: 'text-emerald-600', barColor: 'bg-emerald-500', percent: '100%' };
  }
});

const validateUserPassword = (pwd: string): { valid: boolean; message: string } => {
  if (pwd.length < 8) {
    return { valid: false, message: 'Password minimal 8 karakter!' };
  }
  if (!/[A-Z]/.test(pwd)) {
    return { valid: false, message: 'Password harus mengandung minimal 1 huruf kapital (A-Z)!' };
  }
  if (!/[0-9]/.test(pwd)) {
    return { valid: false, message: 'Password harus mengandung minimal 1 angka (0-9)!' };
  }
  if (!/[^A-Za-z0-9]/.test(pwd)) {
    return { valid: false, message: 'Password harus mengandung minimal 1 simbol / karakter khusus (!@#$%^&*)!' };
  }
  return { valid: true, message: '' };
};

const saveUser = async () => {
  if (!userForm.value.name || !userForm.value.email) {
    Swal.fire('Error', 'Nama dan Email harus diisi!', 'error');
    return;
  }

  if (!isEditingUser.value && !userForm.value.password) {
    Swal.fire('Error', 'Password wajib diisi untuk pengguna baru!', 'error');
    return;
  }

  if (userForm.value.password) {
    const pwdCheck = validateUserPassword(userForm.value.password);
    if (!pwdCheck.valid) {
      Swal.fire('Password Tidak Memenuhi Syarat', pwdCheck.message, 'warning');
      return;
    }
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
        is_verified: Number(userForm.value.is_verified),
        phone: userForm.value.phone,
        provinsi: userForm.value.provinsi,
        kota_kab: userForm.value.kota_kab,
        kecamatan: userForm.value.kecamatan,
        kelurahan: userForm.value.kelurahan,
        alamat: userForm.value.alamat
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


const openEditNewsModal = (item: any) => {
  const catObj = categories.value.find((c: any) => (c.name || '').toLowerCase() === (item.kategori || '').toLowerCase());
  const itemImages = item.images && Array.isArray(item.images) ? [...item.images] : [];
  const itemCaptions = item.image_captions && Array.isArray(item.image_captions) ? [...item.image_captions] : [];
  while (itemCaptions.length < itemImages.length) {
    itemCaptions.push('');
  }

  newsForm.value = {
    id: item.id,
    title: item.judul || '',
    category_id: catObj ? (catObj.ID || catObj.id) : (item.category_id || 0),
    status: item.status || 'published',
    content: item.konten || '',
    images: itemImages,
    image_captions: itemCaptions
  };
  showNewsEditModal.value = true;
};

const closeNewsEditModal = () => {
  showNewsEditModal.value = false;
};

const triggerNewsImageUpload = () => {
  if (editNewsImageInputRef.value) {
    editNewsImageInputRef.value.click();
  }
};

const handleEditNewsFileSelect = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (input.files) {
    processEditNewsFiles(input.files);
  }
};

const processEditNewsFiles = async (files: FileList | File[]) => {
  const allowedMime = ['image/jpeg', 'image/png', 'image/webp'];
  const maxBytes = 5 * 1024 * 1024;

  for (const file of Array.from(files)) {
    if (!allowedMime.includes(file.type)) {
      Swal.fire('Format Tidak Didukung', `Berkas "${file.name}" harus berupa JPG, PNG, atau WEBP.`, 'error');
      continue;
    }
    if (file.size > maxBytes) {
      Swal.fire('Berkas Terlalu Besar', `Berkas "${file.name}" melebihi ukuran maksimum 5 MB.`, 'error');
      continue;
    }
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          newsForm.value.images.push(e.target.result as string);
          newsForm.value.image_captions.push('');
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Failed to read image file:', err);
    }
  }
};

const removeNewsImage = (index: number) => {
  newsForm.value.images.splice(index, 1);
  newsForm.value.image_captions.splice(index, 1);
};

const saveNewsEdit = async () => {
  if (!newsForm.value.title || !newsForm.value.content) {
    Swal.fire('Error', 'Judul dan Konten berita wajib diisi!', 'error');
    return;
  }

  try {
    const res = await fetch(`http://localhost:8080/api/v1/news/${newsForm.value.id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({
        title: newsForm.value.title,
        content: newsForm.value.content,
        category_id: Number(newsForm.value.category_id),
        status: newsForm.value.status,
        images: newsForm.value.images,
        image_captions: newsForm.value.image_captions
      })
    });
    const data = await res.json();
    if (data.success) {
      Swal.fire('Berhasil', 'Artikel berita berhasil diperbarui!', 'success');
      showNewsEditModal.value = false;
      fetchNews();
      fetchStats();
    } else {
      Swal.fire('Gagal', data.message || 'Gagal merubah artikel berita', 'error');
    }
  } catch (err) {
    Swal.fire('Error', 'Gagal terhubung ke server', 'error');
  }
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


const fetchIklan = async () => {
  try {
    const res = await fetch('http://localhost:8080/api/v1/ads', {
      headers: getHeaders()
    });
    const data = await res.json();
    if (data.success) {
      iklanList.value = data.data || [];
    }
  } catch (err) {
    console.error('Error fetching ads:', err);
  }
};

const openIklanCreateModal = () => {
  isEditingIklan.value = false;
  iklanImageMode.value = 'url';
  iklanForm.value = {
    id: 0,
    name: '',
    slot: 'header_top',
    image_url: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=600',
    redirect_url: 'https://pasuruaninfo.com/promo',
    status: 'Aktif'
  };
  showIklanModal.value = true;
};

const openIklanEditModal = (ad: any) => {
  isEditingIklan.value = true;
  const img = ad.image_url || ad.image || '';
  iklanImageMode.value = img.startsWith('data:') ? 'upload' : 'url';
  iklanForm.value = {
    id: ad.id,
    name: ad.title || ad.name || '',
    slot: ad.slot || 'header_top',
    image_url: img,
    redirect_url: ad.redirect_url || ad.url || '',
    status: ad.status || 'Aktif'
  };
  showIklanModal.value = true;
};

const closeIklanModal = () => {
  showIklanModal.value = false;
};

const handleIklanFileUpload = async (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const allowedMime = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedMime.includes(file.type)) {
      Swal.fire('Format Tidak Didukung', 'Berkas harus berupa JPG, PNG, atau WEBP.', 'error');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      Swal.fire('Berkas Terlalu Besar', 'Ukuran gambar maksimal 5 MB.', 'error');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          iklanForm.value.image_url = ev.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Failed to read ad image file:', err);
    }
  }
};

const saveIklanCampaign = async () => {
  if (!iklanForm.value.name || !iklanForm.value.image_url) {
    Swal.fire('Error', 'Nama Iklan dan Gambar Banner wajib diisi!', 'error');
    return;
  }

  const payload = {
    title: iklanForm.value.name,
    slot: iklanForm.value.slot,
    image_url: iklanForm.value.image_url,
    redirect_url: iklanForm.value.redirect_url,
    status: iklanForm.value.status
  };

  const url = isEditingIklan.value 
    ? `http://localhost:8080/api/v1/ads/${iklanForm.value.id}`
    : 'http://localhost:8080/api/v1/ads';
  const method = isEditingIklan.value ? 'PUT' : 'POST';

  try {
    const res = await fetch(url, {
      method,
      headers: getHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (data.success) {
      Swal.fire('Berhasil', isEditingIklan.value ? 'Iklan berhasil diperbarui!' : 'Iklan baru berhasil ditambahkan!', 'success');
      showIklanModal.value = false;
      fetchIklan();
      fetchStats();
    } else {
      Swal.fire('Gagal', data.message || 'Gagal menyimpan iklan', 'error');
    }
  } catch (err) {
    Swal.fire('Error', 'Gagal terhubung ke server', 'error');
  }
};

const deleteIklan = async (id: number) => {
  Swal.fire({
    title: 'Hapus Iklan?',
    text: 'Aksi ini akan menghapus penempatan iklan terpilih secara permanen.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Ya, Hapus!',
    cancelButtonText: 'Batal'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:8080/api/v1/ads/${id}`, {
          method: 'DELETE',
          headers: getHeaders()
        });
        const data = await res.json();
        if (data.success) {
          Swal.fire('Terhapus', 'Penempatan iklan berhasil dihapus.', 'success');
          fetchIklan();
          fetchStats();
        } else {
          Swal.fire('Gagal', data.message || 'Gagal menghapus iklan', 'error');
        }
      } catch (err) {
        Swal.fire('Error', 'Gagal memproses penghapusan iklan', 'error');
      }
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
  fetchIklan();

  fetchStats();
  fetchUsers();
  fetchCategories();
  fetchNews();
});
</script>

<style scoped>
input[type="password"]::-ms-reveal,
input[type="password"]::-ms-clear {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}
</style>

