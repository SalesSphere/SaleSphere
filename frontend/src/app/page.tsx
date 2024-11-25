import { BenefitsSection } from "@/components/benefits-section";
import Feature from "@/components/Feature";
import Footer from "@/components/Footer";
import { HeroSection } from "@/components/hero-section";
import { NavBar } from "@/components/Navbar";
import TestimonialsPage from "@/components/TestimonialsPage";
import Waitlist from "@/components/waitlist";

export default function Home() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main>
        <HeroSection />
        <BenefitsSection />
        <Waitlist />
        <Feature />
        <TestimonialsPage />
        <Footer />
      </main>
    </div>
  );
}
