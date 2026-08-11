import { f as formatAdminDate } from './useAdmin-CW1Bjdf4.mjs';
import { defineComponent, computed, withAsyncContext, ref, reactive, watch, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { M as MESSAGE_STATUS_LABELS, C as CONTACT_SUBJECTS, g as getMessageStatus } from './admin-C5NtE001.mjs';
import { _ as _export_sfc, l as useRoute, a as useRouter } from './server.mjs';
import { u as useFetch } from './fetch-BEgLTeJq.mjs';
import { a as useAdminSeo } from './usePageSeo-dIWm1VtT.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:fs/promises';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';
import '@vue/shared';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "messages",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    useRouter();
    const statusKeys = ["all", "unread", "read", "draft", "sent"];
    const status = computed(() => {
      const s = String(route.query.status || "all");
      return statusKeys.includes(s) ? s : "all";
    });
    const page = computed(() => Math.max(1, Number(route.query.page) || 1));
    const { data: payload, pending, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/admin/messages", {
      key: "admin-messages-list",
      query: computed(() => ({
        status: status.value,
        page: page.value,
        limit: 10
      })),
      watch: [status, page]
    }, "$NexCL9IJ16")), __temp = await __temp, __restore(), __temp);
    const messages2 = computed(() => payload.value?.items || []);
    const selectedId = ref(null);
    const replying = ref(false);
    const replyDraft = ref("");
    const replyError = ref("");
    const replySuccess = ref(false);
    const replySuccessText = ref("");
    const actionId = ref(null);
    const syncing = ref(false);
    const syncInfo = ref(null);
    ref(null);
    const replyFiles = ref([]);
    const uploading = ref(false);
    const uploadError = ref("");
    const composing = ref(false);
    const composeSending = ref(false);
    const composeError = ref("");
    const composeUploading = ref(false);
    const composeUploadError = ref("");
    ref(null);
    const composeFiles = ref([]);
    const compose = reactive({
      to: "",
      toName: "",
      subject: "",
      message: ""
    });
    const selected = computed(() => messages2.value.find((m) => m.id === selectedId.value) || null);
    watch(messages2, (list) => {
      const wanted = typeof route.query.id === "string" ? route.query.id : null;
      if (wanted && list.some((m) => m.id === wanted)) {
        selectedId.value = wanted;
        return;
      }
      if (list.length && !list.some((m) => m.id === selectedId.value)) {
        selectedId.value = list[0].id;
      }
      if (!list.length) selectedId.value = null;
    }, { immediate: true });
    function subjectLabel(key) {
      return CONTACT_SUBJECTS[key] || key;
    }
    function formatShortDate(iso) {
      return new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });
    }
    function statusLabel(msg) {
      return MESSAGE_STATUS_LABELS[getMessageStatus(msg)];
    }
    function statusPillClass(msg) {
      const s = getMessageStatus(msg);
      if (s === "unread") return "bg-brand-50 text-brand-800";
      if (s === "draft") return "bg-amber-50 text-amber-800";
      if (s === "sent") return "bg-emerald-50 text-emerald-800";
      return "bg-gray-100 text-gray-600";
    }
    function formatSize(bytes) {
      if (bytes < 1024) return `${bytes} o`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
      return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
    }
    useAdminSeo("Messages");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-8ee41bea><div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6 sm:mb-8" data-v-8ee41bea><div data-v-8ee41bea><p class="text-[11px] font-[900] uppercase tracking-[0.25em] text-brand-700 mb-2" data-v-8ee41bea>Boîte</p><h1 class="text-2xl sm:text-[32px] font-[900] text-[#1a1a1b] uppercase tracking-tighter" data-v-8ee41bea>Messages</h1><p class="text-gray-500 font-medium mt-2" data-v-8ee41bea>${ssrInterpolate(unref(payload)?.total ?? 0)} message(s) · les plus récents en haut </p>`);
      if (unref(syncInfo)) {
        _push(`<p class="${ssrRenderClass([unref(syncInfo).error ? "text-red-600" : "text-brand-700", "text-xs font-medium mt-2"])}" data-v-8ee41bea>${ssrInterpolate(unref(syncInfo).text)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex flex-wrap gap-2" data-v-8ee41bea><button type="button" class="admin-btn-primary" data-v-8ee41bea> Nouveau message </button><button type="button" class="admin-btn-secondary"${ssrIncludeBooleanAttr(unref(syncing)) ? " disabled" : ""} data-v-8ee41bea>${ssrInterpolate(unref(syncing) ? "Synchronisation…" : "Synchroniser la boîte")}</button><button type="button" class="admin-btn-secondary" data-v-8ee41bea>Actualiser</button></div></div>`);
      if (unref(composing)) {
        _push(`<div class="fixed inset-0 z-[80] bg-brand-900/50 flex items-end sm:items-center justify-center p-0 sm:p-6" data-v-8ee41bea><div class="bg-white w-full sm:max-w-xl sm:rounded-[4px] shadow-2xl max-h-[92vh] overflow-y-auto" data-v-8ee41bea><div class="px-5 sm:px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white" data-v-8ee41bea><h2 class="text-[15px] font-[900] uppercase tracking-tight" data-v-8ee41bea>Nouveau message</h2><button type="button" class="text-[11px] font-[900] uppercase tracking-wider text-gray-400 hover:text-gray-700" data-v-8ee41bea> Fermer </button></div><form class="px-5 sm:px-6 py-5 space-y-4" data-v-8ee41bea><div data-v-8ee41bea><label class="block text-[10px] font-[900] text-gray-500 uppercase tracking-widest mb-2" data-v-8ee41bea>Destinataire (email)</label><input${ssrRenderAttr("value", unref(compose).to)} type="email" required class="admin-input" placeholder="client@email.com" data-v-8ee41bea></div><div data-v-8ee41bea><label class="block text-[10px] font-[900] text-gray-500 uppercase tracking-widest mb-2" data-v-8ee41bea>Nom (optionnel)</label><input${ssrRenderAttr("value", unref(compose).toName)} type="text" class="admin-input" placeholder="Nom du destinataire" data-v-8ee41bea></div><div data-v-8ee41bea><label class="block text-[10px] font-[900] text-gray-500 uppercase tracking-widest mb-2" data-v-8ee41bea>Objet</label><input${ssrRenderAttr("value", unref(compose).subject)} type="text" required class="admin-input" placeholder="Objet du message" data-v-8ee41bea></div><div data-v-8ee41bea><label class="block text-[10px] font-[900] text-gray-500 uppercase tracking-widest mb-2" data-v-8ee41bea>Message</label><textarea required rows="7" class="reply-textarea" placeholder="Bonjour,

..." data-v-8ee41bea>${ssrInterpolate(unref(compose).message)}</textarea></div><div data-v-8ee41bea><label class="block text-[10px] font-[900] text-gray-500 uppercase tracking-widest mb-2" data-v-8ee41bea> Pièces jointes (max 5 · 12 Mo) </label><input type="file" class="hidden" multiple data-v-8ee41bea><button type="button" class="admin-btn-secondary"${ssrIncludeBooleanAttr(unref(composeUploading) || unref(composeFiles).length >= 5) ? " disabled" : ""} data-v-8ee41bea>${ssrInterpolate(unref(composeUploading) ? "Upload…" : "Ajouter un fichier")}</button>`);
        if (unref(composeFiles).length) {
          _push(`<ul class="mt-2 space-y-2" data-v-8ee41bea><!--[-->`);
          ssrRenderList(unref(composeFiles), (file) => {
            _push(`<li class="flex items-center justify-between gap-3 px-3 py-2 bg-gray-50 border border-gray-200 rounded-[2px]" data-v-8ee41bea><span class="text-sm font-medium truncate" data-v-8ee41bea>${ssrInterpolate(file.filename)}</span><button type="button" class="text-[10px] font-[900] uppercase tracking-wider text-red-600" data-v-8ee41bea> Retirer </button></li>`);
          });
          _push(`<!--]--></ul>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(composeUploadError)) {
          _push(`<p class="text-red-600 text-sm font-medium mt-2" data-v-8ee41bea>${ssrInterpolate(unref(composeUploadError))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (unref(composeError)) {
          _push(`<p class="text-red-600 text-sm font-medium" data-v-8ee41bea>${ssrInterpolate(unref(composeError))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex flex-wrap gap-2 pt-2" data-v-8ee41bea><button type="submit" class="admin-btn-primary"${ssrIncludeBooleanAttr(unref(composeSending) || unref(composeUploading)) ? " disabled" : ""} data-v-8ee41bea>${ssrInterpolate(unref(composeSending) ? "Envoi…" : "Envoyer")}</button><button type="button" class="admin-btn-secondary"${ssrIncludeBooleanAttr(unref(composeSending) || unref(composeUploading)) ? " disabled" : ""} data-v-8ee41bea> Enregistrer brouillon </button><button type="button" class="admin-btn-secondary" data-v-8ee41bea>Annuler</button></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex flex-wrap gap-2 mb-6" data-v-8ee41bea><!--[-->`);
      ssrRenderList(statusKeys, (key) => {
        _push(`<button type="button" class="${ssrRenderClass([{ "filter-chip--active": unref(status) === key }, "filter-chip"])}" data-v-8ee41bea>${ssrInterpolate(unref(MESSAGE_STATUS_LABELS)[key])} <span class="opacity-60" data-v-8ee41bea>${ssrInterpolate(unref(payload)?.counts?.[key] ?? 0)}</span></button>`);
      });
      _push(`<!--]--></div>`);
      if (unref(pending)) {
        _push(`<div class="text-gray-500 font-medium py-10" data-v-8ee41bea>Chargement des messages...</div>`);
      } else if (!unref(messages2).length) {
        _push(`<div class="admin-empty" data-v-8ee41bea><p class="text-gray-500 font-medium" data-v-8ee41bea>Aucun message dans ce filtre.</p><p class="text-gray-400 text-sm mt-1" data-v-8ee41bea>Formulaire du site, sync IMAP, ou changez de statut.</p></div>`);
      } else {
        _push(`<div class="grid lg:grid-cols-[340px_1fr] gap-6 items-start" data-v-8ee41bea><aside class="bg-white rounded-[4px] border border-gray-100 shadow-sm overflow-hidden" data-v-8ee41bea><div class="px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between" data-v-8ee41bea><p class="text-[10px] font-[900] text-gray-400 uppercase tracking-widest" data-v-8ee41bea>Réception</p><p class="text-[10px] font-[900] text-gray-400" data-v-8ee41bea>Page ${ssrInterpolate(unref(payload)?.page)}/${ssrInterpolate(unref(payload)?.pages)}</p></div><ul class="max-h-[62vh] overflow-y-auto divide-y divide-gray-50" data-v-8ee41bea><!--[-->`);
        ssrRenderList(unref(messages2), (msg) => {
          _push(`<li data-v-8ee41bea><button type="button" class="${ssrRenderClass([unref(selectedId) === msg.id ? "bg-brand-50 border-l-4 border-l-brand-700" : "border-l-4 border-l-transparent", "w-full text-left px-4 py-4 hover:bg-brand-50/50 transition-colors"])}" data-v-8ee41bea><div class="flex items-start justify-between gap-2 mb-1" data-v-8ee41bea><span class="${ssrRenderClass([!msg.read ? "text-brand-800" : "text-[#1a1a1b]", "font-[900] text-sm truncate"])}" data-v-8ee41bea>${ssrInterpolate(msg.name)}</span>`);
          if (!msg.read) {
            _push(`<span class="w-2 h-2 bg-brand-700 rounded-full flex-shrink-0 mt-1.5" data-v-8ee41bea></span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><p class="text-xs text-gray-500 font-medium truncate mb-1" data-v-8ee41bea>${ssrInterpolate(subjectLabel(msg.subject))}</p><p class="text-xs text-gray-400 line-clamp-2 leading-relaxed" data-v-8ee41bea>${ssrInterpolate(msg.message)}</p><div class="flex items-center gap-2 mt-2 flex-wrap" data-v-8ee41bea><span class="text-[10px] text-gray-400 font-medium" data-v-8ee41bea>${ssrInterpolate(formatShortDate(msg.createdAt))}</span><span class="${ssrRenderClass([statusPillClass(msg), "status-pill"])}" data-v-8ee41bea>${ssrInterpolate(statusLabel(msg))}</span><span class="${ssrRenderClass([msg.source === "email" ? "bg-violet-50 text-violet-700" : msg.source === "outbound" ? "bg-emerald-50 text-emerald-700" : "bg-sky-50 text-sky-700", "status-pill"])}" data-v-8ee41bea>${ssrInterpolate(msg.source === "email" ? "Email" : msg.source === "outbound" ? "Envoyé" : "Site")}</span>`);
          if (msg.attachments?.length) {
            _push(`<span class="status-pill bg-gray-100 text-gray-600" data-v-8ee41bea>${ssrInterpolate(msg.attachments.length)} fichier(s) </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></button></li>`);
        });
        _push(`<!--]--></ul>`);
        if ((unref(payload)?.pages || 1) > 1) {
          _push(`<div class="px-3 py-3 border-t border-gray-100 flex items-center justify-between gap-2" data-v-8ee41bea><button type="button" class="pager-btn"${ssrIncludeBooleanAttr(unref(page) <= 1) ? " disabled" : ""} data-v-8ee41bea>Préc.</button><span class="text-[11px] font-[900] text-gray-500" data-v-8ee41bea>${ssrInterpolate(unref(page))} / ${ssrInterpolate(unref(payload)?.pages)}</span><button type="button" class="pager-btn"${ssrIncludeBooleanAttr(unref(page) >= (unref(payload)?.pages || 1)) ? " disabled" : ""} data-v-8ee41bea>Suiv.</button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</aside>`);
        if (unref(selected)) {
          _push(`<div class="bg-white rounded-[4px] border border-gray-100 shadow-sm" data-v-8ee41bea><div class="px-5 sm:px-6 py-5 border-b border-gray-100" data-v-8ee41bea><div class="flex flex-wrap items-center gap-2 mb-4" data-v-8ee41bea><span class="${ssrRenderClass([statusPillClass(unref(selected)), "status-pill"])}" data-v-8ee41bea>${ssrInterpolate(statusLabel(unref(selected)))}</span><span class="status-pill bg-gray-100 text-gray-600" data-v-8ee41bea>${ssrInterpolate(subjectLabel(unref(selected).subject))}</span><span class="${ssrRenderClass([unref(selected).source === "email" ? "bg-violet-50 text-violet-700" : unref(selected).source === "outbound" ? "bg-emerald-50 text-emerald-700" : "bg-sky-50 text-sky-700", "status-pill"])}" data-v-8ee41bea>${ssrInterpolate(unref(selected).source === "email" ? "Boîte mail" : unref(selected).source === "outbound" ? "Message sortant" : "Formulaire site")}</span><span class="text-gray-400 text-xs font-medium ml-auto" data-v-8ee41bea>${ssrInterpolate(("formatAdminDate" in _ctx ? _ctx.formatAdminDate : unref(formatAdminDate))(unref(selected).createdAt))}</span></div><h2 class="text-xl font-[900] text-[#1a1a1b] mb-1" data-v-8ee41bea>${ssrInterpolate(unref(selected).name)}</h2>`);
          if (unref(selected).company) {
            _push(`<p class="text-gray-500 text-sm font-medium mb-1" data-v-8ee41bea>${ssrInterpolate(unref(selected).company)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<p class="text-brand-700 text-sm font-bold" data-v-8ee41bea><a${ssrRenderAttr("href", `mailto:${unref(selected).email}`)} class="hover:underline" data-v-8ee41bea>${ssrInterpolate(unref(selected).email)}</a>`);
          if (unref(selected).phone) {
            _push(`<span class="text-gray-500 font-medium" data-v-8ee41bea> · ${ssrInterpolate(unref(selected).phone)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</p></div><div class="px-5 sm:px-6 py-5 border-b border-gray-100 bg-gray-50/50" data-v-8ee41bea><p class="text-[10px] font-[900] text-gray-400 uppercase tracking-widest mb-3" data-v-8ee41bea>Message reçu</p><p class="text-gray-700 text-[15px] leading-relaxed font-medium whitespace-pre-wrap" data-v-8ee41bea>${ssrInterpolate(unref(selected).message)}</p>`);
          if (unref(selected).attachments?.length) {
            _push(`<div class="mt-5" data-v-8ee41bea><p class="text-[10px] font-[900] text-gray-400 uppercase tracking-widest mb-2" data-v-8ee41bea>Pièces jointes</p><ul class="space-y-2" data-v-8ee41bea><!--[-->`);
            ssrRenderList(unref(selected).attachments, (file) => {
              _push(`<li class="flex items-center justify-between gap-3 px-3 py-2.5 bg-white border border-gray-200 rounded-[2px]" data-v-8ee41bea><div class="min-w-0" data-v-8ee41bea><p class="text-sm font-[900] text-[#1a1a1b] truncate" data-v-8ee41bea>${ssrInterpolate(file.filename)}</p><p class="text-[10px] text-gray-400 font-medium" data-v-8ee41bea>${ssrInterpolate(formatSize(file.size))}</p></div><a${ssrRenderAttr("href", file.url)} download target="_blank" rel="noopener" class="admin-btn-secondary !py-2" data-v-8ee41bea> Télécharger </a></li>`);
            });
            _push(`<!--]--></ul></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (unref(selected).reply && !unref(replying)) {
            _push(`<div class="${ssrRenderClass([unref(selected).replyStatus === "draft" ? "bg-amber-50/40" : "bg-green-50/30", "px-5 sm:px-6 py-5 border-b border-gray-100"])}" data-v-8ee41bea><div class="flex items-center justify-between gap-4 mb-3" data-v-8ee41bea><p class="${ssrRenderClass([unref(selected).replyStatus === "draft" ? "text-amber-700" : "text-green-700", "text-[10px] font-[900] uppercase tracking-widest"])}" data-v-8ee41bea>${ssrInterpolate(unref(selected).replyStatus === "draft" ? "Brouillon de réponse" : "Réponse envoyée")}</p>`);
            if (unref(selected).repliedAt) {
              _push(`<span class="text-[10px] text-gray-400 font-medium" data-v-8ee41bea>${ssrInterpolate(("formatAdminDate" in _ctx ? _ctx.formatAdminDate : unref(formatAdminDate))(unref(selected).repliedAt))}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div><p class="text-gray-700 text-[15px] leading-relaxed font-medium whitespace-pre-wrap" data-v-8ee41bea>${ssrInterpolate(unref(selected).reply)}</p>`);
            if (unref(selected).replyAttachments?.length) {
              _push(`<ul class="mt-4 space-y-2" data-v-8ee41bea><!--[-->`);
              ssrRenderList(unref(selected).replyAttachments, (file) => {
                _push(`<li class="flex items-center justify-between gap-3 px-3 py-2 bg-white border border-gray-200 rounded-[2px]" data-v-8ee41bea><span class="text-sm font-medium truncate" data-v-8ee41bea>${ssrInterpolate(file.filename)}</span><a${ssrRenderAttr("href", file.url)} download target="_blank" rel="noopener" class="text-[10px] font-[900] uppercase tracking-wider text-brand-700" data-v-8ee41bea> Télécharger </a></li>`);
              });
              _push(`<!--]--></ul>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="px-5 sm:px-6 py-5" data-v-8ee41bea>`);
          if (unref(replySuccess) && !unref(replying)) {
            _push(`<p class="text-brand-700 text-sm font-[900] uppercase tracking-wider mb-4" data-v-8ee41bea>${ssrInterpolate(unref(replySuccessText))}</p>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(replying)) {
            _push(`<div class="space-y-4" data-v-8ee41bea><label class="block text-[10px] font-[900] text-gray-500 uppercase tracking-widest mb-2" data-v-8ee41bea> Rédiger une réponse </label><textarea rows="6" class="reply-textarea" placeholder="Bonjour,

Merci pour votre message..." data-v-8ee41bea>${ssrInterpolate(unref(replyDraft))}</textarea><div data-v-8ee41bea><label class="block text-[10px] font-[900] text-gray-500 uppercase tracking-widest mb-2" data-v-8ee41bea> Joindre des fichiers (max 5 · 12 Mo) </label><input type="file" class="hidden" multiple data-v-8ee41bea><div class="flex flex-wrap gap-2 mb-2" data-v-8ee41bea><button type="button" class="admin-btn-secondary"${ssrIncludeBooleanAttr(unref(uploading) || unref(replyFiles).length >= 5) ? " disabled" : ""} data-v-8ee41bea>${ssrInterpolate(unref(uploading) ? "Upload…" : "Ajouter un fichier")}</button></div>`);
            if (unref(replyFiles).length) {
              _push(`<ul class="space-y-2" data-v-8ee41bea><!--[-->`);
              ssrRenderList(unref(replyFiles), (file) => {
                _push(`<li class="flex items-center justify-between gap-3 px-3 py-2 bg-gray-50 border border-gray-200 rounded-[2px]" data-v-8ee41bea><span class="text-sm font-medium truncate" data-v-8ee41bea>${ssrInterpolate(file.filename)}</span><button type="button" class="text-[10px] font-[900] uppercase tracking-wider text-red-600" data-v-8ee41bea> Retirer </button></li>`);
              });
              _push(`<!--]--></ul>`);
            } else {
              _push(`<!---->`);
            }
            if (unref(uploadError)) {
              _push(`<p class="text-red-600 text-sm font-medium mt-2" data-v-8ee41bea>${ssrInterpolate(unref(uploadError))}</p>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
            if (unref(replyError)) {
              _push(`<p class="text-red-600 text-sm font-medium" data-v-8ee41bea>${ssrInterpolate(unref(replyError))}</p>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<div class="flex flex-wrap gap-2" data-v-8ee41bea><button type="button" class="admin-btn-primary"${ssrIncludeBooleanAttr(unref(actionId) === unref(selected).id || !unref(replyDraft).trim() || unref(uploading)) ? " disabled" : ""} data-v-8ee41bea>${ssrInterpolate(unref(actionId) === unref(selected).id ? "Envoi…" : "Envoyer la réponse")}</button><button type="button" class="admin-btn-secondary"${ssrIncludeBooleanAttr(unref(actionId) === unref(selected).id || !unref(replyDraft).trim() || unref(uploading)) ? " disabled" : ""} data-v-8ee41bea> Enregistrer brouillon </button><button type="button" class="admin-btn-secondary" data-v-8ee41bea>Annuler</button></div></div>`);
          } else {
            _push(`<div class="flex flex-wrap gap-2" data-v-8ee41bea><button type="button" class="admin-btn-primary" data-v-8ee41bea>${ssrInterpolate(unref(selected).reply ? "Modifier / renvoyer" : "Répondre")}</button>`);
            if (!unref(selected).read) {
              _push(`<button type="button" class="admin-btn-secondary"${ssrIncludeBooleanAttr(unref(actionId) === unref(selected).id) ? " disabled" : ""} data-v-8ee41bea> Marquer lu </button>`);
            } else {
              _push(`<button type="button" class="admin-btn-secondary"${ssrIncludeBooleanAttr(unref(actionId) === unref(selected).id) ? " disabled" : ""} data-v-8ee41bea> Marquer non lu </button>`);
            }
            _push(`<button type="button" class="admin-btn-danger"${ssrIncludeBooleanAttr(unref(actionId) === unref(selected).id) ? " disabled" : ""} data-v-8ee41bea> Supprimer </button></div>`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<div class="admin-empty" data-v-8ee41bea><p class="text-gray-500 font-medium" data-v-8ee41bea>Sélectionnez un message pour le lire et y répondre.</p></div>`);
        }
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/messages.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const messages = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8ee41bea"]]);

export { messages as default };
//# sourceMappingURL=messages-DeqJ2tp7.mjs.map
