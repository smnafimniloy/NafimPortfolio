// Builds the <head> tags and schema.org structured data (JSON-LD) for each page.
// Structured data is what Google, Bing and AI assistants read to understand
// who you are, where you work and study, and what you've written.
import {
  site, profile, experience, education, research, projects, skills, papers, posts,
  currentJob, abs, routes,
} from './data.js'

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const today = new Date().toISOString().slice(0, 10)

const PERSON_ID = abs('/#person')
const WEBSITE_ID = abs('/#website')

// ── Head tags ─────────────────────────────────────────────────
export function headTags({ title, description, path, type = 'website', image, imageAlt, published, tags = [], noindex = false, jsonLd }) {
  const url = abs(path)
  const img = abs(image || site.seo.image)
  const isDefaultImage = !image || image === site.seo.image
  const { seo } = site

  const tagsHtml = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<meta name="author" content="${esc(profile.name)}" />`,
    `<meta name="keywords" content="${esc([...seo.keywords, ...tags].join(', '))}" />`,
    `<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}" />`,
    noindex ? '' : `<link rel="canonical" href="${url}" />`,

    // Open Graph (LinkedIn, Facebook, WhatsApp, Discord, Slack…)
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:site_name" content="${esc(site.url.replace(/^https?:\/\//, ''))}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta property="og:image:alt" content="${esc(imageAlt || title)}" />`,
    isDefaultImage ? '<meta property="og:image:width" content="1200" />' : '',
    isDefaultImage ? '<meta property="og:image:height" content="630" />' : '',
    type === 'profile' ? `<meta property="profile:username" content="${esc(profile.github.split('/').pop())}" />` : '',
    published ? `<meta property="article:published_time" content="${published}" />` : '',
    published ? `<meta property="article:author" content="${abs('/')}" />` : '',
    ...tags.map(t => `<meta property="article:tag" content="${esc(t)}" />`),

    // X / Twitter
    `<meta name="twitter:card" content="summary_large_image" />`,
    seo.twitter ? `<meta name="twitter:site" content="${esc(seo.twitter)}" />` : '',
    seo.twitter ? `<meta name="twitter:creator" content="${esc(seo.twitter)}" />` : '',
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${img}" />`,

    // Search Console verification (only printed when filled in content/site.js)
    seo.googleVerification ? `<meta name="google-site-verification" content="${esc(seo.googleVerification)}" />` : '',
    seo.bingVerification ? `<meta name="msvalidate.01" content="${esc(seo.bingVerification)}" />` : '',
    seo.yandexVerification ? `<meta name="yandex-verification" content="${esc(seo.yandexVerification)}" />` : '',

    // Feeds & AI-readable summaries
    site.showBlog ? `<link rel="alternate" type="application/rss+xml" title="${esc(profile.name)} · Blog" href="${abs('/blog/feed.xml')}" />` : '',
    `<link rel="alternate" type="text/plain" title="Summary for AI assistants" href="${abs('/llms.txt')}" />`,

    jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>` : '',
  ]
  return tagsHtml.filter(Boolean).map(t => `    ${t}`).join('\n')
}

// ── Structured data ───────────────────────────────────────────
function place(location) {
  if (!location) return undefined
  const parts = location.split(',').map(s => s.trim())
  return { '@type': 'PostalAddress', addressLocality: parts[0], addressCountry: parts.at(-1) }
}

function organization(name, url, type = 'Organization') {
  return { '@type': type, name, ...(url ? { url } : {}) }
}

export function person() {
  const sameAs = [profile.github, profile.linkedin, site.seo.twitter && `https://x.com/${site.seo.twitter.replace('@', '')}`].filter(Boolean)
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: profile.name,
    alternateName: ['Nafim Niloy', 'S. M. Nafim Niloy', 'Nafim'],
    url: abs('/'),
    image: abs(profile.headshot || site.seo.image),
    description: site.description,
    jobTitle: currentJob ? currentJob.role : profile.subtitle,
    worksFor: experience.filter(j => j.current).map(j => organization(j.organization, j.link)),
    hasOccupation: experience.map(j => ({
      '@type': 'Occupation',
      name: j.role,
      ...(j.description ? { description: j.description } : {}),
    })),
    affiliation: experience.map(j => organization(j.organization, j.link)),
    alumniOf: education.map(e => organization(e.institution, undefined, 'EducationalOrganization')),
    address: place(profile.location),
    homeLocation: place(profile.location),
    knowsAbout: [...new Set([...profile.interests, ...(skills['ML / AI'] ?? []), ...(skills.Languages ?? [])])],
    sameAs,
  }
}

function website() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: abs('/'),
    name: `${profile.name} · Portfolio`,
    description: site.description,
    inLanguage: 'en',
    publisher: { '@id': PERSON_ID },
    author: { '@id': PERSON_ID },
  }
}

function scholarly(pub) {
  return {
    '@type': 'ScholarlyArticle',
    headline: pub.title.slice(0, 110),
    name: pub.title,
    author: { '@id': PERSON_ID },
    keywords: pub.tags.join(', '),
    creativeWorkStatus: pub.status,
    ...(pub.doi ? { sameAs: `https://doi.org/${pub.doi}` } : {}),
    ...(pub.conferenceLink ? { url: pub.conferenceLink } : {}),
    publisher: organization(pub.conference, pub.conferenceLink),
  }
}

function breadcrumbs(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(path) })),
  }
}

export function homeJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      person(),
      website(),
      {
        '@type': 'ProfilePage',
        '@id': abs('/#profilepage'),
        url: abs('/'),
        name: `${profile.name} · ${profile.subtitle}`,
        isPartOf: { '@id': WEBSITE_ID },
        mainEntity: { '@id': PERSON_ID },
        about: { '@id': PERSON_ID },
        dateModified: today,
        inLanguage: 'en',
      },
      ...papers.map(scholarly),
      ...research.map(r => ({
        '@type': 'CreativeWork',
        name: r.title,
        description: r.description,
        creator: { '@id': PERSON_ID },
        ...(r.status ? { creativeWorkStatus: r.status } : {}),
        keywords: r.tags.join(', '),
      })),
      {
        '@type': 'ItemList',
        name: 'Projects',
        itemListElement: projects.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'SoftwareSourceCode',
            name: p.title,
            description: p.description,
            codeRepository: p.github,
            programmingLanguage: p.tags,
            author: { '@id': PERSON_ID },
            ...(p.demo ? { url: p.demo } : {}),
          },
        })),
      },
    ],
  }
}

export function blogJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': abs('/blog/#blog'),
        url: abs(routes.blog),
        name: `${profile.name} · Blog`,
        description: 'Thoughts on ML research, engineering, and things I am learning.',
        author: { '@id': PERSON_ID },
        publisher: { '@id': PERSON_ID },
        isPartOf: { '@id': WEBSITE_ID },
        blogPost: posts.map(p => ({
          '@type': 'BlogPosting',
          headline: p.title,
          url: abs(routes.post(p.slug)),
          datePublished: p.date,
        })),
      },
      breadcrumbs([['Home', '/'], ['Blog', routes.blog]]),
      { ...person(), '@id': PERSON_ID },
    ],
  }
}

export function postJsonLd(post) {
  const url = abs(routes.post(post.slug))
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        mainEntityOfPage: url,
        url,
        headline: post.title.slice(0, 110),
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: 'en',
        keywords: post.tags.join(', '),
        wordCount: post.body.split(/\s+/).filter(Boolean).length,
        ...(post.cover ? { image: abs(post.cover) } : { image: abs(site.seo.image) }),
        author: { '@id': PERSON_ID },
        publisher: { '@id': PERSON_ID },
        isPartOf: { '@id': abs('/blog/#blog') },
      },
      breadcrumbs([['Home', '/'], ['Blog', routes.blog], [post.title, routes.post(post.slug)]]),
      { ...person(), '@id': PERSON_ID },
    ],
  }
}
