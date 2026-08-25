import { ThreePortraitHero } from "@/components/ThreePortraitHero";
import { Features02 } from "@/components/originkit/features-02";
import { Features04 } from "@/components/originkit/features-04";
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
      <ThreePortraitHero />
      <Features02 />
      <Features04 />
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
