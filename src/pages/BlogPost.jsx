import { useParams, Link } from 'react-router-dom'
import { blogPosts } from '../blogData'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    return (
      <div className="blog-page">
        <div className="container">
          <div className="blog-not-found">
            <h1>Post not found</h1>
            <Link to="/blog" className="blog-back">← Back to blog</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="blog-page">
      <div className="container">
        <Link to="/blog" className="blog-back">← Back to blog</Link>

        <article className="blog-post">
          {post.cover && (
            <div className="blog-post-cover">
              <img src={post.cover} alt={post.title} />
            </div>
          )}

          <header className="blog-post-header">
            <div className="blog-card-tags" style={{ marginBottom: '12px' }}>
              {post.tags.map(t => <span className="tag" key={t}>{t}</span>)}
            </div>
            <h1 className="blog-post-title">{post.title}</h1>
            <p className="blog-post-date">{formatDate(post.date)}</p>
          </header>

          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  )
}
