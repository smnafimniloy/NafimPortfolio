import { experience } from '@content/experience'
import Section from '../layout/Section'
import Tags from '../ui/Tags'
import { ArrowUpRight, MapPin } from '../ui/icons'

export default function Experience(props) {
  if (!experience.length) return null
  return (
    <Section {...props} title={<>Where I <em>work</em></>}>
      <div className={`grid${experience.length > 1 ? ' grid--2' : ''}`}>
        {experience.map(job => (
          <article className="card job" key={`${job.role}-${job.organization}`}>
            <p className="card__meta">
              <span><MapPin size={14} /> {job.location}</span>
              <span>{job.period}</span>
            </p>
            <h3 className="card__title">{job.role}</h3>
            <p className="job__org">
              {job.link ? (
                <a href={job.link} className="link" target="_blank" rel="noreferrer">
                  {job.organization} <ArrowUpRight size={13} />
                </a>
              ) : (
                job.organization
              )}
              {job.current && <span className="job__current"><span className="pulse-dot" /> Current</span>}
            </p>
            {job.description && <p className="card__text">{job.description}</p>}
            {job.points?.length > 0 && (
              <ul className="bullets">
                {job.points.map(pt => <li key={pt}>{pt}</li>)}
              </ul>
            )}
            <Tags items={job.tags} />
          </article>
        ))}
      </div>
    </Section>
  )
}
