import LazyVideo from '../components/LazyVideo'
import './Contact.css'

const CONTACT_LINKS = [
    { key: 'email', label: 'email', value: 'hannah.auckram@gmail.com', href: 'mailto:hannah.auckram@gmail.com' },
    { key: 'github', label: 'github', value: '@hannahPhys', href: 'https://github.com/hannahPhys' },
    { key: 'instagram', label: 'instagram', value: '@hanaphotographic', href: 'https://instagram.com/hanaphotographic' },
]

function Contact() {
    return (
        <section className="contact-section" id="contact">
            <div className="section-content">
                <h2 className="section-title">contact</h2>
                <p className="contact-subtitle">say hi, or get in touch about a project</p>

                <div className="contact-links">
                    {CONTACT_LINKS.map(({ key, label, value, href }) => (
                        <a
                            key={key}
                            className="contact-link"
                            href={href}
                            target={key === 'email' ? undefined : '_blank'}
                            rel={key === 'email' ? undefined : 'noreferrer'}
                        >
                            <span className="contact-link-label">{label}</span>
                            <span className="contact-link-value">{value}</span>
                        </a>
                    ))}
                </div>

                <LazyVideo
                    className="contact-photo"
                    src="/videos/starfield.mp4"
                    poster="/videos/starfield-poster.jpg"
                    alt="me under the stars"
                />
            </div>
        </section>
    )
}

export default Contact
