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
    const { data: realizations, pending, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/admin/realizations", "$g4oaLrpycD")), __temp = await __temp, __restore(), __temp);
    const toggleId = ref(null);
    useHead({ title: "Réalisations - Admin OXYNOVA RDC SARL" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-ceda2ac8><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8" data-v-ceda2ac8><div data-v-ceda2ac8><h1 class="text-2xl sm:text-3xl font-[900] text-[#1a1a1b] uppercase tracking-tight" data-v-ceda2ac8>Réalisations</h1><p class="text-gray-500 font-medium mt-2" data-v-ceda2ac8>Gérez les projets affichés sur le site public.</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/realisations/new",
        class: "admin-btn-primary inline-flex items-center justify-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` + Nouvelle réalisation `);
          } else {
            return [
              createTextVNode(" + Nouvelle réalisation ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(pending)) {
        _push(`<div class="text-gray-500 font-medium" data-v-ceda2ac8>Chargement...</div>`);
      } else if (!unref(realizations)?.length) {
        _push(`<div class="admin-empty" data-v-ceda2ac8><p class="text-gray-500 font-medium" data-v-ceda2ac8>Aucune réalisation enregistrée.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin/realisations/new",
          class: "admin-btn-primary inline-flex mt-4"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Créer la première réalisation `);
            } else {
              return [
                createTextVNode(" Créer la première réalisation ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="bg-white rounded-[4px] border border-gray-100 shadow-sm overflow-hidden" data-v-ceda2ac8><div class="overflow-x-auto" data-v-ceda2ac8><table class="w-full text-left" data-v-ceda2ac8><thead class="bg-gray-50 border-b border-gray-100" data-v-ceda2ac8><tr data-v-ceda2ac8><th class="admin-th" data-v-ceda2ac8>Projet</th><th class="admin-th hidden md:table-cell" data-v-ceda2ac8>Domaine</th><th class="admin-th hidden sm:table-cell" data-v-ceda2ac8>Statut</th><th class="admin-th" data-v-ceda2ac8>Publication</th><th class="admin-th text-right" data-v-ceda2ac8>Actions</th></tr></thead><tbody class="divide-y divide-gray-100" data-v-ceda2ac8><!--[-->`);
        ssrRenderList(unref(realizations), (item) => {
          _push(`<tr class="hover:bg-gray-50/50" data-v-ceda2ac8><td class="admin-td" data-v-ceda2ac8><div class="flex items-center gap-3" data-v-ceda2ac8><img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.partner)} class="w-12 h-12 rounded-[2px] object-cover flex-shrink-0 hidden sm:block" data-v-ceda2ac8><div class="min-w-0" data-v-ceda2ac8><p class="font-[900] text-[#1a1a1b] truncate" data-v-ceda2ac8>${ssrInterpolate(item.partner)}</p><p class="text-gray-400 text-xs font-medium truncate md:hidden" data-v-ceda2ac8>${ssrInterpolate(item.domain)}</p></div></div></td><td class="admin-td hidden md:table-cell" data-v-ceda2ac8><span class="px-2 py-1 bg-brand-50 text-brand-800 text-[10px] font-[900] uppercase tracking-wider rounded-[2px]" data-v-ceda2ac8>${ssrInterpolate(item.domain)}</span></td><td class="admin-td hidden sm:table-cell text-gray-500 font-medium text-xs" data-v-ceda2ac8>${ssrInterpolate(item.status)}</td><td class="admin-td" data-v-ceda2ac8><button type="button" class="${ssrRenderClass([item.published ? "bg-green-50 text-green-700 hover:bg-green-100" : "bg-gray-100 text-gray-500 hover:bg-gray-200", "text-[10px] font-[900] uppercase tracking-wider px-2 py-1 rounded-[2px] transition-colors"])}"${ssrIncludeBooleanAttr(unref(toggleId) === item.id) ? " disabled" : ""} data-v-ceda2ac8>${ssrInterpolate(item.published ? "Publié" : "Brouillon")}</button></td><td class="admin-td text-right" data-v-ceda2ac8><div class="flex items-center justify-end gap-2" data-v-ceda2ac8>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/admin/realisations/${item.id}`,
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
          _push(`<button type="button" class="admin-link-danger"${ssrIncludeBooleanAttr(unref(toggleId) === item.id) ? " disabled" : ""} data-v-ceda2ac8> Suppr. </button></div></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/realisations/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ceda2ac8"]]);

export { index as default };
//# sourceMappingURL=index-CBStOkI8.mjs.map
