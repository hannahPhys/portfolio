import Projects from './sections/Projects'
import Galaxy from './components/Galaxy'
import Starfield from './components/Starfield'
import './App.css'

function App() {
  return (
    <>
      {/*}
      <Galaxy
        mouseRepulsion={true}
        mouseInteraction={true}
        density={1.5}
        glowIntensity={0.3}
        saturation={0.2}
        hueShift={140}
        twinkleIntensity={0.3}
        rotationSpeed={0.0}
        repulsionStrength={2}
        autoCenterRepulsion={0}
        starSpeed={0.0}
        speed={1}
      />*/}
      <Starfield />

      <div className="hero-container">
        <div className="floating-icons"> {/* REMOVED inline style */}
          <div className="float-icon" style={{ top: '10%', left: '8%' }}>
            <img src="/icons/space.png" alt="tech" />tech.png
          </div>
          <div className="float-icon no-border" style={{ top: '15%', left: '25%' }}>
            <img src="/icons/moon-15.png" alt="design" />design.png
          </div>
          <div className="float-icon" style={{ top: '20%', right: '30%' }}>
            <img src="/icons/india.png" alt="nature" />nature.png
          </div>
          <div className="float-icon" style={{ top: '12%', right: '22%' }}>
            <img src="/icons/finder.png" alt="finder" />finder
          </div>
          <div className="float-icon" style={{ top: '15%', right: '8%' }}>
            <img src="/icons/astro.png" alt="astro" />astro.png
          </div>
          <div className="float-icon no-border" style={{ bottom: '35%', left: '15%' }}>
            <img src="/icons/explorer.png" alt="websites" />websites.png
          </div>
          <div className="float-icon" style={{ bottom: '15%', left: '10%' }}>
            <img src="/icons/me.png" alt="me" />me.png
          </div>
          <div className="float-icon" style={{ bottom: '30%', right: '10%' }}>
            <img src="/icons/houses.png" alt="travel" />travel.png
          </div>
          <div className="float-icon" style={{ bottom: '13%', right: '24%' }}>
            <img src="/icons/phone.png" alt="contact" />contact
          </div>
        </div>

        <h1 className="pixel-title">Hannah Auckram</h1>
        <input type="image" src="/icons/start.png" className="start-button" alt="start" />
      </div>

      <Projects />
    </>
  )
}

export default App