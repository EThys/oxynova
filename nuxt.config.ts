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
    // SMTP Hostinger (laisser vide tant que le mail pro n'est pas activé)
    smtpHost: process.env.SMTP_HOST || '',
    smtpPort: process.env.SMTP_PORT || '465',
    smtpSecure: process.env.SMTP_SECURE || 'true',
    smtpUser: process.env.SMTP_USER || '',
    smtpPass: process.env.SMTP_PASS || '',
    smtpFrom: process.env.SMTP_FROM || '',
    smtpTo: process.env.SMTP_TO || '',
    // IMAP Hostinger — sync des mails reçus hors site vers l'admin
    imapHost: process.env.IMAP_HOST || '',
    imapPort: process.env.IMAP_PORT || '993',
    imapSecure: process.env.IMAP_SECURE || 'true',
    imapUser: process.env.IMAP_USER || '',
    imapPass: process.env.IMAP_PASS || '',
    imapMailbox: process.env.IMAP_MAILBOX || 'INBOX',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.oxynovardc.com',
    },
  },
  css: ['~/assets/css/main.css'],
  srcDir: '.',
  app: {
    pageTransition: { name: 'page' },
    head: {
      htmlAttrs: { lang: 'fr' },
      title: 'OXYNOVA RDC SARL | Ingénierie biomédicale & oxygène médical — Kinshasa, RDC',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'OXYNOVA RDC SARL : ingénierie biomédicale, oxygène médical PSA, équipements hospitaliers, infrastructures techniques, maintenance et formation pour les structures de santé en RDC.',
        },
        {
          name: 'keywords',
          content:
            'OXYNOVA RDC, ingénierie biomédicale RDC, oxygène médical Kinshasa, centrale oxygène PSA, maintenance biomédicale, équipements médicaux Congo',
        },
        { name: 'theme-color', content: '#174794' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'fr_CD' },
        { property: 'og:site_name', content: 'OXYNOVA RDC SARL' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/images/logo.png' },
        { rel: 'apple-touch-icon', href: '/images/logo.png' },
        { rel: 'preload', as: 'image', href: '/images/about-one.jpg', fetchpriority: 'high' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap',
        },
      ],
    },
  },
})
