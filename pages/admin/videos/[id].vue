<template>
  <div>
    <div class="mb-8">
      <NuxtLink to="/admin/videos" class="text-brand-700 text-sm font-[900] uppercase tracking-wider hover:underline">← Retour</NuxtLink>
      <h1 class="text-2xl sm:text-3xl font-[900] text-[#1a1a1b] uppercase tracking-tight mt-4">
        {{ isEdit ? 'Modifier la vidéo' : 'Nouvelle vidéo' }}
      </h1>
    </div>

    <form class="bg-white rounded-[4px] border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6 max-w-3xl" @submit.prevent="handleSubmit">
      <div class="space-y-6">
        <div>
          <label class="admin-label">Titre *</label>
          <input v-model="form.title" type="text" required class="admin-input" placeholder="Titre de la vidéo">
        </div>
        <div>
          <label class="admin-label">Lien YouTube *</label>
          <input v-model="form.youtubeUrl" type="url" required class="admin-input" placeholder="https://www.youtube.com/watch?v=... ou youtu.be/...">
          <p class="text-gray-400 text-xs font-medium mt-2">Collez le lien complet ; la vidéo sera intégrée et lisible sur le site.</p>
        </div>
        <div>
          <label class="admin-label">Description</label>
          <textarea v-model="form.description" rows="3" class="admin-input resize-none" placeholder="Court descriptif" />
        </div>
        <div>
          <label class="admin-label">Ordre</label>
          <input v-model.number="form.order" type="number" min="0" class="admin-input max-w-[160px]">
        </div>

        <div v-if="previewId" class="aspect-video rounded-[2px] overflow-hidden border border-gray-100 bg-black">
          <iframe
            class="w-full h-full"
            :src="`https://www.youtube-nocookie.com/embed/${previewId}`"
            title="Aperçu YouTube"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </div>

        <label class="flex items-center gap-3 cursor-pointer">
          <input v-model="form.published" type="checkbox" class="w-5 h-5 accent-brand-700">
          <span class="text-sm font-[900] text-[#1a1a1b] uppercase tracking-wider">Publier sur le site</span>
        </label>
      </div>

      <p v-if="error" class="text-red-600 text-sm font-medium">{{ error }}</p>

      <div class="flex flex-wrap gap-3">
        <button type="submit" :disabled="saving" class="admin-btn-primary">
          {{ saving ? 'Enregistrement...' : (isEdit ? 'Mettre à jour' : 'Créer') }}
        </button>
        <NuxtLink to="/admin/videos" class="admin-btn-secondary inline-flex items-center">Annuler</NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { VideoItem } from '~/types/admin'
import { extractYoutubeId } from '~/types/admin'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const route = useRoute()
const isEdit = computed(() => route.params.id !== 'new')
const saving = ref(false)
const error = ref('')

const form = reactive({
  title: '',
  description: '',
  youtubeUrl: '',
  published: true,
  order: 0,
})

const previewId = computed(() => extractYoutubeId(form.youtubeUrl))

if (isEdit.value) {
  const { data } = await useFetch<VideoItem>(`/api/admin/videos/${route.params.id}`)
  if (data.value) {
    Object.assign(form, {
      title: data.value.title,
      description: data.value.description,
      youtubeUrl: data.value.youtubeUrl,
      published: data.value.published,
      order: data.value.order,
    })
  }
}

async function handleSubmit() {
  error.value = ''
  if (!extractYoutubeId(form.youtubeUrl)) {
    error.value = 'Lien YouTube invalide.'
    return
  }
  saving.value = true
  try {
    if (isEdit.value) {
      await $fetch(`/api/admin/videos/${route.params.id}`, { method: 'PUT', body: { ...form } })
    }
    else {
      await $fetch('/api/admin/videos', { method: 'POST', body: { ...form } })
    }
    await navigateTo('/admin/videos')
  }
  catch (e: unknown) {
    const fetchError = e as { data?: { statusMessage?: string } }
    error.value = fetchError.data?.statusMessage || 'Erreur lors de l\'enregistrement.'
  }
  finally {
    saving.value = false
  }
}

useHead({ title: `${isEdit.value ? 'Modifier' : 'Nouvelle'} vidéo - Admin OXYNOVA` })
</script>

<style scoped>
.admin-label { @apply block text-[11px] font-[900] text-gray-500 uppercase tracking-widest mb-2; }
.admin-input { @apply w-full px-4 py-3 border-2 border-gray-200 rounded-[2px] focus:border-brand-700 focus:outline-none font-medium text-[14px]; }
.admin-btn-primary { @apply px-6 py-3 bg-brand-700 text-white text-[12px] font-[900] uppercase tracking-wider rounded-[2px] hover:bg-brand-800 transition-colors disabled:opacity-50; }
.admin-btn-secondary { @apply px-6 py-3 bg-gray-100 text-gray-700 text-[12px] font-[900] uppercase tracking-wider rounded-[2px] hover:bg-gray-200 transition-colors; }
</style>
