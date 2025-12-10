import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Home,
  Briefcase,
  Sparkles,
  TreePine,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  MapPin,
  Droplets,
  Target,
  CheckCircle2,
} from "lucide-react";

/**
 * Интерфейс проекта - структура данных для каждого кейса
 */
interface Project {
  id: number;
  icon: React.ElementType; // Иконка из lucide-react для отображения типа проекта
  location: string; // Локация проекта (Москва, Подмосковье и т.д.)
  type: string; // Тип помещения (Квартира, Офис и т.д.)
  volume: string; // Объём аквариума (240 л, 300 л и т.д.)
  style: string; // Стиль оформления (Interior Premium, Live Nature и т.д.)
  image: string; // Путь к изображению проекта
  challenge: string; // Задача/проблема клиента
  solution: string[]; // Массив решений Bio-Cube
  result: string; // Результат работы
  accent: string; // CSS класс для градиента фона (Tailwind)
}

/**
 * Компонент показа проектов/кейсов BioCube
 * Отображает портфолио с возможностью переключения между проектами
 * Поддерживает свайп на мобильных устройствах
 */
const ProjectsShowcase = () => {
  // Состояние активного проекта (индекс в массиве projects)
  const [activeProject, setActiveProject] = useState(0);
  
  // Состояние видимости для анимации появления
  const [isVisible, setIsVisible] = useState(false);
  
  // Рефы для DOM элементов
  const sectionRef = useRef<HTMLDivElement>(null); // Референс на секцию для IntersectionObserver
  const scrollRef = useRef<HTMLDivElement>(null); // Референс на горизонтальный скролл проектов
  
  // Рефы для обработки свайпа на мобильных устройствах
  const touchStartX = useRef<number | null>(null); // X координата начала касания
  const touchEndX = useRef<number | null>(null); // X координата конца касания

  const projects: Project[] = [
    {
      id: 1,
      icon: Building2,
      location: "Москва-Сити",
      type: "Квартира",
      volume: "240 л",
      style: "Interior Premium",
      image: "/images/projects/project-1.png",
      challenge: "Аквариум в гостиной с панорамными окнами — не должен спорить с видом на город",
      solution: [
        "Прямые линии, светлые коряги, акцент на глубине",
        "Тёплый свет, гармонирующий с вечерним освещением",
        "Минималистичный дизайн без визуального шума",
      ],
      result: "Живая перегородка между зонами, которая дополняет панораму, а не конкурирует с ней",
      accent: "from-blue-500/20 to-cyan-500/20",
    },
    {
      id: 2,
      icon: TreePine,
      location: "Подмосковье",
      type: "Загородный дом",
      volume: "300 л",
      style: "Live Nature",
      image: "/images/projects/project-2.png",
      challenge: "«Кусочек лесного ручья» напротив камина без ощущения зоомагазина",
      solution: [
        "Живые растения, натуральное дерево и камень",
        "Мягкий свет с эффектом природной глубины",
        "Биология настроена под тёплый воздух от камина",
      ],
      result: "Огонь + вода в одном кадре — живая картинка, на которую залипаешь вечерами",
      accent: "from-green-500/20 to-emerald-500/20",
    },
    {
      id: 3,
      icon: Briefcase,
      location: "Москва",
      type: "IT-офис",
      volume: "240 л",
      style: "Artificial Nature",
      image: "/images/projects/project-3.png",
      challenge: "Аквариум в open space, который выдержит рабочие будни без сложного ухода",
      solution: [
        "Искусственный декор + живые неприхотливые рыбы",
        "Техника под круглосуточную работу",
        "Защита от «случайных рук» и перекормов",
      ],
      result: "Точка притяжения команды и идеальный фон для созвонов с минимальным обслуживанием",
      accent: "from-violet-500/20 to-purple-500/20",
    },
    {
      id: 4,
      icon: Sparkles,
      location: "Москва",
      type: "Салон красоты",
      volume: "300 л",
      style: "Reef Style",
      image: "/images/projects/project-4.png",
      challenge: "«Вау-эффект» для зоны ожидания, чтобы гости фотографировали и делились",
      solution: [
        "Псевдоморе с яркой рыбой и сложным рельефом",
        "Холодный свет с эффектом океанической глубины",
        "Эффектный вид без сложной морской химии",
      ],
      result: "Живая «визитка» салона — гости снимают сторис, а бизнес получает бесплатный маркетинг",
      accent: "from-cyan-500/20 to-blue-500/20",
    },
    {
      id: 5,
      icon: Home,
      location: "Москва",
      type: "Квартира-студия",
      volume: "120 л",
      style: "Start Nature",
      image: "/images/projects/project-5.png",
      challenge: "Компактный живой аквариум для первой квартиры, который не станет «болотом»",
      solution: [
        "Простые живые растения и устойчивые виды рыб",
        "Свет и фильтрация с запасом мощности",
        "Понятная инструкция + опция обслуживания",
      ],
      result: "Свой маленький мир между кухней и диваном — уют без лишних хлопот",
      accent: "from-amber-500/20 to-orange-500/20",
    },
  ];

  /**
   * Функция переключения между проектами
   * @param direction - направление: "left" для предыдущего, "right" для следующего
   * Реализует циклическое переключение (после последнего идёт первый)
   */
  const scrollToProject = (direction: "left" | "right") => {
    if (direction === "left") {
      // Переход к предыдущему проекту, если это первый - переходим к последнему
      setActiveProject((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
    } else {
      // Переход к следующему проекту, если это последний - переходим к первому
      setActiveProject((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
    }
  };

  /**
   * Обработка начала касания для свайпа
   * Сохраняет начальную X координату касания
   */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  /**
   * Обработка движения пальца при свайпе
   * Обновляет конечную X координату
   */
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  /**
   * Обработка окончания касания
   * Вычисляет расстояние свайпа и переключает проект при достаточном расстоянии
   * Минимальное расстояние для срабатывания: 50px
   */
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    // Вычисляем расстояние свайпа (положительное = влево, отрицательное = вправо)
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50; // Минимальное расстояние для свайпа (в пикселях)

    if (distance > minSwipeDistance) {
      // Свайп влево - переходим к следующему проекту
      scrollToProject("right");
    } else if (distance < -minSwipeDistance) {
      // Свайп вправо - переходим к предыдущему проекту
      scrollToProject("left");
    }

    // Сбрасываем значения для следующего свайпа
    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const currentProject = projects[activeProject];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 md:py-32 bg-gradient-dark relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${currentProject.accent} transition-all duration-700 opacity-30`} />
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-bio/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-bio/3 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-bio text-sm font-medium tracking-widest uppercase mb-4">
            Портфолио
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
            Наши проекты{" "}
            <span className="text-gradient-bio">в интерьерах</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Каждый аквариум — под конкретное пространство и задачу. 
            Не шаблоны, а индивидуальные решения
          </p>
        </div>

        {/* Project selector - horizontal scroll */}
        <div className="mb-8">
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          >
            {projects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => setActiveProject(index)}
                className={`flex-shrink-0 snap-start px-5 py-3 rounded-xl border transition-all duration-300 ${
                  activeProject === index
                    ? "bg-bio/20 border-bio text-foreground"
                    : "bg-card/50 border-border/50 text-muted-foreground hover:border-bio/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <project.icon className={`w-5 h-5 ${activeProject === index ? "text-bio" : ""}`} />
                  <div className="text-left">
                    <div className="text-sm font-medium whitespace-nowrap">{project.type}</div>
                    <div className="text-xs opacity-70">{project.volume} • {project.style}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Основной блок отображения проекта с поддержкой свайпа */}
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          // Обработчики свайпа для мобильных устройств
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Сетка: на больших экранах 2 колонки, на мобильных - одна колонка */}
          <div className="grid lg:grid-cols-2 gap-6 items-start">
            {/* Блок с изображением проекта - уменьшен для лучшей видимости описания */}
            {/* Высота: 280px на мобильных, 320px на десктопе (было 400-500px) */}
            <div className="relative group">
              <div className="card-premium overflow-hidden rounded-xl min-h-[280px] lg:min-h-[320px] max-h-[320px]">
                <img
                  src={currentProject.image}
                  alt={`${currentProject.type} — ${currentProject.style}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = `https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80`;
                  }}
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                
                {/* Project badge */}
                <div className="absolute top-4 left-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/90 backdrop-blur-sm border border-border/50">
                    <MapPin className="w-4 h-4 text-bio" />
                    <span className="text-sm font-medium">{currentProject.location}</span>
                  </div>
                </div>

                {/* Volume badge */}
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-bio/90 backdrop-blur-sm">
                    <Droplets className="w-4 h-4 text-background" />
                    <span className="text-sm font-bold text-background">{currentProject.volume}</span>
                  </div>
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-sm text-bio font-medium mb-1">{currentProject.style}</div>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                    {currentProject.type}
                  </h3>
                </div>
              </div>

              {/* Navigation arrows */}
              <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
                <button
                  onClick={() => scrollToProject("left")}
                  className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground hover:bg-bio hover:text-background hover:border-bio transition-colors pointer-events-auto"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollToProject("right")}
                  className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground hover:bg-bio hover:text-background hover:border-bio transition-colors pointer-events-auto"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Блок с описанием проекта - теперь всегда видно, так как изображение уменьшено */}
            {/* На десктопе добавляем небольшой отступ сверху для выравнивания */}
            <div className="flex flex-col justify-start pt-0 lg:pt-4">
              {/* Challenge */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-amber" />
                  <span className="text-sm font-medium text-amber uppercase tracking-wider">Задача</span>
                </div>
                <p className="text-lg text-foreground leading-relaxed">
                  {currentProject.challenge}
                </p>
              </div>

              {/* Solution */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-bio" />
                  <span className="text-sm font-medium text-bio uppercase tracking-wider">Решение Bio-Cube</span>
                </div>
                <ul className="space-y-3">
                  {currentProject.solution.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-bio/60 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Result */}
              <div className="p-5 rounded-xl bg-bio/10 border border-bio/20">
                <div className="text-sm font-medium text-bio mb-2">Результат</div>
                <p className="text-foreground font-medium">
                  {currentProject.result}
                </p>
              </div>

              {/* Project counter */}
              <div className="mt-6 flex items-center justify-between">
                <div className="flex gap-2">
                  {projects.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveProject(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        activeProject === index
                          ? "w-8 bg-bio"
                          : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {activeProject + 1} / {projects.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="max-w-2xl mx-auto mb-8">
            <h3 className="text-xl md:text-2xl font-serif font-semibold text-foreground mb-3">
              Хотите аквариум, который так же естественно впишется в ваш интерьер?
            </h3>
            <p className="text-muted-foreground">
              Оставьте заявку — предложим 2–3 варианта под ваш объём и бюджет
            </p>
          </div>
          <Button
            variant="amber"
            size="xl"
            className="group"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>Обсудить мой проект</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
