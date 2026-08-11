import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { o as oxynovaContent } from './server.mjs';

const _imports_0 = publicAssetsURL("/images/method.jpg");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MethodSection",
  __ssrInlineRender: true,
  setup(__props) {
    const delayClass = ["delay-100", "delay-200", "delay-300", "delay-400", "delay-500"];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "py-16 sm:py-24 lg:py-28 bg-brand-900 font-sans relative overflow-hidden" }, _attrs))}><div class="absolute inset-0"><img${ssrRenderAttr("src", _imports_0)} alt="" class="w-full h-full object-cover object-center"><div class="absolute inset-0 bg-brand-900/85"></div><div class="absolute inset-0 bg-gradient-to-br from-brand-900/90 via-brand-900/75 to-brand-800/70"></div></div><div class="container mx-auto px-4 relative z-10"><div class="text-center mb-12 sm:mb-16 animate-on-scroll"><span class="text-brand-400 font-[900] uppercase tracking-[0.3em] text-[12px] mb-4 block">Méthode</span><h2 class="text-[28px] sm:text-[40px] font-[900] text-white uppercase tracking-tighter">De l&#39;étude à la maintenance</h2><p class="text-white/65 font-medium mt-4 max-w-lg mx-auto">Un accompagnement clair, sans étapes superflues.</p></div><div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5"><!--[-->`);
      ssrRenderList(unref(oxynovaContent).method, (step, i) => {
        _push(`<article class="${ssrRenderClass([delayClass[i], "relative bg-white/5 border border-white/10 p-6 rounded-[4px] backdrop-blur-sm hover:bg-white/10 hover:border-brand-400/40 transition-all duration-300 animate-on-scroll"])}"><span class="text-brand-400 font-[900] text-[28px] leading-none block mb-3">${ssrInterpolate(String(i + 1).padStart(2, "0"))}</span><h3 class="text-[14px] font-[900] text-white uppercase tracking-tight mb-2">${ssrInterpolate(step.title)}</h3><p class="text-white/60 text-[13px] font-medium leading-relaxed">${ssrInterpolate(step.description)}</p></article>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MethodSection.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main, { __name: "MethodSection" });

export { __nuxt_component_0 as _ };
//# sourceMappingURL=MethodSection-BowncMvp.mjs.map
