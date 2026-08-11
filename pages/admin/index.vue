<template>
  <div>
    <div class="mb-8 sm:mb-10">
      <p class="text-[11px] font-[900] uppercase tracking-[0.25em] text-brand-700 mb-2">Vue d'ensemble</p>
      <h1 class="text-2xl sm:text-[32px] font-[900] text-[#1a1a1b] uppercase tracking-tighter">Tableau de bord</h1>
      <p class="text-gray-500 font-medium mt-2">Suivi des messages reçus et des réponses.</p>
    </div>

    <div v-if="pending" class="text-gray-500 font-medium">Chargement...</div>

    <template v-else>
      <div class="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
        <NuxtLink to="/admin/messages" class="dash-card">
          <span class="dash-label">Total</span>
          <span class="dash-value">{{ stats?.total ?? 0 }}</span>
        </NuxtLink>
        <NuxtLink to="/admin/messages?status=unread" class="dash-card dash-card--accent">
          <span class="dash-label">Non lus</span>
          <span class="dash-value text-brand-700">{{ stats?.unread ?? 0 }}</span>
        </NuxtLink>
        <NuxtLink to="/admin/messages?status=read" class="dash-card">
          <span class="dash-label">Lus</span>
          <span class="dash-value">{{ stats?.read ?? 0 }}</span>
        </NuxtLink>
        <NuxtLink to="/admin/messages?status=draft" class="dash-card">
          <span class="dash-label">Brouillons</span>
          <span class="dash-value text-amber-600">{{ stats?.draft ?? 0 }}</span>
        </NuxtLink>
        <NuxtLink to="/admin/messages?status=sent" class="dash-card">
          <span class="dash-label">Envoyés</span>
          <span class="dash-value text-emerald-600">{{ stats?.sent ?? 0 }}</span>
        </NuxtLink>
      </div>

      <div class="grid sm:grid-cols-3 gap-3 sm:gap-4 mb-10">
        <div class="dash-card">
          <span class="dash-label">Via le site</span>
          <span class="dash-value text-sky-700">{{ stats?.fromWeb ?? 0 }}</span>
        </div>
        <div class="dash-card">
          <span class="dash-label">Via boîte mail</span>
          <span class="dash-value text-violet-700">{{ stats?.fromEmail ?? 0 }}</span>
        </div>
        <div class="dash-card">
          <span class="dash-label">Messages sortants</span>
          <span class="dash-value text-emerald-700">{{ stats?.outbound ?? 0 }}</span>
        </div>
      </div>

      <div class="bg-white rounded-[4px] border border-gray-100 shadow-sm overflow-hidden">
        <div class="px-5 sm:px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-4">
          <div>
            <h2 class="text-[15px] font-[900] uppercase tracking-tight">Messages récents</h2>
            <p class="text-xs text-gray-400 font-medium mt-0.5">Les plus récents en premier</p>
          </div>
          <NuxtLink to="/admin/messages" class="text-[11px] font-[900] uppercase tracking-wider text-brand-700 hover:underline">
            Tout voir
          </NuxtLink>
        </div>

        <div v-if="!stats?.recent?.length" class="px-6 py-12 text-center text-gray-400 font-medium text-sm">
          Aucun message pour le moment.
        </div>

        <ul v-else class="divide-y divide-gray-50">
          <li v-for="msg in stats.recent" :key="msg.id">
            <NuxtLink
              :to="`/admin/messages?id=${msg.id}`"
              class="flex items-start gap-4 px-5 sm:px-6 py-4 hover:bg-brand-50/40 transition-colors"
            >
              <span
                class="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                :class="statusDot(msg)"
              />
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2 flex-wrap mb-0.5">
                  <span class="font-[900] text-sm truncate" :class="!msg.read ? 'text-brand-900' : 'text-[#1a1a1b]'">
                    {{ msg.name }}
                  </span>
                  <span class="status-pill" :class="statusPillClass(msg)">{{ statusLabel(msg) }}</span>
                </div>
                <p class="text-xs text-gray-500 font-medium truncate">{{ subjectLabel(msg.subject) }}</p>
                <p class="text-xs text-gray-400 line-clamp-1 mt-1">{{ msg.message }}</p>
              </div>
              <span class="text-[10px] text-gray-400 font-medium whitespace-nowrap">{{ formatShortDate(msg.createdAt) }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { ContactMessage } from '~/types/admin'
import { CONTACT_SUBJECTS, getMessageStatus, MESSAGE_STATUS_LABELS } from '~/types/admin'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const { data: stats, pending } = await useFetch('/api/admin/stats', { key: 'admin-stats' })

function subjectLabel(key: string) {
  return CONTACT_SUBJECTS[key] || key
}

function formatShortDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
}

function statusLabel(msg: ContactMessage) {
  return MESSAGE_STATUS_LABELS[getMessageStatus(msg)]
}

function statusDot(msg: ContactMessage) {
  const s = getMessageStatus(msg)
  if (s === 'unread') return 'bg-brand-600'
  if (s === 'draft') return 'bg-amber-500'
  if (s === 'sent') return 'bg-emerald-500'
  return 'bg-gray-300'
}

function statusPillClass(msg: ContactMessage) {
  const s = getMessageStatus(msg)
  if (s === 'unread') return 'bg-brand-50 text-brand-800'
  if (s === 'draft') return 'bg-amber-50 text-amber-800'
  if (s === 'sent') return 'bg-emerald-50 text-emerald-800'
  return 'bg-gray-100 text-gray-600'
}

useAdminSeo('Tableau de bord')
</script>

<style scoped>
.dash-card {
  @apply block bg-white rounded-[4px] p-4 sm:p-5 border border-gray-100 shadow-sm hover:border-brand-300 hover:shadow-md transition-all;
}
.dash-label {
  @apply block text-[10px] font-[900] text-gray-400 uppercase tracking-[0.18em] mb-2;
}
.dash-value {
  @apply block text-2xl sm:text-3xl font-[900] text-[#1a1a1b] tracking-tight;
}
.dash-card--accent {
  @apply border-brand-100 bg-gradient-to-br from-white to-brand-50/60;
}
.status-pill {
  @apply text-[9px] font-[900] uppercase tracking-wider px-1.5 py-0.5 rounded-[2px];
}
</style>
