<template>
  <section class="py-16 sm:py-24 lg:py-32 bg-gray-50 font-sans">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12 sm:mb-16 animate-on-scroll">
        <span class="text-brand-700 font-[900] uppercase tracking-[0.3em] text-[12px] mb-4 block">Notre ambition</span>
        <h2 class="text-[28px] sm:text-[40px] font-[900] text-[#1a1a1b] uppercase tracking-tighter">Vision & Mission</h2>
      </div>

      <div class="grid md:grid-cols-3 gap-6 sm:gap-8">
        <article class="group bg-white p-8 sm:p-10 rounded-[4px] border border-gray-100 shadow-sm card-hover animate-on-scroll delay-100">
          <span class="text-brand-600 text-[11px] font-[900] uppercase tracking-widest mb-4 block">Objectif</span>
          <p class="text-gray-600 text-[15px] leading-relaxed font-medium">{{ oxynovaContent.objective }}</p>
        </article>
        <article class="group bg-brand-700 p-8 sm:p-10 rounded-[4px] text-white shadow-lg card-hover-accent animate-on-scroll delay-200">
          <span class="text-brand-100 text-[11px] font-[900] uppercase tracking-widest mb-4 block">Vision</span>
          <p class="text-white/85 text-[15px] leading-relaxed font-medium">{{ oxynovaContent.vision }}</p>
        </article>
        <article class="group bg-white p-8 sm:p-10 rounded-[4px] border border-gray-100 shadow-sm card-hover animate-on-scroll delay-300">
          <span class="text-brand-600 text-[11px] font-[900] uppercase tracking-widest mb-4 block">Mission</span>
          <p class="text-gray-600 text-[15px] leading-relaxed font-medium">{{ oxynovaContent.mission }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { oxynovaContent } from '~/data/content'
</script>
