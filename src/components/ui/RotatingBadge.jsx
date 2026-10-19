// Circular text that rotates forever around a small avatar (or an initial when there's no image).
// Only the text ring rotates (see .badge in animations.css); the picture stays still.
export default function RotatingBadge({ text, image, monogram = 'N' }) {
  const label = `${text} ✦ `
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
      {image ? (
        <span className="badge__core badge__core--image"><img src={image} alt="" width="72" height="72" /></span>
      ) : (
        <span className="badge__core">{monogram}</span>
      )}
    </div>
  )
}
