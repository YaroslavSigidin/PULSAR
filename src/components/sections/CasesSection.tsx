import { ArrowUpRight } from 'lucide-react'

import { Reveal } from '@/components/ui/Reveal'

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
    cover: '/case-covers/podarok.jpg',
  },
  {
    artists: 'Молодой Платон, ЛСП',
    title: 'Секретарша',
    url: 'https://music.yandex.ru/album/32901624?utm_source=web&utm_medium=copy_link',
    cover: '/case-covers/sekretarsha.jpg',
  },
  {
    artists: 'Платина, Voskresenskii',
    title: 'Бассок',
    url: 'https://music.yandex.ru/album/40890645/track/148716093?utm_source=web&utm_medium=copy_link',
    cover: '/case-covers/bassok.jpg',
  },
  {
    artists: 'Exile Music, STOPBAN & DILBLIN',
    title: 'MiMiMaMaMu',
    url: 'https://music.yandex.ru/album/25969197/track/114088774?utm_source=web&utm_medium=copy_link',
    cover: '/case-covers/mimimamamu.jpg',
  },
  {
    artists: 'Aarne, Big Baby Tape, Toxis, Chief Keef',
    title: '4 ur girl',
    url: 'https://music.yandex.ru/album/27928024/track/118618027?utm_source=web&utm_medium=copy_link',
    cover: '/case-covers/4-ur-girl.jpg',
  },
  {
    artists: 'Lil Krystall',
    title: 'Первым делом',
    url: 'https://music.yandex.ru/album/33593119/track/131897969?utm_source=web&utm_medium=copy_link',
    cover: '/case-covers/pervym-delom.jpg',
  },
  {
    artists: 'Scally Milano, uglystephan',
    title: 'Дай Мне Шанс',
    url: 'https://music.yandex.ru/album/25640764/track/113296213?utm_source=web&utm_medium=copy_link',
    cover: '/case-covers/dai-mne-shans.jpg',
  },
  {
    artists: 'ALBLAK 52, Скриптонит, FRIENDLY THUG 52 NGG',
    title: 'Спокойной ночи',
    url: 'https://music.yandex.ru/album/31574614/track/126843935?utm_source=web&utm_medium=copy_link',
    cover: '/case-covers/spokoynoy-nochi.jpg',
  },
  {
    artists: 'DILARA',
    title: 'Без пары',
    url: 'https://music.yandex.ru/album/36959831/track/139939477?utm_source=web&utm_medium=copy_link',
    cover: '/case-covers/bez-pary.jpg',
  },
  {
    artists: 'By Индия',
    title: 'ей так страшно',
    url: 'https://music.yandex.ru/album/34188829/track/133371520?utm_source=web&utm_medium=copy_link',
    cover: '/case-covers/ey-tak-strashno.jpg',
  },
  {
    artists: 'Big Baby Tape, kizaru',
    title: 'Haunted House',
    url: 'https://music.yandex.ru/album/27928024/track/118618025?utm_source=web&utm_medium=copy_link',
    cover: '/case-covers/haunted-house.jpg',
  },
  {
    artists: 'MACAN, ALBLAK52',
    title: 'FLAGMAN',
    url: 'https://music.yandex.ru/album/37458189/track/141103758?utm_source=web&utm_medium=copy_link',
    cover: '/case-covers/flagman.jpg',
  },
  {
    artists: 'gotlibgotlibgotlib',
    title: 'aromat',
    url: 'https://music.yandex.ru/album/37745619/track/141752062?utm_source=web&utm_medium=copy_link',
    cover: '/case-covers/aromat.jpg',
  },
] as const

function YandexMusicLogo({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 3.5a8.5 8.5 0 0 1 0 17" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="2.35" fill="currentColor" />
    </svg>
  )
}

function StreamingPlatforms() {
  const iconClasses =
    'inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-black/25 text-white/80 backdrop-blur-sm transition-colors group-hover:text-white'

  return (
    <div className="mt-5 flex items-center">
      <span className={iconClasses}>
        <YandexMusicLogo className="h-[18px] w-[18px]" />
      </span>
    </div>
  )
}

function CaseCard({ index, track }: { index: number; track: CaseTrack }) {
  return (
    <li>
      <a
        href={track.url}
        target="_blank"
        rel="noreferrer"
        className="group relative flex min-h-[420px] h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 transition duration-500 hover:-translate-y-1 hover:border-white/24 hover:bg-white/[0.05] md:p-7"
      >
        <div className="pointer-events-none absolute inset-0">
          <img
            src={track.cover}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-[0.24] saturate-[0.98] brightness-[0.92] transition duration-500 group-hover:scale-[1.04] group-hover:opacity-[0.28]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_28%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.46),rgba(0,0,0,0.74)_42%,rgba(0,0,0,0.94))]" />
        </div>

        <span className="absolute right-6 top-6 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-white/70 transition duration-300 group-hover:border-white/34 group-hover:bg-white group-hover:text-black">
          <ArrowUpRight className="h-4 w-4" />
        </span>

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
          <StreamingPlatforms />
        </div>
      </a>
    </li>
  )
}

export function CasesSection() {
  return (
    <section id="cases" className="scroll-mt-28 bg-black px-4 pb-28 pt-10 text-white">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="text-xs tracking-[0.16em] text-white/45">SELECTED RELEASES</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">Наши кейсы</h2>
          <p className="mx-auto mt-4 max-w-4xl text-xl text-white/65 md:text-[34px] md:leading-[1.18]">
            Реальные релизы, которые мы собирали под ключ: от записи и продакшна до готового выхода.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-4 md:grid-cols-2">
          {tracks.map((track, index) => (
            <Reveal key={`${track.artists}-${track.title}`} delay={index * 40}>
              <CaseCard index={index} track={track} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
