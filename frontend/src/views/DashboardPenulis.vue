<template>
  <div class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6">
    
    <div class="w-full lg:w-1/4 flex flex-col gap-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
        <div class="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-gray-50">
          <img :src="userData.photo || userData.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + (userData.nama || userData.name || 'User')" alt="Avatar" class="w-full h-full object-cover">
        </div>
        <h3 class="text-xl font-bold text-gray-800">{{ userData.nama || userData.name || (userData.email ? userData.email.split('@')[0] : 'User') }}</h3>
        <div class="mt-2 flex flex-col items-center gap-1.5">
          <span class="inline-block px-3 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Penulis</span>
          <span v-if="userData.is_verified === 1" class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
            <i class="fas fa-check-circle mr-1 text-green-500"></i> Terverifikasi
          </span>
          <span v-else class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800">
            <i class="fas fa-exclamation-circle mr-1 text-red-500"></i> Belum Terverifikasi
          </span>
        </div>
        <div class="mt-4 flex items-center space-x-2 text-yellow-600 font-bold bg-yellow-50 px-4 py-2 rounded-lg">
          <i class="fas fa-star"></i> <span>{{ computedXP }} XP</span>
        </div>
        
        <button 
          @click="openEditProfileModal"
          class="mt-4 w-full py-2 px-4 border border-gray-200 hover:border-blue-500 hover:text-blue-600 text-gray-600 font-semibold rounded-lg text-sm transition-all flex items-center justify-center space-x-1.5 bg-white shadow-sm"
        >
          <i class="fas fa-user-edit text-xs"></i> <span>Edit Profil</span>
        </button>
        
        <div class="w-full grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100">
          <div class="flex flex-col">
            <span class="text-2xl font-bold text-gray-800">{{ totalRilis }}</span>
            <span class="text-xs text-gray-500 font-medium uppercase tracking-wider">Artikel Rilis</span>
          </div>
          <div class="flex flex-col border-l border-gray-100">
            <span class="text-2xl font-bold text-gray-800">{{ formattedTotalViews }}</span>
            <span class="text-xs text-gray-500 font-medium uppercase tracking-wider">Total Views</span>
          </div>
        </div>
      </div>
    </div>
    
    
    <div class="w-full lg:w-2/4 flex flex-col gap-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        
        <div v-if="!editingBeritaId" class="flex border-b border-gray-200">
          <button @click="switchPage(1)"
                  class="flex-1 py-4 text-center font-medium transition-colors flex items-center justify-center space-x-2"
                  :class="currentPage === 1 ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'">
            <i class="fas fa-edit"></i> <span>Tulis Berita</span>
          </button>
          <button @click="switchPage(2)"
                  class="flex-1 py-4 text-center font-medium transition-colors flex items-center justify-center space-x-2"
                  :class="currentPage === 2 ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'">
            <i class="fas fa-history"></i> <span>Riwayat Berita</span>
          </button>
        </div>
        
        
        <div v-if="editingBeritaId" class="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
          <button @click="cancelEdit" class="text-gray-600 hover:text-gray-900 font-medium flex items-center space-x-2 transition-colors">
            <i class="fas fa-arrow-left"></i> <span>Kembali ke Riwayat</span>
          </button>
          <span class="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium truncate max-w-[200px] sm:max-w-xs">
            {{ isReadOnly ? 'Melihat' : 'Mengedit' }}: {{ editingBerita?.judul }}
          </span>
        </div>
        
        <!-- Form Tulis / Edit / Detail Berita -->
        <div v-if="currentPage === 1 || editingBeritaId" class="p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-6">{{ isReadOnly ? 'Detail Berita' : (editingBeritaId ? 'Edit Berita' : 'Tulis Berita Baru') }}</h3>
          
          <div class="space-y-5">
            <!-- Upload Gambar / Gambar Terupload -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ isReadOnly ? 'Gambar Terupload' : 'Upload Gambar' }} 
                <span v-if="!isReadOnly" class="text-gray-400 font-normal">(Bisa lebih dari 1, pilih 1 utama)</span>
              </label>

              <!-- Upload Dropzone (Hanya untuk Tulis / Edit) -->
              <div v-if="!isReadOnly"
                   @click="$refs.gambarInput.click()"
                   @dragover.prevent="dragOver = true"
                   @dragleave.prevent="dragOver = false"
                   @drop.prevent="handleDrop"
                   class="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors"
                   :class="dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100'">
                <i class="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-3"></i>
                <p class="text-gray-600 font-medium">Klik atau drag gambar ke sini</p>
                <p class="text-xs text-gray-500 mt-1">Gambar utama akan ditampilkan di thumbnail</p>
                <input type="file" ref="gambarInput" @change="handleFileSelect" multiple accept="image/*" class="hidden">
              </div>
              
              <!-- Dynamic Per-Image Captions List -->
              <div v-if="previewImages.length > 0" class="space-y-3" :class="!isReadOnly ? 'mt-4' : 'mt-2'">
                <label v-if="!isReadOnly" class="block text-sm font-medium text-gray-700">Keterangan / Caption Gambar</label>
                <div v-for="(img, index) in previewImages" :key="index" class="p-3 bg-gray-50 border border-gray-200 rounded-xl flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  <div class="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden border border-gray-200 bg-white">
                    <img :src="img" alt="Preview" class="w-full h-full object-cover">
                    <button v-if="!isReadOnly" @click.stop="removeImage(index)" class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 shadow-sm" title="Hapus Gambar">
                      &times;
                    </button>
                  </div>
                  <div class="flex-1 w-full">
                    <label class="block text-xs font-semibold text-gray-600 mb-1">
                      Caption Gambar #{{ index + 1 }} <span v-if="index === 0" class="text-blue-600 font-normal">(Gambar Utama)</span>
                    </label>
                    <input 
                      type="text" 
                      v-model="previewCaptions[index]" 
                      :disabled="isReadOnly"
                      :placeholder="isReadOnly ? 'Tidak ada caption' : 'Masukkan keterangan untuk gambar #' + (index + 1)" 
                      class="w-full text-sm border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border bg-white disabled:bg-gray-100 disabled:text-gray-600"
                    />
                  </div>
                </div>
              </div>

              <div v-else-if="isReadOnly" class="p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-500 italic mt-2">
                Tidak ada gambar terupload untuk berita ini.
              </div>
            </div>
            
            <!-- Individual Region Fields (Tidak digabung grid 2 kolom) -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Provinsi</label>
              <v-select 
                v-model="selectedProv" 
                :options="provinces" 
                label="name" 
                placeholder="Pilih Provinsi"
                :disabled="isReadOnly"
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
                :disabled="isReadOnly || !selectedProv"
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
                :disabled="isReadOnly || !selectedRegency"
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
                :disabled="isReadOnly || !selectedDistrict"
                @update:modelValue="onVillageChange"
              ></v-select>
            </div>
            
            <!-- Kategori -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
              <select v-model="formData.kategori" :disabled="isReadOnly" class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border bg-white disabled:bg-gray-100 disabled:text-gray-500">
                <option value="" disabled>Pilih kategori...</option>
                <option v-for="cat in categories" :key="cat.id || cat.ID" :value="cat.id || cat.ID">{{ cat.name }}</option>
              </select>
            </div>
            
            <!-- Judul Berita -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Judul Berita</label>
              <input type="text" v-model="formData.judul" :disabled="isReadOnly" placeholder="Masukkan judul berita" class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border font-semibold text-lg disabled:bg-gray-100 disabled:text-gray-500">
            </div>
            
            <!-- Isi Berita (Quill Editor) -->
            <div class="mb-6" :class="{ 'pointer-events-none opacity-80': isReadOnly }" @click="!isReadOnly && focusEditor()">
              <label class="block text-sm font-medium text-gray-700 mb-1 cursor-pointer" @click="!isReadOnly && focusEditor()">Isi Berita</label>
              <div class="cursor-text" @click="!isReadOnly && focusEditor()">
                <QuillEditor ref="quillEditorRef" theme="snow" v-model:content="formData.konten" contentType="html" class="w-full bg-white border border-gray-300 rounded-lg shadow-sm cursor-text" style="min-height: 400px; font-size: 16px;" />
              </div>
              <p class="text-xs text-gray-500 mt-2">Anda dapat menulis berita dengan format paragraf yang rapi</p>
            </div>

            <!-- Catatan Revisi jika status = revisi -->
            <div v-if="editingBerita?.status === 'revisi' && revisionNote" class="mb-6 bg-red-50 border border-red-100 rounded-xl p-5">
              <h4 class="font-bold text-red-800 mb-2 flex items-center space-x-2">
                <i class="fas fa-exclamation-triangle"></i>
                <span>Catatan Revisi dari Editor</span>
              </h4>
              <p class="text-sm text-red-700 whitespace-pre-wrap pl-6">{{ revisionNote }}</p>
            </div>
            
            <!-- Tombol Action -->
            <div v-if="showActionButtons" class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
              <button @click="saveDraft" class="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors flex items-center justify-center space-x-2" :disabled="isSubmitting">
                <i class="fas fa-save"></i> <span>{{ isSubmitting ? 'Menyimpan...' : 'Simpan Draft' }}</span>
              </button>
              <button @click="submitBerita" class="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm flex items-center justify-center space-x-2" :disabled="isSubmitting">
                <i class="fas fa-paper-plane"></i> <span>{{ isSubmitting ? 'Mengirim...' : (editingBerita?.status === 'revisi' ? 'Kirim Revisi' : 'Kirim ke Editor') }}</span>
              </button>
            </div>

            <div v-else-if="isReadOnly" class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
              <button @click="cancelEdit" class="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors flex items-center justify-center space-x-2">
                <i class="fas fa-arrow-left"></i> <span>Kembali ke Riwayat</span>
              </button>
            </div>
          </div>
        </div>
        
        
        <div v-if="currentPage === 2 && !editingBeritaId" class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold text-gray-800">Riwayat Berita</h3>
            <button @click="lihatSemua" class="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center space-x-1">
              <span>Lihat Semua</span> <i class="fas fa-arrow-right"></i>
            </button>
          </div>
          
          <div class="space-y-4">
            
            <div v-if="riwayatBerita.length === 0" class="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-gray-200 rounded-2xl bg-gray-50 text-center">
              <svg class="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <p class="text-gray-500 font-medium">Belum ada riwayat berita</p>
              <p class="text-gray-400 text-xs mt-1">Berita yang Anda tulis, simpan sebagai draft, atau kirim ke editor akan muncul di sini.</p>
            </div>

            <div v-else v-for="berita in riwayatBerita" :key="berita.id" 
                 @click="editBerita(berita.id)"
                 class="p-4 border border-gray-200 rounded-xl hover:shadow-md hover:border-gray-300 transition-all cursor-pointer bg-white group flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
              
              <div class="flex-1">
                <h4 class="font-bold text-gray-800 text-lg group-hover:text-blue-600 transition-colors line-clamp-1 mb-1">{{ berita.judul }}</h4>
                <div class="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                  <span class="flex items-center space-x-1"><i class="far fa-calendar"></i> <span>{{ berita.tanggal }}</span></span>
                  <span v-if="berita.status === 'rilis'" class="flex items-center space-x-1"><i class="far fa-eye"></i> <span>{{ berita.views.toLocaleString() }} dibaca</span></span>
                </div>
              </div>
              
              <div class="flex items-center gap-3 shrink-0">
                <div v-if="statusConfig[berita.status]" class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center space-x-1 border"
                     :style="{ color: statusConfig[berita.status].color, borderColor: statusConfig[berita.status].color, backgroundColor: statusConfig[berita.status].color + '10' }">
                  <i class="fas" :class="statusConfig[berita.status].icon"></i>
                  <span>{{ statusConfig[berita.status].label }}</span>
                </div>
                <div v-else class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center space-x-1 border border-gray-200 bg-gray-50 text-gray-500">
                  <i class="fas fa-question-circle"></i>
                  <span>{{ berita.status }}</span>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    
    <div class="w-full lg:w-1/4 flex flex-col gap-6">
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h4 class="font-bold text-gray-800 mb-4 flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <i class="fas fa-bell text-gray-500"></i> <span>Notifikasi</span>
          </div>
          <span v-if="unreadNotifikasiCount > 0" class="px-2 py-0.5 text-xs font-bold bg-blue-100 text-blue-700 rounded-full">
            {{ unreadNotifikasiCount }} Baru
          </span>
        </h4>
        <div class="space-y-4">
          <div v-for="notif in notifikasiList" :key="notif.id"
               @click="openNotifikasi(notif.id)"
               class="flex gap-3 cursor-pointer p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors relative"
               :class="{ 'opacity-70': notif.dibaca }">
            <div v-if="!notif.dibaca" class="absolute w-2 h-2 bg-blue-500 rounded-full top-3 right-0"></div>
            <div class="mt-1 shrink-0">
              <i class="fas text-lg" :class="notif.icon" :style="{ color: notif.warna }"></i>
            </div>
            <div>
              <p class="text-sm font-bold text-gray-800" :class="{ 'text-gray-600': notif.dibaca }">{{ notif.judul }}</p>
              <p class="text-xs text-gray-600 mt-0.5 line-clamp-2">{{ notif.isi }}</p>
              <span class="text-[10px] text-gray-400 mt-1 block"><i class="far fa-clock"></i> {{ notif.waktu }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  
  <div v-if="showProfileModal" class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
    <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-100">
      <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-xl">
        <h3 class="text-xl font-bold text-gray-800 flex items-center space-x-2">
          <i class="fas fa-user-edit text-blue-600"></i>
          <span>Edit Profil Penulis</span>
        </h3>
        <button @click="showProfileModal = false" class="text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
      </div>
      
      <form @submit.prevent="handleUpdateProfile" class="p-6 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Foto Profil</label>
          <div class="mt-1.5 flex items-center space-x-4">
            <div class="w-16 h-16 rounded-full overflow-hidden border border-gray-200 bg-gray-50 flex-shrink-0">
              <img :src="profileForm.photo || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User'" alt="Preview" class="w-full h-full object-cover">
            </div>
            <input 
              type="file" 
              accept="image/*" 
              @change="handleProfilePhotoUpload" 
              class="text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border file:border-gray-300 file:text-xs file:font-semibold file:bg-white file:text-gray-700 hover:file:bg-gray-50 cursor-pointer"
            >
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Nama Lengkap</label>
          <input type="text" v-model="profileForm.name" required class="mt-1 w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-blue-500 focus:border-blue-500">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" v-model="profileForm.email" required class="mt-1 w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-blue-500 focus:border-blue-500">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700">Nomor Telepon</label>
          <input type="tel" v-model="profileForm.phone" required class="mt-1 w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-blue-500 focus:border-blue-500">
        </div>
        
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Provinsi</label>
            <v-select 
              v-model="profileSelectedProv" 
              :options="provinces" 
              label="name" 
              placeholder="Pilih Provinsi"
              @update:modelValue="onProfileProvChange"
            ></v-select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Kota/Kabupaten</label>
            <v-select 
              v-model="profileSelectedRegency" 
              :options="profileRegencies" 
              label="name" 
              placeholder="Pilih Kota/Kabupaten"
              :disabled="!profileSelectedProv"
              @update:modelValue="onProfileRegencyChange"
            ></v-select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Kecamatan</label>
            <v-select 
              v-model="profileSelectedDistrict" 
              :options="profileDistricts" 
              label="name" 
              placeholder="Pilih Kecamatan"
              :disabled="!profileSelectedRegency"
              @update:modelValue="onProfileDistrictChange"
            ></v-select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Desa/Kelurahan</label>
            <v-select 
              v-model="profileSelectedVillage" 
              :options="profileVillages" 
              label="name" 
              placeholder="Pilih Desa/Kelurahan"
              :disabled="!profileSelectedDistrict"
              @update:modelValue="onProfileVillageChange"
            ></v-select>
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700">Alamat Lengkap</label>
          <textarea v-model="profileForm.alamat" required rows="2" class="mt-1 w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700">Password Baru <span class="text-gray-400 font-normal text-xs">(Kosongkan jika tidak diganti)</span></label>
          <input type="password" v-model="profileForm.password" class="mt-1 w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Minimal 6 karakter">
        </div>
        
        <div class="pt-4 border-t border-gray-100 flex justify-end space-x-3">
          <button type="button" @click="showProfileModal = false" class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors">Batal</button>
          <button type="submit" :disabled="isSavingProfile" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors disabled:bg-blue-400">
            {{ isSavingProfile ? 'Menyimpan...' : 'Simpan Perubahan' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import Swal from 'sweetalert2'

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

const userData = ref({
  nama: 'Jane Doe',
  email: 'janedoe@example.com',
  avatar: 'https://ui-avatars.com/api/?name=Jane+Doe&background=random',
  xp: 1250
})

const currentPage = ref(1)
const editingBeritaId = ref<number | null>(null)
const dragOver = ref(false)
const previewImages = ref<string[]>([])
const previewCaptions = ref<string[]>([])
const isSubmitting = ref(false)
const quillEditorRef = ref<any>(null)

const focusEditor = () => {
  if (quillEditorRef.value) {
    if (typeof quillEditorRef.value.focus === 'function') {
      quillEditorRef.value.focus()
    } else if (quillEditorRef.value.getQuill && typeof quillEditorRef.value.getQuill === 'function') {
      const quill = quillEditorRef.value.getQuill()
      if (quill && typeof quill.focus === 'function') quill.focus()
    } else {
      const el = quillEditorRef.value.$el
      const editorEl: HTMLElement | null = (el && typeof el.querySelector === 'function') 
        ? el.querySelector('.ql-editor') 
        : document.querySelector('.ql-editor')
      if (editorEl && typeof editorEl.focus === 'function') editorEl.focus()
    }
  }
}

const initialForm = {
  judul: '',
  kategori: '',
  konten: '',
  caption: '',
  lokasi: {
    desa: '',
    kecamatan: '',
    kota: '',
    provinsi: ''
  }
}

const formData = ref(JSON.parse(JSON.stringify(initialForm)))


const provinces = ref([])
const regencies = ref([])
const districts = ref([])
const villages = ref([])
const categories = ref<any[]>([])

const selectedProv = ref<any>(null)
const selectedRegency = ref<any>(null)
const selectedDistrict = ref<any>(null)
const selectedVillage = ref<any>(null)

onMounted(async () => {
  window.addEventListener('notification-read', handleNotifReadSync)
  window.addEventListener('notifications-updated', fetchNotifikasi)

  const token = localStorage.getItem('token')
  const localUserData = localStorage.getItem('userData')
  if (localUserData) {
    try {
      const parsed = JSON.parse(localUserData)
      userData.value = parsed
      if (parsed.id && token) {
        const res = await fetch(`http://localhost:8080/api/v1/users/${parsed.id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const json = await res.json()
        if (json.success) {
          userData.value = json.data
          localStorage.setItem('userData', JSON.stringify(json.data))
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  try {
    const res = await fetch('http://localhost:8080/api/v1/wilayah/provinces', { method: 'GET', mode: 'cors' })
    const json = await res.json()
    provinces.value = json.data
  } catch (err) {
    console.error('Error fetching provinces:', err)
  }

  try {
    const res = await fetch('http://localhost:8080/api/v1/categories', { method: 'GET', mode: 'cors' })
    const json = await res.json()
    categories.value = json.data
  } catch (err) {
    console.error('Error fetching categories:', err)
  }

  fetchRiwayatBerita()
  fetchNotifikasi()
})

onUnmounted(() => {
  window.removeEventListener('notification-read', handleNotifReadSync)
  window.removeEventListener('notifications-updated', fetchNotifikasi)
})

const fetchRiwayatBerita = async () => {
  const token = localStorage.getItem('token')
  if (!token) return
  try {
    const res = await fetch('http://localhost:8080/api/v1/news/mine', { 
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const json = await res.json()
    if (json.success) {
      riwayatBerita.value = json.data.map((b: any) => {
        const rawStatus = b.status || b.Status || 'draft';
        const rawDate = b.created_at || b.CreatedAt;
        return {
          id: b.id || b.ID,
          judul: b.judul || b.Title,
          status: rawStatus === 'pending' ? 'dikoreksi' : rawStatus === 'revision' ? 'revisi' : rawStatus === 'published' ? 'rilis' : 'draft',
          views: b.views || b.Views || 0,
          tanggal: rawDate ? formatDate(rawDate) : formatDate(new Date().toISOString()),
          kategori: b.category_id || b.CategoryID,
          konten: b.konten || b.Content,
          caption: b.image_caption || b.ImageCaption,
          images: (b.images || b.Images) ? (b.images || b.Images).map((img: any) => typeof img === 'string' ? img : (img.image_path || img.ImagePath)) : [],
          image_captions: (b.images || b.Images) ? (b.images || b.Images).map((img: any) => typeof img === 'object' ? (img.image_caption || img.ImageCaption || '') : '') : (b.image_captions || []),
          lokasi: {
            provinsi: b.province_id || b.ProvinceID,
            kota: b.regency_id || b.RegencyID,
            kecamatan: b.district_id || b.DistrictID,
            desa: b.village_id || b.VillageID
          }
        }
      })
    }
  } catch (err) {
    console.error('Error fetching riwayat berita:', err)
  }
}

const fetchNotifikasi = async () => {
  const token = localStorage.getItem('token')
  if (!token) return
  try {
    const res = await fetch('http://localhost:8080/api/v1/notifications', { 
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const json = await res.json()
    if (json.success && json.data) {
      notifikasiList.value = json.data.map((n: any) => ({
        id: n.id || n.ID,
        judul: n.title || n.Title,
        isi: n.message || n.Message,
        waktu: formatDate(n.created_at || n.CreatedAt),
        dibaca: n.is_read !== undefined ? n.is_read : (n.IsRead !== undefined ? n.IsRead : false),
        news_id: n.news_id || n.NewsID,
        icon: (n.type || n.Type) === 'success' ? 'fa-check-circle' : (n.type || n.Type) === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle',
        warna: (n.type || n.Type) === 'success' ? '#16a34a' : (n.type || n.Type) === 'warning' ? '#ea580c' : '#3b82f6'
      }))
    }
  } catch (err) {
    console.error('Error fetching notifications:', err)
  }
}

const onProvChange = async (val: any) => {
  clearRegencies()
  if (val && val.code) {
    formData.value.lokasi.provinsi = val.name
    try {
      const res = await fetch(`http://localhost:8080/api/v1/wilayah/regencies/${val.code}`, { method: 'GET', mode: 'cors' })
      const json = await res.json()
      regencies.value = json.data
    } catch (err) {}
  } else {
    formData.value.lokasi.provinsi = ''
  }
}

const onRegencyChange = async (val: any) => {
  clearDistricts()
  if (val && val.code) {
    formData.value.lokasi.kota = val.name
    try {
      const res = await fetch(`http://localhost:8080/api/v1/wilayah/districts/${val.code}`, { method: 'GET', mode: 'cors' })
      const json = await res.json()
      districts.value = json.data
    } catch (err) {}
  } else {
    formData.value.lokasi.kota = ''
  }
}

const onDistrictChange = async (val: any) => {
  clearVillages()
  if (val && val.code) {
    formData.value.lokasi.kecamatan = val.name
    try {
      const res = await fetch(`http://localhost:8080/api/v1/wilayah/villages/${val.code}`, { method: 'GET', mode: 'cors' })
      const json = await res.json()
      villages.value = json.data
    } catch (err) {}
  } else {
    formData.value.lokasi.kecamatan = ''
  }
}

const onVillageChange = (val: any) => {
  if (val && val.name) {
    formData.value.lokasi.desa = val.name
  } else {
    formData.value.lokasi.desa = ''
  }
}

const clearRegencies = () => {
  selectedRegency.value = null
  formData.value.lokasi.kota = ''
  regencies.value = []
  clearDistricts()
}

const clearDistricts = () => {
  selectedDistrict.value = null
  formData.value.lokasi.kecamatan = ''
  districts.value = []
  clearVillages()
}

const clearVillages = () => {
  selectedVillage.value = null
  formData.value.lokasi.desa = ''
  villages.value = []
}

const riwayatBerita = ref<any[]>([])

const totalRilis = computed(() => {
  return riwayatBerita.value.filter((b: any) => b.status === 'rilis').length
})

const totalViews = computed(() => {
  return riwayatBerita.value.reduce((sum: number, b: any) => sum + (b.views || 0), 0)
})

const formattedTotalViews = computed(() => {
  const v = totalViews.value
  if (v >= 1000000) return (v / 1000000).toFixed(1) + 'M'
  if (v >= 1000) return (v / 1000).toFixed(1) + 'K'
  return v.toLocaleString()
})

const computedXP = computed(() => {
  let xp = 500
  riwayatBerita.value.forEach((b: any) => {
    if (b.status === 'rilis') {
      xp += 200
    } else {
      xp += 50
    }
    xp += (b.views || 0) * 2
  })
  return xp
})

const notifikasiList = ref<any[]>([])

const unreadNotifikasiCount = computed(() => {
  return notifikasiList.value.filter(n => !n.dibaca).length
})

const handleNotifReadSync = (e: any) => {
  const notifId = e.detail?.id
  if (notifId) {
    const notif = notifikasiList.value.find(n => n.id === notifId)
    if (notif) notif.dibaca = true
  } else {
    fetchNotifikasi()
  }
}

const statusConfig = {
  draft: { label: 'Draft', color: '#6b7280', icon: 'fa-pen' },
  dikoreksi: { label: 'Dikoreksi Editor', color: '#ea580c', icon: 'fa-edit' },
  revisi: { label: 'Perlu Revisi', color: '#dc2626', icon: 'fa-undo' },
  rilis: { label: 'Telah Rilis', color: '#16a34a', icon: 'fa-check-circle' }
}

const editingBerita = computed(() => {
  if (!editingBeritaId.value) return null
  return riwayatBerita.value.find(b => String(b.id || b.ID) === String(editingBeritaId.value)) || null
})

const showActionButtons = computed(() => {
  if (!editingBeritaId.value) return true
  const status = (editingBerita.value?.status || editingBerita.value?.Status || '').toString().toLowerCase()
  return status === 'draft' || status === 'revisi' || status === 'revision'
})

const isReadOnly = computed(() => {
  if (!editingBeritaId.value) return false
  const status = (editingBerita.value?.status || editingBerita.value?.Status || '').toString().toLowerCase()
  return ['pending', 'dikoreksi', 'published', 'rilis', 'telah rilis'].includes(status)
})

const revisionNote = computed(() => {
  if (!editingBeritaId.value) return ''
  const notifs = notifikasiList.value.filter(n => 
    (n.news_id === editingBeritaId.value || n.NewsID === editingBeritaId.value) && 
    (n.judul?.toLowerCase().includes('revisi') || n.isi?.toLowerCase().includes('revisi'))
  )
  if (notifs.length > 0) {
    notifs.sort((a, b) => b.id - a.id)
    const rawNote = notifs[0].isi || ''
    const marker = 'revisi:'
    const index = rawNote.toLowerCase().indexOf(marker)
    if (index !== -1) {
      return rawNote.substring(index + marker.length).trim()
    }
    return rawNote
  }
  return ''
})

const switchPage = (page: number) => {
  currentPage.value = page
  editingBeritaId.value = null
  resetForm()
}

const editBerita = async (id: number) => {
  editingBeritaId.value = id
  const berita = riwayatBerita.value.find(b => String(b.id || b.ID) === String(id))
  if (berita) {
    formData.value = {
      judul: berita.judul,
      kategori: typeof berita.kategori === 'string' ? parseInt(berita.kategori) : berita.kategori,
      konten: berita.konten,
      caption: berita.caption,
      lokasi: {
        provinsi: berita.lokasi.provinsi,
        kota: berita.lokasi.kota,
        kecamatan: berita.lokasi.kecamatan,
        desa: berita.lokasi.desa
      }
    }

    if (Array.isArray(berita.images)) {
      previewImages.value = berita.images.map((img: any) => 
        typeof img === 'string' ? img : (img.image_path || img.ImagePath || '')
      )
    } else {
      previewImages.value = []
    }

    if (Array.isArray(berita.image_captions) && berita.image_captions.length > 0) {
      previewCaptions.value = berita.image_captions.map((cap: any) => typeof cap === 'string' ? cap : String(cap || ''))
    } else if (Array.isArray(berita.images)) {
      previewCaptions.value = berita.images.map((img: any, idx: number) => {
        if (typeof img === 'object' && img !== null) {
          return img.image_caption || img.ImageCaption || ''
        }
        return idx === 0 && berita.caption ? berita.caption : ''
      })
    } else {
      previewCaptions.value = []
    }

    try {
      const provCode = berita.lokasi.provinsi
      const provObj = provinces.value.find((p: any) => p.code === provCode)
      if (provObj) {
        selectedProv.value = provObj
        
        const regRes = await fetch(`http://localhost:8080/api/v1/wilayah/regencies/${provCode}`, { method: 'GET', mode: 'cors' })
        const regJson = await regRes.json()
        regencies.value = regJson.data
        
        const regCode = berita.lokasi.kota
        const regObj = regencies.value.find((r: any) => r.code === regCode)
        if (regObj) {
          selectedRegency.value = regObj
          
          const distRes = await fetch(`http://localhost:8080/api/v1/wilayah/districts/${regCode}`, { method: 'GET', mode: 'cors' })
          const distJson = await distRes.json()
          districts.value = distJson.data
          
          const distCode = berita.lokasi.kecamatan
          const distObj = districts.value.find((d: any) => d.code === distCode)
          if (distObj) {
            selectedDistrict.value = distObj
            
            const vilRes = await fetch(`http://localhost:8080/api/v1/wilayah/villages/${distCode}`, { method: 'GET', mode: 'cors' })
            const vilJson = await vilRes.json()
            villages.value = vilJson.data
            
            const vilCode = berita.lokasi.desa
            const vilObj = villages.value.find((v: any) => v.code === vilCode)
            if (vilObj) {
              selectedVillage.value = vilObj
            }
          }
        }
      }
    } catch (err) {
      console.error('Error loading locations for edit:', err)
    }

    setTimeout(() => {
      if (quillEditorRef.value) {
        try {
          if (typeof quillEditorRef.value.enable === 'function') {
            quillEditorRef.value.enable(!isReadOnly.value)
          } else if (quillEditorRef.value.getQuill && typeof quillEditorRef.value.getQuill === 'function') {
            const q = quillEditorRef.value.getQuill()
            if (q && typeof q.enable === 'function') q.enable(!isReadOnly.value)
          }
        } catch (e) {}
      }
    }, 100)
  }
}

const cancelEdit = () => {
  editingBeritaId.value = null
  currentPage.value = 2
  resetForm()
}

const resetForm = () => {
  formData.value = JSON.parse(JSON.stringify(initialForm))
  previewImages.value = []
  previewCaptions.value = []
  selectedProv.value = null
  clearRegencies()

  if (quillEditorRef.value) {
    try {
      if (typeof quillEditorRef.value.setHTML === 'function') {
        quillEditorRef.value.setHTML('')
      } else if (typeof quillEditorRef.value.setText === 'function') {
        quillEditorRef.value.setText('')
      } else if (quillEditorRef.value.getQuill && typeof quillEditorRef.value.getQuill === 'function') {
        const quill = quillEditorRef.value.getQuill()
        if (quill && typeof quill.setText === 'function') quill.setText('')
      }
    } catch (e) {}
    const el = quillEditorRef.value.$el
    const editorEl: Element | null = (el && typeof el.querySelector === 'function') 
      ? el.querySelector('.ql-editor') 
      : document.querySelector('.ql-editor')
    if (editorEl) editorEl.innerHTML = ''
  }
}

const saveDraft = async () => {
  if (!formData.value.judul) {
    Swal.fire({
      icon: 'warning',
      title: 'Judul Kosong',
      text: 'Judul berita harus diisi!',
      confirmButtonColor: '#2563eb'
    })
    return
  }
  isSubmitting.value = true
  await handleSaveOrUpdate("draft")
  isSubmitting.value = false
}

const submitBerita = async () => {
  if (!formData.value.judul) {
    Swal.fire({
      icon: 'warning',
      title: 'Judul Kosong',
      text: 'Judul berita harus diisi!',
      confirmButtonColor: '#2563eb'
    })
    return
  }
  isSubmitting.value = true
  await handleSaveOrUpdate("pending")
  isSubmitting.value = false
}

const handleSaveOrUpdate = async (statusTarget: string) => {
  const cleanedImages = previewImages.value.map((img: any) => 
    typeof img === 'string' ? img : (img.image_path || img.ImagePath || '')
  ).filter((img: string) => img.trim() !== '')

  const cleanedCaptions = previewImages.value.map((_: any, idx: number) => {
    const cap = previewCaptions.value[idx]
    return typeof cap === 'string' ? cap : String(cap || '')
  })

  const payload = {
    title: formData.value.judul,
    content: formData.value.konten,
    category_id: parseInt(formData.value.kategori) || 1,
    province_id: selectedProv.value ? selectedProv.value.code : (formData.value.lokasi?.provinsi || ''),
    regency_id: selectedRegency.value ? selectedRegency.value.code : (formData.value.lokasi?.kota || ''),
    district_id: selectedDistrict.value ? selectedDistrict.value.code : (formData.value.lokasi?.kecamatan || ''),
    village_id: selectedVillage.value ? selectedVillage.value.code : (formData.value.lokasi?.desa || ''),
    images: cleanedImages,
    image_captions: cleanedCaptions,
    status: statusTarget
  }

  const token = localStorage.getItem('token')

  try {
    let res: Response;
    if (editingBeritaId.value) {
      res = await fetch(`http://localhost:8080/api/v1/news/${editingBeritaId.value}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })
    } else {
      res = await fetch('http://localhost:8080/api/v1/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })
    }

    let json: any = {}
    try {
      json = await res.json()
    } catch (e) {
      console.error('Failed to parse response JSON:', e)
    }

    if (res.ok && json && json.success) {
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: `Berita telah ${editingBeritaId.value ? 'diperbarui dan' : ''} ${statusTarget === 'pending' ? 'dikirim ke editor' : 'disimpan sebagai draft'}.`,
        confirmButtonColor: '#2563eb'
      })
      fetchRiwayatBerita()
      if (!editingBeritaId.value) {
        resetForm()
      } else {
        cancelEdit()
      }
    } else {
      const errMsg = (json && json.message) ? json.message : `Gagal memproses berita (HTTP ${res.status}: ${res.statusText})`
      Swal.fire({
        icon: 'error',
        title: 'Gagal Memproses',
        text: errMsg,
        confirmButtonColor: '#2563eb'
      })
    }
  } catch (err: any) {
    console.error('Save/Update news network error:', err)
    Swal.fire({
      icon: 'error',
      title: 'Terjadi Kesalahan',
      text: err.message || 'Terjadi kesalahan sistem / koneksi saat memproses berita.',
      confirmButtonColor: '#2563eb'
    })
  }
}


const lihatSemua = () => {
  Swal.fire({
    icon: 'info',
    title: 'Info Fitur',
    text: 'Fitur lihat semua berita akan tersedia di tahap berikutnya',
    confirmButtonColor: '#2563eb'
  })
}



const openNotifikasi = async (id: number) => {
  const notif = notifikasiList.value.find(n => n.id === id)
  if (notif && !notif.dibaca) {
    notif.dibaca = true
    window.dispatchEvent(new CustomEvent('notification-read', { detail: { id } }))
    const token = localStorage.getItem('token')
    await fetch(`http://localhost:8080/api/v1/notifications/${id}/read`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` }
    })
  }
}

const convertToWebP = (file: File, quality: number = 0.75): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('File is not an image'))
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height

        const maxDimension = 1200
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width)
            width = maxDimension
          } else {
            width = Math.round((width * maxDimension) / height)
            height = maxDimension
          }
        }

        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Failed to get canvas context'))
          return
        }

        ctx.drawImage(img, 0, 0, width, height)

        const webpDataUrl = canvas.toDataURL('image/webp', quality)
        resolve(webpDataUrl)
      }
      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = e.target?.result as string
    }
    reader.onerror = () => reject(reader.error || new Error('FileReader error'))
    reader.readAsDataURL(file)
  })
}

const processFiles = async (files: FileList | File[]) => {
  const allowedMime = ['image/jpeg', 'image/png', 'image/webp']
  const maxBytes = 5 * 1024 * 1024 // 5 MB

  for (const file of Array.from(files)) {
    if (!allowedMime.includes(file.type)) {
      Swal.fire('Format Tidak Didukung', `Berkas "${file.name}" harus berupa JPG, PNG, atau WEBP.`, 'error')
      continue
    }
    if (file.size > maxBytes) {
      Swal.fire('Berkas Terlalu Besar', `Berkas "${file.name}" melebihi ukuran maksimum 5 MB.`, 'error')
      continue
    }
    try {
      const webpData = await convertToWebP(file, 0.75)
      previewImages.value.push(webpData)
      previewCaptions.value.push('')
    } catch (err) {
      console.error('Failed to convert image to WebP:', err)
    }
  }
}

const handleFileSelect = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (input.files) {
    processFiles(input.files)
  }
}

const handleDrop = (e: DragEvent) => {
  dragOver.value = false
  if (e.dataTransfer?.files) {
    processFiles(e.dataTransfer.files)
  }
}

const removeImage = (index: number) => {
  previewImages.value.splice(index, 1)
  previewCaptions.value.splice(index, 1)
}


const showProfileModal = ref(false)
const isSavingProfile = ref(false)
const profileForm = ref({
  name: '',
  email: '',
  phone: '',
  password: '',
  provinsi: '',
  kota_kab: '',
  kecamatan: '',
  kelurahan: '',
  alamat: ''
})

const profileSelectedProv = ref<any>(null)
const profileSelectedRegency = ref<any>(null)
const profileSelectedDistrict = ref<any>(null)
const profileSelectedVillage = ref<any>(null)

const profileRegencies = ref<any[]>([])
const profileDistricts = ref<any[]>([])
const profileVillages = ref<any[]>([])

const onProfileProvChange = async (val: any) => {
  clearProfileRegencies()
  if (val && val.code) {
    profileForm.value.provinsi = val.name
    try {
      const res = await fetch(`http://localhost:8080/api/v1/wilayah/regencies/${val.code}`)
      const json = await res.json()
      profileRegencies.value = json.data
    } catch (err) {}
  } else {
    profileForm.value.provinsi = ''
  }
}

const onProfileRegencyChange = async (val: any) => {
  clearProfileDistricts()
  if (val && val.code) {
    profileForm.value.kota_kab = val.name
    try {
      const res = await fetch(`http://localhost:8080/api/v1/wilayah/districts/${val.code}`)
      const json = await res.json()
      profileDistricts.value = json.data
    } catch (err) {}
  } else {
    profileForm.value.kota_kab = ''
  }
}

const onProfileDistrictChange = async (val: any) => {
  clearProfileVillages()
  if (val && val.code) {
    profileForm.value.kecamatan = val.name
    try {
      const res = await fetch(`http://localhost:8080/api/v1/wilayah/villages/${val.code}`)
      const json = await res.json()
      profileVillages.value = json.data
    } catch (err) {}
  } else {
    profileForm.value.kecamatan = ''
  }
}

const onProfileVillageChange = (val: any) => {
  if (val && val.name) {
    profileForm.value.kelurahan = val.name
  } else {
    profileForm.value.kelurahan = ''
  }
}

const clearProfileRegencies = () => {
  profileSelectedRegency.value = null
  profileForm.value.kota_kab = ''
  profileRegencies.value = []
  clearProfileDistricts()
}

const clearProfileDistricts = () => {
  profileSelectedDistrict.value = null
  profileForm.value.kecamatan = ''
  profileDistricts.value = []
  clearProfileVillages()
}

const clearProfileVillages = () => {
  profileSelectedVillage.value = null
  profileForm.value.kelurahan = ''
  profileVillages.value = []
}

const openEditProfileModal = async () => {
  const token = localStorage.getItem('token')
  if (!token || !userData.value.id) {
    Swal.fire('Error', 'Sesi tidak valid', 'error')
    return
  }
  
  try {
    const res = await fetch(`http://localhost:8080/api/v1/users/${userData.value.id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const json = await res.json()
    if (json.success) {
      const u = json.data
      profileForm.value = {
        name: u.name || '',
        email: u.email || '',
        phone: u.phone || '',
        password: '',
        provinsi: u.provinsi || '',
        kota_kab: u.kota_kab || '',
        kecamatan: u.kecamatan || '',
        kelurahan: u.kelurahan || '',
        alamat: u.alamat || '',
        photo: u.photo || ''
      }
      

      profileSelectedProv.value = provinces.value.find((p: any) => p.name === u.provinsi) || { name: u.provinsi, code: '' }
      
      if (profileSelectedProv.value && profileSelectedProv.value.code) {
        const regRes = await fetch(`http://localhost:8080/api/v1/wilayah/regencies/${profileSelectedProv.value.code}`)
        const regJson = await regRes.json()
        profileRegencies.value = regJson.data
        profileSelectedRegency.value = profileRegencies.value.find((r: any) => r.name === u.kota_kab) || { name: u.kota_kab, code: '' }
        
        if (profileSelectedRegency.value && profileSelectedRegency.value.code) {
          const distRes = await fetch(`http://localhost:8080/api/v1/wilayah/districts/${profileSelectedRegency.value.code}`)
          const distJson = await distRes.json()
          profileDistricts.value = distJson.data
          profileSelectedDistrict.value = profileDistricts.value.find((d: any) => d.name === u.kecamatan) || { name: u.kecamatan, code: '' }
          
          if (profileSelectedDistrict.value && profileSelectedDistrict.value.code) {
            const vilRes = await fetch(`http://localhost:8080/api/v1/wilayah/villages/${profileSelectedDistrict.value.code}`)
            const vilJson = await vilRes.json()
            profileVillages.value = vilJson.data
            profileSelectedVillage.value = profileVillages.value.find((v: any) => v.name === u.kelurahan) || { name: u.kelurahan, code: '' }
          }
        }
      }
      
      showProfileModal.value = true
    } else {
      Swal.fire('Error', json.message || 'Gagal memuat profil', 'error')
    }
  } catch (err) {
    Swal.fire('Error', 'Gagal menghubungi server', 'error')
  }
}

const handleUpdateProfile = async () => {
  if (profileForm.value.password && profileForm.value.password.length < 6) {
    Swal.fire('Error', 'Password baru minimal 6 karakter!', 'error')
    return
  }
  
  isSavingProfile.value = true
  const token = localStorage.getItem('token')
  try {
    const res = await fetch(`http://localhost:8080/api/v1/users/${userData.value.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: profileForm.value.name,
        email: profileForm.value.email,
        phone: profileForm.value.phone,
        password: profileForm.value.password || undefined,
        provinsi: profileForm.value.provinsi,
        kota_kab: profileForm.value.kota_kab,
        kecamatan: profileForm.value.kecamatan,
        kelurahan: profileForm.value.kelurahan,
        alamat: profileForm.value.alamat,
        photo: profileForm.value.photo
      })
    })
    
    const json = await res.json()
    if (json.success) {
      const updatedUser = {
        ...userData.value,
        name: profileForm.value.name,
        nama: profileForm.value.name,
        email: profileForm.value.email,
        photo: profileForm.value.photo
      }
      localStorage.setItem('userData', JSON.stringify(updatedUser))
      userData.value = updatedUser
      
      window.dispatchEvent(new Event('auth-change'))
      
      Swal.fire({
        icon: 'success',
        title: 'Profil Diperbarui',
        text: 'Profil Anda telah berhasil diperbarui.',
        confirmButtonColor: '#2563eb'
      })
      showProfileModal.value = false
    } else {
      Swal.fire('Gagal', json.message || 'Gagal memperbarui profil', 'error')
    }
  } catch (err) {
    Swal.fire('Error', 'Koneksi ke server terputus', 'error')
  } finally {
    isSavingProfile.value = false
  }
}

const handleProfilePhotoUpload = async (e: Event) => {
  const input = e.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    const allowedMime = ['image/jpeg', 'image/png', 'image/webp']
    const maxBytes = 5 * 1024 * 1024 // 5 MB

    if (!allowedMime.includes(file.type)) {
      Swal.fire('Format Tidak Didukung', 'Foto profil harus berupa JPG, PNG, atau WEBP.', 'error')
      return
    }
    if (file.size > maxBytes) {
      Swal.fire('Berkas Terlalu Besar', 'Ukuran foto profil maksimal adalah 5 MB.', 'error')
      return
    }
    try {
      const webpData = await convertToWebP(file, 0.85)
      profileForm.value.photo = webpData
    } catch (err) {
      console.error('Failed to convert profile photo to WebP:', err)
    }
  }
}
</script>
