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
          <div class="flex justify-between items-center mb-1">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <span v-if="isEmailVerified" class="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <svg class="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              Email Terverifikasi
            </span>
          </div>

          <div class="flex gap-2">
            <input 
              id="email" 
              v-model="email"
              type="email" 
              required 
              :disabled="isEmailVerified"
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm disabled:bg-gray-100 disabled:text-gray-500" 
              placeholder="Masukkan email"
              @input="onEmailChange"
            >
            <button 
              v-if="!isEmailVerified"
              type="button" 
              @click="handleSendEmailOTP"
              :disabled="isSendingOTP || !email"
              class="flex-shrink-0 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 rounded-md transition-colors shadow-sm focus:outline-none"
            >
              <span v-if="isSendingOTP">Mengirim...</span>
              <span v-else-if="otpSent">Kirim Ulang</span>
              <span v-else>Verifikasi</span>
            </button>
            <button 
              v-else
              type="button" 
              @click="handleChangeEmail"
              class="flex-shrink-0 px-3 py-2 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors focus:outline-none"
            >
              Ubah
            </button>
          </div>

          <!-- Section Input OTP Verifikasi Email -->
          <div v-if="otpSent && !isEmailVerified" class="mt-3 p-3 bg-blue-50/70 border border-blue-200 rounded-lg space-y-2">
            <div class="flex justify-between items-center">
              <label for="reg_otp" class="block text-xs font-bold text-blue-900">Masukkan 6 Digit Kode OTP dari Email:</label>
              <span class="text-[11px] text-blue-600 font-medium">Berlaku 5 menit</span>
            </div>
            <div class="flex gap-2">
              <input 
                id="reg_otp" 
                v-model="otpCode"
                type="text" 
                maxlength="6"
                placeholder="000000"
                class="w-full px-3 py-1.5 text-center font-mono font-bold tracking-widest text-sm bg-white border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
              <button 
                type="button" 
                @click="handleVerifyEmailOTP"
                :disabled="isVerifyingOTP || otpCode.length < 6"
                class="flex-shrink-0 px-4 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 rounded-md transition-colors shadow-sm focus:outline-none"
              >
                <span v-if="isVerifyingOTP">Memeriksa...</span>
                <span v-else>Verifikasi OTP</span>
              </button>
            </div>
          </div>
        </div>

        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700">Nomor Telepon</label>
          <input 
            id="phone" 
            v-model="phone"
            type="tel" 
            required 
            class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" 
            placeholder="081234567890"
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
          <label for="password" class="block text-sm font-semibold text-gray-700 mb-1">Password</label>
          <div class="relative">
            <input 
              id="password" 
              v-model="password"
              :type="showPassword ? 'text' : 'password'" 
              required 
              class="w-full px-3.5 py-2 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Masukkan password aman"
            >
            <button 
              type="button" 
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1"
              :title="showPassword ? 'Sembunyikan password' : 'Tampilkan password'"
            >
              <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.03 10.03 0 013.982-.863c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18"/>
              </svg>
            </button>
          </div>
          <div v-if="password" class="mt-2 space-y-1">
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
          <label for="confirm_password" class="block text-sm font-semibold text-gray-700 mb-1">Konfirmasi Password</label>
          <div class="relative">
            <input 
              id="confirm_password" 
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'" 
              required 
              class="w-full px-3.5 py-2 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all"
              :class="{
                'border-emerald-500 focus:ring-emerald-500 focus:border-emerald-500 bg-emerald-50/20': passwordMatch === true,
                'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50/20': passwordMatch === false
              }"
              placeholder="Ulangi password"
            >
            <button 
              type="button" 
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1"
              :title="showConfirmPassword ? 'Sembunyikan password' : 'Tampilkan password'"
            >
              <svg v-if="!showConfirmPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.03 10.03 0 013.982-.863c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18"/>
              </svg>
            </button>
          </div>
          <div v-if="confirmPassword" class="mt-1.5">
            <p v-if="passwordMatch" class="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Password cocok!</span>
            </p>
            <p v-else class="text-xs font-semibold text-red-600 flex items-center gap-1">
              <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              <span>Password tidak cocok. Silakan periksa kembali.</span>
            </p>
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
            :disabled="isLoading || !isVerified || !isEmailVerified || passwordMatch === false"
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
import { ref, computed, onMounted } from 'vue';
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

// Email OTP verification states
const isEmailVerified = ref(false);
const otpSent = ref(false);
const otpCode = ref('');
const isSendingOTP = ref(false);
const isVerifyingOTP = ref(false);

const onEmailChange = () => {
  isEmailVerified.value = false;
  otpSent.value = false;
  otpCode.value = '';
};

const handleChangeEmail = () => {
  isEmailVerified.value = false;
  otpSent.value = false;
  otpCode.value = '';
};

const handleSendEmailOTP = async () => {
  if (!email.value) return;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    Swal.fire({
      icon: 'error',
      title: 'Format Email Tidak Valid',
      text: 'Mohon masukkan format email yang benar.',
      confirmButtonColor: '#2563eb'
    });
    return;
  }

  isSendingOTP.value = true;
  try {
    const response = await axios.post('http://localhost:8080/api/v1/auth/send-register-otp', {
      email: email.value,
      name: nama.value || 'Calon Penulis'
    });

    if (response.data.success) {
      Swal.fire({
        icon: 'success',
        title: 'Kode OTP Terkirim',
        text: response.data.message || 'Kode OTP telah dikirimkan ke email Anda (berlaku 5 menit). Silakan periksa inbox atau spam.',
        confirmButtonColor: '#2563eb'
      });
      otpSent.value = true;
    }
  } catch (error: any) {
    if (error.response?.data?.active_otp_exists || error.response?.status === 429) {
      Swal.fire({
        icon: 'info',
        title: 'Mohon Tunggu',
        text: error.response?.data?.message || 'Kode OTP sebelumnya masih aktif. Mohon tunggu sebelum meminta kode baru.',
        confirmButtonColor: '#2563eb'
      });
      otpSent.value = true;
    } else {
      const msg = error.response?.data?.message || 'Gagal mengirim kode OTP. Silakan periksa email Anda.';
      Swal.fire({
        icon: 'error',
        title: 'Gagal Mengirim OTP',
        text: msg,
        confirmButtonColor: '#2563eb'
      });
    }
  } finally {
    isSendingOTP.value = false;
  }
};

const handleVerifyEmailOTP = async () => {
  if (!otpCode.value || otpCode.value.length < 6) return;
  isVerifyingOTP.value = true;

  try {
    const response = await axios.post('http://localhost:8080/api/v1/auth/verify-otp', {
      email: email.value,
      otp: otpCode.value
    });

    if (response.data.success) {
      Swal.fire({
        icon: 'success',
        title: 'Email Terverifikasi!',
        text: 'Email Anda telah berhasil diverifikasi. Silakan lengkapi formulir pendaftaran.',
        confirmButtonColor: '#2563eb'
      });
      isEmailVerified.value = true;
    }
  } catch (error: any) {
    const msg = error.response?.data?.message || 'Kode OTP tidak valid atau telah kadaluwarsa.';
    Swal.fire({
      icon: 'error',
      title: 'Verifikasi Gagal',
      text: msg,
      confirmButtonColor: '#2563eb'
    });
  } finally {
    isVerifyingOTP.value = false;
  }
};

const passwordStrength = computed(() => {
  const pwd = password.value;
  if (!pwd) return { label: '', color: '', barColor: '', percent: '0%' };
  
  let score = 0;
  if (pwd.length >= 8) score += 1;
  if (/[A-Z]/.test(pwd)) score += 1;
  if (/[0-9]/.test(pwd)) score += 1;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) score += 1;

  if (score <= 1) {
    return { label: 'Sangat Lemah', color: 'text-red-600', barColor: 'bg-red-500', percent: '25%' };
  } else if (score === 2) {
    return { label: 'Lemah', color: 'text-amber-600', barColor: 'bg-amber-500', percent: '50%' };
  } else if (score === 3) {
    return { label: 'Sedang', color: 'text-blue-600', barColor: 'bg-blue-500', percent: '75%' };
  } else {
    return { label: 'Kuat', color: 'text-emerald-600', barColor: 'bg-emerald-500', percent: '100%' };
  }
});

const passwordMatch = computed(() => {
  if (!confirmPassword.value) return null;
  return password.value === confirmPassword.value;
});


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
  if (!isEmailVerified.value) {
    Swal.fire({
      icon: 'warning',
      title: 'Email Belum Terverifikasi',
      text: 'Silakan klik tombol Verifikasi pada kolom Email dan masukkan kode OTP terlebih dahulu!',
      confirmButtonColor: '#2563eb'
    });
    return;
  }

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
      let timerInterval: any;
      Swal.fire({
        icon: 'success',
        title: 'Registrasi Penulis Berhasil!',
        html: 'Akun Penulis Anda telah aktif dan siap digunakan.<br>Mengarahkan ke halaman <b>Login Penulis</b> dalam <b style="color: #2563eb; font-size: 1.1em;">5</b> detik...',
        timer: 5000,
        timerProgressBar: true,
        confirmButtonText: 'Masuk Sekarang',
        confirmButtonColor: '#2563eb',
        allowOutsideClick: false,
        didOpen: () => {
          const timerEl = Swal.getHtmlContainer()?.querySelector('b:last-of-type');
          timerInterval = setInterval(() => {
            if (timerEl) {
              const remaining = Math.ceil((Swal.getTimerLeft() || 0) / 1000);
              timerEl.textContent = remaining.toString();
            }
          }, 250);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
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
