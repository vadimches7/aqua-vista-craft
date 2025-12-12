import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calculator as CalcIcon, ArrowRight } from "lucide-react";
import { sendToAlbato } from "@/lib/albato";
import { openPopup } from "@/components/post-submit/postSubmitBus";

const Calculator = () => {
  const [projectType, setProjectType] = useState("");
  const [volume, setVolume] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const projectTypes = [
    { name: "Обслуживание", basePrice: 4500 },
    { name: "Перезапуск", basePrice: 25000 },
    { name: "Установка под ключ", basePrice: 120000 },
  ];

  const volumes = [
    { name: "до 100 л", multiplier: 1 },
    { name: "100-250 л", multiplier: 1.5 },
    { name: "250-500 л", multiplier: 2.2 },
    { name: "более 500 л", multiplier: 3 },
    { name: "Не знаю", multiplier: null },
    { name: "Индивидуальный размер", multiplier: null },
  ];

  const calculatedPrice = useMemo(() => {
    const selectedType = projectTypes.find((t) => t.name === projectType);
    const selectedVolume = volumes.find((v) => v.name === volume);

    if (!selectedType) return null;

    let price = selectedType.basePrice;
    if (selectedVolume && selectedVolume.multiplier !== null) {
      price *= selectedVolume.multiplier;
    }

    return Math.round(price / 1000) * 1000; // Round to nearest 1000
  }, [projectType, volume]);

  const handleContact = async () => {
    if (!phone.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Используем имя из формы, или телефон, или "Клиент" как fallback
      const clientName = name.trim() || phone || "Клиент";
      
      await sendToAlbato({
        name: clientName,
        phone: phone,
        form: 'calculator',
        project_type: projectType || undefined,
        volume: volume || undefined,
        calculated_price: calculatedPrice ? `${calculatedPrice.toLocaleString("ru-RU")} ₽` : undefined,
        address: address || undefined,
      });
      
      console.log('[Calculator] Form submitted successfully, showing popup');
      // Show post-submit popup only on success
      // Small delay to ensure form state is updated before popup opens
      setTimeout(() => {
        openPopup({ source: 'calculator' });
      }, 100);
    } catch (error) {
      console.error("[Calculator] Form submit error:", error);
      // Popup is NOT shown on error
      // Ошибка отправки - пользователь может попробовать снова
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = projectType && volume && phone.trim();

  return (
    <section id="calculator" className="py-24 md:py-32 bg-background relative">
      {/* Background glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-bio/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-bio/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bio/10 text-bio mb-6">
            <CalcIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Калькулятор проекта</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
            Рассчитайте <span className="text-gradient-bio">стоимость</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Средняя стоимость установки 120–300 тыс. ₽, обслуживание от 2 500 ₽/выезд. Узнаем точнее за 2 минуты.
          </p>
        </div>

        {/* Calculator Form */}
        <div className="max-w-4xl mx-auto">
          <div className="card-premium p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Project Type */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Тип проекта
                  </label>
                  <div className="space-y-2">
                    {projectTypes.map((type) => (
                      <button
                        key={type.name}
                        type="button"
                        onClick={() => {
                          setProjectType(type.name);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                          projectType === type.name
                            ? "border-bio bg-bio/10 text-foreground"
                            : "border-border/50 bg-card/50 text-muted-foreground hover:border-bio/50"
                        }`}
                      >
                        {type.name}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Volume */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Литраж
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {volumes.map((v) => (
                      <button
                        key={v.name}
                        type="button"
                        onClick={() => {
                          setVolume(v.name);
                        }}
                        className={`px-4 py-3 rounded-lg border transition-all text-sm ${
                          v.name === "Индивидуальный размер" || v.name === "Не знаю" ? "col-span-2" : ""
                        } ${
                          volume === v.name
                            ? "border-bio bg-bio/10 text-foreground"
                            : "border-border/50 bg-card/50 text-muted-foreground hover:border-bio/50"
                        }`}
                      >
                        {v.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Ваше имя
                  </label>
                  <Input
                    type="text"
                    placeholder="Иван"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-card/50 border-border/50 focus:border-bio"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Телефон *
                  </label>
                  <Input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-card/50 border-border/50 focus:border-bio"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Address - Full Width */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-foreground mb-3">
                Адрес (район)
              </label>
              <Input
                type="text"
                placeholder="Москва, Пресненский район"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-card/50 border-border/50 focus:border-bio"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-border/30">
              <p className="text-sm text-muted-foreground">
                Свяжемся для уточнения деталей и отправим КП в удобный мессенджер
              </p>
              <Button
                variant="bio"
                size="lg"
                onClick={handleContact}
                disabled={!isFormValid || isSubmitting}
                className="group"
              >
                {isSubmitting ? (
                  <span>Отправляем заявку...</span>
                ) : (
                  <>
                    <span>Обсудить проект</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
