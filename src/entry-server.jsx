// Build-time renderer. scripts/postbuild.js calls render(url) for every page so the
// published HTML already contains all the text (for Google, Bing and AI crawlers that
// don't run JavaScript). In the browser, main.jsx hydrates this HTML.
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { IconContext } from '@phosphor-icons/react'
import App from './App.jsx'

export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <IconContext.Provider value={{ weight: 'light' }}>
        <App />
      </IconContext.Provider>
    </StaticRouter>,
  )
}
