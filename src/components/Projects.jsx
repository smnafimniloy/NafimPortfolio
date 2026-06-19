import { data } from '../data'

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}

function LiveIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

function ProjectCard({ project }) {
  const hasLive = project.demo && project.demo !== '#'

  return (
    <div className={`project-card${project.featured ? ' featured' : ''}`}>
      <div className="project-card-top">
        <div className="project-icon">{project.icon}</div>
        {project.featured && (
          <span className="featured-badge">★ Featured</span>
        )}
      </div>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-desc">{project.description}</p>
      <div className="tags">
        {project.tags.map(tag => (
          <span className="tag" key={tag}>{tag}</span>
        ))}
      </div>
      <div className="project-links">
        <a href={project.github} className="project-link" target="_blank" rel="noreferrer">
          <GitHubIcon /> GitHub
        </a>
        {hasLive && (
          <a href={project.demo} className="project-link project-link-live" target="_blank" rel="noreferrer">
            <LiveIcon /> Live Demo
          </a>
        )}
      </div>
    </div>
  )
}

export default function Projects() {
  const featured = data.projects.filter(p => p.featured)
  const rest = data.projects.filter(p => !p.featured)

  return (
    <section className="section" id="projects">
      <div className="container">
        <p className="section-label">03 / Work</p>
        <h2 className="section-title">Selected Projects</h2>

        <div className="projects-featured">
          {featured.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>

        <div className="projects-grid">
          {rest.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      </div>
    </section>
  )
}
