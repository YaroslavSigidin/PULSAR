import { Reveal } from '@/components/ui/Reveal'
import ThumbnailCarousel from '@/components/ui/thumbnail-carousel'

const studioItems = [
  {
    id: 1,
    url: '/studio-gallery/hall/IMG_3711-2.jpg',
    title: 'Hall',
    eyebrow: 'Общее пространство',
    description: 'Зона, где можно встретить команду, обсудить релиз и спокойно зайти в рабочий ритм.',
  },
  {
    id: 2,
    url: '/studio-gallery/hall/IMG_3712-2.jpg',
    title: 'Hall',
    eyebrow: 'Общее пространство',
    description: 'Дополнительный ракурс общей зоны и живой атмосферы студии.',
  },
  {
    id: 3,
    url: '/studio-gallery/a/IMG_3737-1.jpg',
    title: 'Studio A',
    eyebrow: 'Основная комната',
    description: 'Пространство для записи, продюсирования и быстрых рабочих сессий без лишнего шума.',
  },
  {
    id: 4,
    url: '/studio-gallery/a/IMG_3738-1.jpg',
    title: 'Studio A',
    eyebrow: 'Основная комната',
    description: 'Ещё один ракурс основной комнаты с акцентом на пространство и сетап.',
  },
  {
    id: 5,
    url: '/studio-gallery/a/IMG_3740-1.jpg',
    title: 'Studio A',
    eyebrow: 'Основная комната',
    description: 'Рабочая зона, в которой удобно собирать материал и продюсировать сессии.',
  },
  {
    id: 6,
    url: '/studio-gallery/a/IMG_3742-1.jpg',
    title: 'Studio A',
    eyebrow: 'Основная комната',
    description: 'Крупнее к деталям основной комнаты и организации рабочего места.',
  },
  {
    id: 7,
    url: '/studio-gallery/a/IMG_3743-1.jpg',
    title: 'Studio A',
    eyebrow: 'Основная комната',
    description: 'Дополнительный ракурс основной студийной зоны.',
  },
  {
    id: 8,
    url: '/studio-gallery/a/IMG_3744-1.jpg',
    title: 'Studio A',
    eyebrow: 'Основная комната',
    description: 'Собранный интерьер комнаты для записи и продюсирования.',
  },
  {
    id: 9,
    url: '/studio-gallery/a/IMG_3746-1.jpg',
    title: 'Studio A',
    eyebrow: 'Основная комната',
    description: 'Ещё один угол основной комнаты с упором на оборудование и посадку.',
  },
  {
    id: 10,
    url: '/studio-gallery/a/IMG_3747-1.jpg',
    title: 'Studio A',
    eyebrow: 'Основная комната',
    description: 'Финальный ракурс основной комнаты из нового набора фотографий.',
  },
  {
    id: 11,
    url: '/studio-gallery/c/IMG_3725-1.jpg',
    title: 'Studio C',
    eyebrow: 'Сессионная комната',
    description: 'Подходит для плотной студийной работы, вокала и сборки материала в одной атмосфере.',
  },
  {
    id: 12,
    url: '/studio-gallery/c/IMG_3725-1-1.jpg',
    title: 'Studio C',
    eyebrow: 'Сессионная комната',
    description: 'Дополнительный кадр сессионной комнаты и её рабочей атмосферы.',
  },
  {
    id: 13,
    url: '/studio-gallery/c/IMG_3726-1.jpg',
    title: 'Studio C',
    eyebrow: 'Сессионная комната',
    description: 'Ракурс на студийную комнату, где собирается материал и вокал.',
  },
  {
    id: 14,
    url: '/studio-gallery/c/IMG_3727-1.jpg',
    title: 'Studio C',
    eyebrow: 'Сессионная комната',
    description: 'Ещё один вид на пространство для записи и сессионной работы.',
  },
  {
    id: 15,
    url: '/studio-gallery/c/IMG_3728-1.jpg',
    title: 'Studio C',
    eyebrow: 'Сессионная комната',
    description: 'Дополнительный ракурс сессионной комнаты с упором на интерьер.',
  },
  {
    id: 16,
    url: '/studio-gallery/c/IMG_3730-1.jpg',
    title: 'Studio C',
    eyebrow: 'Сессионная комната',
    description: 'Комната для плотных вокальных и музыкальных сессий.',
  },
  {
    id: 17,
    url: '/studio-gallery/c/IMG_3732-1.jpg',
    title: 'Studio C',
    eyebrow: 'Сессионная комната',
    description: 'Ракурс, который показывает характер и глубину пространства.',
  },
  {
    id: 18,
    url: '/studio-gallery/c/IMG_3734-1.jpg',
    title: 'Studio C',
    eyebrow: 'Сессионная комната',
    description: 'Финальный кадр комнаты C из нового фото-набора.',
  },
  {
    id: 19,
    url: '/studio-gallery/d/IMG_3715-1.jpg',
    title: 'Studio D',
    eyebrow: 'Отдельная зона',
    description: 'Комната для камерной работы, идейных созвонов и точечной продакшн-сборки.',
  },
  {
    id: 20,
    url: '/studio-gallery/d/image-2.jpg',
    title: 'Studio D',
    eyebrow: 'Отдельная зона',
    description: 'Дополнительный ракурс камерной комнаты для спокойной работы.',
  },
  {
    id: 21,
    url: '/studio-gallery/d/image-3.jpg',
    title: 'Studio D',
    eyebrow: 'Отдельная зона',
    description: 'Ещё один кадр Studio D с акцентом на атмосферу и приватность.',
  },
]

export function StudioSection() {
  return (
    <section className="bg-black px-4 pb-28 pt-10 text-white">
      <div className="mx-auto max-w-6xl">
        <Reveal className="border-t border-white/10 pt-8 text-center">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs tracking-[0.18em] text-white/40">KKB STUDIO</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Наша студия</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/58 md:text-base">
              Пространства, где мы записываем, продюсируем и собираем релизы в одной системе.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-10">
          <ThumbnailCarousel items={studioItems} initialIndex={3} />
        </Reveal>
      </div>
    </section>
  )
}
