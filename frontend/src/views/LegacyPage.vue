<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps<{
  page: string
  title: string
}>()

const route = useRoute()
const router = useRouter()
const frame = ref<HTMLIFrameElement | null>(null)
const frameHeight = ref('calc(100vh - 6rem)')
const frameError = ref(false)
let resizeObserver: ResizeObserver | undefined

const legacyRoutes: Record<string, string> = {
  'index.html': '/portal-dev',
  'acara.html': '/acara',
  'agenda_budaya.html': '/agenda-budaya',
  'budaya.html': '/budaya',
  'cerita_budaya.html': '/cerita-budaya',
  'detail_acara.html': '/detail-acara',
  'detail_budaya.html': '/detail-budaya',
  'detail_kuliner.html': '/detail-kuliner',
  'detail_news.html': '/detail-news',
  'detail_wisata.html': '/detail-wisata',
  'galeri_budaya.html': '/galeri-budaya',
  'galeri_kuliner.html': '/galeri-kuliner',
  'galeri_wisata.html': '/galeri-wisata',
  'kuliner.html': '/kuliner',
  'LayoutNews.html': '/layout-news',
  'menu_kuliner.html': '/menu-kuliner',
  'semua_cerita_budaya.html': '/semua-cerita-budaya',
  'ulasan.html': '/ulasan',
  'wisata.html': '/wisata'
}

const legacyRoutePaths = new Set(Object.values(legacyRoutes))

const frameUrl = () => {
  const legacyPath = props.page === 'index.html'
    ? 'legacy/index.html'
    : `legacy/src/views/${props.page}`
  const url = new URL(`${import.meta.env.BASE_URL}${legacyPath}`, window.location.origin)
  const requested = new URL(route.fullPath, window.location.origin)
  url.search = requested.search
  url.searchParams.set('vueShell', '1')
  url.hash = requested.hash
  return url
}

const navigateToAppRoute = (url: URL) => {
  const pageName = decodeURIComponent(url.pathname.split('/').pop() || '')
  const matchedRoute = router.resolve(url.pathname)
  const path = legacyRoutes[pageName]
    || (legacyRoutePaths.has(url.pathname) ? url.pathname : null)
    || (matchedRoute.name !== 'not-found' ? url.pathname : null)

  if (!path) return false

  const query = new URLSearchParams(url.search)
  query.delete('vueShell')
  const target = `${path}${query.toString() ? `?${query.toString()}` : ''}${url.hash}`
  if (router.resolve(target).fullPath !== route.fullPath) {
    void router.push(target)
  }
  return true
}

const onFrameLoad = () => {
  const iframe = frame.value
  const childWindow = iframe?.contentWindow
  const childDocument = iframe?.contentDocument
  if (!iframe || !childWindow || !childDocument) {
    frameError.value = true
    return
  }

  frameError.value = false
  resizeObserver?.disconnect()
  childDocument.body?.classList.remove('min-h-screen')
  childDocument.querySelector('[data-pasinfo-chat]')?.remove()
  childDocument.querySelector('[data-pasinfo-chatbot-loader]')?.remove()
  childDocument.querySelector('[data-pasinfo-chatbot]')?.remove()

  let shellStyle = childDocument.getElementById('vue-shell-layout') as HTMLStyleElement | null
  if (!shellStyle) {
    shellStyle = childDocument.createElement('style')
    shellStyle.id = 'vue-shell-layout'
    childDocument.head.append(shellStyle)
  }
  shellStyle.textContent = `
    html, body { height: auto !important; min-height: 0 !important; }
    #hero-section, [data-hero-section] {
      height: auto !important;
      min-height: ${Math.max(window.innerHeight - 96, 320)}px !important;
    }
  `

  const updateHeight = () => {
    const content = childDocument.querySelector('main')
    const height = Math.max(content?.scrollHeight || 0, childDocument.body?.scrollHeight || 0, 320)
    frameHeight.value = `${height}px`
  }

  updateHeight()
  resizeObserver = new ResizeObserver(updateHeight)
  const content = childDocument.querySelector('main')
  if (content) resizeObserver.observe(content)
  childWindow.addEventListener('resize', updateHeight)

  childDocument.addEventListener('click', (event) => {
    const mouseEvent = event as MouseEvent
    if (mouseEvent.button !== 0 || mouseEvent.metaKey || mouseEvent.ctrlKey || mouseEvent.shiftKey || mouseEvent.altKey) return

    const target = event.target as Element | null
    const anchor = target?.closest('a[href]') as HTMLAnchorElement | null
    if (!anchor || (anchor.target && anchor.target !== '_self') || anchor.hasAttribute('download')) return

    const url = new URL(anchor.href, childWindow.location.href)
    if (url.origin !== window.location.origin || url.hash && url.href.split('#')[0] === childWindow.location.href.split('#')[0]) return
    if (!navigateToAppRoute(url)) return

    event.preventDefault()
    event.stopImmediatePropagation()
  }, true)

  navigateToAppRoute(new URL(childWindow.location.href))
}

onMounted(() => {
  if (!frame.value) return
  frame.value.src = frameUrl().href
})

watch(() => route.fullPath, () => {
  if (frame.value) frame.value.src = frameUrl().href
})

watch(() => props.page, () => {
  if (frame.value) frame.value.src = frameUrl().href
})

onBeforeUnmount(() => resizeObserver?.disconnect())
</script>

<template>
  <section class="legacy-page" :aria-label="title">
    <iframe
      ref="frame"
      :title="title"
      :style="{ height: frameHeight }"
      class="legacy-page__frame"
      @load="onFrameLoad"
    />
    <p v-if="frameError" class="p-6 text-center text-red-700" role="alert">
      Halaman tidak dapat dimuat. Muat ulang halaman untuk mencoba lagi.
    </p>
  </section>
</template>

<style scoped>
.legacy-page,
.legacy-page__frame {
  display: block;
  width: 100%;
}

.legacy-page__frame {
  min-height: calc(100vh - 6rem);
  border: 0;
}
</style>
