import { _ as __nuxt_component_0 } from './nuxt-link-vzZ0EJye.mjs';
import { defineComponent, withAsyncContext, ref, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useFetch } from './fetch-BwSn-eTT.mjs';
import { u as useHead } from './server.mjs';
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
    const { data: team, pending, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/admin/team", "$zNqNWlRqQh")), __temp = await __temp, __restore(), __temp);
    const busyId = ref(null);
    useHead({ title: "Équipe - Admin OXYNOVA" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-f3980151><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8" data-v-f3980151><div data-v-f3980151><h1 class="text-2xl sm:text-3xl font-[900] text-[#1a1a1b] uppercase tracking-tight" data-v-f3980151>Équipe</h1><p class="text-gray-500 font-medium mt-2" data-v-f3980151>Profils affichés sur l&#39;accueil et la page Équipe.</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/equipe/new",
        class: "admin-btn-primary inline-flex items-center justify-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` + Nouveau membre `);
          } else {
            return [
              createTextVNode(" + Nouveau membre ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(pending)) {
        _push(`<div class="text-gray-500 font-medium" data-v-f3980151>Chargement...</div>`);
      } else if (!unref(team)?.length) {
        _push(`<div class="admin-empty" data-v-f3980151><p class="text-gray-500 font-medium" data-v-f3980151>Aucun membre pour le moment.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin/equipe/new",
          class: "admin-btn-primary inline-flex mt-4"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Ajouter le premier`);
            } else {
              return [
                createTextVNode("Ajouter le premier")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="bg-white rounded-[4px] border border-gray-100 shadow-sm overflow-hidden" data-v-f3980151><div class="overflow-x-auto" data-v-f3980151><table class="w-full text-left" data-v-f3980151><thead class="bg-gray-50 border-b border-gray-100" data-v-f3980151><tr data-v-f3980151><th class="admin-th" data-v-f3980151>Membre</th><th class="admin-th hidden md:table-cell" data-v-f3980151>Département</th><th class="admin-th" data-v-f3980151>Publication</th><th class="admin-th text-right" data-v-f3980151>Actions</th></tr></thead><tbody class="divide-y divide-gray-100" data-v-f3980151><!--[-->`);
        ssrRenderList(unref(team), (item) => {
          _push(`<tr class="hover:bg-gray-50/50" data-v-f3980151><td class="admin-td" data-v-f3980151><div class="flex items-center gap-3" data-v-f3980151><img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.name)} class="w-12 h-12 rounded-[2px] object-cover flex-shrink-0" data-v-f3980151><div class="min-w-0" data-v-f3980151><p class="font-[900] text-[#1a1a1b] truncate" data-v-f3980151>${ssrInterpolate(item.name)}</p><p class="text-gray-400 text-xs font-medium truncate" data-v-f3980151>${ssrInterpolate(item.role)}</p></div></div></td><td class="admin-td hidden md:table-cell text-gray-500 font-medium text-xs" data-v-f3980151>${ssrInterpolate(item.department)}</td><td class="admin-td" data-v-f3980151><button type="button" class="${ssrRenderClass([item.published ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500", "text-[10px] font-[900] uppercase tracking-wider px-2 py-1 rounded-[2px]"])}"${ssrIncludeBooleanAttr(unref(busyId) === item.id) ? " disabled" : ""} data-v-f3980151>${ssrInterpolate(item.published ? "Publié" : "Brouillon")}</button></td><td class="admin-td text-right" data-v-f3980151>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/admin/equipe/${item.id}`,
            class: "admin-link mr-2"
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
          _push(`<button type="button" class="admin-link-danger"${ssrIncludeBooleanAttr(unref(busyId) === item.id) ? " disabled" : ""} data-v-f3980151>Suppr.</button></td></tr>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/equipe/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f3980151"]]);

export { index as default };
//# sourceMappingURL=index-CdGQZY2w.mjs.map
