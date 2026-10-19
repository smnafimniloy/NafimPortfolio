import { useEffect } from 'react'

// Fades sections up the first time they scroll into view (styles in animations.css).
export function useReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll('.section')
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
