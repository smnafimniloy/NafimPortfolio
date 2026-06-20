import { Link } from 'react-router-dom'
import { blogPosts } from '../blogData'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function CalendarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  )
}

export default function Blog() {
  const sorted = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="blog-page">
      <div className="container">
        <div className="blog-header">
          <Link to="/" className="blog-back">← Back to portfolio</Link>
          <p className="section-label">Writing</p>
          <h1 className="blog-page-title">Blog</h1>
          <p className="blog-page-subtitle">Thoughts on ML research, engineering, and things I'm learning.</p>
        </div>

        {sorted.length === 0 ? (
          <p className="blog-empty">No posts yet — check back soon.</p>
        ) : (
          <div className="blog-grid">
            {sorted.map(post => (
              <Link to={`/blog/${post.slug}`} className="blog-card" key={post.id}>
                {post.cover ? (
                  <div className="blog-card-cover">
                    <img src={post.cover} alt={post.title} />
                  </div>
                ) : (
                  <div className="blog-card-cover blog-card-cover--placeholder" />
                )}
                <div className="blog-card-body">
                  <div className="blog-card-meta">
                    <CalendarIcon />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <div className="blog-card-tags">
                    {post.tags.map(t => <span className="tag" key={t}>{t}</span>)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
