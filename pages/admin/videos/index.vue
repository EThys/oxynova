<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h1 class="text-2xl sm:text-3xl font-[900] text-[#1a1a1b] uppercase tracking-tight">Vidéos YouTube</h1>
        <p class="text-gray-500 font-medium mt-2">Les vidéos sont lues directement sur le site (embed).</p>
      </div>
      <NuxtLink to="/admin/videos/new" class="admin-btn-primary inline-flex items-center justify-center">
        + Nouvelle vidéo
      </NuxtLink>
    </div>

    <div v-if="pending" class="text-gray-500 font-medium">Chargement...</div>

    <div v-else-if="!items?.length" class="admin-empty">
      <p class="text-gray-500 font-medium">Aucune vidéo.</p>
      <NuxtLink to="/admin/videos/new" class="admin-btn-primary inline-flex mt-4">Ajouter une vidéo</NuxtLink>
    </div>

    <div v-else class="space-y-4">
      <article
        v-for="item in items"
        :key="item.id"
        class="bg-white border border-gray-100 rounded-[4px] shadow-sm overflow-hidden grid sm:grid-cols-[240px_1fr] gap-0"
      >
        <div class="relative aspect-video sm:aspect-auto sm:h-full min-h-[140px] bg-brand-900">
          <img
            :src="`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`"
            :alt="item.title"
            class="w-full h-full object-cover opacity-90"
          >
        </div>
        <div class="p-5 flex flex-col justify-between gap-4">
          <div>
            <h2 class="font-[900] text-[#1a1a1b] text-lg uppercase tracking-tight">{{ item.title }}</h2>
            <p class="text-gray-500 text-sm font-medium mt-2 line-clamp-2">{{ item.description || '-' }}</p>
            <p class="text-brand-600 text-xs font-medium mt-2 truncate">{{ item.youtubeUrl }}</p>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <button
              type="button"
              class="text-[10px] font-[900] uppercase tracking-wider px-2 py-1 rounded-[2px]"
              :class="item.published ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'"
              :disabled="busyId === item.id"
              @click="togglePublish(item)"
            >
              {{ item.published ? 'Publié' : 'Brouillon' }}
            </button>
            <NuxtLink :to="`/admin/videos/${item.id}`" class="admin-link">Modifier</NuxtLink>
            <button type="button" class="admin-link-danger" :disabled="busyId === item.id" @click="removeItem(item.id)">Suppr.</button>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { VideoItem } from '~/types/admin'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const { data: items, pending, refresh } = await useFetch<VideoItem[]>('/api/admin/videos')
const busyId = ref<string | null>(null)

async function togglePublish(item: VideoItem) {
  busyId.value = item.id
  try {
    await $fetch(`/api/admin/videos/${item.id}`, { method: 'PUT', body: { published: !item.published } })
    await refresh()
  }
  finally {
    busyId.value = null
  }
}

async function removeItem(id: string) {
  if (!confirm('Supprimer cette vidéo ?')) return
  busyId.value = id
  try {
    await $fetch(`/api/admin/videos/${id}`, { method: 'DELETE' })
    await refresh()
  }
  finally {
    busyId.value = null
  }
}

useHead({ title: 'Vidéos - Admin OXYNOVA' })
</script>

<style scoped>
.admin-empty { @apply bg-white rounded-[4px] p-12 border border-gray-100 text-center; }
.admin-btn-primary { @apply px-5 py-3 bg-brand-700 text-white text-[12px] font-[900] uppercase tracking-wider rounded-[2px] hover:bg-brand-800 transition-colors; }
.admin-link { @apply text-brand-700 text-[11px] font-[900] uppercase tracking-wider hover:underline; }
.admin-link-danger { @apply text-red-500 text-[11px] font-[900] uppercase tracking-wider hover:underline disabled:opacity-50; }
</style>
