<template>
  <div>
    <div class="mb-8 sm:mb-10">
      <h1 class="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">Tableau de bord</h1>
      <p class="text-slate-500 text-sm font-medium mt-1.5">Vue d’ensemble de la messagerie OXYNOVA.</p>
    </div>

    <div v-if="pending" class="text-gray-500 font-medium">Chargement...</div>

    <template v-else>
      <div class="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
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
        <NuxtLink to="/admin/audit" class="dash-card">
          <span class="dash-label">Sécurité</span>
          <span class="dash-value text-slate-700 text-lg sm:text-xl">Journal</span>
          <span class="block text-[11px] text-slate-400 mt-1">Connexions & actions</span>
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
              class="flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-4 px-4 sm:px-6 py-4 hover:bg-brand-50/40 transition-colors"
            >
              <div class="flex items-start gap-3 min-w-0 flex-1">
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
                  <p class="text-xs text-gray-400 line-clamp-2 sm:line-clamp-1 mt-1">{{ emailPreviewText(msg.message) }}</p>
                </div>
              </div>
              <span class="text-[10px] text-gray-400 font-medium whitespace-nowrap pl-5 sm:pl-0 sm:pt-0.5">{{ formatShortDate(msg.createdAt) }}</span>
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
import { emailPreviewText } from '~/utils/emailPreview'

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
  @apply block bg-white rounded-lg p-4 sm:p-5 border border-slate-200 hover:border-brand-300 hover:shadow-sm transition-all;
}
.dash-label {
  @apply block text-[11px] font-medium text-slate-400 mb-2;
}
.dash-value {
  @apply block text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight;
}
.dash-card--accent {
  @apply border-brand-200 bg-brand-50/40;
}
.status-pill {
  @apply text-[10px] font-semibold tracking-wide px-1.5 py-0.5 rounded-md;
}
</style>
