import { useEffect, useRef } from 'react'

export default function AnimatedBackground() {
  const backgroundRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!backgroundRef.current) return

      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      // Calculate movement based on cursor position (parallax effect)
      // Move in opposite direction for depth effect
      const moveX = (clientX / innerWidth - 0.5) * 30 // Max 15px movement in each direction
      const moveY = (clientY / innerHeight - 0.5) * 30

      backgroundRef.current.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`
    }

    // Add event listener
    window.addEventListener('mousemove', handleMouseMove)

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated background image with parallax effect */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 w-full h-full transition-transform duration-200 ease-out"
        style={{
          backgroundImage: 'url(/assets/arabian-nights-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: 'scale(1.1)', // Slightly larger to prevent white edges during movement
          willChange: 'transform' // Performance optimization
        }}
      />
      
      {/* Gradient overlay for better text readability */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"
        style={{ pointerEvents: 'none' }}
      />
      
      {/* Animated stars/sparkles overlay */}
      <div className="stars-container">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  )
}
