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
  const [isDesktopNav, setIsDesktopNav] = useState(() => window.innerWidth >= 1280)
  const mobileMenuId = 'site-mobile-menu'

  useEffect(() => {
    const handleResize = () => {
      const shouldUseDesktopNav = window.innerWidth >= 1280

      setIsDesktopNav(shouldUseDesktopNav)

      if (shouldUseDesktopNav) {
        setIsMobileMenuOpen(false)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <header className="apple-liquid-header fixed inset-x-0 top-0 px-3 py-3 backdrop-blur-xl backdrop-saturate-[1.12] sm:px-5 xl:px-6 xl:py-5">
      <AnimatePresence>
        {!isDesktopNav && isMobileMenuOpen ? (
          <motion.button
            type="button"
            aria-label="Закрыть меню"
            className="apple-liquid-mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={closeMobileMenu}
          />
        ) : null}
      </AnimatePresence>

      <div className="relative z-10 mx-auto max-w-6xl">
        <nav className="apple-liquid-bar flex min-h-16 w-full items-center justify-between gap-3 rounded-[1.45rem] px-3 py-2 sm:min-h-[4.5rem] sm:rounded-[1.85rem] xl:min-h-0 xl:rounded-[2rem] xl:px-4 xl:py-3">
          <div className="flex items-center gap-4">
            <a href="#" className="apple-liquid-brand apple-liquid-logo" onClick={closeMobileMenu}>
              <img
                src={logoImage}
                alt="KKB Studio"
                className="h-9 w-9 rounded-[0.85rem] object-contain sm:h-10 sm:w-10 xl:h-11 xl:w-11"
              />
            </a>

            {isDesktopNav ? (
              <div className="apple-liquid-cluster apple-liquid-desktop-nav">
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
            ) : null}
          </div>

          {isDesktopNav ? (
            <div className="apple-liquid-cluster apple-liquid-desktop-nav">
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
          ) : (
            <button
              type="button"
              aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-controls={mobileMenuId}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((value) => !value)}
              className="apple-liquid-brand apple-liquid-menu-button"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          )}
        </nav>

        <AnimatePresence>
          {!isDesktopNav && isMobileMenuOpen ? (
            <motion.div
              id={mobileMenuId}
              initial={{ opacity: 0, y: -14, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="apple-liquid-mobile-panel ml-auto mt-3 overflow-hidden rounded-[1.45rem] p-2.5 sm:rounded-[1.85rem] sm:p-3"
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
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  )
}
