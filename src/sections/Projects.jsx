import { useRef } from 'react'
import './Projects.css'
import BrowserWindow from '../components/BrowserWindow'
import ProjectCard from '../components/ProjectCard'

function Projects() {
    const ref = useRef(null)

    return (
        <section ref={ref} className="projects-section" id="websites">
            <div className="section-content">
                <h2 className="section-title">websites</h2>
                <BrowserWindow
                    url={"https://hannahphys.github.io/aostrology/"}
                    image={"/screenshots/teaostrology.webp"}
                    alt={"Te Ao-strology screenshot"}
                />
                <ProjectCard project={{
                    title: "te ao-strology",
                    description: "a māori lunar calendar calculator that determines your birth moon phase, seasonal markers, and māori month. combines traditional māori astronomical knowledge with modern web technology to connect people with te maramataka.",
                    tags: ["react", "vite", "astronomy", "māori knowledge"],
                    url: "https://hannahphys.github.io/aostrology/",
                    codeUrl: "https://github.com/hannahphys/aostrology"
                }} />

                <BrowserWindow
                    url={"https://hannahphys.github.io/native-plant-planner/"}
                    image={"/screenshots/tahunanativeplants.webp"}
                    alt={"Native Plant Planner screenshot"}
                />

                <ProjectCard project={{
                    title: "native plant planner",
                    description: "documentation and planning tool for new zealand native plants organized by ecological zone, frost tolerance, and plant uses. helps people choose appropriate natives specifically in the south island around tahuna built using data from Whakatipu Reforestation Trust.",
                    tags: ["ecology", "database", "nz flora"],
                    url: "https://hannahphys.github.io/tahuna-native-plants/",
                    codeUrl: "https://github.com/hannahphys/tahuna-native-plants"
                }} />

                <BrowserWindow
                    url={"https://hannahphys.github.io/solar-system-simulation/"}
                    image={"/screenshots/solarsystem.webp"}
                    alt={"solar sytem screenshot"}
                />

                <ProjectCard project={{
                    title: "astrology helper",
                    description: "this lil astrology helper is a web application designed to assist users in understanding their astrological signs and birth charts. being more able to see exactly how a birth chart comes from the positioning of the planets within the constellations and how the planets move over periods of time. could probably use a bit of an update in terms of design - todo",
                    tags: ["astrology", "web app", "personalized"],
                    url: "https://hannahphys.github.io/solar-system-simulation/",
                    codeUrl: "https://github.com/hannahphys/solar-system-simulation"
                }} />

                <BrowserWindow
                    url={"https://temporary-fast-glacier-yjny76h.vercel.app/"}
                    video={{
                        desktop: "/videos/stargazing-ops-desktop.mp4",
                        mobile: "/videos/stargazing-ops-mobile.mp4",
                        poster: "/videos/stargazing-ops-poster.jpg",
                    }}
                    alt={"stargazing tour ops screen recording"}
                />

                <ProjectCard project={{
                    title: "stargazing tour ops",
                    description: "a mobile-first PWA that runs a stargazing tour business's nightly operations. guides see tonight's shift, moon phase and upcoming roster, and start and end shifts from their phone. admins make the weather-dependent go/no-go call, manage the roster and get a weekly payroll summary. push notifications go out the moment a decision changes, and shifts stay readable offline.",
                    tags: ["react", "vite", "firebase", "pwa"],
                    url: "https://temporary-fast-glacier-yjny76h.vercel.app/"
                }} />

                <BrowserWindow
                    id="graph"
                    url={"https://my-3d-graph.vercel.app/"}
                    image={"/screenshots/3d-graph.webp"}
                    alt={"3d knowledge graph screenshot"}
                />

                <ProjectCard project={{
                    title: "3d knowledge graph",
                    description: "an interactive 3d mindmap of my personal obsidian notes - over 500 of them across quantum physics, spacetime, black hole theories and metaphysics. notes are connected wikilink-style so you can travel from idea to idea, or ask a question in plain english and a claude-powered assistant answers from the most relevant notes.",
                    tags: ["react", "3d graph", "obsidian", "claude api"],
                    url: "https://my-3d-graph.vercel.app/",
                    codeUrl: "https://github.com/hannahPhys/my-3d-graph"
                }} />
            </div>
        </section>
    )
}

export default Projects