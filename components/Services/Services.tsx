"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const services = [
  {
    num: "01",
    title: "Wedding Storytelling",
    description:
      "A complete cinematic capture of your wedding. We focus on candid emotions, heritage details, and epic celebrations with dual-angle crews and signature colour-grading.",
    features: ["Candid & Traditional Teams", "Same-Day Preview Album", "Luxury Leather Highlight Book", "Cinematic 4K Highlights Film"],
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800",
  },
  {
    num: "02",
    title: "Pre-Wedding Narratives",
    description:
      "Telling your unique love story in scenic locales. Guided direction, cinematic drone footage, and customized storyboards ensure a tailored experience.",
    features: ["Location & Wardrobe Scouting", "Cinematic Video Invite", "Next-Day Socials Teaser", "Full High-Res Digital Gallery"],
    image: "https://images.unsplash.com/photo-1519225495810-7517c300ea84?q=80&w=800",
  },
  {
    num: "03",
    title: "Sacred Naming Ceremonies",
    description:
      "Capturing the delicate, warm family bonds during your little one's naming or cradle ceremony. Soft ambient lighting and quick delivery ensure beautiful, raw family memories.",
    features: ["Baby-Friendly Silent Shutter", "Immediate Family Portraits", "Quick 48hr Raw File Delivery", "Custom-Printed Keepsake Box"],
    image: "https://images.unsplash.com/photo-1544126592-807adc2b5283?q=80&w=800",
  },
  {
    num: "04",
    title: "Artistic Maternity Shoots",
    description:
      "Graceful, tender, and editorial portraits celebrating the beauty of motherhood. We provide guidance on comfortable poses and elegant silhouettes.",
    features: ["Indoor Studio or Outdoor Scenic", "Partner & Family Inclusion", "Guided Silhouette Styling", "Gently Retouched Digital Art"],
    image: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=800",
  },
  {
    num: "05",
    title: "Editorial & Portraits",
    description:
      "High-fashion portfolios, headshots, commercial products, or personal brand assets. Crafted with professional studio lighting and fine-art retouching.",
    features: ["Professional Studio Lighting", "Creative Art Direction", "High-End Skin Retouching", "Commercial Usage License"],
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800",
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
      className="py-24 md:py-36 bg-charcoal border-y border-white/5 relative overflow-hidden"
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white leading-tight">
            Our Photography <span className="font-serif italic text-gold font-normal">Specialities</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base font-light max-w-xl mx-auto">
            From the grandest celebration to the quietest milestone, we document your life with a signature cinematic style.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative flex flex-col justify-between h-[450px] overflow-hidden rounded-sm border border-white/5 bg-black/40 hover:border-gold/30 transition-all duration-500 shadow-xl"
            >
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-w-7xl) 33vw, 100vw"
                  className="object-cover opacity-20 scale-[1.05] group-hover:scale-110 group-hover:opacity-30 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
              </div>

              {/* Card Top */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-gold font-serif italic text-4xl font-light opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                    {service.num}
                  </span>
                  <div className="w-8 h-[1px] bg-gold/30 group-hover:w-16 transition-all duration-500 mt-5" />
                </div>
                
                <h3 className="text-xl md:text-2xl font-serif text-white mb-4 group-hover:text-gold transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed mb-6 group-hover:text-gray-300 transition-colors duration-300">
                  {service.description}
                </p>
              </div>

              {/* Card Bottom / Features List */}
              <div className="p-8 pt-0 mt-auto">
                <ul className="space-y-2 mb-6 border-t border-white/5 pt-4 text-left">
                  {service.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-[10px] md:text-xs text-gray-400 font-light">
                      <span className="w-1 h-1 rounded-full bg-gold" />
                      {feat}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleScrollToBooking}
                  className="w-full py-2.5 border border-white/10 hover:border-gold group-hover:bg-gold hover:text-black rounded-sm text-xs font-semibold uppercase tracking-wider text-gray-300 hover:text-black transition-all duration-500 cursor-pointer"
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
