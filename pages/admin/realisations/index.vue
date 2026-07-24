<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h1 class="text-2xl sm:text-3xl font-[900] text-[#1a1a1b] uppercase tracking-tight">Réalisations</h1>
        <p class="text-gray-500 font-medium mt-2">Gérez les projets affichés sur le site public.</p>
      </div>
      <NuxtLink to="/admin/realisations/new" class="admin-btn-primary inline-flex items-center justify-center">
        + Nouvelle réalisation
      </NuxtLink>
    </div>

    <div v-if="pending" class="text-gray-500 font-medium">Chargement...</div>

    <div v-else-if="!realizations?.length" class="admin-empty">
      <p class="text-gray-500 font-medium">Aucune réalisation enregistrée.</p>
      <NuxtLink to="/admin/realisations/new" class="admin-btn-primary inline-flex mt-4">
        Créer la première réalisation
      </NuxtLink>
    </div>

    <div v-else class="bg-white rounded-[4px] border border-gray-100 shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-gray-50 border-b border-gray-100">
            <tr>
              <th class="admin-th">Projet</th>
              <th class="admin-th hidden md:table-cell">Domaine</th>
              <th class="admin-th hidden sm:table-cell">Statut</th>
              <th class="admin-th">Publication</th>
              <th class="admin-th text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="item in realizations" :key="item.id" class="hover:bg-gray-50/50">
              <td class="admin-td">
                <div class="flex items-center gap-3">
                  <img :src="item.image" :alt="item.partner" class="w-12 h-12 rounded-[2px] object-cover flex-shrink-0 hidden sm:block">
                  <div class="min-w-0">
                    <p class="font-[900] text-[#1a1a1b] truncate">{{ item.partner }}</p>
                    <p class="text-gray-400 text-xs font-medium truncate md:hidden">{{ item.domain }}</p>
                  </div>
                </div>
              </td>
              <td class="admin-td hidden md:table-cell">
                <span class="px-2 py-1 bg-brand-50 text-brand-800 text-[10px] font-[900] uppercase tracking-wider rounded-[2px]">
                  {{ item.domain }}
                </span>
              </td>
              <td class="admin-td hidden sm:table-cell text-gray-500 font-medium text-xs">{{ item.status }}</td>
              <td class="admin-td">
                <button
                  type="button"
                  class="text-[10px] font-[900] uppercase tracking-wider px-2 py-1 rounded-[2px] transition-colors"
                  :class="item.published ? 'bg-green-50 text-green-700 hover:bg-green-100' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'"
                  :disabled="toggleId === item.id"
                  @click="togglePublish(item)"
                >
                  {{ item.published ? 'Publié' : 'Brouillon' }}
                </button>
              </td>
              <td class="admin-td text-right">
                <div class="flex items-center justify-end gap-2">
                  <NuxtLink :to="`/admin/realisations/${item.id}`" class="admin-link">Modifier</NuxtLink>
                  <button
                    type="button"
                    class="admin-link-danger"
                    :disabled="toggleId === item.id"
                    @click="removeItem(item.id)"
                  >
                    Suppr.
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Realization } from '~/types/admin'

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const { data: realizations, pending, refresh } = await useFetch<Realization[]>('/api/admin/realizations')
const toggleId = ref<string | null>(null)

async function togglePublish(item: Realization) {
  toggleId.value = item.id
  try {
    await $fetch(`/api/admin/realizations/${item.id}`, {
      method: 'PUT',
      body: { published: !item.published },
    })
    await refresh()
  }
  finally {
    toggleId.value = null
  }
}

async function removeItem(id: string) {
  if (!confirm('Supprimer cette réalisation définitivement ?')) return
  toggleId.value = id
  try {
    await $fetch(`/api/admin/realizations/${id}`, { method: 'DELETE' })
    await refresh()
  }
  finally {
    toggleId.value = null
  }
}

useHead({ title: 'Réalisations - Admin OXYNOVA RDC SARL' })
</script>

<style scoped>
.admin-empty {
  @apply bg-white rounded-[4px] p-12 border border-gray-100 text-center;
}

.admin-btn-primary {
  @apply px-5 py-3 bg-brand-700 text-white text-[12px] font-[900] uppercase tracking-wider rounded-[2px] hover:bg-brand-800 transition-colors;
}

.admin-th {
  @apply px-4 py-3 text-[10px] font-[900] text-gray-400 uppercase tracking-widest;
}

.admin-td {
  @apply px-4 py-4 text-sm;
}

.admin-link {
  @apply text-brand-700 text-[11px] font-[900] uppercase tracking-wider hover:underline;
}

.admin-link-danger {
  @apply text-red-500 text-[11px] font-[900] uppercase tracking-wider hover:underline disabled:opacity-50;
}
</style>
