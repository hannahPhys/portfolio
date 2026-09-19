import { useState } from 'react'
import './Carousels.css'

// Every folder in src/assets/carousels is a carousel and every image inside
// it is a slide (ordered by filename: 1.webp, 2.webp, ... 10.webp), so adding
// a post is just dropping a file in - no counts to keep in sync.
const slideModules = import.meta.glob('../assets/carousels/*/*.{webp,jpg,jpeg,png}', {
  eager: true,
  query: '?url',
  import: 'default',
})

// Optional nicer names; a folder without one shows its folder name.
const TITLES = {
  venus: 'introducing venus',
}

const GRID_SLOTS = 4

function loadCarousels() {
  const byFolder = {}
  for (const [path, url] of Object.entries(slideModules)) {
    const [, folder, file] = path.match(/carousels\/([^/]+)\/([^/]+)$/)
    ;(byFolder[folder] ??= []).push({ file, url })
  }

  const carousels = Object.keys(byFolder)
    .sort()
    .map((id) => ({
      id,
      title: TITLES[id] ?? id.replace(/[-_]+/g, ' '),
      slides: byFolder[id]
        .sort((a, b) => a.file.localeCompare(b.file, undefined, { numeric: true }))
        .map((slide) => slide.url),
    }))

  // Keep the Instagram-style row full until there are enough posts.
  while (carousels.length < GRID_SLOTS) {
    carousels.push({ id: `empty-${carousels.length}`, title: 'coming soon', slides: [] })
  }
  return carousels
}

const CAROUSELS = loadCarousels()

function CarouselCard({ carousel }) {
  const { slides } = carousel
  const [index, setIndex] = useState(0)
  const last = slides.length - 1

  if (slides.length === 0) {
    return (
      <div className="carousel-card carousel-empty">
        <span>{carousel.title}</span>
      </div>
    )
  }

  return (
    <div className="carousel-card">
      <div className="carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((src, i) => (
          <div className="carousel-slide" key={src}>
            <span className="carousel-slide-fallback">add slide {i + 1}</span>
            <img
              src={src}
              alt={`${carousel.title}, slide ${i + 1} of ${slides.length}`}
              loading="lazy"
              onError={(e) => { e.currentTarget.style.visibility = 'hidden' }}
            />
          </div>
        ))}
      </div>

      <span className="carousel-count">{index + 1}/{slides.length}</span>

      <button
        className="carousel-arrow left"
        onClick={() => setIndex((i) => Math.max(0, i - 1))}
        disabled={index === 0}
        aria-label="previous slide"
      >
        ‹
      </button>
      <button
        className="carousel-arrow right"
        onClick={() => setIndex((i) => Math.min(last, i + 1))}
        disabled={index === last}
        aria-label="next slide"
      >
        ›
      </button>

      <div className="carousel-dots">
        {slides.map((src, i) => (
          <span key={src} className={i === index ? 'active' : ''} />
        ))}
      </div>
    </div>
  )
}

function Carousels() {
  return (
    <section className="carousels-section" id="carousels">
      <div className="section-content">
        <h2 className="section-title">carousels</h2>
        <a
          className="carousels-handle"
          href="https://instagram.com/hanaphotographic"
          target="_blank"
          rel="noreferrer"
        >
          @hanaphotographic
        </a>

        <div className="carousels-grid">
          {CAROUSELS.map((carousel) => (
            <CarouselCard key={carousel.id} carousel={carousel} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Carousels
