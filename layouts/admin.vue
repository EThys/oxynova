<template>
  <div class="min-h-screen bg-gray-50 font-sans">
    <header class="bg-brand-900 text-white sticky top-0 z-50 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div class="flex items-center justify-between gap-4 mb-2 sm:mb-0">
          <div class="flex items-center gap-3 min-w-0">
            <NuxtLink to="/admin" class="text-lg sm:text-xl font-[900] uppercase tracking-tight truncate">
              OXYNOVA Admin
            </NuxtLink>
            <span class="hidden sm:inline text-white/40 text-xs font-bold uppercase tracking-widest">Back-office</span>
          </div>
          <div class="flex items-center gap-1">
            <a href="/" target="_blank" class="admin-nav-link hidden sm:inline-flex">Voir le site</a>
            <button type="button" class="admin-nav-link text-red-200 hover:text-white" @click="logout">
              Déconnexion
            </button>
          </div>
        </div>
        <nav class="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          <NuxtLink to="/admin" class="admin-nav-link" :class="{ 'admin-nav-link--active': route.path === '/admin' }">
            Tableau
          </NuxtLink>
          <NuxtLink to="/admin/messages" class="admin-nav-link" :class="{ 'admin-nav-link--active': route.path.startsWith('/admin/messages') }">
            Messages
          </NuxtLink>
          <NuxtLink to="/admin/realisations" class="admin-nav-link" :class="{ 'admin-nav-link--active': route.path.startsWith('/admin/realisations') }">
            Réalisations
          </NuxtLink>
          <NuxtLink to="/admin/equipe" class="admin-nav-link" :class="{ 'admin-nav-link--active': route.path.startsWith('/admin/equipe') }">
            Équipe
          </NuxtLink>
          <NuxtLink to="/admin/galerie" class="admin-nav-link" :class="{ 'admin-nav-link--active': route.path.startsWith('/admin/galerie') }">
            Galerie
          </NuxtLink>
          <NuxtLink to="/admin/videos" class="admin-nav-link" :class="{ 'admin-nav-link--active': route.path.startsWith('/admin/videos') }">
            Vidéos
          </NuxtLink>
        </nav>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { logout } = useAdminAuth()
</script>

<style scoped>
.admin-nav-link {
  @apply px-3 py-2 text-[11px] sm:text-[12px] font-[900] uppercase tracking-wider rounded-[2px] text-white/70 hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap flex-shrink-0;
}

.admin-nav-link--active {
  @apply text-white bg-white/15;
}
</style>
