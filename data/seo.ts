import { oxynovaContent } from './content'

/** URL publique du site (surchargeable via NUXT_PUBLIC_SITE_URL) */
export const defaultSiteUrl = 'https://www.oxynovardc.com'

export const siteSeo = {
  siteName: oxynovaContent.fullName,
  defaultTitle: `${oxynovaContent.fullName} | Ingénierie biomédicale & oxygène médical — Kinshasa, RDC`,
  titleTemplate: `%s | ${oxynovaContent.fullName}`,
  defaultDescription:
    'OXYNOVA RDC SARL : ingénierie biomédicale, oxygène médical PSA, équipements hospitaliers, infrastructures techniques, maintenance et formation pour les structures de santé en République Démocratique du Congo.',
  keywords: [
    'OXYNOVA RDC',
    'ingénierie biomédicale RDC',
    'oxygène médical Kinshasa',
    'centrale oxygène PSA',
    'maintenance biomédicale',
    'équipements médicaux RDC',
    'infrastructures hospitalières',
    'ingénierie médicale Congo',
    'audit biomédical',
    'formation biomédicale',
    'OXYNOVA RDC SARL',
    'oxygiène médical hôpital',
  ].join(', '),
  locale: 'fr_CD',
  language: 'fr',
  ogImage: '/images/about-one.jpg',
  twitterCard: 'summary_large_image' as const,
  geo: {
    region: 'CD-KN',
    placename: 'Kinshasa',
    position: 'Kinshasa, République Démocratique du Congo',
  },
}

export const pageSeo = {
  home: {
    title: 'Ingénierie biomédicale & oxygène médical à Kinshasa',
    description:
      'Partenaire technique des hôpitaux et centres de santé en RDC. OXYNOVA RDC SARL conçoit, installe et maintient vos solutions d’oxygène médical, équipements biomédicaux et infrastructures hospitalières.',
    path: '/',
  },
  about: {
    title: 'À propos — Expertise biomédicale locale',
    description:
      'Découvrez OXYNOVA RDC SARL : vision, mission, engagements et expertise en ingénierie biomédicale au service des structures de santé congolaises.',
    path: '/about',
  },
  services: {
    title: 'Services — Ingénierie, oxygène & maintenance',
    description:
      'Gestion de projets santé, ingénierie biomédicale, infrastructures d’oxygène médical, digitalisation hospitalière et formation des équipes techniques.',
    path: '/services',
  },
  organisation: {
    title: 'Organisation — Structure & directions',
    description:
      'Organigramme OXYNOVA RDC SARL : assemblée des associés, direction générale et directions technique, commerciale, digitale, logistique et formation.',
    path: '/organisation',
  },
  equipe: {
    title: 'Équipe — Direction & collaborateurs',
    description:
      'Rencontrez l’équipe OXYNOVA RDC SARL, dirigée par NTUMBA MUKUNA Joelle, Directrice générale, au service de la performance biomédicale en RDC.',
    path: '/equipe',
  },
  medias: {
    title: 'Médias — Galerie & actualités',
    description:
      'Photos et médias OXYNOVA RDC : interventions techniques, centrales d’oxygène médical et projets hospitaliers en République Démocratique du Congo.',
    path: '/medias',
  },
  contact: {
    title: 'Contact — Devis & accompagnement',
    description:
      'Contactez OXYNOVA RDC SARL à Kinshasa pour un devis, un audit biomédical ou un projet d’oxygène médical. Email, téléphone et WhatsApp disponibles.',
    path: '/contact',
  },
} as const

export type PageSeoKey = keyof typeof pageSeo
