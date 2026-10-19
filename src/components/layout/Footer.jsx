import { profile } from '@content/profile'
import { GithubLogo, LinkedinLogo, EnvelopeSimple } from '../ui/icons'
import ProtectedEmail from '../ui/ProtectedEmail'
import Wordmark from './Wordmark'

const city = profile.location.split(',')[0].trim()

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="logo"><Wordmark /></p>
        <p className="footer__tag">[Built in {city} · Deployed by GitHub Actions]</p>
        <div className="footer__right">
          <p className="footer__copy">&copy; {new Date().getFullYear()} {profile.location}</p>
          <div className="footer__socials">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GithubLogo size={20} /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinLogo size={20} /></a>
            <ProtectedEmail showAddress={false} aria-label="Email"><EnvelopeSimple size={20} /></ProtectedEmail>
          </div>
        </div>
      </div>
    </footer>
  )
}
