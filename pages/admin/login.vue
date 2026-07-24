<template>
  <div class="min-h-screen bg-brand-900 flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <div class="inline-flex mx-auto mb-4 bg-white rounded-[4px] px-4 py-3 shadow-lg">
          <img src="/images/logo.png" alt="OXYNOVA RDC SARL" class="h-14 w-auto object-contain">
        </div>
        <p class="text-white/60 text-sm font-medium">Espace d'administration</p>
      </div>

      <form class="bg-white rounded-[4px] p-8 shadow-2xl space-y-6" @submit.prevent="handleLogin">
        <div>
          <label class="block text-[12px] font-[900] text-[#1a1a1b] uppercase tracking-widest mb-3">
            Mot de passe
          </label>
          <input
            v-model="password"
            type="password"
            required
            autofocus
            class="admin-input"
            placeholder="Entrez votre mot de passe"
          >
        </div>

        <p v-if="error" class="text-red-600 text-sm font-medium">{{ error }}</p>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-4 bg-brand-700 text-white font-[900] text-[13px] uppercase tracking-wider hover:bg-brand-800 transition-colors rounded-[2px] disabled:opacity-50"
        >
          {{ loading ? 'Connexion...' : 'Se connecter' }}
        </button>
      </form>

      <p class="text-center mt-6">
        <NuxtLink to="/" class="text-white/50 text-sm hover:text-white transition-colors">
          â† Retour au site public
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const password = ref('')
const error = ref('')
const loading = ref(false)
const { authenticated, login, fetchAuth } = useAdminAuth()

onMounted(async () => {
  await fetchAuth()
  if (authenticated.value) {
    await navigateTo('/admin')
  }
})

async function handleLogin() {
  error.value = ''
  loading.value = true
  try {
    await login(password.value)
    await navigateTo('/admin')
  }
  catch {
    error.value = 'Mot de passe incorrect.'
  }
  finally {
    loading.value = false
  }
}

useHead({ title: 'Connexion Admin - OXYNOVA RDC SARL' })
</script>

<style scoped>
.admin-input {
  @apply w-full px-4 py-3.5 border-2 border-gray-200 rounded-[2px] focus:border-brand-700 focus:outline-none font-medium text-[15px];
}
</style>
