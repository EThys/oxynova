<template>
  <div class="org-chart w-full overflow-x-auto">
    <div class="min-w-[780px] sm:min-w-0 flex flex-col items-center gap-0 py-4">
      <!-- Assemblée des associés -->
      <div class="org-node org-node--top max-w-sm w-full">
        <h3 class="org-title">{{ org.assembly.name }}</h3>
        <p class="org-desc">{{ org.assembly.description }}</p>
      </div>

      <div class="org-line-v" />

      <!-- Direction générale -->
      <div class="org-node org-node--general max-w-sm w-full">
        <h3 class="org-title">{{ org.general.name }}</h3>
        <p class="org-desc">{{ org.general.description }}</p>
      </div>

      <div class="org-line-v" />

      <!-- 2 directions support -->
      <div class="relative w-full max-w-2xl">
        <div class="org-line-h absolute top-0 left-[25%] right-[25%] hidden sm:block" />
        <div class="grid sm:grid-cols-2 gap-6 sm:gap-4 pt-6">
          <div
            v-for="dir in org.support"
            :key="dir.name"
            class="flex flex-col items-center"
          >
            <div class="org-line-v sm:h-6 h-0" />
            <div class="org-node w-full">
              <h3 class="org-title">{{ dir.name }}</h3>
              <p class="org-desc">{{ dir.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="org-line-v mt-6" />

      <!-- Directions opérationnelles -->
      <div class="relative w-full max-w-6xl">
        <div class="org-line-h absolute top-0 left-[10%] right-[10%] hidden lg:block" />
        <div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-3 pt-6">
          <div
            v-for="dir in org.operational"
            :key="dir.name"
            class="flex flex-col items-center"
          >
            <div class="org-line-v lg:h-6 h-0" />
            <div class="org-node org-node--service w-full">
              <h3 class="org-title">{{ dir.name }}</h3>
              <p class="org-desc">{{ dir.description }}</p>
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
</script>

<style scoped>
.org-node {
  @apply bg-white border-2 border-brand-200 rounded-[4px] p-5 sm:p-6 text-center shadow-sm;
}
.org-node--top {
  @apply bg-brand-900 border-brand-900 text-white shadow-lg shadow-brand-900/20;
}
.org-node--top .org-title {
  @apply text-white;
}
.org-node--top .org-desc {
  @apply text-white/75;
}
.org-node--general {
  @apply bg-brand-700 border-brand-700 text-white shadow-lg shadow-brand-700/20;
}
.org-node--general .org-title {
  @apply text-white;
}
.org-node--general .org-desc {
  @apply text-white/75;
}
.org-node--service {
  @apply border-brand-100 bg-brand-50;
}
.org-title {
  @apply text-[13px] sm:text-[14px] font-[900] uppercase tracking-tight text-[#1a1a1b] leading-snug mb-2;
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
