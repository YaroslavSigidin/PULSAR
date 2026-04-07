import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

import { Reveal } from '@/components/ui/Reveal'
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
    audioSrc: new URL('../../../music/AKULICH_Molodojj_Platon_-_PODAROK_77464717.mp3', import.meta.url).href,
  },
  {
    artists: 'Молодой Платон, ЛСП',
    title: 'Секретарша',
    url: 'https://music.yandex.ru/album/32901624/track/130173426?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/sekretarsha.jpg'),
    audioSrc: new URL('../../../music/Molodojj_Platon_LSP_-_SEKRETARSHA_78253652.mp3', import.meta.url).href,
  },
  {
    artists: 'Платина, Voskresenskii',
    title: 'Бассок',
    url: 'https://music.yandex.ru/album/40890645/track/148716093?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/bassok.jpg'),
    audioSrc: new URL('../../../music/Platina_Voskresenskii_-_Bassok_77691072.mp3', import.meta.url).href,
  },
  {
    artists: 'Exile Music, STOPBAN & DILBLIN',
    title: 'MiMiMaMaMu',
    url: 'https://music.yandex.ru/album/25969197/track/114088774?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/mimimamamu.jpg'),
    audioSrc: new URL('../../../music/EXILE_STOPBAN_DILBLIN_-_Mimimamamu_76385206.mp3', import.meta.url).href,
  },
  {
    artists: 'Aarne, Big Baby Tape, Toxis, Chief Keef',
    title: '4 ur girl',
    url: 'https://music.yandex.ru/album/27928024/track/118618027?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/4-ur-girl.jpg'),
    audioSrc: new URL('../../../music/Aarne_Big_Baby_Tape_Toxi_Chief_Keef_-_4_ur_girl_76894962.mp3', import.meta.url).href,
  },
  {
    artists: 'Lil Krystall',
    title: 'Первым делом',
    url: 'https://music.yandex.ru/album/33593119/track/131897969?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/pervym-delom.jpg'),
    audioSrc: new URL('../../../music/LIL_KRYSTALLL_-_Pervym_delom_(musmore.org).mp3', import.meta.url).href,
  },
  {
    artists: 'Scally Milano, uglystephan',
    title: 'Дай Мне Шанс',
    url: 'https://music.yandex.ru/album/25640764/track/113296213?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/dai-mne-shans.jpg'),
    audioSrc: new URL('../../../music/Scally Milano, uglystephan — Дай Мне Шанс (www.lightaudio.ru).mp3', import.meta.url).href,
  },
  {
    artists: 'ALBLAK 52, Скриптонит, FRIENDLY THUG 52 NGG',
    title: 'Спокойной ночи',
    url: 'https://music.yandex.ru/album/31574614/track/126843935?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/spokoynoy-nochi.jpg'),
    audioSrc: new URL('../../../music/ALBLAK_52_Skriptonit_FRIENDLY_THUG_52_NGG_-_Spokojjnojj_nochi_77933880.mp3', import.meta.url).href,
  },
  {
    artists: 'DILARA',
    title: 'Без пары',
    url: 'https://music.yandex.ru/album/36959831/track/139939477?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/bez-pary.jpg'),
    audioSrc: new URL('../../../music/Dilara_-_Bez_Pary_79485752.mp3', import.meta.url).href,
  },
  {
    artists: 'By Индия',
    title: 'ей так страшно',
    url: 'https://music.yandex.ru/album/34188829/track/133371520?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/ey-tak-strashno.jpg'),
    audioSrc: new URL('../../../music/By_Indiya_-_ejj_tak_strashno_78686062.mp3', import.meta.url).href,
  },
  {
    artists: 'Big Baby Tape, kizaru',
    title: 'Haunted House',
    url: 'https://music.yandex.ru/album/27928024/track/118618025?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/haunted-house.jpg'),
    audioSrc: new URL('../../../music/Aarne_Big_Baby_Tape_kizaru_-_Haunted_House_76894960.mp3', import.meta.url).href,
  },
  {
    artists: 'MACAN, ALBLAK52',
    title: 'FLAGMAN',
    url: 'https://music.yandex.ru/album/37458189/track/141103758?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/flagman.jpg'),
    audioSrc: new URL('../../../music/MACAN_ALBLAK_52_-_FLAGMAN_79326911.mp3', import.meta.url).href,
  },
  {
    artists: 'gotlibgotlibgotlib',
    title: 'aromat',
    url: 'https://music.yandex.ru/album/37745619/track/141752062?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/aromat.jpg'),
    audioSrc: new URL('../../../music/gotlibgotlibgotlib_-_aromat_79472676.mp3', import.meta.url).href,
  },
] as const

function CaseCard({
  index,
  track,
  isPlaying,
  onPlayerToggle,
}: {
  index: number
  track: CaseTrack
  isPlaying: boolean
  onPlayerToggle: () => void
}) {
  return (
    <li>
      <article className="group relative flex h-full min-h-[500px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 transition duration-500 hover:-translate-y-1 hover:border-white/24 hover:bg-white/[0.05] md:p-7">
        <div className="pointer-events-none absolute inset-0">
          <img
            src={track.cover}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-top opacity-35 saturate-[1.02] transition-opacity duration-700 ease-out group-hover:opacity-60"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.68),rgba(0,0,0,0.82)_44%,rgba(0,0,0,0.94))] transition-opacity duration-700 ease-out group-hover:opacity-60" />
        </div>

        <a
          href={track.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Открыть ${track.title} в Яндекс Музыке`}
          className="absolute right-6 top-6 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-white/70 transition duration-300 group-hover:border-white/34 group-hover:bg-white group-hover:text-black"
        >
          <ArrowUpRight className="h-4 w-4" />
        </a>

        <span className="absolute left-6 top-6 z-10 text-[12px] font-medium tracking-[0.24em] text-white/38">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="relative z-10 mt-auto max-w-[24rem]">
          <p className="max-w-[24rem] text-sm leading-6 text-white/55 md:text-[15px]">
            {track.artists}
          </p>
          <h3 className="artist-name-chrome mt-4 max-w-[20rem] text-[2rem] font-semibold uppercase tracking-[-0.04em] text-white md:text-[2.5rem] md:leading-[0.95]">
            {track.title}
          </h3>
          <button
            type="button"
            onClick={onPlayerToggle}
            aria-label={isPlaying ? `Остановить ${track.title}` : `Включить ${track.title}`}
            aria-pressed={isPlaying}
            className="mt-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/16 bg-white/[0.06] text-white transition duration-300 hover:border-white/36 hover:bg-white hover:text-black"
          >
            <span
              aria-hidden="true"
              className={isPlaying ? 'h-4 w-4 rounded-[2px] bg-current' : 'ml-0.5 h-0 w-0 border-y-[8px] border-l-[13px] border-y-transparent border-l-current'}
            />
          </button>
        </div>
      </article>
    </li>
  )
}

export function CasesSection() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [activeTrackIndex, setActiveTrackIndex] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onEnded = () => {
      setIsPlaying(false)
      setActiveTrackIndex(null)
    }

    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('ended', onEnded)
    }
  }, [])

  function handlePlayerToggle(track: CaseTrack, index: number) {
    const audio = audioRef.current
    if (!audio) return

    if (activeTrackIndex === index) {
      if (isPlaying) {
        audio.pause()
        audio.currentTime = 0
        setIsPlaying(false)
        setActiveTrackIndex(null)
        return
      }

      void audio
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch(() => {
          setIsPlaying(false)
          setActiveTrackIndex(null)
        })
      return
    }

    audio.pause()
    audio.src = track.audioSrc
    audio.currentTime = 0
    setActiveTrackIndex(index)

    void audio
      .play()
      .then(() => {
        setIsPlaying(true)
      })
      .catch(() => {
        setIsPlaying(false)
        setActiveTrackIndex(null)
      })
  }

  return (
    <section id="cases" className="scroll-mt-28 bg-black px-4 pb-28 pt-10 text-white">
      <audio ref={audioRef} preload="none" />
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="text-xs tracking-[0.16em] text-white/45">SELECTED RELEASES</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">Наши кейсы</h2>
        </Reveal>

        <ul className="mt-14 grid gap-4 md:grid-cols-2">
          {tracks.map((track, index) => (
            <Reveal key={`${track.artists}-${track.title}`} delay={index * 40}>
              <CaseCard
                index={index}
                track={track}
                isPlaying={activeTrackIndex === index && isPlaying}
                onPlayerToggle={() => handlePlayerToggle(track, index)}
              />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
