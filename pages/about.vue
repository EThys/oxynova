<template>
  <div class="bg-white font-sans">
    <header class="relative min-h-[45vh] sm:min-h-[50vh] flex items-center justify-center text-center overflow-hidden bg-brand-900">
      <img :src="oxynovaContent.images.oxygenPlant" alt="OXYNOVA RDC" class="absolute inset-0 w-full h-full object-cover opacity-40">
      <div class="absolute inset-0 bg-brand-900/75" />
      <div class="relative z-10 container mx-auto px-4 py-16">
        <h1 class="text-[36px] sm:text-[56px] lg:text-[64px] font-[900] text-white uppercase tracking-tighter mb-4">À propos</h1>
        <p class="text-white/70 font-medium max-w-xl mx-auto">{{ oxynovaContent.slogan }}</p>
      </div>
    </header>

    <section class="py-16 sm:py-24 bg-white">
      <div class="container mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div class="rounded-[4px] overflow-hidden shadow-2xl">
            <img
              :src="oxynovaContent.images.oxygenPlant"
              alt="OXYNOVA RDC — Partenaire technique"
              class="w-full h-[300px] sm:h-[420px] object-cover object-top"
            >
          </div>
          <div>
            <span class="text-brand-700 font-[900] uppercase tracking-[0.3em] text-[11px] mb-4 block">Qui sommes-nous</span>
            <h2 class="text-[28px] sm:text-[40px] font-[900] text-[#1a1a1b] uppercase tracking-tighter mb-6 leading-tight">
              {{ oxynovaContent.fullName }}
            </h2>
            <p class="text-gray-600 font-medium text-[15px] leading-relaxed mb-4">
              {{ oxynovaContent.description }}
            </p>
            <p class="text-gray-600 font-medium text-[15px] leading-relaxed mb-6">
              Entreprise de droit congolais ({{ oxynovaContent.legalForm }}). {{ oxynovaContent.positioning }}
            </p>
            <ul class="space-y-2 text-[14px] text-gray-600 font-medium mb-6">
              <li class="flex gap-2"><span class="text-brand-600 font-[900]">▸</span> {{ oxynovaContent.headquarters }}</li>
              <li class="flex gap-2"><span class="text-brand-600 font-[900]">▸</span> {{ oxynovaContent.contact.email }}</li>
              <li class="flex gap-2"><span class="text-brand-600 font-[900]">▸</span> {{ oxynovaContent.hours.weekdays }}</li>
            </ul>
            <ul class="space-y-1 text-[12px] text-gray-500 font-medium">
              <li>N° R.C.C.M. : {{ oxynovaContent.legal.rccm }}</li>
              <li>N° ID NAT : {{ oxynovaContent.legal.idNat }}</li>
              <li>N° Impôt : {{ oxynovaContent.legal.taxId }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 sm:py-24 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12 sm:mb-16">
          <span class="text-brand-700 font-[900] uppercase tracking-[0.3em] text-[12px] mb-4 block">Notre ambition</span>
          <h2 class="text-[28px] sm:text-[40px] font-[900] text-[#1a1a1b] uppercase tracking-tighter">Vision & Mission</h2>
        </div>
        <div class="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          <article class="group bg-brand-700 p-8 sm:p-10 rounded-[4px] text-white shadow-lg card-hover-accent">
            <h3 class="text-[13px] font-[900] text-brand-100 uppercase tracking-widest mb-4">Vision</h3>
            <p class="text-white/90 text-[15px] leading-relaxed font-medium">{{ oxynovaContent.vision }}</p>
          </article>
          <article class="group bg-white p-8 sm:p-10 rounded-[4px] border border-gray-100 shadow-sm card-hover">
            <h3 class="text-[13px] font-[900] text-brand-700 uppercase tracking-widest mb-4">Mission</h3>
            <p class="text-gray-600 text-[15px] leading-relaxed font-medium">{{ oxynovaContent.mission }}</p>
          </article>
        </div>
      </div>
    </section>

    <ValuesSection />

    <section class="py-16 sm:py-24 bg-gray-50">
      <div class="container mx-auto px-4 max-w-3xl">
        <h2 class="text-[24px] sm:text-[32px] font-[900] uppercase tracking-tighter mb-4 text-[#1a1a1b]">Nos engagements</h2>
        <p class="text-gray-500 font-medium mb-8">
          Chez OXYNOVA RDC SARL, chaque projet est conduit avec une rigueur constante envers :
        </p>
        <ul class="space-y-3 mb-16">
          <li
            v-for="(item, i) in oxynovaContent.engagements"
            :key="i"
            class="flex gap-4 p-4 bg-white border border-gray-100 rounded-[4px]"
          >
            <span class="flex-shrink-0 w-8 h-8 bg-brand-700 text-white rounded-[2px] flex items-center justify-center text-[12px] font-[900]">{{ i + 1 }}</span>
            <p class="text-gray-600 font-medium text-[15px] leading-relaxed pt-1">{{ item }}</p>
          </li>
        </ul>

        <h2 class="text-[24px] sm:text-[32px] font-[900] uppercase tracking-tighter mb-8 text-[#1a1a1b]">Nos priorités</h2>
        <ul class="space-y-4">
          <li
            v-for="(point, i) in oxynovaContent.focusPoints"
            :key="i"
            class="flex gap-4 p-5 bg-white border border-gray-100 rounded-[4px] card-hover-list"
          >
            <span class="flex-shrink-0 w-8 h-8 bg-brand-700 text-white rounded-[2px] flex items-center justify-center text-[12px] font-[900]">{{ i + 1 }}</span>
            <p class="text-gray-600 font-medium text-[15px] leading-relaxed pt-1">{{ point }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="py-16 sm:py-24 bg-white">
      <div class="container mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span class="text-brand-700 font-[900] uppercase tracking-[0.3em] text-[11px] mb-4 block">Sur le terrain</span>
            <h2 class="text-[28px] sm:text-[36px] font-[900] text-[#1a1a1b] uppercase tracking-tighter mb-6">
              Maintenance biomédicale
            </h2>
            <p class="text-gray-600 font-medium text-[15px] leading-relaxed mb-6">
              Notre service Maintenance et Assistance Technique assure la disponibilité et la sécurité des équipements médicaux auprès des structures de santé.
            </p>
            <nuxt-link to="/services" class="inline-block px-8 py-4 bg-brand-700 text-white font-[900] text-[12px] uppercase tracking-wider hover:bg-brand-800 transition-colors rounded-[2px]">
              Nos activités
            </nuxt-link>
          </div>
          <div class="rounded-[4px] overflow-hidden shadow-2xl">
            <img
              :src="oxynovaContent.images.maintenance"
              alt="Maintenance biomédicale — OXYNOVA"
              class="w-full h-[300px] sm:h-[400px] object-cover object-center"
            >
          </div>
        </div>
      </div>
    </section>

    <CtaSection />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { oxynovaContent } from '~/data/content'
import { initScrollReveal } from '~/composables/useScrollObserver'

onMounted(() => nextTick(() => initScrollReveal()))

useHead({ title: 'À propos | OXYNOVA RDC SARL' })
</script>
