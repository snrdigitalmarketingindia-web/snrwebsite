import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Services from "@/components/Services";
import MiniCTA from "@/components/MiniCTA";
import WhyChooseUs from "@/components/WhyChooseUs";
import Industries from "@/components/Industries";
import Testimonials from "@/components/Testimonials";
import Process from "@/components/Process";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Services />
      <MiniCTA />
      <WhyChooseUs />
      <Industries />
      <MiniCTA />
      <Testimonials />
      <Process />
      <FinalCTA />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
