import type { Realization, TeamMember, GalleryImage, VideoItem } from '~/types/admin'

export function useAdminAuth() {
  const authenticated = useState('admin-authenticated', () => false)
  const loading = useState('admin-auth-loading', () => false)

  async function fetchAuth() {
    loading.value = true
    try {
      const data = await $fetch<{ authenticated: boolean }>('/api/auth/me')
      authenticated.value = data.authenticated
    }
    catch {
      authenticated.value = false
    }
    finally {
      loading.value = false
    }
  }

  async function login(password: string) {
    await $fetch('/api/auth/login', { method: 'POST', body: { password } })
    authenticated.value = true
  }

  async function logout() {
    await $fetch('/api/auth/logout', { method: 'POST' })
    authenticated.value = false
    await navigateTo('/admin/login')
  }

  return { authenticated, loading, fetchAuth, login, logout }
}

export function useRealizations() {
  const { data, pending, refresh, error } = useFetch<Realization[]>('/api/realizations', {
    key: 'public-realizations',
    default: () => [],
    server: true,
    lazy: false,
  })

  return { realizations: data, pending, refresh, error }
}

export function useTeam() {
  const { data, pending, refresh, error } = useFetch<TeamMember[]>('/api/team', {
    key: 'public-team',
    default: () => [],
    server: true,
    lazy: false,
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key] ?? nuxtApp.static.data[key]
    },
  })
  return { team: data, pending, refresh, error }
}

export function useGallery() {
  const { data, pending, refresh, error } = useFetch<GalleryImage[]>('/api/gallery', {
    key: 'public-gallery',
    default: () => [],
    server: true,
    lazy: false,
  })
  return { gallery: data, pending, refresh, error }
}

export function useVideos() {
  const { data, pending, refresh, error } = useFetch<VideoItem[]>('/api/videos', {
    key: 'public-videos',
    default: () => [],
    server: true,
    lazy: false,
  })
  return { videos: data, pending, refresh, error }
}

export function formatAdminDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function buildMailtoReply(
  msg: { email: string; name: string; subject: string; message: string },
  replyText: string,
  subjectLabel: string,
) {
  const subject = encodeURIComponent(`Re: ${subjectLabel} - OXYNOVA RDC SARL`)
  const body = encodeURIComponent(
    `${replyText}\n\n---\nMessage original de ${msg.name} (${msg.email}) :\n${msg.message}`,
  )
  return `mailto:${msg.email}?subject=${subject}&body=${body}`
}
