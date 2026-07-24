<template>
  <ClientOnly>
    <Teleport to="body">
      <button
        v-if="visible"
        type="button"
        class="fixed right-6 sm:right-8 z-[100] w-12 h-12 sm:w-14 sm:h-14 bg-brand-700 text-white rounded-[3px] shadow-xl flex items-center justify-center hover:bg-brand-800 transition-[bottom,background-color] duration-300"
        :style="{
          bottom: `${bottomOffset}px`,
          boxShadow: '0 12px 28px -8px rgba(3, 26, 58, 0.35)',
        }"
        aria-label="Retour en haut de page"
        @click="scrollTop"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
const scrollY = useState<number>('site-scroll-y', () => 0)
const visible = computed(() => scrollY.value > 250)

/** Remonte le bouton au-dessus du crédit footer en bas de page */
const bottomOffset = computed(() => {
  if (typeof window === 'undefined') return 24
  const doc = document.documentElement
  const remaining = doc.scrollHeight - (scrollY.value + window.innerHeight)
  // Zone footer (~120px) : on élève le bouton
  if (remaining < 140) {
    return 24 + (140 - Math.max(0, remaining))
  }
  return window.innerWidth >= 640 ? 32 : 24
})

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
