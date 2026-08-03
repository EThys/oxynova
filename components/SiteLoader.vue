<template>
  <Teleport to="body">
    <Transition name="site-loader" @after-leave="onAfterLeave">
      <div
        v-if="visible"
        class="site-loader fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white"
        aria-live="polite"
        aria-busy="true"
        role="status"
        aria-label="Chargement du site"
      >
        <div class="site-loader__inner relative flex items-center justify-center px-6">
          <div class="site-spinner" aria-hidden="true">
            <span class="site-spinner__ring" />
          </div>
          <img
            src="/images/logo.png"
            alt="OXYNOVA RDC SARL"
            class="site-loader__logo relative z-10 h-14 sm:h-16 w-auto object-contain"
          >
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const visible = useState('site-loader-visible', () => true)
const finished = ref(false)

const MIN_MS = 500
const MAX_MS = 1800

let startedAt = 0
let nuxtReady = false
let windowReady = false
let maxTimer: ReturnType<typeof setTimeout> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null

function finish() {
  if (finished.value) return
  if (!nuxtReady || !windowReady) return

  finished.value = true

  const elapsed = Date.now() - startedAt
  const wait = Math.max(0, MIN_MS - elapsed)

  hideTimer = setTimeout(() => {
    visible.value = false
  }, wait + 120)
}

function onAfterLeave() {
  if (import.meta.client) document.body.classList.remove('site-loading')
}

onMounted(() => {
  if (!visible.value) return

  startedAt = Date.now()
  document.body.classList.add('site-loading')

  const onWindowReady = () => {
    windowReady = true
    finish()
  }

  // Ne pas attendre window.load (toutes les images) — évite un hero « vide » intermittent
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    onWindowReady()
  }
  else {
    document.addEventListener('DOMContentLoaded', onWindowReady, { once: true })
  }

  const nuxtApp = useNuxtApp()

  const onNuxtReady = () => {
    nuxtReady = true
    finish()
  }

  nuxtApp.hook('page:finish', onNuxtReady)
  nuxtApp.hook('app:suspense:resolve', onNuxtReady)

  nextTick(() => {
    nuxtReady = true
    finish()
  })

  maxTimer = setTimeout(() => {
    nuxtReady = true
    windowReady = true
    finish()
  }, MAX_MS)
})

onUnmounted(() => {
  if (maxTimer) clearTimeout(maxTimer)
  if (hideTimer) clearTimeout(hideTimer)
  document.body.classList.remove('site-loading')
})
</script>

<style scoped>
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
  transition: opacity 0.25s ease;
}

.site-loader-leave-active {
  pointer-events: none;
  transition:
    opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.75s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.75s cubic-bezier(0.22, 1, 0.36, 1);
}

.site-loader-leave-active .site-spinner__ring {
  animation: none;
  transition: opacity 0.35s ease 0.05s, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
  opacity: 0;
  transform: scale(1.08);
}

.site-loader-leave-active .site-loader__logo {
  transition:
    opacity 0.45s ease 0.08s,
    transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
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
    border-top-color: #174794;
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
