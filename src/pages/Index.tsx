import { CasesSection } from '@/components/sections/CasesSection'
import { ContactsSection } from '@/components/sections/ContactsSection'
import { FilmWorksSection } from '@/components/sections/FilmWorksSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { KeyServicesSection } from '@/components/sections/KeyServicesSection'
import { LeadCaptureSection } from '@/components/sections/LeadCaptureSection'
import { MapSection } from '@/components/sections/MapSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { StudioSection } from '@/components/sections/StudioSection'
import { WorkedWithSection } from '@/components/sections/WorkedWithSection'

export default function Index() {
  return (
    <>
      <HeroSection />
      <WorkedWithSection />
      <StudioSection />
      <KeyServicesSection />
      <CasesSection />
      <FilmWorksSection />
      <LeadCaptureSection />
      <ServicesSection />
      <MapSection />
      <ContactsSection />
    </>
  )
}
