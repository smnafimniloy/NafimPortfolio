// sitemap.xml (for Search Console / Bing Webmaster) and the blog's RSS feed.
import { site, profile, posts, abs, routes } from './data.js'

const xml = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const today = new Date().toISOString().slice(0, 10)

export function sitemapXml() {
  const urls = [
    { loc: routes.home, lastmod: today, priority: '1.0', changefreq: 'weekly', image: site.seo.image },
    ...(site.showBlog ? [{ loc: routes.blog, lastmod: posts[0]?.date ?? today, priority: '0.7', changefreq: 'weekly' }] : []),
    ...(site.showBlog ? posts.map(p => ({ loc: routes.post(p.slug), lastmod: p.date, priority: '0.6', changefreq: 'yearly', image: p.cover })) : []),
  ]
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.map(u => `  <url>
    <loc>${abs(u.loc)}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>${u.image ? `
    <image:image><image:loc>${abs(u.image)}</image:loc></image:image>` : ''}
  </url>`).join('\n')}
</urlset>
`
}

export function rssXml() {
  const rfc822 = d => new Date(`${d}T00:00:00Z`).toUTCString()
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${xml(profile.name)} · Blog</title>
    <link>${abs(routes.blog)}</link>
    <description>Thoughts on ML research, engineering, and things I am learning.</description>
    <language>en</language>
    <atom:link href="${abs('/blog/feed.xml')}" rel="self" type="application/rss+xml" />
${posts.map(p => `    <item>
      <title>${xml(p.title)}</title>
      <link>${abs(routes.post(p.slug))}</link>
      <guid isPermaLink="true">${abs(routes.post(p.slug))}</guid>
      <pubDate>${rfc822(p.date)}</pubDate>
      <dc:creator>${xml(profile.name)}</dc:creator>
      <description>${xml(p.excerpt)}</description>
${p.tags.map(t => `      <category>${xml(t)}</category>`).join('\n')}
    </item>`).join('\n')}
  </channel>
</rss>
`
}
