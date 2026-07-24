<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl sm:text-3xl font-[900] text-[#1a1a1b] uppercase tracking-tight">Tableau de bord</h1>
      <p class="text-gray-500 font-medium mt-2">Administration OXYNOVA RDC SARL.</p>
    </div>

    <div v-if="pending" class="text-gray-500 font-medium">Chargement...</div>

    <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <div class="admin-stat-card">
        <span class="admin-stat-label">Messages non lus</span>
        <span class="admin-stat-value text-brand-700">{{ stats?.unreadMessages ?? 0 }}</span>
      </div>
      <div class="admin-stat-card">
        <span class="admin-stat-label">Réalisations publiées</span>
        <span class="admin-stat-value">{{ stats?.publishedRealizations ?? 0 }}</span>
      </div>
      <div class="admin-stat-card">
        <span class="admin-stat-label">Équipe publiée</span>
        <span class="admin-stat-value text-brand-700">{{ stats?.publishedTeam ?? 0 }}</span>
      </div>
      <div class="admin-stat-card">
        <span class="admin-stat-label">Photos galerie</span>
        <span class="admin-stat-value">{{ stats?.publishedGallery ?? 0 }}</span>
      </div>
      <div class="admin-stat-card">
        <span class="admin-stat-label">Vidéos publiées</span>
        <span class="admin-stat-value text-brand-700">{{ stats?.publishedVideos ?? 0 }}</span>
      </div>
      <div class="admin-stat-card">
        <span class="admin-stat-label">Total messages</span>
        <span class="admin-stat-value">{{ stats?.totalMessages ?? 0 }}</span>
      </div>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
      <NuxtLink to="/admin/messages" class="admin-action-card">
        <h2 class="text-lg font-[900] uppercase tracking-tight mb-2">Messages</h2>
        <p class="text-gray-500 text-sm font-medium">Lire et répondre aux demandes de contact.</p>
      </NuxtLink>
      <NuxtLink to="/admin/realisations" class="admin-action-card">
        <h2 class="text-lg font-[900] uppercase tracking-tight mb-2">Réalisations</h2>
        <p class="text-gray-500 text-sm font-medium">Publier les projets affichés sur le site.</p>
      </NuxtLink>
      <NuxtLink to="/admin/equipe" class="admin-action-card">
        <h2 class="text-lg font-[900] uppercase tracking-tight mb-2">Équipe</h2>
        <p class="text-gray-500 text-sm font-medium">Gérer les profils de l'équipe.</p>
      </NuxtLink>
      <NuxtLink to="/admin/galerie" class="admin-action-card">
        <h2 class="text-lg font-[900] uppercase tracking-tight mb-2">Galerie</h2>
        <p class="text-gray-500 text-sm font-medium">Ajouter ou retirer des photos.</p>
      </NuxtLink>
      <NuxtLink to="/admin/videos" class="admin-action-card">
        <h2 class="text-lg font-[900] uppercase tracking-tight mb-2">Vidéos YouTube</h2>
        <p class="text-gray-500 text-sm font-medium">Intégrer des vidéos lues sur le site.</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const { data: stats, pending } = await useFetch('/api/admin/stats')

useHead({ title: 'Administration - OXYNOVA RDC SARL' })
</script>

<style scoped>
.admin-stat-card {
  @apply bg-white rounded-[4px] p-6 border border-gray-100 shadow-sm;
}
.admin-stat-label {
  @apply block text-[11px] font-[900] text-gray-400 uppercase tracking-widest mb-2;
}
.admin-stat-value {
  @apply block text-3xl font-[900] text-[#1a1a1b] tracking-tight;
}
.admin-action-card {
  @apply block bg-white rounded-[4px] p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-600 transition-all;
}
</style>
