<template>
  <div class="bg-white font-sans">
    <header class="relative min-h-[36vh] sm:min-h-[42vh] flex items-center justify-center text-center overflow-hidden bg-brand-900">
      <img src="/images/tzo.jpg" alt="Équipe OXYNOVA" class="absolute inset-0 w-full h-full object-cover opacity-35">
      <div class="absolute inset-0 bg-brand-900/80" />
      <div class="relative z-10 container mx-auto px-4 py-16">
        <h1 class="text-[36px] sm:text-[56px] font-[900] text-white uppercase tracking-tighter mb-4">Notre Équipe</h1>
        <p class="text-white/70 font-medium max-w-xl mx-auto">L'équipe technique derrière OXYNOVA RDC</p>
      </div>
    </header>

    <section class="py-16 sm:py-24 lg:py-28 bg-white">
      <div class="container mx-auto px-4">
        <div v-if="pending" class="text-center py-16 text-gray-500 font-medium">Chargement de l'équipe...</div>

        <template v-else-if="members.length">
          <!-- Directeur — même langage que la section À propos -->
          <article
            v-if="director"
            class="grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-center mb-20 sm:mb-28"
          >
            <div class="relative">
              <div class="rounded-[2px] overflow-hidden shadow-2xl">
                <img
                  :src="director.image"
                  :alt="director.name"
                  class="w-full h-[360px] sm:h-[480px] object-cover object-top"
                >
              </div>
              <div class="absolute -bottom-5 -right-3 sm:-bottom-7 sm:-right-6 bg-brand-700 text-white px-5 py-4 sm:px-7 sm:py-5 rounded-[2px] shadow-xl hidden sm:block">
                <span class="block text-[11px] font-[900] uppercase tracking-[0.2em] text-white/70 mb-1">Directeur</span>
                <span class="block text-lg sm:text-xl font-[900] tracking-tighter uppercase leading-none">OXYNOVA</span>
              </div>
            </div>

            <div>
              <span class="text-brand-700 font-[900] uppercase tracking-[0.3em] text-[11px] sm:text-[12px] mb-4 block">
                Direction
              </span>
              <h2 class="text-[28px] sm:text-[40px] lg:text-[48px] font-[900] text-[#1a1a1b] leading-[1.05] tracking-tighter uppercase mb-4">
                {{ director.name }}
              </h2>
              <p class="text-brand-700 text-[13px] font-[900] uppercase tracking-wider mb-6">
                {{ director.role }}
              </p>
              <p v-if="director.bio" class="text-gray-500 text-[15px] sm:text-[16px] leading-relaxed font-medium max-w-lg">
                {{ director.bio }}
              </p>
              <div class="mt-8 h-0.5 w-14 bg-brand-600" />
            </div>
          </article>

          <!-- Équipe -->
          <div v-if="others.length">
            <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-12">
              <div>
                <span class="text-brand-700 font-[900] uppercase tracking-[0.3em] text-[11px] mb-3 block">Équipe</span>
                <h3 class="text-[24px] sm:text-[32px] font-[900] text-[#1a1a1b] uppercase tracking-tighter">
                  Collaborateurs
                </h3>
              </div>
            </div>

            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <article
                v-for="member in others"
                :key="member.id"
                class="group"
              >
                <div class="relative aspect-[3/4] overflow-hidden rounded-[2px] shadow-xl bg-brand-900 mb-5">
                  <img
                    :src="member.image"
                    :alt="member.name"
                    class="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  >
                </div>
                <p class="text-brand-700 text-[11px] font-[900] uppercase tracking-[0.2em] mb-2">
                  {{ member.department }}
                </p>
                <h4 class="text-[18px] sm:text-[20px] font-[900] text-[#1a1a1b] uppercase tracking-tight leading-tight mb-1">
                  {{ member.name }}
                </h4>
                <p class="text-gray-500 text-[13px] font-medium">
                  {{ member.role }}
                </p>
                <p v-if="member.bio" class="text-gray-400 text-[13px] font-medium leading-relaxed mt-3">
                  {{ member.bio }}
                </p>
              </article>
            </div>
          </div>
        </template>

        <div v-else class="text-center py-16 text-gray-400 font-medium">
          Aucun membre publié pour le moment.
        </div>
      </div>
    </section>

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

onMounted(() => {
  if (!apiTeam.value?.length) refresh()
})

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
  return list.sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))
})

const director = computed(() => {
  const byTitle = members.value.find(m => /directeur|direction/.test(`${m.name} ${m.role} ${m.department}`.toLowerCase()))
  return byTitle || members.value.find(m => m.order === 0) || members.value[0] || null
})

const others = computed(() => {
  if (!director.value) return members.value
  return members.value.filter(m => m.id !== director.value!.id)
})

useHead({ title: 'Équipe | OXYNOVA RDC SARL' })
</script>
