<template>
  <section class="py-16 sm:py-24 lg:py-32 bg-gray-50 font-sans">
    <div class="container mx-auto px-4">
      <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 sm:mb-14">
        <div>
          <span class="text-brand-700 font-[900] uppercase tracking-[0.3em] text-[12px] mb-4 block">Humain</span>
          <h2 class="text-[28px] sm:text-[40px] font-[900] text-[#1a1a1b] uppercase tracking-tighter">Notre équipe</h2>
        </div>
        <nuxt-link to="/equipe" class="text-brand-700 font-[900] text-[12px] uppercase tracking-wider hover:underline">
          Voir toute l'équipe
        </nuxt-link>
      </div>

      <div v-if="preview.length" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
        <button
          v-for="(member, i) in preview"
          :key="member.id"
          type="button"
          class="group relative block aspect-[3/4] overflow-hidden rounded-[4px] shadow-[0_12px_40px_-16px_rgba(3,26,58,0.35)] ring-1 ring-brand-900/5 team-card-enter text-left cursor-zoom-in w-full"
          :style="{ animationDelay: `${i * 90}ms` }"
          @click="lightbox = member.image"
        >
          <img
            :src="member.image"
            :alt="member.name || 'Membre de l\'équipe OXYNOVA'"
            class="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
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
            <p class="text-white text-[14px] sm:text-[15px] font-[900] uppercase tracking-tight leading-snug">
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

      <div v-else class="text-center py-10 text-gray-400 font-medium text-sm">
        L'équipe sera bientôt présentée ici.
      </div>
    </div>

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
  </section>
</template>

<script setup lang="ts">
import { oxynovaContent } from '~/data/content'
import type { TeamMember } from '~/types/admin'

const { data: apiTeam, refresh } = useFetch<TeamMember[]>('/api/team', {
  key: 'public-team',
  default: () => [],
  server: true,
  lazy: true,
})

const lightbox = ref<string | null>(null)

const fallback = oxynovaContent.team.map((m, i) => ({
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

const preview = computed(() => {
  const list = (apiTeam.value?.length ? apiTeam.value : fallback)
    .slice()
    .sort((a, b) => a.order - b.order)
  return list.slice(0, 3)
})

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') lightbox.value = null
}

onMounted(() => {
  if (!apiTeam.value?.length) refresh()
  window.addEventListener('keydown', onKey)
})

onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
.team-card-enter {
  animation: teamCardIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes teamCardIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
