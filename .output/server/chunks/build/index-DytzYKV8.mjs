import { _ as __nuxt_component_0 } from './nuxt-link-vzZ0EJye.mjs';
import { defineComponent, withAsyncContext, unref, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { g as getMessageStatus, M as MESSAGE_STATUS_LABELS, C as CONTACT_SUBJECTS } from './admin-C5NtE001.mjs';
import { e as emailPreviewText } from './emailPreview-E9S-N7dM.mjs';
import { u as useFetch } from './fetch-BEgLTeJq.mjs';
import { a as useAdminSeo } from './usePageSeo-dIWm1VtT.mjs';
import { _ as _export_sfc } from './server.mjs';
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
import '@vue/shared';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: stats, pending } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/admin/stats", { key: "admin-stats" }, "$BDyEMCVgmz")), __temp = await __temp, __restore(), __temp);
    function subjectLabel(key) {
      return CONTACT_SUBJECTS[key] || key;
    }
    function formatShortDate(iso) {
      return new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
    }
    function statusLabel(msg) {
      return MESSAGE_STATUS_LABELS[getMessageStatus(msg)];
    }
    function statusDot(msg) {
      const s = getMessageStatus(msg);
      if (s === "unread") return "bg-brand-600";
      if (s === "draft") return "bg-amber-500";
      if (s === "sent") return "bg-emerald-500";
      return "bg-gray-300";
    }
    function statusPillClass(msg) {
      const s = getMessageStatus(msg);
      if (s === "unread") return "bg-brand-50 text-brand-800";
      if (s === "draft") return "bg-amber-50 text-amber-800";
      if (s === "sent") return "bg-emerald-50 text-emerald-800";
      return "bg-gray-100 text-gray-600";
    }
    useAdminSeo("Tableau de bord");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-539d57a6><div class="mb-8 sm:mb-10" data-v-539d57a6><h1 class="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight" data-v-539d57a6>Tableau de bord</h1><p class="text-slate-500 text-sm font-medium mt-1.5" data-v-539d57a6>Vue d’ensemble de la messagerie OXYNOVA.</p></div>`);
      if (unref(pending)) {
        _push(`<div class="text-gray-500 font-medium" data-v-539d57a6>Chargement...</div>`);
      } else {
        _push(`<!--[--><div class="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-8" data-v-539d57a6>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin/messages",
          class: "dash-card"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="dash-label" data-v-539d57a6${_scopeId}>Total</span><span class="dash-value" data-v-539d57a6${_scopeId}>${ssrInterpolate(unref(stats)?.total ?? 0)}</span>`);
            } else {
              return [
                createVNode("span", { class: "dash-label" }, "Total"),
                createVNode("span", { class: "dash-value" }, toDisplayString(unref(stats)?.total ?? 0), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin/messages?status=unread",
          class: "dash-card dash-card--accent"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="dash-label" data-v-539d57a6${_scopeId}>Non lus</span><span class="dash-value text-brand-700" data-v-539d57a6${_scopeId}>${ssrInterpolate(unref(stats)?.unread ?? 0)}</span>`);
            } else {
              return [
                createVNode("span", { class: "dash-label" }, "Non lus"),
                createVNode("span", { class: "dash-value text-brand-700" }, toDisplayString(unref(stats)?.unread ?? 0), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin/messages?status=read",
          class: "dash-card"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="dash-label" data-v-539d57a6${_scopeId}>Lus</span><span class="dash-value" data-v-539d57a6${_scopeId}>${ssrInterpolate(unref(stats)?.read ?? 0)}</span>`);
            } else {
              return [
                createVNode("span", { class: "dash-label" }, "Lus"),
                createVNode("span", { class: "dash-value" }, toDisplayString(unref(stats)?.read ?? 0), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin/messages?status=draft",
          class: "dash-card"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="dash-label" data-v-539d57a6${_scopeId}>Brouillons</span><span class="dash-value text-amber-600" data-v-539d57a6${_scopeId}>${ssrInterpolate(unref(stats)?.draft ?? 0)}</span>`);
            } else {
              return [
                createVNode("span", { class: "dash-label" }, "Brouillons"),
                createVNode("span", { class: "dash-value text-amber-600" }, toDisplayString(unref(stats)?.draft ?? 0), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin/messages?status=sent",
          class: "dash-card"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="dash-label" data-v-539d57a6${_scopeId}>Envoyés</span><span class="dash-value text-emerald-600" data-v-539d57a6${_scopeId}>${ssrInterpolate(unref(stats)?.sent ?? 0)}</span>`);
            } else {
              return [
                createVNode("span", { class: "dash-label" }, "Envoyés"),
                createVNode("span", { class: "dash-value text-emerald-600" }, toDisplayString(unref(stats)?.sent ?? 0), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="grid sm:grid-cols-3 gap-3 sm:gap-4 mb-10" data-v-539d57a6><div class="dash-card" data-v-539d57a6><span class="dash-label" data-v-539d57a6>Via le site</span><span class="dash-value text-sky-700" data-v-539d57a6>${ssrInterpolate(unref(stats)?.fromWeb ?? 0)}</span></div><div class="dash-card" data-v-539d57a6><span class="dash-label" data-v-539d57a6>Via boîte mail</span><span class="dash-value text-violet-700" data-v-539d57a6>${ssrInterpolate(unref(stats)?.fromEmail ?? 0)}</span></div><div class="dash-card" data-v-539d57a6><span class="dash-label" data-v-539d57a6>Messages sortants</span><span class="dash-value text-emerald-700" data-v-539d57a6>${ssrInterpolate(unref(stats)?.outbound ?? 0)}</span></div></div><div class="bg-white rounded-[4px] border border-gray-100 shadow-sm overflow-hidden" data-v-539d57a6><div class="px-5 sm:px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-4" data-v-539d57a6><div data-v-539d57a6><h2 class="text-[15px] font-[900] uppercase tracking-tight" data-v-539d57a6>Messages récents</h2><p class="text-xs text-gray-400 font-medium mt-0.5" data-v-539d57a6>Les plus récents en premier</p></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin/messages",
          class: "text-[11px] font-[900] uppercase tracking-wider text-brand-700 hover:underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Tout voir `);
            } else {
              return [
                createTextVNode(" Tout voir ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        if (!unref(stats)?.recent?.length) {
          _push(`<div class="px-6 py-12 text-center text-gray-400 font-medium text-sm" data-v-539d57a6> Aucun message pour le moment. </div>`);
        } else {
          _push(`<ul class="divide-y divide-gray-50" data-v-539d57a6><!--[-->`);
          ssrRenderList(unref(stats).recent, (msg) => {
            _push(`<li data-v-539d57a6>`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: `/admin/messages?id=${msg.id}`,
              class: "flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-4 px-4 sm:px-6 py-4 hover:bg-brand-50/40 transition-colors"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="flex items-start gap-3 min-w-0 flex-1" data-v-539d57a6${_scopeId}><span class="${ssrRenderClass([statusDot(msg), "mt-1.5 w-2 h-2 rounded-full flex-shrink-0"])}" data-v-539d57a6${_scopeId}></span><div class="min-w-0 flex-1" data-v-539d57a6${_scopeId}><div class="flex items-center gap-2 flex-wrap mb-0.5" data-v-539d57a6${_scopeId}><span class="${ssrRenderClass([!msg.read ? "text-brand-900" : "text-[#1a1a1b]", "font-[900] text-sm truncate"])}" data-v-539d57a6${_scopeId}>${ssrInterpolate(msg.name)}</span><span class="${ssrRenderClass([statusPillClass(msg), "status-pill"])}" data-v-539d57a6${_scopeId}>${ssrInterpolate(statusLabel(msg))}</span></div><p class="text-xs text-gray-500 font-medium truncate" data-v-539d57a6${_scopeId}>${ssrInterpolate(subjectLabel(msg.subject))}</p><p class="text-xs text-gray-400 line-clamp-2 sm:line-clamp-1 mt-1" data-v-539d57a6${_scopeId}>${ssrInterpolate(unref(emailPreviewText)(msg.message))}</p></div></div><span class="text-[10px] text-gray-400 font-medium whitespace-nowrap pl-5 sm:pl-0 sm:pt-0.5" data-v-539d57a6${_scopeId}>${ssrInterpolate(formatShortDate(msg.createdAt))}</span>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-start gap-3 min-w-0 flex-1" }, [
                      createVNode("span", {
                        class: ["mt-1.5 w-2 h-2 rounded-full flex-shrink-0", statusDot(msg)]
                      }, null, 2),
                      createVNode("div", { class: "min-w-0 flex-1" }, [
                        createVNode("div", { class: "flex items-center gap-2 flex-wrap mb-0.5" }, [
                          createVNode("span", {
                            class: ["font-[900] text-sm truncate", !msg.read ? "text-brand-900" : "text-[#1a1a1b]"]
                          }, toDisplayString(msg.name), 3),
                          createVNode("span", {
                            class: ["status-pill", statusPillClass(msg)]
                          }, toDisplayString(statusLabel(msg)), 3)
                        ]),
                        createVNode("p", { class: "text-xs text-gray-500 font-medium truncate" }, toDisplayString(subjectLabel(msg.subject)), 1),
                        createVNode("p", { class: "text-xs text-gray-400 line-clamp-2 sm:line-clamp-1 mt-1" }, toDisplayString(unref(emailPreviewText)(msg.message)), 1)
                      ])
                    ]),
                    createVNode("span", { class: "text-[10px] text-gray-400 font-medium whitespace-nowrap pl-5 sm:pl-0 sm:pt-0.5" }, toDisplayString(formatShortDate(msg.createdAt)), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</li>`);
          });
          _push(`<!--]--></ul>`);
        }
        _push(`</div><!--]-->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-539d57a6"]]);

export { index as default };
//# sourceMappingURL=index-DytzYKV8.mjs.map
