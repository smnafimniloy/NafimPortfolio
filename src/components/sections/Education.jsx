import { education } from '@content/education'
import Section from '../layout/Section'
import { MapPin } from '../ui/icons'

// Education timeline, newest first. A dot travels down the line on a loop.
export default function Education(props) {
  return (
    <Section {...props} title={<>Where I <em>studied</em></>}>
      <ol className="timeline">
        {education.map(edu => (
          <li className="timeline__stop" key={edu.institution}>
            <div className="timeline__when">
              {edu.stage && <span className="timeline__stage">{edu.stage}</span>}
              {edu.period && <span>{edu.period}</span>}
            </div>
            <article className="card timeline__card">
              <p className="card__meta">
                <span><MapPin size={14} /> {edu.location}</span>
                {edu.grade && <span className="tag tag--accent">{edu.grade}</span>}
              </p>
              <h3 className="card__title">{edu.institution}</h3>
              <p className="timeline__degree">{edu.degree}</p>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  )
}
