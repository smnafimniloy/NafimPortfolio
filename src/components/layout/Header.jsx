import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { profile } from '@content/profile'
import { site } from '@content/site'
import { List, X, ArrowUpRight } from '../ui/icons'

const navSections = site.sections.filter(s => s.show && s.nav)

export default function Header() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const isHome = pathname === '/'
  const isBlog = pathname.startsWith('/blog')

  // Your name always brings you back to the top of the home page.
  function handleLogoClick(e) {
    setOpen(false)
    if (isHome) {
      e.preventDefault()
      window.history.replaceState(null, '', '/')   // drop any #section from the address
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.scrollTo(0, 0)
    }
  }

  return (
    <header className={`header${open ? ' header--open' : ''}`}>
      <div className="container header__inner">
        <Link to="/" className="logo logo--name" onClick={handleLogoClick} aria-label={`${profile.name}, back to top`}>
          {profile.shortName || profile.name}
        </Link>

        <nav className="nav" aria-label="Main">
          <ul onClick={() => setOpen(false)}>
            {navSections.map(s => (
              <li key={s.id}>
                {isHome ? <a href={`#${s.id}`}>{s.label}</a> : <Link to={`/#${s.id}`}>{s.label}</Link>}
              </li>
            ))}
            {site.showBlog && (
              <li><Link to="/blog/" className={isBlog ? 'is-active' : ''}>Blog</Link></li>
            )}
          </ul>
        </nav>

        <div className="header__actions">
          <a href={profile.resume} className="btn btn--primary btn--sm" target="_blank" rel="noreferrer">
            Resume <ArrowUpRight size={14} />
          </a>
          <button
            className="menu-toggle"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </div>
    </header>
  )
}
