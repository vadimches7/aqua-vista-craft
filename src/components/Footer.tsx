const Footer = () => {
  const currentYear = 2026;

  const links = [
    { label: "Услуги", href: "#services" },
    { label: "Процесс", href: "#installation-steps" },
    { label: "Кейсы", href: "#projects" },
    { label: "Контакты", href: "#contact" },
  ];

  return (
    <footer className="py-12 md:py-16 border-t border-border/30 bg-gradient-dark">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-8">
          {/* Logo and Company Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="/images/biocube-logo.png" 
                alt="BioCube Logo" 
                className="w-10 h-10 object-contain"
              />
              <span className="text-lg font-semibold">BioCube</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Премиальная студия аквадизайна
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-3">
            <span className="text-sm font-medium text-foreground mb-2">Навигация</span>
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-bio transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Company Details */}
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-foreground mb-2 text-foreground">Реквизиты</span>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>ИП Нелюбов Денис Евгеньевич</p>
              <p>ИНН: 774330502176</p>
              <p>ОГРНИП: 318774600189566</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} BioCube. Москва
          </p>
          <p className="text-xs text-muted-foreground/70">
            Все права защищены
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
