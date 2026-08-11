<template>
  <div>
    <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6 sm:mb-8">
      <div>
        <p class="text-[11px] font-[900] uppercase tracking-[0.25em] text-brand-700 mb-2">Boîte</p>
        <h1 class="text-2xl sm:text-[32px] font-[900] text-[#1a1a1b] uppercase tracking-tighter">Messages</h1>
        <p class="text-gray-500 font-medium mt-2">
          {{ payload?.total ?? 0 }} message(s) · les plus récents en haut
        </p>
        <p v-if="syncInfo" class="text-xs font-medium mt-2" :class="syncInfo.error ? 'text-red-600' : 'text-brand-700'">
          {{ syncInfo.text }}
        </p>
      </div>
      <div class="flex flex-wrap gap-2">
        <button type="button" class="admin-btn-primary" @click="openCompose">
          Nouveau message
        </button>
        <button type="button" class="admin-btn-secondary" :disabled="syncing" @click="syncMailbox">
          {{ syncing ? 'Synchronisation…' : 'Synchroniser la boîte' }}
        </button>
        <button type="button" class="admin-btn-secondary" @click="refresh()">Actualiser</button>
      </div>
    </div>

    <!-- Compose modal -->
    <div
      v-if="composing"
      class="fixed inset-0 z-[80] bg-brand-900/50 flex items-end sm:items-center justify-center p-0 sm:p-6"
      @click.self="closeCompose"
    >
      <div class="bg-white w-full sm:max-w-xl sm:rounded-[4px] shadow-2xl max-h-[92vh] overflow-y-auto">
        <div class="px-5 sm:px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
          <h2 class="text-[15px] font-[900] uppercase tracking-tight">Nouveau message</h2>
          <button type="button" class="text-[11px] font-[900] uppercase tracking-wider text-gray-400 hover:text-gray-700" @click="closeCompose">
            Fermer
          </button>
        </div>
        <form class="px-5 sm:px-6 py-5 space-y-4" @submit.prevent="submitCompose(true)">
          <div>
            <label class="block text-[10px] font-[900] text-gray-500 uppercase tracking-widest mb-2">Destinataire (email)</label>
            <input v-model="compose.to" type="email" required class="admin-input" placeholder="client@email.com">
          </div>
          <div>
            <label class="block text-[10px] font-[900] text-gray-500 uppercase tracking-widest mb-2">Nom (optionnel)</label>
            <input v-model="compose.toName" type="text" class="admin-input" placeholder="Nom du destinataire">
          </div>
          <div>
            <label class="block text-[10px] font-[900] text-gray-500 uppercase tracking-widest mb-2">Objet</label>
            <input v-model="compose.subject" type="text" required class="admin-input" placeholder="Objet du message">
          </div>
          <div>
            <label class="block text-[10px] font-[900] text-gray-500 uppercase tracking-widest mb-2">Message</label>
            <textarea v-model="compose.message" required rows="7" class="reply-textarea" placeholder="Bonjour,&#10;&#10;..." />
          </div>
          <div>
            <label class="block text-[10px] font-[900] text-gray-500 uppercase tracking-widest mb-2">
              Pièces jointes (max 5 · 12 Mo)
            </label>
            <input ref="composeFileInput" type="file" class="hidden" multiple @change="onComposePickFiles">
            <button
              type="button"
              class="admin-btn-secondary"
              :disabled="composeUploading || composeFiles.length >= 5"
              @click="composeFileInput?.click()"
            >
              {{ composeUploading ? 'Upload…' : 'Ajouter un fichier' }}
            </button>
            <ul v-if="composeFiles.length" class="mt-2 space-y-2">
              <li
                v-for="file in composeFiles"
                :key="file.id"
                class="flex items-center justify-between gap-3 px-3 py-2 bg-gray-50 border border-gray-200 rounded-[2px]"
              >
                <span class="text-sm font-medium truncate">{{ file.filename }}</span>
                <button type="button" class="text-[10px] font-[900] uppercase tracking-wider text-red-600" @click="removeComposeFile(file.id)">
                  Retirer
                </button>
              </li>
            </ul>
            <p v-if="composeUploadError" class="text-red-600 text-sm font-medium mt-2">{{ composeUploadError }}</p>
          </div>
          <p v-if="composeError" class="text-red-600 text-sm font-medium">{{ composeError }}</p>
          <div class="flex flex-wrap gap-2 pt-2">
            <button type="submit" class="admin-btn-primary" :disabled="composeSending || composeUploading">
              {{ composeSending ? 'Envoi…' : 'Envoyer' }}
            </button>
            <button type="button" class="admin-btn-secondary" :disabled="composeSending || composeUploading" @click="submitCompose(false)">
              Enregistrer brouillon
            </button>
            <button type="button" class="admin-btn-secondary" @click="closeCompose">Annuler</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Filtres statut -->
    <div class="flex flex-wrap gap-2 mb-6">
      <button
        v-for="key in statusKeys"
        :key="key"
        type="button"
        class="filter-chip"
        :class="{ 'filter-chip--active': status === key }"
        @click="setStatus(key)"
      >
        {{ MESSAGE_STATUS_LABELS[key] }}
        <span class="opacity-60">{{ payload?.counts?.[key] ?? 0 }}</span>
      </button>
    </div>

    <div v-if="pending" class="text-gray-500 font-medium py-10">Chargement des messages...</div>

    <div v-else-if="!messages.length" class="admin-empty">
      <p class="text-gray-500 font-medium">Aucun message dans ce filtre.</p>
      <p class="text-gray-400 text-sm mt-1">Formulaire du site, sync IMAP, ou changez de statut.</p>
    </div>

    <div v-else class="grid lg:grid-cols-[340px_1fr] gap-6 items-start">
      <aside class="bg-white rounded-[4px] border border-gray-100 shadow-sm overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
          <p class="text-[10px] font-[900] text-gray-400 uppercase tracking-widest">Réception</p>
          <p class="text-[10px] font-[900] text-gray-400">Page {{ payload?.page }}/{{ payload?.pages }}</p>
        </div>
        <ul class="max-h-[62vh] overflow-y-auto divide-y divide-gray-50">
          <li v-for="msg in messages" :key="msg.id">
            <button
              type="button"
              class="w-full text-left px-4 py-4 hover:bg-brand-50/50 transition-colors"
              :class="selectedId === msg.id ? 'bg-brand-50 border-l-4 border-l-brand-700' : 'border-l-4 border-l-transparent'"
              @click="selectMessage(msg)"
            >
              <div class="flex items-start justify-between gap-2 mb-1">
                <span class="font-[900] text-sm truncate" :class="!msg.read ? 'text-brand-800' : 'text-[#1a1a1b]'">
                  {{ msg.name }}
                </span>
                <span v-if="!msg.read" class="w-2 h-2 bg-brand-700 rounded-full flex-shrink-0 mt-1.5" />
              </div>
              <p class="text-xs text-gray-500 font-medium truncate mb-1">{{ subjectLabel(msg.subject) }}</p>
              <p class="text-xs text-gray-400 line-clamp-2 leading-relaxed">{{ msg.message }}</p>
              <div class="flex items-center gap-2 mt-2 flex-wrap">
                <span class="text-[10px] text-gray-400 font-medium">{{ formatShortDate(msg.createdAt) }}</span>
                <span class="status-pill" :class="statusPillClass(msg)">{{ statusLabel(msg) }}</span>
                <span
                  class="status-pill"
                  :class="msg.source === 'email'
                    ? 'bg-violet-50 text-violet-700'
                    : msg.source === 'outbound'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-sky-50 text-sky-700'"
                >
                  {{ msg.source === 'email' ? 'Email' : msg.source === 'outbound' ? 'Envoyé' : 'Site' }}
                </span>
                <span
                  v-if="msg.attachments?.length"
                  class="status-pill bg-gray-100 text-gray-600"
                >
                  {{ msg.attachments.length }} fichier(s)
                </span>
              </div>
            </button>
          </li>
        </ul>

        <div v-if="(payload?.pages || 1) > 1" class="px-3 py-3 border-t border-gray-100 flex items-center justify-between gap-2">
          <button type="button" class="pager-btn" :disabled="page <= 1" @click="setPage(page - 1)">Préc.</button>
          <span class="text-[11px] font-[900] text-gray-500">{{ page }} / {{ payload?.pages }}</span>
          <button type="button" class="pager-btn" :disabled="page >= (payload?.pages || 1)" @click="setPage(page + 1)">Suiv.</button>
        </div>
      </aside>

      <div v-if="selected" class="bg-white rounded-[4px] border border-gray-100 shadow-sm">
        <div class="px-5 sm:px-6 py-5 border-b border-gray-100">
          <div class="flex flex-wrap items-center gap-2 mb-4">
            <span class="status-pill" :class="statusPillClass(selected)">{{ statusLabel(selected) }}</span>
            <span class="status-pill bg-gray-100 text-gray-600">{{ subjectLabel(selected.subject) }}</span>
            <span
              class="status-pill"
              :class="selected.source === 'email'
                ? 'bg-violet-50 text-violet-700'
                : selected.source === 'outbound'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-sky-50 text-sky-700'"
            >
              {{ selected.source === 'email' ? 'Boîte mail' : selected.source === 'outbound' ? 'Message sortant' : 'Formulaire site' }}
            </span>
            <span class="text-gray-400 text-xs font-medium ml-auto">{{ formatAdminDate(selected.createdAt) }}</span>
          </div>
          <h2 class="text-xl font-[900] text-[#1a1a1b] mb-1">{{ selected.name }}</h2>
          <p v-if="selected.company" class="text-gray-500 text-sm font-medium mb-1">{{ selected.company }}</p>
          <p class="text-brand-700 text-sm font-bold">
            <a :href="`mailto:${selected.email}`" class="hover:underline">{{ selected.email }}</a>
            <span v-if="selected.phone" class="text-gray-500 font-medium"> · {{ selected.phone }}</span>
          </p>
        </div>

        <div class="px-5 sm:px-6 py-5 border-b border-gray-100 bg-gray-50/50">
          <p class="text-[10px] font-[900] text-gray-400 uppercase tracking-widest mb-3">Message reçu</p>
          <p class="text-gray-700 text-[15px] leading-relaxed font-medium whitespace-pre-wrap">{{ selected.message }}</p>

          <div v-if="selected.attachments?.length" class="mt-5">
            <p class="text-[10px] font-[900] text-gray-400 uppercase tracking-widest mb-2">Pièces jointes</p>
            <ul class="space-y-2">
              <li
                v-for="file in selected.attachments"
                :key="file.id"
                class="flex items-center justify-between gap-3 px-3 py-2.5 bg-white border border-gray-200 rounded-[2px]"
              >
                <div class="min-w-0">
                  <p class="text-sm font-[900] text-[#1a1a1b] truncate">{{ file.filename }}</p>
                  <p class="text-[10px] text-gray-400 font-medium">{{ formatSize(file.size) }}</p>
                </div>
                <a
                  :href="file.url"
                  download
                  target="_blank"
                  rel="noopener"
                  class="admin-btn-secondary !py-2"
                >
                  Télécharger
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          v-if="selected.reply && !replying"
          class="px-5 sm:px-6 py-5 border-b border-gray-100"
          :class="selected.replyStatus === 'draft' ? 'bg-amber-50/40' : 'bg-green-50/30'"
        >
          <div class="flex items-center justify-between gap-4 mb-3">
            <p
              class="text-[10px] font-[900] uppercase tracking-widest"
              :class="selected.replyStatus === 'draft' ? 'text-amber-700' : 'text-green-700'"
            >
              {{ selected.replyStatus === 'draft' ? 'Brouillon de réponse' : 'Réponse envoyée' }}
            </p>
            <span v-if="selected.repliedAt" class="text-[10px] text-gray-400 font-medium">
              {{ formatAdminDate(selected.repliedAt) }}
            </span>
          </div>
          <p class="text-gray-700 text-[15px] leading-relaxed font-medium whitespace-pre-wrap">{{ selected.reply }}</p>
          <ul v-if="selected.replyAttachments?.length" class="mt-4 space-y-2">
            <li
              v-for="file in selected.replyAttachments"
              :key="file.id"
              class="flex items-center justify-between gap-3 px-3 py-2 bg-white border border-gray-200 rounded-[2px]"
            >
              <span class="text-sm font-medium truncate">{{ file.filename }}</span>
              <a :href="file.url" download target="_blank" rel="noopener" class="text-[10px] font-[900] uppercase tracking-wider text-brand-700">
                Télécharger
              </a>
            </li>
          </ul>
        </div>

        <div class="px-5 sm:px-6 py-5">
          <p v-if="replySuccess && !replying" class="text-brand-700 text-sm font-[900] uppercase tracking-wider mb-4">
            {{ replySuccessText }}
          </p>

          <div v-if="replying" class="space-y-4">
            <label class="block text-[10px] font-[900] text-gray-500 uppercase tracking-widest mb-2">
              Rédiger une réponse
            </label>
            <textarea
              v-model="replyDraft"
              rows="6"
              class="reply-textarea"
              placeholder="Bonjour,&#10;&#10;Merci pour votre message..."
            />

            <div>
              <label class="block text-[10px] font-[900] text-gray-500 uppercase tracking-widest mb-2">
                Joindre des fichiers (max 5 · 12 Mo)
              </label>
              <input
                ref="fileInput"
                type="file"
                class="hidden"
                multiple
                @change="onPickFiles"
              >
              <div class="flex flex-wrap gap-2 mb-2">
                <button type="button" class="admin-btn-secondary" :disabled="uploading || replyFiles.length >= 5" @click="fileInput?.click()">
                  {{ uploading ? 'Upload…' : 'Ajouter un fichier' }}
                </button>
              </div>
              <ul v-if="replyFiles.length" class="space-y-2">
                <li
                  v-for="file in replyFiles"
                  :key="file.id"
                  class="flex items-center justify-between gap-3 px-3 py-2 bg-gray-50 border border-gray-200 rounded-[2px]"
                >
                  <span class="text-sm font-medium truncate">{{ file.filename }}</span>
                  <button type="button" class="text-[10px] font-[900] uppercase tracking-wider text-red-600" @click="removeReplyFile(file.id)">
                    Retirer
                  </button>
                </li>
              </ul>
              <p v-if="uploadError" class="text-red-600 text-sm font-medium mt-2">{{ uploadError }}</p>
            </div>

            <p v-if="replyError" class="text-red-600 text-sm font-medium">{{ replyError }}</p>
            <div class="flex flex-wrap gap-2">
              <button
                type="button"
                class="admin-btn-primary"
                :disabled="actionId === selected.id || !replyDraft.trim() || uploading"
                @click="sendReply(selected.id, true)"
              >
                {{ actionId === selected.id ? 'Envoi…' : 'Envoyer la réponse' }}
              </button>
              <button
                type="button"
                class="admin-btn-secondary"
                :disabled="actionId === selected.id || !replyDraft.trim() || uploading"
                @click="sendReply(selected.id, false)"
              >
                Enregistrer brouillon
              </button>
              <button type="button" class="admin-btn-secondary" @click="cancelReply">Annuler</button>
            </div>
          </div>

          <div v-else class="flex flex-wrap gap-2">
            <button type="button" class="admin-btn-primary" @click="startReply(selected)">
              {{ selected.reply ? 'Modifier / renvoyer' : 'Répondre' }}
            </button>
            <button
              v-if="!selected.read"
              type="button"
              class="admin-btn-secondary"
              :disabled="actionId === selected.id"
              @click="markAsRead(selected.id)"
            >
              Marquer lu
            </button>
            <button
              v-else
              type="button"
              class="admin-btn-secondary"
              :disabled="actionId === selected.id"
              @click="markAsUnread(selected.id)"
            >
              Marquer non lu
            </button>
            <button
              type="button"
              class="admin-btn-danger"
              :disabled="actionId === selected.id"
              @click="removeMessage(selected.id)"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>

      <div v-else class="admin-empty">
        <p class="text-gray-500 font-medium">Sélectionnez un message pour le lire et y répondre.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ContactMessage, MessageAttachment, MessageFilterStatus } from '~/types/admin'
import { CONTACT_SUBJECTS, getMessageStatus, MESSAGE_STATUS_LABELS } from '~/types/admin'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const route = useRoute()
const router = useRouter()

const statusKeys: MessageFilterStatus[] = ['all', 'unread', 'read', 'draft', 'sent']
const status = computed<MessageFilterStatus>(() => {
  const s = String(route.query.status || 'all')
  return (statusKeys.includes(s as MessageFilterStatus) ? s : 'all') as MessageFilterStatus
})
const page = computed(() => Math.max(1, Number(route.query.page) || 1))

type MessagesPayload = {
  items: ContactMessage[]
  total: number
  page: number
  limit: number
  pages: number
  counts: Record<MessageFilterStatus, number>
}

const { data: payload, pending, refresh } = await useFetch<MessagesPayload>('/api/admin/messages', {
  key: 'admin-messages-list',
  query: computed(() => ({
    status: status.value,
    page: page.value,
    limit: 10,
  })),
  watch: [status, page],
})

const messages = computed(() => payload.value?.items || [])
const selectedId = ref<string | null>(null)
const replying = ref(false)
const replyDraft = ref('')
const replyError = ref('')
const replySuccess = ref(false)
const replySuccessText = ref('')
const actionId = ref<string | null>(null)
const syncing = ref(false)
const syncInfo = ref<{ text: string; error?: boolean } | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const replyFiles = ref<MessageAttachment[]>([])
const uploading = ref(false)
const uploadError = ref('')
const composing = ref(false)
const composeSending = ref(false)
const composeError = ref('')
const composeUploading = ref(false)
const composeUploadError = ref('')
const composeFileInput = ref<HTMLInputElement | null>(null)
const composeFiles = ref<MessageAttachment[]>([])
const compose = reactive({
  to: '',
  toName: '',
  subject: '',
  message: '',
})

const selected = computed(() => messages.value.find(m => m.id === selectedId.value) || null)

watch(messages, (list) => {
  const wanted = typeof route.query.id === 'string' ? route.query.id : null
  if (wanted && list.some(m => m.id === wanted)) {
    selectedId.value = wanted
    return
  }
  if (list.length && !list.some(m => m.id === selectedId.value)) {
    selectedId.value = list[0].id
  }
  if (!list.length) selectedId.value = null
}, { immediate: true })

function setStatus(next: MessageFilterStatus) {
  router.push({
    query: {
      ...route.query,
      status: next === 'all' ? undefined : next,
      page: undefined,
      id: undefined,
    },
  })
}

function setPage(next: number) {
  router.push({ query: { ...route.query, page: next > 1 ? String(next) : undefined } })
}

function subjectLabel(key: string) {
  return CONTACT_SUBJECTS[key] || key
}

function formatShortDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })
}

function statusLabel(msg: ContactMessage) {
  return MESSAGE_STATUS_LABELS[getMessageStatus(msg)]
}

function statusPillClass(msg: ContactMessage) {
  const s = getMessageStatus(msg)
  if (s === 'unread') return 'bg-brand-50 text-brand-800'
  if (s === 'draft') return 'bg-amber-50 text-amber-800'
  if (s === 'sent') return 'bg-emerald-50 text-emerald-800'
  return 'bg-gray-100 text-gray-600'
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} o`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`
}

function selectMessage(msg: ContactMessage) {
  selectedId.value = msg.id
  replying.value = false
  replyDraft.value = msg.reply || ''
  replyFiles.value = msg.replyAttachments ? [...msg.replyAttachments] : []
  replyError.value = ''
  replySuccess.value = false
  uploadError.value = ''
  router.replace({ query: { ...route.query, id: msg.id } })
}

function startReply(msg: ContactMessage) {
  replying.value = true
  replyDraft.value = msg.reply || `Bonjour ${msg.name.split(' ')[0]},\n\nMerci pour votre message.\n\n\n\nBien cordialement,\nL'équipe OXYNOVA RDC`
  replyFiles.value = msg.replyAttachments ? [...msg.replyAttachments] : []
  replyError.value = ''
  replySuccess.value = false
  uploadError.value = ''
}

function cancelReply() {
  replying.value = false
  replyDraft.value = selected.value?.reply || ''
  replyFiles.value = selected.value?.replyAttachments ? [...selected.value.replyAttachments] : []
  replyError.value = ''
  uploadError.value = ''
}

function removeReplyFile(id: string) {
  replyFiles.value = replyFiles.value.filter(f => f.id !== id)
}

async function onPickFiles(e: Event) {
  const input = e.target as HTMLInputElement
  const files = Array.from(input.files || [])
  input.value = ''
  if (!files.length) return

  uploadError.value = ''
  const remaining = 5 - replyFiles.value.length
  if (remaining <= 0) {
    uploadError.value = 'Maximum 5 fichiers.'
    return
  }

  uploading.value = true
  try {
    for (const file of files.slice(0, remaining)) {
      if (file.size > 12 * 1024 * 1024) {
        uploadError.value = `"${file.name}" dépasse 12 Mo.`
        continue
      }
      const form = new FormData()
      form.append('file', file)
      const saved = await $fetch<MessageAttachment>('/api/admin/messages/upload', {
        method: 'POST',
        body: form,
      })
      replyFiles.value.push(saved)
    }
  }
  catch (err: unknown) {
    const e2 = err as { data?: { statusMessage?: string }; statusMessage?: string }
    uploadError.value = e2?.data?.statusMessage || e2?.statusMessage || 'Échec upload.'
  }
  finally {
    uploading.value = false
  }
}

async function sendReply(id: string, sendEmail: boolean) {
  if (!replyDraft.value.trim()) return
  replyError.value = ''
  replySuccess.value = false
  actionId.value = id
  try {
    const result = await $fetch<{ mailSent: boolean }>('/api/admin/messages/reply', {
      method: 'POST',
      body: {
        id,
        reply: replyDraft.value.trim(),
        sendEmail,
        attachments: replyFiles.value,
      },
    })
    await refresh()
    await refreshNuxtData('admin-stats')
    replying.value = false
    replySuccess.value = true
    replySuccessText.value = sendEmail && result.mailSent
      ? 'Réponse envoyée par email.'
      : 'Brouillon enregistré.'
  }
  catch (e: unknown) {
    const err = e as { data?: { statusMessage?: string }; statusMessage?: string }
    replyError.value = err?.data?.statusMessage || err?.statusMessage || 'Impossible d\'envoyer la réponse.'
  }
  finally {
    actionId.value = null
  }
}

async function markAsRead(id: string) {
  actionId.value = id
  try {
    await $fetch(`/api/admin/messages/${id}`, { method: 'PATCH', body: { read: true } })
    await refresh()
    await refreshNuxtData('admin-stats')
  }
  finally {
    actionId.value = null
  }
}

async function markAsUnread(id: string) {
  actionId.value = id
  try {
    await $fetch(`/api/admin/messages/${id}`, { method: 'PATCH', body: { read: false } })
    await refresh()
    await refreshNuxtData('admin-stats')
  }
  finally {
    actionId.value = null
  }
}

async function removeMessage(id: string) {
  if (!confirm('Supprimer ce message définitivement ?')) return
  actionId.value = id
  try {
    await $fetch(`/api/admin/messages/${id}`, { method: 'DELETE' })
    if (selectedId.value === id) selectedId.value = null
    replying.value = false
    await refresh()
    await refreshNuxtData('admin-stats')
  }
  finally {
    actionId.value = null
  }
}

function openCompose() {
  composing.value = true
  composeError.value = ''
  composeUploadError.value = ''
  composeFiles.value = []
  compose.to = ''
  compose.toName = ''
  compose.subject = ''
  compose.message = ''
}

function closeCompose() {
  composing.value = false
  composeError.value = ''
  composeUploadError.value = ''
}

function removeComposeFile(id: string) {
  composeFiles.value = composeFiles.value.filter(f => f.id !== id)
}

async function onComposePickFiles(e: Event) {
  const input = e.target as HTMLInputElement
  const files = Array.from(input.files || [])
  input.value = ''
  if (!files.length) return
  composeUploadError.value = ''
  const remaining = 5 - composeFiles.value.length
  if (remaining <= 0) {
    composeUploadError.value = 'Maximum 5 fichiers.'
    return
  }
  composeUploading.value = true
  try {
    for (const file of files.slice(0, remaining)) {
      if (file.size > 12 * 1024 * 1024) {
        composeUploadError.value = `"${file.name}" dépasse 12 Mo.`
        continue
      }
      const form = new FormData()
      form.append('file', file)
      const saved = await $fetch<MessageAttachment>('/api/admin/messages/upload', {
        method: 'POST',
        body: form,
      })
      composeFiles.value.push(saved)
    }
  }
  catch (err: unknown) {
    const e2 = err as { data?: { statusMessage?: string }; statusMessage?: string }
    composeUploadError.value = e2?.data?.statusMessage || e2?.statusMessage || 'Échec upload.'
  }
  finally {
    composeUploading.value = false
  }
}

async function submitCompose(sendEmail: boolean) {
  composeError.value = ''
  if (!compose.to.trim() || !compose.subject.trim() || !compose.message.trim()) {
    composeError.value = 'Destinataire, objet et message sont requis.'
    return
  }
  composeSending.value = true
  try {
    const result = await $fetch<{ message: ContactMessage }>('/api/admin/messages/compose', {
      method: 'POST',
      body: {
        to: compose.to.trim(),
        toName: compose.toName.trim() || undefined,
        subject: compose.subject.trim(),
        message: compose.message.trim(),
        sendEmail,
        attachments: composeFiles.value,
      },
    })
    await refresh()
    await refreshNuxtData('admin-stats')
    closeCompose()
    selectedId.value = result.message.id
    await router.replace({ query: { ...route.query, status: sendEmail ? 'sent' : 'draft', id: result.message.id, page: undefined } })
  }
  catch (e: unknown) {
    const err = e as { data?: { statusMessage?: string }; statusMessage?: string }
    composeError.value = err?.data?.statusMessage || err?.statusMessage || 'Impossible d\'envoyer le message.'
  }
  finally {
    composeSending.value = false
  }
}

async function syncMailbox() {
  syncing.value = true
  syncInfo.value = null
  try {
    const result = await $fetch<{ imported: number; skipped: number; totalFetched: number }>('/api/admin/messages/sync', {
      method: 'POST',
    })
    await refresh()
    await refreshNuxtData('admin-stats')
    syncInfo.value = {
      text: `Sync OK — ${result.imported} importé(s), ${result.skipped} ignoré(s).`,
    }
  }
  catch (e: unknown) {
    const err = e as { data?: { statusMessage?: string }; statusMessage?: string }
    syncInfo.value = {
      text: err?.data?.statusMessage || err?.statusMessage || 'Sync impossible. Vérifiez IMAP dans le .env.',
      error: true,
    }
  }
  finally {
    syncing.value = false
  }
}

useAdminSeo('Messages')
</script>

<style scoped>
.admin-empty {
  @apply bg-white rounded-[4px] p-12 border border-gray-100 text-center;
}
.admin-btn-primary {
  @apply px-4 py-2.5 bg-brand-700 text-white text-[11px] font-[900] uppercase tracking-wider rounded-[2px] hover:bg-brand-800 transition-colors disabled:opacity-50 whitespace-nowrap;
}
.admin-btn-secondary {
  @apply px-4 py-2.5 bg-gray-100 text-gray-700 text-[11px] font-[900] uppercase tracking-wider rounded-[2px] hover:bg-gray-200 transition-colors disabled:opacity-50 whitespace-nowrap;
}
.admin-btn-danger {
  @apply px-4 py-2.5 bg-red-50 text-red-600 text-[11px] font-[900] uppercase tracking-wider rounded-[2px] hover:bg-red-100 transition-colors disabled:opacity-50 whitespace-nowrap;
}
.reply-textarea {
  @apply w-full px-4 py-3 border-2 border-gray-200 rounded-[2px] focus:border-brand-700 focus:outline-none font-medium text-[14px] leading-relaxed resize-none;
}
.admin-input {
  @apply w-full px-4 py-3 border-2 border-gray-200 rounded-[2px] focus:border-brand-700 focus:outline-none font-medium text-[14px];
}
.filter-chip {
  @apply inline-flex items-center gap-2 px-3 py-2 rounded-[4px] bg-white border border-gray-200 text-[11px] font-[900] uppercase tracking-wider text-gray-500 hover:border-brand-300 transition-colors;
}
.filter-chip--active {
  @apply bg-brand-700 border-brand-700 text-white;
}
.status-pill {
  @apply text-[9px] font-[900] uppercase tracking-wider px-1.5 py-0.5 rounded-[2px];
}
.pager-btn {
  @apply px-3 py-1.5 text-[11px] font-[900] uppercase tracking-wider rounded-[2px] bg-gray-100 text-gray-700 disabled:opacity-40;
}
</style>
