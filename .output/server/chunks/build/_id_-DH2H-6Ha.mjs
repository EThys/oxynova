import { _ as __nuxt_component_0 } from './nuxt-link-vzZ0EJye.mjs';
import { defineComponent, computed, ref, reactive, withAsyncContext, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
import { e as extractYoutubeId } from './admin-C5NtE001.mjs';
import { _ as _export_sfc, l as useRoute, u as useHead } from './server.mjs';
import { u as useFetch } from './fetch-BEgLTeJq.mjs';
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
      title: "",
      description: "",
      youtubeUrl: "",
      published: true,
      order: 0
    });
    const previewId = computed(() => extractYoutubeId(form.youtubeUrl));
    if (isEdit.value) {
      const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(`/api/admin/videos/${route.params.id}`, "$xV6PGAP9FP")), __temp = await __temp, __restore(), __temp);
      if (data.value) {
        Object.assign(form, {
          title: data.value.title,
          description: data.value.description,
          youtubeUrl: data.value.youtubeUrl,
          published: data.value.published,
          order: data.value.order
        });
      }
    }
    useHead({ title: `${isEdit.value ? "Modifier" : "Nouvelle"} vidéo - Admin OXYNOVA` });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-f43653b8><div class="mb-8" data-v-f43653b8>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/videos",
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
      _push(`<h1 class="text-2xl sm:text-3xl font-[900] text-[#1a1a1b] uppercase tracking-tight mt-4" data-v-f43653b8>${ssrInterpolate(unref(isEdit) ? "Modifier la vidéo" : "Nouvelle vidéo")}</h1></div><form class="bg-white rounded-[4px] border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6 max-w-3xl" data-v-f43653b8><div class="space-y-6" data-v-f43653b8><div data-v-f43653b8><label class="admin-label" data-v-f43653b8>Titre *</label><input${ssrRenderAttr("value", unref(form).title)} type="text" required class="admin-input" placeholder="Titre de la vidéo" data-v-f43653b8></div><div data-v-f43653b8><label class="admin-label" data-v-f43653b8>Lien YouTube *</label><input${ssrRenderAttr("value", unref(form).youtubeUrl)} type="url" required class="admin-input" placeholder="https://www.youtube.com/watch?v=... ou youtu.be/..." data-v-f43653b8><p class="text-gray-400 text-xs font-medium mt-2" data-v-f43653b8>Collez le lien complet ; la vidéo sera intégrée et lisible sur le site.</p></div><div data-v-f43653b8><label class="admin-label" data-v-f43653b8>Description</label><textarea rows="3" class="admin-input resize-none" placeholder="Court descriptif" data-v-f43653b8>${ssrInterpolate(unref(form).description)}</textarea></div><div data-v-f43653b8><label class="admin-label" data-v-f43653b8>Ordre</label><input${ssrRenderAttr("value", unref(form).order)} type="number" min="0" class="admin-input max-w-[160px]" data-v-f43653b8></div>`);
      if (unref(previewId)) {
        _push(`<div class="aspect-video rounded-[2px] overflow-hidden border border-gray-100 bg-black" data-v-f43653b8><iframe class="w-full h-full"${ssrRenderAttr("src", `https://www.youtube-nocookie.com/embed/${unref(previewId)}`)} title="Aperçu YouTube" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen data-v-f43653b8></iframe></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<label class="flex items-center gap-3 cursor-pointer" data-v-f43653b8><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).published) ? ssrLooseContain(unref(form).published, null) : unref(form).published) ? " checked" : ""} type="checkbox" class="w-5 h-5 accent-brand-700" data-v-f43653b8><span class="text-sm font-[900] text-[#1a1a1b] uppercase tracking-wider" data-v-f43653b8>Publier sur le site</span></label></div>`);
      if (unref(error)) {
        _push(`<p class="text-red-600 text-sm font-medium" data-v-f43653b8>${ssrInterpolate(unref(error))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex flex-wrap gap-3" data-v-f43653b8><button type="submit"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="admin-btn-primary" data-v-f43653b8>${ssrInterpolate(unref(saving) ? "Enregistrement..." : unref(isEdit) ? "Mettre à jour" : "Créer")}</button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/videos",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/videos/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f43653b8"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-DH2H-6Ha.mjs.map
