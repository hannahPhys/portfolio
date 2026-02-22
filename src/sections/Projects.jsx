import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import './Projects.css'

function Projects() {
    const ref = useRef(null)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"] // Changed end point
    })

    // Fixed rotation - stops at 0 degrees (flat)
    const rotateX = useTransform(scrollYProgress, [0, 1], [90, 0])
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.8, 1])
    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])

    return (
        <div ref={ref} style={{ perspective: '2000px', minHeight: '100vh' }}>
            <motion.section
                className="projects-section"
                style={{
                    rotateX,
                    opacity,
                    scale,
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'center top' // Rotate from top edge
                }}
            >
                <div className="projects-content">
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        my work
                    </motion.h2>

                    <motion.p
                        className="section-description"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        viewport={{ once: true }}
                    >
                        building at the intersection of physics, code, and culture
                    </motion.p>

                    <div className="project-grid">
                        {[
                            { title: 'te ao-strology', desc: 'māori lunar calendar calculator' },
                            { title: 'astrophotography', desc: 'southern hemisphere sky documentation' },
                            { title: 'physics simulations', desc: 'computational explorations' }
                        ].map((project, index) => (
                            <motion.div
                                key={index}
                                className="project-card"
                                initial={{ opacity: 0, rotateY: -30 }}
                                whileInView={{ opacity: 1, rotateY: 0 }}
                                transition={{ duration: 0.6, delay: 0.7 + (index * 0.15) }}
                                viewport={{ once: true }}
                                whileHover={{
                                    scale: 1.05,
                                    rotateY: 5,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                <h3>{project.title}</h3>
                                <p>{project.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>
        </div>
    )
}

export default Projects