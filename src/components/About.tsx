import aboutImage from "@/assets/about-aquarium.jpg";

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden glow-bio">
              <img
                src={aboutImage}
                alt="Человек наслаждается созерцанием премиального аквариума"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
            {/* Floating accent */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-bio/10 rounded-full blur-2xl animate-pulse-slow" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-bio/10 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 leading-tight">
              Как аквариум работает
              <br />
              <span className="text-gradient-bio">в интерьере</span>
            </h2>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Аквариум — это источник мягкого биосвета, глубины и движения.
              </p>

              <p>
                В хай-тек пространстве он становится живым элементом архитектуры:
                <span className="text-foreground"> пульсация мха, тень от коряг, игра света на стенах, мерцание рыб.</span>
              </p>

              <div className="p-6 rounded-xl bg-card/50 border border-border/50">
                <p className="text-foreground font-medium">
                  Этот эффект нельзя купить в магазине.
                </p>
                <p className="text-bio mt-2">
                  Он создаётся вручную — композицией, биологией, светом и опытом.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-border/50">
              <div>
                <div className="text-3xl md:text-4xl font-serif font-bold text-gradient-bio">12+</div>
                <div className="text-sm text-muted-foreground mt-1">лет в аквадизайне</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-serif font-bold text-gradient-bio">90+</div>
                <div className="text-sm text-muted-foreground mt-1">довольных клиентов</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-serif font-bold text-gradient-bio">25дБ</div>
                <div className="text-sm text-muted-foreground mt-1">тишина системы</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
