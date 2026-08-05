import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'
import axios from 'axios'

// Intercept all fetch calls to dynamically replace hardcoded localhost with VITE_API_URL in production
const originalFetch = window.fetch;
window.fetch = function (input, init) {
  const defaultUrl = import.meta.env.PROD ? 'https://api.pasuruaninfo.com' : 'http://localhost:8080';
  const apiUrl = (import.meta.env.VITE_API_URL as string) || defaultUrl;
  if (typeof input === 'string' && input.startsWith('http://localhost:8080')) {
    input = input.replace('http://localhost:8080', apiUrl);
  } else if (input instanceof Request && input.url.startsWith('http://localhost:8080')) {
    const newUrl = input.url.replace('http://localhost:8080', apiUrl);
    input = new Request(newUrl, input);
  }
  return originalFetch(input, init);
};

// Intercept all axios requests to dynamically replace hardcoded localhost with VITE_API_URL in production
axios.interceptors.request.use((config) => {
  const defaultUrl = import.meta.env.PROD ? 'https://api.pasuruaninfo.com' : 'http://localhost:8080';
  const apiUrl = (import.meta.env.VITE_API_URL as string) || defaultUrl;
  if (config.url && config.url.startsWith('http://localhost:8080')) {
    config.url = config.url.replace('http://localhost:8080', apiUrl);
  }
  return config;
});

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
