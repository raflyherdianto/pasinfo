<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      
      <!-- Page Header -->
      <div class="text-center">
        <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Pulihkan Password</h1>
        <p class="mt-2 text-xs sm:text-sm text-gray-500">
          <span v-if="step === 1">Masukkan email terdaftar Anda untuk menerima kode OTP pemulihan.</span>
          <span v-else-if="step === 2">Masukkan 6 digit kode OTP yang telah dikirim ke email <strong>{{ email }}</strong>.</span>
          <span v-else>Buat password baru yang aman untuk akun Anda.</span>
        </p>
      </div>

      <!-- Step Indicators -->
      <div class="flex items-center justify-center gap-2 py-2">
        <div 
          class="flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all"
          :class="step >= 1 ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-100 text-gray-400'"
        >
          1
        </div>
        <div class="w-8 h-0.5" :class="step >= 2 ? 'bg-blue-600' : 'bg-gray-200'"></div>
        <div 
          class="flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all"
          :class="step >= 2 ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-100 text-gray-400'"
        >
          2
        </div>
        <div class="w-8 h-0.5" :class="step >= 3 ? 'bg-blue-600' : 'bg-gray-200'"></div>
        <div 
          class="flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all"
          :class="step >= 3 ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-100 text-gray-400'"
        >
          3
        </div>
      </div>

      <!-- STEP 1: Input Email -->
      <form v-if="step === 1" class="mt-6 space-y-5" @submit.prevent="handleSendOTP">
        <div>
          <label for="email" class="block text-sm font-semibold text-gray-700 mb-1">Email</label>
          <input 
            id="email" 
            v-model="email"
            type="email" 
            required 
            class="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" 
            placeholder="Contoh: user@pasuruaninfo.com"
          >
        </div>

        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-blue-400 shadow-sm"
        >
          <span v-if="isLoading">Sending OTP...</span>
          <span v-else>Kirim Kode OTP</span>
        </button>

        <div class="text-center text-sm text-gray-600 pt-2">
          <router-link to="/login" class="font-medium text-blue-600 hover:text-blue-500 transition-colors inline-flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Kembali ke Login
          </router-link>
        </div>
      </form>

      <!-- STEP 2: Input OTP -->
      <form v-else-if="step === 2" class="mt-6 space-y-5" @submit.prevent="handleVerifyOTP">
        <div>
          <label for="otp" class="block text-sm font-semibold text-gray-700 mb-1">Kode OTP (6 Digit)</label>
          <input 
            id="otp" 
            v-model="otp"
            type="text" 
            maxlength="6"
            required 
            class="w-full px-3.5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center font-mono text-xl tracking-widest uppercase font-bold" 
            placeholder="000000"
          >
          <p class="text-xs text-gray-500 mt-1.5 text-center">
            Tidak menerima email? Periksa folder Spam atau 
            <button type="button" @click="handleSendOTP" :disabled="isLoading" class="text-blue-600 font-semibold hover:underline">Kirim Ulang</button>
          </p>
        </div>

        <div class="flex gap-3">
          <button 
            type="button" 
            @click="step = 1"
            class="w-1/3 py-2.5 px-4 border border-gray-300 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-colors"
          >
            Ubah Email
          </button>
          <button 
            type="submit" 
            :disabled="isLoading || otp.length < 6"
            class="w-2/3 flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-blue-400 shadow-sm"
          >
            <span v-if="isLoading">Memverifikasi...</span>
            <span v-else>Verifikasi OTP</span>
          </button>
        </div>
      </form>

      <!-- STEP 3: Password Baru & Konfirmasi Password (Matching Register.vue logic) -->
      <form v-else class="mt-6 space-y-5" @submit.prevent="handleResetPassword">
        
        <!-- Password Baru -->
        <div>
          <label for="new_password" class="block text-sm font-semibold text-gray-700 mb-1">Password Baru</label>
          <div class="relative">
            <input 
              id="new_password" 
              v-model="newPassword"
              :type="showPassword ? 'text' : 'password'" 
              required 
              class="w-full px-3.5 py-2 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Masukkan password baru yang aman"
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

          <!-- Password Strength Meter -->
          <div v-if="newPassword" class="mt-2 space-y-1">
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

        <!-- Konfirmasi Password -->
        <div>
          <label for="confirm_password" class="block text-sm font-semibold text-gray-700 mb-1">Konfirmasi Password Baru</label>
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
              placeholder="Ulangi password baru"
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

        <button 
          type="submit" 
          :disabled="isLoading || passwordMatch === false || !newPassword"
          class="w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-blue-400 shadow-sm"
        >
          <span v-if="isLoading">Menyimpan Password...</span>
          <span v-else>Simpan Password Baru</span>
        </button>
      </form>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';

const router = useRouter();

const step = ref(1);
const email = ref('');
const otp = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isLoading = ref(false);

const passwordStrength = computed(() => {
  const pwd = newPassword.value;
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
  return newPassword.value === confirmPassword.value;
});

// Step 1: Send OTP
const handleSendOTP = async () => {
  if (!email.value) return;
  isLoading.value = true;

  try {
    const response = await axios.post('http://localhost:8080/api/v1/auth/forgot-password', {
      email: email.value
    });

    if (response.data.success) {
      Swal.fire({
        icon: 'success',
        title: 'Kode OTP Terkirim',
        text: response.data.message || 'Kode OTP telah dikirimkan ke email Anda (berlaku 5 menit). Silakan periksa inbox atau spam.',
        confirmButtonColor: '#2563eb'
      });
      step.value = 2;
    }
  } catch (error: any) {
    if (error.response?.data?.active_otp_exists || error.response?.status === 429) {
      Swal.fire({
        icon: 'info',
        title: 'Mohon Tunggu',
        text: error.response?.data?.message || 'Kode OTP sebelumnya masih aktif. Mohon tunggu sebelum meminta kode baru.',
        showCancelButton: true,
        confirmButtonColor: '#2563eb',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'Masukkan Kode OTP',
        cancelButtonText: 'Tutup'
      }).then((result) => {
        if (result.isConfirmed) {
          step.value = 2;
        }
      });
    } else {
      const msg = error.response?.data?.message || 'Email tidak terdaftar atau terjadi kesalahan sistem.';
      Swal.fire({
        icon: 'error',
        title: 'Gagal Memulihkan Password',
        text: msg,
        confirmButtonColor: '#2563eb'
      });
    }
  } finally {
    isLoading.value = false;
  }
};

// Step 2: Verify OTP
const handleVerifyOTP = async () => {
  if (!otp.value || otp.value.length < 6) return;
  isLoading.value = true;

  try {
    const response = await axios.post('http://localhost:8080/api/v1/auth/verify-otp', {
      email: email.value,
      otp: otp.value
    });

    if (response.data.success) {
      step.value = 3;
    }
  } catch (error: any) {
    const msg = error.response?.data?.message || 'Kode OTP tidak valid atau telah kadaluwarsa.';
    Swal.fire({
      icon: 'error',
      title: 'Verifikasi OTP Gagal',
      text: msg,
      confirmButtonColor: '#2563eb'
    });
  } finally {
    isLoading.value = false;
  }
};

// Step 3: Reset Password
const handleResetPassword = async () => {
  if (passwordMatch.value === false) {
    Swal.fire({
      icon: 'error',
      title: 'Kesalahan Validasi',
      text: 'Password konfirmasi tidak cocok!',
      confirmButtonColor: '#2563eb'
    });
    return;
  }

  if (newPassword.value.length < 8) {
    Swal.fire({
      icon: 'error',
      title: 'Kesalahan Validasi',
      text: 'Password minimal 8 karakter!',
      confirmButtonColor: '#2563eb'
    });
    return;
  }

  isLoading.value = true;
  try {
    const response = await axios.post('http://localhost:8080/api/v1/auth/reset-password', {
      email: email.value,
      otp: otp.value,
      password: newPassword.value
    });

    if (response.data.success) {
      Swal.fire({
        icon: 'success',
        title: 'Password Berhasil Diubah!',
        text: response.data.message || 'Password Anda telah berhasil diperbarui. Notifikasi telah dikirim ke email Anda.',
        confirmButtonColor: '#2563eb'
      }).then(() => {
        router.push('/login');
      });
    }
  } catch (error: any) {
    const msg = error.response?.data?.message || 'Gagal mengubah password. Silakan coba lagi.';
    Swal.fire({
      icon: 'error',
      title: 'Gagal Mengubah Password',
      text: msg,
      confirmButtonColor: '#2563eb'
    });
  } finally {
    isLoading.value = false;
  }
};
</script>
