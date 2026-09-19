import { useEffect, useRef, useState } from 'react'

const MOBILE_QUERY = '(max-width: 768px)'

// Muted looping video that only starts downloading once it's near the
// viewport. Pass `mobile` as well as `src` to serve a smaller phone encode.
function LazyVideo({ src, mobile, poster, alt, className, style }) {
    const ref = useRef(null)
    const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches)
    const [near, setNear] = useState(false)

    useEffect(() => {
        const mq = window.matchMedia(MOBILE_QUERY)
        const onChange = (e) => setIsMobile(e.matches)
        mq.addEventListener('change', onChange)
        return () => mq.removeEventListener('change', onChange)
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setNear(entry.isIntersecting),
            { rootMargin: '400px' }
        )
        observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return (
        <video
            ref={ref}
            className={className}
            style={style}
            src={near ? (isMobile && mobile ? mobile : src) : undefined}
            poster={poster}
            aria-label={alt}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
        />
    )
}

export default LazyVideo
