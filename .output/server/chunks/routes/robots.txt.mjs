import { c as defineEventHandler, u as useRuntimeConfig, K as setHeader } from '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:fs/promises';
import 'node:url';

const robots_txt = defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const siteUrl = (config.public.siteUrl || "https://www.oxynovardc.com").replace(/\/$/, "");
  setHeader(event, "Content-Type", "text/plain; charset=utf-8");
  setHeader(event, "Cache-Control", "public, max-age=86400");
  return [
    "User-agent: *",
    "Allow: /",
    "Disallow: /admin",
    "Disallow: /admin/",
    "Disallow: /api/",
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
    ""
  ].join("\n");
});

export { robots_txt as default };
//# sourceMappingURL=robots.txt.mjs.map
