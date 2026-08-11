<template>
  <Teleport to="body">
    <Transition name="site-loader" @after-leave="onAfterLeave">
      <div
        v-if="visible"
        class="site-loader"
        aria-live="polite"
        aria-busy="true"
        role="status"
        aria-label="Chargement du site"
      >
        <div class="site-loader__inner">
          <div class="site-spinner" aria-hidden="true">
            <span class="site-spinner__ring" />
          </div>
          <img
            src="/images/logo.png"
            alt="OXYNOVA RDC SARL"
            class="site-loader__logo"
            width="120"
            height="64"
          >
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const visible = useState('site-loader-visible', () => true)
const finished = ref(false)
const route = useRoute()

const MIN_MS = 900
const MAX_MS = 2800
const HERO_SRC = '/images/about-one.jpg'

let startedAt = 0
let nuxtReady = false
let windowReady = false
let heroReady = false
let maxTimer: ReturnType<typeof setTimeout> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null

function needsHeroWait() {
  return route.path === '/' || route.path === ''
}

function removeHtmlBoot(immediate = false) {
  const boot = document.getElementById('site-boot')
  if (!boot) return
  if (immediate) {
    boot.remove()
    return
  }
  boot.classList.add('is-done')
  boot.setAttribute('aria-busy', 'false')
  const remove = () => boot.remove()
  boot.addEventListener('transitionend', remove, { once: true })
  setTimeout(remove, 900)
}

function tryFinish() {
  if (finished.value) return
  if (!nuxtReady || !windowReady) return
  if (needsHeroWait() && !heroReady) return

  finished.value = true

  const elapsed = Date.now() - startedAt
  const wait = Math.max(0, MIN_MS - elapsed)

  hideTimer = setTimeout(() => {
    document.documentElement.classList.add('site-ready')
    visible.value = false
    removeHtmlBoot()
  }, wait)
}

function markHeroReady() {
  heroReady = true
  tryFinish()
}

function watchHeroImage() {
  if (!needsHeroWait()) {
    markHeroReady()
    return
  }

  const existing = document.querySelectorAll<HTMLImageElement>(`img[src="${HERO_SRC}"]`)
  for (const img of existing) {
    if (img.complete && img.naturalWidth > 0) {
      markHeroReady()
      return
    }
  }

  const probe = new Image()
  probe.onload = () => markHeroReady()
  probe.onerror = () => markHeroReady()
  probe.src = HERO_SRC
  if (probe.complete && probe.naturalWidth > 0) markHeroReady()
}

function onAfterLeave() {
  if (import.meta.client) document.body.classList.remove('site-loading')
}

onMounted(() => {
  if (!visible.value) {
    removeHtmlBoot(true)
    document.documentElement.classList.add('site-ready')
    return
  }

  startedAt = Date.now()
  document.body.classList.add('site-loading')

  watchHeroImage()

  // Laisser le boot HTML jusqu'à ce que le loader Vue soit dans le DOM
  nextTick(() => {
    removeHtmlBoot(true)
  })

  const onWindowReady = () => {
    windowReady = true
    tryFinish()
  }

  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    onWindowReady()
  }
  else {
    document.addEventListener('DOMContentLoaded', onWindowReady, { once: true })
  }

  const nuxtApp = useNuxtApp()
  const onNuxtReady = () => {
    nuxtReady = true
    tryFinish()
  }

  nuxtApp.hook('page:finish', onNuxtReady)
  nuxtApp.hook('app:suspense:resolve', onNuxtReady)

  nextTick(() => {
    nuxtReady = true
    tryFinish()
  })

  maxTimer = setTimeout(() => {
    nuxtReady = true
    windowReady = true
    heroReady = true
    tryFinish()
  }, MAX_MS)
})

onUnmounted(() => {
  if (maxTimer) clearTimeout(maxTimer)
  if (hideTimer) clearTimeout(hideTimer)
  if (import.meta.client) document.body.classList.remove('site-loading')
})
</script>

<style scoped>
.site-loader {
  position: fixed;
  inset: 0;
  z-index: 2147483646;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
}

.site-loader__inner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.5rem;
}

.site-loader__logo {
  position: relative;
  z-index: 10;
  height: 3.5rem;
  width: auto;
  object-fit: contain;
}

@media (min-width: 640px) {
  .site-loader__logo {
    height: 4rem;
  }
}

.site-spinner {
  position: absolute;
  width: 9.5rem;
  height: 9.5rem;
}

@media (min-width: 640px) {
  .site-spinner {
    width: 11rem;
    height: 11rem;
  }
}

.site-spinner__ring {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  border: 2.5px solid rgb(23 71 148 / 0.12);
  border-top-color: #174794;
  border-right-color: rgb(47 125 225 / 0.45);
  animation: spin 0.85s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.site-loader-enter-active {
  transition: opacity 0.2s ease;
}

.site-loader-leave-active {
  pointer-events: none;
  transition:
    opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.65s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.65s cubic-bezier(0.22, 1, 0.36, 1);
}

.site-loader-leave-active .site-spinner__ring {
  animation: none;
  transition: opacity 0.3s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  opacity: 0;
  transform: scale(1.08);
}

.site-loader-leave-active .site-loader__logo {
  transition:
    opacity 0.4s ease 0.05s,
    transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
  opacity: 0;
  transform: scale(0.94);
}

.site-loader-enter-from,
.site-loader-leave-to {
  opacity: 0;
}

.site-loader-leave-to {
  transform: scale(1.015);
  filter: blur(4px);
}

@media (prefers-reduced-motion: reduce) {
  .site-spinner__ring {
    animation: none;
    opacity: 0.7;
  }
  .site-loader-leave-active {
    transition: opacity 0.25s ease;
  }
  .site-loader-leave-to {
    transform: none;
    filter: none;
  }
}
</style>
