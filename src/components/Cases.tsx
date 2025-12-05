import case1 from "@/assets/case-1.jpg";
import case2 from "@/assets/case-2.jpg";
import case3 from "@/assets/case-3.jpg";

const Cases = () => {
  const cases = [
    {
      image: case1,
      title: "Травник 250 л, Новая Рига",
      subtitle: "Хай-тек дом",
      challenge: "Нужен был «живой акцент» среди бетона и стекла.",
      result: "Мягкие зелёные перспективы, стабильная вода, эффект «живой картины».",
    },
    {
      image: case2,
      title: "Псевдоморе 450 л, Москва-Сити",
      subtitle: "Переговорная",
      challenge: "В переговорную нужно было создать «точку притяжения».",
      result: "Стекло «как воздух», тихая система, вау-эффект при входе.",
    },
    {
      image: case3,
      title: "Перезапуск 180 л",
      subtitle: "Квартира в стиле минимализм",
      challenge: "Аквариум запустили «по-быстрому» — превратился в болото.",
      result: "Сохранил 90% рыб, через неделю аквариум стал выглядеть как часть интерьера.",
    },
  ];

  return (
    <section id="cases" className="py-24 md:py-32 bg-gradient-dark relative">
      {/* Background glows */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-bio/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-bio/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
            <span className="text-gradient-bio">Кейсы</span> интеграции в интерьер
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Реальные проекты, которые изменили пространство
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((caseItem, index) => (
            <div
              key={index}
              className="card-premium overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={caseItem.image}
                  alt={caseItem.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-bio/20 text-bio text-sm font-medium backdrop-blur-sm">
                    {caseItem.subtitle}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-serif font-semibold mb-4 group-hover:text-bio transition-colors">
                  {caseItem.title}
                </h3>

                <div className="space-y-4">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                      Задача
                    </div>
                    <p className="text-foreground/80 text-sm">
                      {caseItem.challenge}
                    </p>
                  </div>

                  <div>
                    <div className="text-xs uppercase tracking-wider text-bio mb-1">
                      Результат
                    </div>
                    <p className="text-foreground text-sm font-medium">
                      {caseItem.result}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cases;
