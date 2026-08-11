<template>
  <div class="bg-white font-sans">
    <header class="relative min-h-[36vh] sm:min-h-[42vh] flex items-center justify-center text-center overflow-hidden bg-brand-900">
      <img src="/images/team.jpg" alt="Équipe OXYNOVA" class="absolute inset-0 w-full h-full object-cover opacity-35">
      <div class="absolute inset-0 bg-brand-900/80" />
      <div class="relative z-10 container mx-auto px-4 py-16">
        <h1 class="text-[36px] sm:text-[56px] font-[900] text-white uppercase tracking-tighter mb-4">Notre Équipe</h1>
        <p class="text-white/70 font-medium max-w-xl mx-auto">L'équipe derrière OXYNOVA RDC</p>
      </div>
    </header>

    <section class="py-16 sm:py-24 lg:py-28 bg-white">
      <div class="container mx-auto px-4">
        <div v-if="pending" class="text-center py-16 text-gray-500 font-medium">Chargement de l'équipe...</div>

        <div v-else-if="members.length" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          <button
            v-for="(member, i) in members"
            :key="member.id"
            type="button"
            class="group relative aspect-[3/4] overflow-hidden rounded-[2px] shadow-xl bg-brand-900 cursor-zoom-in w-full text-left"
            @click="lightbox = member.image"
          >
            <img
              :src="member.image"
              :alt="member.name || 'Membre de l\'équipe OXYNOVA'"
              class="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
              :loading="i === 0 ? 'eager' : 'lazy'"
            >
            <div
              class="absolute inset-0 transition-colors duration-500"
              :class="member.name
                ? 'bg-gradient-to-t from-brand-900/85 via-brand-900/20 to-transparent'
                : 'bg-brand-900/0 group-hover:bg-brand-900/20'"
            />
            <div
              v-if="member.name"
              class="absolute inset-x-0 bottom-0 p-4 sm:p-5"
            >
              <p
                v-if="member.role"
                class="text-brand-300 text-[10px] sm:text-[11px] font-[900] uppercase tracking-[0.18em] mb-1.5"
              >
                {{ member.role }}
              </p>
              <p class="text-white text-[14px] sm:text-[16px] font-[900] uppercase tracking-tight leading-snug">
                {{ member.name }}
              </p>
            </div>
            <span
              v-else
              class="absolute bottom-4 right-4 text-white/90 text-[10px] font-[900] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Agrandir
            </span>
          </button>
        </div>

        <div v-else class="text-center py-16 text-gray-400 font-medium">
          Aucun membre publié pour le moment.
        </div>
      </div>
    </section>

    <Teleport to="body">
      <div
        v-if="lightbox"
        class="fixed inset-0 z-[100] bg-brand-900/92 flex items-center justify-center p-4 sm:p-8"
        @click.self="lightbox = null"
      >
        <button
          type="button"
          class="absolute top-4 right-4 text-white text-sm font-[900] uppercase tracking-wider hover:text-brand-300"
          @click="lightbox = null"
        >
          Fermer
        </button>
        <img
          :src="lightbox"
          alt="Membre de l'équipe OXYNOVA"
          class="max-w-full max-h-[88vh] object-contain rounded-[2px] shadow-2xl"
        >
      </div>
    </Teleport>

    <CtaSection />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { oxynovaContent } from '~/data/content'
import type { TeamMember } from '~/types/admin'

const { data: apiTeam, pending, refresh } = await useFetch<TeamMember[]>('/api/team', {
  key: 'public-team',
  default: () => [],
  server: true,
  lazy: false,
})

const lightbox = ref<string | null>(null)

onMounted(() => {
  if (!apiTeam.value?.length) refresh()
  window.addEventListener('keydown', onKey)
})

onUnmounted(() => window.removeEventListener('keydown', onKey))

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') lightbox.value = null
}

const members = computed(() => {
  const list = apiTeam.value?.length
    ? [...apiTeam.value]
    : oxynovaContent.team.map((m, i) => ({
        id: `fallback-${i}`,
        name: m.name,
        role: m.role,
        department: m.department,
        bio: m.bio,
        image: m.image,
        published: true,
        order: i,
        createdAt: '',
        updatedAt: '',
      }))
  return list.sort((a, b) => a.order - b.order)
})

usePageSeo('equipe')
</script>
