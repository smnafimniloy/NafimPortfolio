import { data } from '../data'

export default function Volunteering() {
  return (
    <section className="section" id="volunteering">
      <div className="container">
        <p className="section-label">07 / Community</p>
        <h2 className="section-title">Volunteering &amp; Leadership</h2>

        <div className="vol-grid">
          {data.volunteering.map((item, i) => (
            <div className="vol-card" key={i}>
              <div className="vol-card-head">
                <div>
                  <p className="vol-event">{item.event}</p>
                  <p className="vol-role">{item.role}</p>
                </div>
                <span className="vol-period">{item.period}</span>
              </div>
              <ul className="vol-points">
                {item.points.map((pt, j) => (
                  <li key={j}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
