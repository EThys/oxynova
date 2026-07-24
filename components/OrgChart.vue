<template>
  <div class="org-chart w-full overflow-x-auto">
    <div class="min-w-[720px] sm:min-w-0 flex flex-col items-center gap-0 py-4">
      <!-- Direction Générale -->
      <div class="org-node org-node--top max-w-sm w-full">
        <p class="org-role">{{ top.role }}</p>
        <h3 class="org-title">{{ top.name }}</h3>
        <p class="org-desc">{{ top.description }}</p>
      </div>

      <div class="org-line-v" />

      <!-- Directions -->
      <div class="relative w-full max-w-5xl">
        <div class="org-line-h absolute top-0 left-[12.5%] right-[12.5%] hidden md:block" />
        <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-4 pt-6">
          <div
            v-for="dir in directions"
            :key="dir.name"
            class="flex flex-col items-center"
          >
            <div class="org-line-v md:h-6 h-0" />
            <div class="org-node w-full">
              <p class="org-role">{{ dir.role }}</p>
              <h3 class="org-title">{{ dir.name }}</h3>
              <p class="org-desc">{{ dir.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="org-line-v mt-6" />

      <!-- Services -->
      <div class="relative w-full max-w-2xl">
        <div class="org-line-h absolute top-0 left-[25%] right-[25%] hidden sm:block" />
        <div class="grid sm:grid-cols-2 gap-6 sm:gap-4 pt-6">
          <div
            v-for="svc in services"
            :key="svc.name"
            class="flex flex-col items-center"
          >
            <div class="org-line-v sm:h-6 h-0" />
            <div class="org-node org-node--service w-full">
              <p class="org-role">{{ svc.role }}</p>
              <h3 class="org-title">{{ svc.name }}</h3>
              <p class="org-desc">{{ svc.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { oxynovaContent } from '~/data/content'

const org = oxynovaContent.organization
const top = org[0]
const directions = org.slice(1, 5)
const services = org.slice(5)
</script>

<style scoped>
.org-node {
  @apply bg-white border-2 border-brand-200 rounded-[4px] p-5 sm:p-6 text-center shadow-sm;
}
.org-node--top {
  @apply bg-brand-700 border-brand-700 text-white shadow-lg shadow-brand-700/20;
}
.org-node--top .org-role {
  @apply text-brand-200;
}
.org-node--top .org-title {
  @apply text-white;
}
.org-node--top .org-desc {
  @apply text-white/75;
}
.org-node--service {
  @apply border-brand-100 bg-brand-50;
}
.org-role {
  @apply text-[10px] font-[900] uppercase tracking-[0.2em] text-brand-700 mb-2;
}
.org-title {
  @apply text-[14px] sm:text-[15px] font-[900] uppercase tracking-tight text-[#1a1a1b] leading-snug mb-2;
}
.org-desc {
  @apply text-[12px] sm:text-[13px] text-gray-500 font-medium leading-relaxed;
}
.org-line-v {
  @apply w-0.5 h-8 bg-brand-300 mx-auto;
}
.org-line-h {
  @apply h-0.5 bg-brand-300;
}
</style>
