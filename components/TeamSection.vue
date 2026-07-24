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

      <div v-if="preview.length" class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        <nuxt-link
          v-for="(member, i) in preview"
          :key="member.id"
          to="/equipe"
          class="group relative block aspect-[3/4] overflow-hidden rounded-[4px] shadow-[0_12px_40px_-16px_rgba(3,26,58,0.35)] ring-1 ring-brand-900/5 team-card-enter"
          :style="{ animationDelay: `${i * 90}ms` }"
        >
          <img
            :src="member.image"
            :alt="member.name"
            class="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
          <div class="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <span class="inline-block mb-3 px-2.5 py-1 bg-brand-600 text-white text-[10px] font-[900] uppercase tracking-wider rounded-[2px]">
              {{ member.department }}
            </span>
            <h3 class="text-[18px] sm:text-[20px] font-[900] text-white uppercase tracking-tight leading-tight">
              {{ member.name }}
            </h3>
            <p class="text-brand-300 text-[12px] font-[900] uppercase tracking-wider mt-2">
              {{ member.role }}
            </p>
          </div>
        </nuxt-link>
      </div>

      <div v-else class="text-center py-10 text-gray-400 font-medium text-sm">
        L'équipe sera bientôt présentée ici.
      </div>
    </div>
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
  return list.slice(0, 4)
})

onMounted(() => {
  if (!apiTeam.value?.length) refresh()
})
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
