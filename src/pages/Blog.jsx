import { Link } from 'react-router-dom'
import { profile } from '@content/profile'
import { posts } from '../lib/blog'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatDate } from '../lib/format'
import Tags from '../components/ui/Tags'
import Cover from '../components/ui/Cover'
import { ArrowLeft, CalendarBlank } from '../components/ui/icons'

export default function Blog() {
  useDocumentTitle(`Blog · ${profile.name}`)
  return (
    <main className="page">
      <div className="container">
        <Link to="/" className="back"><ArrowLeft size={16} /> Back to portfolio</Link>
        <header className="page__head">
          <p className="section__label">Writing</p>
          <h1 className="section__title">The <em>blog</em></h1>
          <p className="section__intro">Thoughts on ML research, engineering, and things I'm learning.</p>
        </header>

        {posts.length === 0 ? (
          <p className="empty">No posts yet. Check back soon.</p>
        ) : (
          <div className="grid grid--3">
            {posts.map(post => (
              <Link to={`/blog/${post.slug}/`} className="card post-card" key={post.slug}>
                <Cover src={post.cover} alt="" className="post-card__cover" />
                <p className="card__meta">
                  <span><CalendarBlank size={14} /> {formatDate(post.date)}</span>
                  {post.draft && <span className="status">Draft</span>}
                </p>
                <h2 className="card__title">{post.title}</h2>
                <p className="card__text">{post.excerpt}</p>
                <Tags items={post.tags} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
