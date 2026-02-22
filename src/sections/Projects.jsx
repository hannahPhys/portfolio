import { useRef } from 'react'
import './Projects.css'

function Projects() {
    const ref = useRef(null)

    return (
        <section ref={ref} className="projects-section">
            <div className="section-content">
                <h2 className="section-title">projects</h2>
                <div className="browser-window">
                    <div className="browser-header">
                        <div className="browser-buttons">
                            <div className="browser-button close"></div>
                            <div className="browser-button minimize"></div>
                            <div className="browser-button maximize"></div>
                        </div>
                        <div className="browser-url">https://hannahphys.github.io/aostrology/</div>
                    </div>
                    <div className="browser-content">
                        <img src="/screenshots/teaostrology.png" alt="Te Ao-strology screenshot" style={{ width: '100%', display: 'block' }} />
                    </div>
                </div>

                <div className="project-info">
                    <h3 className="project-title">te ao-strology</h3>
                    <p className="project-description">
                        a māori lunar calendar calculator that determines your birth moon phase, seasonal
                        markers, and māori month. combines traditional māori astronomical knowledge with
                        modern web technology to connect people with te maramataka.
                    </p>
                    <div className="project-tags">
                        <span className="tag">react</span>
                        <span className="tag">vite</span>
                        <span className="tag">astronomy</span>
                        <span className="tag">māori knowledge</span>
                    </div>
                    <div className="project-links">
                        <a href="#" className="project-link">visit site →</a>
                        <a href="#" className="project-link">view code →</a>
                    </div>
                </div>

                <div className="browser-window">
                    <div className="browser-header">
                        <div className="browser-buttons">
                            <div className="browser-button close"></div>
                            <div className="browser-button minimize"></div>
                            <div className="browser-button maximize"></div>
                        </div>
                        <div className="browser-url">https://nz-native-plants.com</div>
                    </div>
                    <div className="browser-content">
                        <img src="/screenshots/tahunanativeplants.png" alt="Native Plant Planner screenshot" style={{ width: '100%', display: 'block' }} />
                    </div>
                </div>

                <div className="project-info">
                    <h3 className="project-title">native plant planner</h3>
                    <p className="project-description">
                        documentation and planning tool for new zealand native plants organized by
                        ecological zone, frost tolerance, and plant uses. helps people choose appropriate
                        natives for their location.
                    </p>
                    <div className="project-tags">
                        <span className="tag">ecology</span>
                        <span className="tag">database</span>
                        <span className="tag">nz flora</span>
                    </div>
                    <div className="project-links">
                        <a href="#" className="project-link">visit site →</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Projects