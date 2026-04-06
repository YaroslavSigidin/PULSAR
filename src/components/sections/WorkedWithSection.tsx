import { motion } from 'framer-motion'

const artists = [
  'Платина',
  'Lil Krystall',
  'Aarne',
  'Баста',
  'Slava Marlow',
  'Nyusha',
  'Молодой Платон',
  'By Индия',
  'Voskresenskii',
  'ЛСП',
  'Lovv66',
  'Toxis',
  'Миа Бойка',
  'Obladaet',
  'Macan',
  'ALBLAK52',
  'kizaru',
  'Егор Крид',
  'Big Baby Tape',
  'FEDUK',
  'Kain Angel & 9mice',
  'Dilara',
  'Blago white',
  'STOPBAN',
  'Скриптонит',
  'FRIENDLY THUG 52 NGG',
] as const

const artistRowCount = 6
const baseArtistsPerRow = Math.floor(artists.length / artistRowCount)
const extraArtists = artists.length % artistRowCount

const artistRows = Array.from({ length: artistRowCount }, (_, index) => {
  const start = index * baseArtistsPerRow + Math.min(index, extraArtists)
  const end = start + baseArtistsPerRow + (index < extraArtists ? 1 : 0)

  return artists.slice(start, end)
})

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.12,
    },
  },
}

const item = {
  hidden: {
    opacity: 0,
    y: 26,
    scale: 0.96,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
}

export function WorkedWithSection() {
  return (
    <section id="worked-with" className="scroll-mt-28 bg-black px-4 py-24 text-white md:py-28">
      <div className="mx-auto max-w-[90rem]">
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.96, filter: 'blur(14px)' }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="relative border-t border-white/8 pt-10"
        >
          <div className="relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs uppercase tracking-[0.22em] text-white/36">Artists</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">
                С кем мы работаем
              </h2>
            </div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="mx-auto mt-12 flex max-w-[90rem] flex-col items-center gap-y-3 md:gap-y-4"
            >
              {artistRows.map((row, rowIndex) => (
                <motion.div
                  key={`row-${rowIndex}`}
                  variants={item}
                  className="flex w-full flex-wrap justify-center gap-x-4 gap-y-2 md:gap-x-8"
                >
                  {row.map((artist) => (
                    <button
                      key={artist}
                      type="button"
                      className="group flex cursor-pointer items-center justify-center text-center"
                    >
                      <span className="artist-name-column relative block whitespace-nowrap text-[1.4rem] uppercase leading-none md:text-[1.8rem] lg:text-[2.35rem]">
                        {artist}
                      </span>
                    </button>
                  ))}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
