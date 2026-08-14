<template>
  <footer class="bg-white text-[#1a1a1b] pt-16 sm:pt-24 pb-8 sm:pb-12 font-sans border-t border-gray-100">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16 mb-12 sm:mb-20">
        <div class="space-y-6 sm:col-span-2 lg:col-span-1">
          <div class="flex items-center gap-3">
            <img :src="oxynovaContent.images.logo" alt="OXYNOVA RDC SARL" class="h-12 w-auto max-w-[11rem] object-contain">
          </div>
          <p class="text-gray-500 text-[14px] leading-relaxed font-medium max-w-xs">
            {{ oxynovaContent.slogan }}
          </p>
          <ul class="text-gray-400 text-[11px] font-medium space-y-1 max-w-xs leading-relaxed">
            <li>N° R.C.C.M. : {{ oxynovaContent.legal.rccm }}</li>
            <li>N° ID NAT : {{ oxynovaContent.legal.idNat }}</li>
            <li>N° Impôt : {{ oxynovaContent.legal.taxId }}</li>
          </ul>
        </div>

        <div>
          <h4 class="text-[13px] font-[900] mb-6 uppercase tracking-[0.2em] text-[#1a1a1b]">Navigation</h4>
          <ul class="space-y-3 text-gray-500 font-medium text-[14px]">
            <li><nuxt-link to="/" class="hover:text-brand-700 transition-colors">Accueil</nuxt-link></li>
            <li><nuxt-link to="/about" class="hover:text-brand-700 transition-colors">À propos</nuxt-link></li>
            <li><nuxt-link to="/services" class="hover:text-brand-700 transition-colors">Services</nuxt-link></li>
            <!-- <li><nuxt-link to="/realisations" class="hover:text-brand-700 transition-colors">Réalisations</nuxt-link></li> -->
            <li><nuxt-link to="/organisation" class="hover:text-brand-700 transition-colors">Organisation</nuxt-link></li>
            <li><nuxt-link to="/equipe" class="hover:text-brand-700 transition-colors">Équipe</nuxt-link></li>
            <li><nuxt-link to="/medias" class="hover:text-brand-700 transition-colors">Médias</nuxt-link></li>
            <li><nuxt-link to="/contact" class="hover:text-brand-700 transition-colors">Contact</nuxt-link></li>
          </ul>
        </div>

        <div>
          <h4 class="text-[13px] font-[900] mb-6 uppercase tracking-[0.2em] text-[#1a1a1b]">Contact</h4>
          <ul class="space-y-4 text-gray-500 font-medium text-[14px]">
            <li>{{ oxynovaContent.contact.address }}</li>
            <li>
              <a :href="`mailto:${oxynovaContent.contact.email}`" class="text-brand-700 font-bold hover:underline">{{ oxynovaContent.contact.email }}</a>
            </li>
            <li>
              Appels :
              <a :href="`tel:${oxynovaContent.contact.phone.replace(/\s/g, '')}`" class="text-brand-700 font-bold hover:underline">{{ oxynovaContent.contact.phone }}</a>
            </li>
            <li>
              WhatsApp :
              <a
                :href="`https://wa.me/${oxynovaContent.contact.whatsapp}`"
                target="_blank"
                rel="noopener noreferrer"
                class="text-brand-700 font-bold hover:underline"
              >{{ oxynovaContent.contact.phoneAlt }}</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-[13px] font-[900] mb-6 uppercase tracking-[0.2em] text-[#1a1a1b]">Horaires</h4>
          <p class="text-gray-500 text-[14px] font-medium">{{ oxynovaContent.hours.weekdays }}</p>
          <p v-if="oxynovaContent.hours.saturday" class="text-gray-500 text-[14px] font-medium mt-2">{{ oxynovaContent.hours.saturday }}</p>
          <a
            :href="`https://wa.me/${oxynovaContent.contact.whatsapp}`"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block mt-6 text-brand-700 font-[900] text-[12px] uppercase tracking-wider hover:text-brand-600"
          >
            WhatsApp →
          </a>
        </div>
      </div>

      <div class="border-t border-gray-100 pt-8 pb-24 sm:pb-20 md:pb-8 flex flex-col md:flex-row justify-center md:justify-between items-center text-gray-400 text-[11px] sm:text-[13px] font-bold uppercase tracking-widest gap-3 text-center md:text-left">
        <p class="w-full md:w-auto px-2 leading-relaxed">
          &copy; {{ new Date().getFullYear() }} OXYNOVA RDC SARL. Tous droits réservés.
        </p>
        <p class="w-full md:w-auto px-2">
          Développé par
          <a
            href="https://ethberg-muzola.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-brand-700 font-[900] underline underline-offset-4 decoration-brand-700/40 hover:text-brand-600 transition-colors"
          >
            Ethberg
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { oxynovaContent } from '~/data/content'
</script>
