const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: "Услуги", href: "#services" },
    { label: "Процесс", href: "#process" },
    { label: "Кейсы", href: "#cases" },
    { label: "Тарифы", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "Контакты", href: "#contact" },
  ];

  return (
    <footer className="py-12 border-t border-border/30">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-bio flex items-center justify-center">
              <span className="text-xl font-serif font-bold text-primary-foreground">B</span>
            </div>
            <span className="text-lg font-semibold">BioCube</span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6">
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

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {currentYear} BioCube. Москва
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
