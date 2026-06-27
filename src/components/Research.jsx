import { data } from '../data'

function LinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

export default function Research() {
  return (
    <section className="section" id="research">
      <div className="container">
        <p className="section-label">02 / Research</p>
        <h2 className="section-title">Research &amp; Publications</h2>

        {/* Research positions */}
        <div className="research-grid">
          {data.research.map((item, i) => (
            <div className="research-card" key={i}>
              <div className="research-card-head">
                <span className="research-role">
                  {item.role} · {item.institution}
                </span>
                {item.period && <span className="research-period">{item.period}</span>}
              </div>
              <h3 className="research-title">{item.title}</h3>
              <p className="research-desc">{item.description}</p>
              <div className="tags">
                {item.tags.map(tag => (
                  <span className="tag" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Publications */}
        <h3 className="pubs-title">Publications</h3>
        <div>
          {data.publications.map((pub, i) => (
            <div className="pub-item" key={i}>
              <div className="pub-icon">📄</div>
              <div className="pub-content">
                <div className="pub-title-row">
                  <p className="pub-title">{pub.title}</p>
                  {pub.status && (
                    <span className={`pub-status pub-status--${pub.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {pub.status}
                    </span>
                  )}
                </div>
                <div className="pub-meta">

                  {/* Conference badge — links out if conferenceLink is set */}
                  {pub.conferenceLink && pub.conferenceLink !== '#' ? (
                    <a
                      href={pub.conferenceLink}
                      className="pub-conference pub-conference-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      ✦ {pub.conference} <LinkIcon />
                    </a>
                  ) : (
                    <span className="pub-conference">✦ {pub.conference}</span>
                  )}

                  {/* DOI — only shown when filled in */}
                  {pub.doi && (
                    <a
                      href={`https://doi.org/${pub.doi}`}
                      className="pub-doi"
                      target="_blank"
                      rel="noreferrer"
                    >
                      DOI: {pub.doi}
                    </a>
                  )}

                  <div className="tags">
                    {pub.tags.map(tag => (
                      <span className="tag" key={tag}>{tag}</span>
                    ))}
                  </div>

                  {pub.date && <span className="pub-date">{pub.date}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
