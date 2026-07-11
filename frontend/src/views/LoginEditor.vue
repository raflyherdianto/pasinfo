<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <div class="text-center">
        <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">Login Editor</h1>
        <p class="mt-2 text-sm text-gray-600">
          Masuk ke dashboard editor
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <div class="mt-1">
              <input 
                id="email" 
                v-model="email"
                type="email" 
                required 
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="email@pasinfo.com"
              >
            </div>
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
                placeholder="Masukkan password Anda"
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
        
        <div>
          <button 
            type="submit" 
            :disabled="isLoading || !isVerified"
            class="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-blue-400"
          >
            <span v-if="isLoading">Loading...</span>
            <span v-else>Masuk sebagai Editor</span>
          </button>
        </div>
      </form>
      
      <div class="text-center text-sm text-gray-600 mt-4 pt-4 border-t border-gray-100">
        <router-link to="/login" class="font-medium text-blue-600 hover:text-blue-500 transition-colors">
          Kembali ke Login Member
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';

const router = useRouter();
const email = ref('');
const password = ref('');
const showPassword = ref(false);
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
    ['#8B5CF6', '#10B981'],
    ['#3B82F6', '#EC4899'],
    ['#F59E0B', '#14B8A6'],
    ['#F43F5E', '#8B5CF6']
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

onMounted(() => {
  initCaptcha();
});

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

const handleLogin = async () => {
  if (!isVerified.value) {
    Swal.fire({
      icon: 'warning',
      title: 'Verifikasi Gagal',
      text: 'Silakan lakukan verifikasi keamanan terlebih dahulu!',
      confirmButtonColor: '#2563eb'
    });
    return;
  }

  isLoading.value = true;
  try {
    const response = await axios.post('http://localhost:8080/api/v1/auth/login', {
      email: email.value,
      password: password.value
    });
    
    if (response.data.success) {
      const user = response.data.data.user;
      
      if (user.role !== 'editor' && user.role !== 'admin') {
        Swal.fire({
          icon: 'error',
          title: 'Akses Ditolak',
          text: 'Akun ini bukan editor.',
          confirmButtonColor: '#2563eb'
        });
        initCaptcha();
        return;
      }
      
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('userData', JSON.stringify(user));
      localStorage.setItem('isLoggedIn', 'true');
      
      window.dispatchEvent(new Event('auth-change'));
      
      router.push('/dashboard-editor'); 
    }
  } catch (error: any) {
    Swal.fire({
      icon: 'error',
      title: 'Login Gagal',
      text: error.response?.data?.message || 'Login gagal, periksa kredensial Anda',
      confirmButtonColor: '#2563eb'
    });
    initCaptcha();
  } finally {
    isLoading.value = false;
  }
};
</script>
