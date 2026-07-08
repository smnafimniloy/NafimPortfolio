import { Routes, Route } from 'react-router-dom'
import { useReveal } from './hooks/useReveal'
import Header from './components/Header'
import Hero from './components/Hero'
import VideoResume from './components/VideoResume'
import Education from './components/Education'
import Research from './components/Research'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Repos from './components/Repos'
import Volunteering from './components/Volunteering'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import NotFound from './pages/NotFound'

function Portfolio() {
  useReveal()
  return (
    <>
      <main>
        <Hero />
        { /* <VideoResume /> */}
        <Education />
        <Research />
        <Projects />
        <Repos />
        <Skills />
        {/* <Volunteering /> */}
        <Contact />
      </main>
    </>
  )
}

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
