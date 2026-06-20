import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { data } from '../data'

function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return [theme, () => setTheme(t => t === 'dark' ? 'light' : 'dark')]
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}

export default function Header() {
  const [theme, toggleTheme] = useTheme()
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <Link to="/" className="logo">
            nafim<span>.dev</span>
          </Link>

          <ul className="nav">
            {isHome ? (
              <>
                <li><a href="#education">Education</a></li>
                <li><a href="#research">Research</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#repos">Repos</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#contact">Contact</a></li>
              </>
            ) : null}
            <li><Link to="/blog" className={location.pathname.startsWith('/blog') ? 'nav-active' : ''}>Blog</Link></li>
          </ul>

          <div className="header-right">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
            <Link
              to="/blog"
              className={`btn-blog-mobile${location.pathname.startsWith('/blog') ? ' nav-active' : ''}`}
            >
              Blog
            </Link>
            <a href={data.resume} className="btn-resume">Resume</a>
          </div>
        </div>
      </div>
    </header>
  )
}
