import { defineComponent, computed, withAsyncContext, ref, reactive, watch, mergeProps, unref, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { f as formatAdminDate } from './useAdmin-dDaeL6H7.mjs';
import { M as MESSAGE_STATUS_LABELS, g as getMessageStatus, C as CONTACT_SUBJECTS } from './admin-C5NtE001.mjs';
import { e as emailPreviewText, l as looksLikeHtml, s as stripHtml } from './emailPreview-E9S-N7dM.mjs';
import { j as useRoute, a as useRouter } from './server.mjs';
import { u as useFetch } from './fetch-BwSn-eTT.mjs';
import { u as useState } from './state-_I5XcLqc.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MailRichEditor",
  __ssrInlineRender: true,
  props: {
    modelValue: { default: "" },
    placeholder: { default: "Écrire le message…" },
    minHeight: { default: "160px" }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const editorEl = ref(null);
    const active = reactive({
      bold: false,
      italic: false,
      underline: false
    });
    function isActive(key) {
      return active[key];
    }
    function setContent(html) {
      if (!editorEl.value) return;
      const next = html || "";
      if (editorEl.value.innerHTML !== next) {
        editorEl.value.innerHTML = next;
      }
    }
    watch(() => props.modelValue, (v) => {
      if (!editorEl.value) return;
      if ((void 0).activeElement === editorEl.value) return;
      setContent(v || "");
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _cssVars = { style: {
        ":--b8002984": __props.minHeight
      } };
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "rte" }, _attrs, _cssVars))} data-v-a23d2ff5><div class="rte-toolbar" role="toolbar" aria-label="Mise en forme" data-v-a23d2ff5><button type="button" title="Gras" class="${ssrRenderClass([{ "rte-btn--on": isActive("bold") }, "rte-btn"])}" data-v-a23d2ff5><span class="font-bold" data-v-a23d2ff5>G</span></button><button type="button" title="Italique" class="${ssrRenderClass([{ "rte-btn--on": isActive("italic") }, "rte-btn"])}" data-v-a23d2ff5><span class="italic" data-v-a23d2ff5>I</span></button><button type="button" title="Souligné" class="${ssrRenderClass([{ "rte-btn--on": isActive("underline") }, "rte-btn"])}" data-v-a23d2ff5><span class="underline" data-v-a23d2ff5>S</span></button><span class="rte-sep" data-v-a23d2ff5></span><button type="button" class="rte-btn" title="Petite taille" data-v-a23d2ff5>A−</button><button type="button" class="rte-btn" title="Taille normale" data-v-a23d2ff5>A</button><button type="button" class="rte-btn" title="Grande taille" data-v-a23d2ff5>A+</button><span class="rte-sep" data-v-a23d2ff5></span><button type="button" class="rte-btn" title="Liste à puces" data-v-a23d2ff5>••</button><button type="button" class="rte-btn" title="Liste numérotée" data-v-a23d2ff5>1.</button><span class="rte-sep" data-v-a23d2ff5></span><button type="button" class="rte-btn" title="Insérer un lien" data-v-a23d2ff5> Lien </button><button type="button" class="rte-btn" title="Supprimer le lien" data-v-a23d2ff5> −Lien </button><span class="rte-sep" data-v-a23d2ff5></span><button type="button" class="rte-btn" title="Effacer la mise en forme" data-v-a23d2ff5> ⌫ </button></div><div class="rte-body" contenteditable="true" role="textbox" aria-multiline="true"${ssrRenderAttr("data-placeholder", __props.placeholder)} data-v-a23d2ff5></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/MailRichEditor.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-a23d2ff5"]]), { __name: "AdminMailRichEditor" });
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
        limit: 20
      })),
      watch: [status, page]
    }, "$NexCL9IJ16")), __temp = await __temp, __restore(), __temp);
    const messages2 = computed(() => payload.value?.items || []);
    const selectedId = ref(null);
    const mobileReading = ref(false);
    const foldersCollapsed = useState("mail-folders-collapsed", () => false);
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
        mobileReading.value = true;
        return;
      }
      if (list.length && !list.some((m) => m.id === selectedId.value)) {
        selectedId.value = list[0].id;
      }
      if (!list.length) {
        selectedId.value = null;
        mobileReading.value = false;
      }
    }, { immediate: true });
    function folderLabel(key) {
      const map = {
        all: "Boîte de réception",
        unread: "Non lus",
        read: "Lus",
        draft: "Brouillons",
        sent: "Envoyés"
      };
      return map[key] || MESSAGE_STATUS_LABELS[key];
    }
    function folderIcon(key) {
      const icons = {
        all: '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
        unread: '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>',
        read: '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
        draft: '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>',
        sent: '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>'
      };
      return icons[key];
    }
    function subjectLabel(key) {
      return CONTACT_SUBJECTS[key] || key;
    }
    function initials(name) {
      const parts = name.trim().split(/\s+/).filter(Boolean);
      if (!parts.length) return "?";
      if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    function avatarColor(seed) {
      const palette = ["#1e3a5f", "#174794", "#0e7490", "#334155", "#475569", "#1d4ed8", "#0f766e"];
      let hash = 0;
      for (let i = 0; i < seed.length; i++) hash = seed.charCodeAt(i) + ((hash << 5) - hash);
      return palette[Math.abs(hash) % palette.length];
    }
    function formatMailDate(iso) {
      const d = new Date(iso);
      const now = /* @__PURE__ */ new Date();
      const sameDay = d.toDateString() === now.toDateString();
      if (sameDay) {
        return d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
      }
      return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });
    }
    function formatSize(bytes) {
      if (bytes < 1024) return `${bytes} o`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
      return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
    }
    function htmlWithNewTabLinks(html) {
      return (html || "").replace(/<a\b([^>]*)>/gi, (_full, attrs) => {
        let next = String(attrs || "");
        if (!/\btarget\s*=/i.test(next)) {
          next += ' target="_blank"';
        } else {
          next = next.replace(/\btarget\s*=\s*(['"]).*?\1/gi, 'target="_blank"');
          next = next.replace(/\btarget\s*=\s*[^\s>]+/gi, 'target="_blank"');
        }
        if (!/\brel\s*=/i.test(next)) {
          next += ' rel="noopener noreferrer"';
        }
        return `<a${next}>`;
      });
    }
    function htmlFrameDoc(html) {
      const origin = "";
      const body = htmlWithNewTabLinks(html);
      return `<!DOCTYPE html><html><head><meta charset="utf-8"><base href="${origin}/" target="_blank" rel="noopener noreferrer"><style>
    html,body{margin:0;padding:0;background:#fff;color:#1e293b;font:14px/1.55 Arial,Helvetica,sans-serif}
    img{max-width:100%;height:auto}
    a{color:#174794}
    table{max-width:100%}
  </style></head><body>${body}</body></html>`;
    }
    function isEmptyHtml(html) {
      return !stripHtml(html || "");
    }
    useAdminSeo("Messages");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminMailRichEditor = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mail-app h-full flex flex-col bg-[#fafbfc] text-slate-800 overflow-hidden" }, _attrs))} data-v-48d6a21b>`);
      if (unref(composing)) {
        _push(`<div class="fixed inset-0 z-[80] bg-slate-900/40 flex items-end sm:items-center justify-center p-0 sm:p-6" data-v-48d6a21b><div class="bg-white w-full sm:max-w-2xl sm:rounded-md shadow-xl max-h-[min(92vh,100dvh)] overflow-y-auto border border-slate-200 rounded-t-2xl sm:rounded-md pb-[env(safe-area-inset-bottom)]" data-v-48d6a21b><div class="px-4 sm:px-5 py-3.5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10" data-v-48d6a21b><h2 class="text-[15px] font-semibold tracking-tight text-slate-900" data-v-48d6a21b>Nouveau message</h2><button type="button" class="mail-icon-btn" aria-label="Fermer" data-v-48d6a21b><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" data-v-48d6a21b><path d="M6 18L18 6M6 6l12 12" data-v-48d6a21b></path></svg></button></div><form class="px-4 sm:px-5 py-4 space-y-3" data-v-48d6a21b><div class="mail-field" data-v-48d6a21b><span data-v-48d6a21b>À</span><input${ssrRenderAttr("value", unref(compose).to)} type="email" required placeholder="destinataire@email.com" autocomplete="email" data-v-48d6a21b></div><div class="mail-field" data-v-48d6a21b><span data-v-48d6a21b>Nom</span><input${ssrRenderAttr("value", unref(compose).toName)} type="text" placeholder="Optionnel" data-v-48d6a21b></div><div class="mail-field" data-v-48d6a21b><span data-v-48d6a21b>Objet</span><input${ssrRenderAttr("value", unref(compose).subject)} type="text" required placeholder="Objet du message" data-v-48d6a21b></div><div class="rounded-md border border-slate-200 overflow-hidden" data-v-48d6a21b>`);
        _push(ssrRenderComponent(_component_AdminMailRichEditor, {
          modelValue: unref(compose).message,
          "onUpdate:modelValue": ($event) => unref(compose).message = $event,
          placeholder: "Écrire le message…",
          "min-height": "180px"
        }, null, _parent));
        _push(`</div><div class="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200" data-v-48d6a21b><input type="file" class="hidden" multiple data-v-48d6a21b><button type="submit" class="mail-btn-primary"${ssrIncludeBooleanAttr(unref(composeSending) || unref(composeUploading) || isEmptyHtml(unref(compose).message)) ? " disabled" : ""} data-v-48d6a21b>${ssrInterpolate(unref(composeSending) ? "Envoi…" : "Envoyer")}</button><button type="button" class="mail-btn-ghost"${ssrIncludeBooleanAttr(unref(composeSending) || isEmptyHtml(unref(compose).message)) ? " disabled" : ""} data-v-48d6a21b> Brouillon </button><button type="button" class="mail-icon-btn"${ssrIncludeBooleanAttr(unref(composeUploading) || unref(composeFiles).length >= 5) ? " disabled" : ""} title="Joindre" data-v-48d6a21b><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" data-v-48d6a21b><path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" data-v-48d6a21b></path></svg></button>`);
        if (unref(composeFiles).length) {
          _push(`<ul class="flex flex-wrap gap-2 w-full mt-1" data-v-48d6a21b><!--[-->`);
          ssrRenderList(unref(composeFiles), (file) => {
            _push(`<li class="mail-chip" data-v-48d6a21b>${ssrInterpolate(file.filename)} <button type="button" data-v-48d6a21b>×</button></li>`);
          });
          _push(`<!--]--></ul>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(composeError) || unref(composeUploadError)) {
          _push(`<p class="w-full text-red-600 text-sm" data-v-48d6a21b>${ssrInterpolate(unref(composeError) || unref(composeUploadError))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<header class="mail-toolbar flex-shrink-0" data-v-48d6a21b><div class="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1" data-v-48d6a21b><button type="button" class="${ssrRenderClass([{ "mail-btn-ghost--active": !unref(foldersCollapsed) }, "mail-btn-ghost hidden md:inline-flex"])}"${ssrRenderAttr("aria-pressed", !unref(foldersCollapsed))}${ssrRenderAttr("title", unref(foldersCollapsed) ? "Afficher les dossiers" : "Masquer les dossiers")} data-v-48d6a21b><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" data-v-48d6a21b><path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" data-v-48d6a21b></path></svg><span class="hidden lg:inline" data-v-48d6a21b>Dossiers</span></button><button type="button" class="mail-btn-primary" data-v-48d6a21b><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-48d6a21b><path d="M12 4v16m8-8H4" data-v-48d6a21b></path></svg><span class="sm:hidden" data-v-48d6a21b>Écrire</span><span class="hidden sm:inline" data-v-48d6a21b>Nouveau</span></button><div class="flex items-center gap-0.5" data-v-48d6a21b><button type="button" class="mail-icon-btn" title="Actualiser"${ssrIncludeBooleanAttr(unref(pending) || unref(syncing)) ? " disabled" : ""} data-v-48d6a21b><svg class="${ssrRenderClass([{ "animate-spin": unref(pending) || unref(syncing) }, "w-5 h-5"])}" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" data-v-48d6a21b><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-v-48d6a21b></path></svg></button><button type="button" class="mail-icon-btn" title="Forcer la sync Hostinger"${ssrIncludeBooleanAttr(unref(syncing)) ? " disabled" : ""} data-v-48d6a21b><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" data-v-48d6a21b><path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" data-v-48d6a21b></path></svg></button></div>`);
      if (unref(syncInfo)) {
        _push(`<p class="${ssrRenderClass([unref(syncInfo).error ? "text-red-600" : "text-brand-700", "hidden lg:block text-xs font-medium truncate min-w-0"])}" data-v-48d6a21b>${ssrInterpolate(unref(syncInfo).text)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="text-[11px] sm:text-xs text-slate-500 font-medium tabular-nums flex-shrink-0" data-v-48d6a21b>${ssrInterpolate(unref(payload)?.total ?? 0)} <span class="hidden sm:inline" data-v-48d6a21b> msg</span></div></header><div class="flex-1 min-h-0 flex flex-col md:flex-row relative" data-v-48d6a21b><nav class="mail-folders hidden md:flex flex-col flex-shrink-0 w-[200px] lg:w-[220px]" style="${ssrRenderStyle(!unref(foldersCollapsed) && !unref(mobileReading) ? null : { display: "none" })}" data-v-48d6a21b><div class="flex items-center justify-between gap-2 px-3 pt-3 pb-2" data-v-48d6a21b><p class="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 px-1" data-v-48d6a21b> Dossiers </p><button type="button" class="mail-btn-ghost !px-2 !py-1 text-[11px]" title="Masquer les dossiers" data-v-48d6a21b> Masquer </button></div><!--[-->`);
      ssrRenderList(statusKeys, (key) => {
        _push(`<button type="button" class="${ssrRenderClass([{ "mail-folder--active": unref(status) === key }, "mail-folder"])}" data-v-48d6a21b><span class="mail-folder__icon" data-v-48d6a21b>${folderIcon(key) ?? ""}</span><span class="truncate" data-v-48d6a21b>${ssrInterpolate(folderLabel(key))}</span><span class="mail-folder__count" data-v-48d6a21b>${ssrInterpolate(unref(payload)?.counts?.[key] ?? 0)}</span></button>`);
      });
      _push(`<!--]--></nav>`);
      if (!unref(mobileReading)) {
        _push(`<div class="md:hidden flex-shrink-0 bg-white border-b border-slate-200 px-2 py-2 flex gap-1.5 overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch] scrollbar-none" data-v-48d6a21b><!--[-->`);
        ssrRenderList(statusKeys, (key) => {
          _push(`<button type="button" class="${ssrRenderClass([{ "mail-chip-filter--active": unref(status) === key }, "mail-chip-filter"])}" data-v-48d6a21b>${ssrInterpolate(unref(MESSAGE_STATUS_LABELS)[key])} <span data-v-48d6a21b>${ssrInterpolate(unref(payload)?.counts?.[key] ?? 0)}</span></button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex-1 min-h-0 flex min-w-0" data-v-48d6a21b><section class="${ssrRenderClass([unref(mobileReading) ? "hidden" : "flex flex-1 w-full", "mail-list flex flex-col min-w-0 md:border-r border-slate-200 bg-white"])}" data-v-48d6a21b><div class="hidden md:flex items-center justify-between px-4 py-2.5 border-b border-slate-200 bg-white" data-v-48d6a21b><p class="text-[12px] font-semibold text-slate-600" data-v-48d6a21b>${ssrInterpolate(folderLabel(unref(status)))}</p><p class="text-[11px] text-slate-400" data-v-48d6a21b>${ssrInterpolate(unref(payload)?.page)}/${ssrInterpolate(unref(payload)?.pages || 1)}</p></div>`);
      if (unref(pending) && !unref(messages2).length) {
        _push(`<div class="flex-1 flex items-center justify-center text-sm text-slate-400" data-v-48d6a21b> Chargement… </div>`);
      } else if (!unref(messages2).length) {
        _push(`<div class="flex-1 flex flex-col items-center justify-center px-6 text-center" data-v-48d6a21b><p class="text-sm font-medium text-slate-600" data-v-48d6a21b>Aucun message</p><p class="text-xs text-slate-400 mt-1" data-v-48d6a21b>Cette boîte est vide pour ce dossier.</p></div>`);
      } else {
        _push(`<ul class="flex-1 overflow-y-auto overscroll-contain divide-y divide-slate-100" data-v-48d6a21b><!--[-->`);
        ssrRenderList(unref(messages2), (msg) => {
          _push(`<li data-v-48d6a21b><button type="button" class="${ssrRenderClass([{
            "mail-row--active": unref(selectedId) === msg.id,
            "mail-row--unread": !msg.read && msg.source !== "outbound"
          }, "mail-row"])}" data-v-48d6a21b>`);
          if (!msg.read && msg.source !== "outbound") {
            _push(`<span class="mail-unread-dot" aria-hidden="true" data-v-48d6a21b></span>`);
          } else {
            _push(`<span class="mail-unread-dot mail-unread-dot--read" aria-hidden="true" data-v-48d6a21b></span>`);
          }
          _push(`<div class="mail-avatar" style="${ssrRenderStyle({ background: avatarColor(msg.email || msg.name) })}" data-v-48d6a21b>${ssrInterpolate(initials(msg.name))}</div><div class="min-w-0 flex-1" data-v-48d6a21b><div class="flex items-baseline gap-2" data-v-48d6a21b><span class="mail-row__from truncate" data-v-48d6a21b>${ssrInterpolate(msg.name)}</span><span class="mail-row__date ml-auto flex-shrink-0" data-v-48d6a21b>${ssrInterpolate(formatMailDate(msg.createdAt))}</span></div><p class="mail-row__subject truncate" data-v-48d6a21b>${ssrInterpolate(subjectLabel(msg.subject))}</p><p class="mail-row__preview truncate" data-v-48d6a21b>${ssrInterpolate(unref(emailPreviewText)(msg.message))}</p>`);
          if (msg.attachments?.length || unref(getMessageStatus)(msg) === "draft") {
            _push(`<div class="flex items-center gap-1.5 mt-1" data-v-48d6a21b>`);
            if (msg.attachments?.length) {
              _push(`<span class="text-slate-400" title="Pièce jointe" data-v-48d6a21b><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-48d6a21b><path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" data-v-48d6a21b></path></svg></span>`);
            } else {
              _push(`<!---->`);
            }
            if (unref(getMessageStatus)(msg) === "draft") {
              _push(`<span class="text-[10px] font-medium text-slate-400 uppercase tracking-wide" data-v-48d6a21b>Brouillon</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></button></li>`);
        });
        _push(`<!--]--></ul>`);
      }
      if ((unref(payload)?.pages || 1) > 1) {
        _push(`<div class="flex items-center justify-between gap-2 px-3 py-2 border-t border-slate-200 bg-white pb-[max(0.5rem,env(safe-area-inset-bottom))] md:pb-2" data-v-48d6a21b><button type="button" class="mail-btn-ghost !px-2 !py-1"${ssrIncludeBooleanAttr(unref(page) <= 1) ? " disabled" : ""} data-v-48d6a21b>←</button><span class="text-[11px] text-slate-500" data-v-48d6a21b>${ssrInterpolate(unref(page))} / ${ssrInterpolate(unref(payload)?.pages)}</span><button type="button" class="mail-btn-ghost !px-2 !py-1"${ssrIncludeBooleanAttr(unref(page) >= (unref(payload)?.pages || 1)) ? " disabled" : ""} data-v-48d6a21b>→</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section><section class="${ssrRenderClass([unref(mobileReading) ? "flex flex-1 w-full" : "hidden", "mail-reading min-w-0 flex-col bg-[#fafbfc]"])}" data-v-48d6a21b>`);
      if (unref(selected)) {
        _push(`<!--[--><div class="flex-shrink-0 bg-white border-b border-slate-200 px-3 sm:px-6 py-3" data-v-48d6a21b><div class="flex items-start gap-2 sm:gap-3 mb-3" data-v-48d6a21b><button type="button" class="mail-icon-btn -ml-1 mt-0.5 flex-shrink-0" aria-label="Retour à la liste" title="Retour" data-v-48d6a21b><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" data-v-48d6a21b><path d="M15 19l-7-7 7-7" data-v-48d6a21b></path></svg></button><h2 class="text-base sm:text-xl font-semibold tracking-tight leading-snug flex-1 min-w-0 text-slate-900 break-words" data-v-48d6a21b>${ssrInterpolate(subjectLabel(unref(selected).subject))}</h2><div class="flex items-center gap-0.5 flex-shrink-0" data-v-48d6a21b>`);
        if (!unref(selected).read) {
          _push(`<button type="button" class="mail-icon-btn" title="Marquer lu"${ssrIncludeBooleanAttr(unref(actionId) === unref(selected).id) ? " disabled" : ""} data-v-48d6a21b><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" data-v-48d6a21b><path d="M3 19V5a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" data-v-48d6a21b></path><path d="M13 3v6h6" data-v-48d6a21b></path></svg></button>`);
        } else {
          _push(`<button type="button" class="mail-icon-btn" title="Marquer non lu"${ssrIncludeBooleanAttr(unref(actionId) === unref(selected).id) ? " disabled" : ""} data-v-48d6a21b><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" data-v-48d6a21b><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-48d6a21b></path></svg></button>`);
        }
        _push(`<button type="button" class="mail-icon-btn text-red-600 hover:bg-red-50" title="Supprimer"${ssrIncludeBooleanAttr(unref(actionId) === unref(selected).id) ? " disabled" : ""} data-v-48d6a21b><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" data-v-48d6a21b><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-48d6a21b></path></svg></button></div></div><div class="flex items-start gap-3" data-v-48d6a21b><div class="mail-avatar mail-avatar--lg hidden sm:flex" style="${ssrRenderStyle({ background: avatarColor(unref(selected).email || unref(selected).name) })}" data-v-48d6a21b>${ssrInterpolate(initials(unref(selected).name))}</div><div class="min-w-0 flex-1 text-sm" data-v-48d6a21b><div class="flex flex-col sm:flex-row sm:flex-wrap sm:items-baseline gap-x-2 gap-y-0.5" data-v-48d6a21b><span class="font-semibold text-slate-900" data-v-48d6a21b>${ssrInterpolate(unref(selected).name)}</span><a${ssrRenderAttr("href", `mailto:${unref(selected).email}`)} class="text-slate-500 hover:text-brand-700 break-all text-[13px]" data-v-48d6a21b>&lt;${ssrInterpolate(unref(selected).email)}&gt;</a><span class="text-xs text-slate-400 sm:ml-auto" data-v-48d6a21b>${ssrInterpolate(("formatAdminDate" in _ctx ? _ctx.formatAdminDate : unref(formatAdminDate))(unref(selected).createdAt))}</span></div>`);
        if (unref(selected).company || unref(selected).phone) {
          _push(`<p class="text-xs text-slate-500 mt-0.5" data-v-48d6a21b>`);
          if (unref(selected).company) {
            _push(`<span data-v-48d6a21b>${ssrInterpolate(unref(selected).company)}</span>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(selected).company && unref(selected).phone) {
            _push(`<span data-v-48d6a21b> · </span>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(selected).phone) {
            _push(`<span data-v-48d6a21b>${ssrInterpolate(unref(selected).phone)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<p class="text-xs text-slate-400 mt-1" data-v-48d6a21b>${ssrInterpolate(unref(selected).source === "outbound" ? "À" : "De")} · ${ssrInterpolate(unref(selected).source === "email" ? "Boîte Hostinger" : unref(selected).source === "outbound" ? "Message sortant" : "Formulaire du site")}</p></div></div></div><div class="flex-1 overflow-y-auto overscroll-contain px-3 sm:px-6 py-4 sm:py-5" data-v-48d6a21b><article class="mail-body max-w-3xl mx-auto" data-v-48d6a21b><div class="mail-body-card" data-v-48d6a21b>`);
        if (unref(selected).messageHtml) {
          _push(`<iframe class="mail-html-frame" title="Contenu du message" sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"${ssrRenderAttr("srcdoc", htmlFrameDoc(unref(selected).messageHtml))} data-v-48d6a21b></iframe>`);
        } else if (unref(looksLikeHtml)(unref(selected).message)) {
          _push(`<div class="mail-html-content text-[15px] leading-relaxed text-slate-800 break-words" data-v-48d6a21b>${htmlWithNewTabLinks(unref(selected).message) ?? ""}</div>`);
        } else {
          _push(`<p class="whitespace-pre-wrap text-[15px] leading-relaxed text-slate-800 break-words" data-v-48d6a21b>${ssrInterpolate(unref(selected).message)}</p>`);
        }
        if (unref(selected).attachments?.length) {
          _push(`<div class="mt-6 pt-5 border-t border-slate-200" data-v-48d6a21b><p class="text-xs font-semibold text-slate-500 mb-3" data-v-48d6a21b>${ssrInterpolate(unref(selected).attachments.length)} pièce(s) jointe(s) </p><ul class="grid sm:grid-cols-2 gap-2" data-v-48d6a21b><!--[-->`);
          ssrRenderList(unref(selected).attachments, (file) => {
            _push(`<li data-v-48d6a21b><a${ssrRenderAttr("href", file.url)} download target="_blank" rel="noopener" class="mail-attach" data-v-48d6a21b><span class="mail-attach__icon" data-v-48d6a21b><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" data-v-48d6a21b><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-48d6a21b></path></svg></span><span class="min-w-0" data-v-48d6a21b><span class="block text-sm font-medium truncate text-slate-800" data-v-48d6a21b>${ssrInterpolate(file.filename)}</span><span class="block text-[11px] text-slate-400" data-v-48d6a21b>${ssrInterpolate(formatSize(file.size))}</span></span></a></li>`);
          });
          _push(`<!--]--></ul></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(selected).reply && !unref(replying) && unref(selected).source !== "outbound") {
          _push(`<div class="mt-6 pt-5 border-t border-slate-200" data-v-48d6a21b><div class="flex items-center justify-between gap-3 mb-2" data-v-48d6a21b><p class="text-xs font-semibold text-slate-600" data-v-48d6a21b>${ssrInterpolate(unref(selected).replyStatus === "draft" ? "Brouillon de réponse" : "Vous avez répondu")}</p>`);
          if (unref(selected).repliedAt) {
            _push(`<span class="text-[11px] text-slate-400" data-v-48d6a21b>${ssrInterpolate(("formatAdminDate" in _ctx ? _ctx.formatAdminDate : unref(formatAdminDate))(unref(selected).repliedAt))}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (unref(looksLikeHtml)(unref(selected).reply)) {
            _push(`<div class="mail-html-content text-[14px] leading-relaxed text-slate-700 break-words" data-v-48d6a21b>${htmlWithNewTabLinks(unref(selected).reply) ?? ""}</div>`);
          } else {
            _push(`<p class="whitespace-pre-wrap text-[14px] leading-relaxed text-slate-700 break-words" data-v-48d6a21b>${ssrInterpolate(unref(selected).reply)}</p>`);
          }
          if (unref(selected).replyAttachments?.length) {
            _push(`<ul class="mt-3 space-y-1" data-v-48d6a21b><!--[-->`);
            ssrRenderList(unref(selected).replyAttachments, (file) => {
              _push(`<li data-v-48d6a21b><a${ssrRenderAttr("href", file.url)} class="text-xs font-medium text-brand-700 hover:underline" download target="_blank" rel="noopener" data-v-48d6a21b>${ssrInterpolate(file.filename)}</a></li>`);
            });
            _push(`<!--]--></ul>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(replySuccess) && !unref(replying)) {
          _push(`<p class="mt-4 text-sm font-medium text-brand-700" data-v-48d6a21b>${ssrInterpolate(unref(replySuccessText))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></article></div><div class="flex-shrink-0 border-t border-slate-200 bg-white px-3 sm:px-6 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]" data-v-48d6a21b>`);
        if (unref(replying) && unref(selected).source !== "outbound") {
          _push(`<div class="max-w-3xl mx-auto space-y-3" data-v-48d6a21b><div class="rounded-md border border-slate-200 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/10 overflow-hidden bg-white" data-v-48d6a21b><div class="px-3 py-2 border-b border-slate-100 text-xs text-slate-500 bg-slate-50" data-v-48d6a21b> Répondre à <span class="font-semibold text-slate-700" data-v-48d6a21b>${ssrInterpolate(unref(selected).name)}</span></div>`);
          _push(ssrRenderComponent(_component_AdminMailRichEditor, {
            modelValue: unref(replyDraft),
            "onUpdate:modelValue": ($event) => isRef(replyDraft) ? replyDraft.value = $event : null,
            placeholder: "Écrire une réponse…",
            "min-height": "120px"
          }, null, _parent));
          _push(`<div class="px-3 py-2 border-t border-slate-100 flex flex-wrap items-center gap-2 bg-slate-50" data-v-48d6a21b><input type="file" class="hidden" multiple data-v-48d6a21b><button type="button" class="mail-btn-primary"${ssrIncludeBooleanAttr(unref(actionId) === unref(selected).id || isEmptyHtml(unref(replyDraft)) || unref(uploading)) ? " disabled" : ""} data-v-48d6a21b>${ssrInterpolate(unref(actionId) === unref(selected).id ? "Envoi…" : "Envoyer")}</button><button type="button" class="mail-btn-ghost"${ssrIncludeBooleanAttr(unref(actionId) === unref(selected).id || isEmptyHtml(unref(replyDraft))) ? " disabled" : ""} data-v-48d6a21b> Brouillon </button><button type="button" class="mail-icon-btn"${ssrIncludeBooleanAttr(unref(uploading) || unref(replyFiles).length >= 5) ? " disabled" : ""} title="Joindre" data-v-48d6a21b><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" data-v-48d6a21b><path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" data-v-48d6a21b></path></svg></button><button type="button" class="mail-btn-ghost sm:ml-auto" data-v-48d6a21b>Annuler</button></div></div>`);
          if (unref(replyFiles).length) {
            _push(`<ul class="flex flex-wrap gap-2" data-v-48d6a21b><!--[-->`);
            ssrRenderList(unref(replyFiles), (file) => {
              _push(`<li class="mail-chip" data-v-48d6a21b>${ssrInterpolate(file.filename)} <button type="button" data-v-48d6a21b>×</button></li>`);
            });
            _push(`<!--]--></ul>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(replyError) || unref(uploadError)) {
            _push(`<p class="text-red-600 text-sm" data-v-48d6a21b>${ssrInterpolate(unref(replyError) || unref(uploadError))}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else if (unref(selected).source === "outbound") {
          _push(`<div class="max-w-3xl mx-auto flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-3" data-v-48d6a21b><p class="text-sm text-slate-500" data-v-48d6a21b>${ssrInterpolate(unref(selected).replyStatus === "draft" ? "Brouillon enregistré" : "Message envoyé")} `);
          if (unref(selected).repliedAt || unref(selected).createdAt) {
            _push(`<span class="text-slate-400" data-v-48d6a21b> · ${ssrInterpolate(("formatAdminDate" in _ctx ? _ctx.formatAdminDate : unref(formatAdminDate))(unref(selected).repliedAt || unref(selected).createdAt))}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</p><button type="button" class="mail-btn-ghost sm:ml-auto w-full sm:w-auto justify-center" data-v-48d6a21b> Écrire un autre message </button></div>`);
        } else {
          _push(`<div class="max-w-3xl mx-auto" data-v-48d6a21b><button type="button" class="mail-reply-trigger" data-v-48d6a21b><span class="text-sm text-slate-500 truncate" data-v-48d6a21b>Cliquer pour répondre à ${ssrInterpolate(unref(selected).name.split(" ")[0])}…</span></button></div>`);
        }
        _push(`</div><!--]-->`);
      } else {
        _push(`<div class="flex-1 flex flex-col items-center justify-center text-center px-6" data-v-48d6a21b><p class="text-sm font-medium text-slate-600" data-v-48d6a21b>Message introuvable</p><button type="button" class="mail-btn-ghost mt-3" data-v-48d6a21b>Retour à la liste</button></div>`);
      }
      _push(`</section></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/messages.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const messages = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-48d6a21b"]]);

export { messages as default };
//# sourceMappingURL=messages-Nb2j481P.mjs.map
