import { MotionConfig } from 'motion/react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { BlueprintGrid } from '../components/ui/BlueprintGrid'
import { Hero } from '../sections/Hero'
import { Journey } from '../sections/Journey/Journey'
import { Work } from '../sections/Work'
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
        <Work />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
