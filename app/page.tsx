import StickyBar from "@/components/StickyBar";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import TrustStrip from "@/components/TrustStrip";
import Services from "@/components/Services";
import MiniCTA from "@/components/MiniCTA";
import WhyChooseUs from "@/components/WhyChooseUs";
import Industries from "@/components/Industries";
import Testimonials from "@/components/Testimonials";
import LeadMagnet from "@/components/LeadMagnet";
import Process from "@/components/Process";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <>
      <StickyBar />
      <Hero />
      <StatsSection />
      <TrustStrip />
      <Services />
      <MiniCTA />
      <WhyChooseUs />
      <Industries />
      <MiniCTA />
      <Testimonials />
      <LeadMagnet />
      <Process />
      <FinalCTA />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
