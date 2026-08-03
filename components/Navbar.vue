<template>
  <nav class="w-full font-sans">
    <div class="container mx-auto px-4">
      <div
        class="nav-row flex justify-between items-center"
        :class="compact ? 'nav-row--compact' : 'nav-row--full'"
      >
        <nuxt-link to="/" class="flex-shrink-0 flex items-center group min-w-0" @click="closeMenu">
          <img
            :src="oxynovaContent.images.logo"
            alt="OXYNOVA RDC SARL"
            class="nav-logo object-contain object-left transition-all duration-300"
            :class="compact ? 'nav-logo--compact' : 'nav-logo--full'"
          >
        </nuxt-link>

        <!-- Desktop nav -->
        <div class="hidden lg:flex items-center gap-1">
          <template v-for="item in links" :key="item.label">
            <div
              v-if="item.children"
              class="relative"
              @mouseenter="openDropdown = item.label"
              @mouseleave="openDropdown = null"
            >
              <button
                type="button"
                class="nav-link inline-flex items-center gap-1.5"
                :class="{ 'nav-link--active': isGroupActive(item) }"
                @click="openDropdown = openDropdown === item.label ? null : item.label"
              >
                {{ item.label }}
                <svg
                  class="w-3.5 h-3.5 transition-transform duration-200"
                  :class="{ 'rotate-180': openDropdown === item.label }"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <Transition name="dropdown">
                <div
                  v-if="openDropdown === item.label"
                  class="absolute left-0 top-full pt-2 min-w-[200px]"
                >
                  <div class="bg-white border border-gray-100 rounded-[4px] shadow-xl shadow-brand-900/10 py-2 overflow-hidden">
                    <nuxt-link
                      v-for="child in item.children"
                      :key="child.to"
                      :to="child.to"
                      class="block px-5 py-3 text-[12px] font-[800] uppercase tracking-widest text-[#1a1a1b] hover:bg-brand-50 hover:text-brand-700 transition-colors"
                      :class="{ 'text-brand-700 bg-brand-50': isActive(child.to) }"
                      @click="openDropdown = null"
                    >
                      {{ child.label }}
                    </nuxt-link>
                  </div>
                </div>
              </Transition>
            </div>
            <nuxt-link
              v-else
              :to="item.to!"
              class="nav-link"
              :class="{ 'nav-link--active': isActive(item.to!) }"
            >
              {{ item.label }}
            </nuxt-link>
          </template>
        </div>

        <div class="hidden lg:flex items-center gap-3">
          <nuxt-link
            to="/contact"
            class="cta-btn group"
            :class="compact ? 'cta-btn--compact' : ''"
          >
            <span>Parler à un expert</span>
            <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </nuxt-link>
        </div>

        <button
          type="button"
          class="lg:hidden relative z-[70] flex flex-col items-center justify-center gap-1.5 rounded-[3px] border border-gray-200 hover:border-brand-600 hover:bg-brand-50 transition-all duration-300"
          :class="compact ? 'w-10 h-10' : 'w-11 h-11'"
          :aria-expanded="isOpen"
          aria-label="Menu"
          @click="isOpen = !isOpen"
        >
          <span class="burger-line" :class="{ 'burger-line--top': isOpen }" />
          <span class="burger-line" :class="{ 'burger-line--mid': isOpen }" />
          <span class="burger-line" :class="{ 'burger-line--bot': isOpen }" />
        </button>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="menu-fade">
        <div v-if="isOpen" class="fixed inset-0 z-[60] lg:hidden">
          <div class="absolute inset-0 bg-brand-900/50 backdrop-blur-sm" @click="closeMenu" />
          <aside class="menu-panel absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
            <div class="px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between">
              <div class="flex items-center gap-3 min-w-0">
                <img :src="oxynovaContent.images.logo" alt="OXYNOVA RDC SARL" class="h-10 w-auto max-w-[9rem] object-contain">
              </div>
              <button
                type="button"
                class="w-10 h-10 rounded-[3px] bg-gray-50 text-brand-900 font-[900] hover:bg-brand-700 hover:text-white transition-colors"
                aria-label="Fermer"
                @click="closeMenu"
              >
                ✕
              </button>
            </div>

            <nav class="flex-1 overflow-y-auto px-4 py-6">
              <ul class="space-y-1">
                <template v-for="(item, i) in links" :key="item.label">
                  <li v-if="item.children" class="menu-item" :style="{ animationDelay: `${80 + i * 50}ms` }">
                    <button
                      type="button"
                      class="flex items-center gap-4 px-4 py-4 rounded-[4px] w-full text-left hover:bg-brand-50 text-[#1a1a1b] transition-all"
                      @click="mobileGroupOpen = mobileGroupOpen === item.label ? null : item.label"
                    >
                      <span class="text-[12px] font-[900] tracking-widest w-7 text-brand-600/50">
                        {{ String(i + 1).padStart(2, '0') }}
                      </span>
                      <span class="text-[17px] font-[900] uppercase tracking-wider flex-1">{{ item.label }}</span>
                      <svg
                        class="w-4 h-4 transition-transform"
                        :class="{ 'rotate-90': mobileGroupOpen === item.label }"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <ul v-if="mobileGroupOpen === item.label" class="ml-11 mb-2 space-y-1">
                      <li v-for="child in item.children" :key="child.to">
                        <nuxt-link
                          :to="child.to"
                          class="block px-4 py-3 rounded-[4px] text-[14px] font-[800] uppercase tracking-wider transition-colors"
                          :class="isActive(child.to) ? 'bg-brand-700 text-white' : 'text-gray-600 hover:bg-brand-50 hover:text-brand-700'"
                          @click="closeMenu"
                        >
                          {{ child.label }}
                        </nuxt-link>
                      </li>
                    </ul>
                  </li>
                  <li v-else class="menu-item" :style="{ animationDelay: `${80 + i * 50}ms` }">
                    <nuxt-link
                      :to="item.to!"
                      class="flex items-center gap-4 px-4 py-4 rounded-[4px] group transition-all duration-300"
                      :class="isActive(item.to!)
                        ? 'bg-brand-700 text-white shadow-lg shadow-brand-700/25'
                        : 'hover:bg-brand-50 text-[#1a1a1b]'"
                      @click="closeMenu"
                    >
                      <span
                        class="text-[12px] font-[900] tracking-widest w-7"
                        :class="isActive(item.to!) ? 'text-brand-200' : 'text-brand-600/50 group-hover:text-brand-600'"
                      >
                        {{ String(i + 1).padStart(2, '0') }}
                      </span>
                      <span class="text-[17px] font-[900] uppercase tracking-wider flex-1">{{ item.label }}</span>
                      <svg
                        class="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                        :class="isActive(item.to!) ? 'opacity-100' : ''"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </nuxt-link>
                  </li>
                </template>
              </ul>
            </nav>

            <div class="p-6 border-t border-gray-100 bg-brand-50/60 space-y-4">
              <a :href="`tel:${oxynovaContent.contact.phone.replace(/\s/g, '')}`" class="block text-brand-700 font-bold text-sm">
                {{ oxynovaContent.contact.phone }}
              </a>
              <nuxt-link
                to="/contact"
                class="flex items-center justify-center gap-2 w-full py-4 bg-brand-700 text-white font-[900] text-[13px] uppercase tracking-[0.1em] rounded-[3px] hover:bg-brand-800 transition-colors"
                @click="closeMenu"
              >
                Parler à un expert
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </nuxt-link>
            </div>
          </aside>
        </div>
      </Transition>
    </Teleport>
  </nav>
</template>

<script setup lang="ts">
import { oxynovaContent } from '~/data/content'

defineProps<{
  compact?: boolean
}>()

interface NavChild {
  to: string
  label: string
}

interface NavItem {
  label: string
  to?: string
  children?: NavChild[]
}

const route = useRoute()
const isOpen = ref(false)
const openDropdown = ref<string | null>(null)
const mobileGroupOpen = ref<string | null>(null)

const links: NavItem[] = [
  { to: '/', label: 'Accueil' },
  { to: '/about', label: 'À propos' },
  { to: '/services', label: 'Services' },
  // { to: '/realisations', label: 'Réalisations' },
  {
    label: 'Entreprise',
    children: [
      { to: '/organisation', label: 'Organisation' },
      { to: '/equipe', label: 'Équipe' },
    ],
  },
  { to: '/medias', label: 'Médias' },
  { to: '/contact', label: 'Contact' },
]

function isActive(path: string) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

function isGroupActive(item: NavItem) {
  return item.children?.some(c => isActive(c.to)) ?? false
}

function closeMenu() {
  isOpen.value = false
  openDropdown.value = null
  mobileGroupOpen.value = null
}

watch(isOpen, (open) => {
  if (import.meta.client) document.body.style.overflow = open ? 'hidden' : ''
})

watch(() => route.path, () => closeMenu())

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
.nav-row {
  transition: height 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.nav-row--full {
  @apply h-16 sm:h-20;
}
.nav-row--compact {
  @apply h-14 sm:h-16;
}

.nav-logo {
  transition: height 0.4s cubic-bezier(0.22, 1, 0.36, 1), width 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.nav-logo--full {
  height: 2.75rem;
  width: auto;
  max-width: 11rem;
}
@media (min-width: 640px) {
  .nav-logo--full {
    height: 3.25rem;
    max-width: 14rem;
  }
}
.nav-logo--compact {
  height: 2.25rem;
  width: auto;
  max-width: 9.5rem;
}
@media (min-width: 640px) {
  .nav-logo--compact {
    height: 2.75rem;
    max-width: 12rem;
  }
}

.nav-link {
  @apply relative px-3 py-2 text-[12px] font-[800] text-[#1a1a1b] uppercase tracking-widest transition-colors duration-300;
}
.nav-link::after {
  content: '';
  @apply absolute left-3 right-3 bottom-0.5 h-0.5 bg-brand-600 scale-x-0 origin-left transition-transform duration-300;
}
.nav-link:hover {
  @apply text-brand-700;
}
.nav-link:hover::after,
.nav-link--active::after {
  @apply scale-x-100;
}
.nav-link--active {
  @apply text-brand-700;
}

.cta-btn {
  @apply inline-flex items-center gap-2 px-6 py-3.5 bg-brand-700 text-white font-[800] text-[12px] hover:bg-brand-800 transition-all duration-300 rounded-[3px] shadow-sm uppercase tracking-[0.1em] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-700/25;
}
.cta-btn--compact {
  @apply px-5 py-2.5;
}

.burger-line {
  @apply block w-5 h-0.5 bg-brand-900 transition-all duration-300 origin-center;
}
.burger-line--top {
  @apply translate-y-[7px] rotate-45;
}
.burger-line--mid {
  @apply opacity-0 scale-x-0;
}
.burger-line--bot {
  @apply -translate-y-[7px] -rotate-45;
}

.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.3s ease;
}
.menu-fade-enter-active .menu-panel,
.menu-fade-leave-active .menu-panel {
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
}
.menu-fade-enter-from .menu-panel,
.menu-fade-leave-to .menu-panel {
  transform: translateX(100%);
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.menu-item {
  animation: menuSlideIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes menuSlideIn {
  from {
    opacity: 0;
    transform: translateX(24px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
