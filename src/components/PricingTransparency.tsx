import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Box,
  Settings,
  Palette,
  Fish,
  Truck,
  FlaskConical,
  BadgeCheck,
  Receipt,
  ShieldCheck,
  FileText,
  ArrowRight,
} from "lucide-react";

const PricingTransparency = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const costItems = [
    {
      icon: Box,
      title: "Аквариум и тумба",
      description: "Качественное стекло, надёжная тумба, расчёт под вес воды и безопасную эксплуатацию.",
    },
    {
      icon: Settings,
      title: "Оборудование",
      description: "Фильтр, нагреватель, свет, CO₂ при необходимости. Подбираем под вашу биологию, а не по прайсу поставщика.",
    },
    {
      icon: Palette,
      title: "Декор и оформление",
      description: "Грунт, камни, коряги, растения — всё, что создаёт глубину и атмосферу вашего аквариума.",
    },
    {
      icon: Fish,
      title: "Рыбы и живность",
      description: "Здоровые, совместимые виды. Без случайных соседей и конфликтов в аквариуме.",
    },
    {
      icon: Truck,
      title: "Логистика и монтаж",
      description: "Бережная доставка, аккуратный занос, установка по уровню, подключение всех систем.",
    },
    {
      icon: FlaskConical,
      title: "Запуск биологии",
      description: "Подготовка воды, стартовые бактерии, настройка фильтрации и режимов — система стабильна с первого дня.",
    },
    {
      icon: BadgeCheck,
      title: "Работа студии Bio-Cube",
      description: "Проектирование, подбор решений, контроль качества, первый период сопровождения и гарантия 5 лет.",
    },
  ];

  const guarantees = [
    {
      icon: Receipt,
      text: "Понятная структура цены без скрытых доплат",
    },
    {
      icon: FileText,
      text: "Детальная смета — видно, из чего складывается стоимость",
    },
    {
      icon: ShieldCheck,
      text: "Аквариум не потребует «доплат за спасение» через месяц",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="pricing-transparency"
      ref={sectionRef}
      className="py-24 md:py-32 bg-gradient-dark relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-bio/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-amber text-sm font-medium tracking-widest uppercase mb-4">
            Честное ценообразование
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
            За что вы{" "}
            <span className="text-gradient-amber">реально платите</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Bio-Cube не накручивает на оборудование. Мы честно разделяем стоимость 
            на «железо», оформление и работу студии
          </p>
        </div>

        {/* Cost breakdown grid */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-center mb-8 text-foreground">
            Что входит в стоимость проекта
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {costItems.map((item, index) => (
              <div
                key={index}
                className={`card-premium p-5 transition-all duration-700 hover:-translate-y-1 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-bio/15 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-bio" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm">
                      {item.title}
                    </h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Honesty block */}
        <div
          className={`max-w-3xl mx-auto mb-16 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="card-premium p-8 md:p-10 border-amber/20 relative overflow-hidden">
            {/* Accent gradient */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber/0 via-amber to-amber/0" />
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-serif font-semibold mb-4 text-foreground">
                  Где мы <span className="text-amber">не</span> зарабатываем
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Мы не занимаемся перепродажей оборудования с большой наценкой. 
                  Базовые позиции идут по честной рыночной цене — вы видите их в смете.
                </p>
                <p className="text-foreground">
                  Наш заработок — <span className="text-bio font-medium">дизайн, опыт, настройка биологии</span> и 
                  дальнейшее обслуживание. То, за что к нам возвращаются и рекомендуют.
                </p>
              </div>
              
              {/* Visual accent */}
              <div className="hidden md:flex flex-col items-center justify-center w-32 h-32 rounded-2xl bg-gradient-to-br from-amber/20 to-amber/5 border border-amber/20">
                <span className="text-4xl font-bold text-amber">0%</span>
                <span className="text-xs text-muted-foreground text-center">наценка на<br/>оборудование</span>
              </div>
            </div>
          </div>
        </div>

        {/* What you get */}
        <div
          className={`max-w-3xl mx-auto mb-12 transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h3 className="text-xl font-semibold text-center mb-6 text-foreground">
            Что вы получаете на выходе
          </h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            {guarantees.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl bg-card/50 border border-border/50"
              >
                <div className="w-10 h-10 rounded-full bg-bio/15 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-bio" />
                </div>
                <p className="text-sm text-foreground leading-snug">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className={`text-center transition-all duration-700 delay-900 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            variant="amber"
            size="xl"
            className="group"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>Запросить детальную смету</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <p className="text-muted-foreground text-sm mt-4">
            Бесплатно рассчитаем стоимость под ваши размеры и пожелания
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingTransparency;
