// Redirect pages for GitHub Pages, which has no server-side redirect rules.
// Each old/short address gets a tiny HTML page that forwards instantly:
//   • <meta http-equiv="refresh" content="0"> (Google treats an instant refresh as a permanent redirect)
//   • <link rel="canonical"> pointing at the new address
//   • a JavaScript fallback, and a plain link for everyone else
// Redirect pages are marked noindex and left out of the sitemap.
import { site, profile, abs } from './data.js'

const SHORTCUTS = { resume: profile.resume, github: profile.github, linkedin: profile.linkedin }

const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

export function normalisePath(path) {
  let p = path.trim()
  if (!p.startsWith('/')) p = `/${p}`
  if (!/\.[a-z0-9]+$/i.test(p) && !p.endsWith('/')) p += '/'
  return p.toLowerCase()
}

export function redirectList() {
  return Object.entries(site.redirects ?? {}).map(([from, to]) => {
    const target = SHORTCUTS[to] ?? to
    if (!target) throw new Error(`Redirect "${from}" points to "${to}", which is empty in content/profile.js`)
    const url = /^https?:\/\//.test(target) ? target : abs(normalisePath(target))
    return { from: normalisePath(from), to: url }
  })
}

export function redirectPage(to) {
  const url = esc(to)
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Redirecting…</title>
    <meta name="robots" content="noindex" />
    <link rel="canonical" href="${url}" />
    <meta http-equiv="refresh" content="0; url=${url}" />
    <script>location.replace(${JSON.stringify(to)} + location.hash)</script>
  </head>
  <body style="font-family:system-ui,sans-serif;background:#F4EFE6;color:#1F1B16;padding:40px">
    <p>This page has moved to <a href="${url}">${url}</a>.</p>
  </body>
</html>
`
}
