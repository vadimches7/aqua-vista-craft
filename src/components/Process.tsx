import { ClipboardList, Palette, Wrench, Fish, HeartHandshake } from "lucide-react";

const Process = () => {
  const steps = [
    {
      number: "01",
      icon: ClipboardList,
      title: "Заявка и бриф",
      description: "Определяем стиль интерьера, литраж, место, композицию и биологию.",
    },
    {
      number: "02",
      icon: Palette,
      title: "Проектирование",
      description: "Собираю концепт, подбираю природные материалы и оборудование премиум-класса.",
    },
    {
      number: "03",
      icon: Wrench,
      title: "Монтаж",
      description: "Чистая работа, скрытые трассы, акцентная подсветка, тишина системы.",
    },
    {
      number: "04",
      icon: Fish,
      title: "Заселение",
      description: "Рыба и растения под конкретный биоплан.",
    },
    {
      number: "05",
      icon: HeartHandshake,
      title: "Сервис",
      description: "Идеальный вид каждый день + гарантия 5 лет.",
    },
  ];

  return (
    <section id="process" className="py-24 md:py-32 bg-gradient-dark relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-bio/20 to-transparent" />
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-bio/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-bio/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
            Процесс <span className="text-gradient-bio">создания</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            От первой идеи до живого подводного мира в вашем интерьере
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-bio/0 via-bio/30 to-bio/0 -translate-y-1/2" />

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative group"
              >
                {/* Card */}
                <div className="card-premium p-6 text-center h-full hover:-translate-y-2 transition-all duration-500">
                  {/* Number badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-bio text-primary-foreground flex items-center justify-center text-sm font-bold z-10">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto rounded-xl bg-bio/10 flex items-center justify-center mb-4 mt-4 group-hover:bg-bio/20 transition-colors">
                    <step.icon className="w-8 h-8 text-bio" />
                  </div>

                  <h3 className="text-lg font-serif font-semibold mb-3 group-hover:text-bio transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow (hidden on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-2 w-4 h-4 -translate-y-1/2 text-bio/50 z-20">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
