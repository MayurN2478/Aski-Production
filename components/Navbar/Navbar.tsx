"use client";

import { useState, useEffect } from "react";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { label: "Home", id: "hero" },
    { label: "Founder", id: "founder" },
    { label: "Team", id: "team" },
    { label: "Services", id: "services" },
    { label: "Portfolio", id: "portfolio" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Book a Shoot", id: "booking", isCTA: true },
    ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Simple active section tracker
      const scrollPosition = window.scrollY + 120;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetHeight = el.offsetHeight;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(element, { offset: -80 });
      } else {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-500">
      <nav
        className={`transition-all duration-500 py-4 md:py-6 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-md border-b border-white/5 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              onClick={() => scrollToSection("hero")}
              className="cursor-pointer group"
            >
              <h1 className="text-white text-xl md:text-2xl font-serif font-semibold tracking-[0.2em] group-hover:text-gold transition-colors duration-300">
                ASKI FILMS
              </h1>
              <p className="text-[7px] md:text-[8px] uppercase tracking-[0.45em] text-gray-400 group-hover:text-white transition-colors duration-300 -mt-1 pl-0.5">
                Photography division
              </p>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest text-gray-400 font-sans">
              {navItems
                .filter((item) => !item.isCTA)
                .map((item) => (
                  <li
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`cursor-pointer transition-all duration-300 relative py-1 hover:text-white hover:scale-105 ${
                      activeSection === item.id ? "text-gold font-medium" : ""
                    }`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold animate-pulse" />
                    )}
                  </li>
                ))}
              {/* CTA Button */}
              {navItems
                .filter((item) => item.isCTA)
                .map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="px-6 py-2 border border-gold/40 hover:border-gold bg-gold/10 hover:bg-gold hover:text-black text-gold rounded-full transition-all duration-500 cursor-pointer font-medium"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
            </ul>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white hover:text-gold transition-colors duration-300"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <HiOutlineX size={24} /> : <HiOutlineMenuAlt3 size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-x-0 top-[76px] bg-black/95 backdrop-blur-xl border-b border-white/5 transition-all duration-500 ease-in-out md:hidden overflow-hidden ${
            isOpen ? "max-h-[400px] opacity-100 py-8" : "max-h-0 opacity-0 py-0"
          }`}
        >
          <ul className="flex flex-col items-center gap-6 text-sm uppercase tracking-widest text-gray-400 font-sans">
            {navItems.map((item) => (
              <li
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`cursor-pointer hover:text-gold transition-colors duration-300 ${
                  activeSection === item.id ? "text-gold" : ""
                } ${item.isCTA ? "px-6 py-2 border border-gold text-gold rounded-full mt-2" : ""}`}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}