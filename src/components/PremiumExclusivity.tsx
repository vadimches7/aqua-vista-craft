import { 
  Gem, 
  DollarSign,
  Sparkles,
  AlertCircle
} from "lucide-react";
import { useState } from "react";

const premiumFish = [
  {
    emoji: "🐉",
    name: "Платиновая арована",
    nameEn: "Platinum Arowana",
    price: "$80 000 – $400 000",
    whyValuable: "Генетическая мутация, идеальный белый цвет",
    status: "«Роллс-ройс» пресноводных аквариумов",
    important: "Требует большого объёма и опытного ухода",
    type: "Пресноводная",
    image: "/images/fish/platinum-arowana.png",
  },
  {
    emoji: "🐠",
    name: "Ангел Клариона",
    nameEn: "Clarion Angelfish",
    price: "$7 000 – $30 000",
    whyValuable: "Обитает у берегов Мексики, почти не экспортируется",
    status: "Мечта морских коллекционеров",
    important: "Яркий, солнечный, коллекционный вид",
    type: "Морская",
    image: "/images/fish/clarion-angelfish.png",
  },
  {
    emoji: "🌊",
    name: "Мятный ангел",
    nameEn: "Peppermint Angelfish",
    price: "$30 000 – $50 000",
    whyValuable: "Глубоководная, крайне сложный отлов",
    status: "Музейный экспонат среди рыб",
    important: "Бело-красные полосы, абсолютный «вау»",
    type: "Морская",
    image: "/images/fish/peppermint-angelfish.png",
  },
  {
    emoji: "🐡",
    name: "Леопольди",
    nameEn: "Potamotrygon leopoldi",
    price: "$5 000 – $10 000",
    whyValuable: "Эндемик Бразилии",
    status: "Элита пресноводных скатов",
    important: "Чёрный диск с белыми точками",
    type: "Пресноводная",
    image: "/images/fish/leopoldi-stingray.png",
  },
  {
    emoji: "💎",
    name: "Джем-танг",
    nameEn: "Gem Tang",
    price: "$5 000 – $15 000",
    whyValuable: "Ограниченный ареал (Индийский океан)",
    status: "Одна из самых стильных морских рыб",
    important: "Чёрный корпус с «звёздной пылью»",
    type: "Морская",
    image: "/images/fish/gem-tang.png",
  },
] as const;

type FishType = typeof premiumFish[number];

const FishCard = ({ fish }: { fish: FishType }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="card-premium overflow-hidden group hover:-translate-y-1 transition-all duration-500">
      {/* Image */}
      <div className="relative h-72 md:h-80 overflow-hidden bg-gradient-to-br from-amber/10 to-bio/10">
        {!imageError && fish.image ? (
          <img 
            src={fish.image}
            alt={fish.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl">{fish.emoji}</div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
        
        {/* Type badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
            fish.type === "Морская" 
              ? "bg-bio/20 text-bio border border-bio/30" 
              : "bg-amber/20 text-amber border border-amber/30"
          }`}>
            {fish.type}
          </span>
        </div>

        {/* Price badge */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background/90 backdrop-blur-sm border border-amber/30">
            <DollarSign className="w-4 h-4 text-amber" />
            <span className="text-amber font-bold text-sm">{fish.price}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start gap-3 mb-3">
          <span className="text-3xl">{fish.emoji}</span>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-amber transition-colors">
              {fish.name}
            </h3>
            <p className="text-sm text-muted-foreground italic">
              {fish.nameEn}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
              Почему ценится
            </p>
            <p className="text-sm text-foreground/90">
              {fish.whyValuable}
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber/10 border border-amber/20">
            <Sparkles className="w-4 h-4 text-amber flex-shrink-0" />
            <p className="text-sm text-foreground font-medium">
              {fish.status}
            </p>
          </div>

          <div className="flex items-start gap-2 pt-2 border-t border-border/30">
            <AlertCircle className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              {fish.important}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PremiumExclusivity = () => {

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-bio/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber/10 border border-amber/20 mb-6">
            <Gem className="w-4 h-4 text-amber" />
            <span className="text-amber text-sm font-medium">Эксклюзивность и премиум</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
            Премиальные рыбы <span className="text-gradient-amber">для статусных аквариумов</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Мы работаем с самыми редкими и дорогими видами рыб — от генетических мутаций 
            до глубоководных коллекционных экземпляров. Каждая рыба подбирается индивидуально 
            под ваш проект и интерьер.
          </p>
        </div>

        {/* Fish Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {premiumFish.map((fish, index) => (
            <FishCard key={index} fish={fish} />
          ))}
        </div>

        {/* Bottom CTA Block */}
        <div className="max-w-4xl mx-auto">
          <div className="card-premium p-8 md:p-10 border-amber/20 relative overflow-hidden text-center">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber/0 via-amber to-amber/0" />
            
            <h3 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-4">
              Если смотреть в будущее
            </h3>
            
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">
              Для интерьерных премиум-проектов чаще выбирают: <span className="text-foreground font-medium">аровану</span> (как центр композиции), 
              <span className="text-foreground font-medium"> редких ангелов</span> (как арт-объект), 
              <span className="text-foreground font-medium"> скатов</span> (для больших пространств, вилл, офисов).
            </p>

            <div className="bg-background/50 rounded-xl p-6 border border-border/30">
              <p className="text-foreground font-medium mb-2">
                Подберём идеальную «статусную» рыбу под ваш проект
              </p>
              <p className="text-sm text-muted-foreground">
                Скажите: пресная или морская вода, аквариум под интерьер или коллекция — 
                и мы предложим оптимальное решение
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumExclusivity;




