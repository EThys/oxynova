import { _ as __nuxt_component_0 } from './nuxt-link-vzZ0EJye.mjs';
import { defineComponent, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
import { o as oxynovaContent } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CtaSection",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "py-16 sm:py-24 lg:py-28 relative overflow-hidden font-sans bg-brand-700" }, _attrs))}><div class="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800"></div><div class="absolute inset-0 opacity-[0.12]"><img${ssrRenderAttr("src", unref(oxynovaContent).images.maintenance)} alt="" class="w-full h-full object-cover"></div><div class="relative z-10 container mx-auto px-4 text-center animate-on-scroll animate-scale"><h2 class="text-[28px] sm:text-[44px] lg:text-[52px] font-[900] text-white uppercase tracking-tighter mb-6 max-w-3xl mx-auto leading-tight"> Un projet santé ? Parlons technique </h2><p class="text-white/80 text-[15px] sm:text-[17px] font-medium max-w-xl mx-auto mb-10"> Étude, installation, formation et maintenance. Un accompagnement fiable, sécurisé et durable. </p><div class="flex flex-col sm:flex-row gap-3 justify-center">`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: "/contact",
        class: "inline-block px-10 sm:px-14 py-4 sm:py-5 bg-white text-brand-800 font-[900] text-[13px] uppercase tracking-[0.1em] hover:bg-brand-50 transition-all rounded-[2px] shadow-xl"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Demander un devis `);
          } else {
            return [
              createTextVNode(" Demander un devis ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<a${ssrRenderAttr("href", `https://wa.me/${unref(oxynovaContent).contact.whatsapp}`)} target="_blank" rel="noopener noreferrer" class="inline-block px-10 sm:px-14 py-4 sm:py-5 border-2 border-white/50 text-white font-[900] text-[13px] uppercase tracking-[0.1em] hover:bg-white/10 transition-all rounded-[2px]"> WhatsApp </a></div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CtaSection.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main, { __name: "CtaSection" });

export { __nuxt_component_1 as _ };
//# sourceMappingURL=CtaSection-CFnA14KG.mjs.map
