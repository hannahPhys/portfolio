import { useRef } from 'react'
import './Projects.css'
import BrowserWindow from '../components/BrowserWindow'
import ProjectCard from '../components/ProjectCard'

function Projects() {
    const ref = useRef(null)

    return (
        <section ref={ref} className="projects-section">
            <div className="section-content">
                <h2 className="section-title">projects</h2>
                <BrowserWindow
                    url={"https://hannahphys.github.io/aostrology/"}
                    image={"/screenshots/teaostrology.png"}
                    alt={"Te Ao-strology screenshot"}
                />
                <ProjectCard project={{
                    title: "te ao-strology",
                    description: "a māori lunar calendar calculator that determines your birth moon phase, seasonal markers, and māori month. combines traditional māori astronomical knowledge with modern web technology to connect people with te maramataka.",
                    tags: ["react", "vite", "astronomy", "māori knowledge"]
                }} />

                <BrowserWindow
                    url={"https://hannahphys.github.io/native-plant-planner/"}
                    image={"/screenshots/tahunanativeplants.png"}
                    alt={"Native Plant Planner screenshot"}
                />

                <ProjectCard project={{
                    title: "native plant planner",
                    description: "documentation and planning tool for new zealand native plants organized by ecological zone, frost tolerance, and plant uses. helps people choose appropriate natives specifically in the south island around tahuna built using data from Whakatipu Reforestation Trust.",
                    tags: ["ecology", "database", "nz flora"]
                }} />

                <BrowserWindow
                    url={"https://hannahphys.github.io/solar-system-simulation/"}
                    image={"/screenshots/solarsystem.png"}
                    alt={"solar sytem screenshot"}
                />

                <ProjectCard project={{
                    title: "astrology helper",
                    description: "this lil astrology helper is a web application designed to assist users in understanding their astrological signs and birth charts. being more able to see exactly how a birth chart comes from the positioning of the planets within the constellations and how the planets move over periods of time. could probably use a bit of an update in terms of design - todo",
                    tags: ["astrology", "web app", "personalized"]
                }} />
            </div>
        </section>
    )
}

export default Projects