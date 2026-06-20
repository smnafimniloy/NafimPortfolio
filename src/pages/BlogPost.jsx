import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { blogPosts } from '../blogData'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function normaliseCover(cover) {
  if (!cover) return ''
  return cover.startsWith('/') ? cover : `/${cover}`
}

function PostCover({ cover, alt }) {
  const [failed, setFailed] = useState(false)
  const src = normaliseCover(cover)

  if (!src || failed) {
    return <div className="blog-post-cover blog-post-cover--placeholder" />
  }
  return (
    <div className="blog-post-cover">
      <img src={src} alt={alt} onError={() => setFailed(true)} />
    </div>
  )
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
          <PostCover cover={post.cover} alt={post.title} />

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
