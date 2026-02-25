'use client';

import { useEffect } from 'react';
import { Particles } from 'react-tsparticles';
import type { Container, Engine } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';

export default function ParticleBackground() {
  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine);
  };

  const particlesLoaded = async (container?: any) => {
    // Particle engine loaded
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: 'transparent',
          },
        },
        fpsLimit: 60,
        particles: {
          number: {
            value: 120,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: ['#00d4ff', '#0099ff', '#ff006e', '#8338ec', '#fb5607'],
          },
          shape: {
            type: 'circle',
          },
          opacity: {
            value: 0.6,
            animation: {
              enable: true,
              minimumValue: 0.2,
              speed: 1.5,
              sync: false,
            },
          },
          size: {
            value: {
              min: 0.5,
              max: 2.5,
            },
            animation: {
              enable: false,
            },
          },
          move: {
            enable: true,
            speed: {
              min: 0.5,
              max: 2,
            },
            direction: 'none',
            random: true,
            straight: false,
            outModes: {
              default: 'bounce',
            },
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200,
            },
          },
          links: {
            enable: true,
            distance: 150,
            color: '#00d4ff',
            opacity: 0.4,
            width: 1,
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: 'grab',
            },
            onClick: {
              enable: true,
              mode: 'push',
            },
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 0.8,
              },
            },
            push: {
              quantity: 4,
            },
            attract: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 z-0"
    />
  );
}
