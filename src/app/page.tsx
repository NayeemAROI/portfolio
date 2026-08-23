import { HeroDeliverability } from "@/components/HeroDeliverability";
import { PostmasterStrip } from "@/components/PostmasterStrip";
import { ServicesSection } from "@/components/ServicesSection";
import { DnsDiagnostic } from "@/components/DnsDiagnostic";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import { ReviewsSection } from "@/components/ReviewsSection";
import { TimelineSection } from "@/components/TimelineSection";
import { ComposeCTA } from "@/components/ComposeCTA";

export default function Home() {
  return (
    <>
      <HeroDeliverability />
      <PostmasterStrip />
      <ServicesSection />
      <DnsDiagnostic />
      <PortfolioGallery />
      <ReviewsSection />
      <TimelineSection />
      <ComposeCTA />
    </>
  );
}
