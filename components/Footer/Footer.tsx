"use client";

import { FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(element, { offset: -80 });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className=" bg-white dark:bg-[#050505] text-gray-600 dark:text-gray-400 py-16 border-t border-black/5 dark:border-white/5 relative overflow-hidden transition-colors duration-300">
      {/* Subtle gold line accent */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-2 text-left">
            <div
              onClick={() => scrollToSection("hero")}
              className="cursor-pointer group inline-block"
            >
              <h3 className=" text-black dark:text-white text-lg md:text-xl font-serif font-semibold tracking-[0.2em] group-hover:text-gold transition-colors duration-300">
                ASKI FILMS
              </h3>
              <p className=" text-[7px] uppercase tracking-[0.45em] text-gray-500 dark:text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors duration-300 -mt-1 pl-0.5">
                Photography division
              </p>
            </div>
            <p className=" text-xs md:text-sm font-light max-w-sm leading-relaxed text-gray-600 dark:text-gray-500 transition-colors duration-300">
              A dedicated, film-crew grade photography team under the Aski Films production house umbrella. Bringing cinematic composition, lighting precision, and raw emotional storytelling to your special days.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className=" w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 hover:bg-gold hover:text-black flex items-center justify-center text-black dark:text-white transition-all duration-300 border border-black/5 dark:border-white/5"
              >
                <FaInstagram size={15} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className=" w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 hover:bg-gold hover:text-black flex items-center justify-center text-black dark:text-white transition-all duration-300 border border-black/5 dark:border-white/5"
              >
                <FaYoutube size={15} />
              </a>
              <a
                href="https://wa.me/919945969622"
                target="_blank"
                rel="noopener noreferrer"
                className=" w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 hover:bg-gold hover:text-black flex items-center justify-center text-black dark:text-white transition-all duration-300 border border-black/5 dark:border-white/5"
              >
                <FaWhatsapp size={15} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 text-left">
            <h4 className=" text-black dark:text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors duration-300">
              Explore
            </h4>
            <ul className="space-y-2 text-xs md:text-sm font-light">
              {[
                { name: "Home", id: "hero" },
                { name: "About", id: "about" },
                { name: "Services", id: "services" },
                { name: "Portfolio", id: "portfolio" },
                { name: "Approach", id: "approach" },
                { name: "Testimonials", id: "testimonials" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="hover:text-gold transition-colors duration-300 cursor-pointer"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts & Locations */}
          <div className="space-y-4 text-left">
            <h4 className="
  text-black
  dark:text-white
  text-xs
  uppercase
  tracking-[0.2em]
  font-semibold
  transition-colors
  duration-300
">
              Presence
            </h4>
            <div className="space-y-3 text-xs md:text-sm font-light">
              <div>
                <span className="text-gray-500 block uppercase tracking-wider text-[9px] mb-0.5">Headquarters</span>
                <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  Bengaluru, Karnataka, India
                </p>
              </div>
              <div>
                <span className="text-gray-500 block uppercase tracking-wider text-[9px] mb-0.5">Inquiries</span>
                <a
                  href="mailto:hello@askifilms.com"
                  className=" text-gray-700 dark:text-gray-300 hover:text-gold transition-colors duration-300 block"
                >
                  hello@askifilms.com
                </a>
                <a
                  href="tel:+919945969622"
                  className=" text-gray-700 dark:text-gray-300 hover:text-gold transition-colors duration-300 block mt-0.5"
                >
                  +91 99459 69622
                </a>
              </div>
              <p className="text-[10px] text-gold uppercase tracking-[0.15em] font-medium animate-pulse">
                Capturing stories worldwide
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className=" border-t border-black/5 dark:border-white/5 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-light text-gray-600 dark:text-gray-500 transition-colors duration-300">
          <p>© {new Date().getFullYear()} Aski Films. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <span className="text-gold">♥</span> by the Aski Production Team
          </p>
        </div>

      </div>
    </footer>
  );
}
