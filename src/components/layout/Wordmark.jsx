import { profile } from '@content/profile'

// The logo is just text: your name, then the parts of your subtitle, stacked.
const wordmarkLines = [profile.name, ...profile.subtitle.split(/\s*·\s*/)].filter(Boolean)

export default function Wordmark() {
  return wordmarkLines.map(line => <span key={line}>{line}</span>)
}
