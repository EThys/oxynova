<template>
  <div class="bg-white font-sans">
    <header class="relative min-h-[40vh] sm:min-h-[45vh] flex items-center justify-center text-center overflow-hidden bg-brand-900">
      <img :src="oxynovaContent.images.maintenance" alt="Services OXYNOVA" class="absolute inset-0 w-full h-full object-cover opacity-40">
      <div class="absolute inset-0 bg-brand-900/75" />
      <div class="relative z-10 container mx-auto px-4 py-16">
        <h1 class="text-[36px] sm:text-[56px] font-[900] text-white uppercase tracking-tighter mb-4">Nos Activités</h1>
        <p class="text-white/70 font-medium max-w-xl mx-auto">Solutions complètes en ingénierie biomédicale</p>
      </div>
    </header>

    <section class="py-14 sm:py-20 bg-white border-b border-gray-100">
      <div class="container mx-auto px-4 max-w-2xl text-center">
        <p class="text-gray-600 font-medium text-[16px] leading-relaxed">
          Six activités essentielles, de la gestion de projet à la maintenance biomédicale.
        </p>
      </div>
    </section>

    <section class="py-14 sm:py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-[24px] sm:text-[32px] font-[900] uppercase tracking-tighter text-center mb-10 text-[#1a1a1b]">Domaines d'intervention</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <article
            v-for="domain in oxynovaContent.domains"
            :key="domain.name"
            class="p-6 sm:p-8 bg-white border border-gray-100 rounded-[4px] card-hover text-center"
          >
            <h3 class="font-[900] text-[15px] text-brand-700 uppercase tracking-tight mb-3">{{ domain.name }}</h3>
            <p class="text-gray-500 text-[13px] font-medium leading-relaxed">{{ domain.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="py-16 sm:py-24 container mx-auto px-4">
      <h2 class="text-[24px] sm:text-[32px] font-[900] uppercase tracking-tighter mb-10 text-[#1a1a1b]">Catalogue</h2>
      <div class="grid sm:grid-cols-2 gap-6 sm:gap-8">
        <article
          v-for="(service, i) in oxynovaContent.services"
          :key="service.title"
          class="group p-8 bg-white border-2 border-gray-100 rounded-[4px] card-hover"
        >
          <span class="card-icon text-brand-600 font-[900] text-[36px] leading-none opacity-20 group-hover:opacity-40 block mb-4">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="text-[20px] font-[900] text-[#1a1a1b] uppercase tracking-tight mb-3">{{ service.title }}</h3>
          <p class="text-gray-500 font-medium text-[15px] leading-relaxed mb-5">{{ service.description }}</p>
          <ul v-if="service.highlights" class="space-y-2">
            <li
              v-for="item in service.highlights"
              :key="item"
              class="flex gap-2 text-[13px] text-gray-600 font-medium"
            >
              <span class="text-brand-600 font-[900]">▸</span> {{ item }}
            </li>
          </ul>
        </article>
      </div>
    </section>

    <MethodSection />
    <CtaSection />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { oxynovaContent } from '~/data/content'

useHead({ title: 'Services | OXYNOVA RDC SARL' })
</script>
