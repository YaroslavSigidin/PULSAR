import { useState } from 'react'

import { Reveal } from '@/components/ui/Reveal'
import { formatPhone } from '@/lib/formatPhone'

export function LeadCaptureSection() {
  const [phone, setPhone] = useState('+7')
  const inputClassName =
    'h-12 rounded-xl border border-white/12 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-white/28 transition-colors focus:border-white/28 focus:bg-white/[0.06]'

  return (
    <section id="lead-form" className="scroll-mt-28 relative overflow-hidden bg-black px-4 pb-[2px] pt-8 text-white">
      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal className="relative overflow-hidden rounded-[28px] border border-white/12 bg-[#080808] px-8 py-8 shadow-[0_32px_120px_rgba(0,0,0,0.52),inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-30px_80px_rgba(0,0,0,0.45)] md:px-10 md:py-9">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(255,255,255,0.22),transparent_34%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(110,130,255,0.08),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.09),transparent_22%),radial-gradient(circle_at_15%_85%,rgba(255,255,255,0.06),transparent_20%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />

          <div className="relative flex flex-col items-center gap-2 text-center">
            <span className="hidden text-xs tracking-[0.14em] text-white/40 md:block">
              KKB PRODUCTION
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-[38px]">Оставить заявку</h2>
          </div>

          <form
            onSubmit={(event) => event.preventDefault()}
            className="relative mt-8 grid grid-cols-1 gap-3 md:grid-cols-[repeat(3,minmax(0,1fr))_auto]"
          >
            <input
              type="tel"
              aria-label="Номер телефона"
              placeholder="Номер телефона"
              value={phone}
              onChange={(event) => setPhone(formatPhone(event.target.value))}
              inputMode="tel"
              autoComplete="tel"
              className={inputClassName}
            />
            <input
              type="text"
              aria-label="Telegram"
              placeholder="Telegram"
              className={inputClassName}
            />
            <input
              type="text"
              aria-label="Имя"
              placeholder="Имя"
              className={inputClassName}
            />
            <button
              type="submit"
              className="h-12 rounded-xl border border-white/16 bg-white text-black px-8 text-sm font-medium shadow-[0_14px_34px_rgba(255,255,255,0.08),0_14px_32px_rgba(0,0,0,0.28)] transition-all hover:-translate-y-px hover:bg-white/92 hover:shadow-[0_18px_40px_rgba(255,255,255,0.1),0_18px_38px_rgba(0,0,0,0.34)]"
            >
              Отправить
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
