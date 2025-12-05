import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calculator as CalcIcon, ArrowRight } from "lucide-react";

const Calculator = () => {
  const [projectType, setProjectType] = useState("");
  const [volume, setVolume] = useState("");
  const [style, setStyle] = useState("");
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");

  const projectTypes = ["Обслуживание", "Перезапуск", "Установка под ключ"];
  const volumes = ["до 100 л", "100-250 л", "250-500 л", "более 500 л"];
  const styles = ["Травник", "Псевдоморе", "Биотоп", "Минимализм"];

  const handleSubmit = () => {
    const message = `Калькулятор проекта:\nТип: ${projectType}\nЛитраж: ${volume}\nСтиль: ${style}\nТелефон: ${phone}\nВремя: ${time}\nАдрес: ${address}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/79001234567?text=${encodedMessage}`, "_blank");
  };

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
                        key={type}
                        onClick={() => setProjectType(type)}
                        className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                          projectType === type
                            ? "border-bio bg-bio/10 text-foreground"
                            : "border-border/50 bg-card/50 text-muted-foreground hover:border-bio/50"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Style */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Стиль
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {styles.map((s) => (
                      <button
                        key={s}
                        onClick={() => setStyle(s)}
                        className={`px-4 py-3 rounded-lg border transition-all text-sm ${
                          style === s
                            ? "border-bio bg-bio/10 text-foreground"
                            : "border-border/50 bg-card/50 text-muted-foreground hover:border-bio/50"
                        }`}
                      >
                        {s}
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
                        key={v}
                        onClick={() => setVolume(v)}
                        className={`px-4 py-3 rounded-lg border transition-all text-sm ${
                          volume === v
                            ? "border-bio bg-bio/10 text-foreground"
                            : "border-border/50 bg-card/50 text-muted-foreground hover:border-bio/50"
                        }`}
                      >
                        {v}
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

                {/* Convenient Time */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Удобное время
                  </label>
                  <Input
                    type="text"
                    placeholder="Например: будни после 18:00"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
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

            {/* Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-border/30">
              <p className="text-sm text-muted-foreground">
                Отвечу в WhatsApp в течение часа
              </p>
              <Button
                variant="bio"
                size="lg"
                onClick={handleSubmit}
                className="group"
              >
                <span>Рассчитать стоимость</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
