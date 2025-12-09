import { Button } from "@/components/ui/button";

type Tariff = {
  title: string;
  price: string;
  description?: string;
  features: string[];
  cta: string;
  image: string;
};

const tariffs: Tariff[] = [
  {
    title: "Риф 240 — Старт",
    price: "139 000 ₽",
    image: "/images/tariffs/reef-240-start.jpg",
    features: [
      "Базовый комплект оборудования",
      "Аккуратная композиция без перегруза декором",
      "Неприхотливая, живучая рыба",
      "Установка за 2 дня",
    ],
    cta: "Рассчитать под ваш интерьер",
  },
  {
    title: "Риф 240 — Стандарт",
    price: "159 000 ₽",
    image: "/images/tariffs/reef-240-standard.jpg",
    features: [
      "Усиленный свет для густой растительности",
      "Сложный декор и рельеф",
      "Плотная зелёная композиция",
      "Контрольный выезд через 2 недели",
    ],
    cta: "Хочу такой же уровень",
  },
  {
    title: "Риф 240 — Премиум интерьер",
    price: "189 000 ₽",
    image: "/images/tariffs/reef-240-premium.jpg",
    features: [
      "Дизайнерская композиция под стиль комнаты",
      "Премиальный декор и фактуры",
      "Аквариум как элемент интерьера",
      "Индивидуальный подбор рыб под идею",
    ],
    cta: "Обсудить премиум-проект",
  },
  {
    title: "Altum 300 Premium",
    price: "от 186 000 до 276 000 ₽",
    image: "/images/tariffs/altum-300-premium.jpg",
    description: "Один объём — три концепции",
    features: [
      "Artificial — искусственный декор, минимум ухода",
      "Nature — живые растения, естественный пейзаж",
      "Reef — псевдоморе с яркими рыбами",
    ],
    cta: "Получить точный расчёт",
  },
];

const InstallationTariffsSection = () => {
  return (
    <section id="installation-pricing" className="py-16 md:py-24 bg-background relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-20 top-10 w-72 h-72 bg-bio/5 blur-3xl rounded-full" />
        <div className="absolute right-0 bottom-0 w-64 h-64 bg-bio/5 blur-3xl rounded-full" />
      </div>

      <div className="container relative z-10 space-y-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold">
            Сколько стоит аквариум под интерьер
          </h2>
          <p className="text-lg text-muted-foreground">
            Честные диапазоны цен, без скрытых доплат
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tariffs.map((tariff) => (
            <div
              key={tariff.title}
              className="card-premium h-full flex flex-col p-6 border border-border/60 bg-card/70 hover:border-bio/60 transition-all duration-200 shadow-lg shadow-black/10 overflow-hidden"
            >
              <div className="relative w-full aspect-[4/3] mb-4 overflow-hidden rounded-xl border border-border/50">
                <img
                  src={tariff.image}
                  alt={tariff.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-foreground">{tariff.title}</h3>
                {tariff.description && (
                  <p className="text-sm text-muted-foreground mt-1">{tariff.description}</p>
                )}
              </div>
              <div className="text-3xl font-bold text-gradient-bio mb-4">{tariff.price}</div>
              <ul className="space-y-2 text-sm text-muted-foreground flex-1">
                {tariff.features.map((feature) => (
                  <li key={feature} className="leading-relaxed">
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="bio" size="lg" className="mt-6 w-full group">
                <span>{tariff.cta}</span>
              </Button>
            </div>
          ))}
        </div>

        <div className="p-6 md:p-7 rounded-2xl border border-border/60 bg-card/80 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          <div className="space-y-2 flex-1">
            <h3 className="text-2xl font-semibold text-foreground">Не нашли подходящий объём?</h3>
            <p className="text-muted-foreground">
              Делаем аквариумы под индивидуальные размеры и ваши пожелания — под любой интерьер, от 60 до 1200 л.
            </p>
          </div>
          <Button variant="bio" size="lg" className="w-full md:w-auto">
            Обсудить индивидуальный проект
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InstallationTariffsSection;

