import HeroSection from '@/components/home/hero-section';
import FeaturesSection from '@/components/home/features-section';
import PricingSection from '@/components/home/pricing-section';
import CTASection from '@/components/home/cta-section';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <CTASection />
    </div>
  );
}