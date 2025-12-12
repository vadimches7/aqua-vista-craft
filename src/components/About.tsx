import aboutImage from "@/assets/about-aquarium.jpg";
import {
  Quote,
  Fish,
  Microscope,
  ShieldCheck,
  Layers,
  HeartHandshake,
} from "lucide-react";

const About = () => {
  const team = [
    {
      title: "Аквариумист",
      description: "Собирает композицию, запускает биологию и следит за стабильностью системы.",
      icon: Fish,
      photo: "/images/team/service.png",
    },
    {
      title: "Ихтиолог",
      description: "Подбирает совместимых рыб и беспозвоночных, контролирует здоровье и питание.",
      icon: Microscope,
      photo: "/images/team/ikhtiolog.png",
    },
    {
      title: "Специалист отдела заботы",
      description: "Контроль качества обслуживания: приезжаем вовремя, держим связь, решаем вопросы.",
      icon: HeartHandshake,
      photo: "/images/team/akvariumist.png",
    },
    {
      title: "Мастер по склейке аквариумов",
      description: "Точность геометрии, прозрачные швы и надёжность конструкции под ваш объём.",
      icon: Layers,
      photo: "/images/team/glass-master.png",
    },
  ];

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-bio/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-bio/3 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Quote card */}
          <div className="card-premium p-8 md:p-12 relative overflow-hidden">
            {/* Decorative quote icon */}
            <Quote className="absolute top-6 right-6 w-20 h-20 text-bio/10" />
            
            <div className="relative z-10 grid lg:grid-cols-[1.3fr_0.9fr] gap-10 items-center">
              {/* Quote text */}
              <div>
                <p className="text-xl md:text-2xl lg:text-3xl font-serif font-medium italic text-foreground leading-relaxed mb-8">
                  «Аквариум должен дополнять интерьер, а не спорить с ним. 
                  Я собираю живые системы, которые выглядят естественно и премиально.»
                </p>

                {/* Author removed as requested */}
              </div>

              {/* Portrait */}
              <div className="relative w-full h-full min-h-[320px] rounded-2xl overflow-hidden border border-border/60 bg-gradient-to-br from-bio/10 via-background to-amber/5 shadow-lg shadow-black/20">
                <div
                  className="absolute inset-0 bg-center bg-cover"
                  style={{
                    backgroundImage: "url('/images/team/denis-nelyubov.png')",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-background/80 backdrop-blur-sm border border-border/50">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bio to-bio/60 flex items-center justify-center text-background font-semibold">
                    ДН
                  </div>
                  <div className="leading-tight">
                    <p className="text-foreground font-semibold">Денис Нелюбов</p>
                    <p className="text-xs text-muted-foreground">Автор проектов и лицо студии</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="mt-12">
            <div className="mb-6">
              <h3 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
                Команда, которая делает проекты Bio-Cube
              </h3>
              <p className="text-muted-foreground mt-2">
                Разные специалисты отвечают за биологию, оборудование, качество и аккуратную сборку аквариумов.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {team.map((member, index) => (
                <div
                  key={member.title}
                  className="card-premium p-5 border border-border/50 flex gap-4 items-start hover:-translate-y-1 transition-transform duration-500"
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  <div className="w-48 h-48 rounded-2xl bg-bio/10 overflow-hidden flex-shrink-0 border border-border/60">
                    <img
                      src={member.photo}
                      alt={member.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <member.icon className="w-4 h-4 text-bio" />
                      <h4 className="text-lg font-semibold text-foreground">{member.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{member.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image below quote */}
          <div className="mt-12 relative">
            <div className="relative rounded-2xl overflow-hidden glow-bio">
              <img 
                src={aboutImage} 
                alt="Премиальный аквариум Bio-Cube в интерьере" 
                className="w-full h-auto object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;