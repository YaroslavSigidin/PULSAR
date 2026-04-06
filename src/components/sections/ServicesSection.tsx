import { useEffect, useRef, useState } from 'react'
import {
  ArrowUpRight,
  AudioLines,
  Captions,
  Clapperboard,
  Disc3,
  Megaphone,
  Mic2,
  Music2,
  Radio,
  Sparkles,
  SlidersHorizontal,
  Upload,
  X,
} from 'lucide-react'

import { Reveal } from '@/components/ui/Reveal'

type ServiceItem = {
  title: string
  description: string
  icon: typeof Music2
}

const services: ServiceItem[] = [
  {
    title: 'Создание трека под ключ',
    description:
      'От брифа и идеи до финального мастера: формируем трек, который готов к релизу и работает на образ артиста. Продумываем драматургию, динамику и настроение каждой части, чтобы композиция держала внимание с первых секунд до финала. На выходе ты получаешь цельный материал с понятной творческой концепцией и коммерческим потенциалом.',
    icon: Music2,
  },
  {
    title: 'Битмейкинг и аранжировка',
    description:
      'Собираем продакшн под твой стиль, находим нужную энергетику и делаем аранжировку, которая цепляет с первых секунд. Подбираем тембры, ритмический рисунок и переходы так, чтобы трек звучал современно и узнаваемо именно для твоего проекта. В результате получаешь плотную музыкальную основу, на которой вокал раскрывается максимально выигрышно.',
    icon: Disc3,
  },
  {
    title: 'Запись вокала в студии',
    description:
      'Записываем вокал в комфортной студийной среде, отбираем лучшие тейки и сохраняем живую подачу артиста. Помогаем по подаче, интонациям и акцентам прямо во время сессии, чтобы сразу двигаться к сильному результату без лишних дублей. После записи получаешь чисто организованный материал, готовый к следующему этапу продакшна.',
    icon: Mic2,
  },
  {
    title: 'Сведение и мастеринг',
    description:
      'Выводим материал на коммерческий уровень: плотный, прозрачный и уверенный звук для всех площадок. Выстраиваем баланс, пространство и ударность так, чтобы трек одинаково хорошо звучал в наушниках, машине, клубе и на стриминге. Финальный мастер готовим под актуальные требования платформ и жанровые стандарты.',
    icon: SlidersHorizontal,
  },
  {
    title: 'Саунд-дизайн и FX',
    description:
      'Добавляем детали, текстуры и атмосферу, чтобы трек звучал глубже и выделялся среди конкурентов. Создаем фирменные звуковые элементы, которые усиливают твой стиль и делают материал более кинематографичным и объемным. Благодаря точечным FX-решениям трек получает дополнительную эмоцию и запоминающийся характер.',
    icon: Sparkles,
  },
  {
    title: 'Написание hooks и topline',
    description:
      'Помогаем собрать мелодику и запоминающийся рефрен, который легко ложится в формат стриминга и соцсетей. Работаем над структурой фраз, ритмом и музыкальной логикой так, чтобы припев сразу считывался и оставался в памяти. В итоге ты получаешь сильный hook, который работает и в полном треке, и в коротких вертикальных форматах.',
    icon: Captions,
  },
  {
    title: 'Музыкальная концепция',
    description:
      'Формируем цельную звуковую идентичность и стратегию развития, чтобы каждый релиз усиливал узнаваемость. Определяем вектор звучания, настроение, референсы и рамки эксперимента, чтобы бренд артиста оставался цельным от трека к треку. Это помогает строить долгую карьерную линию, а не выпускать случайные разрозненные релизы.',
    icon: AudioLines,
  },
  {
    title: 'Подготовка релиз-пакета',
    description:
      'Собираем все материалы для релиза: метаданные, мастер, обложки и контент для корректного запуска кампании. Проверяем техническую корректность файлов и логику публикации, чтобы релиз вышел без сбоев и задержек. Подготавливаем структуру контента так, чтобы старт был организованным и управляемым по всем каналам.',
    icon: Upload,
  },
  {
    title: 'Дистрибьюция на площадки',
    description:
      'Организуем публикацию треков на цифровых сервисах и следим за корректным выходом релиза по всем каналам. Контролируем сроки, карточки релиза и отображение материалов на ключевых площадках, чтобы запуск прошел синхронно и без потерь. После релиза помогаем быстро реагировать на правки и обновления, если они нужны.',
    icon: Radio,
  },
  {
    title: 'Видео-сниппеты и reels',
    description:
      'Создаем короткий видео-контент под запуск трека: цепляющие клипы для TikTok, Reels и Shorts. Продумываем сценарии, визуальные хуки и монтажные акценты так, чтобы ролики удерживали внимание и собирали досмотры. Делаем набор форматов под разные площадки, чтобы релиз стабильно получал охват.',
    icon: Clapperboard,
  },
  {
    title: 'Съемка клипа и live-сессий',
    description:
      'Продюсируем видеоформаты от live-performance до клипа, чтобы визуал усиливал музыкальный материал. Закрываем процесс от идеи и препродакшна до съемки и поста, сохраняя единый художественный стиль проекта. В итоге ты получаешь визуальный контент, который помогает треку расти и расширяет аудиторию.',
    icon: Clapperboard,
  },
  {
    title: 'Продвижение релиза',
    description:
      'Выстраиваем посев, креативы и стратегию охвата, чтобы трек дошел до нужной аудитории и дал рост метрик. Формируем контент-план, тестируем гипотезы и усиливаем рабочие связки по мере выхода кампании. Это позволяет не просто выпустить музыку, а получить измеримый результат в прослушиваниях, вовлечении и подписках.',
    icon: Megaphone,
  },
]

export function ServicesSection() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLeadFormVisible, setIsLeadFormVisible] = useState(false)
  const closeTimerRef = useRef<number | null>(null)

  const openModal = (service: ServiceItem) => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setSelectedService(service)
    setIsLeadFormVisible(false)
    window.requestAnimationFrame(() => setIsModalOpen(true))
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setIsLeadFormVisible(false)
    closeTimerRef.current = window.setTimeout(() => {
      setSelectedService(null)
      closeTimerRef.current = null
    }, 620)
  }

  useEffect(() => {
    if (!selectedService || !isModalOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal()
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [selectedService, isModalOpen])

  useEffect(
    () => () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current)
      document.body.style.overflow = ''
    },
    [],
  )

  return (
    <section id="services" className="scroll-mt-28 bg-black px-4 pb-28 pt-10 text-white">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Все услги</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/65 md:text-base">
            12 направлений, которые закрывают весь цикл артиста: от первой идеи до выхода трека и роста
            аудитории.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon

            return (
              <Reveal key={service.title} delay={index * 45}>
                <button
                  type="button"
                  onClick={() => openModal(service)}
                  className="group liquid-glass flex min-h-[110px] w-full items-center justify-between gap-4 rounded-2xl border border-white/24 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] px-5 py-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_0_1px_rgba(255,255,255,0.08)] transition-all duration-500 hover:border-white/38 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_0_0_1px_rgba(255,255,255,0.14),0_18px_40px_rgba(0,0,0,0.22)]"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/22 bg-white/[0.015] text-white/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="min-w-0 font-sans text-sm font-medium leading-tight tracking-tight text-white md:text-base">
                      {service.title}
                    </h3>
                  </div>

                  <div className="relative h-6 w-6 shrink-0">
                    <span className="absolute inset-0 text-xs text-white/45 transition-all duration-300 group-hover:translate-y-1 group-hover:opacity-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="absolute inset-0 inline-flex translate-y-1 items-center justify-center rounded-full bg-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight className="h-3.5 w-3.5 text-black" />
                    </span>
                  </div>
                </button>
              </Reveal>
            )
          })}
        </div>
      </div>

      {selectedService ? (
        <div
          className={`fixed inset-0 z-50 flex items-end justify-center px-4 pb-8 pt-10 backdrop-blur-sm transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:items-center ${
            isModalOpen ? 'bg-black/75' : 'bg-black/0'
          }`}
          onClick={closeModal}
          role="button"
          tabIndex={-1}
        >
          <article
            className={`liquid-glass relative w-full max-w-xl rounded-3xl p-7 transition-all duration-[820ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform md:p-8 ${
              isModalOpen
                ? 'translate-y-0 scale-100 opacity-100'
                : 'translate-y-[52vh] scale-[0.97] opacity-0'
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:text-white"
              aria-label="Закрыть"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/90">
              <selectedService.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 pr-8 text-2xl font-semibold tracking-tight">{selectedService.title}</h3>
            <p className="mt-4 text-base leading-7 text-white/75 md:text-base">
              {selectedService.description}
            </p>

            <div className="mt-7">
              <div
                className={`relative overflow-hidden rounded-2xl transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isLeadFormVisible ? 'max-h-[320px]' : 'max-h-14'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setIsLeadFormVisible(true)}
                  className={`group absolute inset-0 z-10 flex w-full items-center justify-between rounded-2xl border border-white/80 bg-white/[0.01] px-5 py-3 text-sm font-medium text-white transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isLeadFormVisible
                      ? 'translate-y-3 scale-[0.98] opacity-0 pointer-events-none'
                      : 'translate-y-0 scale-100 opacity-100'
                  }`}
                >
                  <span>Оставить заявку</span>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/35 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </button>

                <form
                  onSubmit={(event) => event.preventDefault()}
                  className={`space-y-2 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isLeadFormVisible
                      ? 'translate-y-0 opacity-100'
                      : 'pointer-events-none translate-y-2 opacity-0'
                  }`}
                >
                  <input
                    type="tel"
                    placeholder="Номер телефона"
                    className={`w-full rounded-xl border border-white/25 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/45 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus:border-white/50 ${
                      isLeadFormVisible ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="Telegram"
                    className={`w-full rounded-xl border border-white/25 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/45 transition-all duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus:border-white/50 ${
                      isLeadFormVisible ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="Имя"
                    className={`w-full rounded-xl border border-white/25 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/45 transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus:border-white/50 ${
                      isLeadFormVisible ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
                    }`}
                  />
                  <button
                    type="submit"
                    className={`w-full rounded-xl bg-gradient-to-b from-white to-zinc-300 px-4 py-3 text-sm font-semibold text-black transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-90 ${
                      isLeadFormVisible ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
                    }`}
                  >
                    Отправить
                  </button>
                </form>
              </div>
            </div>
          </article>
        </div>
      ) : null}
    </section>
  )
}
