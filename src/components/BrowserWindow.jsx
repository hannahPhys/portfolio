function BrowserWindow({ url, image, alt }) {
    return (
        <div className="browser-window">
            <div className="browser-header">
                <div className="browser-buttons">
                    <div className="browser-button close"></div>
                    <div className="browser-button minimize"></div>
                    <div className="browser-button maximize"></div>
                </div>
                <div className="browser-url">{url}</div>
            </div>
            <div className="browser-content">
                <img src={image} alt={alt} style={{ width: '100%', display: 'block' }} />
            </div>
        </div>
    )
}

export default BrowserWindow;