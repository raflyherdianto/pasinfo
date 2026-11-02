import { createRouter, createWebHistory } from 'vue-router'

const legacyPageRoute = (path: string, name: string, page: string, title: string) => ({
  path,
  name,
  component: () => import('../views/LegacyPage.vue'),
  props: { page, title },
  meta: {
    title,
    legacy: true,
    legacyPage: page === 'index.html' ? 'index.html' : `src/views/${page}`
  }
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: () => import('../views/Home.vue'), meta: { title: 'Pasuruan Info - Portal Informasi Terkini & Terpercaya' } },
    { path: '/berita/:id/:slug?', name: 'berita', component: () => import('../views/Berita.vue'), props: true },
    { 
      path: '/dashboard-member', 
      name: 'dashboard-member', 
      component: () => import('../views/DashboardMember.vue'),
      meta: { requiresAuth: true, role: 'member', title: 'Dashboard Member - Pasuruan Info' }
    },
    { 
      path: '/dashboard-penulis', 
      name: 'dashboard-penulis', 
      component: () => import('../views/DashboardPenulis.vue'),
      meta: { requiresAuth: true, role: 'penulis', title: 'Dashboard Penulis - Pasuruan Info' }
    },
    { 
      path: '/dashboard-admin', 
      name: 'dashboard-admin', 
      component: () => import('../views/DashboardAdmin.vue'),
      meta: { requiresAuth: true, role: 'admin', title: 'Dashboard Admin - Pasuruan Info' }
    },
    { path: '/jelajah', name: 'jelajah', component: () => import('../views/Jelajah.vue'), meta: { title: 'Jelajah Pasuruan - Pasuruan Info' } },
    { path: '/kategori', name: 'kategori', component: () => import('../views/Kategori.vue'), meta: { title: 'Kategori Berita - Pasuruan Info' } },
    legacyPageRoute('/portal-dev', 'portal-dev', 'index.html', 'Pasuruan Info News & Travel Tech Platform'),
    legacyPageRoute('/acara', 'legacy-acara', 'acara.html', 'Acara Pasuruan - Pasuruan Info'),
    legacyPageRoute('/agenda-budaya', 'legacy-agenda-budaya', 'agenda_budaya.html', 'Agenda Budaya - Pasuruan Info'),
    legacyPageRoute('/budaya', 'legacy-budaya', 'budaya.html', 'Budaya Pasuruan - Pasuruan Info'),
    legacyPageRoute('/cerita-budaya', 'legacy-cerita-budaya', 'cerita_budaya.html', 'Cerita Budaya - Pasuruan Info'),
    legacyPageRoute('/detail-acara', 'legacy-detail-acara', 'detail_acara.html', 'Detail Acara - Pasuruan Info'),
    legacyPageRoute('/detail-budaya', 'legacy-detail-budaya', 'detail_budaya.html', 'Detail Budaya - Pasuruan Info'),
    legacyPageRoute('/detail-kuliner', 'legacy-detail-kuliner', 'detail_kuliner.html', 'Detail Kuliner - Pasuruan Info'),
    legacyPageRoute('/detail-news', 'legacy-detail-news', 'detail_news.html', 'Detail Berita - Pasuruan Info'),
    legacyPageRoute('/detail-wisata', 'legacy-detail-wisata', 'detail_wisata.html', 'Detail Wisata - Pasuruan Info'),
    legacyPageRoute('/galeri-budaya', 'legacy-galeri-budaya', 'galeri_budaya.html', 'Galeri Budaya - Pasuruan Info'),
    legacyPageRoute('/galeri-kuliner', 'legacy-galeri-kuliner', 'galeri_kuliner.html', 'Galeri Kuliner - Pasuruan Info'),
    legacyPageRoute('/galeri-wisata', 'legacy-galeri-wisata', 'galeri_wisata.html', 'Galeri Wisata - Pasuruan Info'),
    legacyPageRoute('/kuliner', 'legacy-kuliner', 'kuliner.html', 'Kuliner Pasuruan - Pasuruan Info'),
    legacyPageRoute('/layout-news', 'legacy-layout-news', 'LayoutNews.html', 'Berita Pasuruan - Pasuruan Info'),
    legacyPageRoute('/menu-kuliner', 'legacy-menu-kuliner', 'menu_kuliner.html', 'Menu Kuliner - Pasuruan Info'),
    legacyPageRoute('/semua-cerita-budaya', 'legacy-semua-cerita-budaya', 'semua_cerita_budaya.html', 'Cerita Budaya - Pasuruan Info'),
    legacyPageRoute('/ulasan', 'legacy-ulasan', 'ulasan.html', 'Ulasan Kuliner - Pasuruan Info'),
    legacyPageRoute('/wisata', 'legacy-wisata', 'wisata.html', 'Wisata Pasuruan - Pasuruan Info'),
    { path: '/wisata-vue', name: 'wisata-vue', component: () => import('../views/Wisata.vue'), meta: { title: 'Wisata Pasuruan - Pasuruan Info' } },
    { path: '/login', name: 'login', component: () => import('../views/Login.vue'), meta: { title: 'Masuk - Pasuruan Info' } },
    { path: '/login-penulis', name: 'login-penulis', component: () => import('../views/LoginPenulis.vue'), meta: { title: 'Masuk Penulis - Pasuruan Info' } },
    { path: '/login-editor', name: 'login-editor', component: () => import('../views/LoginEditor.vue'), meta: { title: 'Masuk Editor - Pasuruan Info' } },
    { path: '/login-admin', name: 'login-admin', component: () => import('../views/LoginAdmin.vue'), meta: { title: 'Masuk Admin - Pasuruan Info' } },
    { path: '/register', name: 'register', component: () => import('../views/Register.vue'), meta: { title: 'Daftar Member - Pasuruan Info' } },
    { path: '/register-penulis', name: 'register-penulis', component: () => import('../views/RegisterPenulis.vue'), meta: { title: 'Daftar Penulis - Pasuruan Info' } },
    { path: '/lupa-password', name: 'lupa-password', component: () => import('../views/ForgotPassword.vue'), meta: { title: 'Pulihkan Password - Pasuruan Info' } },
    { 
      path: '/dashboard-editor', 
      name: 'dashboard-editor', 
      component: () => import('../views/DashboardEditor.vue'),
      meta: { requiresAuth: true, role: 'editor', title: 'Dashboard Editor - Pasuruan Info' }
    },
    { path: '/search', name: 'search', component: () => import('../views/Search.vue'), meta: { title: 'Pencarian Berita - Pasuruan Info' } },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFound.vue'), meta: { title: '404 Halaman Tidak Ditemukan - Pasuruan Info' } }
  ]
})

router.afterEach((to) => {
  const defaultTitle = 'Pasuruan Info - Portal Berita Terpercaya';
  if (to.meta && to.meta.title) {
    document.title = to.meta.title as string;
  } else {
    document.title = defaultTitle;
  }
})

router.beforeEach((to, _from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const token = localStorage.getItem('token');
  const userDataStr = localStorage.getItem('userData');
  let user: any = null;
  if (userDataStr) {
    try {
      user = JSON.parse(userDataStr);
    } catch (e) {
      // ignore
    }
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn || !token) {
      const requiredRole = to.meta.role as string;
      if (requiredRole === 'editor') {
        next({ name: 'login-editor' });
      } else if (requiredRole === 'penulis') {
        next({ name: 'login-penulis' });
      } else if (requiredRole === 'admin') {
        next({ name: 'login-admin' });
      } else {
        next({ name: 'login' });
      }
    } else {
      const requiredRole = to.meta.role as string;
      if (user && user.role === requiredRole) {
        next();
      } else {
        // Redirect non-matching role to their respective dashboard
        if (user && user.role) {
          // If the role dashboard exists, redirect to it. Otherwise home.
          const roles = ['member', 'penulis', 'editor', 'admin'];
          if (roles.includes(user.role)) {
            next({ name: `dashboard-${user.role}` });
          } else {
            next({ name: 'home' });
          }
        } else {
          next({ name: 'home' });
        }
      }
    }
  } else {
    // If logged in and trying to access login/register/register-penulis/login-penulis/login-editor/login-admin, redirect to their dashboard
    if (isLoggedIn && (to.name === 'login' || to.name === 'register' || to.name === 'register-penulis' || to.name === 'login-penulis' || to.name === 'login-editor' || to.name === 'login-admin')) {
      if (user && user.role) {
        next({ name: `dashboard-${user.role}` });
      } else {
        next({ name: 'home' });
      }
    } else {
      next();
    }
  }
})

export default router
