import { useEffect, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, MessageCircle, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import logoImage from '../../../лого.png'

const navItems = [
  { label: 'Услуги', href: '#services', strikethrough: false },
  { label: 'Кейсы', href: '#cases', strikethrough: false },
  { label: 'Видео', href: '#films', strikethrough: false },
  { label: 'Артисты', href: '#worked-with', strikethrough: false },
  { label: 'Контакты', href: '#contacts', strikethrough: false },
] as const

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = previousOverflow || ''
    }

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <header className="apple-liquid-header fixed inset-x-0 top-0 z-40 px-4 py-4 md:px-6 md:py-5">
      <div className="mx-auto max-w-6xl">
        <nav className="apple-liquid-bar flex w-full items-center justify-between gap-3 rounded-[1.85rem] px-3 py-3 md:rounded-[2rem] md:px-4">
          <div className="flex items-center gap-4">
            <a href="#" className="apple-liquid-brand apple-liquid-logo" onClick={closeMobileMenu}>
              <img
                src={logoImage}
                alt="KKB Studio"
                className="h-10 w-10 rounded-[0.95rem] object-contain md:h-11 md:w-11"
              />
            </a>

            <div className="apple-liquid-cluster hidden md:flex">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'apple-nav-link',
                    item.strikethrough && 'line-through decoration-white/40',
                  )}
                >
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="apple-liquid-cluster hidden md:flex">
            <a
              href="https://t.me/trepanate_me"
              target="_blank"
              rel="noreferrer"
              className="apple-liquid-segment apple-liquid-cta-segment"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Связаться с менеджером
            </a>
            <a
              href="#lead-form"
              className="apple-liquid-segment apple-liquid-cta-segment"
            >
              Оставить заявку
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((value) => !value)}
            className="apple-liquid-brand md:hidden"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        <AnimatePresence>
          {isMobileMenuOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -14, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="apple-liquid-mobile-panel mt-3 overflow-hidden rounded-[1.85rem] p-3 md:hidden"
            >
              <div className="grid gap-1.5">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="apple-liquid-mobile-link"
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <div className="mt-3 grid gap-2">
                <a
                  href="https://t.me/trepanate_me"
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeMobileMenu}
                  className="apple-liquid-mobile-link inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  Связаться с менеджером
                </a>

                <a
                  href="#lead-form"
                  onClick={closeMobileMenu}
                  className="apple-liquid-mobile-link inline-flex items-center justify-center gap-2"
                >
                  Оставить заявку
                  <ArrowUpRight className="h-4 w-4" />
                </a>

                <a
                  href="#lead-form"
                  onClick={closeMobileMenu}
                  className="hero-chrome-button inline-flex items-center justify-center gap-2 rounded-[1.2rem] px-4 py-3 text-sm font-semibold text-black"
                >
                  Записаться на студию
                  <ArrowUpRight className="h-4 w-4" />
                </a>

                <a
                  href="#cases"
                  onClick={closeMobileMenu}
                  className="liquid-glass inline-flex items-center justify-center rounded-[1.2rem] px-4 py-3 text-sm font-medium text-white"
                >
                  Смотреть кейсы
                </a>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  )
}
