import { publications } from '../../content/publications.js'

// What counts as a "paper":
//   Journal    → Accepted or Published
//   Conference → Presented or Published
// Everything else (Submitted, Under Review, an accepted conference paper not yet presented…)
// is shown separately as work in progress.
const PAPER_STATUS = {
  journal: ['accepted', 'published'],
  conference: ['presented', 'published'],
}

export function isPaper(pub) {
  const allowed = PAPER_STATUS[pub.type?.toLowerCase()] ?? []
  return allowed.includes(pub.status?.toLowerCase())
}

export const papers = publications.filter(isPaper)
export const inProgress = publications.filter(p => !isPaper(p))
