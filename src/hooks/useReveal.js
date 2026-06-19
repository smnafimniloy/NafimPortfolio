import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll('.section, .hero-inner')

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.07 }
    )

    targets.forEach(el => {
      el.classList.add('will-reveal')
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])
}
