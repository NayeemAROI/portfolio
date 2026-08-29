import { ScrollPortraitHero } from "@/components/ScrollPortraitHero";
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
      <ScrollPortraitHero />
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
