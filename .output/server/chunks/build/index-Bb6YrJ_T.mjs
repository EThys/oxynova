import { _ as __nuxt_component_0$2 } from './nuxt-link-vzZ0EJye.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, unref, ref, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderTeleport } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { o as oxynovaContent } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './MethodSection-BowncMvp.mjs';
import { u as useFetch } from './fetch-BwSn-eTT.mjs';
import { _ as __nuxt_component_1$1 } from './CtaSection-CFnA14KG.mjs';
import { _ as __nuxt_component_2$1 } from './Footer-CsKgmDm_.mjs';
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
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';
import '@vue/shared';

const _imports_0 = publicAssetsURL("/images/about-one.jpg");
const _sfc_main$6 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_nuxt_link = __nuxt_component_0$2;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative min-h-[75vh] sm:min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-x-hidden bg-brand-900 font-sans" }, _attrs))}><div class="absolute inset-0 z-0 bg-brand-900"><img${ssrRenderAttr("src", _imports_0)} alt="Centrale oxygène médical PSA — OXYNOVA RDC SARL" width="1600" height="1067" fetchpriority="high" decoding="sync" class="absolute inset-0 w-full h-full object-cover object-center"><div class="absolute inset-0 bg-brand-900/55 sm:bg-gradient-to-r sm:from-brand-900/85 sm:via-brand-900/55 sm:to-brand-900/25"></div></div><div class="relative z-10 container mx-auto px-4 pt-16 sm:pt-20 pb-36 sm:pb-40 md:pb-44"><div class="max-w-4xl text-left"><h1 class="text-[32px] sm:text-[48px] md:text-[68px] lg:text-[76px] font-[900] text-white mb-6 sm:mb-10 leading-[1] sm:leading-[0.95] tracking-tighter animate-fade-in-up uppercase drop-shadow-lg"> OXYNOVA<br> RDC SARL </h1><p class="text-[15px] sm:text-[17px] text-white/85 mb-8 sm:mb-14 max-w-xl leading-relaxed animate-fade-in-up delay-200 font-medium drop-shadow"> Solutions complètes en ingénierie biomédicale : oxygène médical, équipements, infrastructures hospitalières et maintenance professionnelle. </p><div class="relative z-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 animate-fade-in-up delay-300"><a href="#services" class="w-full sm:w-auto text-center px-8 sm:px-12 py-4 sm:py-5 bg-brand-600 text-white font-[900] text-[13px] sm:text-[14px] tracking-[0.1em] hover:bg-brand-700 hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(47,125,225,0.5)] transition-all shadow-2xl uppercase rounded-[2px]"> Nos expertises </a>`);
  _push(ssrRenderComponent(_component_nuxt_link, {
    to: "/contact",
    class: "w-full sm:w-auto text-center px-8 sm:px-12 py-4 sm:py-5 border-2 border-white/30 text-white font-[900] text-[13px] sm:text-[14px] tracking-[0.1em] hover:bg-white/10 hover:-translate-y-1 transition-all uppercase rounded-[2px]"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Nous contacter `);
      } else {
        return [
          createTextVNode(" Nous contacter ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div></div>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Hero.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender]]), { __name: "Hero" });
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "FeatureStrip",
  __ssrInlineRender: true,
  setup(__props) {
    const icons = {
      biomedical: '<svg class="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/><path d="M12 8v8m-4-4h8"/></svg>',
      oxygen: '<svg class="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>',
      digital: '<svg class="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
      training: '<svg class="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>'
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "services",
        class: "relative z-20 -mt-10 sm:-mt-16 md:-mt-20 container mx-auto px-4 font-sans animate-on-scroll animate-scale delay-200"
      }, _attrs))}><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 bg-brand-700 shadow-[0_20px_60px_-15px_rgba(23,71,148,0.45)] text-white rounded-[4px] overflow-hidden"><!--[-->`);
      ssrRenderList(unref(oxynovaContent).domains, (domain, index) => {
        _push(`<div class="${ssrRenderClass([{
          "sm:border-r sm:border-white/10": index % 2 === 0 && index < unref(oxynovaContent).domains.length - 1,
          "lg:border-r": index < unref(oxynovaContent).domains.length - 1
        }, "p-8 sm:p-10 lg:p-12 border-b lg:border-b-0 border-white/10 hover:bg-white/10 transition-all duration-500 group text-center card-hover-dark"])}"><div class="mb-6 flex justify-center text-white/90 group-hover:scale-110 transition-transform duration-500">${icons[domain.icon] ?? ""}</div><h3 class="text-[16px] sm:text-[18px] font-[800] mb-3 uppercase tracking-tight">${ssrInterpolate(domain.name)}</h3><p class="text-white/70 text-[13px] leading-relaxed max-w-[220px] mx-auto">${ssrInterpolate(domain.description)}</p></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FeatureStrip.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$5, { __name: "FeatureStrip" });
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "About",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$2;
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "about",
        class: "py-16 sm:py-24 lg:py-32 bg-white font-sans"
      }, _attrs))}><div class="container mx-auto px-4"><div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"><div class="relative animate-on-scroll animate-left"><div class="rounded-[2px] overflow-hidden shadow-2xl"><img${ssrRenderAttr("src", unref(oxynovaContent).images.oxygenPlant)} alt="OXYNOVA RDC — Partenaire technique" class="w-full h-[320px] sm:h-[420px] object-cover object-center"></div><div class="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-8 bg-white p-2 sm:p-3 rounded-[2px] shadow-xl hidden sm:block card-hover-accent animate-float"><img${ssrRenderAttr("src", unref(oxynovaContent).images.logo)} alt="OXYNOVA" class="h-12 sm:h-14 w-auto object-contain"></div></div><div class="animate-on-scroll animate-right delay-200"><span class="text-brand-700 font-[900] uppercase tracking-[0.3em] text-[11px] sm:text-[12px] mb-4 block">Qui sommes-nous</span><h2 class="text-[28px] sm:text-[40px] lg:text-[48px] font-[900] text-[#1a1a1b] leading-[1.05] tracking-tighter uppercase mb-6"> Partenaire technique<br>des structures de santé </h2><p class="text-gray-500 text-[15px] sm:text-[16px] leading-relaxed font-medium mb-6">${ssrInterpolate(unref(oxynovaContent).description)}</p><p class="text-gray-500 text-[15px] leading-relaxed font-medium mb-8">${ssrInterpolate(unref(oxynovaContent).positioning)} Siège à Kinshasa : ${ssrInterpolate(unref(oxynovaContent).headquarters)}. </p>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: "/about",
        class: "inline-block px-8 py-4 bg-brand-700 text-white font-[900] text-[12px] uppercase tracking-wider hover:bg-brand-800 transition-colors rounded-[2px]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` En savoir plus `);
          } else {
            return [
              createTextVNode(" En savoir plus ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></section>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/About.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$4, { __name: "About" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "MissionSection",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "py-16 sm:py-24 lg:py-32 bg-gray-50 font-sans" }, _attrs))}><div class="container mx-auto px-4"><div class="text-center mb-12 sm:mb-16 animate-on-scroll"><span class="text-brand-700 font-[900] uppercase tracking-[0.3em] text-[12px] mb-4 block">Notre ambition</span><h2 class="text-[28px] sm:text-[40px] font-[900] text-[#1a1a1b] uppercase tracking-tighter">Vision &amp; Mission</h2></div><div class="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto"><article class="group bg-brand-700 p-8 sm:p-10 rounded-[4px] text-white shadow-lg card-hover-accent animate-on-scroll delay-100"><span class="text-brand-100 text-[11px] font-[900] uppercase tracking-widest mb-4 block">Vision</span><p class="text-white/85 text-[15px] leading-relaxed font-medium">${ssrInterpolate(unref(oxynovaContent).vision)}</p></article><article class="group bg-white p-8 sm:p-10 rounded-[4px] border border-gray-100 shadow-sm card-hover animate-on-scroll delay-200"><span class="text-brand-600 text-[11px] font-[900] uppercase tracking-widest mb-4 block">Mission</span><p class="text-gray-600 text-[15px] leading-relaxed font-medium">${ssrInterpolate(unref(oxynovaContent).mission)}</p></article></div></div></section>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MissionSection.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$3, { __name: "MissionSection" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ServicesSection",
  __ssrInlineRender: true,
  setup(__props) {
    const previewServices = oxynovaContent.services.slice(0, 3);
    const delayClass = ["delay-100", "delay-200", "delay-300"];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$2;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "py-16 sm:py-24 lg:py-32 bg-white font-sans" }, _attrs))}><div class="container mx-auto px-4"><div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 animate-on-scroll"><div><span class="text-brand-700 font-[900] uppercase tracking-[0.3em] text-[12px] mb-4 block">Expertise</span><h2 class="text-[28px] sm:text-[40px] font-[900] text-[#1a1a1b] uppercase tracking-tighter">Nos services</h2></div>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: "/services",
        class: "text-brand-700 font-[900] text-[12px] uppercase tracking-wider hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Voir tous les services `);
          } else {
            return [
              createTextVNode(" Voir tous les services ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"><!--[-->`);
      ssrRenderList(unref(previewServices), (service, i) => {
        _push(`<article class="${ssrRenderClass([delayClass[i], "group p-6 sm:p-8 bg-brand-50 border border-brand-100 rounded-[4px] card-hover animate-on-scroll animate-scale"])}"><div class="card-icon w-10 h-10 bg-brand-700 text-white rounded-[2px] flex items-center justify-center font-[900] text-sm mb-4">${ssrInterpolate(String(i + 1).padStart(2, "0"))}</div><h3 class="text-[16px] font-[900] text-[#1a1a1b] uppercase tracking-tight mb-2">${ssrInterpolate(service.title)}</h3><p class="text-gray-500 text-[14px] leading-relaxed font-medium">${ssrInterpolate(service.description)}</p></article>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ServicesSection.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_4 = Object.assign(_sfc_main$2, { __name: "ServicesSection" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TeamSection",
  __ssrInlineRender: true,
  setup(__props) {
    const { data: apiTeam, refresh } = useFetch("/api/team", {
      key: "public-team",
      default: () => [],
      server: true,
      lazy: true
    }, "$FnZSwrj4jI");
    const lightbox = ref(null);
    const fallback = oxynovaContent.team.map((m, i) => ({
      id: `fallback-${i}`,
      name: m.name,
      role: m.role,
      department: m.department,
      bio: m.bio,
      image: m.image,
      published: true,
      order: i,
      createdAt: "",
      updatedAt: ""
    }));
    const preview = computed(() => {
      const list = (apiTeam.value?.length ? apiTeam.value : fallback).slice().sort((a, b) => a.order - b.order);
      return list.slice(0, 3);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$2;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "py-16 sm:py-24 lg:py-32 bg-gray-50 font-sans" }, _attrs))} data-v-2be1539c><div class="container mx-auto px-4" data-v-2be1539c><div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 sm:mb-14" data-v-2be1539c><div data-v-2be1539c><span class="text-brand-700 font-[900] uppercase tracking-[0.3em] text-[12px] mb-4 block" data-v-2be1539c>Humain</span><h2 class="text-[28px] sm:text-[40px] font-[900] text-[#1a1a1b] uppercase tracking-tighter" data-v-2be1539c>Notre équipe</h2></div>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: "/equipe",
        class: "text-brand-700 font-[900] text-[12px] uppercase tracking-wider hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Voir toute l&#39;équipe `);
          } else {
            return [
              createTextVNode(" Voir toute l'équipe ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(preview).length) {
        _push(`<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto" data-v-2be1539c><!--[-->`);
        ssrRenderList(unref(preview), (member, i) => {
          _push(`<button type="button" class="group relative block aspect-[3/4] overflow-hidden rounded-[4px] shadow-[0_12px_40px_-16px_rgba(3,26,58,0.35)] ring-1 ring-brand-900/5 team-card-enter text-left cursor-zoom-in w-full" style="${ssrRenderStyle({ animationDelay: `${i * 90}ms` })}" data-v-2be1539c><img${ssrRenderAttr("src", member.image)}${ssrRenderAttr("alt", member.name || "Membre de l'équipe OXYNOVA")} class="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110" loading="lazy" data-v-2be1539c><div class="${ssrRenderClass([member.name ? "bg-gradient-to-t from-brand-900/85 via-brand-900/20 to-transparent" : "bg-brand-900/0 group-hover:bg-brand-900/20", "absolute inset-0 transition-colors duration-500"])}" data-v-2be1539c></div>`);
          if (member.name) {
            _push(`<div class="absolute inset-x-0 bottom-0 p-4 sm:p-5" data-v-2be1539c>`);
            if (member.role) {
              _push(`<p class="text-brand-300 text-[10px] sm:text-[11px] font-[900] uppercase tracking-[0.18em] mb-1.5" data-v-2be1539c>${ssrInterpolate(member.role)}</p>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<p class="text-white text-[14px] sm:text-[15px] font-[900] uppercase tracking-tight leading-snug" data-v-2be1539c>${ssrInterpolate(member.name)}</p></div>`);
          } else {
            _push(`<span class="absolute bottom-4 right-4 text-white/90 text-[10px] font-[900] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity" data-v-2be1539c> Agrandir </span>`);
          }
          _push(`</button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-center py-10 text-gray-400 font-medium text-sm" data-v-2be1539c> L&#39;équipe sera bientôt présentée ici. </div>`);
      }
      _push(`</div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(lightbox)) {
          _push2(`<div class="fixed inset-0 z-[100] bg-brand-900/92 flex items-center justify-center p-4 sm:p-8" data-v-2be1539c><button type="button" class="absolute top-4 right-4 text-white text-sm font-[900] uppercase tracking-wider hover:text-brand-300" data-v-2be1539c> Fermer </button><img${ssrRenderAttr("src", unref(lightbox))} alt="Membre de l&#39;équipe OXYNOVA" class="max-w-full max-h-[88vh] object-contain rounded-[2px] shadow-2xl" data-v-2be1539c></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TeamSection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-2be1539c"]]), { __name: "TeamSection" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    usePageSeo("home");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Hero = __nuxt_component_0;
      const _component_FeatureStrip = __nuxt_component_1;
      const _component_About = __nuxt_component_2;
      const _component_MissionSection = __nuxt_component_3;
      const _component_ServicesSection = __nuxt_component_4;
      const _component_MethodSection = __nuxt_component_0$1;
      const _component_TeamSection = __nuxt_component_6;
      const _component_CtaSection = __nuxt_component_1$1;
      const _component_Footer = __nuxt_component_2$1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_Hero, null, null, _parent));
      _push(ssrRenderComponent(_component_FeatureStrip, null, null, _parent));
      _push(ssrRenderComponent(_component_About, null, null, _parent));
      _push(ssrRenderComponent(_component_MissionSection, null, null, _parent));
      _push(ssrRenderComponent(_component_ServicesSection, null, null, _parent));
      _push(ssrRenderComponent(_component_MethodSection, null, null, _parent));
      _push(ssrRenderComponent(_component_TeamSection, null, null, _parent));
      _push(ssrRenderComponent(_component_CtaSection, null, null, _parent));
      _push(ssrRenderComponent(_component_Footer, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Bb6YrJ_T.mjs.map
