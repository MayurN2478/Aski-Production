"use client";

import { motion } from "framer-motion";

const services = [
  {
    num: "01",
    title: "Wedding Storytelling",
    description:
      "A complete cinematic capture of your wedding. We focus on candid emotions, heritage details, and epic celebrations with dual-angle crews and signature colour-grading.",
    features: ["Candid & Traditional Teams", "Same-Day Preview Album", "Luxury Leather Highlight Book", "Cinematic 4K Highlights Film"],
  },
  {
    num: "02",
    title: "Pre-Wedding Narratives",
    description:
      "Telling your unique love story in scenic locales. Guided direction, cinematic drone footage, and customized storyboards ensure a tailored experience.",
    features: ["Location & Wardrobe Scouting", "Cinematic Video Invite", "Next-Day Socials Teaser", "Full High-Res Digital Gallery"],
  },
  {
    num: "03",
    title: "Sacred Naming Ceremonies",
    description:
      "Capturing the delicate, warm family bonds during your little one's naming or cradle ceremony. Soft ambient lighting and quick delivery ensure beautiful, raw family memories.",
    features: ["Baby-Friendly Silent Shutter", "Immediate Family Portraits", "Quick 48hr Raw File Delivery", "Custom-Printed Keepsake Box"],
  },
  {
    num: "04",
    title: "Artistic Maternity Shoots",
    description:
      "Graceful, tender, and editorial portraits celebrating the beauty of motherhood. We provide guidance on comfortable poses and elegant silhouettes.",
    features: ["Indoor Studio or Outdoor Scenic", "Partner & Family Inclusion", "Guided Silhouette Styling", "Gently Retouched Digital Art"],
  },
  {
    num: "05",
    title: "Editorial & Portraits",
    description:
      "High-fashion portfolios, headshots, commercial products, or personal brand assets. Crafted with professional studio lighting and fine-art retouching.",
    features: ["Professional Studio Lighting", "Creative Art Direction", "High-End Skin Retouching", "Commercial Usage License"],
  },
];

export default function Services() {
  const handleScrollToBooking = () => {
    const el = document.getElementById("booking");
    if (el) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(el, { offset: -80 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="services"
      className=" py-24 md:py-36 bg-white dark:bg-charcoal border-y border-black/5 dark:border-white/5 relative overflow-hidden transition-colors duration-300 "
    >
      {/* Background design elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-gold uppercase tracking-[0.3em] text-[10px] md:text-xs font-semibold block animate-pulse">
            Services & Wings
          </span>
          <h2 className=" text-4xl md:text-5xl lg:text-6xl font-serif font-light text-black dark:text-white leading-tight transition-colors duration-300 ">
            Our Photography <span className="font-serif italic text-gold font-normal">Specialities</span>
          </h2>
          <p className=" text-gray-600 dark:text-gray-400 text-sm md:text-base font-light max-w-xl mx-auto transition-colors duration-300 ">
            From the grandest celebration to the quietest milestone, we document your life with a signature cinematic style.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          {services.map((service, index) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -8,
                transition: {
                  duration: 0.25,
                  ease: "easeOut",
                },
              }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className=" group relative flex flex-col h-full rounded-sm border border-black/5 dark:border-white/5 bg-gray-50 dark:bg-[#0d0d0d] hover:border-gold/50 transition-colors duration-300 shadow-lg hover:shadow-2xl"
            >
            <div
              className=" absolute inset-0 bg-gradient-to-br from-gold/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
            "
            />
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <span className=" text-gold font-serif italic text-4xl font-light opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    {service.num}
                  </span>
                  <div className="w-8 h-[1px] bg-gold/30 group-hover:w-16 transition-[width] duration-300 ease-out mt-5" />
                </div>
                
                <h3 className=" text-xl md:text-2xl font-serif text-black dark:text-white mb-4 group-hover:text-gold transition-colors duration-300 ">
                  {service.title}
                </h3>
              
                <p className=" text-gray-600 dark:text-gray-400 text-xs md:text-sm font-light leading-relaxed mb-6 group-hover:text-gray-800 dark:group-hover:text-gray-300 transition-colors duration-300 ">
                  {service.description}
                </p>
              </div>

              {/* Card Bottom / Features List */}
              <div className="px-8 pb-8 pt-0 mt-auto">
                <ul className=" space-y-2 mb-6 border-t border-black/5 dark:border-white/5 pt-4 text-left transition-colors duration-300 ">
                  {service.features.map((feat) => (
                    <li key={feat} className=" flex items-center gap-2 text-[10px] md:text-xs text-gray-600 dark:text-gray-400 font-light transition-colors duration-300 ">
                      <span className="w-1 h-1 rounded-full bg-gold" />
                      {feat}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleScrollToBooking}
                  className=" w-full py-2.5 border border-black/10 dark:border-white/10 hover:border-gold hover:bg-gold hover:text-black rounded-sm text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 transition-colors duration-300 cursor-pointer"
                >
                  Book photoshoot
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
