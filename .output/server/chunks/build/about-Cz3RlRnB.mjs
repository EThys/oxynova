import { defineComponent, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { o as oxynovaContent } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-vzZ0EJye.mjs';
import { _ as __nuxt_component_1 } from './CtaSection-CFnA14KG.mjs';
import { _ as __nuxt_component_2 } from './Footer-CsKgmDm_.mjs';
import { u as usePageSeo } from './usePageSeo-dIWm1VtT.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ValuesSection",
  __ssrInlineRender: true,
  setup(__props) {
    const icons = [
      '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>',
      '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>',
      '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>',
      '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>',
      '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/></svg>'
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "relative py-16 sm:py-24 lg:py-32 bg-white font-sans overflow-hidden" }, _attrs))}><div class="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-brand-50/80 via-transparent to-transparent pointer-events-none"></div><div class="absolute -left-32 bottom-0 w-80 h-80 bg-brand-100/50 rounded-full blur-3xl pointer-events-none"></div><div class="container mx-auto px-4 relative"><div class="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start"><div class="lg:col-span-4 lg:sticky lg:top-28"><div class="inline-flex items-center gap-3 mb-6"><span class="w-10 h-px bg-brand-600"></span><span class="text-brand-700 font-[900] uppercase tracking-[0.3em] text-[11px]">Culture</span></div><h2 class="text-[32px] sm:text-[44px] font-[900] text-[#1a1a1b] uppercase tracking-tighter leading-[1.05] mb-6"> Nos<br><span class="text-brand-700">valeurs</span></h2><p class="text-gray-500 font-medium text-[15px] leading-relaxed max-w-sm"> Ce qui guide chaque intervention auprès des structures de santé. </p></div><div class="lg:col-span-8 grid sm:grid-cols-2 gap-4 sm:gap-6"><!--[-->`);
      ssrRenderList(unref(oxynovaContent).values, (value, i) => {
        _push(`<article class="${ssrRenderClass([{ "sm:mt-8": i % 2 === 1 }, "group relative p-6 sm:p-8 bg-gray-50 border border-gray-100 rounded-[4px] card-hover overflow-hidden"])}"><span class="absolute -right-1 -top-3 text-[64px] sm:text-[72px] font-[900] text-brand-100 leading-none select-none pointer-events-none group-hover:text-brand-200 transition-colors duration-300">${ssrInterpolate(String(i + 1).padStart(2, "0"))}</span><div class="card-icon relative w-11 h-11 bg-brand-700 text-white rounded-[2px] flex items-center justify-center mb-5">${icons[i % icons.length] ?? ""}</div><h3 class="relative text-[15px] sm:text-[16px] font-[900] text-[#1a1a1b] uppercase tracking-wide mb-2">${ssrInterpolate(value)}</h3><p class="relative text-gray-500 text-[13px] sm:text-[14px] font-medium leading-relaxed">${ssrInterpolate(unref(oxynovaContent).valueDescriptions[i])}</p><div class="absolute bottom-0 left-0 w-0 h-1 bg-brand-600 group-hover:w-full transition-all duration-500 ease-out"></div></article>`);
      });
      _push(`<!--]--></div></div></div></section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ValuesSection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$1, { __name: "ValuesSection" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "about",
  __ssrInlineRender: true,
  setup(__props) {
    usePageSeo("about");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ValuesSection = __nuxt_component_0;
      const _component_nuxt_link = __nuxt_component_0$1;
      const _component_CtaSection = __nuxt_component_1;
      const _component_Footer = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white font-sans" }, _attrs))}><header class="relative min-h-[45vh] sm:min-h-[50vh] flex items-center justify-center text-center overflow-hidden bg-brand-900"><img${ssrRenderAttr("src", unref(oxynovaContent).images.oxygenPlant)} alt="OXYNOVA RDC" class="absolute inset-0 w-full h-full object-cover opacity-40"><div class="absolute inset-0 bg-brand-900/75"></div><div class="relative z-10 container mx-auto px-4 py-16"><h1 class="text-[36px] sm:text-[56px] lg:text-[64px] font-[900] text-white uppercase tracking-tighter mb-4">À propos</h1><p class="text-white/70 font-medium max-w-xl mx-auto">${ssrInterpolate(unref(oxynovaContent).slogan)}</p></div></header><section class="py-16 sm:py-24 bg-white"><div class="container mx-auto px-4"><div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"><div class="rounded-[4px] overflow-hidden shadow-2xl"><img${ssrRenderAttr("src", unref(oxynovaContent).images.oxygenPlant)} alt="OXYNOVA RDC — Partenaire technique" class="w-full h-[300px] sm:h-[420px] object-cover object-top"></div><div><span class="text-brand-700 font-[900] uppercase tracking-[0.3em] text-[11px] mb-4 block">Qui sommes-nous</span><h2 class="text-[28px] sm:text-[40px] font-[900] text-[#1a1a1b] uppercase tracking-tighter mb-6 leading-tight">${ssrInterpolate(unref(oxynovaContent).fullName)}</h2><p class="text-gray-600 font-medium text-[15px] leading-relaxed mb-4">${ssrInterpolate(unref(oxynovaContent).description)}</p><p class="text-gray-600 font-medium text-[15px] leading-relaxed mb-6"> Entreprise de droit congolais (${ssrInterpolate(unref(oxynovaContent).legalForm)}). ${ssrInterpolate(unref(oxynovaContent).positioning)}</p><ul class="space-y-2 text-[14px] text-gray-600 font-medium mb-6"><li class="flex gap-2"><span class="text-brand-600 font-[900]">▸</span> ${ssrInterpolate(unref(oxynovaContent).headquarters)}</li><li class="flex gap-2"><span class="text-brand-600 font-[900]">▸</span> ${ssrInterpolate(unref(oxynovaContent).contact.email)}</li><li class="flex gap-2"><span class="text-brand-600 font-[900]">▸</span> ${ssrInterpolate(unref(oxynovaContent).hours.weekdays)}</li></ul><ul class="space-y-1 text-[12px] text-gray-500 font-medium"><li>N° R.C.C.M. : ${ssrInterpolate(unref(oxynovaContent).legal.rccm)}</li><li>N° ID NAT : ${ssrInterpolate(unref(oxynovaContent).legal.idNat)}</li><li>N° Impôt : ${ssrInterpolate(unref(oxynovaContent).legal.taxId)}</li></ul></div></div></div></section><section class="py-16 sm:py-24 bg-gray-50"><div class="container mx-auto px-4"><div class="text-center mb-12 sm:mb-16"><span class="text-brand-700 font-[900] uppercase tracking-[0.3em] text-[12px] mb-4 block">Notre ambition</span><h2 class="text-[28px] sm:text-[40px] font-[900] text-[#1a1a1b] uppercase tracking-tighter">Vision &amp; Mission</h2></div><div class="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto"><article class="group bg-brand-700 p-8 sm:p-10 rounded-[4px] text-white shadow-lg card-hover-accent"><h3 class="text-[13px] font-[900] text-brand-100 uppercase tracking-widest mb-4">Vision</h3><p class="text-white/90 text-[15px] leading-relaxed font-medium">${ssrInterpolate(unref(oxynovaContent).vision)}</p></article><article class="group bg-white p-8 sm:p-10 rounded-[4px] border border-gray-100 shadow-sm card-hover"><h3 class="text-[13px] font-[900] text-brand-700 uppercase tracking-widest mb-4">Mission</h3><p class="text-gray-600 text-[15px] leading-relaxed font-medium">${ssrInterpolate(unref(oxynovaContent).mission)}</p></article></div></div></section>`);
      _push(ssrRenderComponent(_component_ValuesSection, null, null, _parent));
      _push(`<section class="py-16 sm:py-24 bg-gray-50"><div class="container mx-auto px-4 max-w-3xl"><h2 class="text-[24px] sm:text-[32px] font-[900] uppercase tracking-tighter mb-4 text-[#1a1a1b]">Nos engagements</h2><p class="text-gray-500 font-medium mb-8"> Chez OXYNOVA RDC SARL, chaque projet est conduit avec une rigueur constante envers : </p><ul class="space-y-3 mb-16"><!--[-->`);
      ssrRenderList(unref(oxynovaContent).engagements, (item, i) => {
        _push(`<li class="flex gap-4 p-4 bg-white border border-gray-100 rounded-[4px]"><span class="flex-shrink-0 w-8 h-8 bg-brand-700 text-white rounded-[2px] flex items-center justify-center text-[12px] font-[900]">${ssrInterpolate(i + 1)}</span><p class="text-gray-600 font-medium text-[15px] leading-relaxed pt-1">${ssrInterpolate(item)}</p></li>`);
      });
      _push(`<!--]--></ul><h2 class="text-[24px] sm:text-[32px] font-[900] uppercase tracking-tighter mb-8 text-[#1a1a1b]">Nos priorités</h2><ul class="space-y-4"><!--[-->`);
      ssrRenderList(unref(oxynovaContent).focusPoints, (point, i) => {
        _push(`<li class="flex gap-4 p-5 bg-white border border-gray-100 rounded-[4px] card-hover-list"><span class="flex-shrink-0 w-8 h-8 bg-brand-700 text-white rounded-[2px] flex items-center justify-center text-[12px] font-[900]">${ssrInterpolate(i + 1)}</span><p class="text-gray-600 font-medium text-[15px] leading-relaxed pt-1">${ssrInterpolate(point)}</p></li>`);
      });
      _push(`<!--]--></ul></div></section><section class="py-16 sm:py-24 bg-white"><div class="container mx-auto px-4"><div class="grid lg:grid-cols-2 gap-12 items-center"><div><span class="text-brand-700 font-[900] uppercase tracking-[0.3em] text-[11px] mb-4 block">Sur le terrain</span><h2 class="text-[28px] sm:text-[36px] font-[900] text-[#1a1a1b] uppercase tracking-tighter mb-6"> Maintenance biomédicale </h2><p class="text-gray-600 font-medium text-[15px] leading-relaxed mb-6"> Notre service Maintenance et Assistance Technique assure la disponibilité et la sécurité des équipements médicaux auprès des structures de santé. </p>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: "/services",
        class: "inline-block px-8 py-4 bg-brand-700 text-white font-[900] text-[12px] uppercase tracking-wider hover:bg-brand-800 transition-colors rounded-[2px]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Nos activités `);
          } else {
            return [
              createTextVNode(" Nos activités ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="rounded-[4px] overflow-hidden shadow-2xl"><img${ssrRenderAttr("src", unref(oxynovaContent).images.maintenance)} alt="Maintenance biomédicale — OXYNOVA" class="w-full h-[300px] sm:h-[400px] object-cover object-center"></div></div></div></section>`);
      _push(ssrRenderComponent(_component_CtaSection, null, null, _parent));
      _push(ssrRenderComponent(_component_Footer, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=about-Cz3RlRnB.mjs.map
