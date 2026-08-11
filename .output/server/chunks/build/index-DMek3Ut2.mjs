import { _ as __nuxt_component_0 } from './nuxt-link-vzZ0EJye.mjs';
import { defineComponent, withAsyncContext, ref, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useFetch } from './fetch-BEgLTeJq.mjs';
import { _ as _export_sfc, u as useHead } from './server.mjs';
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
    const { data: items, pending, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/admin/gallery", "$r-VwvYqDVD")), __temp = await __temp, __restore(), __temp);
    const busyId = ref(null);
    useHead({ title: "Galerie - Admin OXYNOVA" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-805232ce><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8" data-v-805232ce><div data-v-805232ce><h1 class="text-2xl sm:text-3xl font-[900] text-[#1a1a1b] uppercase tracking-tight" data-v-805232ce>Galerie</h1><p class="text-gray-500 font-medium mt-2" data-v-805232ce>Photos affichées sur la page Médias.</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/galerie/new",
        class: "admin-btn-primary inline-flex items-center justify-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` + Nouvelle photo `);
          } else {
            return [
              createTextVNode(" + Nouvelle photo ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(pending)) {
        _push(`<div class="text-gray-500 font-medium" data-v-805232ce>Chargement...</div>`);
      } else if (!unref(items)?.length) {
        _push(`<div class="admin-empty" data-v-805232ce><p class="text-gray-500 font-medium" data-v-805232ce>Aucune photo.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin/galerie/new",
          class: "admin-btn-primary inline-flex mt-4"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Ajouter une photo`);
            } else {
              return [
                createTextVNode("Ajouter une photo")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" data-v-805232ce><!--[-->`);
        ssrRenderList(unref(items), (item) => {
          _push(`<article class="bg-white border border-gray-100 rounded-[4px] overflow-hidden shadow-sm" data-v-805232ce><img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.title)} class="w-full h-40 object-cover" data-v-805232ce><div class="p-4" data-v-805232ce><p class="font-[900] text-[#1a1a1b] truncate" data-v-805232ce>${ssrInterpolate(item.title)}</p><p class="text-gray-400 text-xs font-medium truncate mt-1" data-v-805232ce>${ssrInterpolate(item.caption || "-")}</p><div class="flex items-center justify-between mt-4 gap-2" data-v-805232ce><button type="button" class="${ssrRenderClass([item.published ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500", "text-[10px] font-[900] uppercase tracking-wider px-2 py-1 rounded-[2px]"])}"${ssrIncludeBooleanAttr(unref(busyId) === item.id) ? " disabled" : ""} data-v-805232ce>${ssrInterpolate(item.published ? "Publié" : "Brouillon")}</button><div class="flex gap-2" data-v-805232ce>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/admin/galerie/${item.id}`,
            class: "admin-link"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Modifier`);
              } else {
                return [
                  createTextVNode("Modifier")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<button type="button" class="admin-link-danger"${ssrIncludeBooleanAttr(unref(busyId) === item.id) ? " disabled" : ""} data-v-805232ce>Suppr.</button></div></div></div></article>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/galerie/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-805232ce"]]);

export { index as default };
//# sourceMappingURL=index-DMek3Ut2.mjs.map
