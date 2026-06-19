import { useState, useEffect } from 'react'
import { data } from '../data'

export default function Header() {
  const [open, setOpen] = useState(false)

  // close menu on resize back to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <a href="#" className="logo" onClick={close}>
            nafim<span>.</span>
          </a>

          {/* Desktop nav */}
          <ul className="nav">
            <li><a href="#education">Education</a></li>
            <li><a href="#research">Research</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#repos">Repos</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>

          <div className="header-right">
            <a href={data.resume} className="btn-resume">Resume</a>

            {/* Hamburger */}
            <button
              className={`hamburger${open ? ' is-open' : ''}`}
              onClick={() => setOpen(o => !o)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <div className={`mobile-nav${open ? ' is-open' : ''}`}>
        <nav>
          <a href="#education" onClick={close}>Education</a>
          <a href="#research" onClick={close}>Research</a>
          <a href="#projects" onClick={close}>Projects</a>
          <a href="#skills" onClick={close}>Skills</a>
          <a href="#repos" onClick={close}>Repos</a>
          <a href="#contact" onClick={close}>Contact</a>
          <a href={data.resume} className="mobile-resume" onClick={close}>Resume ↗</a>
        </nav>
      </div>
    </header>
  )
}
