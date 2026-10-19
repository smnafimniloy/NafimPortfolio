import { useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { profile } from '@content/profile'
import { getPost, renderMarkdown } from '../lib/blog'
import { formatDate } from '../lib/format'
import Tags from '../components/ui/Tags'
import { ArrowLeft } from '../components/ui/icons'
import Cover from '../components/ui/Cover'
import NotFound from './NotFound'

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)
  const html = useMemo(() => (post ? renderMarkdown(post.body) : ''), [post])

  useEffect(() => {
    if (post) document.title = `${post.title} · ${profile.name}`
    window.scrollTo(0, 0)
  }, [post])

  if (!post) return <NotFound />

  return (
    <main className="page">
      <div className="container">
        <Link to="/blog/" className="back"><ArrowLeft size={16} /> All posts</Link>
        <article className="post">
          <header className="post__head">
            <Tags items={post.tags} accent />
            <h1 className="post__title">{post.title}</h1>
            <p className="post__date">{formatDate(post.date)}</p>
          </header>
          {post.cover && <Cover src={post.cover} alt="" className="post__cover" />}
          <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
        </article>
      </div>
    </main>
  )
}
