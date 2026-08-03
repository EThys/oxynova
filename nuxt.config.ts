export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: process.env.NODE_ENV !== 'production' },
  modules: ['@nuxtjs/tailwindcss'],
  nitro: {
    preset: process.env.VERCEL ? 'vercel' : undefined,
  },
  runtimeConfig: {
    adminPassword: process.env.ADMIN_PASSWORD || 'oxynova2026',
    adminSecret: process.env.ADMIN_SECRET || 'oxynova-dev-secret-change-in-production',
  },
  css: ['~/assets/css/main.css'],
  srcDir: '.',
  app: {
    pageTransition: { name: 'page' },
    head: {
      title: 'OXYNOVA RDC SARL | Ingénierie biomédicale',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'OXYNOVA RDC SARL — ingénierie biomédicale, oxygène médical, infrastructures hospitalières et maintenance pour les structures de santé en RDC.' },
      ],
    },
  },
})
