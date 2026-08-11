import { _ as __nuxt_component_0 } from './MethodSection-BowncMvp.mjs';
import { _ as __nuxt_component_1 } from './CtaSection-CFnA14KG.mjs';
import { _ as __nuxt_component_2 } from './Footer-CsKgmDm_.mjs';
import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { o as oxynovaContent } from './server.mjs';
import { u as usePageSeo } from './usePageSeo-dIWm1VtT.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
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
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import './nuxt-link-vzZ0EJye.mjs';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "services",
  __ssrInlineRender: true,
  setup(__props) {
    usePageSeo("services");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MethodSection = __nuxt_component_0;
      const _component_CtaSection = __nuxt_component_1;
      const _component_Footer = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white font-sans" }, _attrs))}><header class="relative min-h-[40vh] sm:min-h-[45vh] flex items-center justify-center text-center overflow-hidden bg-brand-900"><img${ssrRenderAttr("src", unref(oxynovaContent).images.maintenance)} alt="Services OXYNOVA" class="absolute inset-0 w-full h-full object-cover opacity-40"><div class="absolute inset-0 bg-brand-900/75"></div><div class="relative z-10 container mx-auto px-4 py-16"><h1 class="text-[36px] sm:text-[56px] font-[900] text-white uppercase tracking-tighter mb-4">Nos Activités</h1><p class="text-white/70 font-medium max-w-xl mx-auto">Solutions complètes en ingénierie biomédicale</p></div></header><section class="py-14 sm:py-20 bg-white border-b border-gray-100"><div class="container mx-auto px-4 max-w-2xl text-center"><p class="text-gray-600 font-medium text-[16px] leading-relaxed"> Six activités essentielles, de la gestion de projet à la maintenance biomédicale. </p></div></section><section class="py-14 sm:py-20 bg-gray-50"><div class="container mx-auto px-4"><h2 class="text-[24px] sm:text-[32px] font-[900] uppercase tracking-tighter text-center mb-10 text-[#1a1a1b]">Domaines d&#39;intervention</h2><div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"><!--[-->`);
      ssrRenderList(unref(oxynovaContent).domains, (domain) => {
        _push(`<article class="p-6 sm:p-8 bg-white border border-gray-100 rounded-[4px] card-hover text-center"><h3 class="font-[900] text-[15px] text-brand-700 uppercase tracking-tight mb-3">${ssrInterpolate(domain.name)}</h3><p class="text-gray-500 text-[13px] font-medium leading-relaxed">${ssrInterpolate(domain.description)}</p></article>`);
      });
      _push(`<!--]--></div></div></section><section class="py-16 sm:py-24 container mx-auto px-4"><h2 class="text-[24px] sm:text-[32px] font-[900] uppercase tracking-tighter mb-10 text-[#1a1a1b]">Catalogue</h2><div class="grid sm:grid-cols-2 gap-6 sm:gap-8"><!--[-->`);
      ssrRenderList(unref(oxynovaContent).services, (service, i) => {
        _push(`<article class="group p-8 bg-white border-2 border-gray-100 rounded-[4px] card-hover"><span class="card-icon text-brand-600 font-[900] text-[36px] leading-none opacity-20 group-hover:opacity-40 block mb-4">${ssrInterpolate(String(i + 1).padStart(2, "0"))}</span><h3 class="text-[20px] font-[900] text-[#1a1a1b] uppercase tracking-tight mb-3">${ssrInterpolate(service.title)}</h3><p class="text-gray-500 font-medium text-[15px] leading-relaxed mb-5">${ssrInterpolate(service.description)}</p>`);
        if (service.highlights) {
          _push(`<ul class="space-y-2"><!--[-->`);
          ssrRenderList(service.highlights, (item) => {
            _push(`<li class="flex gap-2 text-[13px] text-gray-600 font-medium"><span class="text-brand-600 font-[900]">▸</span> ${ssrInterpolate(item)}</li>`);
          });
          _push(`<!--]--></ul>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</article>`);
      });
      _push(`<!--]--></div></section>`);
      _push(ssrRenderComponent(_component_MethodSection, null, null, _parent));
      _push(ssrRenderComponent(_component_CtaSection, null, null, _parent));
      _push(ssrRenderComponent(_component_Footer, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/services.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=services-HB1x-PPi.mjs.map
