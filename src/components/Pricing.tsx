import { Check, Zap, Crown, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Pricing = () => {
  const plans = [
    {
      icon: Check,
      name: "Базовый",
      price: "4 500",
      description: "Для поддержания чистоты и стабильности",
      features: [
        "Чистка стёкол и декора",
        "Подмена воды",
        "Проверка параметров",
        "Осмотр оборудования",
      ],
      popular: false,
    },
    {
      icon: Crown,
      name: "Премиум",
      price: "7 500",
      description: "Для интерьеров, где картинка всегда должна быть идеальной",
      features: [
        "Всё из базового тарифа",
        "Тримминг растений",
        "Профилактика оборудования",
        "Коррекция композиции",
        "Фото-отчёт после обслуживания",
      ],
      popular: true,
    },
    {
      icon: AlertCircle,
      name: "SOS",
      price: "8 000",
      description: "Приезжаю быстро. Решаю проблему.",
      features: [
        "Выезд в течение 2 часов",
        "Диагностика проблемы",
        "Экстренная стабилизация",
        "Спасение обитателей",
        "Рекомендации по восстановлению",
      ],
      popular: false,
      urgent: true,
    },
  ];

  return (
    <section id="pricing" className="py-24 md:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
            Тарифы <span className="text-gradient-bio">обслуживания</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Аккуратно, по-премиуму, с гарантией результата
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`card-premium p-8 relative ${
                plan.popular ? "border-bio/50 scale-105" : ""
              } ${plan.urgent ? "border-amber/30" : ""}`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-gradient-bio text-primary-foreground text-sm font-semibold">
                    Популярный
                  </span>
                </div>
              )}

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                  plan.urgent
                    ? "bg-amber/20 text-amber"
                    : "bg-bio/20 text-bio"
                }`}
              >
                <plan.icon className="w-7 h-7" />
              </div>

              {/* Name & Price */}
              <h3 className="text-2xl font-serif font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-sm text-muted-foreground">от</span>
                <span className={`text-4xl font-bold ${plan.urgent ? "text-amber" : "text-gradient-bio"}`}>
                  {plan.price}
                </span>
                <span className="text-muted-foreground">₽</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                {plan.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.urgent ? "text-amber" : "text-bio"}`} />
                    <span className="text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={plan.popular ? "bio" : plan.urgent ? "amber" : "outline-bio"}
                className="w-full"
                size="lg"
              >
                Выбрать тариф
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
