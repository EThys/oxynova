import { _ as __nuxt_component_0 } from './nuxt-link-vzZ0EJye.mjs';
import { defineComponent, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { o as oxynovaContent } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-white text-[#1a1a1b] pt-16 sm:pt-24 pb-8 sm:pb-12 font-sans border-t border-gray-100" }, _attrs))}><div class="container mx-auto px-4"><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16 mb-12 sm:mb-20"><div class="space-y-6 sm:col-span-2 lg:col-span-1"><div class="flex items-center gap-3"><img${ssrRenderAttr("src", unref(oxynovaContent).images.logo)} alt="OXYNOVA RDC SARL" class="h-12 w-auto max-w-[11rem] object-contain"></div><p class="text-gray-500 text-[14px] leading-relaxed font-medium max-w-xs">${ssrInterpolate(unref(oxynovaContent).slogan)}</p><ul class="text-gray-400 text-[11px] font-medium space-y-1 max-w-xs leading-relaxed"><li>N° R.C.C.M. : ${ssrInterpolate(unref(oxynovaContent).legal.rccm)}</li><li>N° ID NAT : ${ssrInterpolate(unref(oxynovaContent).legal.idNat)}</li><li>N° Impôt : ${ssrInterpolate(unref(oxynovaContent).legal.taxId)}</li></ul></div><div><h4 class="text-[13px] font-[900] mb-6 uppercase tracking-[0.2em] text-[#1a1a1b]">Navigation</h4><ul class="space-y-3 text-gray-500 font-medium text-[14px]"><li>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: "/",
        class: "hover:text-brand-700 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Accueil`);
          } else {
            return [
              createTextVNode("Accueil")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: "/about",
        class: "hover:text-brand-700 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`À propos`);
          } else {
            return [
              createTextVNode("À propos")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: "/services",
        class: "hover:text-brand-700 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Services`);
          } else {
            return [
              createTextVNode("Services")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: "/organisation",
        class: "hover:text-brand-700 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Organisation`);
          } else {
            return [
              createTextVNode("Organisation")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: "/equipe",
        class: "hover:text-brand-700 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Équipe`);
          } else {
            return [
              createTextVNode("Équipe")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: "/medias",
        class: "hover:text-brand-700 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Médias`);
          } else {
            return [
              createTextVNode("Médias")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: "/contact",
        class: "hover:text-brand-700 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Contact`);
          } else {
            return [
              createTextVNode("Contact")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div><div><h4 class="text-[13px] font-[900] mb-6 uppercase tracking-[0.2em] text-[#1a1a1b]">Contact</h4><ul class="space-y-4 text-gray-500 font-medium text-[14px]"><li>${ssrInterpolate(unref(oxynovaContent).contact.address)}</li><li><a${ssrRenderAttr("href", `mailto:${unref(oxynovaContent).contact.email}`)} class="text-brand-700 font-bold hover:underline">${ssrInterpolate(unref(oxynovaContent).contact.email)}</a></li><li><a${ssrRenderAttr("href", `tel:${unref(oxynovaContent).contact.phone.replace(/\s/g, "")}`)} class="text-brand-700 font-bold hover:underline">${ssrInterpolate(unref(oxynovaContent).contact.phone)}</a></li><li><a${ssrRenderAttr("href", `tel:${unref(oxynovaContent).contact.phoneAlt.replace(/\s/g, "")}`)} class="text-brand-700 font-bold hover:underline">${ssrInterpolate(unref(oxynovaContent).contact.phoneAlt)}</a></li></ul></div><div><h4 class="text-[13px] font-[900] mb-6 uppercase tracking-[0.2em] text-[#1a1a1b]">Horaires</h4><p class="text-gray-500 text-[14px] font-medium">${ssrInterpolate(unref(oxynovaContent).hours.weekdays)}</p>`);
      if (unref(oxynovaContent).hours.saturday) {
        _push(`<p class="text-gray-500 text-[14px] font-medium mt-2">${ssrInterpolate(unref(oxynovaContent).hours.saturday)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<a${ssrRenderAttr("href", `https://wa.me/${unref(oxynovaContent).contact.whatsapp}`)} target="_blank" rel="noopener noreferrer" class="inline-block mt-6 text-brand-700 font-[900] text-[12px] uppercase tracking-wider hover:text-brand-600"> WhatsApp → </a></div></div><div class="border-t border-gray-100 pt-8 pb-2 pr-16 sm:pr-20 flex flex-col md:flex-row justify-between items-center text-gray-400 text-[11px] sm:text-[13px] font-bold uppercase tracking-widest gap-3 text-center md:text-left"><p>© ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} OXYNOVA RDC SARL. Tous droits réservés.</p><p> Développé par <a href="https://ethberg-muzola.vercel.app/" target="_blank" rel="noopener noreferrer" class="text-brand-700 font-[900] underline underline-offset-4 decoration-brand-700/40 hover:text-brand-600 transition-colors"> Ethberg </a></p></div></div></footer>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main, { __name: "Footer" });

export { __nuxt_component_2 as _ };
//# sourceMappingURL=Footer-CsKgmDm_.mjs.map
