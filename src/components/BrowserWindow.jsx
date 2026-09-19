import { useEffect, useRef, useState } from 'react'

const MOBILE_QUERY = '(max-width: 768px)'

// Picks the phone or desktop encode and only starts downloading it once the
// window is near the viewport, so the video doesn't compete with the hero.
function PreviewVideo({ video, alt }) {
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
            src={near ? (isMobile ? video.mobile : video.desktop) : undefined}
            poster={video.poster}
            aria-label={alt}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            style={{ width: '100%', display: 'block' }}
        />
    )
}

function BrowserWindow({ url, image, video, alt }) {
    return (
        <div className="browser-window">
            <div className="browser-header">
                <div className="browser-buttons">
                    <div className="browser-button close"></div>
                    <div className="browser-button minimize"></div>
                    <div className="browser-button maximize"></div>
                </div>
                <div className="browser-url">{url ?? 'live link coming soon'}</div>
            </div>
            <div className="browser-content">
                {video ? (
                    <PreviewVideo video={video} alt={alt} />
                ) : image ? (
                    <img src={image} alt={alt} style={{ width: '100%', display: 'block' }} />
                ) : (
                    <div className="browser-placeholder">photos coming soon</div>
                )}
            </div>
        </div>
    )
}

export default BrowserWindow;
