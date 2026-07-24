import { initScrollReveal } from '~/composables/useScrollObserver'

export default defineNuxtPlugin((nuxtApp) => {
  let safetyTimer: ReturnType<typeof setTimeout> | null = null

  const revealAll = () => {
    document.querySelectorAll<HTMLElement>('.animate-on-scroll').forEach((el) => {
      el.classList.add('is-visible')
    })
  }

  const refresh = () => {
    document.documentElement.classList.add('reveal-ready')
    requestAnimationFrame(() => initScrollReveal())

    // Filet de sécurité : rien ne reste invisible
    if (safetyTimer) clearTimeout(safetyTimer)
    safetyTimer = setTimeout(revealAll, 1200)
  }

  nuxtApp.hook('app:mounted', () => {
    nextTick(refresh)
  })

  nuxtApp.hook('page:finish', () => {
    nextTick(refresh)
  })
})
