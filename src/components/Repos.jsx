import { useState, useEffect } from 'react'
import { data } from '../data'

const GITHUB_USERNAME = 'smnafimniloy'
const CACHE_KEY = 'gh_repos_cache'
const CACHE_TTL = 60 * 60 * 1000 // 1 hour in ms

const LANG_COLORS = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Java: '#b07219',
  'C++': '#f34b7d',
  'C#': '#178600',
  PHP: '#4F5D95',
  HTML: '#e34c26',
  CSS: '#563d7c',
  R: '#198CE7',
  Shell: '#89e051',
  'Jupyter Notebook': '#DA5B0B',
}

function getCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { ts, payload } = JSON.parse(raw)
    if (Date.now() - ts > CACHE_TTL) return null
    return payload
  } catch {
    return null
  }
}

function setCache(payload) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), payload }))
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(mins / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`
  if (weeks > 0) return `${weeks} week${weeks > 1 ? 's' : ''} ago`
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  return 'recently'
}

function buildHeaders() {
  const token = import.meta.env.VITE_GITHUB_TOKEN
  const headers = { Accept: 'application/vnd.github+json' }
  if (token) headers['Authorization'] = `Bearer ${token}`
  return headers
}

function StarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  )
}

function ForkIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 5C7 3.9 6.1 3 5 3S3 3.9 3 5s.9 2 2 2 2-.9 2-2zm12 0c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zM5 9c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm7 0c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2s2-.9 2-2v-4c0-1.1-.9-2-2-2zm-1-2v.5A2.5 2.5 0 0 1 8.5 10H7v2h1.5a4.5 4.5 0 0 0 3.5-1.69A4.5 4.5 0 0 0 15.5 12H17v-2h-1.5A2.5 2.5 0 0 1 13 7.5V7h-2z"/>
    </svg>
  )
}

function RepoSkeleton() {
  return (
    <div className="repo-card">
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-text" />
      <div className="skeleton skeleton-text short" />
      <div className="skeleton skeleton-meta" />
    </div>
  )
}

export default function Repos() {
  const [repos, setRepos] = useState([])
  const [repoCount, setRepoCount] = useState(data.repoCount)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [fromCache, setFromCache] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function fetchRepos() {
      // serve from cache instantly if fresh
      const cached = getCache()
      if (cached) {
        if (!cancelled) {
          setRepos(cached.repos)
          setRepoCount(cached.repoCount)
          setFromCache(true)
          setLoading(false)
        }
        return
      }

      try {
        const headers = buildHeaders()
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers }),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`, { headers }),
        ])

        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error')

        const [user, all] = await Promise.all([userRes.json(), reposRes.json()])
        if (cancelled) return

        const sorted = all
          .filter(r => !r.fork)
          .sort((a, b) => {
            const starDiff = b.stargazers_count - a.stargazers_count
            return starDiff !== 0 ? starDiff : new Date(b.pushed_at) - new Date(a.pushed_at)
          })
          .slice(0, 6)

        const payload = { repos: sorted, repoCount: user.public_repos }
        setCache(payload)

        setRepos(sorted)
        setRepoCount(user.public_repos)
        setFromCache(false)
      } catch {
        if (!cancelled) setError(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchRepos()
    return () => { cancelled = true }
  }, [])

  const displayRepos = error ? data.repos : repos

  return (
    <section className="section" id="repos">
      <div className="container">
        <p className="section-label">04 / Code</p>
        <h2 className="section-title">GitHub Repositories</h2>

        <div className="repos-header">
          <span className="repos-count">
            {repoCount} public repositories
            {fromCache && <span className="repos-cache-note"> · cached</span>}
            {error && <span className="repos-cache-note"> · showing cached data</span>}
          </span>
          <a href={data.github} className="repos-viewall" target="_blank" rel="noreferrer">
            View on GitHub →
          </a>
        </div>

        <div className="repos-grid">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <RepoSkeleton key={i} />)
          ) : (
            displayRepos.map((repo, i) => (
              <div className="repo-card" key={repo.id ?? i}>
                <a
                  href={repo.html_url ?? repo.github}
                  className="repo-name"
                  target="_blank"
                  rel="noreferrer"
                >
                  {repo.name}
                </a>
                <p className="repo-desc">{repo.description ?? '—'}</p>
                <div className="repo-meta">
                  {repo.language && (
                    <span className="repo-lang">
                      <span
                        className="lang-dot"
                        style={{ background: LANG_COLORS[repo.language] ?? '#6b7280' }}
                      />
                      {repo.language}
                    </span>
                  )}
                  <span className="repo-stat">
                    <StarIcon /> {repo.stargazers_count ?? repo.stars ?? 0}
                  </span>
                  <span className="repo-stat">
                    <ForkIcon /> {repo.forks_count ?? repo.forks ?? 0}
                  </span>
                  <span>Updated {repo.pushed_at ? timeAgo(repo.pushed_at) : repo.updated}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
