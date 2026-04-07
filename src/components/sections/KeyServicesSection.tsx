import { useState } from 'react'
import { ArrowUpRight, CheckCircle2, Mic2, SlidersHorizontal, Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { LeadRequestModal } from '@/components/ui/LeadRequestModal'
import * as PricingCard from '@/components/ui/pricing-card'
import { Reveal } from '@/components/ui/Reveal'

type KeyService = {
  icon: typeof Mic2
  title: string
  badge: string
  accent: string
  themeClass: string
  subtitle: string
  description: string
  features: string[]
}

const keyServices: KeyService[] = [
  {
    icon: Sparkles,
    title: 'Создание трека с 0',
    badge: 'Full cycle',
    accent: '01',
    themeClass:
      '[--tariff-top:rgba(24,24,28,0.99)] [--tariff-mid:rgba(15,15,18,0.992)] [--tariff-base:rgba(6,6,8,1)] [--tariff-panel-top:rgba(44,44,50,0.97)] [--tariff-panel-bottom:rgba(16,16,20,0.99)] [--tariff-glow:rgba(255,255,255,0.08)] [--tariff-glow-soft:rgba(255,255,255,0.05)] [--tariff-edge:rgba(255,255,255,0.12)]',
    subtitle: 'Аранжировка, текст, продакшн',
    description:
      'Запускаем трек с нуля: от идеи, референса или голосовой заметки до готовой музыкальной основы с текстом, структурой и характером артиста.',
    features: [
      'Аранжировка под голос, жанр и задачу релиза',
      'Текст, топлайн и структура куплетов',
      'Продакшн, саунд-палитра и музыкальная драматургия',
      'Трек, готовый к записи и финальной доводке',
    ],
  },
  {
    icon: Mic2,
    title: 'Запись',
    badge: 'Session',
    accent: '02',
    themeClass:
      '[--tariff-top:rgba(24,24,28,0.99)] [--tariff-mid:rgba(15,15,18,0.992)] [--tariff-base:rgba(6,6,8,1)] [--tariff-panel-top:rgba(44,44,50,0.97)] [--tariff-panel-bottom:rgba(16,16,20,0.99)] [--tariff-glow:rgba(255,255,255,0.08)] [--tariff-glow-soft:rgba(255,255,255,0.05)] [--tariff-edge:rgba(255,255,255,0.12)]',
    subtitle: 'Комфортная сессия и сильные тейки',
    description:
      'Организуем запись так, чтобы артист сосредоточился на подаче: помогаем найти нужную интонацию, собрать сильные тейки и сохранить живую энергию исполнения.',
    features: [
      'Запись вокала в студийной атмосфере',
      'Работа с подачей, дикцией и эмоциональными акцентами',
      'Отбор удачных дублей и тейков',
      'Подготовка материала к дальнейшему продакшну',
    ],
  },
  {
    icon: SlidersHorizontal,
    title: 'Сведение / мастеринг',
    badge: 'Mix + Final',
    accent: '03',
    themeClass:
      '[--tariff-top:rgba(24,24,28,0.99)] [--tariff-mid:rgba(15,15,18,0.992)] [--tariff-base:rgba(6,6,8,1)] [--tariff-panel-top:rgba(44,44,50,0.97)] [--tariff-panel-bottom:rgba(16,16,20,0.99)] [--tariff-glow:rgba(255,255,255,0.08)] [--tariff-glow-soft:rgba(255,255,255,0.05)] [--tariff-edge:rgba(255,255,255,0.12)]',
    subtitle: 'Финальный звук под релиз',
    description:
      'Собираем записанный материал в цельный релизный звук: балансируем вокал, музыку, пространство и громкость, чтобы трек уверенно работал на площадках.',
    features: [
      'Баланс вокала, бита и музыкальных слоёв',
      'Чистка артефактов, пространство и динамика',
      'Финальная тональная и громкостная доводка',
      'Мастер-файл, готовый к цифровому релизу',
    ],
  },
]

export function KeyServicesSection() {
  const [selectedService, setSelectedService] = useState<KeyService | null>(null)

  return (
    <section className="bg-black px-4 pb-28 pt-10 text-white">
      <div className="mx-auto max-w-6xl">
        <Reveal className="border-t border-white/10 pt-8 text-center">
          <p className="text-xs tracking-[0.18em] text-white/40">KEY SERVICES</p>
          <div className="mx-auto mt-3 flex max-w-4xl flex-col items-center gap-4">
            <div className="max-w-3xl">
              <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Ключевые услуги</h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/58 md:text-base">
                Главная услуга — трек под ключ. Мы закрываем путь от первой идеи и записи до финального
                звучания, готового к релизу.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:auto-rows-fr lg:grid-cols-3">
          {keyServices.map((service, index) => {
            const Icon = service.icon

            return (
              <Reveal key={service.title} delay={index * 70} className="flex h-full">
                <PricingCard.Card className="flex h-full w-full border-transparent bg-transparent p-0.5 shadow-none">
                  <div className={`premium-tariff-card group flex h-full w-full flex-1 flex-col rounded-[1.75rem] px-1.5 pb-[10px] pt-1.5 ${service.themeClass}`}>
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

                      <PricingCard.Price className="mb-4 flex-col items-start gap-2">
                        <PricingCard.MainPrice className="premium-tariff-title chrome-text-animated text-xl md:text-2xl">
                          {service.title}
                        </PricingCard.MainPrice>
                        <PricingCard.Period className="pb-0 text-sm text-white/52">
                          {service.subtitle}
                        </PricingCard.Period>
                      </PricingCard.Price>
                    </PricingCard.Header>

                    <PricingCard.Body className="flex flex-1 flex-col px-5 pb-0 pt-4 space-y-0">
                      <div className="space-y-5">
                        <PricingCard.Description className="premium-tariff-copy max-w-sm text-sm leading-6 text-white/50">
                          {service.description}
                        </PricingCard.Description>

                        <PricingCard.List>
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

                      <div className="premium-tariff-cta mt-auto space-y-4 pb-0 pt-8">
                        <PricingCard.Separator className="premium-tariff-separator text-white/30" />

                        <Button
                          type="button"
                          className="premium-tariff-button h-12 w-full rounded-full border border-white/14 bg-white text-black shadow-none transition hover:bg-white/90"
                          onClick={() => setSelectedService(service)}
                        >
                          Записаться
                          <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </PricingCard.Body>
                  </div>
                </PricingCard.Card>
              </Reveal>
            )
          })}
        </div>
      </div>

      <LeadRequestModal
        isOpen={Boolean(selectedService)}
        serviceTitle={selectedService?.title ?? ''}
        onClose={() => setSelectedService(null)}
      />
    </section>
  )
}
