<template>
  <div class="bg-white font-sans overflow-hidden">
    <header class="relative min-h-[40vh] flex items-center justify-center text-center overflow-hidden bg-brand-900">
      <img :src="oxynovaContent.images.maintenance" alt="Contact OXYNOVA" class="absolute inset-0 w-full h-full object-cover opacity-40">
      <div class="absolute inset-0 bg-brand-900/75" />
      <div class="relative z-10 container mx-auto px-4 py-16">
        <h1 class="text-[36px] sm:text-[56px] font-[900] text-white uppercase tracking-tighter mb-4">Contact</h1>
        <p class="text-white/70 font-medium">Parlons de votre projet santé</p>
      </div>
    </header>

    <section class="py-16 sm:py-24 container mx-auto px-4">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-20">
        <div>
          <h2 class="text-[28px] font-[900] uppercase tracking-tight mb-8">Coordonnées</h2>
          <div class="space-y-8">
            <div>
              <h3 class="text-[12px] font-[900] uppercase tracking-widest text-brand-700 mb-2">Siège</h3>
              <p class="text-gray-600 font-medium">{{ oxynovaContent.headquarters }}</p>
            </div>
            <div>
              <h3 class="text-[12px] font-[900] uppercase tracking-widest text-brand-700 mb-2">Identifiants</h3>
              <p class="text-gray-600 font-medium text-[14px]">N° R.C.C.M. : {{ oxynovaContent.legal.rccm }}</p>
              <p class="text-gray-600 font-medium text-[14px] mt-1">N° ID NAT : {{ oxynovaContent.legal.idNat }}</p>
              <p class="text-gray-600 font-medium text-[14px] mt-1">N° Impôt : {{ oxynovaContent.legal.taxId }}</p>
            </div>
            <div>
              <h3 class="text-[12px] font-[900] uppercase tracking-widest text-brand-700 mb-2">Email</h3>
              <a :href="`mailto:${oxynovaContent.contact.email}`" class="text-brand-700 font-bold hover:underline">{{ oxynovaContent.contact.email }}</a>
            </div>
            <div>
              <h3 class="text-[12px] font-[900] uppercase tracking-widest text-brand-700 mb-2">Téléphone (appels)</h3>
              <p class="text-brand-700 font-bold">
                <a :href="`tel:${oxynovaContent.contact.phone.replace(/\s/g, '')}`" class="hover:underline">{{ oxynovaContent.contact.phone }}</a>
              </p>
            </div>
            <div>
              <h3 class="text-[12px] font-[900] uppercase tracking-widest text-brand-700 mb-2">WhatsApp</h3>
              <p class="text-brand-700 font-bold">
                <a
                  :href="`https://wa.me/${oxynovaContent.contact.whatsapp}`"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hover:underline"
                >{{ oxynovaContent.contact.phoneAlt }}</a>
              </p>
            </div>
            <div>
              <h3 class="text-[12px] font-[900] uppercase tracking-widest text-brand-700 mb-2">Horaires</h3>
              <p class="text-gray-600 font-medium">{{ oxynovaContent.hours.weekdays }}</p>
              <p v-if="oxynovaContent.hours.saturday" class="text-gray-600 font-medium">{{ oxynovaContent.hours.saturday }}</p>
            </div>
            <a
              :href="`https://wa.me/${oxynovaContent.contact.whatsapp}`"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-[900] text-[12px] uppercase tracking-wider rounded-[2px] hover:opacity-90 transition-opacity"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <form class="space-y-5 bg-gray-50 p-8 sm:p-10 rounded-[4px] border border-gray-100" @submit.prevent="handleSubmit">
          <div v-if="success" class="p-4 bg-green-50 border border-green-200 rounded-[2px] text-green-800 text-sm font-medium">
            Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.
          </div>

          <div>
            <label class="form-label">Nom complet *</label>
            <input v-model="form.name" type="text" required class="form-input" placeholder="Votre nom">
          </div>
          <div>
            <label class="form-label">Organisation</label>
            <input v-model="form.company" type="text" class="form-input" placeholder="Hôpital, clinique, institution…">
          </div>
          <div>
            <label class="form-label">Email *</label>
            <input v-model="form.email" type="email" required class="form-input" placeholder="votre@email.com">
          </div>
          <div>
            <label class="form-label">Téléphone</label>
            <input v-model="form.phone" type="tel" class="form-input" placeholder="+243 ...">
          </div>
          <div>
            <label class="form-label">Service recherché *</label>
            <select v-model="form.subject" required class="form-input">
              <option value="">Sélectionnez</option>
              <option v-for="(label, key) in CONTACT_SUBJECTS" :key="key" :value="key">{{ label }}</option>
            </select>
          </div>
          <div>
            <label class="form-label">Message *</label>
            <textarea v-model="form.message" required rows="5" class="form-input resize-none" placeholder="Décrivez votre besoin..." />
          </div>

          <p v-if="error" class="text-red-600 text-sm font-medium">{{ error }}</p>

          <button
            type="submit"
            :disabled="submitting"
            class="w-full py-4 bg-brand-700 text-white font-[900] text-[13px] uppercase tracking-wider hover:bg-brand-800 transition-colors rounded-[2px] disabled:opacity-50"
          >
            {{ submitting ? 'Envoi en cours...' : 'Envoyer la demande' }}
          </button>
        </form>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { oxynovaContent } from '~/data/content'
import { CONTACT_SUBJECTS } from '~/types/admin'

const form = reactive({
  name: '',
  company: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
})

const submitting = ref(false)
const success = ref(false)
const error = ref('')

async function handleSubmit() {
  error.value = ''
  success.value = false
  submitting.value = true
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name,
        company: form.company || undefined,
        email: form.email,
        phone: form.phone || undefined,
        subject: form.subject,
        message: form.message,
      },
    })
    success.value = true
    form.name = ''
    form.company = ''
    form.email = ''
    form.phone = ''
    form.subject = ''
    form.message = ''
  }
  catch (e: unknown) {
    const fetchError = e as { data?: { statusMessage?: string } }
    error.value = fetchError.data?.statusMessage || 'Une erreur est survenue. Veuillez réessayer.'
  }
  finally {
    submitting.value = false
  }
}

usePageSeo('contact')
</script>

<style scoped>
.form-label {
  @apply block text-[12px] font-[900] text-[#1a1a1b] uppercase tracking-widest mb-2;
}
.form-input {
  @apply w-full px-4 py-3.5 border-2 border-gray-200 rounded-[2px] focus:border-brand-600 focus:outline-none font-medium text-[14px] bg-white;
}
</style>
