import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AudioLines,
  ArrowUpRight,
  Captions,
  Clapperboard,
  Disc3,
  Megaphone,
  Mic2,
  Minus,
  Music2,
  Plus,
  Radio,
  Sparkles,
  SlidersHorizontal,
  Upload,
} from 'lucide-react'

import { LeadRequestModal } from '@/components/ui/LeadRequestModal'
import { Reveal } from '@/components/ui/Reveal'

type ServiceFlow = {
  input: string
  craft: string
  output: string
}

type ServiceItem = {
  title: string
  description: string
  icon: typeof Music2
  pulse: string
  outcomes: [string, string, string]
  flow: ServiceFlow
}

const services: ServiceItem[] = [
  {
    title: 'Создание трека под ключ',
    description:
      'От брифа и идеи до финального мастера: формируем трек, который готов к релизу и работает на образ артиста. Продумываем драматургию, динамику и настроение каждой части, чтобы композиция держала внимание с первых секунд до финала. На выходе ты получаешь цельный материал с понятной творческой концепцией и коммерческим потенциалом.',
    icon: Music2,
    pulse: 'Идея -> готовый релизный трек',
    outcomes: ['Концепция и драматургия', 'Полный продакшн', 'Master-ready материал'],
    flow: {
      input: 'Бриф, референсы и образ артиста',
      craft: 'Собираем композицию, аранжировку и эмоциональную арку',
      output: 'Цельный трек, который уже готов к следующему этапу запуска',
    },
  },
  {
    title: 'Битмейкинг и аранжировка',
    description:
      'Собираем продакшн под твой стиль, находим нужную энергетику и делаем аранжировку, которая цепляет с первых секунд. Подбираем тембры, ритмический рисунок и переходы так, чтобы трек звучал современно и узнаваемо именно для твоего проекта. В результате получаешь плотную музыкальную основу, на которой вокал раскрывается максимально выигрышно.',
    icon: Disc3,
    pulse: 'Грув, форма и характер трека',
    outcomes: ['Сильный бит', 'Рабочая аранжировка', 'Плотная основа под вокал'],
    flow: {
      input: 'Жанр, настроение и желаемая энергетика',
      craft: 'Выстраиваем грув, тембры, переходы и драматургию частей',
      output: 'Современный продакшн, который держит внимание и качает',
    },
  },
  {
    title: 'Запись вокала в студии',
    description:
      'Записываем вокал в комфортной студийной среде, отбираем лучшие тейки и сохраняем живую подачу артиста. Помогаем по подаче, интонациям и акцентам прямо во время сессии, чтобы сразу двигаться к сильному результату без лишних дублей. После записи получаешь чисто организованный материал, готовый к следующему этапу продакшна.',
    icon: Mic2,
    pulse: 'Комфортная сессия без лишних дублей',
    outcomes: ['Контроль подачи', 'Отбор сильных тейков', 'Подготовленный вокальный материал'],
    flow: {
      input: 'Текст, демо и задача по эмоциональной подаче',
      craft: 'Записываем, направляем и сразу отсеиваем слабые дубли',
      output: 'Чистый вокальный пакет, готовый к сведению и дальнейшей сборке',
    },
  },
  {
    title: 'Сведение и мастеринг',
    description:
      'Выводим материал на коммерческий уровень: плотный, прозрачный и уверенный звук для всех площадок. Выстраиваем баланс, пространство и ударность так, чтобы трек одинаково хорошо звучал в наушниках, машине, клубе и на стриминге. Финальный мастер готовим под актуальные требования платформ и жанровые стандарты.',
    icon: SlidersHorizontal,
    pulse: 'Контроль громкости, баланса и масштаба',
    outcomes: ['Читаемый микс', 'Платформенный мастер', 'Проверка на разных системах'],
    flow: {
      input: 'Сессия, стемы и задача по итоговому звучанию',
      craft: 'Собираем баланс, пространство, ударность и финальную громкость',
      output: 'Коммерчески уверенный трек для стриминга, клипа и лайва',
    },
  },
  {
    title: 'Саунд-дизайн и FX',
    description:
      'Добавляем детали, текстуры и атмосферу, чтобы трек звучал глубже и выделялся среди конкурентов. Создаем фирменные звуковые элементы, которые усиливают твой стиль и делают материал более кинематографичным и объемным. Благодаря точечным FX-решениям трек получает дополнительную эмоцию и запоминающийся характер.',
    icon: Sparkles,
    pulse: 'Детали, которые делают звук своим',
    outcomes: ['Фирменные FX', 'Текстуры и атмосфера', 'Более кинематографичный саунд'],
    flow: {
      input: 'База трека и точки, где не хватает характера',
      craft: 'Добавляем переходы, текстуры и фирменные sonic-акценты',
      output: 'Материал звучит глубже, дороже и заметнее среди аналогов',
    },
  },
  {
    title: 'Написание hooks и topline',
    description:
      'Помогаем собрать мелодику и запоминающийся рефрен, который легко ложится в формат стриминга и соцсетей. Работаем над структурой фраз, ритмом и музыкальной логикой так, чтобы припев сразу считывался и оставался в памяти. В итоге ты получаешь сильный hook, который работает и в полном треке, и в коротких вертикальных форматах.',
    icon: Captions,
    pulse: 'Фраза, которая остается в голове',
    outcomes: ['Сильный hook', 'Рабочий topline', 'Формат под стриминг и short-form'],
    flow: {
      input: 'Настроение песни, тема и желаемый референс по мелодике',
      craft: 'Собираем рефрен, ритм фраз и музыкальную логику припева',
      output: 'Запоминающаяся мелодия, которую легко считывает аудитория',
    },
  },
  {
    title: 'Музыкальная концепция',
    description:
      'Формируем цельную звуковую идентичность и стратегию развития, чтобы каждый релиз усиливал узнаваемость. Определяем вектор звучания, настроение, референсы и рамки эксперимента, чтобы бренд артиста оставался цельным от трека к треку. Это помогает строить долгую карьерную линию, а не выпускать случайные разрозненные релизы.',
    icon: AudioLines,
    pulse: 'Не один трек, а вся звуковая линия артиста',
    outcomes: ['Вектор звучания', 'Система референсов', 'Цельная музыкальная айдентика'],
    flow: {
      input: 'Текущая точка артиста, амбиция и среда конкурентов',
      craft: 'Определяем sonic-DNA, рамки эксперимента и эволюцию релизов',
      output: 'Узнаваемая музыкальная система вместо разрозненных выпусков',
    },
  },
  {
    title: 'Подготовка релиз-пакета',
    description:
      'Собираем все материалы для релиза: метаданные, мастер, обложки и контент для корректного запуска кампании. Проверяем техническую корректность файлов и логику публикации, чтобы релиз вышел без сбоев и задержек. Подготавливаем структуру контента так, чтобы старт был организованным и управляемым по всем каналам.',
    icon: Upload,
    pulse: 'Все файлы и смыслы в одном пакете',
    outcomes: ['Мастер и метаданные', 'Контент для запуска', 'Техничный пакет без ошибок'],
    flow: {
      input: 'Готовый трек, визуалы и дата выхода',
      craft: 'Собираем материалы, проверяем формат и логику публикации',
      output: 'Релиз-пакет, который можно спокойно отдавать в запуск',
    },
  },
  {
    title: 'Дистрибьюция на площадки',
    description:
      'Организуем публикацию треков на цифровых сервисах и следим за корректным выходом релиза по всем каналам. Контролируем сроки, карточки релиза и отображение материалов на ключевых площадках, чтобы запуск прошел синхронно и без потерь. После релиза помогаем быстро реагировать на правки и обновления, если они нужны.',
    icon: Radio,
    pulse: 'Синхронный выход без технических потерь',
    outcomes: ['Подача на площадки', 'Контроль карточек релиза', 'Реакция на правки после выхода'],
    flow: {
      input: 'Финальный релиз-пакет и дата публикации',
      craft: 'Проверяем подачу, витрины, сроки и отображение на сервисах',
      output: 'Релиз появляется корректно и одновременно на ключевых платформах',
    },
  },
  {
    title: 'Видео-сниппеты и reels',
    description:
      'Создаем короткий видео-контент под запуск трека: цепляющие клипы для TikTok, Reels и Shorts. Продумываем сценарии, визуальные хуки и монтажные акценты так, чтобы ролики удерживали внимание и собирали досмотры. Делаем набор форматов под разные площадки, чтобы релиз стабильно получал охват.',
    icon: Clapperboard,
    pulse: 'Контент, который цепляет за первые секунды',
    outcomes: ['Сценарии и хуки', 'Монтаж под вертикаль', 'Набор роликов под запуск'],
    flow: {
      input: 'Трек, визуальный вайб и задачи по охвату',
      craft: 'Собираем хук, сценарий и монтажный ритм под соцсети',
      output: 'Пакет коротких видео, который работает на досмотры и рост',
    },
  },
  {
    title: 'Съемка клипа и live-сессий',
    description:
      'Продюсируем видеоформаты от live-performance до клипа, чтобы визуал усиливал музыкальный материал. Закрываем процесс от идеи и препродакшна до съемки и поста, сохраняя единый художественный стиль проекта. В итоге ты получаешь визуальный контент, который помогает треку расти и расширяет аудиторию.',
    icon: Clapperboard,
    pulse: 'Визуал, который усиливает музыку',
    outcomes: ['Концепт и препрод', 'Съемка и пост', 'Единый художественный язык'],
    flow: {
      input: 'Трек, задача по формату и визуальный референс',
      craft: 'Разрабатываем концепт, проводим съемку и доводим пост',
      output: 'Клип или live-сессия, которые расширяют ценность релиза',
    },
  },
  {
    title: 'Продвижение релиза',
    description:
      'Выстраиваем посев, креативы и стратегию охвата, чтобы трек дошел до нужной аудитории и дал рост метрик. Формируем контент-план, тестируем гипотезы и усиливаем рабочие связки по мере выхода кампании. Это позволяет не просто выпустить музыку, а получить измеримый результат в прослушиваниях, вовлечении и подписках.',
    icon: Megaphone,
    pulse: 'Релиз не просто выходит, а начинает работать',
    outcomes: ['Стратегия охвата', 'Креативы и посев', 'Рост прослушиваний и вовлечения'],
    flow: {
      input: 'Релиз, целевая аудитория и KPI кампании',
      craft: 'Собираем контент-план, тестируем гипотезы и усиливаем рабочие связки',
      output: 'Запуск с измеримым результатом, а не формальной публикацией',
    },
  },
]

const panelMotion = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
}

function ServiceAccordionItem({
  index,
  isActive,
  onToggle,
  service,
}: {
  index: number
  isActive: boolean
  onToggle: () => void
  service: ServiceItem
}) {
  const Icon = service.icon

  return (
    <motion.article
      layout
      className={`group relative overflow-hidden rounded-[2rem] border transition-[border-color,background-color,box-shadow] duration-500 ${
        isActive
          ? 'border-white/18 bg-white/[0.045] shadow-[0_28px_84px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.08)]'
          : 'border-white/10 bg-white/[0.02] shadow-[0_18px_48px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-white/16 hover:bg-white/[0.032]'
      }`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute inset-0 bg-[radial-gradient(circle_at_14%_14%,rgba(255,255,255,0.08),transparent_20%),radial-gradient(circle_at_82%_26%,rgba(255,255,255,0.05),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0)_40%,rgba(0,0,0,0.22))] transition-opacity duration-500 ${
            isActive ? 'opacity-100' : 'opacity-60'
          }`}
        />
        <div
          className={`absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent transition-opacity duration-500 ${
            isActive ? 'opacity-100' : 'opacity-45'
          }`}
        />
      </div>

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isActive}
        aria-controls={`service-panel-${index}`}
        className="relative flex w-full items-center gap-4 px-5 py-5 text-left md:px-7 md:py-6"
      >
        <div
          className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
            isActive
              ? 'border-white/28 bg-white/[0.06] text-white shadow-[0_0_28px_rgba(255,255,255,0.06)]'
              : 'border-white/14 bg-white/[0.02] text-white/84'
          }`}
        >
          <Icon className="h-[18px] w-[18px]" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="mb-2 hidden text-[10px] uppercase tracking-[0.24em] text-white/34 md:block md:text-[11px]">
            {service.pulse}
          </p>
          <div className="flex min-w-0 items-center gap-3">
            <h3 className="min-w-0 font-sans text-[1.05rem] font-medium leading-tight tracking-tight text-white md:text-[1.3rem]">
              {service.title}
            </h3>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3 md:gap-5">
          <span className="text-sm text-white/34 md:text-[1.05rem]">{String(index + 1).padStart(2, '0')}</span>
          <span
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-500 ${
              isActive
                ? 'border-white/18 bg-white text-black'
                : 'border-white/12 bg-white/[0.03] text-white/82 group-hover:border-white/18'
            }`}
          >
            {isActive ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isActive ? (
          <motion.div
            key="panel"
            id={`service-panel-${index}`}
            {...panelMotion}
            className="overflow-hidden"
          >
            <div className="relative border-t border-white/10 px-5 pb-5 pt-5 md:px-7 md:pb-7 md:pt-6">
              <div>
                <p className="max-w-3xl text-sm leading-7 text-white/72 md:text-[15px]">
                  {service.description}
                </p>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  )
}

export function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false)

  return (
    <section id="services" className="relative scroll-mt-28 overflow-hidden bg-black px-4 pb-28 pt-[7.5rem] text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.075),transparent_58%)]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal className="relative mx-auto overflow-hidden rounded-[2rem] border border-white/10 bg-[#080808] px-5 py-12 text-center shadow-[0_32px_110px_rgba(0,0,0,0.52),inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-40px_90px_rgba(0,0,0,0.45)] md:px-12 md:py-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-12%,rgba(255,255,255,0.2),transparent_34%),radial-gradient(circle_at_82%_28%,rgba(162,178,224,0.12),transparent_24%),radial-gradient(circle_at_14%_78%,rgba(255,255,255,0.07),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.012)_48%,rgba(0,0,0,0.7)_100%)]" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          <div className="pointer-events-none absolute left-1/2 top-8 h-28 w-[42rem] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent blur-2xl" />

          <div className="relative z-10 mx-auto max-w-4xl">
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
              Комплексное сопровождение клиента по всем направлениям
            </h2>
            <button
              type="button"
              onClick={() => setIsRequestModalOpen(true)}
              className="hero-chrome-button mx-auto mt-7 inline-flex w-full max-w-[18rem] items-center justify-center gap-2 rounded-[8px] px-7 py-3.5 text-sm font-semibold text-black"
            >
              Оставить заявку
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </Reveal>

        <div className="mt-8 space-y-3">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 35}>
              <ServiceAccordionItem
                index={index}
                service={service}
                isActive={activeIndex === index}
                onToggle={() => setActiveIndex((current) => (current === index ? null : index))}
              />
            </Reveal>
          ))}
        </div>
      </div>

      <LeadRequestModal
        isOpen={isRequestModalOpen}
        serviceTitle="Комплексное сопровождение клиента по всем направлениям"
        onClose={() => setIsRequestModalOpen(false)}
      />
    </section>
  )
}
