import { marked } from 'marked'
import { toPost, isPublishable } from './frontmatter'

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
  return marked.parse(md)
}
