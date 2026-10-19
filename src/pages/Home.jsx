import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '@content/site'
import { profile } from '@content/profile'
import { useReveal } from '../hooks/useReveal'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import Hero from '../components/sections/Hero'
import Marquee from '../components/ui/Marquee'
import VideoResume from '../components/sections/VideoResume'
import Experience from '../components/sections/Experience'
import Education from '../components/sections/Education'
import Research from '../components/sections/Research'
import Projects from '../components/sections/Projects'
import Repos from '../components/sections/Repos'
import Skills from '../components/sections/Skills'
import Volunteering from '../components/sections/Volunteering'
import Contact from '../components/sections/Contact'

// Maps the ids in content/site.js to components.
const SECTIONS = {
  'video-resume': VideoResume,
  experience: Experience,
  education: Education,
  research: Research,
  projects: Projects,
  repos: Repos,
  skills: Skills,
  volunteering: Volunteering,
  contact: Contact,
}

export default function Home() {
  const { hash } = useLocation()
  useReveal()
  useDocumentTitle(`${profile.name} · ${profile.subtitle}`)

  // Coming from /blog via "/#projects": scroll to the section once it exists.
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
  }, [hash])

  const visible = site.sections.filter(s => s.show && SECTIONS[s.id])

  return (
    <main>
      <Hero />
      <Marquee items={profile.interests} />
      {visible.map((s, i) => {
        const Component = SECTIONS[s.id]
        return <Component key={s.id} id={s.id} number={i + 1} label={s.label} />
      })}
    </main>
  )
}
