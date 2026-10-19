import { useState } from 'react'
import { profile } from '@content/profile'
import Section from '../layout/Section'
import { Play, YoutubeLogo } from '../ui/icons'

function getVideoId(url) {
  if (!url) return null
  try {
    const u = new URL(url)
    if (u.hostname === 'youtu.be') return u.pathname.slice(1)
    if (u.hostname.includes('youtube.com')) {
      if (u.pathname === '/watch') return u.searchParams.get('v')
      const m = u.pathname.match(/^\/(embed|shorts)\/([^/?]+)/)
      if (m) return m[2]
    }
  } catch { /* invalid URL */ }
  return null
}

export default function VideoResume(props) {
  const [playing, setPlaying] = useState(false)
  const id = getVideoId(profile.videoResume)
  if (!id) return null

  return (
    <Section
      {...props}
      title={<>Video <em>resume</em></>}
      intro="A quick introduction: who I am, what I work on, and what I'm looking for."
    >
      <div className="video">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&autoplay=1`}
            title="Video resume"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button className="video__thumb" onClick={() => setPlaying(true)} aria-label="Play video resume">
            <img src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" />
            <span className="video__play"><Play size={30} weight="fill" /></span>
          </button>
        )}
      </div>
      <a href={`https://www.youtube.com/watch?v=${id}`} className="link" target="_blank" rel="noreferrer">
        <YoutubeLogo size={18} /> Watch on YouTube
      </a>
    </Section>
  )
}
