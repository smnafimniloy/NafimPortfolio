import { profile } from '@content/profile'
import { papers } from '../../lib/publications'
import CountUp from '../ui/CountUp'
import RotatingBadge from '../ui/RotatingBadge'
import ProtectedEmail from '../ui/ProtectedEmail'
import { ArrowRight, GithubLogo, LinkedinLogo, MapPin, EnvelopeSimple } from '../ui/icons'
import github from '../../generated/github.json'

export default function Hero() {
  const [first, ...rest] = profile.name.split(' ').reverse()
  const leading = rest.reverse().join(' ')

  const stats = [
    { label: 'Papers', value: profile.stats.papers ?? papers.length },
    { label: 'Projects', value: profile.stats.projects, suffix: '+' },
    { label: 'Repos', value: github.repoCount ?? profile.stats.repos, suffix: '+' },
  ]

  return (
    <section className="hero">
      <div className="hero__blob" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__copy">
          {profile.availability && (
            <p className="hero__status">
              <span className="pulse-dot" /> {profile.availability}
            </p>
          )}
          <h1 className="hero__name">
            {leading} <em>{first}</em>
          </h1>
          <p className="hero__subtitle">{profile.subtitle}</p>
          <p className="hero__bio">{profile.bio}</p>

          <div className="hero__actions">
            <a href="#projects" className="btn btn--primary">
              View projects <ArrowRight size={16} />
            </a>
            <a href={profile.github} className="btn btn--outline" target="_blank" rel="noreferrer">
              <GithubLogo size={18} /> GitHub
            </a>
            <a href={profile.linkedin} className="btn btn--outline" target="_blank" rel="noreferrer">
              <LinkedinLogo size={18} /> LinkedIn
            </a>
          </div>
        </div>

        <aside className="hero__card card">
          {profile.availability && <RotatingBadge text={profile.availability.toLowerCase()} />}
          {profile.headshot && (
            <div className="hero__photo">
              <img src={profile.headshot} alt={profile.name} width="640" height="640" />
            </div>
          )}
          <ul className="hero__facts">
            <li><MapPin size={18} /> {profile.location}</li>
            <li>
              <EnvelopeSimple size={18} />
              <ProtectedEmail />
            </li>
          </ul>
          <dl className="hero__stats">
            {stats.map((s, i) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd><CountUp to={s.value} suffix={s.suffix} delay={400 + i * 120} /></dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  )
}
