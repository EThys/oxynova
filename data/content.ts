export interface Project {
  id: string
  partner: string
  domain: string
  description: string
  status: string
  image: string
}

export interface Service {
  title: string
  description: string
  highlights?: string[]
}

export interface OrgUnit {
  name: string
  role: string
  description: string
}

export const oxynovaContent = {
  name: 'OXYNOVA',
  fullName: 'OXYNOVA RDC SARL',
  legalForm: 'SARL',
  tagline: 'Ingénierie biomédicale',
  slogan: 'Nous créons de la valeur, nous bâtissons l\'avenir',
  description:
    'OXYNOVA RDC est une entreprise spécialisée dans les solutions complètes en ingénierie biomédicale en RDC. Elle se positionne comme un acteur clé pour améliorer l\'accès à l\'oxygène médical, fournir les équipements biomédicaux, sécuriser les installations hospitalières, assurer l\'assainissement des structures sanitaires et professionnaliser la maintenance biomédicale.',
  objective:
    'Entreprise technique haut de gamme, accessible aux projets publics, au service de la performance et de la sécurité des structures de santé en RDC.',
  vision:
    'Être le partenaire de référence dans les domaines de l\'ingénierie médicale et des solutions technologiques intégrées en Afrique centrale.',
  mission:
    'Garantir un accompagnement fiable, sécurisé et durable à nos partenaires dans toutes les phases de leurs projets, depuis les études de faisabilité jusqu\'à la livraison et la maintenance.',
  values: ['Excellence', 'Intégrité', 'Innovation', 'Engagement', 'Durabilité'],
  valueDescriptions: [
    'Des prestations conformes aux exigences techniques du secteur de la santé.',
    'Transparence et éthique dans chaque relation professionnelle.',
    'Des solutions modernes adaptées aux défis hospitaliers africains.',
    'Une présence engagée auprès des structures sanitaires et de leurs équipes.',
    'Des installations sûres, responsables et pensées pour durer.',
  ],
  engagements: [
    'La qualité des services',
    'L\'expertise de nos équipes',
    'Le respect des délais',
    'La maîtrise des coûts',
    'La sécurité du projet',
    'L\'innovation permanente',
    'La satisfaction de nos partenaires',
  ],
  positioning:
    'Entreprise technique haut de gamme mais accessible aux projets publics.',
  legal: {
    rccm: 'CD/KNM/RCCM/26-B-00519',
    idNat: '01-39502-N00001C',
    taxId: 'A2625404S',
  },
  headquarters: 'Immeuble du 30 juin, 5ème niveau, Appartement A2, Boulevard du 30 juin, arrêt poste, Kinshasa/Gombe',
  hours: {
    weekdays: 'Lundi – Vendredi : 09h00 – 16h00',
    saturday: '',
  },
  organization: {
    assembly: {
      name: 'Assemblée des associés',
      role: 'Gouvernance',
      description: 'Orientation stratégique et décisions des associés.',
    },
    general: {
      name: 'Direction générale',
      role: 'Pilotage',
      description: 'Pilotage opérationnel, gouvernance et partenariats.',
    },
    support: [
      {
        name: 'Direction RH et juridique',
        role: 'Ressources humaines & juridique',
        description: 'Gestion du personnel, cadre légal et conformité.',
      },
      {
        name: 'Direction administrative et financière',
        role: 'Administration & finances',
        description: 'Administration, finances et suivi des projets.',
      },
    ] satisfies OrgUnit[],
    operational: [
      {
        name: 'Direction technique',
        role: 'Expertise technique',
        description: 'Ingénierie biomédicale, infrastructures et qualité des interventions.',
      },
      {
        name: 'Direction commerciale et marketing',
        role: 'Développement commercial',
        description: 'Relation clients, offres et positionnement de l\'entreprise.',
      },
      {
        name: 'Direction informatique et digital',
        role: 'Systèmes & digital',
        description: 'Systèmes d\'information, digitalisation et outils numériques.',
      },
      {
        name: 'Direction logistique et approvisionnement',
        role: 'Chaîne d\'approvisionnement',
        description: 'Approvisionnement, stock et logistique des équipements.',
      },
      {
        name: 'Direction formation',
        role: 'Renforcement des capacités',
        description: 'Formation et montée en compétences des équipes.',
      },
    ] satisfies OrgUnit[],
  },
  domains: [
    {
      name: 'Ingénierie biomédicale',
      description: 'Fourniture, installation, audits et maintenance du parc médical.',
      icon: 'biomedical',
    },
    {
      name: 'Oxygène & infrastructures',
      description: 'Écosystèmes d\'oxygène, ventilation et sécurisation technique.',
      icon: 'oxygen',
    },
    {
      name: 'Digital santé',
      description: 'Systèmes d\'information et digitalisation des services hospitaliers.',
      icon: 'digital',
    },
    {
      name: 'Formation',
      description: 'Renforcement des compétences médicales, techniques et administratives.',
      icon: 'training',
    },
  ],
  services: [
    {
      title: 'Gestion de projets',
      description: 'Accompagnement des administrations, entreprises et investisseurs dans leurs projets de développement dans le secteur de la santé.',
      highlights: [
        'Études de faisabilité',
        'Programmation architecturale',
        'Assistance à la maîtrise d\'ouvrage',
        'Planification, coordination, suivi-évaluation et contrôle qualité',
      ],
    },
    {
      title: 'Ingénierie biomédicale',
      description: 'Performance, sécurité et disponibilité des équipements de santé.',
      highlights: [
        'Fourniture, installation, maintenance préventive et corrective',
        'Gestion du parc biomédical',
        'Audits techniques et évaluations de performance',
      ],
    },
    {
      title: 'Infrastructures techniques hospitalières',
      description: 'Installations techniques pour des environnements de soins sûrs.',
      highlights: [
        'Installation et maintenance de l\'écosystème d\'oxygène médical',
        'Systèmes de climatisation, ventilation et traitement d\'air',
      ],
    },
    {
      title: 'Digitalisation et systèmes d\'information',
      description: 'Conception et développement de solutions numériques pour les structures de santé.',
      highlights: [
        'Systèmes d\'information hospitaliers',
        'Digitalisation des services de santé',
      ],
    },
    {
      title: 'Formation et renforcement des capacités',
      description: 'Programmes pratiques pour le personnel médical, paramédical et technique.',
      highlights: [
        'Formation du personnel médical, paramédical et technique',
        'Coaching et conseil en gestion et organisation',
      ],
    },
    {
      title: 'Environnement, hygiène et sécurité',
      description: 'Prévention des risques et protection des environnements de soins.',
      highlights: [
        'Gestion des déchets biomédicaux',
        'Assainissement des structures de soins',
        'Solutions écologiques et durables',
      ],
    },
  ] satisfies Service[],
  method: [
    { title: 'Écoute', description: 'Analyse de vos besoins, contraintes et objectifs.' },
    { title: 'Étude', description: 'Faisabilité technique, opérationnelle et financière.' },
    { title: 'Planification', description: 'Étapes, ressources, délais et responsabilités.' },
    { title: 'Exécution', description: 'Installation, formation et contrôle qualité.' },
    { title: 'Suivi', description: 'Maintenance, assistance et amélioration continue.' },
  ],
  projects: [
    {
      id: 'oxygene-hospitalier',
      partner: 'Structures sanitaires',
      domain: 'Infrastructures techniques hospitalières',
      description: 'Installation et maintenance de l\'écosystème d\'oxygène médical pour hôpitaux et centres de santé.',
      status: 'Expertise cœur de métier',
      image: '/images/one.jpg',
    },
    {
      id: 'parc-biomedical',
      partner: 'Cliniques & hôpitaux',
      domain: 'Ingénierie biomédicale',
      description: 'Fourniture, installation et maintenance préventive et corrective d\'équipements biomédicaux, avec audits techniques.',
      status: 'Interventions continues',
      image: '/images/tzo.jpg',
    },
    {
      id: 'digital-sante',
      partner: 'Établissements de santé',
      domain: 'Digitalisation',
      description: 'Conception et développement de solutions numériques et de systèmes d\'information hospitaliers.',
      status: 'Accompagnement sur mesure',
      image: '/images/one.jpg',
    },
  ],
  partners: [
    { name: 'Fournisseurs internationaux', type: 'Équipements médicaux' },
    { name: 'Organisations internationales', type: 'Partenaires de développement' },
    { name: 'Institutions gouvernementales', type: 'Secteur public' },
    { name: 'Institutions publiques', type: 'Secteur santé' },
    { name: 'Entreprises privées', type: 'Secteur privé' },
    { name: 'Bailleurs de fonds', type: 'Financement de projets' },
  ],
  focusPoints: [
    'Améliorer l\'accès à l\'oxygène médical.',
    'Fournir les équipements biomédicaux.',
    'Sécuriser les installations hospitalières.',
    'Assurer l\'assainissement des structures sanitaires.',
    'Professionnaliser la maintenance biomédicale.',
  ],
  team: [
    {
      name: 'NTUMBA MUKUNA Joelle',
      role: 'Directrice générale',
      department: '',
      bio: '',
      image: '/images/directrice.jpg',
    },
    {
      name: '',
      role: '',
      department: '',
      bio: '',
      image: '/images/one.jpg',
    },
    {
      name: '',
      role: '',
      department: '',
      bio: '',
      image: '/images/team.jpg',
    },
  ],
  stats: [
    { value: '7', label: 'Directions' },
    { value: '6', label: 'Domaines d\'activités' },
    { value: '100%', label: 'Focus santé' },
    { value: 'Kin', label: 'Basés à Kinshasa' },
  ],
  contact: {
    email: 'contact@oxynovardc.com',
    phone: '+243 830 763 114',
    phoneAlt: '+243 992 458 687',
    address: 'Immeuble du 30 juin, 5ème niveau, Appartement A2, Boulevard du 30 juin, arrêt poste, Kinshasa/Gombe',
    whatsapp: '243992458687',
  },
  images: {
    oxygenPlant: '/images/one.jpg',
    maintenance: '/images/tzo.jpg',
    logo: '/images/logo.png',
  },
}

/** @deprecated Use oxynovaContent */
export const gemsContent = oxynovaContent
