import { useEffect, useRef, useState } from 'react'
import './Carousels.css'

// Every folder in src/assets/carousels is a carousel post and every folder in
// src/assets/stories is a story design; every image or mp4 inside is a slide
// (ordered by filename: 1.webp, 2.mp4, ... 10.webp), so adding one is just
// dropping files in - no counts to keep in sync. Videos play muted on loop
// while their slide is showing.
const postModules = import.meta.glob('../assets/carousels/*/*.{webp,jpg,jpeg,png,mp4}', {
  eager: true,
  query: '?url',
  import: 'default',
})
const storyModules = import.meta.glob('../assets/stories/*/*.{webp,jpg,jpeg,png,mp4}', {
  eager: true,
  query: '?url',
  import: 'default',
})

// Optional nicer names; a folder without one shows its folder name.
const TITLES = {
  venus: 'introducing venus',
}

const GRID_SLOTS = 4

function collect(modules) {
  const byFolder = {}
  for (const [path, url] of Object.entries(modules)) {
    const [, folder, file] = path.match(/\/([^/]+)\/([^/]+)$/)
    ;(byFolder[folder] ??= []).push({ file, url })
  }

  return Object.keys(byFolder)
    .sort((a, b) => a.localeCompare(b))
    .map((id) => ({
      id,
      title: TITLES[id] ?? id.replace(/[-_]+/g, ' '),
      slides: byFolder[id]
        .sort((a, b) => a.file.localeCompare(b.file, undefined, { numeric: true }))
        .map((slide) => slide.url),
    }))
}

const CAROUSELS = collect(postModules)
// Keep the Instagram-style row full until there are enough posts.
while (CAROUSELS.length < GRID_SLOTS) {
  CAROUSELS.push({ id: `empty-${CAROUSELS.length}`, title: 'coming soon', slides: [] })
}

const STORIES = collect(storyModules)

const isVideo = (url) => /\.(mp4|webm)(\?|$)/i.test(url)

// Only the current and neighbouring slides load, and only the visible slide plays.
function VideoSlide({ src, label, active, near, onShape }) {
  const ref = useRef(null)

  useEffect(() => {
    const video = ref.current
    if (!video || !near) return
    if (active) {
      video.play().catch(() => {})
    } else {
      video.pause()
      video.currentTime = 0
    }
  }, [active, near])

  return (
    <video
      ref={ref}
      src={near ? `${src}#t=0.001` : undefined}
      aria-label={label}
      muted
      loop
      playsInline
      preload="auto"
      onLoadedMetadata={(e) => onShape?.(e.currentTarget.videoWidth / e.currentTarget.videoHeight)}
      onLoadedData={() => active && ref.current?.play().catch(() => {})}
    />
  )
}

function CarouselCard({ carousel, defaultRatio }) {
  const { slides } = carousel
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(false)
  // Tile takes the shape of its first slide, so story-format posts (9:16)
  // show tall and regular carousel posts (4:5) show as standard tiles.
  const [ratio, setRatio] = useState(null)
  const cardRef = useRef(null)
  const last = slides.length - 1

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '300px' }
    )
    observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  if (slides.length === 0) {
    return (
      <div className="carousel-card carousel-empty" ref={cardRef}>
        <span>{carousel.title}</span>
      </div>
    )
  }

  return (
    <div
      className="carousel-card"
      ref={cardRef}
      style={ratio || defaultRatio ? { aspectRatio: ratio ?? defaultRatio } : undefined}
    >
      <div className="carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((src, i) => {
          const label = `${carousel.title}, slide ${i + 1} of ${slides.length}`
          return (
            <div className="carousel-slide" key={src}>
              {isVideo(src) ? (
                <VideoSlide
                  src={src}
                  label={label}
                  active={visible && i === index}
                  near={visible && Math.abs(i - index) <= 1}
                  onShape={i === 0 ? setRatio : undefined}
                />
              ) : (
                <>
                  <span className="carousel-slide-fallback">add slide {i + 1}</span>
                  <img
                    src={src}
                    alt={label}
                    loading="lazy"
                    onLoad={i === 0 ? (e) => setRatio(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight) : undefined}
                    onError={(e) => { e.currentTarget.style.visibility = 'hidden' }}
                  />
                </>
              )}
            </div>
          )
        })}
      </div>

      {slides.length > 1 && (
        <span className="carousel-count">{index + 1}/{slides.length}</span>
      )}

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

      {slides.length > 1 && (
        <div className="carousel-dots">
          {slides.map((src, i) => (
            <span key={src} className={i === index ? 'active' : ''} />
          ))}
        </div>
      )}
    </div>
  )
}

function Carousels() {
  return (
    <section className="carousels-section" id="carousels">
      <div className="section-content">
        <h2 className="section-title">astro</h2>
        <a
          className="carousels-link"
          href="https://slow-light-phi.vercel.app/"
          target="_blank"
          rel="noreferrer"
        >
          go here for my astrophotography website →
        </a>
        <div className="carousels-stack">
          <div className="carousels-grid">
            {CAROUSELS.map((carousel) => (
              <CarouselCard key={carousel.id} carousel={carousel} />
            ))}
          </div>

          {STORIES.length > 0 && (
            <div className="carousels-grid stories-row">
              {STORIES.map((story) => (
                <CarouselCard key={story.id} carousel={story} defaultRatio="9 / 16" />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Carousels
