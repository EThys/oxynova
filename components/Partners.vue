<template>
  <section id="partners" class="py-16 sm:py-24 lg:py-32 bg-white font-sans overflow-hidden">
    <div class="container mx-auto px-4">
      <div class="text-center mb-10 sm:mb-16">
        <span class="text-brand-700 font-[900] uppercase tracking-[0.3em] text-[12px] mb-4 block">Confiance</span>
        <h2 class="text-[28px] sm:text-[40px] font-[900] text-[#1a1a1b] uppercase tracking-tighter">Nos partenaires</h2>
      </div>

      <div class="overflow-hidden" @mouseenter="paused = true" @mouseleave="paused = false">
        <div class="marquee-track flex gap-6" :class="{ '[animation-play-state:paused]': paused }">
          <div v-for="n in 2" :key="n" class="flex gap-6">
            <div
              v-for="partner in oxynovaContent.partners"
              :key="`${n}-${partner.name}`"
              class="flex-shrink-0 w-56 sm:w-64 p-6 bg-gray-50 border-2 border-gray-100 rounded-[4px] card-hover text-center"
            >
              <h3 class="font-[900] text-[#1a1a1b] text-[15px] uppercase tracking-tight mb-2">{{ partner.name }}</h3>
              <p class="text-gray-400 text-[12px] font-medium uppercase tracking-wider">{{ partner.type }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { oxynovaContent } from '~/data/content'

const paused = ref(false)
</script>
