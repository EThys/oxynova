import { oxynovaContent } from '~/data/content'
import { defaultSiteUrl, siteSeo } from '~/data/seo'

export function useOrganizationSchema() {
  const config = useRuntimeConfig()
  const siteUrl = ((config.public.siteUrl as string) || defaultSiteUrl).replace(/\/$/, '')

  const graph = [
    {
      '@context': 'https://schema.org',
      '@type': ['Organization', 'LocalBusiness', 'MedicalBusiness'],
      '@id': `${siteUrl}/#organization`,
      name: oxynovaContent.fullName,
      legalName: oxynovaContent.fullName,
      alternateName: oxynovaContent.name,
      description: siteSeo.defaultDescription,
      url: siteUrl,
      logo: `${siteUrl}${oxynovaContent.images.logo}`,
      image: `${siteUrl}${siteSeo.ogImage}`,
      email: oxynovaContent.contact.email,
      telephone: oxynovaContent.contact.phone,
      slogan: oxynovaContent.slogan,
      foundingLocation: {
        '@type': 'Place',
        name: 'Kinshasa',
        addressCountry: 'CD',
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: oxynovaContent.contact.address,
        addressLocality: 'Kinshasa',
        addressCountry: 'CD',
      },
      areaServed: [
        { '@type': 'Country', name: 'République Démocratique du Congo' },
        { '@type': 'City', name: 'Kinshasa' },
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: oxynovaContent.contact.phone,
          contactType: 'customer service',
          availableLanguage: ['French'],
          areaServed: 'CD',
        },
        {
          '@type': 'ContactPoint',
          telephone: oxynovaContent.contact.phoneAlt,
          contactType: 'sales',
          availableLanguage: ['French'],
          areaServed: 'CD',
        },
      ],
      knowsAbout: [
        'Ingénierie biomédicale',
        'Oxygène médical',
        'Centrale PSA',
        'Maintenance biomédicale',
        'Infrastructures hospitalières',
        'Formation technique santé',
      ],
      employee: {
        '@type': 'Person',
        name: 'NTUMBA MUKUNA Joelle',
        jobTitle: 'Directrice générale',
        worksFor: { '@id': `${siteUrl}/#organization` },
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '16:00',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: oxynovaContent.fullName,
      description: siteSeo.defaultDescription,
      publisher: { '@id': `${siteUrl}/#organization` },
      inLanguage: 'fr-CD',
    },
  ]

  useHead({
    script: [
      {
        key: 'ld-json-org',
        type: 'application/ld+json',
        children: JSON.stringify(graph),
      },
    ],
  })
}
