import { ArrowUpRight, MapPin, Navigation, Route } from 'lucide-react'

import { Reveal } from '@/components/ui/Reveal'

const MAP_QUERY = 'Москва, студия HOTBOX'
const MAP_OPEN_URL = `https://yandex.ru/maps/?text=${encodeURIComponent(MAP_QUERY)}`

export function MapSection() {
  return (
    <section id="map" className="scroll-mt-28 bg-black px-4 pb-14 pt-10 text-white">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Локация</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/62 md:text-lg">
            Москва, студия HOTBOX
          </p>
        </Reveal>

        <Reveal className="mt-8" delay={80}>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.03] shadow-[0_28px_84px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.08)]">
            <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_14%_14%,rgba(255,255,255,0.08),transparent_22%),radial-gradient(circle_at_84%_20%,rgba(255,255,255,0.05),transparent_18%),linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0)_18%,rgba(0,0,0,0.22)_100%)]" />
            <div className="pointer-events-none absolute inset-x-8 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

            <div
              role="img"
              aria-label="Схема локации студии HOTBOX в Москве"
              className="relative min-h-[360px] overflow-hidden bg-[radial-gradient(circle_at_50%_48%,rgba(255,255,255,0.18),transparent_16%),linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02)_42%,rgba(0,0,0,0.96))] lg:min-h-[440px]"
            >
              <svg
                className="absolute inset-0 h-full w-full opacity-80"
                viewBox="0 0 1200 520"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <pattern id="map-grid" width="72" height="72" patternUnits="userSpaceOnUse">
                    <path d="M72 0H0V72" stroke="white" strokeOpacity="0.055" strokeWidth="1" />
                  </pattern>
                  <linearGradient id="route-glow" x1="190" y1="410" x2="1010" y2="90" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0.2" />
                    <stop offset="0.48" stopColor="white" stopOpacity="0.9" />
                    <stop offset="1" stopColor="white" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <rect width="1200" height="520" fill="url(#map-grid)" />
                <path d="M-80 422C106 360 246 370 388 304C552 228 690 80 1260 112" stroke="white" strokeOpacity="0.15" strokeWidth="38" strokeLinecap="round" />
                <path d="M-60 198C172 178 342 208 504 260C730 332 868 418 1260 330" stroke="white" strokeOpacity="0.11" strokeWidth="30" strokeLinecap="round" />
                <path d="M146 560C178 384 246 292 336 214C442 122 558 88 688 -40" stroke="white" strokeOpacity="0.12" strokeWidth="22" strokeLinecap="round" />
                <path d="M812 560C772 428 754 330 782 236C818 118 916 58 1006 -36" stroke="white" strokeOpacity="0.1" strokeWidth="24" strokeLinecap="round" />
                <path d="M-70 438C118 374 254 374 394 308C558 232 692 84 1268 118" stroke="url(#route-glow)" strokeWidth="4" strokeLinecap="round" />
                <path d="M-40 198C170 184 332 210 496 262C726 334 862 414 1240 334" stroke="white" strokeOpacity="0.26" strokeWidth="3" strokeLinecap="round" />
                <path d="M148 540C184 380 252 292 338 218C444 126 562 88 678 -28" stroke="white" strokeOpacity="0.22" strokeWidth="3" strokeLinecap="round" />
                <path d="M816 540C778 424 764 334 792 238C824 126 914 64 1000 -22" stroke="white" strokeOpacity="0.2" strokeWidth="3" strokeLinecap="round" />
                <circle cx="602" cy="258" r="76" stroke="white" strokeOpacity="0.08" strokeWidth="1" />
                <circle cx="602" cy="258" r="132" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
              </svg>

              <div className="pointer-events-none absolute left-5 top-5 rounded-full border border-white/12 bg-black/48 px-4 py-2 text-[11px] uppercase tracking-[0.26em] text-white/55 backdrop-blur-md md:left-8 md:top-8">
                Москва
              </div>

              <div className="pointer-events-none absolute right-5 top-5 hidden items-center gap-2 rounded-full border border-white/12 bg-black/48 px-4 py-2 text-xs text-white/60 backdrop-blur-md sm:flex md:right-8 md:top-8">
                <Route className="h-4 w-4" aria-hidden="true" />
                Нижегородская
              </div>

              <div className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4 text-center">
                <div className="relative flex h-24 w-24 items-center justify-center">
                  <span className="absolute inset-0 rounded-full border border-white/18 bg-white/8 blur-sm" />
                  <span className="absolute h-16 w-16 animate-ping rounded-full border border-white/18" />
                  <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/24 bg-black/70 text-white shadow-[0_0_44px_rgba(255,255,255,0.18)] backdrop-blur-md">
                    <MapPin className="h-7 w-7" aria-hidden="true" />
                  </span>
                </div>
                <div className="rounded-[1.25rem] border border-white/14 bg-black/68 px-6 py-4 shadow-[0_18px_60px_rgba(0,0,0,0.42)] backdrop-blur-md">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/46">Студия</p>
                  <p className="mt-1 text-2xl font-semibold tracking-tight text-white">HOTBOX</p>
                  <p className="mt-2 text-sm text-white/58">Москва, студия HOTBOX</p>
                </div>
              </div>

              <div className="pointer-events-none absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-white/12 bg-black/48 px-4 py-2 text-xs text-white/56 backdrop-blur-md md:bottom-8 md:left-8">
                <Navigation className="h-4 w-4" aria-hidden="true" />
                Открыть маршрут в картах
              </div>

              <div className="absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-black/55 via-black/12 to-transparent" />
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-7 flex justify-center" delay={140}>
          <a
            href={MAP_OPEN_URL}
            target="_blank"
            rel="noreferrer"
            className="hero-chrome-button inline-flex w-full max-w-[18rem] items-center justify-center gap-2 rounded-[8px] px-7 py-3.5 text-sm font-semibold text-black"
          >
            Открыть карты
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
