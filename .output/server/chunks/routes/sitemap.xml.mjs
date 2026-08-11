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

const defaultSiteUrl = "https://www.oxynovardc.com";
const pageSeo = {
  home: {
    title: "Ing\xE9nierie biom\xE9dicale & oxyg\xE8ne m\xE9dical \xE0 Kinshasa",
    description: "Partenaire technique des h\xF4pitaux et centres de sant\xE9 en RDC. OXYNOVA RDC SARL con\xE7oit, installe et maintient vos solutions d\u2019oxyg\xE8ne m\xE9dical, \xE9quipements biom\xE9dicaux et infrastructures hospitali\xE8res.",
    path: "/"
  },
  about: {
    title: "\xC0 propos \u2014 Expertise biom\xE9dicale locale",
    description: "D\xE9couvrez OXYNOVA RDC SARL : vision, mission, engagements et expertise en ing\xE9nierie biom\xE9dicale au service des structures de sant\xE9 congolaises.",
    path: "/about"
  },
  services: {
    title: "Services \u2014 Ing\xE9nierie, oxyg\xE8ne & maintenance",
    description: "Gestion de projets sant\xE9, ing\xE9nierie biom\xE9dicale, infrastructures d\u2019oxyg\xE8ne m\xE9dical, digitalisation hospitali\xE8re et formation des \xE9quipes techniques.",
    path: "/services"
  },
  organisation: {
    title: "Organisation \u2014 Structure & directions",
    description: "Organigramme OXYNOVA RDC SARL : assembl\xE9e des associ\xE9s, direction g\xE9n\xE9rale et directions technique, commerciale, digitale, logistique et formation.",
    path: "/organisation"
  },
  equipe: {
    title: "\xC9quipe \u2014 Direction & collaborateurs",
    description: "Rencontrez l\u2019\xE9quipe OXYNOVA RDC SARL, dirig\xE9e par NTUMBA MUKUNA Joelle, Directrice g\xE9n\xE9rale, au service de la performance biom\xE9dicale en RDC.",
    path: "/equipe"
  },
  medias: {
    title: "M\xE9dias \u2014 Galerie & actualit\xE9s",
    description: "Photos et m\xE9dias OXYNOVA RDC : interventions techniques, centrales d\u2019oxyg\xE8ne m\xE9dical et projets hospitaliers en R\xE9publique D\xE9mocratique du Congo.",
    path: "/medias"
  },
  contact: {
    title: "Contact \u2014 Devis & accompagnement",
    description: "Contactez OXYNOVA RDC SARL \xE0 Kinshasa pour un devis, un audit biom\xE9dical ou un projet d\u2019oxyg\xE8ne m\xE9dical. Email, t\xE9l\xE9phone et WhatsApp disponibles.",
    path: "/contact"
  }
};

const sitemap_xml = defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const siteUrl = (config.public.siteUrl || defaultSiteUrl).replace(/\/$/, "");
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const routes = Object.values(pageSeo).map((page) => ({
    loc: `${siteUrl}${page.path === "/" ? "" : page.path}`,
    changefreq: page.path === "/" ? "weekly" : "monthly",
    priority: page.path === "/" ? "1.0" : page.path === "/contact" || page.path === "/services" ? "0.9" : "0.8"
  }));
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(
    (r) => `  <url>
    <loc>${r.loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  ).join("\n")}
</urlset>
`;
  setHeader(event, "Content-Type", "application/xml; charset=utf-8");
  setHeader(event, "Cache-Control", "public, max-age=3600");
  return body;
});

export { sitemap_xml as default };
//# sourceMappingURL=sitemap.xml.mjs.map
