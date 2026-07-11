<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <div class="text-center">
        <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">Daftar Akun Penulis</h1>
        <p class="mt-2 text-sm text-gray-600">Gabung bersama redaksi Pasinfo untuk membagikan berita menarik.</p>
      </div>
      
      <form class="mt-8 space-y-5" @submit.prevent="handleRegister">
        <div>
          <label for="nama" class="block text-sm font-medium text-gray-700">Nama Lengkap</label>
          <input 
            id="nama" 
            v-model="nama"
            type="text" 
            required 
            class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" 
            placeholder="Masukkan nama lengkap"
          >
        </div>
        
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input 
            id="email" 
            v-model="email"
            type="email" 
            required 
            class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" 
            placeholder="Masukkan email"
          >
        </div>

        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700">Nomor Telepon</label>
          <input 
            id="phone" 
            v-model="phone"
            type="tel" 
            required 
            class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" 
            placeholder="Masukkan nomor telepon"
          >
        </div>

        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Provinsi</label>
            <v-select 
              v-model="selectedProv" 
              :options="provinces" 
              label="name" 
              placeholder="Pilih Provinsi"
              @update:modelValue="onProvChange"
            ></v-select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Kota/Kabupaten</label>
            <v-select 
              v-model="selectedRegency" 
              :options="regencies" 
              label="name" 
              placeholder="Pilih Kota/Kabupaten"
              :disabled="!selectedProv"
              @update:modelValue="onRegencyChange"
            ></v-select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Kecamatan</label>
            <v-select 
              v-model="selectedDistrict" 
              :options="districts" 
              label="name" 
              placeholder="Pilih Kecamatan"
              :disabled="!selectedRegency"
              @update:modelValue="onDistrictChange"
            ></v-select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Desa/Kelurahan</label>
            <v-select 
              v-model="selectedVillage" 
              :options="villages" 
              label="name" 
              placeholder="Pilih Desa/Kelurahan"
              :disabled="!selectedDistrict"
              @update:modelValue="onVillageChange"
            ></v-select>
          </div>
        </div>

        
        <div>
          <label for="alamat" class="block text-sm font-medium text-gray-700">Alamat Lengkap</label>
          <textarea 
            id="alamat" 
            v-model="alamat"
            required 
            rows="3"
            class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" 
            placeholder="Jalan, RT/RW, Dusun..."
          ></textarea>
        </div>
        
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <div class="mt-1 relative">
            <input 
              id="password" 
              v-model="password"
              :type="showPassword ? 'text' : 'password'" 
              required 
              class="appearance-none block w-full pr-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Minimal 6 karakter"
            >
            <button 
              type="button" 
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <i class="fas" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
            </button>
          </div>
        </div>
        
        <div>
          <label for="confirm_password" class="block text-sm font-medium text-gray-700">Konfirmasi Password</label>
          <div class="mt-1 relative">
            <input 
              id="confirm_password" 
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'" 
              required 
              class="appearance-none block w-full pr-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Ulangi password"
            >
            <button 
              type="button" 
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <i class="fas" :class="showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
            </button>
          </div>
        </div>

        
        <div class="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
          <div class="flex justify-between items-center mb-1">
            <label class="block text-sm font-semibold text-gray-700">Verifikasi Keamanan</label>
            <button 
              type="button" 
              @click="initCaptcha" 
              class="text-xs text-blue-600 hover:text-blue-800 transition-colors flex items-center space-x-1" 
              :disabled="isVerified"
            >
              <i class="fas fa-sync-alt"></i> <span>Refresh</span>
            </button>
          </div>
          
          <div class="relative overflow-hidden rounded-lg bg-gray-200" style="width: 280px; height: 140px; margin: 0 auto;">
            <canvas ref="mainCanvasRef" width="280" height="140" class="block"></canvas>
            <canvas 
              ref="blockCanvasRef" 
              width="280" 
              height="140" 
              class="absolute top-0 left-0 pointer-events-none"
              :style="{ transform: 'translateX(' + dragX + 'px)' }"
            ></canvas>

            <div v-if="isVerified" class="absolute inset-0 bg-green-500 bg-opacity-90 flex flex-col items-center justify-center text-white font-bold text-sm">
              <i class="fas fa-check-circle text-3xl mb-1 animate-bounce"></i>
              Verifikasi Berhasil!
            </div>
          </div>

          <div 
            ref="trackRef" 
            class="relative w-full h-8 bg-gray-200 rounded-lg border border-gray-300 overflow-hidden select-none flex items-center justify-center mt-2"
          >
            <span class="text-xs text-gray-400 font-medium pointer-events-none">
              {{ isVerified ? 'Verifikasi Sukses' : 'Geser puzzle ke posisinya' }}
            </span>
            <div 
              @mousedown="startDrag"
              @touchstart="startDrag"
              class="absolute left-0 top-0 h-full w-10 bg-white border border-gray-300 rounded-lg shadow-sm flex items-center justify-center cursor-grab active:cursor-grabbing hover:bg-gray-50"
              :class="{ 'pointer-events-none bg-green-50 border-green-300 text-green-600': isVerified }"
              :style="{ left: sliderX + 'px' }"
            >
              <i class="fas" :class="isVerified ? 'fa-check text-green-600' : 'fa-chevron-right text-gray-400'"></i>
            </div>
          </div>
        </div>
        
        <div class="pt-2">
          <button 
            type="submit" 
            :disabled="isLoading || !isVerified"
            class="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-blue-400"
          >
            <span v-if="isLoading">Mendaftar...</span>
            <span v-else>Daftar Penulis</span>
          </button>
        </div>
      </form>
      
      <div class="text-center text-sm text-gray-600 mt-4">
        Sudah punya akun? 
        <router-link to="/login-penulis" class="font-medium text-blue-600 hover:text-blue-500 transition-colors">
          Login disini
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import Swal from 'sweetalert2';

const router = useRouter();

const nama = ref('');
const email = ref('');
const phone = ref('');
const alamat = ref('');
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isLoading = ref(false);


const isVerified = ref(false);
const sliderX = ref(0);
const dragX = ref(0);
const isDragging = ref(false);
const targetX = ref(0);
const mainCanvasRef = ref<HTMLCanvasElement | null>(null);
const blockCanvasRef = ref<HTMLCanvasElement | null>(null);
const trackRef = ref<HTMLElement | null>(null);
let startX = 0;

const drawPuzzlePath = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
  const w = 40;
  ctx.beginPath();
  ctx.moveTo(x, y);
  

  ctx.lineTo(x + w / 2 - r, y);
  ctx.arc(x + w / 2, y, r, Math.PI, 0, false);
  ctx.lineTo(x + w, y);
  

  ctx.lineTo(x + w, y + w / 2 - r);
  ctx.arc(x + w, y + w / 2, r, -Math.PI / 2, Math.PI / 2, false);
  ctx.lineTo(x + w, y + w);
  

  ctx.lineTo(x + w / 2 + r, y + w);
  ctx.arc(x + w / 2, y + w, r, 0, Math.PI, false);
  ctx.lineTo(x, y + w);
  

  ctx.lineTo(x, y + w / 2 + r);
  ctx.arc(x, y + w / 2, r, Math.PI / 2, -Math.PI / 2, true);
  ctx.lineTo(x, y);
  ctx.closePath();
};

const initCaptcha = () => {
  isVerified.value = false;
  sliderX.value = 0;
  dragX.value = 0;

  const canvas = mainCanvasRef.value;
  const block = blockCanvasRef.value;
  if (!canvas || !block) return;

  const ctx = canvas.getContext('2d');
  const bCtx = block.getContext('2d');
  if (!ctx || !bCtx) return;

  ctx.clearRect(0, 0, 280, 140);
  bCtx.clearRect(0, 0, 280, 140);


  const grad = ctx.createLinearGradient(0, 0, 280, 140);
  const colors = [
    ['#3B82F6', '#EF4444'],
    ['#10B981', '#F59E0B'],
    ['#8B5CF6', '#EC4899'],
    ['#F97316', '#14B8A6']
  ];
  const selectedColors = colors[Math.floor(Math.random() * colors.length)];
  grad.addColorStop(0, selectedColors[0]);
  grad.addColorStop(1, selectedColors[1]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 280, 140);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  for (let i = 0; i < 15; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * 280, Math.random() * 140, Math.random() * 30 + 10, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  for (let i = 0; i < 10; i++) {
    ctx.fillRect(Math.random() * 280, Math.random() * 140, Math.random() * 40 + 20, Math.random() * 40 + 20);
  }

  targetX.value = Math.floor(Math.random() * (220 - 80) + 80);
  const tY = Math.floor(Math.random() * (80 - 20) + 20);

  bCtx.save();
  drawPuzzlePath(bCtx, targetX.value, tY, 8);
  bCtx.clip();
  bCtx.drawImage(canvas, 0, 0);
  bCtx.restore();

  const imageData = bCtx.getImageData(targetX.value, tY - 10, 60, 60);
  bCtx.clearRect(0, 0, 280, 140);
  bCtx.putImageData(imageData, 10, tY - 10);

  ctx.save();
  drawPuzzlePath(ctx, targetX.value, tY, 8);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.restore();
};

const startDrag = (e: MouseEvent | TouchEvent) => {
  if (isVerified.value) return;
  isDragging.value = true;
  startX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
  
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', endDrag);
  document.addEventListener('touchmove', onDrag);
  document.addEventListener('touchend', endDrag);
};

const onDrag = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value || !trackRef.value) return;
  const currentX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
  const deltaX = currentX - startX;
  const maxDrag = trackRef.value.clientWidth - 40;
  
  let newPos = deltaX;
  if (newPos < 0) newPos = 0;
  if (newPos > maxDrag) newPos = maxDrag;
  
  sliderX.value = newPos;
  dragX.value = newPos;
};

const endDrag = () => {
  if (!isDragging.value) return;
  isDragging.value = false;
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', endDrag);
  document.removeEventListener('touchmove', onDrag);
  document.removeEventListener('touchend', endDrag);
  
  const diff = Math.abs(sliderX.value - (targetX.value - 10));
  if (diff <= 5) {
    isVerified.value = true;
    sliderX.value = targetX.value - 10;
    dragX.value = targetX.value - 10;
  } else {
    sliderX.value = 0;
    dragX.value = 0;
    initCaptcha();
  }
};


const provinces = ref([]);
const regencies = ref([]);
const districts = ref([]);
const villages = ref([]);

const selectedProv = ref<any>(null);
const selectedRegency = ref<any>(null);
const selectedDistrict = ref<any>(null);
const selectedVillage = ref<any>(null);

const formLokasi = ref({
  provinsi: '',
  kota: '',
  kecamatan: '',
  desa: ''
});

onMounted(async () => {
  initCaptcha();
  try {
    const response = await axios.get('http://localhost:8080/api/v1/wilayah/provinces');
    provinces.value = response.data.data;
  } catch (err) {
    console.error('Error fetching provinces:', err);
  }
});

const onProvChange = async (val: any) => {
  clearRegencies()
  if (val && val.code) {
    formLokasi.value.provinsi = val.name
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/wilayah/regencies/${val.code}`);
      regencies.value = response.data.data;
    } catch (err) {
      console.error('Error fetching regencies:', err);
    }
  } else {
    formLokasi.value.provinsi = '';
  }
}

const onRegencyChange = async (val: any) => {
  clearDistricts()
  if (val && val.code) {
    formLokasi.value.kota = val.name
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/wilayah/districts/${val.code}`);
      districts.value = response.data.data;
    } catch (err) {
      console.error('Error fetching districts:', err);
    }
  } else {
    formLokasi.value.kota = '';
  }
}

const onDistrictChange = async (val: any) => {
  clearVillages()
  if (val && val.code) {
    formLokasi.value.kecamatan = val.name
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/wilayah/villages/${val.code}`);
      villages.value = response.data.data;
    } catch (err) {
      console.error('Error fetching villages:', err);
    }
  } else {
    formLokasi.value.kecamatan = '';
  }
}

const onVillageChange = (val: any) => {
  if (val && val.name) {
    formLokasi.value.desa = val.name
  } else {
    formLokasi.value.desa = '';
  }
}

const clearRegencies = () => {
  selectedRegency.value = null;
  formLokasi.value.kota = '';
  regencies.value = [];
  clearDistricts();
}

const clearDistricts = () => {
  selectedDistrict.value = null;
  formLokasi.value.kecamatan = '';
  districts.value = [];
  clearVillages();
}

const clearVillages = () => {
  selectedVillage.value = null;
  formLokasi.value.desa = '';
  villages.value = [];
}

const handleRegister = async () => {
  if (!isVerified.value) {
    Swal.fire({
      icon: 'warning',
      title: 'Verifikasi Gagal',
      text: 'Silakan lakukan verifikasi keamanan terlebih dahulu!',
      confirmButtonColor: '#2563eb'
    });
    return;
  }

  if (password.value !== confirmPassword.value) {
    Swal.fire({
      icon: 'error',
      title: 'Kesalahan Validasi',
      text: 'Password konfirmasi tidak cocok!',
      confirmButtonColor: '#2563eb'
    });
    return;
  }
  
  if (password.value.length < 6) {
    Swal.fire({
      icon: 'error',
      title: 'Kesalahan Validasi',
      text: 'Password minimal 6 karakter!',
      confirmButtonColor: '#2563eb'
    });
    return;
  }
  
  isLoading.value = true;
  try {
    const response = await axios.post('http://localhost:8080/api/v1/auth/register', {
      name: nama.value,
      email: email.value,
      phone: phone.value,
      password: password.value,
      role: 'penulis',
      provinsi: formLokasi.value.provinsi,
      kota_kab: formLokasi.value.kota,
      kecamatan: formLokasi.value.kecamatan,
      kelurahan: formLokasi.value.desa,
      alamat: alamat.value,
      is_verified: 1
    });
    
    if (response.data.success) {
      Swal.fire({
        icon: 'success',
        title: 'Registrasi Sukses',
        text: 'Registrasi Penulis berhasil! Silakan masuk.',
        confirmButtonColor: '#2563eb'
      }).then(() => {
        router.push('/login-penulis');
      });
    }
  } catch (error: any) {
    Swal.fire({
      icon: 'error',
      title: 'Registrasi Gagal',
      text: error.response?.data?.message || 'Registrasi gagal, periksa data Anda kembali',
      confirmButtonColor: '#2563eb'
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

<style>
.vs__dropdown-menu {
  z-index: 9999 !important;
}
</style>
