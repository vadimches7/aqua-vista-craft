// BioCube - Premium Aquarium Website
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import InstallationTariffsSection from "@/components/InstallationTariffsSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import Services from "@/components/Services";
import InstallationSteps from "@/components/InstallationSteps";
import PricingTransparency from "@/components/PricingTransparency";
import WhyBioCube from "@/components/WhyBioCube";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import About from "@/components/About";
import Calculator from "@/components/Calculator";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <Hero />
        <InstallationTariffsSection />
        <BeforeAfterSection />
        <Services />
        <InstallationSteps />
        <PricingTransparency />
        <WhyBioCube />
        <ProjectsShowcase />
        <About />
        <Calculator />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
