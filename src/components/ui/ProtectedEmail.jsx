import { useSyncExternalStore } from 'react'
import { profile } from '@content/profile'

// Anti-spam email link. The prerendered HTML (what bots download) contains no address,
// only a link to the contact section. Once the page runs in a real browser, it becomes
// a normal mailto: link showing the address.
const noop = () => () => {}
const useInBrowser = () => useSyncExternalStore(noop, () => true, () => false)

export default function ProtectedEmail({ children, label = 'Email me', showAddress = true, ...props }) {
  const inBrowser = useInBrowser()
  const text = showAddress ? (inBrowser ? profile.email : label) : null

  return (
    <a href={inBrowser ? `mailto:${profile.email}` : '/#contact'} {...props}>
      {children}
      {text}
    </a>
  )
}
