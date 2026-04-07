import { Clapperboard, Film } from 'lucide-react'

import { Reveal } from '@/components/ui/Reveal'
import { withBaseUrl } from '@/lib/withBaseUrl'

type FilmWork = {
  title: string
  subtitle: string
  year: string
  poster: string
}

const films: FilmWork[] = [
  {
    title: 'Нейро Батя',
    subtitle: 'Полнометражный фильм',
    year: '2025',
    poster: withBaseUrl('film-posters/za-slova-otvechayu.jpg'),
  },
  {
    title: 'Юра дворник',
    subtitle: 'Полнометражный фильм',
    year: '2023',
    poster: withBaseUrl('film-posters/neyro-batya.jpg'),
  },
  {
    title: 'На деревню дедушке',
    subtitle: 'Полнометражный фильм',
    year: '2025',
    poster: withBaseUrl('film-posters/yura-dvornik.jpg'),
  },
  {
    title: 'За слова отвечаю',
    subtitle: 'Полнометражный фильм',
    year: '2024',
    poster: withBaseUrl('film-posters/na-derevnyu-dedushke.jpg'),
  },
]

function FilmCard({ index, film }: { index: number; film: FilmWork }) {
  return (
    <li>
      <article className="group relative flex min-h-[460px] h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 transition duration-500 hover:-translate-y-1 hover:border-white/24 hover:bg-white/[0.05] md:p-7">
        <div className="pointer-events-none absolute inset-0">
          <img
            src={film.poster}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-top opacity-[0.32] saturate-[1.02] brightness-[0.82] transition duration-500 group-hover:scale-[1.04] group-hover:opacity-[0.38]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_28%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.32),rgba(0,0,0,0.58)_32%,rgba(0,0,0,0.92))]" />
        </div>

        <div className="relative z-10 flex items-start justify-between gap-4">
          <div className="flex items-center">
            <span className="text-[12px] text-white/28">{String(index + 1).padStart(2, '0')}</span>
          </div>
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-white/70 transition duration-300 group-hover:border-white/34 group-hover:bg-white group-hover:text-black">
            <Film className="h-4 w-4" />
          </span>
        </div>

        <div className="relative z-10 mt-16">
          <p className="max-w-[24rem] text-sm leading-6 text-white/55 md:text-[15px]">
            {film.subtitle}
          </p>
          <h3 className="artist-name-chrome mt-5 max-w-[20rem] text-[2rem] font-semibold uppercase tracking-[-0.04em] text-white md:text-[2.5rem] md:leading-[0.95]">
            {film.title}
          </h3>
        </div>

        <div className="relative z-10 mt-10 flex items-end justify-between gap-4 border-t border-white/10 pt-5">
          <div>
            <p className="text-base text-white/78">{film.year}</p>
          </div>
          <div className="inline-flex items-center gap-2 text-sm text-white/42">
            <Clapperboard className="h-4 w-4" />
            Кино
          </div>
        </div>
      </article>
    </li>
  )
}

export function FilmWorksSection() {
  return (
    <section id="films" className="scroll-mt-28 bg-black px-4 pb-28 pt-10 text-white">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="text-xs tracking-[0.16em] text-white/45">SELECTED FILMS</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
            Музыкальный продакшн кино и рекламы
          </h2>
          <div className="mx-auto mt-5 max-w-3xl space-y-3 text-base leading-7 text-white/64 md:text-lg">
            <p>Подбор и лицензирование существующих треков.</p>
            <p>Создание музыки для полного метра, саундтреки и джинглы.</p>
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">Наши работы:</h3>
        </Reveal>

        <ul className="mt-5 grid gap-4 md:grid-cols-2">
          {films.map((film, index) => (
            <Reveal key={film.title} delay={index * 40}>
              <FilmCard index={index} film={film} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
