import { Hero } from "@/components/marketing/Hero";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { PopularInspirations } from "@/components/marketing/PopularInspirations";
import { Categories } from "@/components/marketing/Categories";
import { Testimonials } from "@/components/marketing/Testimonials";
import { FAQ } from "@/components/marketing/FAQ";
import { CTASection } from "@/components/marketing/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <PopularInspirations />
      <Categories />
      <Testimonials />
      <FAQ />
      <CTASection />
    </>
  );
}
