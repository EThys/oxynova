import { _ as __nuxt_component_1 } from './CtaSection-CFnA14KG.mjs';
import { _ as __nuxt_component_2 } from './Footer-CsKgmDm_.mjs';
import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderTeleport, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-D0DzE91m.mjs';
import { u as useGallery } from './useAdmin-dDaeL6H7.mjs';
import { u as usePageSeo } from './usePageSeo-dIWm1VtT.mjs';
import './nuxt-link-vzZ0EJye.mjs';
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
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';
import './state-_I5XcLqc.mjs';
import './fetch-BwSn-eTT.mjs';
import '@vue/shared';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "medias",
  __ssrInlineRender: true,
  setup(__props) {
    const { gallery, pending: galleryPending } = useGallery();
    const lightbox = ref(null);
    usePageSeo("medias");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CtaSection = __nuxt_component_1;
      const _component_Footer = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white font-sans" }, _attrs))}><header class="relative min-h-[40vh] sm:min-h-[45vh] flex items-center justify-center text-center overflow-hidden bg-brand-900"><img${ssrRenderAttr("src", _imports_0)} alt="Médias OXYNOVA" class="absolute inset-0 w-full h-full object-cover opacity-40"><div class="absolute inset-0 bg-brand-900/75"></div><div class="relative z-10 container mx-auto px-4 py-16"><h1 class="text-[36px] sm:text-[56px] font-[900] text-white uppercase tracking-tighter mb-4">Médias</h1><p class="text-white/70 font-medium max-w-xl mx-auto">Galerie photos</p></div></header><section class="py-16 sm:py-24 bg-white"><div class="container mx-auto px-4"><div class="mb-10"><span class="text-brand-700 font-[900] uppercase tracking-[0.3em] text-[12px] mb-3 block">Photos</span><h2 class="text-[28px] sm:text-[36px] font-[900] text-[#1a1a1b] uppercase tracking-tighter">Galerie</h2></div>`);
      if (unref(galleryPending)) {
        _push(`<div class="text-gray-500 font-medium py-8">Chargement de la galerie...</div>`);
      } else if (unref(gallery)?.length) {
        _push(`<div class="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5"><!--[-->`);
        ssrRenderList(unref(gallery), (item) => {
          _push(`<button type="button" class="group relative aspect-[4/3] overflow-hidden rounded-[4px] border border-gray-100 text-left"><img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.title)} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"><div class="absolute inset-0 bg-gradient-to-t from-brand-900/70 via-transparent to-transparent opacity-80"></div><div class="absolute bottom-0 left-0 right-0 p-3 sm:p-4"><p class="text-white font-[900] text-[12px] sm:text-[14px] uppercase tracking-tight">${ssrInterpolate(item.title)}</p>`);
          if (item.caption) {
            _push(`<p class="text-white/70 text-[11px] font-medium mt-0.5 line-clamp-1">${ssrInterpolate(item.caption)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-gray-400 font-medium py-8">Aucune photo publiée pour le moment.</div>`);
      }
      _push(`</div></section>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(lightbox)) {
          _push2(`<div class="fixed inset-0 z-[100] bg-brand-900/90 flex items-center justify-center p-4"><button type="button" class="absolute top-4 right-4 text-white text-sm font-[900] uppercase tracking-wider hover:text-brand-300"> Fermer </button><div class="max-w-5xl w-full"><img${ssrRenderAttr("src", unref(lightbox).image)}${ssrRenderAttr("alt", unref(lightbox).title)} class="w-full max-h-[80vh] object-contain rounded-[2px]"><p class="text-white font-[900] uppercase tracking-tight mt-4 text-center">${ssrInterpolate(unref(lightbox).title)}</p>`);
          if (unref(lightbox).caption) {
            _push2(`<p class="text-white/70 text-sm font-medium text-center mt-1">${ssrInterpolate(unref(lightbox).caption)}</p>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(ssrRenderComponent(_component_CtaSection, null, null, _parent));
      _push(ssrRenderComponent(_component_Footer, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/medias.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=medias-Bz7__1Vz.mjs.map
