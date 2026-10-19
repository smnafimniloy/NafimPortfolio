import { profile } from '@content/profile'
import { EnvelopeSimple, GithubLogo, LinkedinLogo } from '../ui/icons'
import ProtectedEmail from '../ui/ProtectedEmail'
import Sparkles from '../ui/Sparkles'

export default function Contact({ id, number, label }) {
  const [lead, last] = splitLastWord(profile.contactHeading)
  return (
    <section className="section contact" id={id}>
      <div className="container">
        <Sparkles />
        <div className="contact__inner">
          <p className="section__label">[{String(number).padStart(2, '0')} — {label}]</p>
          <h2 className="contact__title">
            {lead}{' '}
            {/* The page's one handwritten annotation: the last word, circled in ink */}
            <span className="scribble">
              {last}
              <svg viewBox="0 0 200 90" preserveAspectRatio="none" aria-hidden="true">
                <path d="M30 52C18 22 120 6 176 24C206 36 196 70 140 80C80 90 14 80 10 52C6 30 56 14 118 14" />
              </svg>
            </span>
          </h2>
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
      </div>
    </section>
  )
}

function splitLastWord(text) {
  const i = text.lastIndexOf(' ')
  return i === -1 ? ['', text] : [text.slice(0, i), text.slice(i + 1)]
}
