import type { Realization, TeamMember, GalleryImage, VideoItem } from '~/types/admin'
import { oxynovaContent } from '~/data/content'

export const seedRealizations: Omit<Realization, 'createdAt' | 'updatedAt'>[] = oxynovaContent.projects.map(p => ({
  id: p.id,
  partner: p.partner,
  domain: p.domain,
  description: p.description,
  status: p.status,
  image: p.image,
  published: true,
}))

export const seedTeam: Omit<TeamMember, 'createdAt' | 'updatedAt'>[] = oxynovaContent.team.map((m, i) => ({
  id: `team-${i + 1}`,
  name: m.name,
  role: m.role,
  department: m.department,
  bio: m.bio,
  image: m.image,
  published: true,
  order: i,
}))

export const seedGallery: Omit<GalleryImage, 'createdAt' | 'updatedAt'>[] = [
  {
    id: 'gal-1',
    title: 'Centrale oxygène médical PSA',
    caption: 'Kinshasa — RDC',
    image: oxynovaContent.images.oxygenPlant,
    published: true,
    order: 0,
  },
  {
    id: 'gal-2',
    title: 'Maintenance biomédicale',
    caption: 'Intervention technique sur équipements de santé',
    image: oxynovaContent.images.maintenance,
    published: true,
    order: 1,
  },
]

export const seedVideos: Omit<VideoItem, 'createdAt' | 'updatedAt'>[] = []
