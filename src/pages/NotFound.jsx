import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="notfound">
      <p className="notfound__code">404</p>
      <h1 className="section__title">This page wandered <em>off</em></h1>
      <p className="section__intro">The URL you typed doesn't exist on this site.</p>
      <div className="hero__actions">
        <Link to="/" className="btn btn--primary">Go home</Link>
        <Link to="/blog/" className="btn btn--outline">Read the blog</Link>
      </div>
    </main>
  )
}
