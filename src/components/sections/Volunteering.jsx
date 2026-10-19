import { volunteering } from '@content/volunteering'
import Section from '../layout/Section'

export default function Volunteering(props) {
  return (
    <Section {...props} title={<>Volunteering &amp; <em>leadership</em></>}>
      <div className="grid grid--2">
        {volunteering.map(item => (
          <article className="card" key={item.event}>
            <p className="card__meta">
              <span>{item.role}</span>
              {item.period && <span>{item.period}</span>}
            </p>
            <h3 className="card__title">{item.event}</h3>
            <ul className="bullets">
              {item.points.map(pt => <li key={pt}>{pt}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}
