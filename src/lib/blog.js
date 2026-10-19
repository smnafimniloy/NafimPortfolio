import { marked } from 'marked'
import { toPost, isPublishable } from './frontmatter'

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// Images inside posts load lazily (only when scrolled to). A title becomes a caption:
//   ![Alt text](/blog/photo.webp "Caption shown under the photo")
marked.use({
  renderer: {
    image({ href, title, text }) {
      const img = `<img src="${esc(href)}" alt="${esc(text)}" loading="lazy" decoding="async" />`
      return title ? `<figure>${img}<figcaption>${esc(title)}</figcaption></figure>` : img
    },
  },
})

// Every Markdown file in content/blog is bundled at build time.
const files = import.meta.glob('/content/blog/*.md', { query: '?raw', import: 'default', eager: true })

export const posts = Object.entries(files)
  .filter(([path]) => isPublishable(path))
  .map(([path, raw]) => toPost(path, raw))
  .filter(post => !post.draft || import.meta.env.DEV)
  .sort((a, b) => b.date.localeCompare(a.date))

export function getPost(slug) {
  return posts.find(p => p.slug === slug)
}

export function renderMarkdown(md) {
  // A captioned image on its own line becomes a <figure>, which can't sit inside a <p>.
  return marked.parse(md).replace(/<p>(<figure>[\s\S]*?<\/figure>)<\/p>/g, '$1')
}
