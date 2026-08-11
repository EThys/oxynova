<template>
  <div class="mail-app h-full flex flex-col bg-[#fafbfc] text-slate-800 overflow-hidden">
    <!-- Compose modal -->
    <div
      v-if="composing"
      class="fixed inset-0 z-[80] bg-slate-900/40 flex items-end sm:items-center justify-center p-0 sm:p-6"
      @click.self="closeCompose"
    >
      <div class="bg-white w-full sm:max-w-2xl sm:rounded-md shadow-xl max-h-[min(92vh,100dvh)] overflow-y-auto border border-slate-200 rounded-t-2xl sm:rounded-md pb-[env(safe-area-inset-bottom)]">
        <div class="px-4 sm:px-5 py-3.5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 class="text-[15px] font-semibold tracking-tight text-slate-900">Nouveau message</h2>
          <button type="button" class="mail-icon-btn" aria-label="Fermer" @click="closeCompose">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <form class="px-4 sm:px-5 py-4 space-y-3" @submit.prevent="submitCompose(true)">
          <div class="mail-field">
            <span>À</span>
            <input v-model="compose.to" type="email" required placeholder="destinataire@email.com" autocomplete="email">
          </div>
          <div class="mail-field">
            <span>Nom</span>
            <input v-model="compose.toName" type="text" placeholder="Optionnel">
          </div>
          <div class="mail-field">
            <span>Objet</span>
            <input v-model="compose.subject" type="text" required placeholder="Objet du message">
          </div>
          <div class="rounded-md border border-slate-200 overflow-hidden">
            <AdminMailRichEditor
              v-model="compose.message"
              placeholder="Écrire le message…"
              min-height="180px"
            />
          </div>
          <div class="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200">
            <input ref="composeFileInput" type="file" class="hidden" multiple @change="onComposePickFiles">
            <button type="submit" class="mail-btn-primary" :disabled="composeSending || composeUploading || isEmptyHtml(compose.message)">
              {{ composeSending ? 'Envoi…' : 'Envoyer' }}
            </button>
            <button type="button" class="mail-btn-ghost" :disabled="composeSending || isEmptyHtml(compose.message)" @click="submitCompose(false)">
              Brouillon
            </button>
            <button type="button" class="mail-icon-btn" :disabled="composeUploading || composeFiles.length >= 5" title="Joindre" @click="composeFileInput?.click()">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/></svg>
            </button>
            <ul v-if="composeFiles.length" class="flex flex-wrap gap-2 w-full mt-1">
              <li v-for="file in composeFiles" :key="file.id" class="mail-chip">
                {{ file.filename }}
                <button type="button" @click="removeComposeFile(file.id)">×</button>
              </li>
            </ul>
            <p v-if="composeError || composeUploadError" class="w-full text-red-600 text-sm">{{ composeError || composeUploadError }}</p>
          </div>
        </form>
      </div>
    </div>

    <!-- Top toolbar -->
    <header class="mail-toolbar flex-shrink-0">
      <div class="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
        <button
          type="button"
          class="mail-btn-ghost hidden md:inline-flex"
          :class="{ 'mail-btn-ghost--active': !foldersCollapsed }"
          :aria-pressed="!foldersCollapsed"
          :title="foldersCollapsed ? 'Afficher les dossiers' : 'Masquer les dossiers'"
          @click="foldersCollapsed = !foldersCollapsed"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/></svg>
          <span class="hidden lg:inline">Dossiers</span>
        </button>
        <button type="button" class="mail-btn-primary" @click="openCompose">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
          <span class="sm:hidden">Écrire</span>
          <span class="hidden sm:inline">Nouveau</span>
        </button>
        <div class="flex items-center gap-0.5">
          <button type="button" class="mail-icon-btn" title="Actualiser" :disabled="pending || syncing" @click="refresh()">
            <svg class="w-5 h-5" :class="{ 'animate-spin': pending || syncing }" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          </button>
          <button type="button" class="mail-icon-btn" title="Forcer la sync Hostinger" :disabled="syncing" @click="syncMailbox(true)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/></svg>
          </button>
        </div>
        <p v-if="syncInfo" class="hidden lg:block text-xs font-medium truncate min-w-0" :class="syncInfo.error ? 'text-red-600' : 'text-brand-700'">
          {{ syncInfo.text }}
        </p>
      </div>
      <div class="text-[11px] sm:text-xs text-slate-500 font-medium tabular-nums flex-shrink-0">
        {{ payload?.total ?? 0 }}
        <span class="hidden sm:inline"> msg</span>
      </div>
    </header>

    <div class="flex-1 min-h-0 flex flex-col md:flex-row relative">
      <!-- Folders (desktop) — masqués en lecture pour maximiser l’espace -->
      <nav
        v-show="!foldersCollapsed && !mobileReading"
        class="mail-folders hidden md:flex flex-col flex-shrink-0 w-[200px] lg:w-[220px]"
      >
        <div class="flex items-center justify-between gap-2 px-3 pt-3 pb-2">
          <p class="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 px-1">
            Dossiers
          </p>
          <button
            type="button"
            class="mail-btn-ghost !px-2 !py-1 text-[11px]"
            title="Masquer les dossiers"
            @click="foldersCollapsed = true"
          >
            Masquer
          </button>
        </div>
        <button
          v-for="key in statusKeys"
          :key="key"
          type="button"
          class="mail-folder"
          :class="{ 'mail-folder--active': status === key }"
          @click="setStatus(key)"
        >
          <span class="mail-folder__icon" v-html="folderIcon(key)" />
          <span class="truncate">{{ folderLabel(key) }}</span>
          <span class="mail-folder__count">{{ payload?.counts?.[key] ?? 0 }}</span>
        </button>
      </nav>

      <!-- Mobile folder chips (in flow, not absolute) -->
      <div
        v-if="!mobileReading"
        class="md:hidden flex-shrink-0 bg-white border-b border-slate-200 px-2 py-2 flex gap-1.5 overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch] scrollbar-none"
      >
        <button
          v-for="key in statusKeys"
          :key="key"
          type="button"
          class="mail-chip-filter"
          :class="{ 'mail-chip-filter--active': status === key }"
          @click="setStatus(key)"
        >
          {{ MESSAGE_STATUS_LABELS[key] }}
          <span>{{ payload?.counts?.[key] ?? 0 }}</span>
        </button>
      </div>

      <div class="flex-1 min-h-0 flex min-w-0">
      <!-- List -->
      <section
        class="mail-list flex flex-col min-w-0 md:border-r border-slate-200 bg-white"
        :class="mobileReading ? 'hidden' : 'flex flex-1 w-full'"
      >
        <div class="hidden md:flex items-center justify-between px-4 py-2.5 border-b border-slate-200 bg-white">
          <p class="text-[12px] font-semibold text-slate-600">{{ folderLabel(status) }}</p>
          <p class="text-[11px] text-slate-400">{{ payload?.page }}/{{ payload?.pages || 1 }}</p>
        </div>

        <div v-if="pending && !messages.length" class="flex-1 flex items-center justify-center text-sm text-slate-400">
          Chargement…
        </div>

        <div v-else-if="!messages.length" class="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <p class="text-sm font-medium text-slate-600">Aucun message</p>
          <p class="text-xs text-slate-400 mt-1">Cette boîte est vide pour ce dossier.</p>
        </div>

        <ul v-else class="flex-1 overflow-y-auto overscroll-contain divide-y divide-slate-100">
          <li v-for="msg in messages" :key="msg.id">
            <button
              type="button"
              class="mail-row"
              :class="{
                'mail-row--active': selectedId === msg.id,
                'mail-row--unread': !msg.read && msg.source !== 'outbound',
              }"
              @click="selectMessage(msg)"
            >
              <span
                v-if="!msg.read && msg.source !== 'outbound'"
                class="mail-unread-dot"
                aria-hidden="true"
              />
              <span v-else class="mail-unread-dot mail-unread-dot--read" aria-hidden="true" />
              <div class="mail-avatar" :style="{ background: avatarColor(msg.email || msg.name) }">
                {{ initials(msg.name) }}
              </div>
              <div class="min-w-0 flex-1">
                <div class="flex items-baseline gap-2">
                  <span class="mail-row__from truncate">{{ msg.name }}</span>
                  <span class="mail-row__date ml-auto flex-shrink-0">{{ formatMailDate(msg.createdAt) }}</span>
                </div>
                <p class="mail-row__subject truncate">{{ subjectLabel(msg.subject) }}</p>
                <p class="mail-row__preview truncate">{{ emailPreviewText(msg.message) }}</p>
                <div v-if="msg.attachments?.length || getMessageStatus(msg) === 'draft'" class="flex items-center gap-1.5 mt-1">
                  <span v-if="msg.attachments?.length" class="text-slate-400" title="Pièce jointe">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/></svg>
                  </span>
                  <span v-if="getMessageStatus(msg) === 'draft'" class="text-[10px] font-medium text-slate-400 uppercase tracking-wide">Brouillon</span>
                </div>
              </div>
            </button>
          </li>
        </ul>

        <div v-if="(payload?.pages || 1) > 1" class="flex items-center justify-between gap-2 px-3 py-2 border-t border-slate-200 bg-white pb-[max(0.5rem,env(safe-area-inset-bottom))] md:pb-2">
          <button type="button" class="mail-btn-ghost !px-2 !py-1" :disabled="page <= 1" @click="setPage(page - 1)">←</button>
          <span class="text-[11px] text-slate-500">{{ page }} / {{ payload?.pages }}</span>
          <button type="button" class="mail-btn-ghost !px-2 !py-1" :disabled="page >= (payload?.pages || 1)" @click="setPage(page + 1)">→</button>
        </div>
      </section>

      <!-- Reading pane — plein écran (style Gmail) -->
      <section
        class="mail-reading min-w-0 flex-col bg-[#fafbfc]"
        :class="mobileReading ? 'flex flex-1 w-full' : 'hidden'"
      >
        <template v-if="selected">
          <div class="flex-shrink-0 bg-white border-b border-slate-200 px-3 sm:px-6 py-3">
            <div class="flex items-start gap-2 sm:gap-3 mb-3">
              <button type="button" class="mail-icon-btn -ml-1 mt-0.5 flex-shrink-0" aria-label="Retour à la liste" title="Retour" @click="closeMobileReading">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
              </button>
              <h2 class="text-base sm:text-xl font-semibold tracking-tight leading-snug flex-1 min-w-0 text-slate-900 break-words">
                {{ subjectLabel(selected.subject) }}
              </h2>
              <div class="flex items-center gap-0.5 flex-shrink-0">
                <button
                  v-if="!selected.read"
                  type="button"
                  class="mail-icon-btn"
                  title="Marquer lu"
                  :disabled="actionId === selected.id"
                  @click="markAsRead(selected.id)"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M3 19V5a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M13 3v6h6"/></svg>
                </button>
                <button
                  v-else
                  type="button"
                  class="mail-icon-btn"
                  title="Marquer non lu"
                  :disabled="actionId === selected.id"
                  @click="markAsUnread(selected.id)"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </button>
                <button
                  type="button"
                  class="mail-icon-btn text-red-600 hover:bg-red-50"
                  title="Supprimer"
                  :disabled="actionId === selected.id"
                  @click="removeMessage(selected.id)"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="mail-avatar mail-avatar--lg hidden sm:flex" :style="{ background: avatarColor(selected.email || selected.name) }">
                {{ initials(selected.name) }}
              </div>
              <div class="min-w-0 flex-1 text-sm">
                <div class="flex flex-col sm:flex-row sm:flex-wrap sm:items-baseline gap-x-2 gap-y-0.5">
                  <span class="font-semibold text-slate-900">{{ selected.name }}</span>
                  <a :href="`mailto:${selected.email}`" class="text-slate-500 hover:text-brand-700 break-all text-[13px]">&lt;{{ selected.email }}&gt;</a>
                  <span class="text-xs text-slate-400 sm:ml-auto">{{ formatAdminDate(selected.createdAt) }}</span>
                </div>
                <p v-if="selected.company || selected.phone" class="text-xs text-slate-500 mt-0.5">
                  <span v-if="selected.company">{{ selected.company }}</span>
                  <span v-if="selected.company && selected.phone"> · </span>
                  <span v-if="selected.phone">{{ selected.phone }}</span>
                </p>
                <p class="text-xs text-slate-400 mt-1">
                  {{ selected.source === 'outbound' ? 'À' : 'De' }}
                  ·
                  {{ selected.source === 'email' ? 'Boîte Hostinger' : selected.source === 'outbound' ? 'Message sortant' : 'Formulaire du site' }}
                </p>
              </div>
            </div>
          </div>

          <div class="flex-1 overflow-y-auto overscroll-contain px-3 sm:px-6 py-4 sm:py-5">
            <article class="mail-body max-w-3xl mx-auto">
              <div class="mail-body-card">
                <iframe
                  v-if="selected.messageHtml"
                  class="mail-html-frame"
                  title="Contenu du message"
                  sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                  :srcdoc="htmlFrameDoc(selected.messageHtml)"
                />
                <div
                  v-else-if="looksLikeHtml(selected.message)"
                  class="mail-html-content text-[15px] leading-relaxed text-slate-800 break-words"
                  v-html="htmlWithNewTabLinks(selected.message)"
                />
                <p v-else class="whitespace-pre-wrap text-[15px] leading-relaxed text-slate-800 break-words">{{ selected.message }}</p>

                <div v-if="selected.attachments?.length" class="mt-6 pt-5 border-t border-slate-200">
                  <p class="text-xs font-semibold text-slate-500 mb-3">
                    {{ selected.attachments.length }} pièce(s) jointe(s)
                  </p>
                  <ul class="grid sm:grid-cols-2 gap-2">
                    <li v-for="file in selected.attachments" :key="file.id">
                      <a :href="file.url" download target="_blank" rel="noopener" class="mail-attach">
                        <span class="mail-attach__icon">
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                        </span>
                        <span class="min-w-0">
                          <span class="block text-sm font-medium truncate text-slate-800">{{ file.filename }}</span>
                          <span class="block text-[11px] text-slate-400">{{ formatSize(file.size) }}</span>
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>

                <div
                  v-if="selected.reply && !replying && selected.source !== 'outbound'"
                  class="mt-6 pt-5 border-t border-slate-200"
                >
                  <div class="flex items-center justify-between gap-3 mb-2">
                    <p class="text-xs font-semibold text-slate-600">
                      {{ selected.replyStatus === 'draft' ? 'Brouillon de réponse' : 'Vous avez répondu' }}
                    </p>
                    <span v-if="selected.repliedAt" class="text-[11px] text-slate-400">{{ formatAdminDate(selected.repliedAt) }}</span>
                  </div>
                  <div
                    v-if="looksLikeHtml(selected.reply)"
                    class="mail-html-content text-[14px] leading-relaxed text-slate-700 break-words"
                    v-html="htmlWithNewTabLinks(selected.reply)"
                  />
                  <p v-else class="whitespace-pre-wrap text-[14px] leading-relaxed text-slate-700 break-words">{{ selected.reply }}</p>
                  <ul v-if="selected.replyAttachments?.length" class="mt-3 space-y-1">
                    <li v-for="file in selected.replyAttachments" :key="file.id">
                      <a :href="file.url" class="text-xs font-medium text-brand-700 hover:underline" download target="_blank" rel="noopener">{{ file.filename }}</a>
                    </li>
                  </ul>
                </div>

                <p v-if="replySuccess && !replying" class="mt-4 text-sm font-medium text-brand-700">{{ replySuccessText }}</p>
              </div>
            </article>
          </div>

          <!-- Reply / actions bar -->
          <div class="flex-shrink-0 border-t border-slate-200 bg-white px-3 sm:px-6 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <div v-if="replying && selected.source !== 'outbound'" class="max-w-3xl mx-auto space-y-3">
              <div class="rounded-md border border-slate-200 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/10 overflow-hidden bg-white">
                <div class="px-3 py-2 border-b border-slate-100 text-xs text-slate-500 bg-slate-50">
                  Répondre à <span class="font-semibold text-slate-700">{{ selected.name }}</span>
                </div>
                <AdminMailRichEditor
                  v-model="replyDraft"
                  placeholder="Écrire une réponse…"
                  min-height="120px"
                />
                <div class="px-3 py-2 border-t border-slate-100 flex flex-wrap items-center gap-2 bg-slate-50">
                  <input ref="fileInput" type="file" class="hidden" multiple @change="onPickFiles">
                  <button type="button" class="mail-btn-primary" :disabled="actionId === selected.id || isEmptyHtml(replyDraft) || uploading" @click="sendReply(selected.id, true)">
                    {{ actionId === selected.id ? 'Envoi…' : 'Envoyer' }}
                  </button>
                  <button type="button" class="mail-btn-ghost" :disabled="actionId === selected.id || isEmptyHtml(replyDraft)" @click="sendReply(selected.id, false)">
                    Brouillon
                  </button>
                  <button type="button" class="mail-icon-btn" :disabled="uploading || replyFiles.length >= 5" title="Joindre" @click="fileInput?.click()">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/></svg>
                  </button>
                  <button type="button" class="mail-btn-ghost sm:ml-auto" @click="cancelReply">Annuler</button>
                </div>
              </div>
              <ul v-if="replyFiles.length" class="flex flex-wrap gap-2">
                <li v-for="file in replyFiles" :key="file.id" class="mail-chip">
                  {{ file.filename }}
                  <button type="button" @click="removeReplyFile(file.id)">×</button>
                </li>
              </ul>
              <p v-if="replyError || uploadError" class="text-red-600 text-sm">{{ replyError || uploadError }}</p>
            </div>
            <div v-else-if="selected.source === 'outbound'" class="max-w-3xl mx-auto flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-3">
              <p class="text-sm text-slate-500">
                {{ selected.replyStatus === 'draft' ? 'Brouillon enregistré' : 'Message envoyé' }}
                <span v-if="selected.repliedAt || selected.createdAt" class="text-slate-400">
                  · {{ formatAdminDate(selected.repliedAt || selected.createdAt) }}
                </span>
              </p>
              <button type="button" class="mail-btn-ghost sm:ml-auto w-full sm:w-auto justify-center" @click="composeToSelected(selected)">
                Écrire un autre message
              </button>
            </div>
            <div v-else class="max-w-3xl mx-auto">
              <button type="button" class="mail-reply-trigger" @click="startReply(selected)">
                <span class="text-sm text-slate-500 truncate">Cliquer pour répondre à {{ selected.name.split(' ')[0] }}…</span>
              </button>
            </div>
          </div>
        </template>

        <div v-else class="flex-1 flex flex-col items-center justify-center text-center px-6">
          <p class="text-sm font-medium text-slate-600">Message introuvable</p>
          <button type="button" class="mail-btn-ghost mt-3" @click="closeMobileReading">Retour à la liste</button>
        </div>
      </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ContactMessage, MessageAttachment, MessageFilterStatus } from '~/types/admin'
import { CONTACT_SUBJECTS, getMessageStatus, MESSAGE_STATUS_LABELS } from '~/types/admin'
import { stripHtml, looksLikeHtml, emailPreviewText } from '~/utils/emailPreview'

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
    limit: 20,
  })),
  watch: [status, page],
})

const messages = computed(() => payload.value?.items || [])
const selectedId = ref<string | null>(null)
const mobileReading = ref(false)
const foldersCollapsed = useState('mail-folders-collapsed', () => false)
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
    mobileReading.value = true
    return
  }
  if (list.length && !list.some(m => m.id === selectedId.value)) {
    selectedId.value = list[0].id
  }
  if (!list.length) {
    selectedId.value = null
    mobileReading.value = false
  }
}, { immediate: true })

function folderLabel(key: MessageFilterStatus) {
  const map: Record<MessageFilterStatus, string> = {
    all: 'Boîte de réception',
    unread: 'Non lus',
    read: 'Lus',
    draft: 'Brouillons',
    sent: 'Envoyés',
  }
  return map[key] || MESSAGE_STATUS_LABELS[key]
}

function folderIcon(key: MessageFilterStatus) {
  const icons: Record<MessageFilterStatus, string> = {
    all: '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
    unread: '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>',
    read: '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
    draft: '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>',
    sent: '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>',
  }
  return icons[key]
}

function setStatus(next: MessageFilterStatus) {
  mobileReading.value = false
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

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
}

function avatarColor(seed: string) {
  const palette = ['#1e3a5f', '#174794', '#0e7490', '#334155', '#475569', '#1d4ed8', '#0f766e']
  let hash = 0
  for (let i = 0; i < seed.length; i++) hash = seed.charCodeAt(i) + ((hash << 5) - hash)
  return palette[Math.abs(hash) % palette.length]
}

function formatMailDate(iso: string) {
  const d = new Date(iso)
  const now = new Date()
  const sameDay = d.toDateString() === now.toDateString()
  if (sameDay) {
    return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  }
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} o`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`
}

function htmlWithNewTabLinks(html: string) {
  return (html || '').replace(/<a\b([^>]*)>/gi, (_full, attrs: string) => {
    let next = String(attrs || '')
    if (!/\btarget\s*=/i.test(next)) {
      next += ' target="_blank"'
    }
    else {
      next = next.replace(/\btarget\s*=\s*(['"]).*?\1/gi, 'target="_blank"')
      next = next.replace(/\btarget\s*=\s*[^\s>]+/gi, 'target="_blank"')
    }
    if (!/\brel\s*=/i.test(next)) {
      next += ' rel="noopener noreferrer"'
    }
    return `<a${next}>`
  })
}

function htmlFrameDoc(html: string) {
  const origin = import.meta.client ? window.location.origin : ''
  const body = htmlWithNewTabLinks(html)
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><base href="${origin}/" target="_blank" rel="noopener noreferrer"><style>
    html,body{margin:0;padding:0;background:#fff;color:#1e293b;font:14px/1.55 Arial,Helvetica,sans-serif}
    img{max-width:100%;height:auto}
    a{color:#174794}
    table{max-width:100%}
  </style></head><body>${body}</body></html>`
}

function isEmptyHtml(html: string) {
  return !stripHtml(html || '')
}

function toStoredHtml(html: string) {
  const raw = (html || '').trim()
  if (!raw) return ''
  if (/<[a-z][\s\S]*>/i.test(raw)) return raw
  return raw.split('\n').map(l => `<p>${l || '<br>'}</p>`).join('')
}

function selectMessage(msg: ContactMessage) {
  selectedId.value = msg.id
  mobileReading.value = true
  replying.value = false
  replyDraft.value = msg.reply || ''
  replyFiles.value = msg.replyAttachments ? [...msg.replyAttachments] : []
  replyError.value = ''
  replySuccess.value = false
  uploadError.value = ''
  router.replace({ query: { ...route.query, id: msg.id } })
  if (!msg.read && msg.source !== 'outbound') {
    markAsRead(msg.id)
  }
}

function closeMobileReading() {
  mobileReading.value = false
  replying.value = false
  const q = { ...route.query }
  delete q.id
  router.replace({ query: q })
}

function startReply(msg: ContactMessage) {
  replying.value = true
  const first = msg.name.split(' ')[0]
  replyDraft.value = msg.reply || `<p>Bonjour ${first},</p><p>Merci pour votre message.</p><p>Bien cordialement,<br>L'équipe OXYNOVA RDC</p>`
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
  const html = toStoredHtml(replyDraft.value)
  if (isEmptyHtml(html)) return
  replyError.value = ''
  replySuccess.value = false
  actionId.value = id
  try {
    const result = await $fetch<{ mailSent: boolean }>('/api/admin/messages/reply', {
      method: 'POST',
      body: {
        id,
        reply: html,
        sendEmail,
        attachments: replyFiles.value,
      },
    })
    // Libérer le bouton immédiatement (ne pas attendre le refresh / IMAP)
    actionId.value = null
    replying.value = false
    replySuccess.value = true
    replySuccessText.value = sendEmail && result.mailSent
      ? 'Réponse envoyée par email.'
      : 'Brouillon enregistré.'
    void refresh().then(() => refreshNuxtData('admin-stats'))
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
  try {
    await $fetch(`/api/admin/messages/${id}`, { method: 'PATCH', body: { read: true } })
    void refresh().then(() => refreshNuxtData('admin-stats'))
  }
  catch {
    // silencieux
  }
}

async function markAsUnread(id: string) {
  actionId.value = id
  try {
    await $fetch(`/api/admin/messages/${id}`, { method: 'PATCH', body: { read: false } })
    void refresh().then(() => refreshNuxtData('admin-stats'))
  }
  finally {
    actionId.value = null
  }
}

async function removeMessage(id: string) {
  const msg = messages.value.find(m => m.id === id)
  const fromMail = msg?.source === 'email'
  const confirmText = fromMail
    ? 'Supprimer ce message ici et aussi sur Hostinger (boîte mail) ?'
    : 'Supprimer ce message définitivement ?'
  if (!confirm(confirmText)) return

  actionId.value = id
  try {
    await $fetch(`/api/admin/messages/${id}`, { method: 'DELETE' })
    if (selectedId.value === id) selectedId.value = null
    mobileReading.value = false
    replying.value = false
    void refresh().then(() => refreshNuxtData('admin-stats'))
  }
  catch (err: unknown) {
    const statusMessage = (err as { data?: { statusMessage?: string }; statusMessage?: string })?.data?.statusMessage
      || (err as { statusMessage?: string })?.statusMessage
      || 'Suppression impossible.'
    alert(statusMessage)
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

function composeToSelected(msg: ContactMessage) {
  composing.value = true
  composeError.value = ''
  composeUploadError.value = ''
  composeFiles.value = []
  compose.to = msg.email
  compose.toName = msg.name
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
  const html = toStoredHtml(compose.message)
  if (!compose.to.trim() || !compose.subject.trim() || isEmptyHtml(html)) {
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
        message: html,
        sendEmail,
        attachments: composeFiles.value,
      },
    })
    composeSending.value = false
    closeCompose()
    selectedId.value = result.message.id
    mobileReading.value = true
    await router.replace({ query: { ...route.query, status: sendEmail ? 'sent' : 'draft', id: result.message.id, page: undefined } })
    void refresh().then(() => refreshNuxtData('admin-stats'))
  }
  catch (e: unknown) {
    const err = e as { data?: { statusMessage?: string }; statusMessage?: string }
    composeError.value = err?.data?.statusMessage || err?.statusMessage || 'Impossible d\'envoyer le message.'
  }
  finally {
    composeSending.value = false
  }
}

async function syncMailbox(force = false) {
  if (force) {
    syncing.value = true
    syncInfo.value = null
  }
  try {
    const result = await $fetch<{ imported: number; skipped: number; totalFetched: number }>('/api/admin/messages/sync', {
      method: 'POST',
    })
    await refresh()
    await refreshNuxtData('admin-stats')
    if (force || result.imported > 0) {
      syncInfo.value = {
        text: `Sync OK — ${result.imported} importé(s), ${result.skipped} ignoré(s).`,
      }
    }
  }
  catch (e: unknown) {
    if (force) {
      const err = e as { data?: { statusMessage?: string }; statusMessage?: string }
      syncInfo.value = {
        text: err?.data?.statusMessage || err?.statusMessage || 'Sync impossible. Vérifiez IMAP dans le .env.',
        error: true,
      }
    }
  }
  finally {
    if (force) syncing.value = false
  }
}

let pollTimer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  void syncMailbox(false)
  pollTimer = setInterval(() => {
    if (document.visibilityState === 'visible') void syncMailbox(false)
  }, 45_000)
})

onUnmounted(() => {
  if (pollTimer) clearInterval(pollTimer)
})

useAdminSeo('Messages')
</script>

<style scoped>
.mail-toolbar {
  @apply flex items-center justify-between gap-2 sm:gap-3 px-2.5 sm:px-4 py-2 sm:py-2.5 bg-white border-b border-slate-200;
}
.mail-folders {
  @apply bg-slate-50 border-r border-slate-200 py-1;
}
.mail-folder {
  @apply relative mx-2 mb-0.5 flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] font-medium text-slate-600 hover:bg-slate-100/80 transition-colors text-left;
}
.mail-folder--active {
  @apply bg-brand-50 text-brand-800 font-semibold;
}
.mail-folder__icon {
  @apply text-slate-400 flex-shrink-0;
}
.mail-folder--active .mail-folder__icon {
  @apply text-brand-700;
}
.mail-folder__count {
  @apply ml-auto text-[11px] tabular-nums text-slate-400;
}
.mail-folder--active .mail-folder__count {
  @apply text-brand-700 font-semibold;
}
.mail-chip-filter {
  @apply inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-semibold whitespace-nowrap bg-slate-100 text-slate-600 border border-transparent;
}
.mail-chip-filter--active {
  @apply bg-brand-50 text-brand-800 border-brand-200;
}
.mail-row {
  @apply w-full text-left flex items-start gap-2.5 px-3 sm:px-4 py-3.5 sm:py-3 hover:bg-slate-50 transition-colors;
}
.mail-row--active {
  @apply bg-brand-50/60;
}
.mail-row--unread .mail-row__from,
.mail-row--unread .mail-row__subject {
  @apply font-semibold text-slate-900;
}
.mail-unread-dot {
  @apply w-2 h-2 rounded-full bg-brand-600 flex-shrink-0 mt-3.5;
}
.mail-unread-dot--read {
  @apply bg-transparent;
}
.mail-row__from {
  @apply text-[13px] font-medium text-slate-800;
}
.mail-row__date {
  @apply text-[11px] text-slate-400 tabular-nums;
}
.mail-row__subject {
  @apply text-[13px] text-slate-700 mt-0.5;
}
.mail-row__preview {
  @apply text-[12px] text-slate-400 mt-0.5;
}
.mail-avatar {
  @apply w-9 h-9 rounded-full flex items-center justify-center text-white text-[11px] font-semibold flex-shrink-0;
}
.mail-avatar--lg {
  @apply w-11 h-11 text-[13px];
}
.mail-btn-primary {
  @apply inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-brand-700 text-white text-[12px] font-semibold hover:bg-brand-800 transition-colors disabled:opacity-50;
}
.mail-btn-ghost {
  @apply inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-semibold text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-40;
}
.mail-btn-ghost--active {
  @apply bg-brand-50 text-brand-800 hover:bg-brand-50;
}
.mail-icon-btn {
  @apply p-2 rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors disabled:opacity-40;
}
.mail-field {
  @apply flex items-center gap-3 border-b border-slate-200 py-2;
}
.mail-field span {
  @apply w-10 text-xs font-semibold text-slate-400 flex-shrink-0;
}
.mail-field input {
  @apply flex-1 border-0 focus:outline-none focus:ring-0 text-sm font-medium bg-transparent text-slate-800;
}
.mail-chip {
  @apply inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-[11px] font-medium text-slate-700 border border-slate-200;
}
.mail-chip button {
  @apply text-slate-400 hover:text-red-600 text-sm leading-none;
}
.mail-body-card {
  @apply bg-white rounded-md border border-slate-200 px-3 sm:px-5 py-4 sm:py-5 shadow-sm overflow-x-auto;
}
.mail-html-content :deep(b),
.mail-html-content :deep(strong) {
  @apply font-bold;
}
.mail-html-content :deep(i),
.mail-html-content :deep(em) {
  @apply italic;
}
.mail-html-content :deep(u) {
  @apply underline;
}
.mail-html-content :deep(a) {
  @apply text-brand-700 underline break-all;
}
.mail-html-content :deep(ul) {
  @apply list-disc pl-5 my-2;
}
.mail-html-content :deep(ol) {
  @apply list-decimal pl-5 my-2;
}
.mail-html-content :deep(p) {
  @apply my-1;
}
.mail-html-frame {
  @apply w-full border-0 bg-white block;
  min-height: 220px;
  height: min(60vh, 640px);
}
@media (min-width: 640px) {
  .mail-html-frame {
    min-height: 320px;
    height: min(72vh, 780px);
  }
}
.mail-attach {
  @apply flex items-center gap-3 px-3 py-2.5 rounded-md border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 transition-colors;
}
.mail-attach__icon {
  @apply w-9 h-9 rounded-md bg-slate-100 text-slate-500 flex items-center justify-center flex-shrink-0;
}
.mail-reply-trigger {
  @apply w-full flex items-center px-3 py-2.5 rounded-md border border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50 transition-colors text-left;
}
.mail-list {
  @apply w-full min-w-0 flex-1;
}
.scrollbar-none {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
</style>
