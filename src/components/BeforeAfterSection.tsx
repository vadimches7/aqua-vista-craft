import { useRef, useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

interface BeforeAfterCard {
  id: number;
  image: string;
  beforeText: string;
  afterText: string;
}

const BeforeAfterSection = () => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);

  const cases: BeforeAfterCard[] = [
    {
      id: 1,
      image: "/images/before-after/case-1.jpg",
      beforeText: "Зелёная вода, взрыв водорослей",
      afterText: "Чистая система за 1 визит, стабильная биология через 2 недели",
    },
    {
      id: 2,
      image: "/images/before-after/case-2.jpg",
      beforeText: "Стресс у рыб, неправильная фильтрация",
      afterText: "Перенастройка потока, запуск азотного цикла",
    },
    {
      id: 3,
      image: "/images/before-after/case-3.jpg",
      beforeText: "Муть после некорректного ухода",
      afterText: "Прозрачная вода, стабильные параметры",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = Number(entry.target.getAttribute("data-card-id"));
            setVisibleCards((prev) => new Set([...prev, cardId]));
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    const cards = sectionRef.current?.querySelectorAll("[data-card-id]");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="before-after"
      ref={sectionRef}
      className="py-24 md:py-32 bg-gradient-dark relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-bio/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-bio/3 rounded-full blur-3xl" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-bio text-sm font-medium tracking-widest uppercase mb-4">
            Экспертность на практике
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
            Стабильная биология{" "}
            <span className="text-gradient-bio">с первого дня</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Мы регулярно восстанавливаем аквариумы, которые были запущены
            неправильно: муть, водоросли, гибель рыб. Поэтому новые проекты
            Bio-Cube сразу собираются и настраиваются так, чтобы работать
            годами — без проблем и сюрпризов.
          </p>
        </div>

        {/* Before/After Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {cases.map((item, index) => (
            <div
              key={item.id}
              data-card-id={item.id}
              className={`transition-all duration-700 ${
                visibleCards.has(item.id)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="card-premium overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
                {/* Split image container */}
                <div className="relative h-64 md:h-72 overflow-hidden">
                  <img
                    src={item.image}
                    alt={`До и После: ${item.beforeText}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.src = `https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80`;
                    }}
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  
                  {/* Center divider line */}
                  <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-bio/60 to-transparent" />
                  
                  {/* Labels */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium text-muted-foreground border border-border/50">
                      До
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1.5 rounded-full bg-bio/20 backdrop-blur-sm text-xs font-medium text-bio border border-bio/30">
                      После
                    </span>
                  </div>
                </div>

                {/* Card content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-semibold text-foreground">Было</span>
                    <span className="text-bio">→</span>
                    <span className="text-sm font-semibold text-bio">Стало</span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">
                      <span className="text-muted-foreground/60">Было:</span>{" "}
                      {item.beforeText}
                    </p>
                    <p className="text-foreground">
                      <span className="text-bio">Стало:</span>{" "}
                      {item.afterText}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Closing statement */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 px-8 py-5 rounded-2xl bg-card/60 border border-bio/20 backdrop-blur-sm max-w-3xl">
            <Sparkles className="w-6 h-6 text-bio flex-shrink-0" />
            <p className="text-foreground text-base md:text-lg leading-relaxed text-left">
              Ваш новый аквариум будет создан правильно — с безопасной биологией,
              чистой водой и стабильностью, которую мы подтверждаем на практике
              каждый день.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
