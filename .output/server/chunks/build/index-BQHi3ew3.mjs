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
    const { data: items, pending, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/admin/videos", "$IaEssn_X-X")), __temp = await __temp, __restore(), __temp);
    const busyId = ref(null);
    useHead({ title: "Vidéos - Admin OXYNOVA" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-ddcd9d78><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8" data-v-ddcd9d78><div data-v-ddcd9d78><h1 class="text-2xl sm:text-3xl font-[900] text-[#1a1a1b] uppercase tracking-tight" data-v-ddcd9d78>Vidéos YouTube</h1><p class="text-gray-500 font-medium mt-2" data-v-ddcd9d78>Les vidéos sont lues directement sur le site (embed).</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/videos/new",
        class: "admin-btn-primary inline-flex items-center justify-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` + Nouvelle vidéo `);
          } else {
            return [
              createTextVNode(" + Nouvelle vidéo ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(pending)) {
        _push(`<div class="text-gray-500 font-medium" data-v-ddcd9d78>Chargement...</div>`);
      } else if (!unref(items)?.length) {
        _push(`<div class="admin-empty" data-v-ddcd9d78><p class="text-gray-500 font-medium" data-v-ddcd9d78>Aucune vidéo.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin/videos/new",
          class: "admin-btn-primary inline-flex mt-4"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Ajouter une vidéo`);
            } else {
              return [
                createTextVNode("Ajouter une vidéo")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="space-y-4" data-v-ddcd9d78><!--[-->`);
        ssrRenderList(unref(items), (item) => {
          _push(`<article class="bg-white border border-gray-100 rounded-[4px] shadow-sm overflow-hidden grid sm:grid-cols-[240px_1fr] gap-0" data-v-ddcd9d78><div class="relative aspect-video sm:aspect-auto sm:h-full min-h-[140px] bg-brand-900" data-v-ddcd9d78><img${ssrRenderAttr("src", `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`)}${ssrRenderAttr("alt", item.title)} class="w-full h-full object-cover opacity-90" data-v-ddcd9d78></div><div class="p-5 flex flex-col justify-between gap-4" data-v-ddcd9d78><div data-v-ddcd9d78><h2 class="font-[900] text-[#1a1a1b] text-lg uppercase tracking-tight" data-v-ddcd9d78>${ssrInterpolate(item.title)}</h2><p class="text-gray-500 text-sm font-medium mt-2 line-clamp-2" data-v-ddcd9d78>${ssrInterpolate(item.description || "-")}</p><p class="text-brand-600 text-xs font-medium mt-2 truncate" data-v-ddcd9d78>${ssrInterpolate(item.youtubeUrl)}</p></div><div class="flex flex-wrap items-center gap-2" data-v-ddcd9d78><button type="button" class="${ssrRenderClass([item.published ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500", "text-[10px] font-[900] uppercase tracking-wider px-2 py-1 rounded-[2px]"])}"${ssrIncludeBooleanAttr(unref(busyId) === item.id) ? " disabled" : ""} data-v-ddcd9d78>${ssrInterpolate(item.published ? "Publié" : "Brouillon")}</button>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/admin/videos/${item.id}`,
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
          _push(`<button type="button" class="admin-link-danger"${ssrIncludeBooleanAttr(unref(busyId) === item.id) ? " disabled" : ""} data-v-ddcd9d78>Suppr.</button></div></div></article>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/videos/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ddcd9d78"]]);

export { index as default };
//# sourceMappingURL=index-BQHi3ew3.mjs.map
