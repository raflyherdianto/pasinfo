<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

type ChatbotWindow = Window & { __pasinfoChatbotMounted?: boolean }

const route = useRoute()
const router = useRouter()
const isPublicPage = computed(() => {
  const name = String(route.name || '').toLowerCase()
  const path = route.path.toLowerCase()
  const isAuthPage = /^(login|register)(-|$)/.test(name)
    || name === 'lupa-password'
    || /^\/(login|register|lupa-password)(\/|$)/.test(path)

  return !isAuthPage && !route.matched.some(record => record.meta.requiresAuth)
})

let assistantPromise: Promise<void> | null = null

const appBasePath = () => new URL(import.meta.env.BASE_URL, window.location.origin).pathname.replace(/\/$/, '')

const setAssetConfig = () => {
  const basePath = appBasePath()
  document.body.dataset.assetPrefix = `${basePath}/legacy/public`
  document.body.dataset.chatDetailPrefix = `${basePath}/detail-wisata?slug=`
}

const loadScript = (url: string) => new Promise<void>((resolve, reject) => {
  const script = document.createElement('script')
  script.src = url
  script.async = false
  script.onload = () => resolve()
  script.onerror = () => {
    script.remove()
    reject(new Error(`Gagal memuat assistant script: ${url}`))
  }
  document.head.appendChild(script)
})

const mountAssistant = async () => {
  const chatbotWindow = window as ChatbotWindow
  if (chatbotWindow.__pasinfoChatbotMounted || document.querySelector('[data-pasinfo-chat]')) return

  if (!assistantPromise) {
    const base = `${appBasePath()}/legacy/public/js`
    assistantPromise = loadScript(`${base}/chatbot-reco.js`)
      .then(() => loadScript(`${base}/pasinfo-chatbot.js`))
      .finally(() => { assistantPromise = null })
  }

  try {
    await assistantPromise
  } catch (error) {
    console.error('Pasuruan Info Assistant tidak dapat dimuat.', error)
  }
}

const handleAssistantLink = (event: MouseEvent) => {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  const target = event.target
  if (!(target instanceof Element)) return
  const anchor = target.closest<HTMLAnchorElement>('[data-pasinfo-chat] a[href]')
  if (!anchor || anchor.target && anchor.target !== '_self' || anchor.hasAttribute('download')) return

  const url = new URL(anchor.href, window.location.href)
  if (url.origin !== window.location.origin || router.resolve(url.pathname).name === 'not-found') return

  event.preventDefault()
  void router.push(`${url.pathname}${url.search}${url.hash}`)
}

const syncVisibility = () => {
  const widget = document.querySelector<HTMLElement>('[data-pasinfo-chat]')
  if (widget) {
    if (!isPublicPage.value && widget.dataset.state !== 'closed') {
      widget.querySelector<HTMLButtonElement>('[data-chat-close]')?.click()
    }
    widget.hidden = !isPublicPage.value
    widget.style.display = isPublicPage.value ? '' : 'none'
  }

  if (isPublicPage.value) {
    void mountAssistant().then(() => {
      const loadedWidget = document.querySelector<HTMLElement>('[data-pasinfo-chat]')
      if (loadedWidget) {
        loadedWidget.hidden = !isPublicPage.value
        loadedWidget.style.display = isPublicPage.value ? '' : 'none'
      }
    })
  }
}

watch(isPublicPage, syncVisibility, { flush: 'post' })

onMounted(() => {
  setAssetConfig()
  document.addEventListener('click', handleAssistantLink, true)
  syncVisibility()
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleAssistantLink, true)
})
</script>

<template>
  <span class="hidden" aria-hidden="true" />
</template>
