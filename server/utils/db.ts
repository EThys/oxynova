import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import type { ContactMessage, Realization, TeamMember, GalleryImage, VideoItem } from '~/types/admin'

const DATA_DIR = join(process.cwd(), '.data')

async function ensureDataDir() {
  await mkdir(DATA_DIR, { recursive: true })
}

async function readJson<T>(filename: string, fallback: T): Promise<T> {
  await ensureDataDir()
  const path = join(DATA_DIR, filename)
  try {
    const raw = await readFile(path, 'utf-8')
    return JSON.parse(raw) as T
  }
  catch {
    await writeJson(filename, fallback)
    return fallback
  }
}

async function writeJson<T>(filename: string, data: T): Promise<void> {
  await ensureDataDir()
  const path = join(DATA_DIR, filename)
  await mkdir(dirname(path), { recursive: true })
  await writeFile(path, JSON.stringify(data, null, 2), 'utf-8')
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

// ——— Messages ———

export async function getMessages(): Promise<ContactMessage[]> {
  return readJson<ContactMessage[]>('messages.json', [])
}

export async function saveMessages(messages: ContactMessage[]): Promise<void> {
  await writeJson('messages.json', messages)
}

export async function addMessage(
  input: Omit<ContactMessage, 'id' | 'read' | 'createdAt'>,
): Promise<ContactMessage> {
  const messages = await getMessages()
  const message: ContactMessage = {
    ...input,
    id: generateId(),
    read: false,
    createdAt: new Date().toISOString(),
  }
  messages.unshift(message)
  await saveMessages(messages)
  return message
}

export async function updateMessage(
  id: string,
  patch: Partial<Pick<ContactMessage, 'read' | 'reply' | 'repliedAt'>>,
): Promise<ContactMessage | null> {
  const messages = await getMessages()
  const index = messages.findIndex(m => m.id === id)
  if (index === -1) return null
  messages[index] = { ...messages[index], ...patch }
  await saveMessages(messages)
  return messages[index]
}

export async function deleteMessage(id: string): Promise<boolean> {
  const messages = await getMessages()
  const filtered = messages.filter(m => m.id !== id)
  if (filtered.length === messages.length) return false
  await saveMessages(filtered)
  return true
}

// ——— Realizations ———

export async function getRealizations(): Promise<Realization[]> {
  return readJson<Realization[]>('realizations.json', [])
}

export async function saveRealizations(realizations: Realization[]): Promise<void> {
  await writeJson('realizations.json', realizations)
}

export async function addRealization(
  input: Omit<Realization, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<Realization> {
  const realizations = await getRealizations()
  const now = new Date().toISOString()
  const realization: Realization = {
    ...input,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  }
  realizations.unshift(realization)
  await saveRealizations(realizations)
  return realization
}

export async function updateRealization(
  id: string,
  input: Partial<Omit<Realization, 'id' | 'createdAt'>>,
): Promise<Realization | null> {
  const realizations = await getRealizations()
  const index = realizations.findIndex(r => r.id === id)
  if (index === -1) return null
  realizations[index] = {
    ...realizations[index],
    ...input,
    updatedAt: new Date().toISOString(),
  }
  await saveRealizations(realizations)
  return realizations[index]
}

export async function deleteRealization(id: string): Promise<boolean> {
  const realizations = await getRealizations()
  const filtered = realizations.filter(r => r.id !== id)
  if (filtered.length === realizations.length) return false
  await saveRealizations(filtered)
  return true
}

export async function seedRealizationsIfEmpty(seed: Realization[]): Promise<void> {
  const existing = await getRealizations()
  if (existing.length === 0 && seed.length > 0) {
    await saveRealizations(seed)
  }
}

// ——— Team ———

export async function getTeam(): Promise<TeamMember[]> {
  return readJson<TeamMember[]>('team.json', [])
}

export async function saveTeam(team: TeamMember[]): Promise<void> {
  await writeJson('team.json', team)
}

export async function addTeamMember(
  input: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<TeamMember> {
  const team = await getTeam()
  const now = new Date().toISOString()
  const member: TeamMember = {
    ...input,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  }
  team.push(member)
  await saveTeam(team)
  return member
}

export async function updateTeamMember(
  id: string,
  input: Partial<Omit<TeamMember, 'id' | 'createdAt'>>,
): Promise<TeamMember | null> {
  const team = await getTeam()
  const index = team.findIndex(m => m.id === id)
  if (index === -1) return null
  team[index] = { ...team[index], ...input, updatedAt: new Date().toISOString() }
  await saveTeam(team)
  return team[index]
}

export async function deleteTeamMember(id: string): Promise<boolean> {
  const team = await getTeam()
  const filtered = team.filter(m => m.id !== id)
  if (filtered.length === team.length) return false
  await saveTeam(filtered)
  return true
}

export async function seedTeamIfEmpty(seed: TeamMember[]): Promise<void> {
  const existing = await getTeam()
  if (existing.length === 0 && seed.length > 0) {
    await saveTeam(seed)
  }
}

// ——— Gallery ———

export async function getGallery(): Promise<GalleryImage[]> {
  return readJson<GalleryImage[]>('gallery.json', [])
}

export async function saveGallery(items: GalleryImage[]): Promise<void> {
  await writeJson('gallery.json', items)
}

export async function addGalleryImage(
  input: Omit<GalleryImage, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<GalleryImage> {
  const items = await getGallery()
  const now = new Date().toISOString()
  const item: GalleryImage = {
    ...input,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  }
  items.unshift(item)
  await saveGallery(items)
  return item
}

export async function updateGalleryImage(
  id: string,
  input: Partial<Omit<GalleryImage, 'id' | 'createdAt'>>,
): Promise<GalleryImage | null> {
  const items = await getGallery()
  const index = items.findIndex(i => i.id === id)
  if (index === -1) return null
  items[index] = { ...items[index], ...input, updatedAt: new Date().toISOString() }
  await saveGallery(items)
  return items[index]
}

export async function deleteGalleryImage(id: string): Promise<boolean> {
  const items = await getGallery()
  const filtered = items.filter(i => i.id !== id)
  if (filtered.length === items.length) return false
  await saveGallery(filtered)
  return true
}

export async function seedGalleryIfEmpty(seed: GalleryImage[]): Promise<void> {
  const existing = await getGallery()
  if (existing.length === 0 && seed.length > 0) {
    await saveGallery(seed)
  }
}

// ——— Videos ———

export async function getVideos(): Promise<VideoItem[]> {
  return readJson<VideoItem[]>('videos.json', [])
}

export async function saveVideos(items: VideoItem[]): Promise<void> {
  await writeJson('videos.json', items)
}

export async function addVideo(
  input: Omit<VideoItem, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<VideoItem> {
  const items = await getVideos()
  const now = new Date().toISOString()
  const item: VideoItem = {
    ...input,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  }
  items.unshift(item)
  await saveVideos(items)
  return item
}

export async function updateVideo(
  id: string,
  input: Partial<Omit<VideoItem, 'id' | 'createdAt'>>,
): Promise<VideoItem | null> {
  const items = await getVideos()
  const index = items.findIndex(i => i.id === id)
  if (index === -1) return null
  items[index] = { ...items[index], ...input, updatedAt: new Date().toISOString() }
  await saveVideos(items)
  return items[index]
}

export async function deleteVideo(id: string): Promise<boolean> {
  const items = await getVideos()
  const filtered = items.filter(i => i.id !== id)
  if (filtered.length === items.length) return false
  await saveVideos(filtered)
  return true
}

export async function seedVideosIfEmpty(seed: VideoItem[]): Promise<void> {
  const existing = await getVideos()
  if (existing.length === 0 && seed.length > 0) {
    await saveVideos(seed)
  }
}
