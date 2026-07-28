import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './Photography.css'

// Add a `gradient` fallback (e.g. 'linear-gradient(135deg, #2b2f77, #5c6bc0)')
// on any entry to placeholder it if `src` is ever removed.
const PHOTOS = [
  { id: 1, src: '/photography/20240812-IMG_1497.jpg', caption: 'aurora chasing' },
  { id: 2, src: '/photography/IMG_0017-Enhanced-NR.jpg', caption: 'building storm' },
  { id: 3, src: '/photography/IMG_0042-Enhanced-NR.jpg', caption: 'cloud, gold hour' },
  { id: 4, src: '/photography/IMG_0099-Enhanced-NR-2.jpg', caption: 'storm glow' },
  { id: 5, src: '/photography/IMG_0150-Edit.jpg', caption: 'currawong & moon' },
  { id: 6, src: '/photography/20251113-IMG_2770.jpg', caption: 'alpine dawn' },
  { id: 7, src: '/photography/IMG_1635-Edit-3.jpg', caption: 'under the stars' },
  { id: 8, src: '/photography/IMG_2635.jpg', caption: 'night vessel' },
]

// Scroll distance (vh) dedicated to each photo's dive-through transition
const VH_PER_PHOTO = 80

// Piecewise-linear interpolation, clamped to the first/last value outside
// the given range. Used via useTransform's functional form rather than its
// keyframe-array form, since Framer Motion's array form can hand scroll-linked
// transforms off to the native Web Animations API, which hard-requires every
// keyframe offset to sit within [0, 1] - breakpoints outside that (or won't
// reliably clamp) aren't safe to pass as a plain array.
function interpolateClamped(p, points, values) {
  if (p <= points[0]) return values[0]
  for (let i = 1; i < points.length; i++) {
    if (p <= points[i]) {
      const t = (p - points[i - 1]) / (points[i] - points[i - 1])
      return values[i - 1] + t * (values[i] - values[i - 1])
    }
  }
  return values[values.length - 1]
}

function DepthFrame({ photo, index, total, progress }) {
  const isFirst = index === 0
  const isLast = index === total - 1

  // Photo `index` arrives around boundary `index/total` and recedes around
  // boundary `(index+1)/total`, crossfading with its neighbors over a window
  // straddling each boundary so one photo shrinks away as the next grows in.
  // The first photo is already arrived at rest; the last one just holds
  // once arrived instead of receding.
  const span = 1 / total
  const w = span * 0.25
  const arriveAt = index / total
  const recedeAt = (index + 1) / total

  const points = isFirst
    ? [0, recedeAt - w, recedeAt + w]
    : isLast
      ? [arriveAt - w, arriveAt + w, 1]
      : [arriveAt - w, arriveAt + w, recedeAt - w, recedeAt + w]

  const scaleValues = isFirst ? [1, 1, 1.6] : isLast ? [0.35, 1, 1] : [0.35, 1, 1, 1.6]
  const opacityValues = isFirst ? [1, 1, 0] : isLast ? [0, 1, 1] : [0, 1, 1, 0]

  const scale = useTransform(progress, (p) => interpolateClamped(p, points, scaleValues))
  const opacity = useTransform(progress, (p) => interpolateClamped(p, points, opacityValues))

  return (
    <motion.div
      className="depth-frame"
      style={{ scale, opacity, zIndex: total - index }}
    >
      <div
        className="depth-frame-image"
        style={{ backgroundImage: photo.src ? `url(${photo.src})` : photo.gradient }}
      />
      <span className="depth-frame-caption">{photo.caption}</span>
    </motion.div>
  )
}

function DepthDot({ index, total, progress }) {
  const start = index / total
  const mid = (index + 0.5) / total
  const end = (index + 1) / total
  const opacity = useTransform(progress, [start, mid, end], [0.3, 1, 0.3])

  return <motion.span className="depth-dot" style={{ opacity }} />
}

function Photography() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const hintOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0])

  return (
    <section
      ref={sectionRef}
      className="photography-section"
      style={{ height: `${PHOTOS.length * VH_PER_PHOTO}vh` }}
    >
      <div className="photography-sticky">
        <h2 className="photography-title">photography</h2>

        <div className="depth-stack">
          {PHOTOS.map((photo, i) => (
            <DepthFrame
              key={photo.id}
              photo={photo}
              index={i}
              total={PHOTOS.length}
              progress={scrollYProgress}
            />
          ))}
        </div>

        <div className="depth-dots">
          {PHOTOS.map((photo, i) => (
            <DepthDot key={photo.id} index={i} total={PHOTOS.length} progress={scrollYProgress} />
          ))}
        </div>

        <motion.p className="depth-hint" style={{ opacity: hintOpacity }}>
          scroll to go deeper
        </motion.p>
      </div>
    </section>
  )
}

export default Photography
