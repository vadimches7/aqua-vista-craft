import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calculator as CalcIcon, ArrowRight, CheckCircle } from "lucide-react";

const Calculator = () => {
  const [projectType, setProjectType] = useState("");
  const [volume, setVolume] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [showResult, setShowResult] = useState(false);

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

  const handleCalculate = () => {
    if (projectType && volume) {
      setShowResult(true);
    }
  };

  const handleContact = async () => {
    // Отправляем в AmoCRM
    const { createAmoCRMLead } = await import("@/lib/amocrm");
    const result = await createAmoCRMLead({
      name: phone ? `Клиент ${phone}` : "Клиент",
      phone: phone,
      projectType: projectType,
      volume: volume,
      calculatedPrice: calculatedPrice || undefined,
      address: address,
      source: "calculator",
    });

    // Также отправляем в WhatsApp (как резервный вариант)
    const message = `Заявка с калькулятора:\nТип: ${projectType}\nЛитраж: ${volume}\nРасчётная стоимость: от ${calculatedPrice?.toLocaleString("ru-RU")} ₽\nТелефон: ${phone}\nАдрес: ${address}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/79001234567?text=${encodedMessage}`, "_blank");
  };

  const isFormValid = projectType && volume;

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
            Средняя стоимость установки 120–300 тыс. ₽, обслуживание от 4 500 ₽/выезд. Узнаем точнее за 2 минуты.
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
                          setShowResult(false);
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
                          setShowResult(false);
                        }}
                        className={`px-4 py-3 rounded-lg border transition-all text-sm ${
                          v.name === "Индивидуальный размер" ? "col-span-2" : ""
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

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Телефон
                  </label>
                  <Input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-card/50 border-border/50 focus:border-bio"
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

            {/* Result Block */}
            {showResult && calculatedPrice && (
              <div className="mt-8 p-6 rounded-xl bg-bio/10 border border-bio/30 animate-fade-up">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-bio" />
                  <span className="text-lg font-medium text-foreground">Предварительный расчёт</span>
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-sm text-muted-foreground">Стоимость от</span>
                  <span className="text-4xl font-bold text-gradient-bio">
                    {calculatedPrice.toLocaleString("ru-RU")}
                  </span>
                  <span className="text-xl text-muted-foreground">₽</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Точная стоимость зависит от сложности проекта и особенностей места установки
                </p>
                <Button
                  variant="bio"
                  size="lg"
                  onClick={handleContact}
                  className="w-full sm:w-auto group"
                >
                  <span>Обсудить проект в WhatsApp</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            )}

            {/* Footer */}
            {!showResult && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-border/30">
                <p className="text-sm text-muted-foreground">
                  Отвечу в WhatsApp в течение часа
                </p>
                <Button
                  variant="bio"
                  size="lg"
                  onClick={handleCalculate}
                  disabled={!isFormValid}
                  className="group"
                >
                  <span>Рассчитать стоимость</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
