<template>
  <div>
    <div class="mb-8">
      <NuxtLink to="/admin/equipe" class="text-brand-700 text-sm font-[900] uppercase tracking-wider hover:underline">← Retour</NuxtLink>
      <h1 class="text-2xl sm:text-3xl font-[900] text-[#1a1a1b] uppercase tracking-tight mt-4">
        {{ isEdit ? 'Modifier le membre' : 'Nouveau membre' }}
      </h1>
    </div>

    <form class="bg-white rounded-[4px] border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6 max-w-3xl" @submit.prevent="handleSubmit">
      <div class="grid sm:grid-cols-2 gap-6">
        <div>
          <label class="admin-label">Nom *</label>
          <input v-model="form.name" type="text" required class="admin-input" placeholder="Nom complet ou libellé d'équipe">
        </div>
        <div>
          <label class="admin-label">Rôle *</label>
          <input v-model="form.role" type="text" required class="admin-input" placeholder="ex. Ingénieur biomédical">
        </div>
        <div>
          <label class="admin-label">Département</label>
          <input v-model="form.department" type="text" class="admin-input" placeholder="ex. Ingénierie biomédicale">
        </div>
        <div>
          <label class="admin-label">Ordre d'affichage</label>
          <input v-model.number="form.order" type="number" min="0" class="admin-input">
        </div>
        <div class="sm:col-span-2">
          <label class="admin-label">Bio</label>
          <textarea v-model="form.bio" rows="3" class="admin-input resize-none" placeholder="Courte présentation" />
        </div>
        <div class="sm:col-span-2">
          <AdminImageUpload
            v-model="form.image"
            label="Photo"
            required
            hint="Photo portrait recommandée (format vertical)."
            preview-class="aspect-[3/4] max-h-80 object-top mx-auto w-auto sm:w-48"
          />
        </div>
        <div class="sm:col-span-2">
          <label class="flex items-center gap-3 cursor-pointer">
            <input v-model="form.published" type="checkbox" class="w-5 h-5 accent-brand-700">
            <span class="text-sm font-[900] text-[#1a1a1b] uppercase tracking-wider">Publier sur le site</span>
          </label>
        </div>
      </div>

      <p v-if="error" class="text-red-600 text-sm font-medium">{{ error }}</p>

      <div class="flex flex-wrap gap-3">
        <button type="submit" :disabled="saving" class="admin-btn-primary">
          {{ saving ? 'Enregistrement...' : (isEdit ? 'Mettre à jour' : 'Créer') }}
        </button>
        <NuxtLink to="/admin/equipe" class="admin-btn-secondary inline-flex items-center">Annuler</NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { TeamMember } from '~/types/admin'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const route = useRoute()
const isEdit = computed(() => route.params.id !== 'new')
const saving = ref(false)
const error = ref('')

const form = reactive({
  name: '',
  role: '',
  department: '',
  bio: '',
  image: '',
  published: true,
  order: 0,
})

if (isEdit.value) {
  const { data } = await useFetch<TeamMember>(`/api/admin/team/${route.params.id}`)
  if (data.value) {
    Object.assign(form, {
      name: data.value.name,
      role: data.value.role,
      department: data.value.department,
      bio: data.value.bio,
      image: data.value.image,
      published: data.value.published,
      order: data.value.order,
    })
  }
}

async function handleSubmit() {
  error.value = ''
  if (!form.image) {
    error.value = 'Ajoutez une photo du membre.'
    return
  }
  saving.value = true
  try {
    if (isEdit.value) {
      await $fetch(`/api/admin/team/${route.params.id}`, { method: 'PUT', body: { ...form } })
    }
    else {
      await $fetch('/api/admin/team', { method: 'POST', body: { ...form } })
    }
    await navigateTo('/admin/equipe')
  }
  catch {
    error.value = 'Erreur lors de l\'enregistrement.'
  }
  finally {
    saving.value = false
  }
}

useHead({ title: `${isEdit.value ? 'Modifier' : 'Nouveau'} membre - Admin OXYNOVA` })
</script>

<style scoped>
.admin-label { @apply block text-[11px] font-[900] text-gray-500 uppercase tracking-widest mb-2; }
.admin-input { @apply w-full px-4 py-3 border-2 border-gray-200 rounded-[2px] focus:border-brand-700 focus:outline-none font-medium text-[14px]; }
.admin-btn-primary { @apply px-6 py-3 bg-brand-700 text-white text-[12px] font-[900] uppercase tracking-wider rounded-[2px] hover:bg-brand-800 transition-colors disabled:opacity-50; }
.admin-btn-secondary { @apply px-6 py-3 bg-gray-100 text-gray-700 text-[12px] font-[900] uppercase tracking-wider rounded-[2px] hover:bg-gray-200 transition-colors; }
</style>
