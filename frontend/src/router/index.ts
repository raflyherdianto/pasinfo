import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
    { path: '/wisata', name: 'wisata', component: () => import('../views/Wisata.vue'), meta: { title: 'Wisata Pasuruan - Pasuruan Info' } },
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
