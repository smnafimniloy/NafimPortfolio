import { useState } from 'react'

// Image with a paper-texture placeholder when missing or broken.
export default function Cover({ src, alt, className }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) return <div className={`${className} cover--placeholder`} aria-hidden="true" />
  return (
    <div className={className}>
      <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
    </div>
  )
}
