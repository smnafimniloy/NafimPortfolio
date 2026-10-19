// Runs after both Vite builds (browser bundle → dist/, server renderer → dist-ssr/).
// For every page it:
//   1. prerenders the React app to real HTML (search engines and AI crawlers see the text
//      without running JavaScript)
//   2. writes that page's own <head>: title, description, canonical URL, social preview
//      tags and schema.org structured data
// Then it writes 404.html, sitemap.xml, the blog RSS feed, llms.txt and llms-full.txt.

import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'
import { site, profile, posts, routes } from './lib/data.js'
import { headTags, homeJsonLd, blogJsonLd, postJsonLd } from './lib/seo.js'
import { sitemapXml, rssXml } from './lib/feeds.js'
import { llmsTxt, llmsFullTxt, robotsTxt } from './lib/ai-files.js'

const { render } = await import(pathToFileURL(resolve('dist-ssr/entry-server.js')).href)
const template = readFileSync('dist/index.html', 'utf8')
if (!/<!-- seo:start[\s\S]*?<!-- seo:end -->/.test(template)) throw new Error('index.html is missing the seo:start / seo:end markers')

function page(url, head) {
  return template
    .replace(/[ \t]*<!-- seo:start[\s\S]*?<!-- seo:end -->/, head)
    .replace('<div id="root"></div>', `<div id="root">${render(url)}</div>`)
}

function write(file, html) {
  const out = `dist${file}`
  mkdirSync(out.slice(0, out.lastIndexOf('/')), { recursive: true })
  writeFileSync(out, html)
  console.log(`  ${out}`)
}

const homeTitle = `${profile.name} · ${profile.subtitle}`

write('/index.html', page(routes.home, headTags({
  title: homeTitle,
  description: site.description,
  path: routes.home,
  type: 'profile',
  imageAlt: `${profile.name}, ${profile.subtitle}`,
  jsonLd: homeJsonLd(),
})))

if (site.showBlog) {
  write('/blog/index.html', page(routes.blog, headTags({
    title: `Blog · ${profile.name}`,
    description: `Writing by ${profile.name} on ML research, engineering, and things I am learning.`,
    path: routes.blog,
    jsonLd: blogJsonLd(),
  })))

  for (const post of posts) {
    write(`/blog/${post.slug}/index.html`, page(routes.post(post.slug), headTags({
      title: `${post.title} · ${profile.name}`,
      description: post.excerpt,
      path: routes.post(post.slug),
      type: 'article',
      image: post.cover || undefined,
      imageAlt: post.title,
      published: post.date,
      tags: post.tags,
      jsonLd: postJsonLd(post),
    })))
  }

  write('/blog/feed.xml', rssXml())
}

write('/404.html', page('/404/', headTags({
  title: `Page not found · ${profile.name}`,
  description: "The page you're looking for doesn't exist.",
  path: '/404/',
  noindex: true,
})))

write('/sitemap.xml', sitemapXml())
write('/llms.txt', llmsTxt())
write('/llms-full.txt', llmsFullTxt())
write('/robots.txt', robotsTxt())

// Custom domain (GitHub Pages reads it from Settings → Pages; this keeps the build self-describing).
const host = new URL(site.url).host
if (!host.endsWith('github.io')) write('/CNAME', `${host}\n`)

// IndexNow proves you own the site by serving the key at /<key>.txt
if (site.seo.indexNowKey) write(`/${site.seo.indexNowKey}.txt`, site.seo.indexNowKey)

rmSync('dist-ssr', { recursive: true, force: true })

// Anti-spam guard: the plain email address must not appear in any published text file.
const TEXT = /\.(html|js|css|txt|xml|json|webmanifest|svg|md)$/
const leaks = readdirSync('dist', { recursive: true })
  .filter(f => TEXT.test(f))
  .filter(f => readFileSync(`dist/${f}`, 'utf8').toLowerCase().includes(profile.email.toLowerCase()))
if (leaks.length) {
  throw new Error(`Your email address is visible to spam bots in: ${leaks.join(', ')}. Use <ProtectedEmail> instead of printing profile.email.`)
}
console.log('Spam check: email address is not exposed in any published file.')
console.log(`Postbuild done: ${posts.length} post(s) prerendered, sitemap, feed, llms.txt (${site.url})`)
