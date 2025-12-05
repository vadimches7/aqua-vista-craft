import { Droplets, RefreshCw, Home, Leaf, FlaskConical, AlertTriangle } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Droplets,
      title: "Обслуживание",
      description: "Регулярная забота о вашем подводном мире: чистая вода, аккуратные швы силикона, кристальные стекла, эстетика каждой детали.",
      note: "Аквариум остается частью интерьера, а не проблемой.",
    },
    {
      icon: RefreshCw,
      title: "Перезапуск",
      description: "Корректный демонтаж, сохранение живности, создание новой биологии.",
      note: "Через 7–10 дней даже сложный хайтек-интерьер снова сияет чистым зелёным акцентом.",
    },
    {
      icon: Home,
      title: "Установка под ключ",
      description: "Создаю проекты, которые выглядят так, будто их строил сам архитектор дома.",
      note: "Эстетика минимализма, скрытые трассы, тихие фильтры, идеальная линия воды.",
    },
    {
      icon: Leaf,
      title: "Псевдоморе / Травник / Биотоп",
      description: "Собираю композиции под атмосферу пространства: ультрасовременные «воздушные» травники, структурные псевдорефы, лесные биотопы.",
      note: "Каждый стиль — гармония природы и архитектуры.",
    },
    {
      icon: FlaskConical,
      title: "Лаборатория воды",
      description: "Провожу тесты, настраиваю химию под растения и рыбу.",
      note: "Стабильная биология = красивый, живой интерьер.",
    },
    {
      icon: AlertTriangle,
      title: "Экстренный выезд",
      description: "Аварии случаются. Приезжаю быстро, стабилизирую систему, спасаю рыб и обитаемость.",
      note: "Время реакции — 2 часа.",
      urgent: true,
    },
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-gradient-dark relative">
      {/* Background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-bio/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-bio/3 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
            Что именно <span className="text-gradient-bio">делаю</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Полный цикл работ с премиальными аквариумами — от первой идеи до ежедневного совершенства
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`card-premium p-8 group hover:-translate-y-2 transition-all duration-500 ${
                service.urgent ? "border-amber/30" : ""
              }`}
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 ${
                  service.urgent
                    ? "bg-amber/20 text-amber"
                    : "bg-bio/20 text-bio"
                }`}
              >
                <service.icon className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-serif font-semibold mb-3 group-hover:text-bio transition-colors">
                {service.title}
              </h3>

              <p className="text-muted-foreground mb-4 leading-relaxed">
                {service.description}
              </p>

              <p
                className={`text-sm font-medium ${
                  service.urgent ? "text-amber" : "text-bio/80"
                }`}
              >
                {service.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
