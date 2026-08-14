<template>
  <div>
    <div class="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <div>
        <h1 class="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">Journal d’activité</h1>
        <p class="text-slate-500 text-sm font-medium mt-1.5">
          Qui s’est connecté, qui a envoyé un mail, qui a lu — avec IP et empreinte appareil. Export Excel ou PDF.
        </p>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <button type="button" class="audit-btn" :disabled="pending" @click="refresh()">
          Actualiser
        </button>
        <a class="audit-btn audit-btn--primary" :href="downloadHref('excel')">
          Excel
        </a>
        <a class="audit-btn" :href="downloadHref('pdf')">
          PDF
        </a>
      </div>
    </div>

    <div class="flex flex-wrap gap-2 mb-5">
      <button
        v-for="opt in kinds"
        :key="opt.id"
        type="button"
        class="audit-chip"
        :class="{ 'audit-chip--active': kind === opt.id }"
        @click="kind = opt.id"
      >
        {{ opt.label }}
      </button>
    </div>

    <div v-if="pending && !items.length" class="text-slate-500 text-sm">Chargement…</div>

    <div v-else-if="!items.length" class="bg-white border border-slate-200 rounded-lg px-6 py-12 text-center text-slate-500 text-sm">
      {{ emptyHint }}
    </div>

    <ul v-else class="space-y-3">
      <li
        v-for="row in items"
        :key="row.id"
        class="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm"
      >
        <button
          type="button"
          class="w-full text-left px-4 sm:px-5 py-4 flex flex-col sm:flex-row sm:items-start gap-3 hover:bg-slate-50/80 transition-colors"
          @click="toggle(row.id)"
        >
          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-center gap-2 mb-1">
              <span
                class="inline-flex items-center gap-1.5 text-[13px] font-semibold"
                :class="row.success ? 'text-slate-900' : 'text-red-700'"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full"
                  :class="row.success ? 'bg-emerald-500' : 'bg-red-500'"
                />
                {{ actionLabel(row.action) }}
              </span>
              <span class="text-[11px] text-slate-400 tabular-nums">{{ formatDate(row.at) }}</span>
            </div>
            <p class="text-[13px] text-slate-700 font-medium">
              {{ row.device }}
              <span class="text-slate-400 font-normal">·</span>
              {{ row.os }}
              <span class="text-slate-400 font-normal">·</span>
              {{ row.browser }}
            </p>
            <p class="text-[12px] text-slate-500 mt-0.5 font-mono">
              IP {{ row.ip }}
              <span v-if="row.country"> · {{ row.country }}</span>
              <span v-if="row.deviceFingerprint"> · {{ row.deviceFingerprint }}</span>
            </p>
            <p v-if="row.detail" class="text-[12px] text-slate-500 mt-1 line-clamp-2">{{ row.detail }}</p>
          </div>
          <span class="text-[11px] font-semibold text-brand-700 flex-shrink-0">
            {{ openId === row.id ? 'Masquer' : 'Détails' }}
          </span>
        </button>

        <div v-if="openId === row.id" class="px-4 sm:px-5 pb-4 border-t border-slate-100 bg-slate-50/50">
          <dl class="grid sm:grid-cols-2 gap-x-6 gap-y-2 pt-3 text-[12px]">
            <div><dt class="text-slate-400">Empreinte</dt><dd class="font-mono text-slate-800">{{ row.deviceFingerprint || '—' }}</dd></div>
            <div><dt class="text-slate-400">IP / chaîne</dt><dd class="font-mono text-slate-800 break-all">{{ row.ips || row.ip }}</dd></div>
            <div><dt class="text-slate-400">Pays</dt><dd class="text-slate-800">{{ row.country || '—' }}</dd></div>
            <div><dt class="text-slate-400">Plateforme</dt><dd class="text-slate-800">{{ row.platform || '—' }}</dd></div>
            <div><dt class="text-slate-400">Écran</dt><dd class="text-slate-800">{{ row.screen || '—' }}</dd></div>
            <div><dt class="text-slate-400">Fenêtre</dt><dd class="text-slate-800">{{ row.viewport || '—' }}</dd></div>
            <div><dt class="text-slate-400">Fuseau</dt><dd class="text-slate-800">{{ row.timezone || '—' }}</dd></div>
            <div><dt class="text-slate-400">Langue</dt><dd class="text-slate-800">{{ row.language || '—' }}</dd></div>
            <div><dt class="text-slate-400">CPU / RAM</dt><dd class="text-slate-800">{{ row.cores != null ? `${row.cores} cœurs` : '—' }}{{ row.memoryGb != null ? ` · ~${row.memoryGb} Go` : '' }}</dd></div>
            <div><dt class="text-slate-400">Tactile</dt><dd class="text-slate-800">{{ row.touch == null ? '—' : (row.touch ? 'Oui' : 'Non') }}</dd></div>
            <div class="sm:col-span-2"><dt class="text-slate-400">User-Agent</dt><dd class="font-mono text-[11px] text-slate-700 break-all">{{ row.userAgent || '—' }}</dd></div>
          </dl>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

type AuditRow = {
  id: string
  at: string
  action: string
  success: boolean
  ip: string
  ips?: string
  country?: string
  userAgent?: string
  device: string
  browser: string
  os: string
  language?: string
  timezone?: string
  screen?: string
  viewport?: string
  platform?: string
  cores?: number
  memoryGb?: number
  touch?: boolean
  deviceFingerprint?: string
  detail?: string
}

const openId = ref<string | null>(null)
const kind = ref<'all' | 'sends' | 'reads' | 'auth'>('all')

const kinds = [
  { id: 'all' as const, label: 'Tout' },
  { id: 'sends' as const, label: 'Envois de mails' },
  { id: 'reads' as const, label: 'Lectures' },
  { id: 'auth' as const, label: 'Connexions' },
]

const { data: payload, pending, refresh } = await useFetch<{ total: number; items: AuditRow[] }>('/api/admin/audit', {
  key: 'admin-audit',
  query: computed(() => ({ limit: 300, kind: kind.value })),
  watch: [kind],
})

const items = computed(() => payload.value?.items || [])

const emptyHint = computed(() => {
  if (kind.value === 'sends') return 'Aucun envoi de mail enregistré pour le moment.'
  if (kind.value === 'reads') return 'Aucune lecture de mail enregistrée. Ouvrez un message dans Messagerie.'
  if (kind.value === 'auth') return 'Aucune connexion enregistrée. Reconnectez-vous pour générer une empreinte.'
  return 'Aucune activité. Reconnectez-vous pour générer une empreinte complète.'
})

function downloadHref(format: 'excel' | 'pdf') {
  return `/api/admin/audit/download?format=${format}&kind=${kind.value}&limit=2000`
}

const labels: Record<string, string> = {
  login_success: 'Connexion réussie',
  login_failed: 'Connexion échouée',
  logout: 'Déconnexion',
  mail_compose: 'Envoi de mail',
  mail_reply: 'Réponse envoyée',
  mail_view: 'Lecture d’un mail',
  mail_sync: 'Sync IMAP',
  mail_delete: 'Suppression message',
  mail_mark_read: 'Marquer lu',
  mail_mark_unread: 'Marquer non lu',
  audit_download: 'Téléchargement logs',
}

function actionLabel(action: string) {
  return labels[action] || action
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

function toggle(id: string) {
  openId.value = openId.value === id ? null : id
}

useAdminSeo('Journal d’activité')
</script>

<style scoped>
.audit-btn {
  @apply inline-flex items-center px-3.5 py-2 rounded-md text-[12px] font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors disabled:opacity-50;
}
.audit-btn--primary {
  @apply bg-brand-700 text-white border-brand-700 hover:bg-brand-800;
}
.audit-chip {
  @apply inline-flex items-center px-3 py-1.5 rounded-full text-[12px] font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors;
}
.audit-chip--active {
  @apply bg-brand-700 text-white border-brand-700 hover:bg-brand-800;
}
</style>
