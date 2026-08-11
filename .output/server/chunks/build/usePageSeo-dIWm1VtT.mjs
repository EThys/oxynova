import { e as defaultSiteUrl, s as siteSeo, o as oxynovaContent, f as useSeoMeta, u as useHead, c as useRuntimeConfig, p as pageSeo } from './server.mjs';

function absoluteUrl(siteUrl, pathOrUrl) {
  if (pathOrUrl.startsWith("http")) return pathOrUrl;
  const base = siteUrl.replace(/\/$/, "");
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${base}${path}`;
}
function usePageSeo(page, options = {}) {
  const config = useRuntimeConfig();
  const siteUrl = config.public.siteUrl || defaultSiteUrl;
  const preset = page ? pageSeo[page] : null;
  const title = options.title || preset?.title || siteSeo.defaultTitle;
  const description = options.description || preset?.description || siteSeo.defaultDescription;
  const path = options.path || preset?.path || "/";
  const image = absoluteUrl(siteUrl, options.image || siteSeo.ogImage);
  const url = absoluteUrl(siteUrl, path);
  const fullTitle = page || options.title ? `${title} | ${oxynovaContent.fullName}` : siteSeo.defaultTitle;
  useSeoMeta({
    title: fullTitle,
    description,
    keywords: siteSeo.keywords,
    author: oxynovaContent.fullName,
    robots: options.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    googlebot: options.noindex ? "noindex, nofollow" : "index, follow",
    ogType: options.type || "website",
    ogSiteName: siteSeo.siteName,
    ogTitle: fullTitle,
    ogDescription: description,
    ogUrl: url,
    ogImage: image,
    ogImageAlt: `${oxynovaContent.fullName} — ${oxynovaContent.tagline}`,
    ogLocale: siteSeo.locale,
    twitterCard: siteSeo.twitterCard,
    twitterTitle: fullTitle,
    twitterDescription: description,
    twitterImage: image
  });
  useHead({
    title: fullTitle,
    htmlAttrs: { lang: siteSeo.language },
    link: [
      { rel: "canonical", href: url },
      { rel: "alternate", hreflang: "fr", href: url },
      { rel: "alternate", hreflang: "x-default", href: url }
    ],
    meta: [
      { name: "theme-color", content: "#174794" },
      { name: "format-detection", content: "telephone=yes" },
      { name: "geo.region", content: siteSeo.geo.region },
      { name: "geo.placename", content: siteSeo.geo.placename },
      { name: "ICBM", content: siteSeo.geo.position },
      { name: "application-name", content: oxynovaContent.name },
      { name: "apple-mobile-web-app-title", content: oxynovaContent.name }
    ]
  });
  return { siteUrl, url, fullTitle, description, image };
}
function useAdminSeo(title) {
  usePageSeo(void 0, {
    title,
    description: "Espace d’administration OXYNOVA RDC SARL.",
    path: "/admin",
    noindex: true
  });
}

export { useAdminSeo as a, usePageSeo as u };
//# sourceMappingURL=usePageSeo-dIWm1VtT.mjs.map
