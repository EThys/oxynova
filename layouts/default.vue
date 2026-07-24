<template>
  <div class="font-sans antialiased text-[#1a1a1b] bg-white">
    <header
      class="site-header fixed top-0 inset-x-0 z-50 font-sans will-change-transform"
      :class="scrolled ? 'site-header--scrolled' : 'site-header--top'"
    >
      <TopBar :compact="scrolled" />
      <Navbar :compact="scrolled" />

      <!-- barre de progression au scroll -->
      <div class="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-100/80 overflow-hidden">
        <div
          class="h-full bg-brand-600 origin-left transition-[width] duration-75 ease-out"
          :style="{ width: `${scrollProgress}%` }"
        />
      </div>
    </header>

    <main class="site-main">
      <slot />
    </main>
    <BackToTop />
  </div>
</template>

<script setup lang="ts">
const scrolled = ref(false)
const scrollProgress = ref(0)
const scrollY = useState<number>('site-scroll-y', () => 0)

function onScroll() {
  const y = window.scrollY || document.documentElement.scrollTop || 0
  scrollY.value = y
  scrolled.value = y > 24

  const doc = document.documentElement
  const max = doc.scrollHeight - window.innerHeight
  scrollProgress.value = max > 0 ? Math.min(100, (y / max) * 100) : 0
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.site-header {
  @apply bg-white border-b border-gray-100;
  transition:
    box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    background-color 0.35s ease,
    backdrop-filter 0.35s ease;
}

.site-header--top {
  @apply shadow-sm;
}

.site-header--scrolled {
  @apply bg-white border-gray-100;
  box-shadow:
    0 4px 6px -1px rgba(3, 26, 58, 0.04),
    0 12px 28px -8px rgba(3, 26, 58, 0.12);
}

.site-main {
  padding-top: 4rem;
}

@media (min-width: 640px) {
  .site-main {
    padding-top: 5rem;
  }
}

@media (min-width: 1024px) {
  .site-main {
    padding-top: 7.25rem;
  }
}
</style>
