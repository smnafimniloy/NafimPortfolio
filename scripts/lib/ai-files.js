// llms.txt (https://llmstxt.org) is a plain-Markdown summary that AI assistants such as
// ChatGPT, Claude and Perplexity can read quickly. llms-full.txt has every detail.
// Both are generated from content/ on every build, so they never go out of date.
import {
  site, profile, experience, education, research, projects, skills, papers, inProgress,
  posts, github, currentJob, abs, routes,
} from './data.js'

// admin@nafim.dev → "admin (at) nafim (dot) dev"
export const obfuscate = email => email.replace('@', ' (at) ').replace(/\./g, ' (dot) ')

const line = (...parts) => parts.filter(Boolean).join(' · ')
const pubLine = p => `- ${p.title} — ${line(p.type, p.conference, p.status)}${p.doi ? ` (DOI ${p.doi})` : ''}`

function intro() {
  return [
    `# ${profile.name}`,
    '',
    `> ${site.description}`,
    '',
    profile.bio,
    '',
    `- Current role: ${currentJob ? `${currentJob.role} at ${currentJob.organization} (${currentJob.period})` : profile.subtitle}`,
    `- Location: ${profile.location}`,
    `- Email: ${obfuscate(profile.email)} (written this way to avoid spam bots)`,
    `- Contact page: ${abs('/#contact')}`,
    `- Website: ${abs('/')}`,
    profile.availability ? `- Status: ${profile.availability}` : '',
  ].filter(l => l !== null).join('\n')
}

export function llmsTxt() {
  return [
    intro(),
    '',
    '## Pages',
    `- [Portfolio](${abs('/')}): experience, education, research, papers, projects, skills and contact`,
    site.showBlog ? `- [Blog](${abs(routes.blog)}): writing on ML research, engineering and life` : '',
    `- [Full profile for AI assistants](${abs('/llms-full.txt')}): everything on this site as plain text`,
    '',
    '## Experience',
    ...experience.map(j => `- ${j.role}, ${j.organization} (${j.period})${j.description ? `: ${j.description}` : ''}`),
    '',
    '## Education',
    ...education.map(e => `- ${e.degree}, ${e.institution}${e.period ? ` (${e.period})` : ''}`),
    '',
    '## Research',
    ...research.map(r => `- ${r.role}: ${r.title}${r.status ? ` — ${r.status}` : ''}`),
    '',
    '## Papers',
    ...(papers.length ? papers.map(pubLine) : ['- None yet']),
    '',
    '## Work in progress (not yet published)',
    ...inProgress.map(pubLine),
    '',
    '## Projects',
    ...projects.map(p => `- [${p.title}](${p.demo || p.github}): ${p.description}`),
    '',
    ...(site.showBlog && posts.length ? ['## Blog posts', ...posts.map(p => `- [${p.title}](${abs(routes.post(p.slug))}): ${p.excerpt}`), ''] : []),
    '## Elsewhere',
    `- [GitHub](${profile.github})`,
    `- [LinkedIn](${profile.linkedin})`,
    '',
  ].join('\n')
}

export function llmsFullTxt() {
  const section = (title, items) => (items.length ? [`## ${title}`, '', ...items, ''] : [])
  return [
    intro(),
    '',
    ...section('Experience', experience.map(j => [
      `### ${j.role} — ${j.organization}`,
      line(j.period, j.location, j.link),
      j.description,
      ...(j.points ?? []).map(p => `- ${p}`),
      '',
    ].filter(Boolean).join('\n'))),
    ...section('Education', education.map(e => `- ${line(e.degree, e.institution, e.location, e.period, e.grade)}`)),
    ...section('Research', research.map(r => [
      `### ${r.title}`,
      line(r.role, r.institution, r.period, r.status),
      r.description,
      `Topics: ${r.tags.join(', ')}`,
      '',
    ].filter(Boolean).join('\n'))),
    ...section('Papers (journal accepted/published, conference presented/published)', papers.map(pubLine)),
    ...section('Work in progress', inProgress.map(pubLine)),
    ...section('Projects', projects.map(p => [
      `### ${p.title}`,
      p.description,
      `Built with: ${p.tags.join(', ')}`,
      `Code: ${p.github}`,
      p.demo ? `Live demo: ${p.demo}` : '',
      '',
    ].filter(Boolean).join('\n'))),
    ...section('Skills', Object.entries(skills).map(([g, items]) => `- ${g}: ${items.join(', ')}`)),
    ...section(`Recent GitHub repositories (${github.repoCount} public)`, github.repos.map(r => `- [${r.name}](${r.url})${r.description ? `: ${r.description}` : ''}`)),
    ...(site.showBlog ? posts.flatMap(p => [
      `## Blog: ${p.title}`,
      `${abs(routes.post(p.slug))} · ${p.date} · ${p.tags.join(', ')}`,
      '',
      p.body.trim(),
      '',
    ]) : []),
  ].join('\n')
}
