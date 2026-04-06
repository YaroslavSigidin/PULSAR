import { useEffect, useRef } from 'react'

export type AuroraFluxProps = {
  fullScreen?: boolean
  pauseWhenHidden?: boolean
  pauseOnHover?: boolean
  mix?: number
  className?: string
  style?: React.CSSProperties
  ariaLabel?: string
}

const VERT = `#version 300 es
precision highp float;

layout(location = 0) in vec2 a_position;
out vec2 vUv;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  vUv = a_position * 0.5 + 0.5;
}
`

const FRAG = `#version 300 es
precision highp float;

uniform vec3 u_resolution;
uniform float u_time;
uniform float u_mix;
out vec4 fragColor;

void main() {
  vec2 fragCoord = gl_FragCoord.xy;
  vec2 r = u_resolution.xy;
  vec2 p = (fragCoord + fragCoord - r) / r.y;
  vec2 z = vec2(0.5);
  vec2 i = vec2(0.1);
  vec2 f = p * (z += 5. - 6. * exp(.4 - dot(p, p)));
  vec4 O = vec4(0.0);
  for (i.y = 1.0; i.y <= 8.0; i.y += 1.0) {
    O += (tanh(f) + 1.0).xyyx * abs(f.x - f.y);
    f += tanh(f.yx * i.y + i + u_time) / i.y + 0.7;
  }
  O = tanh(5.0 * exp(z.x - 4.0 - p.y * vec4(-1.0, 1.0, 2.0, 0.0)) / O);

  float mixPhase = dot(p, p) + z.x + u_time + sin(p.x * 1.5 + p.y * 2.5 + u_time * 0.5);
  float band = 0.5 + 0.5 * cos(mixPhase * 5.2 + p.y * 4.0);
  float sweep = smoothstep(0.2, 0.95, 0.5 + 0.5 * sin(u_time * 0.55 + p.x * 1.4 - p.y * 0.9));
  vec3 chromeBase = vec3(0.72, 0.74, 0.79);
  vec3 chromeCold = vec3(0.84, 0.88, 0.96);
  vec3 chromeDark = vec3(0.30, 0.33, 0.39);
  vec3 chrome = mix(chromeDark, chromeBase, band);
  chrome = mix(chrome, chromeCold, sweep * 0.55);
  O.rgb *= chrome;
  O.rgb = mix(O.rgb, vec3(dot(O.rgb, vec3(0.333))), 0.18);

  fragColor = O;
}
`

function compileShader(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)
  if (!sh) throw new Error('Failed to create shader')
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(sh) || 'Unknown shader compile error'
    gl.deleteShader(sh)
    throw new Error(info)
  }
  return sh
}

function createProgram(gl: WebGL2RenderingContext, vsSrc: string, fsSrc: string) {
  const vs = compileShader(gl, gl.VERTEX_SHADER, vsSrc)
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fsSrc)
  const prog = gl.createProgram()
  if (!prog) throw new Error('Failed to create program')
  gl.attachShader(prog, vs)
  gl.attachShader(prog, fs)
  gl.linkProgram(prog)
  gl.deleteShader(vs)
  gl.deleteShader(fs)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(prog) || 'Unknown program link error'
    gl.deleteProgram(prog)
    throw new Error(info)
  }
  return prog
}

export function AuroraFlux({
  fullScreen = true,
  pauseWhenHidden = true,
  pauseOnHover = false,
  mix = 0.5,
  className = '',
  style,
  ariaLabel = 'Aurora flux shader background',
}: AuroraFluxProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const glRef = useRef<WebGL2RenderingContext | null>(null)
  const programRef = useRef<WebGLProgram | null>(null)
  const vaoRef = useRef<WebGLVertexArrayObject | null>(null)
  const rafRef = useRef<number | null>(null)
  const hoverRef = useRef(false)

  const uTimeRef = useRef<WebGLUniformLocation | null>(null)
  const uResRef = useRef<WebGLUniformLocation | null>(null)
  const uMixRef = useRef<WebGLUniformLocation | null>(null)

  const resizeRef = useRef<() => void>(() => {})
  const shouldRenderRef = useRef<() => boolean>(() => true)
  const loopRef = useRef<(t: number) => void>(() => {})
  const onEnterRef = useRef<((event: PointerEvent) => void) | null>(null)
  const onLeaveRef = useRef<((event: PointerEvent) => void) | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    if (fullScreen) {
      canvas.style.position = 'fixed'
      canvas.style.inset = '0'
      canvas.style.width = '100%'
      canvas.style.height = '100%'
    } else {
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      canvas.style.display = 'block'
    }

    const gl = canvas.getContext('webgl2', { antialias: false, alpha: false })
    if (!gl) return
    glRef.current = gl

    const shouldRender = () =>
      !(pauseWhenHidden && document.visibilityState === 'hidden') && !(pauseOnHover && hoverRef.current)
    shouldRenderRef.current = shouldRender

    const resize = () => {
      const currentCanvas = canvasRef.current
      const currentGl = glRef.current
      if (!currentCanvas || !currentGl) return
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
      const displayW = fullScreen ? window.innerWidth : currentCanvas.clientWidth
      const displayH = fullScreen ? window.innerHeight : currentCanvas.clientHeight
      const w = Math.floor(displayW * dpr)
      const h = Math.floor(displayH * dpr)
      if (currentCanvas.width !== w || currentCanvas.height !== h) {
        currentCanvas.width = w
        currentCanvas.height = h
      }
      currentGl.viewport(0, 0, w, h)
      if (uResRef.current) currentGl.uniform3f(uResRef.current, w, h, 1)
    }
    resizeRef.current = resize

    const program = createProgram(gl, VERT, FRAG)
    programRef.current = program
    gl.useProgram(program)

    const vao = gl.createVertexArray()
    if (!vao) return
    vaoRef.current = vao
    gl.bindVertexArray(vao)

    const quad = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
    const vbo = gl.createBuffer()
    if (!vbo) return
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW)

    const aPosLoc = 0
    gl.enableVertexAttribArray(aPosLoc)
    gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0)

    uTimeRef.current = gl.getUniformLocation(program, 'u_time')
    uResRef.current = gl.getUniformLocation(program, 'u_resolution')
    uMixRef.current = gl.getUniformLocation(program, 'u_mix')
    if (uMixRef.current) gl.uniform1f(uMixRef.current, mix)

    resize()
    const onResize = () => resizeRef.current()
    window.addEventListener('resize', onResize)

    const loop = (t: number) => {
      const currentGl = glRef.current
      const currentProgram = programRef.current
      if (!currentGl || !currentProgram) return
      if (!shouldRenderRef.current()) {
        rafRef.current = null
        return
      }
      currentGl.useProgram(currentProgram)
      if (uTimeRef.current) currentGl.uniform1f(uTimeRef.current, t * 0.001)
      currentGl.drawArrays(currentGl.TRIANGLE_STRIP, 0, 4)
      rafRef.current = requestAnimationFrame(loopRef.current)
    }
    loopRef.current = loop

    const onVisibility = () => {
      if (shouldRenderRef.current() && rafRef.current === null) {
        rafRef.current = requestAnimationFrame(loopRef.current)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    if (pauseOnHover) {
      onEnterRef.current = () => {
        hoverRef.current = true
      }
      onLeaveRef.current = () => {
        hoverRef.current = false
        if (rafRef.current === null && shouldRenderRef.current()) {
          rafRef.current = requestAnimationFrame(loopRef.current)
        }
      }
      canvas.addEventListener('pointerenter', onEnterRef.current)
      canvas.addEventListener('pointerleave', onLeaveRef.current)
    }

    rafRef.current = requestAnimationFrame(loopRef.current)

    return () => {
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
      if (pauseOnHover && onEnterRef.current && onLeaveRef.current) {
        canvas.removeEventListener('pointerenter', onEnterRef.current)
        canvas.removeEventListener('pointerleave', onLeaveRef.current)
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (vaoRef.current) gl.deleteVertexArray(vaoRef.current)
      if (programRef.current) gl.deleteProgram(programRef.current)
      glRef.current = null
      programRef.current = null
      vaoRef.current = null
    }
  }, [fullScreen, pauseWhenHidden, pauseOnHover, mix])

  return (
    <canvas
      ref={canvasRef}
      id="aurora-flux-canvas"
      className={className}
      style={style}
      aria-label={ariaLabel}
      role="img"
    />
  )
}

export default AuroraFlux
