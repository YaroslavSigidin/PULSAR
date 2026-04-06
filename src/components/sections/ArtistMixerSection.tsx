import { useMemo, useState } from 'react'
import { Disc3, Play, Power, SlidersHorizontal } from 'lucide-react'

import { Reveal } from '@/components/ui/Reveal'

const artists = [
  'Платина',
  'Lil Krystall',
  'Aarne',
  'Баста',
  'Slava Marlow',
  'Nyusha',
  'Молодой Платон',
  'By Индия',
  'Voskresenskii',
  'ЛСП',
  'Lovv66',
  'Toxis',
  'Миа Бойка',
  'Obladaet',
  'Macan',
  'ALBLAK52',
  'kizaru',
  'Егор Крид',
  'Big Baby Tape',
  'FEDUK',
  'Kain Angel & 9mice',
  'Dilara',
  'Blago white',
  'STOPBAN',
  'Скриптонит',
  'FRIENDLY THUG 52 NGG',
] as const

const padColors = [
  'from-rose-400/80 to-rose-500/80 shadow-[0_0_26px_rgba(251,113,133,0.34)]',
  'from-fuchsia-400/80 to-violet-500/80 shadow-[0_0_26px_rgba(192,132,252,0.34)]',
  'from-sky-400/80 to-cyan-500/80 shadow-[0_0_26px_rgba(56,189,248,0.34)]',
  'from-amber-300/80 to-orange-400/80 shadow-[0_0_26px_rgba(251,191,36,0.34)]',
  'from-emerald-300/80 to-lime-400/80 shadow-[0_0_26px_rgba(74,222,128,0.34)]',
  'from-indigo-400/80 to-blue-500/80 shadow-[0_0_26px_rgba(99,102,241,0.34)]',
] as const

function MixerPad({
  artist,
  index,
  active,
  onToggle,
}: {
  artist: string
  index: number
  active: boolean
  onToggle: () => void
}) {
  const glow = padColors[index % padColors.length]

  return (
    <button
      type="button"
      title={artist}
      onClick={onToggle}
      className={`group relative aspect-square overflow-hidden rounded-[1.15rem] border p-2 text-left transition duration-300 ${
        active
          ? 'border-white/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] -translate-y-1'
          : 'border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] hover:border-white/14 hover:-translate-y-0.5'
      }`}
    >
      <div className="absolute inset-[7px] rounded-[0.95rem] border border-white/6 bg-[#111111]" />
      <div
        className={`absolute inset-[7px] rounded-[0.95rem] opacity-0 blur-xl transition duration-300 ${
          active ? `bg-gradient-to-br ${glow} opacity-100` : ''
        }`}
      />
      <div
        className={`absolute inset-[7px] rounded-[0.95rem] transition duration-300 ${
          active ? `bg-gradient-to-br ${glow} opacity-100` : 'bg-transparent opacity-0 group-hover:opacity-60'
        }`}
        style={{
          maskImage:
            'linear-gradient(180deg, rgba(0,0,0,0.9), rgba(0,0,0,0.22) 36%, rgba(0,0,0,0) 78%)',
        }}
      />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/38">
            Pad {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className={`h-2.5 w-2.5 rounded-full transition ${
              active
                ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.82)]'
                : 'bg-white/14 group-hover:bg-white/36'
            }`}
          />
        </div>

        <div className="pb-1">
          <p className="text-[13px] font-semibold uppercase leading-4 tracking-[0.02em] text-white/88 md:text-[14px] md:leading-[1.1]">
            {artist}
          </p>
        </div>
      </div>
    </button>
  )
}

export function ArtistMixerSection() {
  const [activePads, setActivePads] = useState<boolean[]>(artists.map((_, index) => index < 6))

  const activeCount = useMemo(() => activePads.filter(Boolean).length, [activePads])

  return (
    <section className="bg-black px-4 pb-28 pt-10 text-white">
      <div className="mx-auto max-w-6xl">
        <Reveal className="border-t border-white/10 pt-8">
          <div className="max-w-4xl">
            <p className="text-xs tracking-[0.18em] text-white/40">ARTIST CONTROLLER</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Артисты на пэдах</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/58 md:text-base">
              Блок в эстетике музыкального pad-controller: каждый артист вынесен на отдельную клавишу, а
              активные пэды подсвечиваются как живая рабочая сессия.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-10">
          <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015))] p-4 shadow-[0_36px_90px_rgba(0,0,0,0.42)] md:p-6">
            <div className="rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-4 md:p-5">
              <div className="grid gap-5 xl:grid-cols-[240px_minmax(0,1fr)]">
                <div className="rounded-[1.7rem] border border-white/8 bg-black/20 p-4">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/42">
                      <Power className="h-3.5 w-3.5" />
                      Live
                    </div>
                    <span className="text-[11px] uppercase tracking-[0.24em] text-white/28">
                      {String(activeCount).padStart(2, '0')} ON
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {[36, 74].map((value, index) => (
                      <div key={`knob-${index}`} className="flex flex-col items-center gap-2">
                        <div className="relative h-16 w-16 rounded-full border border-white/12 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.18),rgba(255,255,255,0.04)_38%,rgba(0,0,0,0.72)_70%)]">
                          <div
                            className="absolute left-1/2 top-2 h-5 w-1 -translate-x-1/2 rounded-full bg-white/85"
                            style={{ transform: `translateX(-50%) rotate(${value * 1.2 - 55}deg)`, transformOrigin: '50% 24px' }}
                          />
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.22em] text-white/34">
                          K{index + 1}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 space-y-4">
                    {[58, 42].map((value, index) => (
                      <div key={`slider-${index}`}>
                        <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-white/34">
                          <span>F{index + 1}</span>
                          <span>{value}</span>
                        </div>
                        <div className="relative h-24 w-10 rounded-full border border-white/8 bg-black/35">
                          <div className="absolute left-1/2 top-3 h-[72px] w-[3px] -translate-x-1/2 rounded-full bg-white/10" />
                          <div
                            className="absolute left-1/2 h-7 w-7 -translate-x-1/2 rounded-full border border-white/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(182,188,198,0.9))] shadow-[0_8px_18px_rgba(0,0,0,0.32)]"
                            style={{ top: `${14 + (100 - value) * 0.44}px` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {[
                      { label: 'PLAY', icon: Play, active: true },
                      { label: 'LEVEL', icon: SlidersHorizontal, active: false },
                      { label: 'BANK', icon: Disc3, active: false },
                      { label: 'LIVE', icon: Power, active: true },
                    ].map((control) => {
                      const Icon = control.icon

                      return (
                        <button
                          key={control.label}
                          type="button"
                          className={`rounded-[0.95rem] border px-3 py-3 text-left transition ${
                            control.active
                              ? 'border-emerald-400/24 bg-emerald-500/10 text-emerald-100'
                              : 'border-white/8 bg-white/[0.03] text-white/72 hover:border-white/14'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.22em]">
                            {control.label}
                          </p>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {artists.map((artist, index) => (
                    <MixerPad
                      key={artist}
                      artist={artist}
                      index={index}
                      active={activePads[index]}
                      onToggle={() =>
                        setActivePads((current) =>
                          current.map((item, itemIndex) => (itemIndex === index ? !item : item)),
                        )
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
