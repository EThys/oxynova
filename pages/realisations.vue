<template>
  <div class="bg-white font-sans">
    <header class="relative min-h-[45vh] flex items-center justify-center text-center overflow-hidden bg-brand-900">
      <img src="/images/one.jpg" alt="Réalisations OXYNOVA" class="absolute inset-0 w-full h-full object-cover opacity-40">
      <div class="absolute inset-0 bg-brand-900/75" />
      <div class="relative z-10 container mx-auto px-4 py-16">
        <h1 class="text-[36px] sm:text-[56px] font-[900] text-white uppercase tracking-tighter mb-4">Réalisations</h1>
        <p class="text-white/70 font-medium max-w-xl mx-auto">Interventions techniques auprès des structures de santé</p>
      </div>
    </header>

    <section class="py-14 sm:py-20 bg-gray-50 border-b border-gray-100">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          <div v-for="stat in oxynovaContent.stats" :key="stat.label" class="text-center bg-white p-6 rounded-[4px] border border-gray-100 shadow-sm card-hover">
            <span class="block text-[32px] sm:text-[42px] font-[900] text-brand-700 leading-none">{{ stat.value }}</span>
            <span class="text-[11px] sm:text-[12px] text-gray-500 font-extrabold uppercase tracking-wider mt-2 block">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="py-12 container mx-auto px-4 max-w-3xl text-center">
      <p class="text-gray-600 font-medium text-[16px] leading-relaxed">
        Oxygène médical, équipements biomédicaux, digitalisation et formation : l’essentiel de notre impact terrain.
      </p>
    </section>

    <section class="pb-16 sm:pb-24 container mx-auto px-4">
      <div v-if="pending" class="text-center py-16 text-gray-500 font-medium">Chargement des réalisations...</div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <ProjectCard v-for="item in projects" :key="item.id" :item="item" />
      </div>
    </section>

    <CtaSection />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { oxynovaContent } from '~/data/content'
import type { Realization } from '~/types/admin'

const { realizations: apiRealizations, pending } = useRealizations()

const projects = computed(() => {
  if (apiRealizations.value?.length) {
    return apiRealizations.value.map((r: Realization) => ({
      id: r.id,
      partner: r.partner,
      domain: r.domain,
      description: r.description,
      status: r.status,
      image: r.image,
    }))
  }
  return oxynovaContent.projects
})

useHead({ title: 'Réalisations | OXYNOVA RDC SARL' })
</script>
