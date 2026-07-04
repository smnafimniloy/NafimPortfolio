import { useState } from 'react'
import { data } from '../data'

function getVideoId(url) {
  if (!url) return null
  try {
    const u = new URL(url)
    if (u.hostname === 'youtu.be') return u.pathname.slice(1).split('?')[0]
    if (u.hostname.includes('youtube.com')) {
      if (u.pathname === '/watch') return u.searchParams.get('v')
      if (u.pathname.startsWith('/embed/')) return u.pathname.split('/embed/')[1].split('?')[0]
      if (u.pathname.startsWith('/shorts/')) return u.pathname.split('/shorts/')[1].split('?')[0]
    }
  } catch { /* invalid URL */ }
  return null
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 80 80" width="72" height="72" fill="none">
      <circle cx="40" cy="40" r="40" fill="rgba(0,0,0,0.65)" />
      <polygon points="30,22 62,40 30,58" fill="#ffffff" />
    </svg>
  )
}

export default function VideoResume() {
  const [playing, setPlaying] = useState(false)
  const id = getVideoId(data.videoResume)
  if (!id) return null

  const embedUrl = `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&autoplay=1`
  const thumb    = `https://img.youtube.com/vi/${id}/hqdefault.jpg`
  const watchUrl = `https://www.youtube.com/watch?v=${id}`

  return (
    <section className="section video-resume-section" id="video-resume">
      <div className="container">
        <p className="section-label">00 / Introduction</p>
        <h2 className="section-title">Video Resume</h2>
        <p className="video-resume-desc">A quick introduction - who I am, what I work on, and what I'm looking for.</p>

        <div className="video-resume-wrapper">
          {playing ? (
            <iframe
              src={embedUrl}
              title="Video Resume"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button className="video-thumb" onClick={() => setPlaying(true)} aria-label="Play video resume">
              <img
                src={thumb}
                alt="Video resume thumbnail"
                onError={e => { e.target.style.display = 'none' }}
              />
              <span className="video-play-btn"><PlayIcon /></span>
            </button>
          )}
        </div>

        <a
          href={watchUrl}
          className="video-resume-yt-link"
          target="_blank"
          rel="noreferrer"
        >
          Watch on YouTube →
        </a>
      </div>
    </section>
  )
}
