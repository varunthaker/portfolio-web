import { MotionConfig } from 'motion/react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { BlueprintGrid } from '../components/ui/BlueprintGrid'
import { Hero } from '../sections/Hero'
import { Journey } from '../sections/Journey/Journey'
import { Capabilities } from '../sections/Capabilities/Capabilities'
import { Projects } from '../sections/Projects/Projects'
import { Skills } from '../sections/Skills'
import { Contact } from '../sections/Contact'

export function HomePage() {
  return (
    <MotionConfig reducedMotion="user">
      <BlueprintGrid />
      <Header />
      <main id="main">
        <Hero />
        <Journey />
        <Capabilities />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
