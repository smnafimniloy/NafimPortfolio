// Tiny frontmatter parser shared by the browser (blog pages) and Node (build scripts).
// Supports `key: value` lines, quoted strings, booleans and comma-separated `tags`.

export function parseFrontmatter(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw)
  if (!match) return { meta: {}, body: raw }

  const meta = {}
  for (const line of match[1].split(/\r?\n/)) {
    const i = line.indexOf(':')
    if (i === -1 || line.trimStart().startsWith('#')) continue
    const key = line.slice(0, i).trim()
    let value = line.slice(i + 1).trim()
    if (/^(["']).*\1$/.test(value)) value = value.slice(1, -1)
    else if (value === 'true') value = true
    else if (value === 'false') value = false
    meta[key] = value
  }

  if (typeof meta.tags === 'string') {
    meta.tags = meta.tags.replace(/^\[|\]$/g, '').split(',').map(t => t.trim()).filter(Boolean)
  }
  return { meta, body: match[2] }
}

// "2024-07-18-weekend-at-kaptai-lake.md" -> "weekend-at-kaptai-lake"
export function slugFromFilename(path) {
  const file = path.split('/').pop().replace(/\.md$/, '')
  return file.replace(/^\d{4}-\d{2}-\d{2}-/, '')
}

export function toPost(path, raw) {
  const { meta, body } = parseFrontmatter(raw)
  return {
    slug: slugFromFilename(path),
    title: meta.title ?? 'Untitled',
    date: String(meta.date ?? ''),
    cover: meta.cover || '',
    tags: meta.tags ?? [],
    excerpt: meta.excerpt ?? '',
    draft: meta.draft === true,
    body,
  }
}

export function isPublishable(path) {
  return !path.split('/').pop().startsWith('_')
}
