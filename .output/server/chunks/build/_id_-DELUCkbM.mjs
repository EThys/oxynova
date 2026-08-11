import { _ as __nuxt_component_0 } from './nuxt-link-vzZ0EJye.mjs';
import { _ as __nuxt_component_1 } from './ImageUpload-DeHxBP6g.mjs';
import { defineComponent, computed, ref, reactive, withAsyncContext, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
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
      name: "",
      role: "",
      department: "",
      bio: "",
      image: "",
      published: true,
      order: 0
    });
    if (isEdit.value) {
      const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(`/api/admin/team/${route.params.id}`, "$_z3mvxj0CA")), __temp = await __temp, __restore(), __temp);
      if (data.value) {
        Object.assign(form, {
          name: data.value.name,
          role: data.value.role,
          department: data.value.department,
          bio: data.value.bio,
          image: data.value.image,
          published: data.value.published,
          order: data.value.order
        });
      }
    }
    useHead({ title: `${isEdit.value ? "Modifier" : "Nouveau"} membre - Admin OXYNOVA` });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_AdminImageUpload = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-5aebe51d><div class="mb-8" data-v-5aebe51d>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/equipe",
        class: "text-brand-700 text-sm font-[900] uppercase tracking-wider hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`← Retour`);
          } else {
            return [
              createTextVNode("← Retour")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1 class="text-2xl sm:text-3xl font-[900] text-[#1a1a1b] uppercase tracking-tight mt-4" data-v-5aebe51d>${ssrInterpolate(unref(isEdit) ? "Modifier le membre" : "Nouveau membre")}</h1></div><form class="bg-white rounded-[4px] border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6 max-w-3xl" data-v-5aebe51d><div class="grid sm:grid-cols-2 gap-6" data-v-5aebe51d><div data-v-5aebe51d><label class="admin-label" data-v-5aebe51d>Nom *</label><input${ssrRenderAttr("value", unref(form).name)} type="text" required class="admin-input" placeholder="Nom complet ou libellé d&#39;équipe" data-v-5aebe51d></div><div data-v-5aebe51d><label class="admin-label" data-v-5aebe51d>Rôle *</label><input${ssrRenderAttr("value", unref(form).role)} type="text" required class="admin-input" placeholder="ex. Ingénieur biomédical" data-v-5aebe51d></div><div data-v-5aebe51d><label class="admin-label" data-v-5aebe51d>Département</label><input${ssrRenderAttr("value", unref(form).department)} type="text" class="admin-input" placeholder="ex. Ingénierie biomédicale" data-v-5aebe51d></div><div data-v-5aebe51d><label class="admin-label" data-v-5aebe51d>Ordre d&#39;affichage</label><input${ssrRenderAttr("value", unref(form).order)} type="number" min="0" class="admin-input" data-v-5aebe51d></div><div class="sm:col-span-2" data-v-5aebe51d><label class="admin-label" data-v-5aebe51d>Bio</label><textarea rows="3" class="admin-input resize-none" placeholder="Courte présentation" data-v-5aebe51d>${ssrInterpolate(unref(form).bio)}</textarea></div><div class="sm:col-span-2" data-v-5aebe51d>`);
      _push(ssrRenderComponent(_component_AdminImageUpload, {
        modelValue: unref(form).image,
        "onUpdate:modelValue": ($event) => unref(form).image = $event,
        label: "Photo",
        required: "",
        hint: "Photo portrait recommandée (format vertical).",
        "preview-class": "aspect-[3/4] max-h-80 object-top mx-auto w-auto sm:w-48"
      }, null, _parent));
      _push(`</div><div class="sm:col-span-2" data-v-5aebe51d><label class="flex items-center gap-3 cursor-pointer" data-v-5aebe51d><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).published) ? ssrLooseContain(unref(form).published, null) : unref(form).published) ? " checked" : ""} type="checkbox" class="w-5 h-5 accent-brand-700" data-v-5aebe51d><span class="text-sm font-[900] text-[#1a1a1b] uppercase tracking-wider" data-v-5aebe51d>Publier sur le site</span></label></div></div>`);
      if (unref(error)) {
        _push(`<p class="text-red-600 text-sm font-medium" data-v-5aebe51d>${ssrInterpolate(unref(error))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex flex-wrap gap-3" data-v-5aebe51d><button type="submit"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="admin-btn-primary" data-v-5aebe51d>${ssrInterpolate(unref(saving) ? "Enregistrement..." : unref(isEdit) ? "Mettre à jour" : "Créer")}</button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/equipe",
        class: "admin-btn-secondary inline-flex items-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Annuler`);
          } else {
            return [
              createTextVNode("Annuler")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/equipe/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5aebe51d"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-DELUCkbM.mjs.map
