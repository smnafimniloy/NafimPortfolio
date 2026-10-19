// Loads everything in content/ (plus the GitHub data fetched before the build)
// so the SEO, sitemap, feed and llms.txt generators all describe the same facts.
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { site } from '../../content/site.js'
import { profile } from '../../content/profile.js'
import { experience } from '../../content/experience.js'
import { education } from '../../content/education.js'
import { research } from '../../content/research.js'
import { projects } from '../../content/projects.js'
import { skills } from '../../content/skills.js'
import { papers, inProgress } from '../../src/lib/publications.js'
import { toPost, isPublishable } from '../../src/lib/frontmatter.js'

const GITHUB_JSON = 'src/generated/github.json'

export const github = existsSync(GITHUB_JSON)
  ? JSON.parse(readFileSync(GITHUB_JSON, 'utf8'))
  : { repoCount: profile.stats.repos, repos: [] }

export const posts = readdirSync('content/blog')
  .filter(f => f.endsWith('.md') && isPublishable(f))
  .map(f => toPost(f, readFileSync(`content/blog/${f}`, 'utf8')))
  .filter(p => !p.draft)
  .sort((a, b) => b.date.localeCompare(a.date))

export const currentJob = experience.find(j => j.current) ?? experience[0]

// "/blog/" → "https://nafim.dev/blog/"
export const abs = path => (/^https?:/.test(path) ? path : `${site.url}${path}`)

export const routes = {
  home: '/',
  blog: '/blog/',
  post: slug => `/blog/${slug}/`,
}

export { site, profile, experience, education, research, projects, skills, papers, inProgress }
