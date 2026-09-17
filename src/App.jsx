import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import Starfield from './components/Starfield'
import Projects from './sections/Projects'
import Zine from './components/Zine'
import Photography from './sections/Photography'
import './App.css'

// Scroll distance (px) over which the background layers travel before the
// hero fades out completely.
const PARALLAX_TRAVEL_RANGE = [0, 1000]
const PARALLAX_FADE_RANGE = [600, 800]

// Background layers, back to front. `distance` is how far each layer travels
// (px) over PARALLAX_TRAVEL_RANGE - lower distance reads as further away.
const PARALLAX_LAYERS = [
  { key: 'sky', className: 'sky-layer', distance: 200 },
  { key: 'aurora', className: 'aurora-layer', distance: 500 },
  { key: 'mountains', className: 'mountains-layer', distance: 900 },
]

const TITLE_FADE_RANGE = [0, 300]
const ICONS_COLLAPSE_RANGE = [0, 400]
const ICONS_SHRINK_RANGE = [300, 400]
const HEADER_REVEAL_RANGE = [350, 450]

// Tracks viewport height so the floating icons collapse to the correct
// distance after a resize or orientation change, instead of freezing
// whatever window.innerHeight happened to be on first render.
function useViewportHeight() {
  const [height, setHeight] = useState(() => window.innerHeight)

  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return height
}

function ParallaxLayer({ className, distance, scrollY, opacity }) {
  const y = useTransform(scrollY, PARALLAX_TRAVEL_RANGE, [0, -distance])

  return (
    <motion.div
      className={`parallax-layer ${className}`}
      style={{ y, opacity, willChange: 'transform, opacity' }}
    />
  )
}

function App() {
  const { scrollY } = useScroll()
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 200,
    damping: 20,
    restDelta: 0.01
  })

  const parallaxOpacity = useTransform(smoothScrollY, PARALLAX_FADE_RANGE, [1, 0])
  const titleOpacity = useTransform(smoothScrollY, TITLE_FADE_RANGE, [1, 0])
  const headerOpacity = useTransform(smoothScrollY, HEADER_REVEAL_RANGE, [0, 1])

  const viewportHeight = useViewportHeight()
  const iconsY = useTransform(smoothScrollY, ICONS_COLLAPSE_RANGE, [0, -viewportHeight + 100])
  const iconsScale = useTransform(smoothScrollY, ICONS_SHRINK_RANGE, [1, 0.5])

  return (
    <>
      <Starfield />

      {PARALLAX_LAYERS.map(({ key, className, distance }) => (
        <ParallaxLayer
          key={key}
          className={className}
          distance={distance}
          scrollY={smoothScrollY}
          opacity={parallaxOpacity}
        />
      ))}

      <div className="hero-container">
        <motion.h1
          className="pixel-title"
          style={{ opacity: titleOpacity, willChange: 'opacity' }}
        >
          Hannah Auckram
        </motion.h1>

        <motion.div
          className="floating-icons"
          style={{ y: iconsY, scale: iconsScale }}
        >
          <div className="float-icon" style={{ top: '10%', left: '8%' }}>
            <img src="/icons/space.png" alt="tech" />tech
          </div>
          <a className="float-icon no-border" href="#design" style={{ top: '15%', left: '25%' }}>
            <img src="/icons/moon-15.png" alt="design" />design
          </a>
          <div className="float-icon" style={{ top: '20%', right: '30%' }}>
            <img src="/icons/india.png" alt="nature" />nature
          </div>
          <div className="float-icon" style={{ top: '12%', right: '22%' }}>
            <img src="/icons/finder.png" alt="finder" />finder
          </div>
          <div className="float-icon" style={{ top: '15%', right: '8%' }}>
            <img src="/icons/astro.png" alt="astro" />astro
          </div>
          <a className="float-icon no-border" href="#websites" style={{ bottom: '35%', left: '15%' }}>
            <img src="/icons/explorer.png" alt="websites" />websites
          </a>
          <div className="float-icon" style={{ bottom: '15%', left: '10%' }}>
            <img src="/icons/me.png" alt="me" />me
          </div>
          <div className="float-icon" style={{ bottom: '30%', right: '10%' }}>
            <img src="/icons/houses.png" alt="travel" />travel
          </div>
          <div className="float-icon no-border" style={{ bottom: '13%', right: '24%' }}>
            <img src="/icons/phone.png" alt="contact" />contact
          </div>
        </motion.div>
      </div>

      <motion.div className="sticky-header" style={{ opacity: headerOpacity }}>
        <div className="header-icons">
          <img src="/icons/space.png" alt="tech" />
          <img src="/icons/moon-15.png" alt="design" />
          <img src="/icons/india.png" alt="nature" />
          <img src="/icons/finder.png" alt="finder" />
          <img src="/icons/astro.png" alt="astro" />
          <img src="/icons/explorer.png" alt="websites" />
          <img src="/icons/me.png" alt="me" />
          <img src="/icons/houses.png" alt="travel" />
          <img src="/icons/phone.png" alt="contact" />
        </div>
      </motion.div>

      <Projects />
      <Zine />
      <Photography />
    </>
  )
}

export default App
