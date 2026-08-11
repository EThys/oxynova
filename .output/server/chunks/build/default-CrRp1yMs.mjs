import { defineComponent, shallowRef, getCurrentInstance, provide, cloneVNode, h, createElementBlock, ref, mergeProps, unref, watch, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderStyle, ssrRenderSlot, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderTeleport } from 'vue/server-renderer';
import { _ as _export_sfc, j as useState, o as oxynovaContent, l as useRoute } from './server.mjs';
import { _ as __nuxt_component_0$2 } from './nuxt-link-vzZ0EJye.mjs';
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

defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const clientOnlySymbol = /* @__PURE__ */ Symbol.for("nuxt:client-only");
const __nuxt_component_0$1 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  ...false,
  setup(props, { slots, attrs }) {
    const mounted = shallowRef(false);
    const vm = getCurrentInstance();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return () => {
      if (mounted.value) {
        const vnodes = slots.default?.();
        if (vnodes && vnodes.length === 1) {
          return [cloneVNode(vnodes[0], attrs)];
        }
        return vnodes;
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return h(slot);
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "TopBar",
  __ssrInlineRender: true,
  props: {
    compact: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["topbar bg-brand-800 text-white text-[12px] hidden lg:block border-b border-white/10 overflow-hidden", __props.compact ? "topbar--compact" : "topbar--full"]
      }, _attrs))} data-v-b8f508f6><div class="container mx-auto px-4 flex justify-between items-center h-9" data-v-b8f508f6><div class="flex items-center space-x-6" data-v-b8f508f6><div class="flex items-center gap-2" data-v-b8f508f6><svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" data-v-b8f508f6><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" data-v-b8f508f6></path></svg><span data-v-b8f508f6>Limeté, Kinshasa · RDC</span></div><div class="flex items-center gap-2 border-l border-white/20 pl-6" data-v-b8f508f6><svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" data-v-b8f508f6><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" data-v-b8f508f6></path></svg><span data-v-b8f508f6>${ssrInterpolate(unref(oxynovaContent).contact.email)}</span></div><div class="flex items-center gap-2 border-l border-white/20 pl-6" data-v-b8f508f6><svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" data-v-b8f508f6><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" data-v-b8f508f6></path></svg><span data-v-b8f508f6>${ssrInterpolate(unref(oxynovaContent).contact.phone)}</span></div></div></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TopBar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$3, [["__scopeId", "data-v-b8f508f6"]]), { __name: "TopBar" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Navbar",
  __ssrInlineRender: true,
  props: {
    compact: { type: Boolean }
  },
  setup(__props) {
    const route = useRoute();
    const isOpen = ref(false);
    const openDropdown = ref(null);
    const mobileGroupOpen = ref(null);
    const links = [
      { to: "/", label: "Accueil" },
      { to: "/about", label: "À propos" },
      { to: "/services", label: "Services" },
      // { to: '/realisations', label: 'Réalisations' },
      {
        label: "Entreprise",
        children: [
          { to: "/organisation", label: "Organisation" },
          { to: "/equipe", label: "Équipe" }
        ]
      },
      { to: "/medias", label: "Médias" },
      { to: "/contact", label: "Contact" }
    ];
    function isActive(path) {
      if (path === "/") return route.path === "/";
      return route.path.startsWith(path);
    }
    function isGroupActive(item) {
      return item.children?.some((c) => isActive(c.to)) ?? false;
    }
    function closeMenu() {
      isOpen.value = false;
      openDropdown.value = null;
      mobileGroupOpen.value = null;
    }
    watch(isOpen, (open) => {
    });
    watch(() => route.path, () => closeMenu());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$2;
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "w-full font-sans" }, _attrs))} data-v-c3053aeb><div class="container mx-auto px-4" data-v-c3053aeb><div class="${ssrRenderClass([__props.compact ? "nav-row--compact" : "nav-row--full", "nav-row flex justify-between items-center"])}" data-v-c3053aeb>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: "/",
        class: "flex-shrink-0 flex items-center group min-w-0",
        onClick: closeMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", unref(oxynovaContent).images.logo)} alt="OXYNOVA RDC SARL" class="${ssrRenderClass([__props.compact ? "nav-logo--compact" : "nav-logo--full", "nav-logo object-contain object-left transition-all duration-300"])}" data-v-c3053aeb${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: unref(oxynovaContent).images.logo,
                alt: "OXYNOVA RDC SARL",
                class: ["nav-logo object-contain object-left transition-all duration-300", __props.compact ? "nav-logo--compact" : "nav-logo--full"]
              }, null, 10, ["src"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="hidden lg:flex items-center gap-1" data-v-c3053aeb><!--[-->`);
      ssrRenderList(links, (item) => {
        _push(`<!--[-->`);
        if (item.children) {
          _push(`<div class="relative" data-v-c3053aeb><button type="button" class="${ssrRenderClass([{ "nav-link--active": isGroupActive(item) }, "nav-link inline-flex items-center gap-1.5"])}" data-v-c3053aeb>${ssrInterpolate(item.label)} <svg class="${ssrRenderClass([{ "rotate-180": unref(openDropdown) === item.label }, "w-3.5 h-3.5 transition-transform duration-200"])}" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" data-v-c3053aeb><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" data-v-c3053aeb></path></svg></button>`);
          if (unref(openDropdown) === item.label) {
            _push(`<div class="absolute left-0 top-full pt-2 min-w-[200px]" data-v-c3053aeb><div class="bg-white border border-gray-100 rounded-[4px] shadow-xl shadow-brand-900/10 py-2 overflow-hidden" data-v-c3053aeb><!--[-->`);
            ssrRenderList(item.children, (child) => {
              _push(ssrRenderComponent(_component_nuxt_link, {
                key: child.to,
                to: child.to,
                class: ["block px-5 py-3 text-[12px] font-[800] uppercase tracking-widest text-[#1a1a1b] hover:bg-brand-50 hover:text-brand-700 transition-colors", { "text-brand-700 bg-brand-50": isActive(child.to) }],
                onClick: ($event) => openDropdown.value = null
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(child.label)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(child.label), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            });
            _push(`<!--]--></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(ssrRenderComponent(_component_nuxt_link, {
            to: item.to,
            class: ["nav-link", { "nav-link--active": isActive(item.to) }]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item.label)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(item.label), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div><div class="hidden lg:flex items-center gap-3" data-v-c3053aeb>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: "/contact",
        class: ["cta-btn group", __props.compact ? "cta-btn--compact" : ""]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-c3053aeb${_scopeId}>Parler à un expert</span><svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" data-v-c3053aeb${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" data-v-c3053aeb${_scopeId}></path></svg>`);
          } else {
            return [
              createVNode("span", null, "Parler à un expert"),
              (openBlock(), createBlock("svg", {
                class: "w-4 h-4 transition-transform duration-300 group-hover:translate-x-1",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2.5",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M17 8l4 4m0 0l-4 4m4-4H3"
                })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><button type="button" class="${ssrRenderClass([__props.compact ? "w-10 h-10" : "w-11 h-11", "lg:hidden relative z-[70] flex flex-col items-center justify-center gap-1.5 rounded-[3px] border border-gray-200 hover:border-brand-600 hover:bg-brand-50 transition-all duration-300"])}"${ssrRenderAttr("aria-expanded", unref(isOpen))} aria-label="Menu" data-v-c3053aeb><span class="${ssrRenderClass([{ "burger-line--top": unref(isOpen) }, "burger-line"])}" data-v-c3053aeb></span><span class="${ssrRenderClass([{ "burger-line--mid": unref(isOpen) }, "burger-line"])}" data-v-c3053aeb></span><span class="${ssrRenderClass([{ "burger-line--bot": unref(isOpen) }, "burger-line"])}" data-v-c3053aeb></span></button></div></div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(isOpen)) {
          _push2(`<div class="fixed inset-0 z-[60] lg:hidden" data-v-c3053aeb><div class="absolute inset-0 bg-brand-900/50 backdrop-blur-sm" data-v-c3053aeb></div><aside class="menu-panel absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col" data-v-c3053aeb><div class="px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between" data-v-c3053aeb><div class="flex items-center gap-3 min-w-0" data-v-c3053aeb><img${ssrRenderAttr("src", unref(oxynovaContent).images.logo)} alt="OXYNOVA RDC SARL" class="h-10 w-auto max-w-[9rem] object-contain" data-v-c3053aeb></div><button type="button" class="w-10 h-10 rounded-[3px] bg-gray-50 text-brand-900 font-[900] hover:bg-brand-700 hover:text-white transition-colors" aria-label="Fermer" data-v-c3053aeb> ✕ </button></div><nav class="flex-1 overflow-y-auto px-4 py-6" data-v-c3053aeb><ul class="space-y-1" data-v-c3053aeb><!--[-->`);
          ssrRenderList(links, (item, i) => {
            _push2(`<!--[-->`);
            if (item.children) {
              _push2(`<li class="menu-item" style="${ssrRenderStyle({ animationDelay: `${80 + i * 50}ms` })}" data-v-c3053aeb><button type="button" class="flex items-center gap-4 px-4 py-4 rounded-[4px] w-full text-left hover:bg-brand-50 text-[#1a1a1b] transition-all" data-v-c3053aeb><span class="text-[12px] font-[900] tracking-widest w-7 text-brand-600/50" data-v-c3053aeb>${ssrInterpolate(String(i + 1).padStart(2, "0"))}</span><span class="text-[17px] font-[900] uppercase tracking-wider flex-1" data-v-c3053aeb>${ssrInterpolate(item.label)}</span><svg class="${ssrRenderClass([{ "rotate-90": unref(mobileGroupOpen) === item.label }, "w-4 h-4 transition-transform"])}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-c3053aeb><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" data-v-c3053aeb></path></svg></button>`);
              if (unref(mobileGroupOpen) === item.label) {
                _push2(`<ul class="ml-11 mb-2 space-y-1" data-v-c3053aeb><!--[-->`);
                ssrRenderList(item.children, (child) => {
                  _push2(`<li data-v-c3053aeb>`);
                  _push2(ssrRenderComponent(_component_nuxt_link, {
                    to: child.to,
                    class: ["block px-4 py-3 rounded-[4px] text-[14px] font-[800] uppercase tracking-wider transition-colors", isActive(child.to) ? "bg-brand-700 text-white" : "text-gray-600 hover:bg-brand-50 hover:text-brand-700"],
                    onClick: closeMenu
                  }, {
                    default: withCtx((_, _push3, _parent2, _scopeId) => {
                      if (_push3) {
                        _push3(`${ssrInterpolate(child.label)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(child.label), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent));
                  _push2(`</li>`);
                });
                _push2(`<!--]--></ul>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</li>`);
            } else {
              _push2(`<li class="menu-item" style="${ssrRenderStyle({ animationDelay: `${80 + i * 50}ms` })}" data-v-c3053aeb>`);
              _push2(ssrRenderComponent(_component_nuxt_link, {
                to: item.to,
                class: ["flex items-center gap-4 px-4 py-4 rounded-[4px] group transition-all duration-300", isActive(item.to) ? "bg-brand-700 text-white shadow-lg shadow-brand-700/25" : "hover:bg-brand-50 text-[#1a1a1b]"],
                onClick: closeMenu
              }, {
                default: withCtx((_, _push3, _parent2, _scopeId) => {
                  if (_push3) {
                    _push3(`<span class="${ssrRenderClass([isActive(item.to) ? "text-brand-200" : "text-brand-600/50 group-hover:text-brand-600", "text-[12px] font-[900] tracking-widest w-7"])}" data-v-c3053aeb${_scopeId}>${ssrInterpolate(String(i + 1).padStart(2, "0"))}</span><span class="text-[17px] font-[900] uppercase tracking-wider flex-1" data-v-c3053aeb${_scopeId}>${ssrInterpolate(item.label)}</span><svg class="${ssrRenderClass([isActive(item.to) ? "opacity-100" : "", "w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all"])}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-c3053aeb${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" data-v-c3053aeb${_scopeId}></path></svg>`);
                  } else {
                    return [
                      createVNode("span", {
                        class: ["text-[12px] font-[900] tracking-widest w-7", isActive(item.to) ? "text-brand-200" : "text-brand-600/50 group-hover:text-brand-600"]
                      }, toDisplayString(String(i + 1).padStart(2, "0")), 3),
                      createVNode("span", { class: "text-[17px] font-[900] uppercase tracking-wider flex-1" }, toDisplayString(item.label), 1),
                      (openBlock(), createBlock("svg", {
                        class: ["w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all", isActive(item.to) ? "opacity-100" : ""],
                        fill: "none",
                        stroke: "currentColor",
                        "stroke-width": "2",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M9 5l7 7-7 7"
                        })
                      ], 2))
                    ];
                  }
                }),
                _: 2
              }, _parent));
              _push2(`</li>`);
            }
            _push2(`<!--]-->`);
          });
          _push2(`<!--]--></ul></nav><div class="p-6 border-t border-gray-100 bg-brand-50/60 space-y-4" data-v-c3053aeb><a${ssrRenderAttr("href", `tel:${unref(oxynovaContent).contact.phone.replace(/\s/g, "")}`)} class="block text-brand-700 font-bold text-sm" data-v-c3053aeb>${ssrInterpolate(unref(oxynovaContent).contact.phone)}</a>`);
          _push2(ssrRenderComponent(_component_nuxt_link, {
            to: "/contact",
            class: "flex items-center justify-center gap-2 w-full py-4 bg-brand-700 text-white font-[900] text-[13px] uppercase tracking-[0.1em] rounded-[3px] hover:bg-brand-800 transition-colors",
            onClick: closeMenu
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(` Parler à un expert <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" data-v-c3053aeb${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" data-v-c3053aeb${_scopeId}></path></svg>`);
              } else {
                return [
                  createTextVNode(" Parler à un expert "),
                  (openBlock(), createBlock("svg", {
                    class: "w-4 h-4",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2.5",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M17 8l4 4m0 0l-4 4m4-4H3"
                    })
                  ]))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div></aside></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</nav>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Navbar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-c3053aeb"]]), { __name: "Navbar" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "BackToTop",
  __ssrInlineRender: true,
  setup(__props) {
    const scrollY = useState("site-scroll-y", () => 0);
    computed(() => scrollY.value > 250);
    computed(() => {
      return 24;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_ClientOnly, _attrs, {}, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BackToTop.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$1, { __name: "BackToTop" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const scrolled = ref(false);
    const scrollProgress = ref(0);
    useState("site-scroll-y", () => 0);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TopBar = __nuxt_component_0;
      const _component_Navbar = __nuxt_component_1;
      const _component_BackToTop = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "font-sans antialiased text-[#1a1a1b] bg-white" }, _attrs))} data-v-f7625d5c><header class="${ssrRenderClass([unref(scrolled) ? "site-header--scrolled" : "site-header--top", "site-header fixed top-0 inset-x-0 z-50 font-sans will-change-transform"])}" data-v-f7625d5c>`);
      _push(ssrRenderComponent(_component_TopBar, { compact: unref(scrolled) }, null, _parent));
      _push(ssrRenderComponent(_component_Navbar, { compact: unref(scrolled) }, null, _parent));
      _push(`<div class="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-100/80 overflow-hidden" data-v-f7625d5c><div class="h-full bg-brand-600 origin-left transition-[width] duration-75 ease-out" style="${ssrRenderStyle({ width: `${unref(scrollProgress)}%` })}" data-v-f7625d5c></div></div></header><main class="site-main" data-v-f7625d5c>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      _push(ssrRenderComponent(_component_BackToTop, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f7625d5c"]]);

export { _default as default };
//# sourceMappingURL=default-CrRp1yMs.mjs.map
