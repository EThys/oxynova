let observer: IntersectionObserver | null = null

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function revealInViewport(elements: Iterable<HTMLElement>) {
  const viewportHeight = window.innerHeight
  for (const el of elements) {
    const rect = el.getBoundingClientRect()
    if (rect.top < viewportHeight + 120 && rect.bottom > -80) {
      el.classList.add('is-visible')
      observer?.unobserve(el)
    }
  }
}

export function initScrollReveal(selector = '.animate-on-scroll') {
  if (typeof window === 'undefined') return

  observer?.disconnect()

  const elements = document.querySelectorAll<HTMLElement>(selector)
  if (!elements.length) return

  if (prefersReducedMotion()) {
    elements.forEach(el => el.classList.add('is-visible'))
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.01, rootMargin: '120px 0px 120px 0px' },
  )

  elements.forEach((el) => {
    if (!el.classList.contains('is-visible')) {
      observer!.observe(el)
    }
  })

  revealInViewport(elements)
  requestAnimationFrame(() => revealInViewport(elements))
}

export function destroyScrollReveal() {
  observer?.disconnect()
  observer = null
}
