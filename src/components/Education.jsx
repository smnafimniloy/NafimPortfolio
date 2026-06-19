import { data } from '../data'

export default function Education() {
  return (
    <section className="section" id="education">
      <div className="container">
        <p className="section-label">01 / Education</p>
        <h2 className="section-title">Education</h2>

        <div className="edu-grid">
          {data.education.map((edu, i) => (
            <div className="edu-card" key={i}>
              <div className="edu-card-head">
                <span className="edu-institution">{edu.institution}</span>
                <span className="edu-period">{edu.period}</span>
              </div>
              <p className="edu-degree">{edu.degree}</p>
              <div className="edu-meta">
                <span className="edu-location">{edu.location}</span>
                {edu.grade && <span className="edu-grade">{edu.grade}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
