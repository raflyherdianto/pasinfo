<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900 selection:bg-blue-200">
    <Navbar />
    
    <main class="flex-grow pt-24 pb-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <RouterView />
    </main>
    <footer class="bg-gray-900 text-gray-300 py-16 mt-auto border-t border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12 border-b border-gray-800 pb-12">
          
          <div class="md:col-span-4">
            <div class="flex items-center mb-6">
              <img src="/logo.webp" alt="Pasinfo Logo" class="h-14 w-auto object-contain brightness-0 invert" />
            </div>
            <p class="text-sm text-gray-400 leading-relaxed max-w-sm">
              Portal informasi digital yang menyajikan berita terkini dan terpercaya seputar Pasuruan, meliputi peristiwa, cek fakta, ekonomi, pemerintahan, hiburan, kuliner, gaya hidup, pariwisata, serta dinamika lokal yang relevan bagi masyarakat.
            </p>
          </div>

          <div class="md:col-span-4">
            <h3 class="text-lg font-bold text-white mb-6">Ikuti Kami</h3>
            <div class="flex flex-wrap gap-3">
              <a href="https://wa.me/6285161618669" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-green-600 transition-all duration-300">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.004 0C5.378 0 0 5.378 0 12.004c0 2.112.551 4.17 1.595 5.978L0 24l6.195-1.625c1.748.954 3.71 1.458 5.706 1.458C18.526 23.833 24 18.455 24 11.83 23.997 5.378 18.623 0 12.004 0zm0 21.84c-1.892 0-3.748-.48-5.385-1.39l-.386-.217-3.633.954.97-3.535-.239-.38C2.392 15.65 1.83 13.805 1.83 11.905c0-5.61 4.567-10.177 10.18-10.177 2.701 0 5.242 1.053 7.153 2.966a10.088 10.088 0 0 1 2.963 7.172c-.005 5.61-4.57 10.174-10.122 10.174zM17.56 14.5c-.35-.175-2.07-.975-2.39-1.09-.32-.11-.55-.17-.78.17-.23.35-.9.99-1.1 1.22-.2.23-.4.26-.75.09-3.67-1.83-5.28-2.69-6.54-4.85-.3-1.02.3-1.01.86-2 .1-.21.05-.4-.03-.57-.08-.18-.78-1.89-1.07-2.59-.28-.68-.57-.59-.78-.6-.2-.01-.44-.01-.67-.01-.23 0-.61.09-.93.43-.32.35-1.22 1.19-1.22 2.9 0 1.71 1.25 3.37 1.42 3.6 1.39 1.86 3.37 3.36 5.73 4.26 1.14.44 2.07.71 2.78.93 1.14.36 2.17.31 2.99.19.91-.14 2.07-.84 2.36-1.61.29-.77.29-1.42.2-1.6-.09-.17-.32-.29-.67-.46z"/></svg>
              </a>
              <a href="https://www.instagram.com/pasuruaninfo" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-pink-600 transition-all duration-300">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://tiktok.com/@pasuruan_info" target="_blank" rel="noopener noreferrer" aria-label="TikTok" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-black transition-all duration-300">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.02 1.59 4.23.94 1.18 2.27 2.01 3.73 2.39v3.9c-1.87-.03-3.66-.72-5.11-1.87-.24-.19-.46-.4-.67-.62v7.14c-.03 2.37-.87 4.67-2.39 6.46-1.57 1.83-3.83 2.94-6.26 3.1-2.43.15-4.83-.56-6.73-2.09-1.92-1.55-3.13-3.83-3.37-6.29-.24-2.45.47-4.93 2-6.85 1.52-1.91 3.82-3.1 6.27-3.3v4.18c-1.12.06-2.18.57-2.92 1.42-.74.84-1.07 1.95-.92 3.06.14 1.11.83 2.08 1.81 2.62.98.54 2.17.54 3.16-.01.99-.55 1.63-1.55 1.72-2.68.04-1.33.02-12.65.02-12.65z"/></svg>
              </a>
              <a href="https://youtube.com/channel/UCLjo8nC_L8yTvH5cC35CSeQ" target="_blank" rel="noopener noreferrer" aria-label="YouTube" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 transition-all duration-300">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://www.twitter.com/pasuruaninfo_" target="_blank" rel="noopener noreferrer" aria-label="Twitter" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-300">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://www.threads.net/@pasuruaninfo" target="_blank" rel="noopener noreferrer" aria-label="Threads" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-300">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 192 192"><path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"/></svg>
              </a>
            </div>
          </div>

          <div class="md:col-span-4">
            <h3 class="text-lg font-bold text-white mb-6">Kontak</h3>
            <ul class="space-y-4 text-sm text-gray-400">
              <li class="flex items-start gap-4 group">
                <div class="bg-gray-800 p-2 rounded-lg group-hover:bg-blue-600/20 group-hover:text-blue-500 transition-colors">
                  <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <span class="mt-1">Jl. KH. Samanhudi No. 29, Bugul Kidul, Kota Pasuruan</span>
              </li>
              <li class="flex items-center gap-4 group">
                <div class="bg-gray-800 p-2 rounded-lg group-hover:bg-green-600/20 group-hover:text-green-500 transition-colors">
                  <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                </div>
                <a href="https://wa.me/6285161618669" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">0851-6161-8669</a>
              </li>
              <li class="flex items-center gap-4 group">
                <div class="bg-gray-800 p-2 rounded-lg group-hover:bg-blue-600/20 group-hover:text-blue-500 transition-colors">
                  <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <a href="mailto:pasuruaninfo93@gmail.com" class="hover:text-white transition-colors">pasuruaninfo93@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>
        
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div>
            &copy; {{ new Date().getFullYear() }} Pasuruan Info. All rights reserved.
          </div>
          <div class="flex gap-6">
            <a href="#" class="hover:text-white transition-colors">Kebijakan Privasi</a>
            <a href="#" class="hover:text-white transition-colors">Syarat & Ketentuan</a>
            <a href="#" class="hover:text-white transition-colors">Redaksi</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
