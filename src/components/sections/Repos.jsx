import { profile } from '@content/profile'
import Section from '../layout/Section'
import { Star, GitFork, ArrowUpRight } from '../ui/icons'
import { formatMonth } from '../../lib/format'
import github from '../../generated/github.json'

// Repo data is fetched during the build by scripts/fetch-github.js (no API calls in the browser).
const LANG_COLORS = {
  Python: '#3572A5',
  JavaScript: '#C9B23A',
  TypeScript: '#3178C6',
  Java: '#B07219',
  'C++': '#F34B7D',
  'C#': '#178600',
  PHP: '#4F5D95',
  HTML: '#E34C26',
  CSS: '#563D7C',
  R: '#198CE7',
  Shell: '#6A9F3A',
  'Jupyter Notebook': '#DA5B0B',
}

export default function Repos(props) {
  return (
    <Section {...props} title={<>Recent <em>code</em></>}>
      <div className="repos__bar">
        <span>{github.repoCount} public repositories</span>
        <a href={profile.github} className="link" target="_blank" rel="noreferrer">
          View all on GitHub <ArrowUpRight size={14} />
        </a>
      </div>

      <div className="grid grid--3">
        {github.repos.map(repo => (
          <a className="card repo" href={repo.url} key={repo.name} target="_blank" rel="noreferrer">
            <h3 className="repo__name">{repo.name}</h3>
            <p className="card__text">{repo.description || 'No description yet.'}</p>
            <p className="repo__meta">
              {repo.language && (
                <span>
                  <i className="lang-dot" style={{ background: LANG_COLORS[repo.language] ?? '#8A7F70' }} />
                  {repo.language}
                </span>
              )}
              <span><Star size={14} /> {repo.stars}</span>
              <span><GitFork size={14} /> {repo.forks}</span>
              {repo.pushedAt && <span>Updated {formatMonth(repo.pushedAt)}</span>}
            </p>
          </a>
        ))}
      </div>
    </Section>
  )
}
