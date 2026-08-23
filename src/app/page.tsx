import { SiteHeader } from "@/components/SiteHeader";
import { HeroDeliverability } from "@/components/HeroDeliverability";
import { PostmasterStrip } from "@/components/PostmasterStrip";
import { ServicesSection } from "@/components/ServicesSection";
import { DnsDiagnostic } from "@/components/DnsDiagnostic";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import { ReviewsSection } from "@/components/ReviewsSection";
import { TimelineSection } from "@/components/TimelineSection";
import { ComposeCTA } from "@/components/ComposeCTA";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      {/* 1. Header Navigation */}
      <SiteHeader />

      <main className="flex-1">
        {/* 2. Signature Deliverability Hero */}
        <HeroDeliverability />

        {/* 3. Postmaster Verified Proof Strip */}
        <PostmasterStrip />

        {/* 4. Core Services (5 Pillars) */}
        <ServicesSection />

        {/* 5. Interactive DNS & Auth Diagnostic */}
        <DnsDiagnostic />

        {/* 6. Featured Work & Case Deliverables */}
        <PortfolioGallery />

        {/* 7. 100% 5.0 ★ Client Feedback */}
        <ReviewsSection />

        {/* 8. Career Timeline, Certifications & Education */}
        <TimelineSection />

        {/* 9. Interactive Compose Message CTA */}
        <ComposeCTA />
      </main>

      {/* 10. Colophon Footer */}
      <SiteFooter />
    </div>
  );
}
