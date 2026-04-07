import HeroSection from "@/components/HeroSection";
import PartnersMarquee from "@/components/PartnersMarquee";
import BentoSection from "@/components/BentoSection";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PartnersMarquee />
      <ServicesSection />
      <BentoSection />
      <Footer />
    </main>
  );
}
