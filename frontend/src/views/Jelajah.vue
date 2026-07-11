<template>
  <div class="min-h-screen bg-[#f8fafc] pb-24 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-700">
    
    <div class="relative bg-slate-950 text-white overflow-hidden py-24 mb-12 shadow-inner">
      <div class="absolute inset-0 z-0">
        <img 
          src="/jelajah-hero.jpg" 
          alt="Panorama Jelajah Pasuruan Raya" 
          class="w-full h-full object-cover opacity-35 filter brightness-[0.65] contrast-[1.1] scale-105 transition-transform duration-1000"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#f8fafc] via-slate-950/80 to-slate-950/45"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <span class="inline-flex items-center gap-1.5 bg-blue-600/90 text-white text-[10px] md:text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-5 shadow-lg backdrop-blur-md">
          <span class="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
          Kanal Eksplorasi Khusus
        </span>
        <h1 class="text-4xl md:text-6xl font-black tracking-tight mb-5 drop-shadow-md uppercase leading-none">
          JELAJAH <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-sky-400">PASURUAN RAYA</span>
        </h1>
        <p class="text-base md:text-xl text-slate-200 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-sm">
          Panduan komprehensif destinasi pariwisata, kekayaan kuliner tradisional, tradisi budaya luhur, dan agenda acara menarik di Kota & Kabupaten Pasuruan.
        </p>
      </div>
    </div>

    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="mb-10">
        <button @click="navigateBack" class="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer group">
          <svg class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Kembali ke Beranda
        </button>
      </div>

      
      <div class="flex items-center gap-3 overflow-x-auto scrollbar-none p-1.5 -m-1.5 mb-10">
        <button 
          v-for="(item, key) in konten" 
          :key="key"
          @click="activeTab = key"
          class="flex items-center gap-2.5 px-6 py-3.5 rounded-full font-extrabold text-sm border shadow-sm transition-all duration-300 whitespace-nowrap cursor-pointer focus:outline-none"
          :class="activeTab === key 
            ? 'bg-blue-600 border-blue-600 text-white shadow-blue-500/20 shadow-lg scale-[1.03]' 
            : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-400 hover:bg-slate-50'"
        >
          <span class="w-5 h-5 flex items-center justify-center" v-html="sanitizeHTML(item.icon)"></span>
          {{ item.tabTitle }}
        </button>
      </div>

      
      <div class="bg-white rounded-3xl p-6 md:p-10 shadow-lg border border-slate-100 mb-12">
        <div class="max-w-4xl mb-12 border-b border-slate-100 pb-8">
          <span class="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 block">Daftar Destinasi</span>
          <h2 class="text-3xl font-black text-slate-900 mb-4 tracking-tight">{{ konten[activeTab].title }}</h2>
          <p class="text-slate-600 leading-relaxed text-base md:text-lg">{{ konten[activeTab].description }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="item in konten[activeTab].items" 
            :key="item.name"
            class="bg-slate-50/50 rounded-2xl overflow-hidden border border-slate-100 hover:border-blue-100 hover:bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
          >
            
            <div class="h-52 overflow-hidden relative">
              <img :src="item.image" :alt="item.name" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" @error="handleImageError" />
              <span class="absolute top-3 left-3 bg-slate-900/90 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider backdrop-blur-sm shadow-sm">{{ item.tag }}</span>
            </div>
            
            
            <div class="p-6 flex-grow flex flex-col justify-between">
              <div>
                <h3 class="font-extrabold text-slate-900 text-lg mb-2.5 group-hover:text-blue-600 transition-colors line-clamp-1">{{ item.name }}</h3>
                <p class="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3 font-light">{{ item.desc }}</p>
              </div>
              <div v-if="item.meta" class="border-t border-slate-100 pt-4 text-xs text-slate-500 flex items-center justify-between">
                <span class="flex items-center gap-1"><i class="fas fa-map-marker-alt text-red-500"></i> {{ item.meta.loc }}</span>
                <span v-if="item.meta.price" class="font-bold text-slate-800">{{ item.meta.price }}</span>
                <span v-if="item.meta.date" class="font-bold text-blue-600">{{ item.meta.date }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { sanitizeHTML } from '../utils/sanitize';

interface JelajahMeta {
  loc: string;
  price?: string;
  date?: string;
}

interface JelajahItem {
  name: string;
  tag: string;
  desc: string;
  image: string;
  meta: JelajahMeta;
}

interface KategoriData {
  tabTitle: string;
  title: string;
  description: string;
  icon: string;
  items: JelajahItem[];
}

const router = useRouter();
const route = useRoute();


const activeTab = ref<'wisata' | 'kuliner' | 'budaya' | 'acara'>('wisata');

onMounted(() => {
  const queryTab = route.query.tab?.toString().toLowerCase();
  if (queryTab && ['wisata', 'kuliner', 'budaya', 'acara'].includes(queryTab)) {
    activeTab.value = queryTab as any;
  }
});

watch(
  () => route.query.tab,
  (newTab) => {
    const queryTab = newTab?.toString().toLowerCase();
    if (queryTab && ['wisata', 'kuliner', 'budaya', 'acara'].includes(queryTab)) {
      activeTab.value = queryTab as any;
    }
  }
);

const konten: Record<'wisata' | 'kuliner' | 'budaya' | 'acara', KategoriData> = {
  wisata: {
    tabTitle: 'Wisata',
    title: 'Wisata Pasuruan Raya',
    description: 'Jelajahi keindahan alam vulkanik, agrowisata pegunungan, pemandian bersejarah, hingga pesisir pantai eksotis di Kota dan Kabupaten Pasuruan.',
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h2a2.5 2.5 0 002.5-2.5V14a2 2 0 012-2h.055M11 20.055V18a2 2 0 00-2-2h-.5a2 2 0 01-2-2v-1.5a2.5 2.5 0 00-2.5-2.5H4"></path></svg>',
    items: [
      {
        name: 'Kawasan Gunung Bromo',
        tag: 'ALAM & PETUALANGAN',
        desc: 'Gerbang utama menyaksikan Golden Sunrise legendaris di Bukit Penanjakan Tosari, hamparan pasir berbisik yang luas, dan kawah gunung api aktif.',
        image: 'https://images.unsplash.com/photo-1588668214407-6eb9527092c6?auto=format&fit=crop&q=80&w=600',
        meta: { loc: 'Tosari, Kab. Pasuruan', price: 'Tiket Masuk: Rp 29.000 - Rp 34.000' }
      },
      {
        name: 'Taman Safari Prigen (II)',
        tag: 'EDUKASI & SATWA',
        desc: 'Nikmati petualangan safari outdoor berinteraksi langsung dengan aneka satwa liar mancanegara, pertunjukan edukasi internasional, dan area bermain air.',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600',
        meta: { loc: 'Prigen, Kab. Pasuruan', price: 'Tiket Masuk: Mulai Rp 135.000' }
      },
      {
        name: 'Danau Ranu Grati',
        tag: 'ALAM & RELAKSASI',
        desc: 'Danau tekto-vulkanik yang tenang dengan pemandangan perairan indah berlatar pegunungan Tengger, sangat cocok untuk bersepeda air atau menikmati senja.',
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=600',
        meta: { loc: 'Grati, Kab. Pasuruan', price: 'Tiket Masuk: Rp 5.000' }
      },
      {
        name: 'Masjid Cheng Hoo',
        tag: 'RELIGI & SEJARAH',
        desc: 'Masjid megah bernuansa arsitektur Tionghoa-Islam yang ikonik dengan kombinasi warna merah, kuning, dan hijau yang kental akan nuansa budaya.',
        image: 'https://images.unsplash.com/photo-1590076261226-f8a452932db3?auto=format&fit=crop&q=80&w=600',
        meta: { loc: 'Pandaan, Kab. Pasuruan', price: 'Gratis' }
      },
      {
        name: 'Alun-alun Kota Pasuruan',
        tag: 'REKREASI KOTA',
        desc: 'Taman kota yang asri dengan payung madinah raksasa elektrik yang megah di depan Masjid Jami Al-Anwar, pusat wisata keluarga terpopuler.',
        image: 'https://images.unsplash.com/photo-1496568818309-53d7c7753022?auto=format&fit=crop&q=80&w=600',
        meta: { loc: 'Panggungrejo, Kota Pasuruan', price: 'Gratis' }
      }
    ]
  },
  kuliner: {
    tabTitle: 'Kuliner',
    title: 'Kelezatan Kuliner Khas',
    description: 'Petualangan rasa mencicipi hidangan tradisional legendaris Pasuruan Raya yang kaya akan rempah khas dan cita rasa otentik.',
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>',
    items: [
      {
        name: 'Kupang Kraton',
        tag: 'HIDANGAN LAUT',
        desc: 'Kuliner khas pesisir berupa kerang kupang kecil yang disiram kuah gurih berpadu dengan ulegan bawang putih, cabai, jeruk nipis, dan petis kupang otentik.',
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600',
        meta: { loc: 'Kraton, Kab. Pasuruan', price: 'Harga: Rp 12.000 - Rp 15.000' }
      },
      {
        name: 'Nasi Punel Bangil',
        tag: 'HIDANGAN UTAMA',
        desc: 'Nasi bertekstur pulen lembut dilapisi daun pisang, disajikan dengan lauk empal daging, parutan kelapa pedas (serundeng), lentho, dan kuah santan gurih.',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
        meta: { loc: 'Bangil, Kab. Pasuruan', price: 'Harga: Rp 20.000 - Rp 35.000' }
      },
      {
        name: 'Bipang Jangkar (Sejak 1949)',
        tag: 'OLEH-OLEH KHAS',
        desc: 'Jajanan legendaris berbahan dasar beras kembung (puffed rice) renyah yang dicampur gula karamel harum esens pisang, resep turun temurun asli Pasuruan.',
        image: 'https://images.unsplash.com/photo-1599490659213-e2b952780871?auto=format&fit=crop&q=80&w=600',
        meta: { loc: 'Kota Pasuruan', price: 'Harga: Mulai Rp 15.000/pack' }
      }
    ]
  },
  budaya: {
    tabTitle: 'Budaya',
    title: 'Tradisi & Budaya Luhur',
    description: 'Saksikan eksotisme tradisi adat Tengger, pertunjukan kesenian rakyat religius, dan kearifan lokal budaya Pasuruan Raya yang lestari.',
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7.468 7.468A9 9 0 1112 21.25a9 9 0 01-7.468-7.782z"></path></svg>',
    items: [
      {
        name: 'Yadnya Kasada Bromo',
        tag: 'UPACARA ADAT',
        desc: 'Upacara persembahan sakral tahunan masyarakat Hindu suku Tengger berupa hasil bumi ke kawah Gunung Bromo sebagai simbol syukur kepada Sang Hyang Widhi.',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600',
        meta: { loc: 'Gunung Bromo, Tosari', date: 'Digelar Setiap Bulan Kasada' }
      },
      {
        name: 'Tari Terbang Bandung',
        tag: 'SENI PERTUNJUKAN',
        desc: 'Kesenian tarian tradisional bercorak Islam bernuansa pencak silat, diiringi tabuhan terbang/rebana berirama dinamis dalam upacara adat besar.',
        image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=600',
        meta: { loc: 'Seluruh Pasuruan', date: 'Acara Budaya / Festival' }
      }
    ]
  },
  acara: {
    tabTitle: 'Acara',
    title: 'Agenda & Acara Terkini',
    description: 'Ikuti kemeriahan festival budaya tahunan, konser musik, pagelaran carnival, hingga ajang olahraga bergengsi di Pasuruan Raya.',
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>',
    items: [
      {
        name: 'Bromo Marathon',
        tag: 'OLAHRAGA NASIONAL',
        desc: 'Event lari maraton berskala internasional melewati rute pegunungan Tengger dengan pemandangan pedesaan adat dan alam pegunungan yang asri.',
        image: 'https://images.unsplash.com/photo-1502224562085-639556652f33?auto=format&fit=crop&q=80&w=600',
        meta: { loc: 'Kec. Tosari, Kab. Pasuruan', date: 'September (Tahunan)' }
      },
      {
        name: 'Pasuruan Fashion Carnival',
        tag: 'PARADE BUDAYA',
        desc: 'Parade busana kreatif lokal bertema seni tradisional dan kearifan lokal Pasuruan, memamerkan busana mewah hasil desain desainer-desainer lokal berprestasi.',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600',
        meta: { loc: 'Pusat Kota Pasuruan', date: 'Agustus (Tahunan)' }
      }
    ]
  }
};

const navigateBack = () => {
  router.push({ name: 'home' }).catch(() => {
    router.back();
  });
};

const handleImageError = (e: Event) => {
  const target = e.target as HTMLImageElement;
  target.src = '/images/themes/photo.jpg';
};
</script>
