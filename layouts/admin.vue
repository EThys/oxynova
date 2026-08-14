<template>
  <div class="admin-shell min-h-screen bg-[#f3f4f6] font-sans text-slate-900">
    <header class="admin-navbar sticky top-0 z-40">
      <div class="admin-navbar__inner">
        <NuxtLink to="/admin" class="admin-brand" @click="menuOpen = false">
          <img src="/images/logo.png" alt="OXYNOVA" class="h-7 w-auto object-contain">
          <span class="font-semibold text-[14px] tracking-tight text-slate-900">OXYNOVA</span>
          <span class="hidden sm:inline text-slate-300">|</span>
          <span class="hidden sm:inline text-[12px] font-medium text-slate-500">Admin</span>
        </NuxtLink>

        <nav class="hidden md:flex items-center h-full ml-8 gap-0">
          <NuxtLink
            to="/admin"
            class="admin-tab"
            :class="{ 'admin-tab--active': route.path === '/admin' }"
          >
            Tableau de bord
          </NuxtLink>
          <NuxtLink
            to="/admin/messages"
            class="admin-tab"
            :class="{ 'admin-tab--active': route.path.startsWith('/admin/messages') }"
          >
            Messagerie
            <span v-if="unreadBadge > 0" class="admin-badge">{{ unreadBadge > 99 ? '99+' : unreadBadge }}</span>
          </NuxtLink>
          <NuxtLink
            to="/admin/audit"
            class="admin-tab"
            :class="{ 'admin-tab--active': route.path.startsWith('/admin/audit') }"
          >
            Journal
          </NuxtLink>
        </nav>

        <div class="ml-auto flex items-center gap-1 sm:gap-2">
          <a href="/" target="_blank" class="admin-link-quiet hidden sm:inline-flex">Voir le site</a>
          <button type="button" class="admin-link-quiet hidden sm:inline-flex" @click="logout">Déconnexion</button>
          <button type="button" class="sm:hidden admin-link-quiet !px-2" @click="logout" title="Déconnexion">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          </button>
          <button type="button" class="md:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100" aria-label="Menu" @click="menuOpen = !menuOpen">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path v-if="!menuOpen" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Overlay menu : n'altère pas la hauteur de la messagerie -->
      <div
        v-if="menuOpen"
        class="md:hidden absolute left-0 right-0 top-full border-t border-slate-200 bg-white px-3 py-2 space-y-1 shadow-lg z-50"
      >
        <NuxtLink to="/admin" class="admin-mobile-link" :class="{ 'admin-mobile-link--active': route.path === '/admin' }" @click="menuOpen = false">
          Tableau de bord
        </NuxtLink>
        <NuxtLink to="/admin/messages" class="admin-mobile-link" :class="{ 'admin-mobile-link--active': route.path.startsWith('/admin/messages') }" @click="menuOpen = false">
          Messagerie
          <span v-if="unreadBadge > 0" class="admin-badge ml-auto">{{ unreadBadge > 99 ? '99+' : unreadBadge }}</span>
        </NuxtLink>
        <NuxtLink to="/admin/audit" class="admin-mobile-link" :class="{ 'admin-mobile-link--active': route.path.startsWith('/admin/audit') }" @click="menuOpen = false">
          Journal d’activité
        </NuxtLink>
        <a href="/" target="_blank" class="admin-mobile-link" @click="menuOpen = false">Voir le site</a>
      </div>
    </header>

    <main
      :class="isMailApp
        ? 'mail-main h-[calc(100dvh-3.5rem)] overflow-hidden'
        : 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10'"
    >
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { logout } = useAdminAuth()
const menuOpen = ref(false)

const isMailApp = computed(() => route.path.startsWith('/admin/messages'))

const { data: stats } = await useFetch('/api/admin/stats', {
  key: 'admin-stats',
  default: () => ({ unread: 0 }),
})

const unreadBadge = computed(() => Number((stats.value as { unread?: number })?.unread || 0))

watch(() => route.path, () => { menuOpen.value = false })

useAdminSeo('Administration')
</script>

<style scoped>
.admin-navbar {
  @apply relative bg-white border-b border-slate-200;
}
.admin-navbar__inner {
  @apply flex items-center gap-3 px-4 sm:px-6 h-14;
}
.admin-brand {
  @apply flex items-center gap-2.5 min-w-0;
}
.admin-tab {
  @apply relative inline-flex items-center gap-2 h-14 px-4 text-[13px] font-medium text-slate-500 hover:text-slate-900 transition-colors;
}
.admin-tab--active {
  @apply text-brand-800;
}
.admin-tab--active::after {
  content: '';
  @apply absolute left-3 right-3 bottom-0 h-0.5 bg-brand-700 rounded-full;
}
.admin-badge {
  @apply min-w-[1.15rem] h-[1.15rem] px-1 rounded-full bg-brand-700 text-white text-[10px] font-semibold inline-flex items-center justify-center;
}
.admin-link-quiet {
  @apply text-[12px] font-medium text-slate-500 hover:text-slate-900 px-2.5 py-1.5 rounded-md hover:bg-slate-100 transition-colors;
}
.admin-mobile-link {
  @apply flex items-center px-3 py-2.5 rounded-md text-[13px] font-medium text-slate-600 hover:bg-slate-50;
}
.admin-mobile-link--active {
  @apply bg-brand-50 text-brand-800;
}
</style>
