import React from 'react'
import Particles from '@tsparticles/react'

export default function ParticlesComponent() {
  return (
    <Particles
      id="tsparticles"
      options={{
        fpsLimit: 30,
        particles: {
          color: {
            value: '#8f46ff'
          },
          links: {
            color: '#8f46ff',
            distance: 200,
            enable: true,
            opacity: 0.8,
            width: 1,
            triangles: {
              enable: true,
              opacity: 0.01
            }
          },
          move: {
            enable: true,
            outModes: {
              default: 'bounce'
            },
            random: true,
            speed: 1,
            straight: true
          },
          number: {
            density: {
              enable: true,
              width: 1280,
              height: 720
            },
            value: 69
          },
          opacity: {
            value: 0.5
          },
          shape: {
            type: 'circle'
          },
          size: {
            value: { min: 1, max: 4 }
          }
        },
        detectRetina: true
      }}
    />
  )
}
