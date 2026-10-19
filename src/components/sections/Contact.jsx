import { profile } from '@content/profile'
import { EnvelopeSimple, GithubLogo, LinkedinLogo } from '../ui/icons'
import ProtectedEmail from '../ui/ProtectedEmail'

export default function Contact({ id, number, label }) {
  const [lead, last] = splitLastWord(profile.contactHeading)
  return (
    <section className="section contact" id={id}>
      <div className="container contact__inner">
        <p className="section__label">
          <span>{String(number).padStart(2, '0')}</span> / {label}
        </p>
        <h2 className="contact__title">{lead} <em>{last}</em></h2>
        <p className="contact__text">{profile.contactText}</p>
        <div className="hero__actions contact__actions">
          <ProtectedEmail className="btn btn--primary">
            <EnvelopeSimple size={18} />
          </ProtectedEmail>
          <a href={profile.github} className="btn btn--outline" target="_blank" rel="noreferrer">
            <GithubLogo size={18} /> GitHub
          </a>
          <a href={profile.linkedin} className="btn btn--outline" target="_blank" rel="noreferrer">
            <LinkedinLogo size={18} /> LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}

function splitLastWord(text) {
  const i = text.lastIndexOf(' ')
  return i === -1 ? ['', text] : [text.slice(0, i), text.slice(i + 1)]
}
