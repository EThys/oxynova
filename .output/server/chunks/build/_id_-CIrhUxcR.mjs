import { _ as __nuxt_component_0 } from './nuxt-link-vzZ0EJye.mjs';
import { _ as __nuxt_component_1 } from './ImageUpload-DeHxBP6g.mjs';
import { defineComponent, computed, ref, reactive, withAsyncContext, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { R as REALIZATION_DOMAINS } from './admin-C5NtE001.mjs';
import { j as useRoute, u as useHead } from './server.mjs';
import { u as useFetch } from './fetch-BwSn-eTT.mjs';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';
import '@vue/shared';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const isEdit = computed(() => route.params.id !== "new");
    const saving = ref(false);
    const error = ref("");
    const form = reactive({
      partner: "",
      domain: REALIZATION_DOMAINS[0],
      description: "",
      status: "",
      image: "",
      published: true
    });
    if (isEdit.value) {
      const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(`/api/admin/realizations/${route.params.id}`, "$YYBAnh995n")), __temp = await __temp, __restore(), __temp);
      if (data.value) {
        Object.assign(form, {
          partner: data.value.partner,
          domain: data.value.domain,
          description: data.value.description,
          status: data.value.status,
          image: data.value.image,
          published: data.value.published
        });
      }
    }
    useHead({ title: `${isEdit.value ? "Modifier" : "Nouvelle"} réalisation - Admin OXYNOVA RDC SARL` });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_AdminImageUpload = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-869d653c><div class="mb-8" data-v-869d653c>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/realisations",
        class: "text-brand-700 text-sm font-[900] uppercase tracking-wider hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` ← Retour aux réalisations `);
          } else {
            return [
              createTextVNode(" ← Retour aux réalisations ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1 class="text-2xl sm:text-3xl font-[900] text-[#1a1a1b] uppercase tracking-tight mt-4" data-v-869d653c>${ssrInterpolate(unref(isEdit) ? "Modifier la réalisation" : "Nouvelle réalisation")}</h1></div><form class="bg-white rounded-[4px] border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6 max-w-3xl" data-v-869d653c><div class="grid sm:grid-cols-2 gap-6" data-v-869d653c><div class="sm:col-span-2" data-v-869d653c><label class="admin-label" data-v-869d653c>Partenaire / Client *</label><input${ssrRenderAttr("value", unref(form).partner)} type="text" required class="admin-input" placeholder="ex. One Acre Fund (OAF)" data-v-869d653c></div><div data-v-869d653c><label class="admin-label" data-v-869d653c>Domaine *</label><select required class="admin-input" data-v-869d653c><!--[-->`);
      ssrRenderList(unref(REALIZATION_DOMAINS), (d) => {
        _push(`<option${ssrRenderAttr("value", d)} data-v-869d653c${ssrIncludeBooleanAttr(Array.isArray(unref(form).domain) ? ssrLooseContain(unref(form).domain, d) : ssrLooseEqual(unref(form).domain, d)) ? " selected" : ""}>${ssrInterpolate(d)}</option>`);
      });
      _push(`<!--]--></select></div><div data-v-869d653c><label class="admin-label" data-v-869d653c>Statut du projet</label><input${ssrRenderAttr("value", unref(form).status)} type="text" class="admin-input" placeholder="ex. Projet en cours d&#39;exécution" data-v-869d653c></div><div class="sm:col-span-2" data-v-869d653c><label class="admin-label" data-v-869d653c>Description *</label><textarea required rows="4" class="admin-input resize-none" placeholder="Description du projet" data-v-869d653c>${ssrInterpolate(unref(form).description)}</textarea></div><div class="sm:col-span-2" data-v-869d653c>`);
      _push(ssrRenderComponent(_component_AdminImageUpload, {
        modelValue: unref(form).image,
        "onUpdate:modelValue": ($event) => unref(form).image = $event,
        label: "Image",
        hint: "Choisissez une photo depuis votre appareil.",
        "preview-class": "max-h-48 w-full"
      }, null, _parent));
      _push(`</div><div class="sm:col-span-2" data-v-869d653c><label class="flex items-center gap-3 cursor-pointer" data-v-869d653c><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).published) ? ssrLooseContain(unref(form).published, null) : unref(form).published) ? " checked" : ""} type="checkbox" class="w-5 h-5 accent-brand-700 rounded" data-v-869d653c><span class="text-sm font-[900] text-[#1a1a1b] uppercase tracking-wider" data-v-869d653c>Publier sur le site</span></label></div></div>`);
      if (unref(error)) {
        _push(`<p class="text-red-600 text-sm font-medium" data-v-869d653c>${ssrInterpolate(unref(error))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex flex-wrap gap-3 pt-2" data-v-869d653c><button type="submit"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="admin-btn-primary" data-v-869d653c>${ssrInterpolate(unref(saving) ? "Enregistrement..." : unref(isEdit) ? "Mettre à jour" : "Créer la réalisation")}</button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/realisations",
        class: "admin-btn-secondary inline-flex items-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Annuler `);
          } else {
            return [
              createTextVNode(" Annuler ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></form></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/realisations/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-869d653c"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-CIrhUxcR.mjs.map
