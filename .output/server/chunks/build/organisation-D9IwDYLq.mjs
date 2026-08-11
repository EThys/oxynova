import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { o as oxynovaContent } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { _ as __nuxt_component_1 } from './CtaSection-CFnA14KG.mjs';
import { _ as __nuxt_component_2 } from './Footer-CsKgmDm_.mjs';
import { _ as _imports_0 } from './virtual_public-D0DzE91m.mjs';
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
import './nuxt-link-vzZ0EJye.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "OrgChart",
  __ssrInlineRender: true,
  setup(__props) {
    const org = oxynovaContent.organization;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "org-chart w-full overflow-x-auto" }, _attrs))} data-v-5d8e85e3><div class="min-w-[780px] sm:min-w-0 flex flex-col items-center gap-0 py-4" data-v-5d8e85e3><div class="org-node org-node--top max-w-sm w-full" data-v-5d8e85e3><h3 class="org-title" data-v-5d8e85e3>${ssrInterpolate(unref(org).assembly.name)}</h3><p class="org-desc" data-v-5d8e85e3>${ssrInterpolate(unref(org).assembly.description)}</p></div><div class="org-line-v" data-v-5d8e85e3></div><div class="org-node org-node--general max-w-sm w-full" data-v-5d8e85e3><h3 class="org-title" data-v-5d8e85e3>${ssrInterpolate(unref(org).general.name)}</h3><p class="org-desc" data-v-5d8e85e3>${ssrInterpolate(unref(org).general.description)}</p></div><div class="org-line-v" data-v-5d8e85e3></div><div class="relative w-full max-w-2xl" data-v-5d8e85e3><div class="org-line-h absolute top-0 left-[25%] right-[25%] hidden sm:block" data-v-5d8e85e3></div><div class="grid sm:grid-cols-2 gap-6 sm:gap-4 pt-6" data-v-5d8e85e3><!--[-->`);
      ssrRenderList(unref(org).support, (dir) => {
        _push(`<div class="flex flex-col items-center" data-v-5d8e85e3><div class="org-line-v sm:h-6 h-0" data-v-5d8e85e3></div><div class="org-node w-full" data-v-5d8e85e3><h3 class="org-title" data-v-5d8e85e3>${ssrInterpolate(dir.name)}</h3><p class="org-desc" data-v-5d8e85e3>${ssrInterpolate(dir.description)}</p></div></div>`);
      });
      _push(`<!--]--></div></div><div class="org-line-v mt-6" data-v-5d8e85e3></div><div class="relative w-full max-w-6xl" data-v-5d8e85e3><div class="org-line-h absolute top-0 left-[10%] right-[10%] hidden lg:block" data-v-5d8e85e3></div><div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-3 pt-6" data-v-5d8e85e3><!--[-->`);
      ssrRenderList(unref(org).operational, (dir) => {
        _push(`<div class="flex flex-col items-center" data-v-5d8e85e3><div class="org-line-v lg:h-6 h-0" data-v-5d8e85e3></div><div class="org-node org-node--service w-full" data-v-5d8e85e3><h3 class="org-title" data-v-5d8e85e3>${ssrInterpolate(dir.name)}</h3><p class="org-desc" data-v-5d8e85e3>${ssrInterpolate(dir.description)}</p></div></div>`);
      });
      _push(`<!--]--></div></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/OrgChart.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-5d8e85e3"]]), { __name: "OrgChart" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "organisation",
  __ssrInlineRender: true,
  setup(__props) {
    usePageSeo("organisation");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_OrgChart = __nuxt_component_0;
      const _component_CtaSection = __nuxt_component_1;
      const _component_Footer = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white font-sans" }, _attrs))}><header class="relative min-h-[36vh] sm:min-h-[40vh] flex items-center justify-center text-center overflow-hidden bg-brand-900"><img${ssrRenderAttr("src", _imports_0)} alt="Organisation OXYNOVA" class="absolute inset-0 w-full h-full object-cover opacity-35"><div class="absolute inset-0 bg-brand-900/80"></div><div class="relative z-10 container mx-auto px-4 py-16"><h1 class="text-[36px] sm:text-[56px] font-[900] text-white uppercase tracking-tighter mb-4">Organisation</h1><p class="text-white/70 font-medium max-w-xl mx-auto"> L&#39;entreprise s&#39;articule autour des principales fonctions suivantes. </p></div></header><section class="py-16 sm:py-24 bg-gray-50"><div class="container mx-auto px-4"><div class="text-center mb-10 sm:mb-14 max-w-2xl mx-auto"><span class="text-brand-700 font-[900] uppercase tracking-[0.3em] text-[12px] mb-4 block">Structure</span><h2 class="text-[24px] sm:text-[32px] font-[900] text-[#1a1a1b] uppercase tracking-tighter"> Organigramme </h2></div><div class="bg-white border border-gray-100 rounded-[4px] shadow-sm p-4 sm:p-10 lg:p-14">`);
      _push(ssrRenderComponent(_component_OrgChart, null, null, _parent));
      _push(`</div></div></section>`);
      _push(ssrRenderComponent(_component_CtaSection, null, null, _parent));
      _push(ssrRenderComponent(_component_Footer, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/organisation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=organisation-D9IwDYLq.mjs.map
