<template>
  <section class="relative py-16 sm:py-24 lg:py-32 bg-white font-sans overflow-hidden">
    <div class="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-brand-50/80 via-transparent to-transparent pointer-events-none" />
    <div class="absolute -left-32 bottom-0 w-80 h-80 bg-brand-100/50 rounded-full blur-3xl pointer-events-none" />

    <div class="container mx-auto px-4 relative">
      <div class="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div class="lg:col-span-4 lg:sticky lg:top-28">
          <div class="inline-flex items-center gap-3 mb-6">
            <span class="w-10 h-px bg-brand-600" />
            <span class="text-brand-700 font-[900] uppercase tracking-[0.3em] text-[11px]">Culture</span>
          </div>
          <h2 class="text-[32px] sm:text-[44px] font-[900] text-[#1a1a1b] uppercase tracking-tighter leading-[1.05] mb-6">
            Nos<br><span class="text-brand-700">valeurs</span>
          </h2>
          <p class="text-gray-500 font-medium text-[15px] leading-relaxed max-w-sm">
            Ce qui guide chaque intervention auprès des structures de santé.
          </p>
        </div>

        <div class="lg:col-span-8 grid sm:grid-cols-2 gap-4 sm:gap-6">
          <article
            v-for="(value, i) in oxynovaContent.values"
            :key="value"
            class="group relative p-6 sm:p-8 bg-gray-50 border border-gray-100 rounded-[4px] card-hover overflow-hidden"
            :class="{ 'sm:mt-8': i % 2 === 1 }"
          >
            <span class="absolute -right-1 -top-3 text-[64px] sm:text-[72px] font-[900] text-brand-100 leading-none select-none pointer-events-none group-hover:text-brand-200 transition-colors duration-300">
              {{ String(i + 1).padStart(2, '0') }}
            </span>
            <div class="card-icon relative w-11 h-11 bg-brand-700 text-white rounded-[2px] flex items-center justify-center mb-5" v-html="icons[i % icons.length]" />
            <h3 class="relative text-[15px] sm:text-[16px] font-[900] text-[#1a1a1b] uppercase tracking-wide mb-2">{{ value }}</h3>
            <p class="relative text-gray-500 text-[13px] sm:text-[14px] font-medium leading-relaxed">{{ oxynovaContent.valueDescriptions[i] }}</p>
            <div class="absolute bottom-0 left-0 w-0 h-1 bg-brand-600 group-hover:w-full transition-all duration-500 ease-out" />
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { oxynovaContent } from '~/data/content'

const icons = [
  '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>',
  '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>',
  '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>',
  '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>',
  '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/></svg>',
]
</script>
