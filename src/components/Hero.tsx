import { Button } from "@/components/ui/button";
import { Phone, Clock, Star, Shield, FileText } from "lucide-react";
import heroImage from "@/assets/hero-aquarium.jpg";
const Hero = () => {
  const facts = [{
    icon: Clock,
    text: "12+ лет опыта"
  }, {
    icon: Star,
    text: "90+ отзывов 4.9"
  }, {
    icon: Shield,
    text: "Гарантия 5 лет"
  }, {
    icon: FileText,
    text: "Работа по договору"
  }];
  return <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Премиальный аквариум в современном интерьере" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
        {/* Caustic water effect */}
        <div className="absolute inset-0 caustic-overlay opacity-50" />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => <div key={i} className="absolute w-2 h-2 rounded-full bg-bio/30 animate-float" style={{
        left: `${15 + i * 15}%`,
        top: `${20 + i % 3 * 25}%`,
        animationDelay: `${i * 0.8}s`,
        animationDuration: `${5 + i}s`
      }} />)}
      </div>

      {/* Content */}
      <div className="container relative z-10 py-20 lg:py-0">
        <div className="max-w-3xl">
          {/* Tagline */}
          <p className="text-sm md:text-base tracking-[0.3em] uppercase text-muted-foreground/70 mb-6 animate-fade-up font-light" style={{
          textShadow: '0 0 20px hsl(var(--foreground) / 0.15)'
        }}>
            Аквадизайн премиум-класса
          </p>

          {/* Logo/Brand */}
          

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold mb-6 leading-tight animate-fade-up-delay-1">
            Живой аквариум
            <br />
            <span className="text-gradient-bio">под интерьер</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-4 leading-relaxed max-w-2xl animate-fade-up-delay-2">
            Проектирую, устанавливаю и обслуживаю премиальные аквариумы, которые становятся частью пространства — от хай-тек интерьеров до тёплых минималистичных домов.
          </p>
          <p className="text-base md:text-lg text-foreground/70 mb-10 max-w-2xl animate-fade-up-delay-2">
            Это не просто банка — это живой подводный мир со своей биологией, светом, глубиной и движением.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-up-delay-3">
            <Button variant="amber" size="xl" className="group">
              <span>Рассчитать проект</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
            <Button variant="outline-bio" size="xl" className="group">
              <Phone className="w-5 h-5" />
              <span>Экстренный выезд за 2 часа</span>
            </Button>
          </div>

          {/* Facts */}
          <div className="flex flex-wrap gap-6 md:gap-8 animate-fade-up-delay-3">
            {facts.map((fact, index) => <div key={index} className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
                <fact.icon className="w-4 h-4 text-bio" />
                <span>{fact.text}</span>
              </div>)}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-pulse-slow">
        <span className="text-xs uppercase tracking-widest">Прокрутите</span>
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-bio rounded-full animate-bounce" />
        </div>
      </div>
    </section>;
};
export default Hero;