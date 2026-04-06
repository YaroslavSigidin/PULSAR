import { memo, useEffect, useRef } from 'react'
import Hls from 'hls.js'
import { ArrowUpRight } from 'lucide-react'

import { Reveal } from '@/components/ui/Reveal'

const STREAM_URL =
  'https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8'

const VideoPlayer = memo(function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let hls: Hls | null = null

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = STREAM_URL
    } else if (Hls.isSupported()) {
      hls = new Hls()
      hls.loadSource(STREAM_URL)
      hls.attachMedia(video)
    }

    const startPlayback = async () => {
      try {
        await video.play()
      } catch {
        // Browser autoplay policies can block play() intermittently.
      }
    }

    void startPlayback()

    return () => {
      if (hls) hls.destroy()
      video.pause()
      video.removeAttribute('src')
      video.load()
    }
  }, [])

  return <video ref={videoRef} autoPlay loop muted playsInline className="h-full w-full object-cover opacity-35" />
})

export function ContactsSection() {
  return (
    <section id="contacts" className="scroll-mt-28 relative overflow-hidden bg-black px-4 pb-14 pt-14 text-white">
      <div className="absolute inset-0">
        <VideoPlayer />
      </div>
      <div className="absolute inset-0 bg-black/75" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <footer className="relative min-h-[760px] overflow-hidden rounded-[30px] border border-white/20 bg-[radial-gradient(100%_90%_at_10%_0%,rgba(255,255,255,0.09),rgba(255,255,255,0.02)_35%,rgba(6,6,6,0.92)_70%)] px-8 py-10 md:px-12 md:py-12">
          <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-white/15 blur-[120px]" />
          <div className="pointer-events-none absolute right-1/4 top-1/3 h-32 w-[540px] -translate-y-1/2 rotate-[-18deg] bg-gradient-to-r from-transparent via-white/18 to-transparent blur-2xl" />
          <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-indigo-300/15 blur-[130px]" />

          <div className="relative flex min-h-[680px] flex-col justify-between gap-14">
            <div className="grid gap-10 md:grid-cols-1">
              <div className="grid gap-4 md:grid-cols-2">
                <Reveal className="rounded-2xl p-5">
                  <p className="text-xs tracking-[0.12em] text-white/45">СОЦСЕТИ</p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <a href="#" className="rounded-xl px-3 py-2 text-sm text-white/85 transition-all hover:-translate-y-0.5 hover:text-white">Instagram</a>
                    <a href="#" className="rounded-xl px-3 py-2 text-sm text-white/85 transition-all hover:-translate-y-0.5 hover:text-white">VK</a>
                    <a href="#" className="rounded-xl px-3 py-2 text-sm text-white/85 transition-all hover:-translate-y-0.5 hover:text-white">YouTube</a>
                  </div>
                </Reveal>

                <Reveal className="rounded-2xl p-5" delay={90}>
                  <p className="text-xs tracking-[0.12em] text-white/45">КОНТАКТЫ</p>
                  <a
                    href="mailto:hello@kkbrothers.studio"
                    className="mt-4 block text-base text-white/90 transition-colors hover:text-white"
                  >
                    hello@kkbrothers.studio
                  </a>
                  <a
                    href="tel:+79990000000"
                    className="mt-2 block text-base text-white/90 transition-colors hover:text-white"
                  >
                    +7 (999) 000-00-00
                  </a>
                  <a
                    href="#lead-form"
                    className="mt-5 inline-flex items-center rounded-full px-4 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
                  >
                    Оставить заявку
                  </a>
                </Reveal>
              </div>
            </div>

            <Reveal className="grid gap-8 border-y border-white/10 py-6" delay={150}>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/65">
                <a href="#services" className="transition-colors hover:text-white">Услуги</a>
                <a href="#video-production" className="transition-colors hover:text-white">Видео продакшн</a>
                <a href="#worked-with" className="transition-colors hover:text-white">Артисты</a>
                <a href="#cases" className="transition-colors hover:text-white">Кейсы</a>
                <a href="#lead-form" className="transition-colors hover:text-white">Оставить заявку</a>
              </div>
              <a
                href="mailto:hello@kkbrothers.studio"
                className="mt-2 inline-flex h-[120px] w-full items-center justify-center gap-2 rounded-2xl border border-white/35 px-6 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black md:mt-4"
              >
                Обсудить проект
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Reveal>

          </div>
        </footer>
      </div>
    </section>
  )
}
