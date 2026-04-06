type ProductionCardProps = {
  label: string
  title: string
  description: string
  items: string[]
  chips: string[]
}

import { Reveal } from '@/components/ui/Reveal'

const cards: ProductionCardProps[] = [
  {
    label: 'САУНД',
    title: 'Саунд продакшн',
    description:
      'Берём звук артиста в работу целиком: от первого драфта и записи до финального мастера, который готов к релизу и уверенно звучит на площадках.',
    items: [
      'Создание и продюсирование трека',
      'Аранжировка и битмейкинг',
      'Запись вокала и продюсирование сессии',
      'Сведение и мастеринг',
    ],
    chips: ['Запись', 'Сведение', 'Мастеринг'],
  },
]

function ProductionCard({ label, title, description, items, chips }: ProductionCardProps) {
  return (
    <article className="group liquid-glass relative overflow-hidden rounded-3xl p-6 md:p-8">
      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs tracking-[0.16em] text-white/45">{label}</p>
          <div className="flex items-center gap-2">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/15 px-2.5 py-1 text-[11px] text-white/55"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        <h3 className="mt-4 text-2xl font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-1">
          {title}
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-7 text-white/65">{description}</p>

        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {items.map((item, idx) => (
            <li
              key={item}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5 text-sm text-white/78"
            >
              <span className="text-xs text-white/45">{String(idx + 1).padStart(2, '0')}</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <a
          href="#lead-form"
          className="mt-6 inline-flex items-center rounded-full border border-white/35 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black"
        >
          Обсудить саунд
        </a>
      </div>
    </article>
  )
}

export function SoundVideoProductionSection() {
  return (
    <section className="bg-black px-4 pb-28 pt-10 text-white">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
          <div>
            <p className="text-xs tracking-[0.16em] text-white/45">KKB STUDIO</p>
            <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">Саунд продакшн</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-white/62 md:text-base">
            Полный саунд-цикл в одной студии: продакшн, запись, сведение и мастеринг без разрыва между этапами.
          </p>
        </Reveal>

        <div className="mx-auto mt-10 max-w-4xl grid gap-4">
          {cards.map((card, index) => (
            <Reveal key={card.label} delay={index * 80}>
              <ProductionCard {...card} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
