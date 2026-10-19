export default function Tags({ items = [], accent = false }) {
  if (!items.length) return null
  return (
    <ul className="tags">
      {items.map(tag => (
        <li className={`tag${accent ? ' tag--accent' : ''}`} key={tag}>{tag}</li>
      ))}
    </ul>
  )
}
