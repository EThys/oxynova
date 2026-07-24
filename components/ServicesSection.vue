<template>
  <section class="py-16 sm:py-24 lg:py-32 bg-white font-sans">
    <div class="container mx-auto px-4">
      <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 animate-on-scroll">
        <div>
          <span class="text-brand-700 font-[900] uppercase tracking-[0.3em] text-[12px] mb-4 block">Expertise</span>
          <h2 class="text-[28px] sm:text-[40px] font-[900] text-[#1a1a1b] uppercase tracking-tighter">Nos services</h2>
        </div>
        <nuxt-link to="/services" class="text-brand-700 font-[900] text-[12px] uppercase tracking-wider hover:underline">
          Voir tous les services
        </nuxt-link>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <article
          v-for="(service, i) in previewServices"
          :key="service.title"
          class="group p-6 sm:p-8 bg-brand-50 border border-brand-100 rounded-[4px] card-hover animate-on-scroll animate-scale"
          :class="delayClass[i]"
        >
          <div class="card-icon w-10 h-10 bg-brand-700 text-white rounded-[2px] flex items-center justify-center font-[900] text-sm mb-4">
            {{ String(i + 1).padStart(2, '0') }}
          </div>
          <h3 class="text-[16px] font-[900] text-[#1a1a1b] uppercase tracking-tight mb-2">{{ service.title }}</h3>
          <p class="text-gray-500 text-[14px] leading-relaxed font-medium">{{ service.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { oxynovaContent } from '~/data/content'

const previewServices = oxynovaContent.services.slice(0, 3)
const delayClass = ['delay-100', 'delay-200', 'delay-300']
</script>
