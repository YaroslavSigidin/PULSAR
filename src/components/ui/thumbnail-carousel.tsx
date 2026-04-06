import { useEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type CarouselItem = {
  id: number
  url: string
  title: string
  eyebrow?: string
  description?: string
}

type ThumbnailCarouselProps = {
  items: CarouselItem[]
  initialIndex?: number
}

const THUMB_WIDTH_PX = 144
const GAP_PX = 8

function Thumbnails({
  index,
  items,
  setIndex,
}: {
  index: number
  items: CarouselItem[]
  setIndex: (value: number) => void
}) {
  const thumbnailsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = thumbnailsRef.current
    if (!container) return

    let scrollPosition = 0
    for (let i = 0; i < index; i += 1) {
      scrollPosition += THUMB_WIDTH_PX + GAP_PX
    }

    const containerWidth = container.offsetWidth
    const centerOffset = containerWidth / 2 - THUMB_WIDTH_PX / 2
    scrollPosition -= centerOffset

    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    })
  }, [index])

  return (
    <div
      ref={thumbnailsRef}
      className="overflow-x-auto"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <div className="flex w-fit gap-2 pb-2">
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setIndex(i)}
            className={`relative shrink-0 overflow-hidden rounded-[0.85rem] border transition-[transform,border-color,opacity,box-shadow] duration-300 ease-out ${
              i === index
                ? 'scale-[1.03] border-white/30 opacity-100 shadow-[0_12px_24px_rgba(0,0,0,0.28)]'
                : 'border-white/12 opacity-72 hover:opacity-90'
            }`}
            style={{ width: `${THUMB_WIDTH_PX}px` }}
          >
            <img
              src={item.url}
              alt={item.title}
              className="pointer-events-none aspect-video h-auto w-full select-none object-cover"
              draggable={false}
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/18 to-transparent" />
            {i === index ? (
              <div className="absolute inset-x-2.5 bottom-2 text-left">
                <p className="text-xs font-semibold text-white">{item.title}</p>
              </div>
            ) : null}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function ThumbnailCarousel({ items, initialIndex = 0 }: ThumbnailCarouselProps) {
  const safeInitialIndex = Math.max(0, Math.min(items.length - 1, initialIndex))
  const [index, setIndex] = useState(safeInitialIndex)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const x = useMotionValue(0)
  const activeItem = items[index]

  useEffect(() => {
    if (!isDragging && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth || 1
      const targetX = -index * containerWidth

      animate(x, targetX, {
        duration: 0.32,
        ease: [0.22, 1, 0.36, 1],
      })
    }
  }, [index, x, isDragging])

  if (items.length === 0) return null

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <div
          className="relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.02]"
          ref={containerRef}
        >
          <motion.div
            className="flex will-change-transform"
            drag="x"
            dragElastic={0.08}
            dragMomentum={false}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(_, info) => {
              setIsDragging(false)

              const containerWidth = containerRef.current?.offsetWidth || 1
              const offset = info.offset.x
              const velocity = info.velocity.x

              let newIndex = index

              if (Math.abs(velocity) > 500) {
                newIndex = velocity > 0 ? index - 1 : index + 1
              } else if (Math.abs(offset) > containerWidth * 0.24) {
                newIndex = offset > 0 ? index - 1 : index + 1
              }

              newIndex = Math.max(0, Math.min(items.length - 1, newIndex))
              setIndex(newIndex)
            }}
            style={{ x }}
          >
            {items.map((item) => (
              <div key={item.id} className="w-full shrink-0">
                <div className="relative h-[520px] md:h-[680px]">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="pointer-events-none h-full w-full select-none object-cover"
                    draggable={false}
                    loading={Math.abs(item.id - activeItem.id) <= 1 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.22)_32%,rgba(0,0,0,0.78))]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_28%)]" />
                </div>
              </div>
            ))}
          </motion.div>

          <motion.button
            type="button"
            disabled={index === 0}
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            className={`absolute left-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-[0.875rem] border text-white transition-all ${
              index === 0
                ? 'cursor-not-allowed border-white/10 bg-black/20 opacity-35'
                : 'border-white/18 bg-black/35 opacity-80 backdrop-blur-sm hover:scale-110 hover:border-white/28 hover:opacity-100'
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>

          <motion.button
            type="button"
            disabled={index === items.length - 1}
            onClick={() => setIndex((i) => Math.min(items.length - 1, i + 1))}
            className={`absolute right-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-[0.875rem] border text-white transition-all ${
              index === items.length - 1
                ? 'cursor-not-allowed border-white/10 bg-black/20 opacity-35'
                : 'border-white/18 bg-black/35 opacity-80 backdrop-blur-sm hover:scale-110 hover:border-white/28 hover:opacity-100'
            }`}
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>

          <div className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 rounded-xl border border-white/12 bg-black/45 px-3 py-1 text-sm text-white backdrop-blur-sm">
            {index + 1} / {items.length}
          </div>

        </div>

        <Thumbnails index={index} items={items} setIndex={setIndex} />
      </div>
    </div>
  )
}
