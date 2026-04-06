import { AuroraFlux } from '@/components/ui/aurora-flux'

export function GlassRectangleSection() {
  return (
    <section className="bg-black px-4 pb-14 pt-0 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="liquid-glass relative h-[220px] w-full overflow-hidden rounded-[28px] md:h-[260px]">
          <AuroraFlux
            fullScreen={false}
            pauseWhenHidden
            mix={0.5}
            className="absolute inset-0 h-full w-full opacity-80 saturate-0 contrast-125 brightness-110"
            ariaLabel="Aurora flux glass rectangle background"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/28 via-transparent to-black/24" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/35 via-white/10 to-transparent" />
        </div>
      </div>
    </section>
  )
}
