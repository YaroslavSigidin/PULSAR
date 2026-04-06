import { useEffect, useMemo, useRef, useState } from 'react'
import Hls from 'hls.js'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type VideoKind = 'hls' | 'mp4'

type VideoItem = {
  title: string
  description: string
  src: string
  kind: VideoKind
}

const videos: VideoItem[] = [
  {
    title: 'Клип / Performance Visual',
    description: 'Кадры под трек с акцентом на атмосферу, ритм и образ артиста.',
    src: 'https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8',
    kind: 'hls',
  },
  {
    title: 'Короткий промо-ролик',
    description: 'Формат для соцсетей и прогрева релиза: динамика, хук и запоминающийся кадр.',
    src: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260308_114720_3dabeb9e-2c39-4907-b747-bc3544e2d5b7.mp4',
    kind: 'mp4',
  },
]

function VideoPreview({
  src,
  kind,
  isActive,
}: {
  src: string
  kind: VideoKind
  isActive: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let hls: Hls | null = null

    if (kind === 'hls') {
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src
      } else if (Hls.isSupported()) {
        hls = new Hls()
        hls.loadSource(src)
        hls.attachMedia(video)
      }
    } else {
      video.src = src
    }

    return () => {
      if (hls) hls.destroy()
      video.pause()
      video.removeAttribute('src')
      video.load()
    }
  }, [src, kind])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isActive) {
      void video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [isActive])

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      className="h-full w-full object-cover"
    />
  )
}

export function VideoProductionSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const total = videos.length

  const goPrev = () => setActiveIndex((prev) => (prev - 1 + total) % total)
  const goNext = () => setActiveIndex((prev) => (prev + 1) % total)

  const translate = useMemo(() => `translateX(-${activeIndex * 100}%)`, [activeIndex])

  return (
    <section id="video-production" className="scroll-mt-28 bg-black px-4 pb-28 pt-8 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-center gap-6 text-center">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Видео продакшн</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-white/65 md:text-base">
              Примеры видео-работ: форматы для клипов, социальных сетей и промо-релизов.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              className="liquid-glass rounded-full p-2.5 text-white/85 transition-colors hover:text-white"
              aria-label="Предыдущий слайд"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="liquid-glass rounded-full p-2.5 text-white/85 transition-colors hover:text-white"
              aria-label="Следующий слайд"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/15">
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: translate }}
          >
            {videos.map((item, index) => (
              <article key={item.src} className="relative min-w-full bg-black">
                <div className="h-[420px] w-full">
                  <VideoPreview src={item.src} kind={item.kind} isActive={activeIndex === index} />
                </div>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 md:p-8">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm text-white/75">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-5 flex justify-center gap-2">
          {videos.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all ${
                activeIndex === index ? 'w-8 bg-white' : 'w-4 bg-white/30'
              }`}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
