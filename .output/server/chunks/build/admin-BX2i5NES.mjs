import { Z as executeAsync } from '../_/nitro.mjs';
import { m as defineNuxtRouteMiddleware, n as navigateTo } from './server.mjs';
import { a as useAdminAuth } from './useAdmin-CW1Bjdf4.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:fs/promises';
import 'node:url';
import 'vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';
import './fetch-BEgLTeJq.mjs';
import '@vue/shared';

const admin = defineNuxtRouteMiddleware(async (to) => {
  let __temp, __restore;
  if (to.path === "/admin/login") return;
  const { authenticated, fetchAuth } = useAdminAuth();
  [__temp, __restore] = executeAsync(() => fetchAuth()), await __temp, __restore();
  if (!authenticated.value) {
    return navigateTo("/admin/login");
  }
});

export { admin as default };
//# sourceMappingURL=admin-BX2i5NES.mjs.map
