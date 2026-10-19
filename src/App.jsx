import { Routes, Route } from 'react-router-dom'
import { site } from '@content/site'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {site.showBlog && <Route path="/blog" element={<Blog />} />}
        {site.showBlog && <Route path="/blog/:slug" element={<BlogPost />} />}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}
