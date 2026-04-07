import { LiquidMetal } from '@paper-design/shaders-react'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'

import { ShaderLines } from '@/components/ui/shader-lines'
import { withBaseUrl } from '@/lib/withBaseUrl'

import { Navbar } from './Navbar'

const revealContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.22,
    },
  },
}

const revealItem = {
  hidden: {
    opacity: 0,
    y: 56,
    scale: 0.93,
    rotateX: 14,
    filter: 'blur(18px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.05,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
}

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#000000] text-white md:min-h-screen">
      <Navbar />

      <div className="pointer-events-none absolute inset-0 bg-black" />

      <div className="pointer-events-none absolute left-1/2 top-[4.9rem] z-0 h-[160px] w-[calc(100vw-1.5rem)] max-w-[1400px] -translate-x-1/2 overflow-hidden rounded-[1.6rem] md:top-[5.75rem] md:h-[300px] md:rounded-[2.75rem]">
        <div className="liquid-glass absolute inset-0 rounded-[1.6rem] bg-black shadow-[0_28px_120px_rgba(0,0,0,0.46),inset_0_1px_0_rgba(255,255,255,0.16)] md:rounded-[2.75rem]">
          <ShaderLines className="opacity-95 saturate-0 contrast-[1.45] brightness-[1.08]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.28),transparent_24%,transparent_76%,rgba(0,0,0,0.3))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(0,0,0,0.02),rgba(0,0,0,0.36)_44%,rgba(0,0,0,0.88)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/22 via-white/8 to-transparent md:h-20" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/56 via-black/18 to-transparent md:h-24" />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(255,255,255,0.03),transparent_18%),linear-gradient(180deg,rgba(0,0,0,0.32),rgba(0,0,0,0.18)_30%,rgba(0,0,0,0.78))]" />

      <div className="pointer-events-none absolute inset-0 z-[1] grid place-items-center">
        <div className="hero-black-hole origin-center scale-[45] h-[13rem] w-[13rem] sm:h-[16rem] sm:w-[16rem] md:h-[23rem] md:w-[23rem] xl:h-[28rem] xl:w-[28rem]" />
      </div>

      <motion.div
        variants={revealContainer}
        initial="hidden"
        animate="visible"
        style={{ perspective: 1600 }}
        className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col items-center px-4 pb-12 pt-[6.9rem] text-center md:min-h-screen md:pb-16 md:pt-[15rem]"
      >
        <motion.div variants={revealItem} className="md:mt-[100px]">
          <div className="relative mx-auto h-[160px] w-[min(112vw,460px)] overflow-visible sm:h-[192px] sm:w-[min(112vw,520px)] md:h-[376px] md:w-[1040px] xl:h-[396px] xl:w-[1100px]">
            <div className="relative z-10 overflow-visible">
              <LiquidMetal
                width={1100}
                height={396}
                image={withBaseUrl('kk-mask.svg')}
                colorBack="rgba(0,0,0,0)"
                colorTint="#ffffff"
                shape="diamond"
                repetition={2}
                softness={0.1}
                shiftRed={0.3}
                shiftBlue={0.3}
                distortion={0.07}
                contour={0.4}
                angle={70}
                speed={1}
                scale={1.25}
                fit="contain"
              />
            </div>
          </div>
          <h1 className="sr-only">ПУЛЬСАР</h1>
          <p className="hero-production-kicker -mt-2 text-[1rem] leading-tight text-white/86 md:-mt-8 md:text-[1.55rem]">
            СТУДИЯ МУЗЫКАЛЬНОГО ПРОДАКШЕНА
          </p>
        </motion.div>

        <motion.div variants={revealItem} className="mt-10 hidden w-full max-w-[20.5rem] flex-col items-stretch gap-4 md:flex">
          <a
            href="#lead-form"
            className="hero-chrome-button inline-flex w-full items-center justify-center gap-2 rounded-[8px] px-7 py-3.5 text-sm font-semibold text-black"
          >
            Оставить заявку
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="#cases"
            className="hero-secondary-button liquid-glass inline-flex w-full items-center justify-center rounded-[8px] px-6 py-3 text-sm font-medium text-white"
          >
            Смотреть кейсы
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
