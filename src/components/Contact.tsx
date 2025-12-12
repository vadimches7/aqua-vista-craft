import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

const Contact = () => {
  const aggregatorUrl =
    import.meta.env?.NEXT_PUBLIC_AGGREGATOR_URL ||
    (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_AGGREGATOR_URL) ||
    "";

  const handleAggregator = () => {
    if (aggregatorUrl) {
      window.open(aggregatorUrl, "_blank", "noopener");
    } else {
      handleWhatsApp();
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Здравствуйте! Хочу обсудить проект аквариума.`
    );
    window.open(`https://wa.me/79001234567?text=${text}`, "_blank");
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/50 via-background to-background" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-bio/10 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-bio/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
              Обсудим ваш будущий
              <br />
              <span className="text-gradient-bio">подводный мир?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Подберу стиль, оборудование и биологию под вашу архитектуру —
              от хай-тека до сканди-минимализма.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* CTA вместо формы */}
            <div className="lg:col-span-3">
              <div className="card-premium p-8 space-y-6">
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-3 rounded-full bg-bio/10 text-bio">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-foreground">
                      Оставьте заявку в агрегаторе или напишите в WhatsApp
                    </p>
                    <p className="text-muted-foreground">
                      Приложение подбирает рыб и совместимость, а мы подготовим коммерческое предложение под вашу архитектуру.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="bio"
                    size="lg"
                    className="w-full sm:w-auto"
                    onClick={handleAggregator}
                    disabled={!aggregatorUrl}
                  >
                    <span>Перейти в агрегатор</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                    onClick={handleWhatsApp}
                  >
                    Написать в WhatsApp
                  </Button>
                </div>

                {!aggregatorUrl && (
                  <p className="text-xs text-muted-foreground">
                    Укажите NEXT_PUBLIC_AGGREGATOR_URL, чтобы включить переход в агрегатор.
                  </p>
                )}
              </div>
            </div>

            {/* Info block */}
            <div className="lg:col-span-2 flex flex-col justify-center">
              <div className="text-center lg:text-left space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Свяжемся для уточнения деталей и отправим коммерческое предложение в удобный мессенджер.
                </p>

                <div className="pt-6 border-t border-border/50">
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>Москва и Московская область</p>
                    <p>Ежедневно с 9:00 до 21:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
