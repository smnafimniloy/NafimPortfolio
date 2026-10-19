import { projects } from '@content/projects'
import Section from '../layout/Section'
import Tags from '../ui/Tags'
import { projectIcons, FallbackProjectIcon, GithubLogo, ArrowUpRight } from '../ui/icons'

function ProjectCard({ project }) {
  const Icon = projectIcons[project.icon] ?? FallbackProjectIcon
  return (
    <article className={`card project${project.featured ? ' project--featured' : ''}`}>
      <div className="project__top">
        <span className="project__icon"><Icon size={28} /></span>
        <span className="card__meta">{project.featured ? 'Featured · ' : ''}{project.category}</span>
      </div>
      <h3 className="card__title">{project.title}</h3>
      <p className="card__text">{project.description}</p>
      <Tags items={project.tags} />
      <div className="project__links">
        {project.github && (
          <a href={project.github} className="link" target="_blank" rel="noreferrer">
            <GithubLogo size={16} /> Code
          </a>
        )}
        {project.demo && project.demo !== '#' && (
          <a href={project.demo} className="link link--accent" target="_blank" rel="noreferrer">
            Live demo <ArrowUpRight size={14} />
          </a>
        )}
      </div>
    </article>
  )
}

export default function Projects(props) {
  const featured = projects.filter(p => p.featured)
  const rest = projects.filter(p => !p.featured)

  return (
    <Section {...props} title={<>Things I've <em>built</em></>}>
      {featured.length > 0 && (
        <div className="grid grid--2">
          {featured.map(p => <ProjectCard key={p.title} project={p} />)}
        </div>
      )}
      {rest.length > 0 && (
        <div className="grid grid--3 grid--spaced">
          {rest.map(p => <ProjectCard key={p.title} project={p} />)}
        </div>
      )}
    </Section>
  )
}
