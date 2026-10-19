// Four-pointed sparkle: the only ornament in the design.
export function Sparkle({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 0C12.8 7.2 16.8 11.2 24 12C16.8 12.8 12.8 16.8 12 24C11.2 16.8 7.2 12.8 0 12C7.2 11.2 11.2 7.2 12 0Z"
      />
    </svg>
  )
}

// A row of sparkles used as the divider between major sections.
export default function Sparkles({ count = 5 }) {
  return (
    <div className="sparkles" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => <Sparkle key={i} />)}
    </div>
  )
}
