"use client";

import { useState, useEffect } from "react";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { useTheme } from "next-themes";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const { theme } = useTheme();

  const navItems = [
    { label: "Home", id: "hero" },
    { label: "Founder", id: "founder" },
    { label: "Team", id: "team" },
    { label: "Services", id: "services" },
    { label: "Portfolio", id: "portfolio" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Book a Shoot", id: "booking", isCTA: true },
  ];

  const useDarkText =
    theme === "light" &&
    isPastHero &&
    !isOpen;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const hero = document.getElementById("hero");

      if (hero) {
        setIsPastHero(
          window.scrollY > hero.offsetHeight - 100
        );
      }

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

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);

    const element = document.getElementById(id);

    if (element) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(element, {
          offset: -80,
        });
      } else {
        const offset = 80;
        const bodyRect =
          document.body.getBoundingClientRect().top;

        const elementRect =
          element.getBoundingClientRect().top;

        const elementPosition =
          elementRect - bodyRect;

        const offsetPosition =
          elementPosition - offset;

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
        className={`transition-all duration-500 ${
          isScrolled
            ? useDarkText
              ? "bg-white/90 backdrop-blur-md border-b border-black/5 py-4"
              : "bg-black/80 backdrop-blur-md border-b border-white/5 py-4"
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
              <h1
                className={`
                  text-xl
                  md:text-2xl
                  font-serif
                  font-semibold
                  tracking-[0.2em]
                  transition-colors
                  duration-300
                  group-hover:text-gold
                  ${
                    useDarkText
                      ? "text-black"
                      : "text-white"
                  }
                `}
              >
                ASKI FILMS
              </h1>

              <p
                className={`
                  text-[7px]
                  md:text-[8px]
                  uppercase
                  tracking-[0.45em]
                  transition-colors
                  duration-300
                  -mt-1
                  pl-0.5
                  ${
                    useDarkText
                      ? "text-gray-600"
                      : "text-gray-300"
                  }
                `}
              >
                Photography Division
              </p>
            </div>

            {/* Desktop Menu */}
            <ul
              className={`
                hidden
                md:flex
                items-center
                gap-8
                text-sm
                uppercase
                tracking-widest
                font-sans
                transition-colors
                duration-300
                ${
                  useDarkText
                    ? "text-gray-700"
                    : "text-gray-300"
                }
              `}
            >
              {navItems
                .filter((item) => !item.isCTA)
                .map((item) => (
                  <li
                    key={item.id}
                    onClick={() =>
                      scrollToSection(item.id)
                    }
                    className={`
                      cursor-pointer
                      relative
                      py-1
                      transition-all
                      duration-300
                      hover:scale-105
                      ${
                        activeSection === item.id
                          ? "text-gold font-medium"
                          : useDarkText
                          ? "hover:text-black"
                          : "hover:text-white"
                      }
                    `}
                  >
                    {item.label}

                    {activeSection === item.id && (
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold animate-pulse" />
                    )}
                  </li>
                ))}

              {/* CTA */}
              <li>
                <button
                  onClick={() =>
                    scrollToSection("booking")
                  }
                  className="px-6 py-2 border border-gold/40 hover:border-gold bg-gold/10 hover:bg-gold hover:text-black text-gold rounded-full transition-all duration-500 cursor-pointer font-medium"
                >
                  Book a Shoot
                </button>
              </li>
            </ul>

            {/* Mobile Button */}
            <button
              className={`
                md:hidden
                transition-colors
                duration-300
                ${
                  useDarkText
                    ? "text-black"
                    : "text-white"
                }
                hover:text-gold
              `}
              onClick={() =>
                setIsOpen(!isOpen)
              }
            >
              {isOpen ? (
                <HiOutlineX size={24} />
              ) : (
                <HiOutlineMenuAlt3 size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-x-0 top-[76px] backdrop-blur-xl transition-all duration-500 ease-in-out md:hidden overflow-hidden ${
            isOpen
              ? "max-h-[400px] opacity-100 py-8"
              : "max-h-0 opacity-0 py-0"
          } ${
            useDarkText
              ? "bg-white/95 border-b border-black/5"
              : "bg-black/95 border-b border-white/5"
          }`}
        >
          <ul
            className={`
              flex
              flex-col
              items-center
              gap-6
              text-sm
              uppercase
              tracking-widest
              font-sans
              ${
                useDarkText
                  ? "text-gray-700"
                  : "text-gray-300"
              }
            `}
          >
            {navItems.map((item) => (
              <li
                key={item.id}
                onClick={() =>
                  scrollToSection(item.id)
                }
                className={`
                  cursor-pointer
                  transition-colors
                  duration-300
                  ${
                    activeSection === item.id
                      ? "text-gold"
                      : ""
                  }
                  ${
                    item.isCTA
                      ? "px-6 py-2 border border-gold text-gold rounded-full mt-2"
                      : ""
                  }
                `}
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