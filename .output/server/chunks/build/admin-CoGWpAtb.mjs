import { _ as __nuxt_component_0 } from './nuxt-link-vzZ0EJye.mjs';
import { useSSRContext, defineComponent, ref, computed, withAsyncContext, watch, mergeProps, withCtx, createVNode, unref, createTextVNode, openBlock, createBlock, toDisplayString, createCommentVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-3Fh-jQka.mjs';
import { j as useRoute } from './server.mjs';
import { a as useAdminAuth } from './useAdmin-dDaeL6H7.mjs';
import { u as useFetch } from './fetch-BwSn-eTT.mjs';
import { a as useAdminSeo } from './usePageSeo-dIWm1VtT.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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
import './state-_I5XcLqc.mjs';
import '@vue/shared';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "admin",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    useAdminAuth();
    const menuOpen = ref(false);
    const isMailApp = computed(() => route.path.startsWith("/admin/messages"));
    const { data: stats } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/admin/stats", {
      key: "admin-stats",
      default: () => ({ unread: 0 })
    }, "$Rfk9nP_Aa9")), __temp = await __temp, __restore(), __temp);
    const unreadBadge = computed(() => Number(stats.value?.unread || 0));
    watch(() => route.path, () => {
      menuOpen.value = false;
    });
    useAdminSeo("Administration");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-shell min-h-screen bg-[#f3f4f6] font-sans text-slate-900" }, _attrs))} data-v-c19aca17><header class="admin-navbar sticky top-0 z-40" data-v-c19aca17><div class="admin-navbar__inner" data-v-c19aca17>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin",
        class: "admin-brand",
        onClick: ($event) => menuOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="OXYNOVA" class="h-7 w-auto object-contain" data-v-c19aca17${_scopeId}><span class="font-semibold text-[14px] tracking-tight text-slate-900" data-v-c19aca17${_scopeId}>OXYNOVA</span><span class="hidden sm:inline text-slate-300" data-v-c19aca17${_scopeId}>|</span><span class="hidden sm:inline text-[12px] font-medium text-slate-500" data-v-c19aca17${_scopeId}>Admin</span>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                alt: "OXYNOVA",
                class: "h-7 w-auto object-contain"
              }),
              createVNode("span", { class: "font-semibold text-[14px] tracking-tight text-slate-900" }, "OXYNOVA"),
              createVNode("span", { class: "hidden sm:inline text-slate-300" }, "|"),
              createVNode("span", { class: "hidden sm:inline text-[12px] font-medium text-slate-500" }, "Admin")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="hidden md:flex items-center h-full ml-8 gap-0" data-v-c19aca17>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin",
        class: ["admin-tab", { "admin-tab--active": unref(route).path === "/admin" }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Tableau de bord `);
          } else {
            return [
              createTextVNode(" Tableau de bord ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/messages",
        class: ["admin-tab", { "admin-tab--active": unref(route).path.startsWith("/admin/messages") }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Messagerie `);
            if (unref(unreadBadge) > 0) {
              _push2(`<span class="admin-badge" data-v-c19aca17${_scopeId}>${ssrInterpolate(unref(unreadBadge) > 99 ? "99+" : unref(unreadBadge))}</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createTextVNode(" Messagerie "),
              unref(unreadBadge) > 0 ? (openBlock(), createBlock("span", {
                key: 0,
                class: "admin-badge"
              }, toDisplayString(unref(unreadBadge) > 99 ? "99+" : unref(unreadBadge)), 1)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav><div class="ml-auto flex items-center gap-1 sm:gap-2" data-v-c19aca17><a href="/" target="_blank" class="admin-link-quiet hidden sm:inline-flex" data-v-c19aca17>Voir le site</a><button type="button" class="admin-link-quiet hidden sm:inline-flex" data-v-c19aca17>Déconnexion</button><button type="button" class="sm:hidden admin-link-quiet !px-2" title="Déconnexion" data-v-c19aca17><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" data-v-c19aca17><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-c19aca17></path></svg></button><button type="button" class="md:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100" aria-label="Menu" data-v-c19aca17><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-c19aca17>`);
      if (!unref(menuOpen)) {
        _push(`<path d="M4 6h16M4 12h16M4 18h16" data-v-c19aca17></path>`);
      } else {
        _push(`<path d="M6 18L18 6M6 6l12 12" data-v-c19aca17></path>`);
      }
      _push(`</svg></button></div></div>`);
      if (unref(menuOpen)) {
        _push(`<div class="md:hidden absolute left-0 right-0 top-full border-t border-slate-200 bg-white px-3 py-2 space-y-1 shadow-lg z-50" data-v-c19aca17>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin",
          class: ["admin-mobile-link", { "admin-mobile-link--active": unref(route).path === "/admin" }],
          onClick: ($event) => menuOpen.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Tableau de bord `);
            } else {
              return [
                createTextVNode(" Tableau de bord ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin/messages",
          class: ["admin-mobile-link", { "admin-mobile-link--active": unref(route).path.startsWith("/admin/messages") }],
          onClick: ($event) => menuOpen.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Messagerie `);
              if (unref(unreadBadge) > 0) {
                _push2(`<span class="admin-badge ml-auto" data-v-c19aca17${_scopeId}>${ssrInterpolate(unref(unreadBadge) > 99 ? "99+" : unref(unreadBadge))}</span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createTextVNode(" Messagerie "),
                unref(unreadBadge) > 0 ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "admin-badge ml-auto"
                }, toDisplayString(unref(unreadBadge) > 99 ? "99+" : unref(unreadBadge)), 1)) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<a href="/" target="_blank" class="admin-mobile-link" data-v-c19aca17>Voir le site</a></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header><main class="${ssrRenderClass(unref(isMailApp) ? "mail-main h-[calc(100dvh-3.5rem)] overflow-hidden" : "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10")}" data-v-c19aca17>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const admin = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c19aca17"]]);

export { admin as default };
//# sourceMappingURL=admin-CoGWpAtb.mjs.map
