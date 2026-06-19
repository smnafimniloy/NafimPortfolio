import Header from './components/Header'
import Hero from './components/Hero'
import Education from './components/Education'
import Research from './components/Research'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Repos from './components/Repos'
import Volunteering from './components/Volunteering'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Education />
        <Research />
        <Projects />
        <Skills />
        <Repos />
        <Volunteering />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
