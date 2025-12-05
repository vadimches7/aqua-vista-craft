import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Шум будет?",
      answer:
        "Нет. Я подбираю оборудование так, чтобы его не было слышно. Уровень шума — не более 25–30 дБ, это тише разговора шёпотом.",
    },
    {
      question: "Будет ли запах?",
      answer:
        "Нет. Стабильная биология не пахнет. Запах возникает только при нарушении баланса, а моя задача — этого не допустить.",
    },
    {
      question: "Разводы на стекле?",
      answer:
        "Их не будет — чистое стекло моя профессиональная гордость. При регулярном обслуживании стёкла остаются идеально прозрачными.",
    },
    {
      question: "Сколько длится запуск?",
      answer:
        "От 7 до 14 дней — пока система становится устойчивой. Это время необходимо для созревания биологии и безопасного заселения рыб.",
    },
    {
      question: "Можно ли встроить аквариум в готовую мебель?",
      answer:
        "Да, я работаю с архитекторами и мебельщиками, чтобы аквариум выглядел как изначально запланированный элемент интерьера.",
    },
    {
      question: "Как часто нужно обслуживание?",
      answer:
        "Обычно 2–4 раза в месяц, в зависимости от объёма и типа аквариума. Премиум-системы требуют более частого внимания для идеальной картинки.",
    },
  ];

  return (
    <section id="faq" className="py-24 md:py-32 bg-gradient-dark relative">
      {/* Background */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-bio/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
              Частые <span className="text-gradient-bio">вопросы</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Адаптировано под премиальные интерьеры
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="card-premium border-border/50 px-6 data-[state=open]:border-bio/30"
              >
                <AccordionTrigger className="text-left font-serif text-lg hover:text-bio transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
