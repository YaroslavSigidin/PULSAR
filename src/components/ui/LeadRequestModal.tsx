import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react'
import { ArrowUpRight, X } from 'lucide-react'

import { formatPhone } from '@/lib/formatPhone'

type LeadRequestModalProps = {
  isOpen: boolean
  serviceTitle: string
  onClose: () => void
}

type LeadFormState = {
  firstName: string
  lastName: string
  phone: string
  telegram: string
  email: string
  comment: string
}

const createInitialForm = (): LeadFormState => ({
  firstName: '',
  lastName: '',
  phone: '+7',
  telegram: '',
  email: '',
  comment: '',
})

export function LeadRequestModal({ isOpen, serviceTitle, onClose }: LeadRequestModalProps) {
  const [form, setForm] = useState<LeadFormState>(createInitialForm)

  useEffect(() => {
    if (!isOpen) return

    setForm(createInitialForm())

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose, serviceTitle])

  if (!isOpen) return null

  const inputClassName =
    'h-12 rounded-xl border border-white/12 bg-white/[0.04] px-4 text-left text-sm text-white outline-none placeholder:text-white/28 transition-colors focus:border-white/28 focus:bg-white/[0.06]'

  const handleChange =
    (field: keyof LeadFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = field === 'phone' ? formatPhone(event.target.value) : event.target.value
      setForm((current) => ({ ...current, [field]: value }))
    }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const body = [
      `Услуга: ${serviceTitle}`,
      `Фамилия: ${form.lastName}`,
      `Имя: ${form.firstName}`,
      `Телефон: ${form.phone}`,
      `Telegram: ${form.telegram || 'Не указан'}`,
      `Email: ${form.email || 'Не указан'}`,
      '',
      'Комментарий:',
      form.comment || 'Без комментария',
    ].join('\n')

    const params = new URLSearchParams({
      subject: `Заявка на услугу: ${serviceTitle}`,
      body,
    })

    window.location.href = `mailto:hello@kkbrothers.studio?${params.toString()}`
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-black/80 px-4 py-6 backdrop-blur-md"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-request-modal-title"
        className="relative my-auto max-h-[calc(100svh-3rem)] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-white/12 bg-[#08080b]/95 p-6 text-white shadow-[0_32px_120px_rgba(0,0,0,0.52),inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-30px_80px_rgba(0,0,0,0.45)] md:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(255,255,255,0.18),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.08),transparent_18%),radial-gradient(circle_at_16%_86%,rgba(255,255,255,0.05),transparent_22%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />

        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-white/76 transition-colors hover:text-white"
          aria-label="Закрыть окно заявки"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative flex flex-col items-center text-center">
          <p className="text-xs tracking-[0.16em] text-white/38">ЗАЯВКА</p>
          <h3 id="lead-request-modal-title" className="mt-4 max-w-xl text-3xl font-semibold tracking-tight md:text-[2rem]">
            Оставить заявку
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/62">
            Оставь контакты, и студия свяжется с тобой по выбранной услуге.
          </p>

          <div className="mt-5 inline-flex rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-sm text-white/78">
            {serviceTitle}
          </div>

          <form onSubmit={handleSubmit} className="mt-7 grid w-full grid-cols-1 gap-3 md:grid-cols-2">
            <input
              type="text"
              name="lastName"
              autoComplete="family-name"
              placeholder="Фамилия"
              value={form.lastName}
              onChange={handleChange('lastName')}
              className={inputClassName}
              required
            />
            <input
              type="text"
              name="firstName"
              autoComplete="given-name"
              placeholder="Имя"
              value={form.firstName}
              onChange={handleChange('firstName')}
              className={inputClassName}
              required
            />
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              inputMode="tel"
              placeholder="Номер телефона"
              value={form.phone}
              onChange={handleChange('phone')}
              className={inputClassName}
              required
            />
            <input
              type="text"
              name="telegram"
              autoComplete="username"
              placeholder="Telegram"
              value={form.telegram}
              onChange={handleChange('telegram')}
              className={inputClassName}
            />
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange('email')}
              className={`md:col-span-2 ${inputClassName}`}
            />
            <textarea
              name="comment"
              placeholder="Комментарий: удобное время, задачи, референсы"
              value={form.comment}
              onChange={handleChange('comment')}
              className="min-h-[124px] rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-left text-sm text-white outline-none placeholder:text-white/28 transition-colors focus:border-white/28 focus:bg-white/[0.06] md:col-span-2"
            />

            <div className="mt-2 flex flex-col gap-3 md:col-span-2">
              <button
                type="submit"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/14 bg-white px-6 text-sm font-semibold text-black shadow-[0_14px_34px_rgba(255,255,255,0.08),0_14px_32px_rgba(0,0,0,0.28)] transition hover:bg-white/92"
              >
                Отправить
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
