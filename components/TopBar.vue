<template>
  <div
    class="topbar bg-brand-800 text-white text-[12px] hidden lg:block border-b border-white/10 overflow-hidden"
    :class="compact ? 'topbar--compact' : 'topbar--full'"
  >
    <div class="container mx-auto px-4 flex justify-between items-center h-9">
      <div class="flex items-center space-x-6">
        <div class="flex items-center gap-2">
          <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/></svg>
          <span>Gombe, Kinshasa · RDC</span>
        </div>
        <div class="flex items-center gap-2 border-l border-white/20 pl-6">
          <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          <span>{{ oxynovaContent.contact.email }}</span>
        </div>
        <a :href="`tel:${oxynovaContent.contact.phone.replace(/\s/g, '')}`" class="flex items-center gap-2 border-l border-white/20 pl-6 hover:text-white/90">
          <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
          <span>{{ oxynovaContent.contact.phone }}</span>
        </a>
        <a
          :href="`https://wa.me/${oxynovaContent.contact.whatsapp}`"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 border-l border-white/20 pl-6 hover:text-white/90"
        >
          <span>WhatsApp {{ oxynovaContent.contact.phoneAlt }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { oxynovaContent } from '~/data/content'

defineProps<{
  compact?: boolean
}>()
</script>

<style scoped>
.topbar {
  transition:
    max-height 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.3s ease,
    border-color 0.3s ease;
}

.topbar--full {
  max-height: 2.5rem;
  opacity: 1;
}

.topbar--compact {
  max-height: 0;
  opacity: 0;
  border-color: transparent;
  pointer-events: none;
}
</style>
