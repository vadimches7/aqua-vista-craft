import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Target,
  Home,
  FlaskConical,
  FileCheck,
  Headphones,
  Users,
  ArrowRight,
  Quote,
} from "lucide-react";

const WhyBioCube = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);

  const reasons = [
    {
      icon: Target,
      title: "Узкая специализация",
      subtitle: "15+ лет только аквариумы",
      description:
        "Не зоомагазин, не «мастер на все руки». Профильная студия с сотнями реализованных проектов и отточенными решениями.",
    },
    {
      icon: Home,
      title: "Интерьерный подход",
      subtitle: "Аквариум под пространство",
      description:
        "Учитываем геометрию, свет, мебель, сценарии жизни. Аквариум выглядит как часть архитектуры, а не случайный объект.",
    },
    {
      icon: FlaskConical,
      title: "Биология с первого дня",
      subtitle: "Не «налили воду и запустили»",
      description:
        "Выстроенная экосистема: бактерии, параметры воды, фильтрация, режим подмен. Стабильность и чистота на годы.",
    },
    {
      icon: FileCheck,
      title: "Договор и гарантия",
      subtitle: "До 5 лет ответственности",
      description:
        "Работаем официально, фиксируем условия в договоре. Остаёмся на связи после запуска — не исчезаем.",
    },
    {
      icon: Headphones,
      title: "Сервис и поддержка",
      subtitle: "Экстренный выезд за 2 часа",
      description:
        "Регулярное обслуживание от 1 раза в неделю. Если что-то не так — приедет тот, кто систему создавал.",
    },
    {
      icon: Users,
      title: "Рекомендации клиентов",
      subtitle: "90% приходят по сарафану",
      description:
        "Люди видят аквариумы Bio-Cube у друзей, в офисах, салонах — и хотят «так же или лучше».",
    },
  ];

  const highlightIndex = reasons.length - 1;
  const highlightReason = reasons[highlightIndex];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    const items = sectionRef.current?.querySelectorAll("[data-index]");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="why-biocube"
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-bio/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-bio/3 rounded-full blur-3xl" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-bio text-sm font-medium tracking-widest uppercase mb-4">
            Наши преимущества
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
            Почему выбирают{" "}
            <span className="text-gradient-bio">Bio-Cube</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Мы не просто ставим аквариум — проектируем и ведём живую систему 
            под ваш интерьер и образ жизни
          </p>
        </div>

        {/* Reasons grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {reasons.slice(0, -1).map((reason, index) => (
            <div
              key={index}
              data-index={index}
              className={`transition-all duration-700 ${
                visibleItems.has(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="card-premium p-6 h-full group hover:-translate-y-1 transition-transform duration-500">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-bio/15 flex items-center justify-center flex-shrink-0 group-hover:bg-bio/25 transition-colors">
                    <reason.icon className="w-6 h-6 text-bio" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-bio transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-bio/80 text-sm font-medium mb-2">
                      {reason.subtitle}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured reason - Recommendations */}
        <div
          data-index={highlightIndex}
          className={`max-w-4xl mx-auto mb-16 transition-all duration-700 ${
            visibleItems.has(highlightIndex)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <div className="card-premium p-8 md:p-10 relative overflow-hidden">
            {/* Decorative quote */}
            <Quote className="absolute top-6 right-6 w-16 h-16 text-bio/10" />
            
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-bio to-bio/70 flex items-center justify-center flex-shrink-0 shadow-lg shadow-bio/20">
                <Users className="w-10 h-10 text-background" />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-serif font-semibold mb-3 text-foreground">
                  {highlightReason?.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {highlightReason?.description}
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-bio/10 border border-bio/20">
                    <span className="text-2xl font-bold text-bio">90+</span>
                    <span className="text-sm text-muted-foreground">довольных<br/>клиентов</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-bio/10 border border-bio/20">
                    <span className="text-2xl font-bold text-bio">4.9</span>
                    <span className="text-sm text-muted-foreground">средний<br/>рейтинг</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-bio/10 border border-bio/20">
                    <span className="text-2xl font-bold text-bio">15+</span>
                    <span className="text-sm text-muted-foreground">лет на<br/>рынке</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className={`text-center transition-all duration-700 delay-700 ${
            visibleItems.has(highlightIndex)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            variant="default"
            size="xl"
            className="group bg-bio hover:bg-bio/90"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>Обсудить ваш проект</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <p className="text-muted-foreground text-sm mt-4">
            Ответим на вопросы и предложим решение под ваш интерьер
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyBioCube;
