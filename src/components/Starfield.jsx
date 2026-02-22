import { useEffect } from 'react'
import './Starfield.css'

function Starfield() {
    useEffect(() => {
        const starsContainer = document.getElementById('stars')

        // Generate stars
        for (let i = 0; i < 70; i++) {
            const star = document.createElement('div')
            star.className = 'star'
            star.style.left = Math.random() * 100 + '%'
            star.style.top = Math.random() * 100 + '%'
            star.style.animationDelay = Math.random() * 3 + 's'
            starsContainer.appendChild(star)
        }

        // Generate meteors with random directions
        const createMeteor = () => {
            const meteor = document.createElement('div')
            meteor.className = 'meteor'

            // Random starting position
            meteor.style.left = (Math.random() * 100) + '%'
            meteor.style.top = (Math.random() * 50) + '%'

            // Random direction (angle between -60 and 60 degrees from horizontal)
            const angle = (Math.random() * 120) - 60
            const distance = 200 + Math.random() * 200

            // Calculate end position based on angle
            const radians = angle * (Math.PI / 180)
            const endX = Math.cos(radians) * distance
            const endY = Math.sin(radians) * distance

            // Set the animation inline with random values
            meteor.style.animation = 'none'
            meteor.style.opacity = '1'
            meteor.style.transform = `rotate(${angle}deg)`

            starsContainer.appendChild(meteor)

            // Animate using Web Animations API
            meteor.animate([
                {
                    opacity: 1,
                    transform: `translate(0, 0) rotate(${angle}deg)`
                },
                {
                    opacity: 0,
                    transform: `translate(${endX}px, ${endY}px) rotate(${angle}deg)`
                }
            ], {
                duration: 1000,
                easing: 'linear'
            })

            // Remove after animation
            setTimeout(() => {
                meteor.remove()
            }, 1000)
        }

        // Initial meteor
        setTimeout(createMeteor, 1000)

        // Create meteors at intervals
        const meteorInterval = setInterval(() => {
            createMeteor()
        }, 5000)

        return () => {
            clearInterval(meteorInterval)
        }
    }, [])

    return <div className="stars" id="stars"></div>
}

export default Starfield