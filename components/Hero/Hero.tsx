"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const handleScroll = (id: string) => {
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
    <section
      id="hero"
      className="relative h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover scale-[1.02]"
      >
        <source
          src="/videos/video1.mp4"
          type="video/mp4"
        />
      </video>

      {/* Luxury Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/95 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 max-w-5xl mt-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="uppercase tracking-[0.4em] text-gold text-[10px] md:text-xs font-semibold mb-6"
        >
          Weddings • Portraits • Cinematic Storytelling
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="text-5xl md:text-8xl lg:text-9xl font-serif font-light text-white tracking-wide leading-none select-none"
        >
          ASKI <span className="font-serif italic font-normal text-gold">FILMS</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.7 }}
          className="mt-8 max-w-2xl text-gray-300 text-sm md:text-base lg:text-lg font-light tracking-wide leading-relaxed"
        >
          Preserving raw emotions, candid glances, and crafting timeless visual stories
          through a dedicated production-grade photography team.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 flex flex-col sm:flex-row gap-5 z-30"
        >
          <button
            onClick={() => handleScroll("portfolio")}
            className="px-8 py-3.5 bg-gold hover:bg-gold-dark text-black rounded-full font-medium tracking-wider text-xs uppercase transition-all duration-300 cursor-pointer shadow-lg hover:scale-105"
          >
            Explore Portfolio
          </button>
          <button
            onClick={() => handleScroll("booking")}
            className="px-8 py-3.5 border border-white/20 hover:border-gold text-white hover:text-gold rounded-full font-medium tracking-wider text-xs uppercase transition-all duration-300 cursor-pointer hover:bg-white/5"
          >
            Book a Shoot
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
        onClick={() => handleScroll("about")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 hover:text-gold cursor-pointer z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-sans">Scroll</span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  );
}