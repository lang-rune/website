import {
  HeroSection,
  WhySection,
  CompilerJourneySection,
  ArchitecturePipelineSection,
  WorkshopSection,
  ClosureExplorerSection,
  TimelineSection,
  EcosystemSection,
  ReadSourceSection,
  FooterCTASection
} from "@/components/rune"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { AnnouncementBar } from "@/components/layout/AnnouncementBar"
import { SearchDialog } from "@/components/layout/SearchDialog"

export default function Home() {
  // Inline SVG Noise grain definition for terminal realism
  const grainStyle = {
    backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='noiseFilter'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23noiseFilter)'/></svg>")`
  }

  return (
    <div className="relative min-h-screen bg-[var(--rune-bg-base)] text-[var(--rune-fg-base)] overflow-x-clip selection:bg-[var(--rune-accent-subtle)] selection:text-[var(--rune-accent)] flex flex-col justify-between">
      
      {/* 1. Grain overlay background layer */}
      <div 
        style={grainStyle}
        className="fixed inset-0 pointer-events-none z-50 mix-blend-overlay opacity-[0.015]" 
      />

      {/* 2. Atmospheric radial glow background layer */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[800px] bg-[radial-gradient(circle,rgba(212,162,76,0.04)_0%,transparent_70%)] blur-[80px] pointer-events-none z-0" />
      
      {/* Persistent global layout headers */}
      <div className="relative z-40">
        <AnnouncementBar />
        <Header />
      </div>

      {/* Page content sections */}
      <main className="relative z-10 flex flex-col gap-12 sm:gap-20 md:gap-28 flex-grow">
        <HeroSection />
        <WhySection />
        <CompilerJourneySection />
        <ArchitecturePipelineSection />
        <WorkshopSection />
        <ClosureExplorerSection />
        <TimelineSection />
        <EcosystemSection />
        <ReadSourceSection />
        <FooterCTASection />
      </main>

      {/* Search dialog modal list */}
      <SearchDialog />

      {/* Persistent global footer */}
      <Footer />

    </div>
  )
}

