import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="notfound">
      <div className="notfound-code">404</div>
      <h1 className="notfound-title">Page not found</h1>
      <p className="notfound-desc">The URL you typed doesn't exist on this site.</p>
      <div className="notfound-actions">
        <Link to="/" className="btn-primary">Go home</Link>
        <Link to="/blog" className="btn-outline">Read the blog</Link>
      </div>
    </div>
  )
}
