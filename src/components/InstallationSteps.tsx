import { useRef, useEffect, useState } from "react";
import { 
  MessageSquare, 
  Ruler, 
  Truck, 
  Settings, 
  Palette, 
  Fish, 
  CalendarCheck,
  CheckCircle2,
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Step {
  number: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  details: string[];
  highlight?: string;
}

const InstallationSteps = () => {
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMessengerModalOpen, setIsMessengerModalOpen] = useState(false);

  const steps: Step[] = [
    {
      number: "01",
      icon: MessageSquare,
      title: "Заявка и замеры",
      subtitle: "Вы делитесь задачей — мы предлагаем решения",
      details: [
        "Размеры ниши, тумбы или места под аквариум",
        "Фото интерьера или визуализация от дизайнера",
        "Пожелания по стилю, объёму и типу системы",
      ],
      highlight: "Уже на этом этапе называем диапазон бюджета",
    },
    {
      number: "02",
      icon: Ruler,
      title: "Типовой или индивидуальный проект",
      subtitle: "Подбираем оптимальный формат под ваше пространство",
      details: [
        "Типовой размер (Риф 240, Altum 300) — доставка за 2 дня",
        "Индивидуальный проект под нишу или сложную геометрию — 2 недели",
        "Работаем строго по договору с фиксированной сметой",
      ],
    },
    {
      number: "03",
      icon: Truck,
      title: "Доставка и установка",
      subtitle: "Аквариум «садится» в интерьер точно и аккуратно",
      details: [
        "Доставляем аквариум и тумбу бережно, без повреждений",
        "Выставляем по уровню, проверяем устойчивость",
        "Контролируем нагрузки и удобство будущего обслуживания",
      ],
    },
    {
      number: "04",
      icon: Settings,
      title: "Оборудование и запуск биологии",
      subtitle: "Система начинает работать как живой организм",
      details: [
        "Фильтр, нагреватель, освещение, при необходимости CO₂",
        "Подготовка воды, кондиционеры и стартовые бактерии",
        "План разгона биологии на первые недели",
      ],
      highlight: "С этого момента аквариум уже «живёт», просто пока без рыб",
    },
    {
      number: "05",
      icon: Palette,
      title: "Оформление и композиция",
      subtitle: "Визуальная часть и интеграция в интерьер",
      details: [
        "Подбор камней, коряг, грунта, растений или декора",
        "Сборка композиции «на сухую» и согласование с вами",
        "Финальное оформление и наполнение водой",
      ],
      highlight: "Вы видите аквариум таким, каким он будет в вашем доме",
    },
    {
      number: "06",
      icon: Fish,
      title: "Подбор и запуск рыб",
      subtitle: "Формируем здоровое и совместимое сообщество",
      details: [
        "Подбираем виды под объём, стиль и параметры воды",
        "Сначала базовая группа, затем расширение состава",
        "Все виды совместимы между собой и вашей системой",
      ],
    },
    {
      number: "07",
      icon: CalendarCheck,
      title: "Контроль и сопровождение",
      subtitle: "Вы смотрите и наслаждаетесь — остальное делаем мы",
      details: [
        "Контрольный визит через 7–14 дней с тестами воды",
        "Корректировка света, фильтрации, режима подмен",
        "Удобный формат обслуживания: раз в 1–2 недели",
      ],
      highlight: "Аквариум под нашим сопровождением на годы вперёд",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepIndex = Number(entry.target.getAttribute("data-step-index"));
            setVisibleSteps((prev) => new Set([...prev, stepIndex]));
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -100px 0px" }
    );

    const stepElements = sectionRef.current?.querySelectorAll("[data-step-index]");
    stepElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const messengerOptions = [
    { name: "WhatsApp", href: "https://wa.me/79001234567" },
    { name: "Telegram", href: "https://t.me/aquavistacraft" },
    { name: "Мессенджер Макс", href: "https://m.me/aquavistacraft" },
  ];

  const openMessengerLink = (href: string) => {
    window.open(href, "_blank");
    setIsMessengerModalOpen(false);
  };

  return (
    <section
      id="installation-steps"
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-bio/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-bio/3 rounded-full blur-3xl" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-bio text-sm font-medium tracking-widest uppercase mb-4">
            Прозрачный процесс
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
            Как проходит установка{" "}
            <span className="text-gradient-bio">Bio-Cube</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            От замеров до первых рыб и дальнейшего сопровождения — 
            ведём проект полностью, вы только принимаете решения
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-bio/0 via-bio/30 to-bio/0 md:-translate-x-px" />

          {/* Steps */}
          <div className="space-y-8 md:space-y-12">
            {steps.map((step, index) => (
              <div
                key={index}
                data-step-index={index}
                className={`relative transition-all duration-700 ${
                  visibleSteps.has(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className={`flex flex-col md:flex-row items-start gap-6 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content card */}
                  <div className={`flex-1 ml-20 md:ml-0 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className="card-premium p-6 md:p-8 hover:-translate-y-1 transition-transform duration-500">
                      {/* Step number - mobile */}
                      <div className="md:hidden text-bio/30 text-5xl font-bold font-serif absolute -top-2 -right-2">
                        {step.number}
                      </div>
                      
                      <div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                        <div className="w-10 h-10 rounded-lg bg-bio/15 flex items-center justify-center">
                          <step.icon className="w-5 h-5 text-bio" />
                        </div>
                        <div>
                          <h3 className="text-lg md:text-xl font-semibold text-foreground">
                            {step.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4 text-sm md:text-base">
                        {step.subtitle}
                      </p>

                      <ul className={`space-y-2 mb-4 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                        {step.details.map((detail, i) => (
                          <li
                            key={i}
                            className={`flex items-start gap-2 text-sm text-muted-foreground/80 ${
                              index % 2 === 0 ? "md:flex-row-reverse" : ""
                            }`}
                          >
                            <CheckCircle2 className="w-4 h-4 text-bio/60 mt-0.5 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>

                      {step.highlight && (
                        <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-bio/10 border border-bio/20 ${
                          index % 2 === 0 ? "md:ml-auto" : ""
                        }`}>
                          <span className="text-bio text-sm font-medium">
                            {step.highlight}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Timeline node */}
                  <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 flex flex-col items-center">
                    <div className={`w-16 h-16 rounded-full bg-card border-4 border-bio/30 flex items-center justify-center transition-all duration-500 ${
                      visibleSteps.has(index) ? "border-bio scale-100" : "scale-90"
                    }`}>
                      <span className="text-bio font-bold text-lg">{step.number}</span>
                    </div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              </div>
            ))}
          </div>

          {/* Final node */}
          <div className="relative mt-12 flex justify-center">
            <div className="absolute left-8 md:left-1/2 -translate-x-1/2 -top-12 w-px h-12 bg-gradient-to-b from-bio/30 to-bio/0" />
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-bio to-bio/70 flex items-center justify-center shadow-lg shadow-bio/30">
              <CheckCircle2 className="w-10 h-10 text-background" />
            </div>
          </div>

          {/* Final message */}
          <div className="text-center mt-8">
            <p className="text-xl md:text-2xl font-serif text-foreground mb-2">
              Готово!
            </p>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Ваш аквариум работает идеально, а Bio-Cube берёт на себя 
              всё техническое сопровождение
            </p>
          </div>
        </div>

        {/* CTA moved here */}
        <div className="mt-14">
          <div className="card-premium p-8 md:p-10 border border-bio/20 bg-card/80 flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bio/10 text-bio text-sm">
              <CheckCircle2 className="w-4 h-4" />
              Свяжемся в течение часа
            </div>

            <div className="flex-1 space-y-3">
              <p className="text-lg text-foreground font-semibold">
                Предпочитаете мессенджер? Напишите напрямую — обсудим детали и назначим время консультации.
              </p>
              <p className="text-sm text-muted-foreground">
                Сразу уточним задачи, подберём формат установки и пришлём КП в удобный для вас мессенджер.
              </p>
            </div>

            <Button
              variant="outline-bio"
              size="xl"
              onClick={() => setIsMessengerModalOpen(true)}
              className="w-full lg:w-auto"
            >
              <MessageCircle className="w-5 h-5" />
              Написать в мессенджер
            </Button>
          </div>
        </div>

        {/* Messenger modal */}
        {isMessengerModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsMessengerModalOpen(false)}
            />
            <div className="relative w-full max-w-md p-6 rounded-2xl bg-card border border-border shadow-2xl animate-fade-up">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Связаться в мессенджере</p>
                  <h3 className="text-xl font-semibold text-foreground">Выберите удобный вариант</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMessengerModalOpen(false)}
                  className="p-2 rounded-full hover:bg-border/50 transition"
                  aria-label="Закрыть"
                >
                  ×
                </button>
              </div>

              <div className="space-y-3">
                {messengerOptions.map((option) => (
                  <button
                    key={option.name}
                    type="button"
                    onClick={() => openMessengerLink(option.href)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-border/60 bg-card/60 hover:border-bio/60 hover:bg-bio/5 transition"
                  >
                    <span className="text-foreground font-medium">{option.name}</span>
                    <MessageCircle className="w-4 h-4 text-bio" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default InstallationSteps;
