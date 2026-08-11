<template>
  <div class="admin-shell min-h-screen bg-[#f4f6f9] font-sans text-[#1a1a1b]">
    <!-- Mobile top bar -->
    <header class="lg:hidden sticky top-0 z-40 bg-brand-900 text-white px-4 py-3 flex items-center justify-between shadow-lg">
      <button type="button" class="p-2 -ml-2 rounded-[4px] hover:bg-white/10" aria-label="Menu" @click="sidebarOpen = true">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
      <span class="font-[900] uppercase tracking-tight text-sm">OXYNOVA Admin</span>
      <button type="button" class="text-[11px] font-[900] uppercase tracking-wider text-white/70" @click="logout">Sortir</button>
    </header>

    <!-- Overlay mobile -->
    <div
      v-if="sidebarOpen"
      class="lg:hidden fixed inset-0 z-40 bg-brand-900/50"
      @click="sidebarOpen = false"
    />

    <aside
      class="admin-sidebar fixed inset-y-0 left-0 z-50 w-[280px] bg-brand-900 text-white flex flex-col transition-transform duration-300 lg:translate-x-0"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="px-6 pt-8 pb-6 border-b border-white/10">
        <div class="flex items-center gap-3">
          <img src="/images/logo.png" alt="OXYNOVA" class="h-10 w-auto object-contain brightness-0 invert opacity-95">
          <div class="min-w-0">
            <p class="font-[900] uppercase tracking-tight text-[15px] leading-none">OXYNOVA</p>
            <p class="text-[10px] font-[900] uppercase tracking-[0.2em] text-brand-300 mt-1.5">Administration</p>
          </div>
        </div>
      </div>

      <nav class="flex-1 px-4 py-6 space-y-1.5">
        <p class="px-3 mb-3 text-[10px] font-[900] uppercase tracking-[0.22em] text-white/40">Menu</p>
        <NuxtLink
          to="/admin"
          class="admin-side-link"
          :class="{ 'admin-side-link--active': route.path === '/admin' }"
          @click="sidebarOpen = false"
        >
          <svg class="w-5 h-5 flex-shrink-0 opacity-80" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 12a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1v-7z"/></svg>
          <span>Tableau</span>
        </NuxtLink>
        <NuxtLink
          to="/admin/messages"
          class="admin-side-link"
          :class="{ 'admin-side-link--active': route.path.startsWith('/admin/messages') }"
          @click="sidebarOpen = false"
        >
          <svg class="w-5 h-5 flex-shrink-0 opacity-80" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          <span>Messages</span>
          <span
            v-if="unreadBadge > 0"
            class="ml-auto min-w-[1.4rem] h-5 px-1.5 rounded-full bg-brand-500 text-[10px] font-[900] flex items-center justify-center"
          >
            {{ unreadBadge > 99 ? '99+' : unreadBadge }}
          </span>
        </NuxtLink>
      </nav>

      <div class="px-4 py-5 border-t border-white/10 space-y-1">
        <a href="/" target="_blank" class="admin-side-link admin-side-link--muted">
          <svg class="w-5 h-5 flex-shrink-0 opacity-70" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
          <span>Voir le site</span>
        </a>
        <button type="button" class="admin-side-link admin-side-link--muted w-full text-left" @click="logout">
          <svg class="w-5 h-5 flex-shrink-0 opacity-70" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>

    <div class="lg:pl-[280px] min-h-screen">
      <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { logout } = useAdminAuth()
const sidebarOpen = ref(false)

const { data: stats } = await useFetch('/api/admin/stats', {
  key: 'admin-stats',
  default: () => ({ unread: 0 }),
})

const unreadBadge = computed(() => Number((stats.value as { unread?: number })?.unread || 0))

watch(() => route.path, () => { sidebarOpen.value = false })

useAdminSeo('Administration')
</script>

<style scoped>
.admin-side-link {
  @apply flex items-center gap-3 px-3 py-3 rounded-[4px] text-[13px] font-[900] uppercase tracking-wider text-white/60 hover:text-white hover:bg-white/10 transition-colors;
}
.admin-side-link--active {
  @apply text-white bg-white/10 shadow-inner;
}
.admin-side-link--muted {
  @apply text-white/50 hover:text-white/90;
}
</style>
