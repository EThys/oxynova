<template>
  <section class="py-16 sm:py-24 lg:py-28 relative overflow-hidden font-sans bg-brand-700">
    <div class="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800" />
    <div class="absolute inset-0 opacity-[0.12]">
      <img :src="oxynovaContent.images.maintenance" alt="" class="w-full h-full object-cover">
    </div>
    <div class="relative z-10 container mx-auto px-4 text-center animate-on-scroll animate-scale">
      <h2 class="text-[28px] sm:text-[44px] lg:text-[52px] font-[900] text-white uppercase tracking-tighter mb-6 max-w-3xl mx-auto leading-tight">
        Un projet santé ? Parlons technique
      </h2>
      <p class="text-white/80 text-[15px] sm:text-[17px] font-medium max-w-xl mx-auto mb-10">
        Étude, installation, formation et maintenance. Un accompagnement fiable, sécurisé et durable.
      </p>
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <nuxt-link to="/contact" class="inline-block px-10 sm:px-14 py-4 sm:py-5 bg-white text-brand-800 font-[900] text-[13px] uppercase tracking-[0.1em] hover:bg-brand-50 transition-all rounded-[2px] shadow-xl">
          Demander un devis
        </nuxt-link>
        <a
          :href="`https://wa.me/${oxynovaContent.contact.whatsapp}`"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block px-10 sm:px-14 py-4 sm:py-5 border-2 border-white/50 text-white font-[900] text-[13px] uppercase tracking-[0.1em] hover:bg-white/10 transition-all rounded-[2px]"
        >
          WhatsApp
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { oxynovaContent } from '~/data/content'
</script>
