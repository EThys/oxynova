<template>
  <section class="py-16 sm:py-24 lg:py-28 bg-brand-900 font-sans relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-brand-800 via-brand-900 to-brand-900" />
    <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-700/20 to-transparent pointer-events-none" />

    <div class="container mx-auto px-4 relative z-10">
      <div class="text-center mb-12 sm:mb-16 animate-on-scroll">
        <span class="text-brand-400 font-[900] uppercase tracking-[0.3em] text-[12px] mb-4 block">Méthode</span>
        <h2 class="text-[28px] sm:text-[40px] font-[900] text-white uppercase tracking-tighter">De l'étude à la maintenance</h2>
        <p class="text-white/65 font-medium mt-4 max-w-lg mx-auto">Un accompagnement clair, sans étapes superflues.</p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
        <article
          v-for="(step, i) in oxynovaContent.method"
          :key="step.title"
          class="relative bg-white/5 border border-white/10 p-6 rounded-[4px] backdrop-blur-sm hover:bg-white/10 hover:border-brand-400/40 transition-all duration-300 animate-on-scroll"
          :class="delayClass[i]"
        >
          <span class="text-brand-400 font-[900] text-[28px] leading-none block mb-3">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="text-[14px] font-[900] text-white uppercase tracking-tight mb-2">{{ step.title }}</h3>
          <p class="text-white/60 text-[13px] font-medium leading-relaxed">{{ step.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { oxynovaContent } from '~/data/content'

const delayClass = ['delay-100', 'delay-200', 'delay-300', 'delay-400', 'delay-500']
</script>
