import { 
  GraduationCap, 
  Play, 
  Gift,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Services = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-gradient-dark relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-bio/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bio/10 border border-bio/20">
              <Play className="w-4 h-4 text-bio" />
              <span className="text-bio text-sm font-medium">Первые 2 урока — бесплатно для всех</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber/10 border border-amber/20">
              <Gift className="w-4 h-4 text-amber" />
              <span className="text-amber text-sm font-medium">Полный курс — бонус при покупке</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
            Экспертный курс <span className="text-gradient-bio">аквариумистики</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Премиум-студия Bio-Cube предоставляет <span className="text-foreground font-medium">бесплатный доступ к первым 2 урокам</span> для всех желающих. 
            Эти уроки дадут вам полное понимание, как правильно подобрать аквариум и на что обращать внимание. 
            При заказе аквариума вы получаете <span className="text-amber font-medium">бесплатный доступ к полному курсу из 14 уроков</span> — 
            от основ до профессиональных техник содержания.
          </p>
        </div>

        {/* Bottom CTA Block */}
        <div className="max-w-4xl mx-auto">
          <div className="card-premium p-8 md:p-10 text-center border-amber/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber/0 via-amber to-amber/0" />
            
            <div className="w-16 h-16 rounded-full bg-amber/15 flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="w-8 h-8 text-amber" />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-4 text-foreground">
              Как запустить аквариум <span className="text-amber">легко и правильно?</span>
            </h3>
            
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-4">
              Представьте, что аквариум — это сложный механизм. Наш курс выступает в роли подробной 
              технической инструкции, которая позволяет вам не гадать, почему он работает, а понимать 
              его внутренние процессы — гарантируя долгую и стабильную работу без проблем.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-8 max-w-3xl mx-auto">
              <div className="bg-bio/10 border border-bio/20 rounded-xl p-4">
                <p className="text-foreground font-medium mb-2 flex items-center gap-2">
                  <Play className="w-4 h-4 text-bio" />
                  <span className="text-bio">Бесплатно для всех:</span>
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Первые 2 урока дадут понимание, как подобрать аквариум под ваше пространство, 
                  выбрать место установки, определить объём и стиль оформления.
                </p>
              </div>
              <div className="bg-amber/10 border border-amber/20 rounded-xl p-4">
                <p className="text-foreground font-medium mb-2 flex items-center gap-2">
                  <Gift className="w-4 h-4 text-amber" />
                  <span className="text-amber">При покупке аквариума:</span>
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Полный курс из 14 уроков — от основ до профессиональных техник содержания, 
                  настройки биологии и долгосрочного ухода за аквариумом.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="amber" 
                size="xl" 
                className="group"
                onClick={() => {
                  const contactElement = document.getElementById('contact');
                  if (contactElement) {
                    contactElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span>Получить доступ к курсу</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-4">
              Первые 2 урока — бесплатно для всех. Полный курс из 14 уроков — бесплатно при заказе аквариума
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
