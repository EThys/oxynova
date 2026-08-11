import { _ as __nuxt_component_0 } from './nuxt-link-vzZ0EJye.mjs';
import { defineComponent, ref, withAsyncContext, computed, watch, mergeProps, unref, withCtx, openBlock, createBlock, createVNode, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc, l as useRoute, k as _imports_0 } from './server.mjs';
import { a as useAdminAuth } from './useAdmin-CW1Bjdf4.mjs';
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
  __name: "admin",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    useAdminAuth();
    const sidebarOpen = ref(false);
    const { data: stats } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/admin/stats", {
      key: "admin-stats",
      default: () => ({ unread: 0 })
    }, "$Rfk9nP_Aa9")), __temp = await __temp, __restore(), __temp);
    const unreadBadge = computed(() => Number(stats.value?.unread || 0));
    watch(() => route.path, () => {
      sidebarOpen.value = false;
    });
    useAdminSeo("Administration");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-shell min-h-screen bg-[#f4f6f9] font-sans text-[#1a1a1b]" }, _attrs))} data-v-53e67e74><header class="lg:hidden sticky top-0 z-40 bg-brand-900 text-white px-4 py-3 flex items-center justify-between shadow-lg" data-v-53e67e74><button type="button" class="p-2 -ml-2 rounded-[4px] hover:bg-white/10" aria-label="Menu" data-v-53e67e74><svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-53e67e74><path d="M4 6h16M4 12h16M4 18h16" data-v-53e67e74></path></svg></button><span class="font-[900] uppercase tracking-tight text-sm" data-v-53e67e74>OXYNOVA Admin</span><button type="button" class="text-[11px] font-[900] uppercase tracking-wider text-white/70" data-v-53e67e74>Sortir</button></header>`);
      if (unref(sidebarOpen)) {
        _push(`<div class="lg:hidden fixed inset-0 z-40 bg-brand-900/50" data-v-53e67e74></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="${ssrRenderClass([unref(sidebarOpen) ? "translate-x-0" : "-translate-x-full", "admin-sidebar fixed inset-y-0 left-0 z-50 w-[280px] bg-brand-900 text-white flex flex-col transition-transform duration-300 lg:translate-x-0"])}" data-v-53e67e74><div class="px-6 pt-8 pb-6 border-b border-white/10" data-v-53e67e74><div class="flex items-center gap-3" data-v-53e67e74><img${ssrRenderAttr("src", _imports_0)} alt="OXYNOVA" class="h-10 w-auto object-contain brightness-0 invert opacity-95" data-v-53e67e74><div class="min-w-0" data-v-53e67e74><p class="font-[900] uppercase tracking-tight text-[15px] leading-none" data-v-53e67e74>OXYNOVA</p><p class="text-[10px] font-[900] uppercase tracking-[0.2em] text-brand-300 mt-1.5" data-v-53e67e74>Administration</p></div></div></div><nav class="flex-1 px-4 py-6 space-y-1.5" data-v-53e67e74><p class="px-3 mb-3 text-[10px] font-[900] uppercase tracking-[0.22em] text-white/40" data-v-53e67e74>Menu</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin",
        class: ["admin-side-link", { "admin-side-link--active": unref(route).path === "/admin" }],
        onClick: ($event) => sidebarOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-5 h-5 flex-shrink-0 opacity-80" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" data-v-53e67e74${_scopeId}><path d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 12a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1v-7z" data-v-53e67e74${_scopeId}></path></svg><span data-v-53e67e74${_scopeId}>Tableau</span>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-5 h-5 flex-shrink-0 opacity-80",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "1.8",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", { d: "M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 12a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1v-7z" })
              ])),
              createVNode("span", null, "Tableau")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/messages",
        class: ["admin-side-link", { "admin-side-link--active": unref(route).path.startsWith("/admin/messages") }],
        onClick: ($event) => sidebarOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-5 h-5 flex-shrink-0 opacity-80" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" data-v-53e67e74${_scopeId}><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-53e67e74${_scopeId}></path></svg><span data-v-53e67e74${_scopeId}>Messages</span>`);
            if (unref(unreadBadge) > 0) {
              _push2(`<span class="ml-auto min-w-[1.4rem] h-5 px-1.5 rounded-full bg-brand-500 text-[10px] font-[900] flex items-center justify-center" data-v-53e67e74${_scopeId}>${ssrInterpolate(unref(unreadBadge) > 99 ? "99+" : unref(unreadBadge))}</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-5 h-5 flex-shrink-0 opacity-80",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "1.8",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", { d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" })
              ])),
              createVNode("span", null, "Messages"),
              unref(unreadBadge) > 0 ? (openBlock(), createBlock("span", {
                key: 0,
                class: "ml-auto min-w-[1.4rem] h-5 px-1.5 rounded-full bg-brand-500 text-[10px] font-[900] flex items-center justify-center"
              }, toDisplayString(unref(unreadBadge) > 99 ? "99+" : unref(unreadBadge)), 1)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav><div class="px-4 py-5 border-t border-white/10 space-y-1" data-v-53e67e74><a href="/" target="_blank" class="admin-side-link admin-side-link--muted" data-v-53e67e74><svg class="w-5 h-5 flex-shrink-0 opacity-70" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" data-v-53e67e74><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" data-v-53e67e74></path></svg><span data-v-53e67e74>Voir le site</span></a><button type="button" class="admin-side-link admin-side-link--muted w-full text-left" data-v-53e67e74><svg class="w-5 h-5 flex-shrink-0 opacity-70" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" data-v-53e67e74><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-53e67e74></path></svg><span data-v-53e67e74>Déconnexion</span></button></div></aside><div class="lg:pl-[280px] min-h-screen" data-v-53e67e74><main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10" data-v-53e67e74>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const admin = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-53e67e74"]]);

export { admin as default };
//# sourceMappingURL=admin-DSZlKtqI.mjs.map
