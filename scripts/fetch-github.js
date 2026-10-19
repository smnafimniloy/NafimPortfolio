// Fetches your latest public repositories at BUILD time and writes them to
// src/generated/github.json. The website never calls GitHub from the browser,
// so no token ever ends up in the public bundle.
//
// In GitHub Actions the built-in GITHUB_TOKEN is used automatically (higher rate limit).
// Locally it works without a token. If GitHub can't be reached, the fallback list
// in content/github.js is used, so the build never fails because of this.

import { mkdirSync, writeFileSync } from 'node:fs'
import { profile } from '../content/profile.js'
import { github, fallbackRepos } from '../content/github.js'

const OUT = 'src/generated/github.json'
const user = github.username
const headers = { Accept: 'application/vnd.github+json', 'User-Agent': `${user}-portfolio` }
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`

async function get(url) {
  const res = await fetch(url, { headers, signal: AbortSignal.timeout(10000) })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`)
  return res.json()
}

function write(payload) {
  mkdirSync('src/generated', { recursive: true })
  writeFileSync(OUT, JSON.stringify(payload, null, 2) + '\n')
}

try {
  const [account, all] = await Promise.all([
    get(`https://api.github.com/users/${user}`),
    get(`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`),
  ])

  const repos = all
    .filter(r => !r.fork && !r.archived && !github.hide.includes(r.name))
    .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.pushed_at) - new Date(a.pushed_at))
    .slice(0, github.count)
    .map(r => ({
      name: r.name,
      description: r.description ?? '',
      language: r.language ?? '',
      stars: r.stargazers_count,
      forks: r.forks_count,
      url: r.html_url,
      pushedAt: r.pushed_at,
    }))

  write({ source: 'github', fetchedAt: new Date().toISOString(), repoCount: account.public_repos, repos })
  console.log(`GitHub: saved ${repos.length} repos (${account.public_repos} public) to ${OUT}`)
} catch (err) {
  console.warn(`GitHub: could not fetch (${err.message}). Using fallbackRepos from content/github.js`)
  write({ source: 'fallback', fetchedAt: null, repoCount: profile.stats.repos, repos: fallbackRepos })
}
