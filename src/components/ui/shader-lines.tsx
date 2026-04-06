import { useEffect, useRef } from 'react'
import * as THREE from 'three'

import { cn } from '@/lib/utils'

type ShaderLinesProps = {
  className?: string
}

export function ShaderLines({ className }: ShaderLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const camera = new THREE.Camera()
    camera.position.z = 1

    const scene = new THREE.Scene()
    const geometry = new THREE.PlaneGeometry(2, 2)
    const uniforms = {
      time: { value: 1.0 },
      resolution: { value: new THREE.Vector2() },
    }

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      precision highp float;

      uniform vec2 resolution;
      uniform float time;

      float random(in float x) {
        return fract(sin(x) * 1e4);
      }

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);

        vec2 mosaicScale = vec2(4.0, 2.0);
        vec2 screenSize = vec2(256.0, 256.0);

        uv.x = floor(uv.x * screenSize.x / mosaicScale.x) / (screenSize.x / mosaicScale.x);
        uv.y = floor(uv.y * screenSize.y / mosaicScale.y) / (screenSize.y / mosaicScale.y);

        float t = time * 0.06 + random(uv.x) * 0.4;
        float lineWidth = 0.0008;

        vec3 color = vec3(0.0);
        for (int j = 0; j < 3; j++) {
          for (int i = 0; i < 5; i++) {
            color[j] += lineWidth * float(i * i) / abs(fract(t - 0.01 * float(j) + float(i) * 0.01) - length(uv));
          }
        }

        gl_FragColor = vec4(color[2], color[1], color[0], 1.0);
      }
    `

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    })

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    container.replaceChildren(renderer.domElement)

    const resize = () => {
      const { width, height } = container.getBoundingClientRect()
      if (!width || !height) return

      renderer.setSize(width, height, false)
      uniforms.resolution.value.set(
        width * renderer.getPixelRatio(),
        height * renderer.getPixelRatio(),
      )
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    resize()

    let animationId = 0

    const animate = () => {
      uniforms.time.value += 0.05
      renderer.render(scene, camera)
      animationId = window.requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.cancelAnimationFrame(animationId)
      resizeObserver.disconnect()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      container.replaceChildren()
    }
  }, [])

  return <div ref={containerRef} className={cn('absolute inset-0 h-full w-full', className)} />
}
