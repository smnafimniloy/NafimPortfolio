import { useState, useEffect, useRef } from 'react'

// Shows the real number by default (so the prerendered HTML and search engines see it),
// then, in the browser, counts up from 0 once the number scrolls into view.
export default function CountUp({ to, suffix = '', duration = 1200, delay = 300 }) {
  const target = parseInt(to) || 0
  const [count, setCount] = useState(target)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      let start = null
      const tick = now => {
        if (start === null) start = now + delay
        const progress = Math.min(Math.max(0, now - start) / duration, 1)
        setCount(Math.round((1 - Math.pow(1 - progress, 3)) * target))
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, { threshold: 0.6 })

    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [target, duration, delay])

  return <span ref={ref}>{count}{suffix}</span>
}
