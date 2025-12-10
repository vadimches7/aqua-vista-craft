import aboutImage from "@/assets/about-aquarium.jpg";
import { Quote } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-bio/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-bio/3 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Quote card */}
          <div className="card-premium p-8 md:p-12 relative overflow-hidden">
            {/* Decorative quote icon */}
            <Quote className="absolute top-6 right-6 w-20 h-20 text-bio/10" />
            
            {/* Quote text */}
            <div className="relative z-10">
              <p className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-foreground leading-relaxed mb-8">
                «Аквариум должен дополнять интерьер, а не спорить с ним. 
                Я собираю живые системы, которые выглядят естественно и премиально.»
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-bio to-bio/70 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-background">ДН</span>
                </div>
                <div>
                  <div className="text-lg font-semibold text-foreground">
                    Денис Нелюбов
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Основатель Bio-Cube
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image below quote */}
          <div className="mt-12 relative">
            <div className="relative rounded-2xl overflow-hidden glow-bio">
              <img 
                src={aboutImage} 
                alt="Премиальный аквариум Bio-Cube в интерьере" 
                className="w-full h-auto object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;