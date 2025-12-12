// BioCube - Premium Aquarium Website
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import InstallationTariffsSection from "@/components/InstallationTariffsSection";
import PremiumExclusivity from "@/components/PremiumExclusivity";
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
        <PremiumExclusivity />
        <InstallationSteps />
        <PricingTransparency />
        <WhyBioCube />
        <ProjectsShowcase />
        <About />
        <Calculator />
        <Contact />
        <section className="pb-16 md:pb-24">
          <div className="container">
            <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-xl">
              <img
                src="/images/projects/aquarium-lounge.png"
                alt="Большой аквариум с подводным ландшафтом"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
