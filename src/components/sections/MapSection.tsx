import { ArrowUpRight } from 'lucide-react'

import { Reveal } from '@/components/ui/Reveal'

const MAP_QUERY = 'Москва, студия HOTBOX'
const MAP_WIDGET_SRC = `https://yandex.ru/map-widget/v1/?text=${encodeURIComponent(MAP_QUERY)}&z=15`
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

            <div className="relative min-h-[420px] lg:min-h-[520px]">
              <iframe
                title="Яндекс Карта — Москва, студия HOTBOX"
                src={MAP_WIDGET_SRC}
                loading="lazy"
                className="absolute inset-0 h-full w-full grayscale contrast-125 brightness-[0.92] saturate-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-black/55 via-black/12 to-transparent" />
              <a
                href={MAP_OPEN_URL}
                target="_blank"
                rel="noreferrer"
                className="hero-chrome-button absolute bottom-6 left-6 right-6 z-20 inline-flex items-center justify-center gap-2 rounded-[14px] px-6 py-3 text-sm font-semibold text-black sm:left-auto sm:right-6 sm:w-auto"
              >
                Перейти в Яндекс Карты
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
