import { profile } from '@content/profile'
import { GithubLogo, LinkedinLogo, EnvelopeSimple } from '../ui/icons'
import ProtectedEmail from '../ui/ProtectedEmail'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__copy">
          &copy; {new Date().getFullYear()} {profile.name} · Built with React &amp; Vite · Deployed by GitHub Actions
        </p>
        <div className="footer__socials">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GithubLogo size={20} /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinLogo size={20} /></a>
          <ProtectedEmail showAddress={false} aria-label="Email"><EnvelopeSimple size={20} /></ProtectedEmail>
        </div>
      </div>
    </footer>
  )
}
