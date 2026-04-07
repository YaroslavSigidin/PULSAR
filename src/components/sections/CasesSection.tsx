import { useState } from 'react'
import { ArrowUpRight, Heart, Pause, Play, Send } from 'lucide-react'

import { Reveal } from '@/components/ui/Reveal'
import { withBaseUrl } from '@/lib/withBaseUrl'

type CaseTrack = {
  artists: string
  title: string
  url: string
  cover: string
}

const tracks: CaseTrack[] = [
  {
    artists: 'АКУЛИЧ, Молодой Платон',
    title: 'ПОДАРОК',
    url: 'https://music.yandex.ru/album/29475631/track/122065507?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/podarok.jpg'),
  },
  {
    artists: 'Молодой Платон, ЛСП',
    title: 'Секретарша',
    url: 'https://music.yandex.ru/album/32901624?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/sekretarsha.jpg'),
  },
  {
    artists: 'Платина, Voskresenskii',
    title: 'Бассок',
    url: 'https://music.yandex.ru/album/40890645/track/148716093?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/bassok.jpg'),
  },
  {
    artists: 'Exile Music, STOPBAN & DILBLIN',
    title: 'MiMiMaMaMu',
    url: 'https://music.yandex.ru/album/25969197/track/114088774?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/mimimamamu.jpg'),
  },
  {
    artists: 'Aarne, Big Baby Tape, Toxis, Chief Keef',
    title: '4 ur girl',
    url: 'https://music.yandex.ru/album/27928024/track/118618027?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/4-ur-girl.jpg'),
  },
  {
    artists: 'Lil Krystall',
    title: 'Первым делом',
    url: 'https://music.yandex.ru/album/33593119/track/131897969?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/pervym-delom.jpg'),
  },
  {
    artists: 'Scally Milano, uglystephan',
    title: 'Дай Мне Шанс',
    url: 'https://music.yandex.ru/album/25640764/track/113296213?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/dai-mne-shans.jpg'),
  },
  {
    artists: 'ALBLAK 52, Скриптонит, FRIENDLY THUG 52 NGG',
    title: 'Спокойной ночи',
    url: 'https://music.yandex.ru/album/31574614/track/126843935?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/spokoynoy-nochi.jpg'),
  },
  {
    artists: 'DILARA',
    title: 'Без пары',
    url: 'https://music.yandex.ru/album/36959831/track/139939477?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/bez-pary.jpg'),
  },
  {
    artists: 'By Индия',
    title: 'ей так страшно',
    url: 'https://music.yandex.ru/album/34188829/track/133371520?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/ey-tak-strashno.jpg'),
  },
  {
    artists: 'Big Baby Tape, kizaru',
    title: 'Haunted House',
    url: 'https://music.yandex.ru/album/27928024/track/118618025?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/haunted-house.jpg'),
  },
  {
    artists: 'MACAN, ALBLAK52',
    title: 'FLAGMAN',
    url: 'https://music.yandex.ru/album/37458189/track/141103758?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/flagman.jpg'),
  },
  {
    artists: 'gotlibgotlibgotlib',
    title: 'aromat',
    url: 'https://music.yandex.ru/album/37745619/track/141752062?utm_source=web&utm_medium=copy_link',
    cover: withBaseUrl('case-covers/aromat.jpg'),
  },
] as const

function getYandexEmbedUrl(url: string) {
  const { pathname } = new URL(url)
  const [, albumId, trackId] = pathname.match(/\/album\/(\d+)(?:\/track\/(\d+))?/) ?? []

  if (albumId && trackId) {
    return `https://music.yandex.ru/iframe/album/${albumId}/track/${trackId}`
  }

  if (albumId) {
    return `https://music.yandex.ru/iframe/album/${albumId}`
  }

  return url
}

function TrackPlayer({
  track,
  playerId,
  isPlayerActive,
  onTogglePlayer,
}: {
  track: CaseTrack
  playerId: string
  isPlayerActive: boolean
  onTogglePlayer: () => void
}) {
  const [isLiked, setIsLiked] = useState(false)
  const playbackLabel = isPlayerActive ? 'Pause' : 'Play'

  const handleShare = () => {
    const shareData = {
      title: `${track.artists} — ${track.title}`,
      url: track.url,
    }

    if (navigator.share) {
      void navigator.share(shareData).catch(() => undefined)
      return
    }

    if (navigator.clipboard) {
      void navigator.clipboard.writeText(track.url).catch(() => {
        window.open(track.url, '_blank', 'noopener,noreferrer')
      })
      return
    }

    window.open(track.url, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <div
        aria-label={`Действия для ${track.title}`}
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/42 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_44px_rgba(0,0,0,0.28)] backdrop-blur-md"
      >
        <button
          type="button"
          aria-label={isPlayerActive ? `Остановить ${track.title}` : `Включить ${track.title}`}
          aria-controls={playerId}
          aria-expanded={isPlayerActive}
          aria-pressed={isPlayerActive}
          onClick={onTogglePlayer}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/12 bg-white px-5 text-black transition duration-300 hover:scale-105 hover:bg-white/88"
        >
          {isPlayerActive ? (
            <Pause className="h-4 w-4 fill-current" aria-hidden="true" />
          ) : (
            <Play className="h-4 w-4 fill-current" aria-hidden="true" />
          )}
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">{playbackLabel}</span>
        </button>
        <button
          type="button"
          aria-label={isLiked ? `Убрать лайк ${track.title}` : `Лайкнуть ${track.title}`}
          aria-pressed={isLiked}
          onClick={() => setIsLiked((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/72 transition duration-300 hover:border-white/34 hover:bg-white/10 hover:text-white data-[pressed=true]:border-white/60 data-[pressed=true]:bg-white data-[pressed=true]:text-black"
          data-pressed={isLiked}
        >
          <Heart className={isLiked ? 'h-4 w-4 fill-current' : 'h-4 w-4'} aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label={`Переслать ${track.title}`}
          onClick={handleShare}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/72 transition duration-300 hover:border-white/34 hover:bg-white/10 hover:text-white"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {isPlayerActive && (
        <div className="mt-4 w-[min(100%,24rem)] overflow-hidden rounded-[1.35rem] border border-white/14 bg-black/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_44px_rgba(0,0,0,0.34)] backdrop-blur-md">
          <iframe
            id={playerId}
            title={`Плеер Яндекс Музыки — ${track.title}`}
            src={getYandexEmbedUrl(track.url)}
            loading="eager"
            className="h-[120px] w-full border-0"
            allow="autoplay; clipboard-write; encrypted-media"
          />
        </div>
      )}
    </>
  )
}

function CaseCard({
  index,
  track,
  isPlayerActive,
  onTogglePlayer,
}: {
  index: number
  track: CaseTrack
  isPlayerActive: boolean
  onTogglePlayer: () => void
}) {
  const playerId = `case-yandex-player-${index}`

  return (
    <li>
      <article className="group relative flex h-full min-h-[500px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 transition duration-500 hover:-translate-y-1 hover:border-white/24 hover:bg-white/[0.05] md:p-7">
        <div className="pointer-events-none absolute inset-0">
          <img
            src={track.cover}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-[0.24] saturate-[0.98] brightness-[0.92] transition duration-500 group-hover:scale-[1.04] group-hover:opacity-[0.28]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_28%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.46),rgba(0,0,0,0.74)_42%,rgba(0,0,0,0.94))]" />
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
          <TrackPlayer
            track={track}
            playerId={playerId}
            isPlayerActive={isPlayerActive}
            onTogglePlayer={onTogglePlayer}
          />
        </div>
      </article>
    </li>
  )
}

export function CasesSection() {
  const [activeTrackKey, setActiveTrackKey] = useState('')

  const togglePlayer = (trackKey: string) => {
    setActiveTrackKey((currentTrackKey) => (currentTrackKey === trackKey ? '' : trackKey))
  }

  return (
    <section id="cases" className="scroll-mt-28 bg-black px-4 pb-28 pt-10 text-white">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="text-xs tracking-[0.16em] text-white/45">SELECTED RELEASES</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">Наши кейсы</h2>
        </Reveal>

        <ul className="mt-14 grid gap-4 md:grid-cols-2">
          {tracks.map((track, index) => {
            const trackKey = `${track.artists}-${track.title}`

            return (
              <Reveal key={trackKey} delay={index * 40}>
                <CaseCard
                  index={index}
                  track={track}
                  isPlayerActive={activeTrackKey === trackKey}
                  onTogglePlayer={() => togglePlayer(trackKey)}
                />
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
