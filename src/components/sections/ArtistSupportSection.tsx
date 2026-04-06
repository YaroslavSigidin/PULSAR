import { Mic2, Music2, Rocket, SlidersHorizontal } from 'lucide-react'

import { Reveal } from '@/components/ui/Reveal'

const stages = [
  {
    title: '01. Идея',
    description:
      'Находим твой фирменный вектор: от музыкальной идеи и референсов до четкой стратегии релиза.',
    icon: Music2,
  },
  {
    title: '02. Продакшн',
    description:
      'Собираем сильный продакшн, пишем вокал в комфортной студийной атмосфере и оставляем только лучшие тейки.',
    icon: Mic2,
  },
  {
    title: '03. Сведение',
    description:
      'Полируем трек до плотного коммерческого звучания, чтобы он одинаково уверенно работал везде.',
    icon: SlidersHorizontal,
  },
  {
    title: '04. Продвижение',
    description:
      'Запускаем релиз как кампанию: дистрибьюция, контент и продвижение, чтобы музыка дошла до своей аудитории.',
    icon: Rocket,
  },
]

export function ArtistSupportSection() {
  return (
    <section className="bg-black px-4 pb-28 pt-14 text-white">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="text-center text-3xl font-semibold tracking-tight md:text-5xl">
            Сопровождаем наших артистов на всех этапах
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stages.map((stage) => {
            const Icon = stage.icon

            return (
              <Reveal key={stage.title} delay={stage.title.startsWith('0') ? Number(stage.title[1]) * 70 : 0}>
                <article className="group liquid-glass relative flex min-h-[320px] flex-col rounded-[2rem] border border-white/10 p-7 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-xs font-medium tracking-[0.08em] text-white/55">
                      {stage.title.split('. ')[0]}
                    </span>

                    <div className="inline-flex items-center rounded-full border border-white/14 bg-white/[0.04] p-3 text-white/85">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="mt-auto pt-12">
                    <h3 className="text-2xl font-semibold tracking-tight text-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1">
                      {stage.title.split('. ')[1]}
                    </h3>

                    <p className="mt-4 max-w-[26ch] text-sm leading-6 text-white/68 transition-colors duration-300 group-hover:text-white/78">
                      {stage.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
