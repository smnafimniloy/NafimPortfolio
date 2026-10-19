import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { IconContext } from '@phosphor-icons/react'
import '@fontsource/playfair-display/700.css'
import '@fontsource/playfair-display/700-italic.css'
import '@fontsource/lato/400.css'
import '@fontsource/lato/700.css'
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

// Production pages are prerendered at build time (see src/entry-server.jsx), so we
// attach to the existing HTML. In `npm run dev` the root is empty, so we render fresh.
const root = document.getElementById('root')
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
