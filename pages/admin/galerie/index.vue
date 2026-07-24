<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h1 class="text-2xl sm:text-3xl font-[900] text-[#1a1a1b] uppercase tracking-tight">Galerie</h1>
        <p class="text-gray-500 font-medium mt-2">Photos affichées sur la page Médias.</p>
      </div>
      <NuxtLink to="/admin/galerie/new" class="admin-btn-primary inline-flex items-center justify-center">
        + Nouvelle photo
      </NuxtLink>
    </div>

    <div v-if="pending" class="text-gray-500 font-medium">Chargement...</div>

    <div v-else-if="!items?.length" class="admin-empty">
      <p class="text-gray-500 font-medium">Aucune photo.</p>
      <NuxtLink to="/admin/galerie/new" class="admin-btn-primary inline-flex mt-4">Ajouter une photo</NuxtLink>
    </div>

    <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <article v-for="item in items" :key="item.id" class="bg-white border border-gray-100 rounded-[4px] overflow-hidden shadow-sm">
        <img :src="item.image" :alt="item.title" class="w-full h-40 object-cover">
        <div class="p-4">
          <p class="font-[900] text-[#1a1a1b] truncate">{{ item.title }}</p>
          <p class="text-gray-400 text-xs font-medium truncate mt-1">{{ item.caption || '-' }}</p>
          <div class="flex items-center justify-between mt-4 gap-2">
            <button
              type="button"
              class="text-[10px] font-[900] uppercase tracking-wider px-2 py-1 rounded-[2px]"
              :class="item.published ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'"
              :disabled="busyId === item.id"
              @click="togglePublish(item)"
            >
              {{ item.published ? 'Publié' : 'Brouillon' }}
            </button>
            <div class="flex gap-2">
              <NuxtLink :to="`/admin/galerie/${item.id}`" class="admin-link">Modifier</NuxtLink>
              <button type="button" class="admin-link-danger" :disabled="busyId === item.id" @click="removeItem(item.id)">Suppr.</button>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GalleryImage } from '~/types/admin'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const { data: items, pending, refresh } = await useFetch<GalleryImage[]>('/api/admin/gallery')
const busyId = ref<string | null>(null)

async function togglePublish(item: GalleryImage) {
  busyId.value = item.id
  try {
    await $fetch(`/api/admin/gallery/${item.id}`, { method: 'PUT', body: { published: !item.published } })
    await refresh()
  }
  finally {
    busyId.value = null
  }
}

async function removeItem(id: string) {
  if (!confirm('Supprimer cette photo ?')) return
  busyId.value = id
  try {
    await $fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' })
    await refresh()
  }
  finally {
    busyId.value = null
  }
}

useHead({ title: 'Galerie - Admin OXYNOVA' })
</script>

<style scoped>
.admin-empty { @apply bg-white rounded-[4px] p-12 border border-gray-100 text-center; }
.admin-btn-primary { @apply px-5 py-3 bg-brand-700 text-white text-[12px] font-[900] uppercase tracking-wider rounded-[2px] hover:bg-brand-800 transition-colors; }
.admin-link { @apply text-brand-700 text-[11px] font-[900] uppercase tracking-wider hover:underline; }
.admin-link-danger { @apply text-red-500 text-[11px] font-[900] uppercase tracking-wider hover:underline disabled:opacity-50; }
</style>
