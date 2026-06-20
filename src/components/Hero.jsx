import { useState, useEffect, useRef } from 'react'
import { data } from '../data'

function IconLocation() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

function IconMail() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}

function IconGitHub() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}

function IconLinkedIn() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

// Count-up number animation
function CountUp({ to, suffix = '', duration = 1200, delay = 400 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const target = parseInt(to) || 0

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()

      let startTime = null

      function tick(now) {
        if (!startTime) startTime = now + delay
        const elapsed = Math.max(0, now - startTime)
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.round(eased * target))
        if (progress < 1) requestAnimationFrame(tick)
      }

      requestAnimationFrame(tick)
    }, { threshold: 0.6 })

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration, delay])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-inner">
          {/* Left column */}
          <div>
            <div className="hero-badge">
              <span className="badge-dot" />
              Open to research & job opportunities
            </div>

            <h1 className="hero-name">
              <span className="hero-name-gradient">{data.name}</span>
            </h1>
            <p className="hero-subtitle">{data.subtitle}</p>
            <p className="hero-bio">{data.bio}</p>

            <div className="hero-actions">
              <a href="#projects" className="btn-primary">
                View Projects &rarr;
              </a>
              <a href={data.github} className="btn-outline" target="_blank" rel="noreferrer">
                <IconGitHub /> GitHub
              </a>
              <a href={data.linkedin} className="btn-outline" target="_blank" rel="noreferrer">
                <IconLinkedIn /> LinkedIn
              </a>
            </div>
          </div>

          {/* Right card */}
          <div className="hero-card">
            {data.headshot && (
              <div className="hero-avatar-wrap">
                <img
                  src={data.headshot}
                  alt={`${data.name} headshot`}
                  className="hero-avatar"
                />
              </div>
            )}
            <div className="hero-card-body">
              <div className="contact-item">
                <span className="contact-icon"><IconLocation /></span>
                {data.location}
              </div>
              <div className="contact-item">
                <span className="contact-icon"><IconMail /></span>
                {data.email}
              </div>
            </div>

            <div className="hero-stats">
              <div className="stat">
                <div className="stat-label">Papers</div>
                <div className="stat-value">
                  <CountUp to={data.papers} duration={900} delay={500} />
                </div>
              </div>
              <div className="stat">
                <div className="stat-label">Projects</div>
                <div className="stat-value">
                  <CountUp to={parseInt(data.projectCount)} suffix="+" duration={1000} delay={600} />
                </div>
              </div>
              <div className="stat">
                <div className="stat-label">Repos</div>
                <div className="stat-value">
                  <CountUp to={data.repoCount} suffix="+" duration={1100} delay={700} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
