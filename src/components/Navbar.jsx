import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Update active section based on scroll position
      const sections = ["hero", "about", "skills", "projects", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled 
          ? "py-3 bg-background/70 backdrop-blur-xl border-b border-primary/20 shadow-lg" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto max-w-7xl px-4 flex items-center justify-between">
        <a
          className="text-2xl font-bold text-gradient flex items-center gap-2 hover:opacity-80 transition-opacity"
          href="#hero"
        >
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-800 to-purple-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">P</span>
          </span>
          <span className="hidden sm:inline">Prakhar's Portfolio</span>
        </a>

        {/* desktop nav */}
        <div className="hidden md:flex space-x-1">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              className={cn(
                "px-4 py-2 rounded-full transition-all duration-300 font-medium",
                activeSection === item.href.slice(1)
                  ? "bg-primary/20 text-primary border border-primary/50"
                  : "text-foreground/70 hover:text-foreground hover:bg-primary/10"
              )}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* mobile nav */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-foreground z-50 hover:bg-primary/10 rounded-lg transition-colors"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-30 flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-6 text-lg">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className={cn(
                  "transition-colors duration-300 font-medium",
                  activeSection === item.href.slice(1)
                    ? "text-primary text-xl"
                    : "text-foreground/70 hover:text-primary"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
