import LazyVideo from './LazyVideo'

function BrowserWindow({ id, url, image, video, alt }) {
    return (
        <div className="browser-window" id={id}>
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
                    <LazyVideo
                        src={video.desktop}
                        mobile={video.mobile}
                        poster={video.poster}
                        alt={alt}
                        style={{ width: '100%', display: 'block' }}
                    />
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
