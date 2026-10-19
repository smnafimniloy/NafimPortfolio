// Circular text that rotates forever around a monogram (see .badge in animations.css).
export default function RotatingBadge({ text, monogram = 'N' }) {
  const label = `${text} ✦ ${text} ✦ `
  return (
    <div className="badge" aria-hidden="true">
      <svg className="badge__ring" viewBox="0 0 200 200">
        <defs>
          <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text>
          <textPath href="#badge-circle" textLength="489" lengthAdjust="spacing">{label}</textPath>
        </text>
      </svg>
      <span className="badge__core">{monogram}</span>
    </div>
  )
}
