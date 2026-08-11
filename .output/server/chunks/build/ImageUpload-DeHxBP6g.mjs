import { defineComponent, ref, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ImageUpload",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    label: { default: "Image" },
    required: { type: Boolean, default: false },
    hint: { default: "" },
    previewClass: { default: "max-h-56" }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    ref(null);
    const uploading = ref(false);
    const uploadError = ref("");
    const dragOver = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-adb437b8>`);
      if (__props.label) {
        _push(`<label class="admin-label" data-v-adb437b8>${ssrInterpolate(__props.label)}${ssrInterpolate(__props.required ? " *" : "")}</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass([unref(dragOver) ? "border-brand-600 bg-brand-50" : "border-gray-200 bg-gray-50 hover:border-brand-400", "relative border-2 border-dashed rounded-[4px] transition-colors overflow-hidden"])}" data-v-adb437b8><input type="file" accept="image/jpeg,image/png,image/webp,image/gif" class="sr-only" data-v-adb437b8>`);
      if (__props.modelValue) {
        _push(`<div class="relative" data-v-adb437b8><img${ssrRenderAttr("src", __props.modelValue)} alt="Aperçu" class="${ssrRenderClass([__props.previewClass, "w-full object-cover object-top"])}" data-v-adb437b8><div class="absolute inset-0 bg-brand-900/0 hover:bg-brand-900/40 transition-colors flex items-center justify-center gap-2 opacity-100 sm:opacity-0 sm:hover:opacity-100" data-v-adb437b8><button type="button" class="px-4 py-2 bg-white text-brand-800 text-[11px] font-[900] uppercase tracking-wider rounded-[2px]" data-v-adb437b8> Changer </button><button type="button" class="px-4 py-2 bg-red-50 text-red-600 text-[11px] font-[900] uppercase tracking-wider rounded-[2px]" data-v-adb437b8> Retirer </button></div></div>`);
      } else {
        _push(`<button type="button" class="w-full px-6 py-10 text-center"${ssrIncludeBooleanAttr(unref(uploading)) ? " disabled" : ""} data-v-adb437b8><span class="block text-brand-700 font-[900] text-[13px] uppercase tracking-wider mb-2" data-v-adb437b8>${ssrInterpolate(unref(uploading) ? "Envoi en cours..." : "Choisir une image")}</span><span class="block text-gray-400 text-[12px] font-medium" data-v-adb437b8> Glissez-déposez ou cliquez · JPG, PNG, WebP · max 8 Mo </span></button>`);
      }
      _push(`</div>`);
      if (__props.modelValue) {
        _push(`<div class="flex gap-2 mt-3 sm:hidden" data-v-adb437b8><button type="button" class="px-4 py-2 bg-gray-100 text-[11px] font-[900] uppercase tracking-wider rounded-[2px]" data-v-adb437b8> Changer </button><button type="button" class="px-4 py-2 bg-red-50 text-red-600 text-[11px] font-[900] uppercase tracking-wider rounded-[2px]" data-v-adb437b8> Retirer </button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(uploadError)) {
        _push(`<p class="text-red-600 text-sm font-medium mt-2" data-v-adb437b8>${ssrInterpolate(unref(uploadError))}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.hint) {
        _push(`<p class="text-gray-400 text-xs font-medium mt-2" data-v-adb437b8>${ssrInterpolate(__props.hint)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/ImageUpload.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-adb437b8"]]), { __name: "AdminImageUpload" });

export { __nuxt_component_1 as _ };
//# sourceMappingURL=ImageUpload-DeHxBP6g.mjs.map
