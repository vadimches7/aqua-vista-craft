import { Button } from "@/components/ui/button";
import { Clock, Star, Shield, FileText, MessageCircleMore, X } from "lucide-react";
import heroImage from "@/assets/hero-aquarium.jpg";
import { useState } from "react";
const Hero = () => {
  const [isMessengerModalOpen, setIsMessengerModalOpen] = useState(false);

  const messengerOptions = [{
    name: "WhatsApp",
    href: "https://wa.me/79001234567"
  }, {
    name: "Мессенджер Макс",
    href: "https://m.me/aquavistacraft"
  }, {
    name: "Telegram",
    href: "https://t.me/aquavistacraft"
  }];

  const trackEvent = (event: string, from: string, data?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event, {
        from,
        ...data
      });
    }
    // Fallback для других систем аналитики
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event,
        from,
        ...data
      });
    }
  };

  const openMessenger = (href: string) => {
    window.open(href, "_blank");
    setIsMessengerModalOpen(false);
  };

  const handleCalculateClick = () => {
    trackEvent('cta_calculate_click', 'hero');
    const calculatorElement = document.getElementById('calculator');
    if (calculatorElement) {
      calculatorElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMessengerClick = () => {
    trackEvent('messenger_modal_open', 'hero');
    setIsMessengerModalOpen(true);
  };

  const facts = [{
    icon: Clock,
    text: "15+ лет опыта"
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
      <div className="absolute inset-0 animate-hero-bg">
        <img src={heroImage} alt="Премиальный аквариум в современном интерьере" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
        {/* Caustic water effect */}
        <div className="absolute inset-0 caustic-overlay opacity-50" />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => <div key={i} className="absolute w-2 h-2 rounded-full bg-bio/30 animate-float opacity-0" style={{
        left: `${15 + i * 15}%`,
        top: `${20 + i % 3 * 25}%`,
        animationDelay: `${1.5 + i * 0.3}s`,
        animationDuration: `${5 + i}s`,
        animation: `float ${5 + i}s ease-in-out infinite ${1.5 + i * 0.3}s, particle-fade-in 1s ease-out ${1.5 + i * 0.3}s forwards`
      }} />)}
      </div>

      {/* Content */}
      <div className="container relative z-10 py-20 lg:py-0">
        <div className="max-w-3xl">
          {/* Tagline */}
          <p className="text-sm md:text-base tracking-[0.3em] uppercase text-muted-foreground/70 mb-6 animate-hero-tagline font-light" style={{
          textShadow: '0 0 20px hsl(var(--foreground) / 0.15)'
        }}>
            Аквадизайн премиум-класса
          </p>

          {/* Logo/Brand */}
          

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold mb-6 leading-tight">
            <span className="block animate-hero-title">Аквариум, который становится</span>
            <span className="block text-gradient-bio-glow animate-hero-title-accent">частью интерьера</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed max-w-2xl animate-hero-subtitle">
            Проектируем, комплектуем и запускаем живые аквариумы под архитектуру вашего пространства — от идеи до стабильной экосистемы.
          </p>

          {/* Facts - компактный блок */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-8 animate-hero-facts">
            {facts.map((fact, index) => (
              <div key={index} className="flex items-center gap-1.5 text-sm text-muted-foreground/80">
                <fact.icon className="w-3.5 h-3.5 text-bio/70" />
                <span>{fact.text}</span>
                {index < facts.length - 1 && <span className="ml-3 text-border">•</span>}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-hero-cta">
            <Button 
              variant="amber" 
              size="xl" 
              className="group"
              data-scroll-to="#calculator"
              onClick={handleCalculateClick}
            >
              <span>Рассчитать стоимость</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
            <Button 
              variant="outline-bio" 
              size="xl" 
              className="group"
              data-action="open-messenger-modal"
              onClick={handleMessengerClick}
            >
              <MessageCircleMore className="w-5 h-5" />
              <span>Написать в мессенджер</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-hero-scroll">
        <span className="text-xs uppercase tracking-widest">Прокрутите</span>
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-bio rounded-full animate-bounce" />
        </div>
      </div>

      {/* Messenger modal */}
      {isMessengerModalOpen && <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsMessengerModalOpen(false)} />
          <div className="relative w-full max-w-md p-6 rounded-2xl bg-card/90 border border-border shadow-2xl animate-fade-up">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Связаться в мессенджере</p>
                <h3 className="text-xl font-semibold text-foreground">Выберите удобный вариант</h3>
              </div>
              <button type="button" onClick={() => setIsMessengerModalOpen(false)} className="p-2 rounded-full hover:bg-border/50 transition" aria-label="Закрыть">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-3">
              {messengerOptions.map(option => <button key={option.name} type="button" onClick={() => openMessenger(option.href)} className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-border/60 bg-card/60 hover:border-bio/60 hover:bg-bio/5 transition">
                  <span className="text-foreground font-medium">{option.name}</span>
                  <MessageCircleMore className="w-4 h-4 text-bio" />
                </button>)}
            </div>
          </div>
        </div>}
    </section>;
};
export default Hero;

