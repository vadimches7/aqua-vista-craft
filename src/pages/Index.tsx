// BioCube - Premium Aquarium Website
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import InstallationTariffsSection from "@/components/InstallationTariffsSection";
import Services from "@/components/Services";
import About from "@/components/About";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import Cases from "@/components/Cases";
import Calculator from "@/components/Calculator";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <Hero />
        <InstallationTariffsSection />
        <Services />
        <About />
        <Process />
        <WhyUs />
        <Cases />
        <Calculator />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
