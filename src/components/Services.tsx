import { 
  Clock, 
  Shield, 
  FileCheck, 
  FlaskConical, 
  Palette, 
  Zap, 
  BadgeCheck,
  Wallet
} from "lucide-react";

const Services = () => {
  const benefits = [
    {
      icon: Clock,
      title: "15+ лет в аквадизайне",
      description: "Сотни реализованных проектов. Знаем нюансы, которые не найдёте в интернете.",
      highlight: "15+",
      highlightLabel: "лет опыта",
    },
    {
      icon: Wallet,
      title: "Прозрачная смета",
      description: "Фиксированная цена в договоре. Никаких «доплат по ходу» — платите ровно столько, сколько обсудили.",
      highlight: "100%",
      highlightLabel: "прозрачность",
    },
    {
      icon: Shield,
      title: "Гарантия 5 лет",
      description: "На оборудование, герметичность и биологию. Если что-то пойдёт не так — исправим бесплатно.",
      highlight: "5",
      highlightLabel: "лет гарантии",
    },
    {
      icon: FileCheck,
      title: "Работа по договору",
      description: "Официальный документ с этапами, сроками и ответственностью. Юридическая защита для вас.",
      highlight: "100%",
      highlightLabel: "официально",
    },
    {
      icon: FlaskConical,
      title: "Лаборатория воды",
      description: "Регулярные тесты параметров. Предотвращаем проблемы до их появления — рыбы и растения здоровы.",
      highlight: "12",
      highlightLabel: "параметров",
    },
    {
      icon: Palette,
      title: "Проект под ваш интерьер",
      description: "Не шаблонные решения, а индивидуальный дизайн. Аквариум как часть архитектуры вашего дома.",
      highlight: "∞",
      highlightLabel: "вариантов",
    },
    {
      icon: Zap,
      title: "Экстренный выезд",
      description: "Авария в 3 ночи? Приедем и стабилизируем. Спасём рыб и дорогое оборудование.",
      highlight: "2ч",
      highlightLabel: "время отклика",
      urgent: true,
    },
    {
      icon: BadgeCheck,
      title: "Студия, а не частник",
      description: "Команда специалистов, склад оборудования, страховка. Надёжность на годы вперёд.",
      highlight: "Bio",
      highlightLabel: "Cube",
    },
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-gradient-dark relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-bio/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-bio/3 rounded-full blur-3xl" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-bio text-sm font-medium tracking-widest uppercase mb-4">
            Почему выбирают нас
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
            Что вы <span className="text-gradient-bio">получите</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Не просто аквариум, а уверенность в каждой детали — от проекта до сопровождения
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`card-premium p-6 group hover:-translate-y-1 transition-all duration-500 ${
                benefit.urgent ? "border-amber/30 lg:col-span-1" : ""
              }`}
            >
              {/* Icon & Highlight */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                    benefit.urgent
                      ? "bg-amber/20 text-amber"
                      : "bg-bio/15 text-bio"
                  }`}
                >
                  <benefit.icon className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${benefit.urgent ? "text-amber" : "text-bio"}`}>
                    {benefit.highlight}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {benefit.highlightLabel}
                  </div>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold mb-2 group-hover:text-bio transition-colors leading-tight">
                {benefit.title}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card/50 border border-border/50">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-bio/30 to-bio/10 border-2 border-background flex items-center justify-center text-xs text-bio font-medium"
                >
                  {['А', 'М', 'Д', 'С'][i]}
                </div>
              ))}
            </div>
            <div className="text-sm">
              <span className="text-foreground font-medium">90+ довольных клиентов</span>
              <span className="text-muted-foreground"> • рейтинг 4.9</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
