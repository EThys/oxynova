<template>
  <section class="py-16 sm:py-24 lg:py-32 bg-gray-50 font-sans">
    <div class="container mx-auto px-4">
      <div class="text-center mb-10 sm:mb-16">
        <span class="text-brand-700 font-[900] uppercase tracking-[0.3em] text-[12px] mb-4 block">Références</span>
        <h2 class="text-[28px] sm:text-[40px] font-[900] text-[#1a1a1b] uppercase tracking-tighter mb-6">Projets & Réalisations</h2>
        <nuxt-link to="/realisations" class="inline-block px-8 py-4 bg-brand-700 text-white font-[900] text-[12px] uppercase tracking-wider hover:bg-brand-800 transition-colors rounded-[2px]">
          Toutes nos réalisations
        </nuxt-link>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
        <ProjectCard v-for="(item, i) in preview" :key="item.id" :item="item" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { oxynovaContent } from '~/data/content'
import type { Realization } from '~/types/admin'

const { realizations: apiRealizations } = useRealizations()

const preview = computed(() => {
  const items = apiRealizations.value?.length
    ? apiRealizations.value.map((r: Realization) => ({
        id: r.id,
        partner: r.partner,
        domain: r.domain,
        description: r.description,
        status: r.status,
        image: r.image,
      }))
    : oxynovaContent.projects
  return items.slice(0, 2)
})
</script>
