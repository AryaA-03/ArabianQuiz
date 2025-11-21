import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, useGLTF, PerspectiveCamera } from '@react-three/drei'
import { Suspense, useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

// Lamp Model Component
function LampModel({ isAnimating, onClick }) {
  const lampRef = useRef()
  const [fbx, setFbx] = useState(null)
  const [textures, setTextures] = useState({})

  useEffect(() => {
    // Load FBX model
    const loader = new FBXLoader()
    loader.load('/models/lamp.fbx', (object) => {
      // Scale and position the model
      object.scale.set(0.02, 0.02, 0.02)
      object.rotation.x = -Math.PI / 6
      object.rotation.y = Math.PI / 4
      
      // Load textures
      const textureLoader = new THREE.TextureLoader()
      const albedo = textureLoader.load('/models/lamp_Lampada_AlbedoTransparency.png')
      const normal = textureLoader.load('/models/lamp_Lampada_Normal.png')
      const metallic = textureLoader.load('/models/lamp_Lampada_MetallicSmoothness.png')
      const lighting = textureLoader.load('/models/LampLightingMap.png')
      
      // Apply textures to the model
      object.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            map: albedo,
            normalMap: normal,
            metalnessMap: metallic,
            roughnessMap: metallic,
            emissiveMap: lighting,
            emissive: new THREE.Color(0xffaa00),
            emissiveIntensity: isAnimating ? 2 : 0.3,
            metalness: 0.8,
            roughness: 0.2,
          })
          child.castShadow = true
          child.receiveShadow = true
        }
      })
      
      setFbx(object)
    })
  }, [])

  useFrame((state) => {
    if (lampRef.current) {
      // Gentle floating animation
      lampRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      
      // Rotation animation when clicked
      if (isAnimating) {
        lampRef.current.rotation.y += 0.05
        lampRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.2
        lampRef.current.position.y += Math.sin(state.clock.elapsedTime * 5) * 0.05
      } else {
        // Slowly rotate back to default
        lampRef.current.rotation.y += 0.005
        lampRef.current.rotation.z *= 0.95
      }
    }
  })

  if (!fbx) return null

  return (
    <primitive 
      ref={lampRef} 
      object={fbx} 
      onClick={onClick}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'default'}
    />
  )
}

// Main GenieLamp Component
export default function GenieLamp() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [particles, setParticles] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    // Initialize audio with the new WhatsApp audio
    audioRef.current = new Audio('/genie-sound.mpeg')
    audioRef.current.volume = 0.7
    audioRef.current.loop = true
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const handleClick = () => {
    setIsAnimating(true)
    
    // Toggle play/pause
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play().catch(error => {
          console.log('Audio playback failed:', error)
        })
        setIsPlaying(true)
      }
    }
    
    // Create magical particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
    }))
    setParticles(newParticles)

    // Reset animation after 3 seconds
    setTimeout(() => {
      setIsAnimating(false)
      setParticles([])
    }, 3000)
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* 3D Canvas */}
      <div 
        className="relative w-48 h-48 cursor-pointer"
        onClick={handleClick}
      >
        <Canvas 
          shadows
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={45} />
          
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <spotLight 
            position={[10, 10, 10]} 
            angle={0.15} 
            penumbra={1} 
            intensity={isAnimating ? 2 : 1}
            castShadow
            color={isAnimating ? '#ffaa00' : '#ffffff'}
          />
          <pointLight 
            position={[0, 5, 0]} 
            intensity={isAnimating ? 3 : 0.5}
            color="#ffd700"
            distance={10}
          />
          
          {/* Model */}
          <Suspense fallback={null}>
            <LampModel isAnimating={isAnimating} onClick={handleClick} />
          </Suspense>
        </Canvas>

        {/* Magical Particles Overlay */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full bg-yellow-400 animate-ping"
            style={{
              left: `50%`,
              top: `50%`,
              transform: `translate(${particle.x}px, ${particle.y}px)`,
              opacity: 0,
              animation: 'sparkle 1s ease-out forwards',
            }}
          />
        ))}

        {/* Glow effect when animating */}
        {isAnimating && (
          <div className="absolute inset-0 rounded-full bg-yellow-400 opacity-30 blur-2xl animate-pulse" />
        )}
      </div>

      {/* Click hint */}
      {!isAnimating && (
        <div className="text-center mt-2 text-xs text-yellow-400 animate-bounce">
          ✨ {isPlaying ? 'Click to stop!' : 'Click the lamp!'}
        </div>
      )}

      {/* Inline styles for particle animation */}
      <style jsx>{`
        @keyframes sparkle {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(var(--x), var(--y)) scale(0);
          }
        }
      `}</style>
    </div>
  )
}
