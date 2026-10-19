import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { IconContext } from '@phosphor-icons/react'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/700.css'
import '@fontsource/rock-salt/400.css'
import '@fontsource/space-mono/400.css'
import '@fontsource/space-mono/700.css'
import './styles/index.css'
import App from './App.jsx'

const app = (
  <StrictMode>
    <BrowserRouter>
      <IconContext.Provider value={{ weight: 'light' }}>
        <App />
      </IconContext.Provider>
    </BrowserRouter>
  </StrictMode>
)

// Tidy the address before the router reads it (GitHub Pages can't do this server-side):
//   /index.html → /      /blog/index.html → /blog/
//   on the 404 page, /BLOG/Post/ → /blog/post/ (all addresses on this site are lowercase)
const { pathname, search, hash } = window.location
const isNotFoundPage = document.querySelector('meta[name="robots"][content^="noindex"]')
if (pathname.endsWith('/index.html')) {
  window.history.replaceState(null, '', pathname.slice(0, -'index.html'.length) + search + hash)
} else if (isNotFoundPage && pathname !== pathname.toLowerCase()) {
  window.location.replace(pathname.toLowerCase() + search + hash)
}

// Production pages are prerendered at build time (see src/entry-server.jsx), so we
// attach to the existing HTML. In `npm run dev` the root is empty, so we render fresh.
const root = document.getElementById('root')
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
