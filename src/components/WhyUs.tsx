import { Calendar, Star, Building2, FlaskConical, Eye, Volume2, Quote } from "lucide-react";

const WhyUs = () => {
  const benefits = [
    {
      icon: Calendar,
      text: "Работаю в аквадизайне с 2011 года",
    },
    {
      icon: Star,
      text: "90+ отзывов 4.9, десятки спасённых «болот»",
    },
    {
      icon: Building2,
      text: "Ставлю аквариумы, которые выглядят как часть архитектуры",
    },
    {
      icon: FlaskConical,
      text: "Лабораторные тесты воды, индивидуальные биопланы",
    },
    {
      icon: Eye,
      text: "Аккуратные трассы, скрытые коммуникации, отсутствие визуального шума",
    },
    {
      icon: Volume2,
      text: "Тишина оборудования — до 25–30 дБ",
    },
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-background to-background" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
              Почему <span className="text-gradient-bio">BioCube</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Особенно для премиум-домов и хай-тек интерьеров
            </p>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-border/30 hover:border-bio/30 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-bio/10 flex items-center justify-center flex-shrink-0 group-hover:bg-bio/20 transition-colors">
                    <benefit.icon className="w-5 h-5 text-bio" />
                  </div>
                  <p className="text-foreground/90 pt-2">{benefit.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quote card */}
          <div className="relative">
            <div className="card-premium p-10 lg:p-12 relative">
              {/* Quote icon */}
              <div className="absolute -top-6 -left-2 w-14 h-14 rounded-full bg-bio/20 flex items-center justify-center">
                <Quote className="w-7 h-7 text-bio" />
              </div>

              <blockquote className="text-xl md:text-2xl lg:text-3xl font-serif leading-relaxed mb-8 text-foreground/90">
                «Аквариум должен дополнять интерьер, а&nbsp;не&nbsp;спорить с&nbsp;ним. Я&nbsp;собираю живые системы, которые выглядят естественно и&nbsp;премиально.»
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-bio flex items-center justify-center text-primary-foreground font-serif font-bold text-xl">
                  B
                </div>
                <div>
                  <div className="font-semibold text-foreground">BioCube</div>
                  <div className="text-sm text-muted-foreground">Аквадизайнер с 2011 года</div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-bio/10 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute -top-8 -right-12 w-24 h-24 bg-bio/5 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
