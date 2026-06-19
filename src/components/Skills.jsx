import { data } from '../data'

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <p className="section-label">05 / Stack</p>
        <h2 className="section-title">Skills &amp; toolkit</h2>

        <div className="skills-grid">
          {Object.entries(data.skills).map(([category, items]) => (
            <div key={category}>
              <p className="skill-group-title">{category}</p>
              <div className="skill-tags">
                {items.map(item => (
                  <span className="tag" key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
