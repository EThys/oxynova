import { _ as __nuxt_component_1 } from './CtaSection-CFnA14KG.mjs';
import { _ as __nuxt_component_2 } from './Footer-CsKgmDm_.mjs';
import { defineComponent, withAsyncContext, ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderTeleport, ssrRenderComponent } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { o as oxynovaContent } from './server.mjs';
import { u as useFetch } from './fetch-BwSn-eTT.mjs';
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
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';
import '@vue/shared';

const _imports_0 = publicAssetsURL("/images/team.jpg");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "equipe",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: apiTeam, pending, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/team", {
      key: "public-team",
      default: () => [],
      server: true,
      lazy: false
    }, "$zSFIgHYMHs")), __temp = await __temp, __restore(), __temp);
    const lightbox = ref(null);
    const members = computed(() => {
      const list = apiTeam.value?.length ? [...apiTeam.value] : oxynovaContent.team.map((m, i) => ({
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
      return list.sort((a, b) => a.order - b.order);
    });
    usePageSeo("equipe");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CtaSection = __nuxt_component_1;
      const _component_Footer = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white font-sans" }, _attrs))}><header class="relative min-h-[36vh] sm:min-h-[42vh] flex items-center justify-center text-center overflow-hidden bg-brand-900"><img${ssrRenderAttr("src", _imports_0)} alt="Équipe OXYNOVA" class="absolute inset-0 w-full h-full object-cover opacity-35"><div class="absolute inset-0 bg-brand-900/80"></div><div class="relative z-10 container mx-auto px-4 py-16"><h1 class="text-[36px] sm:text-[56px] font-[900] text-white uppercase tracking-tighter mb-4">Notre Équipe</h1><p class="text-white/70 font-medium max-w-xl mx-auto">L&#39;équipe derrière OXYNOVA RDC</p></div></header><section class="py-16 sm:py-24 lg:py-28 bg-white"><div class="container mx-auto px-4">`);
      if (unref(pending)) {
        _push(`<div class="text-center py-16 text-gray-500 font-medium">Chargement de l&#39;équipe...</div>`);
      } else if (unref(members).length) {
        _push(`<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto"><!--[-->`);
        ssrRenderList(unref(members), (member, i) => {
          _push(`<button type="button" class="group relative aspect-[3/4] overflow-hidden rounded-[2px] shadow-xl bg-brand-900 cursor-zoom-in w-full text-left"><img${ssrRenderAttr("src", member.image)}${ssrRenderAttr("alt", member.name || "Membre de l'équipe OXYNOVA")} class="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"${ssrRenderAttr("loading", i === 0 ? "eager" : "lazy")}><div class="${ssrRenderClass([member.name ? "bg-gradient-to-t from-brand-900/85 via-brand-900/20 to-transparent" : "bg-brand-900/0 group-hover:bg-brand-900/20", "absolute inset-0 transition-colors duration-500"])}"></div>`);
          if (member.name) {
            _push(`<div class="absolute inset-x-0 bottom-0 p-4 sm:p-5">`);
            if (member.role) {
              _push(`<p class="text-brand-300 text-[10px] sm:text-[11px] font-[900] uppercase tracking-[0.18em] mb-1.5">${ssrInterpolate(member.role)}</p>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<p class="text-white text-[14px] sm:text-[16px] font-[900] uppercase tracking-tight leading-snug">${ssrInterpolate(member.name)}</p></div>`);
          } else {
            _push(`<span class="absolute bottom-4 right-4 text-white/90 text-[10px] font-[900] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity"> Agrandir </span>`);
          }
          _push(`</button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-center py-16 text-gray-400 font-medium"> Aucun membre publié pour le moment. </div>`);
      }
      _push(`</div></section>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(lightbox)) {
          _push2(`<div class="fixed inset-0 z-[100] bg-brand-900/92 flex items-center justify-center p-4 sm:p-8"><button type="button" class="absolute top-4 right-4 text-white text-sm font-[900] uppercase tracking-wider hover:text-brand-300"> Fermer </button><img${ssrRenderAttr("src", unref(lightbox))} alt="Membre de l&#39;équipe OXYNOVA" class="max-w-full max-h-[88vh] object-contain rounded-[2px] shadow-2xl"></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/equipe.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=equipe-wqZLcuyg.mjs.map
