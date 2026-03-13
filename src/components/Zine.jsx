import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Zine.css'

function Zine() {
    const [currentPage, setCurrentPage] = useState(0)
    const [fullscreenPage, setFullscreenPage] = useState(null)
    const totalPages = 12

    const pages = Array.from({ length: totalPages }, (_, i) => `/zine/${i + 1}.jpg`)

    const handleNext = () => {
        if (currentPage + 2 < totalPages) {
            setCurrentPage(prev => prev + 2)
        }
    }

    const handlePrev = () => {
        if (currentPage - 2 >= 0) {
            setCurrentPage(prev => prev - 2)
        }
    }

    const openFullscreen = (pageIndex) => {
        setFullscreenPage(pageIndex)
    }

    const closeFullscreen = () => {
        setFullscreenPage(null)
    }

    return (
        <section className="zine-section">
            <h2 className="zine-title">design</h2>

            <div className="zine-viewer">
                <button
                    className="nav-arrow left"
                    onClick={handlePrev}
                    disabled={currentPage === 0}
                >
                    ←
                </button>

                <div className="pages-container">
                    <div className="page-spread">
                        <div
                            className="page"
                            onClick={() => openFullscreen(currentPage)}
                        >
                            <img src={pages[currentPage]} alt={`Page ${currentPage + 1}`} />
                            <div className="zoom-hint">🔍 click to enlarge</div>
                        </div>

                        {currentPage + 1 < totalPages && (
                            <div
                                className="page"
                                onClick={() => openFullscreen(currentPage + 1)}
                            >
                                <img src={pages[currentPage + 1]} alt={`Page ${currentPage + 2}`} />
                                <div className="zoom-hint">🔍 click to enlarge</div>
                            </div>
                        )}
                    </div>
                </div>

                <button
                    className="nav-arrow right"
                    onClick={handleNext}
                    disabled={currentPage >= totalPages - 2}
                >
                    →
                </button>
            </div>

            <div className="page-indicator">
                <span>{currentPage + 1}-{Math.min(currentPage + 2, totalPages)} / {totalPages}</span>
            </div>

            {/* Fullscreen overlay */}
            <AnimatePresence>
                {fullscreenPage !== null && (
                    <motion.div
                        className="fullscreen-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeFullscreen}
                    >
                        <motion.div
                            className="fullscreen-page"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img src={pages[fullscreenPage]} alt={`Page ${fullscreenPage + 1}`} />
                            <button className="close-fullscreen" onClick={closeFullscreen}>
                                ✕
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default Zine