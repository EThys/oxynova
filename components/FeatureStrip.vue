<template>
  <div id="services" class="relative z-20 -mt-10 sm:-mt-16 md:-mt-20 container mx-auto px-4 font-sans animate-on-scroll animate-scale delay-200">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 bg-brand-700 shadow-[0_20px_60px_-15px_rgba(23,71,148,0.45)] text-white rounded-[4px] overflow-hidden">
      <div
        v-for="(domain, index) in oxynovaContent.domains"
        :key="domain.name"
        class="p-8 sm:p-10 lg:p-12 border-b lg:border-b-0 border-white/10 hover:bg-white/10 transition-all duration-500 group text-center card-hover-dark"
        :class="{
          'sm:border-r sm:border-white/10': index % 2 === 0 && index < oxynovaContent.domains.length - 1,
          'lg:border-r': index < oxynovaContent.domains.length - 1,
        }"
      >
        <div class="mb-6 flex justify-center text-white/90 group-hover:scale-110 transition-transform duration-500" v-html="icons[domain.icon]" />
        <h3 class="text-[16px] sm:text-[18px] font-[800] mb-3 uppercase tracking-tight">{{ domain.name }}</h3>
        <p class="text-white/70 text-[13px] leading-relaxed max-w-[220px] mx-auto">{{ domain.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { oxynovaContent } from '~/data/content'

const icons: Record<string, string> = {
  biomedical: '<svg class="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/><path d="M12 8v8m-4-4h8"/></svg>',
  oxygen: '<svg class="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>',
  digital: '<svg class="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
  training: '<svg class="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>',
}
</script>
