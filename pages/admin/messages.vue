<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h1 class="text-2xl sm:text-3xl font-[900] text-[#1a1a1b] uppercase tracking-tight">Messages</h1>
        <p class="text-gray-500 font-medium mt-2">
          {{ messages?.length ?? 0 }} message(s)
          <span v-if="unreadCount"> · {{ unreadCount }} non lu(s)</span>
          <span v-if="repliedCount"> · {{ repliedCount }} répondu(s)</span>
        </p>
      </div>
      <button
        v-if="messages?.length"
        type="button"
        class="admin-btn-secondary"
        @click="refresh()"
      >
        Actualiser
      </button>
    </div>

    <div v-if="pending" class="text-gray-500 font-medium">Chargement des messages...</div>

    <div v-else-if="!messages?.length" class="admin-empty">
      <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
      <p class="text-gray-500 font-medium">Aucun message pour le moment.</p>
      <p class="text-gray-400 text-sm mt-1">Les messages du formulaire de contact apparaîtront ici.</p>
    </div>

    <div v-else class="grid lg:grid-cols-[340px_1fr] gap-6 items-start">
      <aside class="bg-white rounded-[4px] border border-gray-100 shadow-sm overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100 bg-gray-50">
          <p class="text-[10px] font-[900] text-gray-400 uppercase tracking-widest">Boîte de réception</p>
        </div>
        <ul class="max-h-[70vh] overflow-y-auto divide-y divide-gray-50">
          <li v-for="msg in messages" :key="msg.id">
            <button
              type="button"
              class="w-full text-left px-4 py-4 hover:bg-brand-50/50 transition-colors"
              :class="selectedId === msg.id ? 'bg-brand-50 border-l-4 border-l-brand-700' : 'border-l-4 border-l-transparent'"
              @click="selectMessage(msg)"
            >
              <div class="flex items-start justify-between gap-2 mb-1">
                <span
                  class="font-[900] text-[#1a1a1b] text-sm truncate"
                  :class="{ 'text-brand-800': !msg.read }"
                >
                  {{ msg.name }}
                </span>
                <span v-if="!msg.read" class="w-2 h-2 bg-brand-700 rounded-full flex-shrink-0 mt-1.5" />
              </div>
              <p class="text-xs text-gray-500 font-medium truncate mb-1">{{ subjectLabel(msg.subject) }}</p>
              <p class="text-xs text-gray-400 line-clamp-2 leading-relaxed">{{ msg.message }}</p>
              <div class="flex items-center gap-2 mt-2">
                <span class="text-[10px] text-gray-400 font-medium">{{ formatShortDate(msg.createdAt) }}</span>
                <span
                  v-if="msg.reply"
                  class="text-[9px] font-[900] uppercase tracking-wider px-1.5 py-0.5 bg-green-50 text-green-700 rounded-[2px]"
                >
                  Répondu
                </span>
              </div>
            </button>
          </li>
        </ul>
      </aside>

      <div v-if="selected" class="bg-white rounded-[4px] border border-gray-100 shadow-sm">
        <div class="px-5 sm:px-6 py-5 border-b border-gray-100">
          <div class="flex flex-wrap items-center gap-2 mb-4">
            <span
              v-if="!selected.read"
              class="px-2 py-0.5 bg-brand-100 text-brand-800 text-[10px] font-[900] uppercase tracking-wider rounded-[2px]"
            >
              Nouveau
            </span>
            <span class="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-[900] uppercase tracking-wider rounded-[2px]">
              {{ subjectLabel(selected.subject) }}
            </span>
            <span
              v-if="selected.reply"
              class="px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-[900] uppercase tracking-wider rounded-[2px]"
            >
              Répondu
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
        </div>

        <div v-if="selected.reply && !replying" class="px-5 sm:px-6 py-5 border-b border-gray-100 bg-green-50/30">
          <div class="flex items-center justify-between gap-4 mb-3">
            <p class="text-[10px] font-[900] text-green-700 uppercase tracking-widest">Votre réponse</p>
            <span v-if="selected.repliedAt" class="text-[10px] text-gray-400 font-medium">
              {{ formatAdminDate(selected.repliedAt) }}
            </span>
          </div>
          <p class="text-gray-700 text-[15px] leading-relaxed font-medium whitespace-pre-wrap">{{ selected.reply }}</p>
        </div>

        <div class="px-5 sm:px-6 py-5">
          <div v-if="replying" class="space-y-4">
            <div>
              <label class="block text-[10px] font-[900] text-gray-500 uppercase tracking-widest mb-2">
                Rédiger une réponse
              </label>
              <textarea
                v-model="replyDraft"
                rows="6"
                class="reply-textarea"
                placeholder="Bonjour,&#10;&#10;Merci pour votre message..."
              />
            </div>

            <p v-if="replyError" class="text-red-600 text-sm font-medium">{{ replyError }}</p>
            <p v-if="replySuccess" class="text-brand-700 text-sm font-[900] uppercase tracking-wider">
              Réponse enregistrée.
            </p>

            <div class="flex flex-wrap gap-2">
              <button
                type="button"
                class="admin-btn-primary"
                :disabled="actionId === selected.id || !replyDraft.trim()"
                @click="saveReply(selected.id)"
              >
                Enregistrer la réponse
              </button>
              <button
                type="button"
                class="admin-btn-primary"
                :disabled="!replyDraft.trim()"
                @click="sendByEmail(selected)"
              >
                Envoyer par email
              </button>
              <button type="button" class="admin-btn-secondary" @click="cancelReply">
                Annuler
              </button>
            </div>
          </div>

          <div v-else class="flex flex-wrap gap-2">
            <button type="button" class="admin-btn-primary" @click="startReply(selected)">
              {{ selected.reply ? 'Modifier la réponse' : 'Répondre' }}
            </button>
            <button
              v-if="selected.reply"
              type="button"
              class="admin-btn-secondary"
              @click="sendByEmail(selected)"
            >
              Renvoyer par email
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

      <div v-else class="admin-empty lg:col-span-1">
        <p class="text-gray-500 font-medium">Sélectionnez un message pour le lire et y répondre.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ContactMessage } from '~/types/admin'
import { CONTACT_SUBJECTS } from '~/types/admin'

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const { data: messages, pending, refresh } = await useFetch<ContactMessage[]>('/api/admin/messages')

const selectedId = ref<string | null>(null)
const replying = ref(false)
const replyDraft = ref('')
const replyError = ref('')
const replySuccess = ref(false)
const actionId = ref<string | null>(null)

const selected = computed(() => messages.value?.find(m => m.id === selectedId.value) ?? null)
const unreadCount = computed(() => messages.value?.filter(m => !m.read).length ?? 0)
const repliedCount = computed(() => messages.value?.filter(m => m.reply).length ?? 0)

watch(messages, (list) => {
  if (list?.length && !selectedId.value) {
    selectedId.value = list[0].id
  }
}, { immediate: true })

function subjectLabel(key: string) {
  return CONTACT_SUBJECTS[key] || key
}

function formatShortDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })
}

function selectMessage(msg: ContactMessage) {
  selectedId.value = msg.id
  replying.value = false
  replyDraft.value = msg.reply || ''
  replyError.value = ''
  replySuccess.value = false
}

function startReply(msg: ContactMessage) {
  replying.value = true
  replyDraft.value = msg.reply || `Bonjour ${msg.name.split(' ')[0]},\n\nMerci pour votre message.\n\n\n\nBien cordialement,\nL'équipe OXYNOVA RDC`
  replyError.value = ''
  replySuccess.value = false
}

function cancelReply() {
  replying.value = false
  replyDraft.value = selected.value?.reply || ''
  replyError.value = ''
  replySuccess.value = false
}

function sendByEmail(msg: ContactMessage) {
  const text = replyDraft.value.trim() || msg.reply || ''
  const url = buildMailtoReply(msg, text, subjectLabel(msg.subject))
  window.location.href = url
}

async function saveReply(id: string) {
  if (!replyDraft.value.trim()) return
  replyError.value = ''
  replySuccess.value = false
  actionId.value = id
  try {
    await $fetch(`/api/admin/messages/${id}`, {
      method: 'PATCH',
      body: { reply: replyDraft.value.trim() },
    })
    await refresh()
    replying.value = false
    replySuccess.value = true
  }
  catch {
    replyError.value = 'Impossible d\'enregistrer la réponse.'
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
    if (selectedId.value === id) {
      selectedId.value = null
      replying.value = false
    }
    await refresh()
  }
  finally {
    actionId.value = null
  }
}

useHead({ title: 'Messages - Admin OXYNOVA RDC SARL' })
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
</style>
