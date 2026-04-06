import { useEffect, useRef } from 'react'

const BRANDS = ['Vortex', 'Nimbus', 'Prysma', 'Cirrus', 'Kynder', 'Halcyn']

function BrandItem({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="liquid-glass flex h-6 w-6 items-center justify-center rounded-lg text-xs text-foreground">
        {name.slice(0, 1)}
      </div>
      <span className="text-base font-semibold text-foreground">{name}</span>
    </div>
  )
}

export function SocialProofSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let rafId = 0
    let restartTimeout: ReturnType<typeof setTimeout> | undefined

    const updateOpacity = () => {
      const currentVideo = videoRef.current
      if (currentVideo && Number.isFinite(currentVideo.duration) && currentVideo.duration > 0) {
        const fadeSeconds = 0.5
        const remaining = currentVideo.duration - currentVideo.currentTime
        let opacity = 1

        if (currentVideo.currentTime < fadeSeconds) {
          opacity = currentVideo.currentTime / fadeSeconds
        } else if (remaining < fadeSeconds) {
          opacity = Math.max(remaining / fadeSeconds, 0)
        }

        currentVideo.style.opacity = opacity.toString()
      }

      rafId = window.requestAnimationFrame(updateOpacity)
    }

    const handleEnded = () => {
      const currentVideo = videoRef.current
      if (!currentVideo) return

      currentVideo.style.opacity = '0'
      restartTimeout = window.setTimeout(() => {
        currentVideo.currentTime = 0
        void currentVideo.play()
      }, 100)
    }

    video.addEventListener('ended', handleEnded)
    rafId = window.requestAnimationFrame(updateOpacity)

    return () => {
      window.cancelAnimationFrame(rafId)
      if (restartTimeout) window.clearTimeout(restartTimeout)
      video.removeEventListener('ended', handleEnded)
    }
  }, [])

  return (
    <section className="relative w-full overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 0 }}
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260308_114720_3dabeb9e-2c39-4907-b747-bc3544e2d5b7.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div className="relative z-10 flex flex-col items-center gap-20 px-4 pb-24 pt-16">
        <div className="h-40" />

        <div className="flex w-full max-w-5xl items-center gap-10 overflow-hidden">
          <p className="shrink-0 whitespace-nowrap text-sm text-foreground/50">
            Relied on by brands
            <br />
            across the globe
          </p>

          <div className="flex-1 overflow-hidden">
            <div className="flex w-max animate-marquee items-center gap-16 pr-16">
              {[...BRANDS, ...BRANDS].map((brand, idx) => (
                <BrandItem key={`${brand}-${idx}`} name={brand} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
