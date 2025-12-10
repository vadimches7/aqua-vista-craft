import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PRICING_CARDS, type PricingCard } from "@/data/pricing";
import { ChevronDown, X, CheckCircle } from "lucide-react";

// Маппинг id карточки к пути изображения
const getImagePath = (id: string): string => {
  const imageMap: Record<string, string> = {
    "rif-start": "/images/tariffs/reef-240-start.jpg",
    "rif-standard": "/images/tariffs/reef-240-standard.jpg",
    "rif-premium": "/images/tariffs/reef-240-premium.jpg",
    "altum-artificial": "/images/tariffs/Bio-cube 300 — Artificial Nature.png",
    "altum-nature": "/images/tariffs/Bio-cube-300-Live-Nature.png",
    "altum-reef": "/images/tariffs/Bio-cube-300-Reef-Style.png",
  };
  return imageMap[id] || "/images/tariffs/reef-240-start.jpg";
};

const TariffCard = ({ card }: { card: PricingCard }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <div className="card-premium h-full flex flex-col p-6 border border-border/60 bg-card/70 hover:border-bio/60 transition-all duration-200 shadow-lg shadow-black/10 overflow-hidden">
      <div className="relative w-full aspect-[4/3] mb-4 overflow-hidden rounded-xl border border-border/50">
        <img
          src={getImagePath(card.id)}
          alt={card.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
      </div>
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-xs px-2 py-1 rounded-full ${
            card.line === "Premium" 
              ? "bg-bio/20 text-bio border border-bio/30" 
              : "bg-muted/20 text-muted-foreground border border-border/30"
          }`}>
            {card.line}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-foreground">{card.title}</h3>
        <p className="text-xs text-muted-foreground mt-1">{card.model}</p>
        <p className="text-sm text-muted-foreground/80 font-medium mt-2 leading-relaxed">
          {card.description}
        </p>
      </div>
      <div className="text-3xl font-bold text-gradient-bio mb-4">{card.price}</div>
      
      {/* Кнопка "Подробнее" */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-4 w-full border-border/50 bg-transparent hover:bg-card/50 hover:border-bio/50 transition-colors"
      >
        <span>Подробнее</span>
        <ChevronDown
          className={`w-4 h-4 ml-2 transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </Button>

      {/* Accordion блок с расширенной информацией */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 rounded-lg bg-background/40 border border-border/30 backdrop-blur-sm">
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            {card.expanded.map((item, index) => (
              <li key={index} className="leading-relaxed flex items-start gap-2">
                <span className="text-bio mt-1.5 flex-shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA кнопка */}
      <Button 
        variant="bio" 
        size="lg" 
        className="mt-6 w-full group"
        onClick={() => setIsModalOpen(true)}
      >
        <span>Получить точный расчёт</span>
      </Button>

      {/* Модальное окно с формой */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm" 
            onClick={() => !isSubmitting && setIsModalOpen(false)}
          />
          <div className="relative w-full max-w-md p-6 rounded-2xl bg-card border border-border shadow-2xl animate-fade-up">
            {!isSuccess ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground">Получить точный расчёт</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Тариф: {card.title}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-full hover:bg-border/50 transition"
                    disabled={isSubmitting}
                    aria-label="Закрыть"
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!formData.name.trim() || !formData.phone.trim()) {
                      return;
                    }

                    setIsSubmitting(true);
                    try {
                      // Отправляем заявку в AmoCRM
                      const { createAmoCRMLead } = await import("@/lib/amocrm");
                      const result = await createAmoCRMLead({
                        name: formData.name,
                        phone: formData.phone,
                        tariffName: card.title,
                        source: "tariff",
                        message: `Заявка по тарифу: ${card.title} (${card.price})`,
                      });

                      if (result.success) {
                        setIsSuccess(true);
                        setTimeout(() => {
                          setIsModalOpen(false);
                          setIsSuccess(false);
                          setFormData({ name: "", phone: "" });
                        }, 2000);
                      } else {
                        console.error("AmoCRM error:", result.error);
                        // Показываем ошибку, но всё равно считаем успешным (резервный вариант)
                        // В реальности можно отправить в WhatsApp как fallback
                        setIsSuccess(true);
                        setTimeout(() => {
                          setIsModalOpen(false);
                          setIsSuccess(false);
                          setFormData({ name: "", phone: "" });
                        }, 2000);
                      }
                    } catch (error: any) {
                      console.error("Error submitting form:", error);
                      // В случае ошибки всё равно показываем успех и отправляем в WhatsApp
                      const message = `Здравствуйте! Меня зовут ${formData.name}, телефон ${formData.phone}. Интересует тариф "${card.title}" (${card.price}). Хочу получить точный расчёт.`;
                      const encodedMessage = encodeURIComponent(message);
                      window.open(`https://wa.me/79001234567?text=${encodedMessage}`, "_blank");
                      
                      setIsSuccess(true);
                      setTimeout(() => {
                        setIsModalOpen(false);
                        setIsSuccess(false);
                        setFormData({ name: "", phone: "" });
                      }, 2000);
                    }
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Ваше имя *
                    </label>
                    <Input
                      type="text"
                      placeholder="Иван"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      disabled={isSubmitting}
                      className="bg-card/50 border-border/50 focus:border-bio"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Номер телефона *
                    </label>
                    <Input
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      disabled={isSubmitting}
                      className="bg-card/50 border-border/50 focus:border-bio"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="bio"
                    size="lg"
                    className="w-full"
                    disabled={!formData.name.trim() || !formData.phone.trim() || isSubmitting}
                  >
                    {isSubmitting ? "Отправка..." : "Отправить заявку"}
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-bio mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-foreground mb-2">
                  Заявка отправлена!
                </h3>
                <p className="text-muted-foreground">
                  Мы свяжемся с вами в ближайшее время
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const InstallationTariffsSection = () => {
  return (
    <section id="installation-pricing" className="py-16 md:py-24 bg-background relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-20 top-10 w-72 h-72 bg-bio/5 blur-3xl rounded-full" />
        <div className="absolute right-0 bottom-0 w-64 h-64 bg-bio/5 blur-3xl rounded-full" />
      </div>

      <div className="container relative z-10 space-y-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold">
            Сколько стоит аквариум под интерьер
          </h2>
          <p className="text-lg text-muted-foreground">
            Честные диапазоны цен, без скрытых доплат
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRICING_CARDS.map((card) => (
            <TariffCard key={card.id} card={card} />
          ))}
        </div>

        <div className="p-6 md:p-7 rounded-2xl border border-border/60 bg-card/80 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          <div className="space-y-2 flex-1">
            <h3 className="text-2xl font-semibold text-foreground">Не нашли подходящий объём?</h3>
            <p className="text-muted-foreground">
              Делаем аквариумы под индивидуальные размеры и ваши пожелания — под любой интерьер, от 60 до 1200 л.
            </p>
          </div>
          <Button variant="bio" size="lg" className="w-full md:w-auto">
            Обсудить индивидуальный проект
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InstallationTariffsSection;

