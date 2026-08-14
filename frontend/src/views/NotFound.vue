<template>
  <div class="min-h-[75vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full text-center space-y-6">
      
      <!-- Big 404 Visual Badge -->
      <div class="relative flex justify-center">
        <span class="text-9xl font-black text-gray-200 select-none tracking-tighter">404</span>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-20 h-20 bg-blue-50 border border-blue-100 rounded-3xl flex items-center justify-center shadow-md rotate-6 hover:rotate-0 transition-transform duration-300">
            <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Text Content -->
      <div class="space-y-2">
        <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Halaman Tidak Ditemukan</h1>
        <p class="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
          Maaf, halaman yang Anda tuju tidak ditemukan, telah dihapus, atau alamat URL yang Anda masukkan salah.
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
        <router-link
          to="/"
          class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
          Kembali ke Beranda
        </router-link>

        <router-link
          to="/jelajah"
          class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold text-sm rounded-xl shadow-xs transition-all"
        >
          <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          Jelajah Berita
        </router-link>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
// Page Title set automatically via router.afterEach meta title
</script>
