import { ArrowUpRight, MapPinned } from 'lucide-react'

import { Reveal } from '@/components/ui/Reveal'

const MAP_QUERY = 'Москва, студия HOTBOX'
const MAP_WIDGET_SRC = `https://yandex.ru/map-widget/v1/?text=${encodeURIComponent(MAP_QUERY)}&z=15`
const MAP_OPEN_URL = `https://yandex.ru/maps/?text=${encodeURIComponent(MAP_QUERY)}`

export function MapSection() {
  return (
    <section id="map" className="scroll-mt-28 bg-black px-4 pb-14 pt-10 text-white">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="text-xs tracking-[0.16em] text-white/45">КАРТА</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">HOTBOX на карте</h2>
          <p className="mx-auto mt-4 inline-flex rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-sm text-white/72">
            Москва, студия HOTBOX
          </p>
        </Reveal>

        <Reveal className="mt-8" delay={80}>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.03] shadow-[0_28px_84px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.08)]">
            <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_14%_14%,rgba(255,255,255,0.08),transparent_22%),radial-gradient(circle_at_84%_20%,rgba(255,255,255,0.05),transparent_18%),linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0)_18%,rgba(0,0,0,0.22)_100%)]" />
            <div className="pointer-events-none absolute inset-x-8 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

            <div className="grid gap-0 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)]">
              <div className="relative z-20 flex flex-col justify-between gap-8 border-b border-white/10 p-6 lg:min-h-[520px] lg:border-b-0 lg:border-r lg:border-white/10 lg:p-8">
                <div>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/14 bg-white/[0.04] text-white/90">
                    <MapPinned className="h-5 w-5" />
                  </div>

                  <p className="mt-6 text-xs uppercase tracking-[0.22em] text-white/38">Локация</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight">Яндекс Карта</h3>
                  <p className="mt-4 max-w-sm text-sm leading-7 text-white/68 md:text-[15px]">
                    Последний блок перед футером: спокойная ЧБ-карта, чтобы адрес читался без визуального
                    шума и сразу было понятно, куда ехать.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-white/34">Адрес</p>
                    <p className="mt-3 text-base text-white/86">Москва, студия HOTBOX</p>
                  </div>

                  <a
                    href={MAP_OPEN_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="hero-chrome-button inline-flex w-full items-center justify-center gap-2 rounded-[14px] px-6 py-3 text-sm font-semibold text-black"
                  >
                    Открыть в Яндекс Картах
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="relative min-h-[420px] lg:min-h-[520px]">
                <iframe
                  title="Яндекс Карта — Москва, студия HOTBOX"
                  src={MAP_WIDGET_SRC}
                  loading="lazy"
                  className="h-full w-full grayscale contrast-125 brightness-[0.92] saturate-0"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
