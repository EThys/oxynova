<template>
  <div class="bg-white font-sans">
    <header class="relative min-h-[40vh] sm:min-h-[45vh] flex items-center justify-center text-center overflow-hidden bg-brand-900">
      <img src="/images/one.jpg" alt="Médias OXYNOVA" class="absolute inset-0 w-full h-full object-cover opacity-40">
      <div class="absolute inset-0 bg-brand-900/75" />
      <div class="relative z-10 container mx-auto px-4 py-16">
        <h1 class="text-[36px] sm:text-[56px] font-[900] text-white uppercase tracking-tighter mb-4">Médias</h1>
        <p class="text-white/70 font-medium max-w-xl mx-auto">Galerie photos</p>
      </div>
    </header>

    <!-- Galerie -->
    <section class="py-16 sm:py-24 bg-white">
      <div class="container mx-auto px-4">
        <div class="mb-10">
          <span class="text-brand-700 font-[900] uppercase tracking-[0.3em] text-[12px] mb-3 block">Photos</span>
          <h2 class="text-[28px] sm:text-[36px] font-[900] text-[#1a1a1b] uppercase tracking-tighter">Galerie</h2>
        </div>

        <div v-if="galleryPending" class="text-gray-500 font-medium py-8">Chargement de la galerie...</div>

        <div v-else-if="gallery?.length" class="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          <button
            v-for="item in gallery"
            :key="item.id"
            type="button"
            class="group relative aspect-[4/3] overflow-hidden rounded-[4px] border border-gray-100 text-left"
            @click="lightbox = item"
          >
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-brand-900/70 via-transparent to-transparent opacity-80" />
            <div class="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
              <p class="text-white font-[900] text-[12px] sm:text-[14px] uppercase tracking-tight">{{ item.title }}</p>
              <p v-if="item.caption" class="text-white/70 text-[11px] font-medium mt-0.5 line-clamp-1">{{ item.caption }}</p>
            </div>
          </button>
        </div>

        <div v-else class="text-gray-400 font-medium py-8">Aucune photo publiée pour le moment.</div>
      </div>
    </section>

    <!-- Vidéos (temporairement désactivé)
    <section class="py-16 sm:py-24 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="mb-10">
          <span class="text-brand-700 font-[900] uppercase tracking-[0.3em] text-[12px] mb-3 block">YouTube</span>
          <h2 class="text-[28px] sm:text-[36px] font-[900] text-[#1a1a1b] uppercase tracking-tighter">Vidéos</h2>
        </div>

        <div v-if="videosPending" class="text-gray-500 font-medium py-8">Chargement des vidéos...</div>

        <div v-else-if="videos?.length" class="grid lg:grid-cols-2 gap-8">
          <article v-for="video in videos" :key="video.id" class="bg-white border border-gray-100 rounded-[4px] overflow-hidden shadow-sm">
            <div class="aspect-video bg-brand-900">
              <iframe
                class="w-full h-full"
                :src="`https://www.youtube-nocookie.com/embed/${video.youtubeId}`"
                :title="video.title"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                loading="lazy"
              />
            </div>
            <div class="p-5 sm:p-6">
              <h3 class="text-[18px] font-[900] text-[#1a1a1b] uppercase tracking-tight">{{ video.title }}</h3>
              <p v-if="video.description" class="text-gray-500 text-[14px] font-medium leading-relaxed mt-2">{{ video.description }}</p>
            </div>
          </article>
        </div>

        <div v-else class="text-gray-400 font-medium py-8">
          Aucune vidéo publiée. Ajoutez des liens YouTube depuis l'administration.
        </div>
      </div>
    </section>
    -->

    <!-- Lightbox -->
    <Teleport to="body">
      <div
        v-if="lightbox"
        class="fixed inset-0 z-[100] bg-brand-900/90 flex items-center justify-center p-4"
        @click.self="lightbox = null"
      >
        <button
          type="button"
          class="absolute top-4 right-4 text-white text-sm font-[900] uppercase tracking-wider hover:text-brand-300"
          @click="lightbox = null"
        >
          Fermer
        </button>
        <div class="max-w-5xl w-full">
          <img :src="lightbox.image" :alt="lightbox.title" class="w-full max-h-[80vh] object-contain rounded-[2px]">
          <p class="text-white font-[900] uppercase tracking-tight mt-4 text-center">{{ lightbox.title }}</p>
          <p v-if="lightbox.caption" class="text-white/70 text-sm font-medium text-center mt-1">{{ lightbox.caption }}</p>
        </div>
      </div>
    </Teleport>

    <CtaSection />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import type { GalleryImage } from '~/types/admin'

const { gallery, pending: galleryPending } = useGallery()
// const { videos, pending: videosPending } = useVideos()

const lightbox = ref<GalleryImage | null>(null)

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') lightbox.value = null
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))

usePageSeo('medias')
</script>
