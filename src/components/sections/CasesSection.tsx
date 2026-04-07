import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowUpRight,
  Disc3,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
} from 'lucide-react'

import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'
import { withBaseUrl } from '@/lib/withBaseUrl'

type CaseTrack = {
  artists: string
  title: string
  url: string
  cover: string
  audioSrc: string
}

const tracks: CaseTrack[] = [
  {
    artists: 'АКУЛИЧ, Молодой Платон',
    title: 'ПОДАРОК',
    url: 'https://music.yandex.ru/album/29475631/track/122065507?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/podarok.jpg'),
    audioSrc: withBaseUrl('music/AKULICH_Molodojj_Platon_-_PODAROK_77464717.mp3'),
  },
  {
    artists: 'Молодой Платон, ЛСП',
    title: 'Секретарша',
    url: 'https://music.yandex.ru/album/32901624/track/130173426?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/sekretarsha.jpg'),
    audioSrc: withBaseUrl('music/Molodojj_Platon_LSP_-_SEKRETARSHA_78253652.mp3'),
  },
  {
    artists: 'Платина, Voskresenskii',
    title: 'Бассок',
    url: 'https://music.yandex.ru/album/40890645/track/148716093?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/bassok.jpg'),
    audioSrc: withBaseUrl('music/Platina_Voskresenskii_-_Bassok_77691072.mp3'),
  },
  {
    artists: 'Exile Music, STOPBAN & DILBLIN',
    title: 'MiMiMaMaMu',
    url: 'https://music.yandex.ru/album/25969197/track/114088774?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/mimimamamu.jpg'),
    audioSrc: withBaseUrl('music/EXILE_STOPBAN_DILBLIN_-_Mimimamamu_76385206.mp3'),
  },
  {
    artists: 'Aarne, Big Baby Tape, Toxis, Chief Keef',
    title: '4 ur girl',
    url: 'https://music.yandex.ru/album/27928024/track/118618027?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/4-ur-girl.jpg'),
    audioSrc: withBaseUrl('music/Aarne_Big_Baby_Tape_Toxi_Chief_Keef_-_4_ur_girl_76894962.mp3'),
  },
  {
    artists: 'Lil Krystall',
    title: 'Первым делом',
    url: 'https://music.yandex.ru/album/33593119/track/131897969?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/pervym-delom.jpg'),
    audioSrc: withBaseUrl('music/LIL_KRYSTALLL_-_Pervym_delom_(musmore.org).mp3'),
  },
  {
    artists: 'Scally Milano, uglystephan',
    title: 'Дай Мне Шанс',
    url: 'https://music.yandex.ru/album/25640764/track/113296213?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/dai-mne-shans.jpg'),
    audioSrc: withBaseUrl('music/Scally Milano, uglystephan — Дай Мне Шанс (www.lightaudio.ru).mp3'),
  },
  {
    artists: 'ALBLAK 52, Скриптонит, FRIENDLY THUG 52 NGG',
    title: 'Спокойной ночи',
    url: 'https://music.yandex.ru/album/31574614/track/126843935?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/spokoynoy-nochi.jpg'),
    audioSrc: withBaseUrl('music/ALBLAK_52_Skriptonit_FRIENDLY_THUG_52_NGG_-_Spokojjnojj_nochi_77933880.mp3'),
  },
  {
    artists: 'DILARA',
    title: 'Без пары',
    url: 'https://music.yandex.ru/album/36959831/track/139939477?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/bez-pary.jpg'),
    audioSrc: withBaseUrl('music/Dilara_-_Bez_Pary_79485752.mp3'),
  },
  {
    artists: 'By Индия',
    title: 'ей так страшно',
    url: 'https://music.yandex.ru/album/34188829/track/133371520?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/ey-tak-strashno.jpg'),
    audioSrc: withBaseUrl('music/By_Indiya_-_ejj_tak_strashno_78686062.mp3'),
  },
  {
    artists: 'Big Baby Tape, kizaru',
    title: 'Haunted House',
    url: 'https://music.yandex.ru/album/27928024/track/118618025?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/haunted-house.jpg'),
    audioSrc: withBaseUrl('music/Aarne_Big_Baby_Tape_kizaru_-_Haunted_House_76894960.mp3'),
  },
  {
    artists: 'MACAN, ALBLAK52',
    title: 'FLAGMAN',
    url: 'https://music.yandex.ru/album/37458189/track/141103758?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/flagman.jpg'),
    audioSrc: withBaseUrl('music/MACAN_ALBLAK_52_-_FLAGMAN_79326911.mp3'),
  },
  {
    artists: 'gotlibgotlibgotlib',
    title: 'aromat',
    url: 'https://music.yandex.ru/album/37745619/track/141752062?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/aromat.jpg'),
    audioSrc: withBaseUrl('music/gotlibgotlibgotlib_-_aromat_79472676.mp3'),
  },
]

const waveBars = Array.from({ length: 46 }, (_, index) => 18 + ((index * 17) % 38))

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return '0:00'
  }

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`
}

function CasesAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.82)

  const activeTrack = tracks[activeIndex]
  const progress = duration > 0 ? currentTime / duration : 0

  const nextTrackIndex = useMemo(() => (activeIndex + 1) % tracks.length, [activeIndex])
  const previousTrackIndex = useMemo(
    () => (activeIndex - 1 + tracks.length) % tracks.length,
    [activeIndex],
  )

  useEffect(() => {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    audio.volume = volume
  }, [volume])

  const play = () => {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
  }

  const pause = () => {
    audioRef.current?.pause()
    setIsPlaying(false)
  }

  const togglePlay = () => {
    if (isPlaying) {
      pause()
      return
    }

    play()
  }

  const resetTrackProgress = () => {
    setCurrentTime(0)
    setDuration(0)
  }

  const selectTrack = (index: number) => {
    if (index === activeIndex) {
      togglePlay()
      return
    }

    resetTrackProgress()
    setActiveIndex(index)
    setIsPlaying(true)
  }

  const changeTrack = (index: number) => {
    resetTrackProgress()
    setActiveIndex(index)
    setIsPlaying(true)
  }

  const seek = (value: number) => {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    audio.currentTime = value
    setCurrentTime(value)
  }

  return (
    <div
      data-player-version="studio-player-v2"
      className="relative mt-14 overflow-hidden rounded-[2.5rem] border border-white/14 bg-white/[0.055] shadow-[0_34px_90px_rgba(0,0,0,0.34)] backdrop-blur-2xl"
    >
      <div className="pointer-events-none absolute inset-0">
        <img
          src={activeTrack.cover}
          alt=""
          className="h-full w-full object-cover opacity-[0.12] blur-3xl saturate-125 scale-110"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_12%,rgba(255,255,255,0.18),transparent_24%),radial-gradient(circle_at_78%_6%,rgba(255,255,255,0.08),transparent_20%),linear-gradient(140deg,rgba(255,255,255,0.05),rgba(0,0,0,0.3)_66%,rgba(255,255,255,0.04))]" />
        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </div>

      <audio
        ref={audioRef}
        src={activeTrack.audioSrc}
        preload="metadata"
        onLoadedMetadata={(event) => {
          setDuration(event.currentTarget.duration)

          if (isPlaying) {
            event.currentTarget.play().catch(() => setIsPlaying(false))
          }
        }}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onEnded={() => changeTrack(nextTrackIndex)}
      />

      <div className="relative z-10 grid gap-6 p-4 md:grid-cols-[minmax(0,1fr)_21rem] md:p-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.045] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] md:p-7">
          <div className="absolute right-6 top-6 hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white/44 md:inline-flex">
            <Disc3 className={cn('h-3.5 w-3.5', isPlaying && 'animate-spin')} />
            Studio player
          </div>

          <div className="grid gap-6 lg:grid-cols-[16rem_minmax(0,1fr)] lg:items-end">
            <div className="group relative aspect-square overflow-hidden rounded-[1.7rem] border border-white/16 bg-white/[0.035] shadow-[0_24px_70px_rgba(0,0,0,0.36)]">
              <img
                src={activeTrack.cover}
                alt=""
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.58))]" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-white/62">
                <span>{String(activeIndex + 1).padStart(2, '0')}</span>
                <span>{tracks.length} tracks</span>
              </div>
            </div>

            <div>
              <p className="max-w-2xl text-sm leading-6 text-white/58 md:text-[15px]">
                {activeTrack.artists}
              </p>
              <h3 className="artist-name-chrome case-player-title mt-4 max-w-[38rem] text-[3.4rem] font-semibold uppercase leading-[0.88] text-white sm:text-[4.2rem] md:text-[5.4rem]">
                {activeTrack.title}
              </h3>

              <div className="mt-8">
                <div className="flex h-20 items-end gap-1 overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.045] px-4 pb-4 pt-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                  {waveBars.map((height, index) => {
                    const barProgress = index / (waveBars.length - 1)
                    const isActive = barProgress <= progress

                    return (
                      <span
                        key={`wave-${index}`}
                        className={cn(
                          'flex-1 rounded-full transition duration-300',
                          isActive
                            ? 'bg-white shadow-[0_0_16px_rgba(255,255,255,0.48)]'
                            : 'bg-white/16',
                        )}
                        style={{ height: `${isActive && isPlaying ? height + 8 : height}px` }}
                      />
                    )
                  })}
                </div>

                <div className="mt-5 flex items-center gap-3 text-[12px] font-medium tabular-nums text-white/50">
                  <span>{formatTime(currentTime)}</span>
                  <input
                    type="range"
                    min={0}
                    max={duration || 0}
                    step={0.1}
                    value={Math.min(currentTime, duration || currentTime)}
                    onChange={(event) => seek(Number(event.currentTarget.value))}
                    aria-label="Позиция трека"
                    className="h-1.5 flex-1 cursor-pointer accent-white"
                  />
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => changeTrack(previousTrackIndex)}
                    aria-label="Предыдущий трек"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/72 transition hover:border-white/22 hover:bg-white/10 hover:text-white"
                  >
                    <SkipBack className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Пауза' : 'Воспроизвести'}
                    className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-[0_18px_44px_rgba(255,255,255,0.16)] transition hover:scale-105"
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="ml-1 h-6 w-6" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => changeTrack(nextTrackIndex)}
                    aria-label="Следующий трек"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/72 transition hover:border-white/22 hover:bg-white/10 hover:text-white"
                  >
                    <SkipForward className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.045] px-4 py-3 text-white/62">
                  <Volume2 className="h-4 w-4" />
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={(event) => setVolume(Number(event.currentTarget.value))}
                    aria-label="Громкость"
                    className="h-1.5 w-28 cursor-pointer accent-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/12 bg-white/[0.045] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <div className="flex items-center justify-between px-2 py-3">
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/40">Playlist</p>
            <a
              href={activeTrack.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-[11px] font-medium text-white/58 transition hover:border-white/24 hover:text-white"
            >
              Yandex
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="cases-scrollbar max-h-[36rem] space-y-2 overflow-y-auto pr-1">
            {tracks.map((track, index) => {
              const isActive = index === activeIndex

              return (
                <button
                  key={`${track.artists}-${track.title}`}
                  type="button"
                  onClick={() => selectTrack(index)}
                  className={cn(
                    'group grid w-full grid-cols-[3.5rem_minmax(0,1fr)_2rem] items-center gap-3 rounded-[1.25rem] border p-2 text-left transition duration-300',
                    isActive
                      ? 'border-white/26 bg-white text-black shadow-[0_16px_44px_rgba(255,255,255,0.12)]'
                      : 'border-white/8 bg-white/[0.035] text-white hover:border-white/18 hover:bg-white/[0.07]',
                  )}
                >
                  <img
                    src={track.cover}
                    alt=""
                    className="h-14 w-14 rounded-[0.95rem] object-cover"
                  />
                  <span className="min-w-0">
                    <span
                      className={cn(
                        'block truncate text-[13px] font-semibold uppercase tracking-[-0.01em]',
                        isActive ? 'text-black' : 'text-white/86',
                      )}
                    >
                      {track.title}
                    </span>
                    <span
                      className={cn(
                        'mt-1 block truncate text-[12px]',
                        isActive ? 'text-black/56' : 'text-white/42',
                      )}
                    >
                      {track.artists}
                    </span>
                  </span>
                  <span
                    className={cn(
                      'inline-flex h-8 w-8 items-center justify-center rounded-full',
                      isActive ? 'bg-black text-white' : 'bg-white/8 text-white/58 group-hover:bg-white/14',
                    )}
                  >
                    {isActive && isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="ml-0.5 h-3.5 w-3.5" />}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export function CasesSection() {
  return (
    <section id="cases" className="scroll-mt-28 bg-black px-4 pb-28 pt-10 text-white">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="text-xs tracking-[0.16em] text-white/45">SELECTED RELEASES</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">Наши кейсы</h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/55 md:text-base">
            Кастомный плеер играет добавленные аудиофайлы, а ссылки ведут на релизы в Яндекс Музыке.
          </p>
        </Reveal>

        <Reveal>
          <CasesAudioPlayer />
        </Reveal>
      </div>
    </section>
  )
}
