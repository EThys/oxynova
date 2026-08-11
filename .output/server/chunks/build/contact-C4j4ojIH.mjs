import { _ as __nuxt_component_2 } from './Footer-CsKgmDm_.mjs';
import { defineComponent, reactive, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc, o as oxynovaContent } from './server.mjs';
import { C as CONTACT_SUBJECTS } from './admin-C5NtE001.mjs';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "contact",
  __ssrInlineRender: true,
  setup(__props) {
    const form = reactive({
      name: "",
      company: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
    const submitting = ref(false);
    const success = ref(false);
    const error = ref("");
    usePageSeo("contact");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Footer = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white font-sans overflow-hidden" }, _attrs))} data-v-cc8f3754><header class="relative min-h-[40vh] flex items-center justify-center text-center overflow-hidden bg-brand-900" data-v-cc8f3754><img${ssrRenderAttr("src", unref(oxynovaContent).images.maintenance)} alt="Contact OXYNOVA" class="absolute inset-0 w-full h-full object-cover opacity-40" data-v-cc8f3754><div class="absolute inset-0 bg-brand-900/75" data-v-cc8f3754></div><div class="relative z-10 container mx-auto px-4 py-16" data-v-cc8f3754><h1 class="text-[36px] sm:text-[56px] font-[900] text-white uppercase tracking-tighter mb-4" data-v-cc8f3754>Contact</h1><p class="text-white/70 font-medium" data-v-cc8f3754>Parlons de votre projet santé</p></div></header><section class="py-16 sm:py-24 container mx-auto px-4" data-v-cc8f3754><div class="grid lg:grid-cols-2 gap-12 lg:gap-20" data-v-cc8f3754><div data-v-cc8f3754><h2 class="text-[28px] font-[900] uppercase tracking-tight mb-8" data-v-cc8f3754>Coordonnées</h2><div class="space-y-8" data-v-cc8f3754><div data-v-cc8f3754><h3 class="text-[12px] font-[900] uppercase tracking-widest text-brand-700 mb-2" data-v-cc8f3754>Siège</h3><p class="text-gray-600 font-medium" data-v-cc8f3754>${ssrInterpolate(unref(oxynovaContent).headquarters)}</p></div><div data-v-cc8f3754><h3 class="text-[12px] font-[900] uppercase tracking-widest text-brand-700 mb-2" data-v-cc8f3754>Identifiants</h3><p class="text-gray-600 font-medium text-[14px]" data-v-cc8f3754>N° R.C.C.M. : ${ssrInterpolate(unref(oxynovaContent).legal.rccm)}</p><p class="text-gray-600 font-medium text-[14px] mt-1" data-v-cc8f3754>N° ID NAT : ${ssrInterpolate(unref(oxynovaContent).legal.idNat)}</p><p class="text-gray-600 font-medium text-[14px] mt-1" data-v-cc8f3754>N° Impôt : ${ssrInterpolate(unref(oxynovaContent).legal.taxId)}</p></div><div data-v-cc8f3754><h3 class="text-[12px] font-[900] uppercase tracking-widest text-brand-700 mb-2" data-v-cc8f3754>Email</h3><a${ssrRenderAttr("href", `mailto:${unref(oxynovaContent).contact.email}`)} class="text-brand-700 font-bold hover:underline" data-v-cc8f3754>${ssrInterpolate(unref(oxynovaContent).contact.email)}</a></div><div data-v-cc8f3754><h3 class="text-[12px] font-[900] uppercase tracking-widest text-brand-700 mb-2" data-v-cc8f3754>Téléphone</h3><p class="text-brand-700 font-bold" data-v-cc8f3754><a${ssrRenderAttr("href", `tel:${unref(oxynovaContent).contact.phone.replace(/\s/g, "")}`)} class="hover:underline" data-v-cc8f3754>${ssrInterpolate(unref(oxynovaContent).contact.phone)}</a></p><p class="text-brand-700 font-bold mt-1" data-v-cc8f3754><a${ssrRenderAttr("href", `tel:${unref(oxynovaContent).contact.phoneAlt.replace(/\s/g, "")}`)} class="hover:underline" data-v-cc8f3754>${ssrInterpolate(unref(oxynovaContent).contact.phoneAlt)}</a></p></div><div data-v-cc8f3754><h3 class="text-[12px] font-[900] uppercase tracking-widest text-brand-700 mb-2" data-v-cc8f3754>Horaires</h3><p class="text-gray-600 font-medium" data-v-cc8f3754>${ssrInterpolate(unref(oxynovaContent).hours.weekdays)}</p>`);
      if (unref(oxynovaContent).hours.saturday) {
        _push(`<p class="text-gray-600 font-medium" data-v-cc8f3754>${ssrInterpolate(unref(oxynovaContent).hours.saturday)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><a${ssrRenderAttr("href", `https://wa.me/${unref(oxynovaContent).contact.whatsapp}`)} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-[900] text-[12px] uppercase tracking-wider rounded-[2px] hover:opacity-90 transition-opacity" data-v-cc8f3754> WhatsApp </a></div></div><form class="space-y-5 bg-gray-50 p-8 sm:p-10 rounded-[4px] border border-gray-100" data-v-cc8f3754>`);
      if (unref(success)) {
        _push(`<div class="p-4 bg-green-50 border border-green-200 rounded-[2px] text-green-800 text-sm font-medium" data-v-cc8f3754> Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais. </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div data-v-cc8f3754><label class="form-label" data-v-cc8f3754>Nom complet *</label><input${ssrRenderAttr("value", unref(form).name)} type="text" required class="form-input" placeholder="Votre nom" data-v-cc8f3754></div><div data-v-cc8f3754><label class="form-label" data-v-cc8f3754>Organisation</label><input${ssrRenderAttr("value", unref(form).company)} type="text" class="form-input" placeholder="Hôpital, clinique, institution…" data-v-cc8f3754></div><div data-v-cc8f3754><label class="form-label" data-v-cc8f3754>Email *</label><input${ssrRenderAttr("value", unref(form).email)} type="email" required class="form-input" placeholder="votre@email.com" data-v-cc8f3754></div><div data-v-cc8f3754><label class="form-label" data-v-cc8f3754>Téléphone</label><input${ssrRenderAttr("value", unref(form).phone)} type="tel" class="form-input" placeholder="+243 ..." data-v-cc8f3754></div><div data-v-cc8f3754><label class="form-label" data-v-cc8f3754>Service recherché *</label><select required class="form-input" data-v-cc8f3754><option value="" data-v-cc8f3754${ssrIncludeBooleanAttr(Array.isArray(unref(form).subject) ? ssrLooseContain(unref(form).subject, "") : ssrLooseEqual(unref(form).subject, "")) ? " selected" : ""}>Sélectionnez</option><!--[-->`);
      ssrRenderList(unref(CONTACT_SUBJECTS), (label, key) => {
        _push(`<option${ssrRenderAttr("value", key)} data-v-cc8f3754${ssrIncludeBooleanAttr(Array.isArray(unref(form).subject) ? ssrLooseContain(unref(form).subject, key) : ssrLooseEqual(unref(form).subject, key)) ? " selected" : ""}>${ssrInterpolate(label)}</option>`);
      });
      _push(`<!--]--></select></div><div data-v-cc8f3754><label class="form-label" data-v-cc8f3754>Message *</label><textarea required rows="5" class="form-input resize-none" placeholder="Décrivez votre besoin..." data-v-cc8f3754>${ssrInterpolate(unref(form).message)}</textarea></div>`);
      if (unref(error)) {
        _push(`<p class="text-red-600 text-sm font-medium" data-v-cc8f3754>${ssrInterpolate(unref(error))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(submitting)) ? " disabled" : ""} class="w-full py-4 bg-brand-700 text-white font-[900] text-[13px] uppercase tracking-wider hover:bg-brand-800 transition-colors rounded-[2px] disabled:opacity-50" data-v-cc8f3754>${ssrInterpolate(unref(submitting) ? "Envoi en cours..." : "Envoyer la demande")}</button></form></div></section>`);
      _push(ssrRenderComponent(_component_Footer, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const contact = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cc8f3754"]]);

export { contact as default };
//# sourceMappingURL=contact-C4j4ojIH.mjs.map
