import { research } from '@content/research'
import Section from '../layout/Section'
import Tags from '../ui/Tags'
import { ArrowUpRight, FileText } from '../ui/icons'
import { slugify } from '../../lib/format'
import { papers, inProgress } from '../../lib/publications'

export default function Research(props) {
  return (
    <Section {...props} title={<>Research &amp; <em>publications</em></>}>
      <div className={`grid${research.length > 1 ? ' grid--2' : ''}`}>
        {research.map(item => (
          <article className="card" key={item.title}>
            <p className="card__meta">
              <span>{item.role} · {item.institution}</span>
              {item.period && <span>{item.period}</span>}
            </p>
            <h3 className="card__title">{item.title}</h3>
            {item.status && <p className="research__status"><span className="pulse-dot" /> {item.status}</p>}
            <p className="card__text">{item.description}</p>
            <Tags items={item.tags} />
          </article>
        ))}
      </div>

      <PublicationList title="Papers" items={papers} />
      <PublicationList title="In progress" items={inProgress} />
    </Section>
  )
}

function PublicationList({ title, items }) {
  if (!items.length) return null
  return (
    <>
      <h3 className="subhead">{title} <span className="subhead__count">{items.length}</span></h3>
      <ol className="pubs">
        {items.map(pub => (
          <li className="pub" key={pub.title}>
            <FileText size={26} className="pub__icon" />
            <div>
              <p className="pub__title">{pub.title}</p>
              <div className="pub__meta">
                {pub.type && <span className="pub__type">{pub.type}</span>}
                {pub.status && (
                  <span className={`status status--${slugify(pub.status)}`}>{pub.status}</span>
                )}
                {pub.conferenceLink ? (
                  <a href={pub.conferenceLink} className="pub__venue" target="_blank" rel="noreferrer">
                    {pub.conference} <ArrowUpRight size={13} />
                  </a>
                ) : (
                  <span className="pub__venue">{pub.conference}</span>
                )}
                {pub.doi && (
                  <a href={`https://doi.org/${pub.doi}`} className="pub__venue" target="_blank" rel="noreferrer">
                    DOI {pub.doi}
                  </a>
                )}
                {pub.date && <span className="pub__date">{pub.date}</span>}
              </div>
              <Tags items={pub.tags} />
            </div>
          </li>
        ))}
      </ol>
    </>
  )
}
