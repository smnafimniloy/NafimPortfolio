// Endless scrolling strip. The list is rendered twice and the track moves -50%,
// so the loop has no visible jump.
export default function Marquee({ items }) {
  if (!items?.length) return null
  const row = (hidden) => (
    <ul className="marquee__row" aria-hidden={hidden || undefined}>
      {items.map(item => (
        <li key={item}>
          {item}
          <span className="marquee__sep">✦</span>
        </li>
      ))}
    </ul>
  )

  return (
    <div className="marquee" role="marquee" aria-label="Research interests">
      <div className="marquee__track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
