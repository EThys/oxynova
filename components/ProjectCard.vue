<template>
  <article class="group bg-white rounded-[4px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col h-full card-hover-image">
    <div class="relative h-40 sm:h-48 overflow-hidden">
      <img :src="item.image" :alt="item.partner" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
      <div class="absolute inset-0 bg-gradient-to-t from-brand-900/70 to-transparent" />
      <div class="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
        <span class="px-2.5 py-1 bg-brand-100 text-brand-800 text-[10px] font-[900] uppercase tracking-wider rounded-[2px]">{{ item.domain }}</span>
      </div>
    </div>
    <div class="p-5 sm:p-8 flex flex-col flex-1">
      <h4 class="text-[18px] font-[900] text-[#1a1a1b] mb-2 uppercase tracking-tight">{{ item.partner }}</h4>
      <p class="text-gray-500 text-[14px] leading-relaxed font-medium mb-4 flex-1">{{ item.description }}</p>
      <p class="text-[12px] text-brand-700 font-[900] uppercase tracking-wider border-t border-gray-100 pt-4">{{ item.status }}</p>
    </div>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  item: {
    partner: string
    domain: string
    description: string
    status: string
    image: string
  }
}>()
</script>
