import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Starfield from './components/Starfield'
import Projects from './sections/Projects'
import './App.css'

function App() {
  const containerRef = useRef(null)
  const { scrollY } = useScroll()
  // Add this transform to hide layers after scrolling past hero
  const parallaxOpacity = useTransform(scrollY, [600, 800], [1, 0])

  // Parallax transforms - different speeds for each layer
  const skyY = useTransform(scrollY, [0, 1000], [0, -200])
  const auroraY = useTransform(scrollY, [0, 1000], [0, -500])
  const mountainsY = useTransform(scrollY, [0, 1000], [0, -900])

  // Title fades and moves up
  const titleOpacity = useTransform(scrollY, [0, 300], [1, 0])
  //const titleY = useTransform(scrollY, [0, 100], [0, -100])

  // Icons move up and shrink into header
  const iconsY = useTransform(scrollY, [0, 400], [0, -window.innerHeight + 100])
  const iconsScale = useTransform(scrollY, [300, 400], [1, 0.5])

  return (
    <>
      <Starfield />

      {/* Parallax layers */}
      <motion.div
        className="parallax-layer sky-layer"
        style={{ y: skyY, opacity: parallaxOpacity }}
      />
      <motion.div
        className="parallax-layer aurora-layer"
        style={{ y: auroraY, opacity: parallaxOpacity }}
      />
      <motion.div
        className="parallax-layer mountains-layer"
        style={{ y: mountainsY, opacity: parallaxOpacity }}
      />

      <div className="hero-container" ref={containerRef}>
        {/* Title that fades out */}
        <motion.h1
          className="pixel-title"
          style={{
            opacity: titleOpacity
          }}
        >
          Hannah Auckram
        </motion.h1>

        {/* Start button 
        <motion.input
          type="image"
          src="/icons/start.png"
          className="start-button"
          alt="start"
          style={{ opacity: titleOpacity }}
        />
*/}
        {/* Floating icons that become header */}
        <motion.div
          className="floating-icons"
          style={{
            y: iconsY,
            scale: iconsScale
          }}
        >
          <div className="float-icon" style={{ top: '10%', left: '8%' }}>
            <img src="/icons/space.png" alt="tech" />tech
          </div>
          <div className="float-icon no-border" style={{ top: '15%', left: '25%' }}>
            <img src="/icons/moon-15.png" alt="design" />design
          </div>
          <div className="float-icon" style={{ top: '20%', right: '30%' }}>
            <img src="/icons/india.png" alt="nature" />nature
          </div>
          <div className="float-icon" style={{ top: '12%', right: '22%' }}>
            <img src="/icons/finder.png" alt="finder" />finder
          </div>
          <div className="float-icon" style={{ top: '15%', right: '8%' }}>
            <img src="/icons/astro.png" alt="astro" />astro
          </div>
          <div className="float-icon no-border" style={{ bottom: '35%', left: '15%' }}>
            <img src="/icons/explorer.png" alt="websites" />websites
          </div>
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

      {/* Sticky header that appears */}
      <motion.div
        className="sticky-header"
        style={{
          opacity: useTransform(scrollY, [350, 450], [0, 1])
        }}
      >
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
    </>
  )
}

export default App