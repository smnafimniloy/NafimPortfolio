// Shared wrapper: "01 / Education" label + title + content.
export default function Section({ id, number, label, title, intro, className = '', children }) {
  return (
    <section className={`section ${className}`} id={id}>
      <div className="container">
        <header className="section__head">
          <p className="section__label">
            <span>{String(number).padStart(2, '0')}</span> / {label}
          </p>
          <h2 className="section__title">{title}</h2>
          {intro && <p className="section__intro">{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}
