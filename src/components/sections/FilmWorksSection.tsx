import { useState } from 'react'
import { ArrowUpRight, CheckCircle2, Clapperboard, Disc3, Film, Music2 } from 'lucide-react'

import { Reveal } from '@/components/ui/Reveal'
import { LeadRequestModal } from '@/components/ui/LeadRequestModal'
import * as PricingCard from '@/components/ui/pricing-card'
import { withBaseUrl } from '@/lib/withBaseUrl'

type FilmWork = {
  title: string
  subtitle: string
  year: string
  poster: string
}

type FilmService = {
  title: string
  subtitle: string
  description: string
  badge: string
  accent: string
  icon: typeof Music2
  features: string[]
}

const filmServiceTheme =
  '[--tariff-top:rgba(24,24,28,0.99)] [--tariff-mid:rgba(15,15,18,0.992)] [--tariff-base:rgba(6,6,8,1)] [--tariff-panel-top:rgba(44,44,50,0.97)] [--tariff-panel-bottom:rgba(16,16,20,0.99)] [--tariff-glow:rgba(255,255,255,0.08)] [--tariff-glow-soft:rgba(255,255,255,0.05)] [--tariff-edge:rgba(255,255,255,0.12)]'

const filmServices: FilmService[] = [
  {
    title: 'Подбор и лицензирование существующих треков',
    subtitle: 'Music supervision',
    description:
      'Находим музыку под сцену, настроение и бюджет проекта, проверяем права и помогаем пройти путь от шорт-листа до легального использования трека.',
    badge: 'License',
    accent: '01',
    icon: Disc3,
    features: ['Музыкальный ресерч под сцену', 'Проверка прав и условий', 'Подготовка трека к использованию'],
  },
  {
    title: 'Создание музыки для полного метра, саундтреки и джинглы',
    subtitle: 'Original score',
    description:
      'Создаем оригинальную музыку под монтаж, драматургию и бренд: от темы фильма и саундтрека до короткого узнаваемого джингла.',
    badge: 'Score',
    accent: '02',
    icon: Music2,
    features: ['Оригинальная музыка под проект', 'Саундтреки и темы', 'Джинглы и бренд-звучание'],
  },
]

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

function FilmServiceCard({ onRequest, service }: { onRequest: () => void; service: FilmService }) {
  const Icon = service.icon

  return (
    <PricingCard.Card className="flex h-full w-full border-transparent bg-transparent p-0.5 shadow-none">
      <div className={`premium-tariff-card group flex h-full w-full flex-1 flex-col rounded-[1.75rem] px-1.5 pb-[10px] pt-1.5 ${filmServiceTheme}`}>
        <PricingCard.Header
          glassEffect={false}
          className="premium-tariff-header mb-0 rounded-[1.5rem] p-5"
        >
          <PricingCard.Plan className="mb-10">
            <PricingCard.PlanName className="premium-tariff-meta text-white/66">
              <Icon aria-hidden="true" />
              <span>{service.accent}</span>
            </PricingCard.PlanName>
            <PricingCard.Badge className="premium-tariff-badge border-white/14 text-white/66">
              {service.badge}
            </PricingCard.Badge>
          </PricingCard.Plan>

          <PricingCard.Price className="mb-4 min-w-0 flex-col items-start gap-2">
            <PricingCard.MainPrice
              className="premium-tariff-title chrome-text-animated max-w-full break-words text-[clamp(1.2rem,2.733vw,2rem)] leading-[0.9] tracking-[0px] ![letter-spacing:0px] md:text-[clamp(1.333rem,1.7vw,1.7rem)] xl:text-[1.8rem]"
              style={{ letterSpacing: '0px' }}
            >
              {service.title}
            </PricingCard.MainPrice>
            <PricingCard.Period className="pb-0 text-sm text-white/50">
              {service.subtitle}
            </PricingCard.Period>
          </PricingCard.Price>
        </PricingCard.Header>

        <PricingCard.Body className="flex flex-1 flex-col px-5 pb-5 pt-4 space-y-0">
          <div>
            <PricingCard.Description className="premium-tariff-copy max-w-xl text-sm leading-6 text-white/50">
              {service.description}
            </PricingCard.Description>

            <PricingCard.List className="mt-6">
              {service.features.map((feature) => (
                <PricingCard.ListItem key={feature} className="premium-tariff-feature text-white/64">
                  <span className="mt-0.5">
                    <CheckCircle2 className="h-4 w-4 text-white/90" aria-hidden="true" />
                  </span>
                  <span>{feature}</span>
                </PricingCard.ListItem>
              ))}
            </PricingCard.List>
          </div>

          <div className="premium-tariff-cta mt-auto space-y-4 pt-8">
            <PricingCard.Separator className="premium-tariff-separator text-white/30" />

            <button
              type="button"
              onClick={onRequest}
              className="hero-chrome-button premium-tariff-button inline-flex h-12 w-full items-center justify-center gap-2 rounded-[8px] px-6 text-sm font-semibold text-black"
            >
              Оставить заявку
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </PricingCard.Body>
      </div>
    </PricingCard.Card>
  )
}

export function FilmWorksSection() {
  const [selectedService, setSelectedService] = useState<FilmService | null>(null)

  return (
    <section id="films" className="scroll-mt-28 bg-black px-4 pb-28 pt-10 text-white">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="text-xs tracking-[0.16em] text-white/45">SELECTED FILMS</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
            Музыкальный продакшн кино и рекламы
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {filmServices.map((service, index) => (
            <Reveal key={service.title} delay={index * 70} className="flex h-full">
              <FilmServiceCard service={service} onRequest={() => setSelectedService(service)} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
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

      <LeadRequestModal
        isOpen={Boolean(selectedService)}
        serviceTitle={selectedService?.title ?? ''}
        onClose={() => setSelectedService(null)}
      />
    </section>
  )
}
