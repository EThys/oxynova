import { _ as __nuxt_component_0 } from './nuxt-link-vzZ0EJye.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-3Fh-jQka.mjs';
import { a as useAdminAuth } from './useAdmin-dDaeL6H7.mjs';
import { a as useAdminSeo } from './usePageSeo-dIWm1VtT.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const password = ref("");
    const error = ref("");
    const loading = ref(false);
    useAdminAuth();
    useAdminSeo("Connexion Admin");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-brand-900 flex items-center justify-center px-4" }, _attrs))} data-v-6b2b7ccd><div class="w-full max-w-md" data-v-6b2b7ccd><div class="text-center mb-8" data-v-6b2b7ccd><div class="inline-flex mx-auto mb-4 bg-white rounded-[4px] px-4 py-3 shadow-lg" data-v-6b2b7ccd><img${ssrRenderAttr("src", _imports_0)} alt="OXYNOVA RDC SARL" class="h-14 w-auto object-contain" data-v-6b2b7ccd></div><p class="text-white/60 text-sm font-medium" data-v-6b2b7ccd>Espace d&#39;administration</p></div><form class="bg-white rounded-[4px] p-8 shadow-2xl space-y-6" data-v-6b2b7ccd><div data-v-6b2b7ccd><label class="block text-[12px] font-[900] text-[#1a1a1b] uppercase tracking-widest mb-3" data-v-6b2b7ccd> Mot de passe </label><input${ssrRenderAttr("value", unref(password))} type="password" required autofocus class="admin-input" placeholder="Entrez votre mot de passe" data-v-6b2b7ccd></div>`);
      if (unref(error)) {
        _push(`<p class="text-red-600 text-sm font-medium" data-v-6b2b7ccd>${ssrInterpolate(unref(error))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="w-full py-4 bg-brand-700 text-white font-[900] text-[13px] uppercase tracking-wider hover:bg-brand-800 transition-colors rounded-[2px] disabled:opacity-50" data-v-6b2b7ccd>${ssrInterpolate(unref(loading) ? "Connexion..." : "Se connecter")}</button></form><p class="text-center mt-6" data-v-6b2b7ccd>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-white/50 text-sm hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` â† Retour au site public `);
          } else {
            return [
              createTextVNode(" â† Retour au site public ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6b2b7ccd"]]);

export { login as default };
//# sourceMappingURL=login-B7OFht3V.mjs.map
