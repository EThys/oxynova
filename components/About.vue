<template>
  <section id="about" class="py-16 sm:py-24 lg:py-32 bg-white font-sans">
    <div class="container mx-auto px-4">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div class="relative animate-on-scroll animate-left">
          <div class="rounded-[2px] overflow-hidden shadow-2xl">
            <img
              :src="oxynovaContent.images.maintenance"
              alt="Maintenance biomédicale — OXYNOVA RDC"
              class="w-full h-[320px] sm:h-[420px] object-cover object-center"
            />
          </div>
          <div class="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-8 bg-white p-2 sm:p-3 rounded-[2px] shadow-xl hidden sm:block card-hover-accent animate-float">
            <img :src="oxynovaContent.images.logo" alt="OXYNOVA" class="h-12 sm:h-14 w-auto object-contain">
          </div>
        </div>

        <div class="animate-on-scroll animate-right delay-200">
          <span class="text-brand-700 font-[900] uppercase tracking-[0.3em] text-[11px] sm:text-[12px] mb-4 block">Qui sommes-nous</span>
          <h2 class="text-[28px] sm:text-[40px] lg:text-[48px] font-[900] text-[#1a1a1b] leading-[1.05] tracking-tighter uppercase mb-6">
            Partenaire technique<br>des structures de santé
          </h2>
          <p class="text-gray-500 text-[15px] sm:text-[16px] leading-relaxed font-medium mb-6">
            {{ oxynovaContent.description }}
          </p>
          <p class="text-gray-500 text-[15px] leading-relaxed font-medium mb-8">
            {{ oxynovaContent.positioning }} Siège à Kinshasa : {{ oxynovaContent.headquarters }}.
          </p>
          <nuxt-link to="/about" class="inline-block px-8 py-4 bg-brand-700 text-white font-[900] text-[12px] uppercase tracking-wider hover:bg-brand-800 transition-colors rounded-[2px]">
            En savoir plus
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { oxynovaContent } from '~/data/content'
</script>
