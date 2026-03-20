import { NavHeader } from '@/components/layout/nav-header'
import { HeroSection } from '@/components/landing/hero-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { HowItWorks } from '@/components/landing/how-it-works'
import { CTASection, Footer } from '@/components/landing/cta-footer'

export default function Home() {
  return (
    <main className="bg-background">
      <NavHeader />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <CTASection />
      <Footer />
    </main>
  )
}
