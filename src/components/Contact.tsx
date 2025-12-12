import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { submitLead } from "@/lib/amocrm";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitLead({
        name: formData.name,
        phone: formData.phone,
        message: formData.message,
      });

      {
        toast({
          title: "Заявка отправлена!",
          description: "Отвечу в WhatsApp в течение часа.",
        });
        setFormData({ name: "", phone: "", message: "" });
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        title: "Ошибка отправки",
        description: "Попробуйте позже или свяжитесь через WhatsApp",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
            {/* Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="card-premium p-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">
                      Ваше имя
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Как к вам обращаться?"
                      className="bg-secondary/50 border-border/50 focus:border-bio"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">
                      Телефон
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+7 (___) ___-__-__"
                      className="bg-secondary/50 border-border/50 focus:border-bio"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">
                      Расскажите о проекте
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Стиль интерьера, примерный объём, пожелания..."
                      rows={4}
                      className="bg-secondary/50 border-border/50 focus:border-bio resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="amber"
                    size="xl"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                        Отправка...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Отправить заявку
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>

            {/* Info block (CTA перенесли под шаги) */}
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
