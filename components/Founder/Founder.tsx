"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Founder() {
  return (
    <section
      id="founder"
      className="
        relative
        py-24
        md:py-36
        bg-white
        dark:bg-[#050505]
        overflow-hidden
        border-b
        border-black/10
        dark:border-white/30
        transition-colors
        duration-300
        "
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid lg:grid-cols-12 gap-16 items-center">

          {/* Founder Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[4/5] overflow-hidden">

              <Image
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000"
                alt="Founder"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

            </div>
          </motion.div>

          {/* Founder Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >

            <span className="text-gold uppercase tracking-[0.35em] text-[10px] md:text-xs font-semibold">
              Meet The Founder
            </span>

            <h2 className=" mt-4 text-4xl md:text-5xl lg:text-6xl font-serif font-light text-black dark:text-white transition-colors duration-300 ">
              Hi, I'm Mayur
            </h2>

            <p className="mt-4 text-gold uppercase tracking-[0.25em] text-xs">
              Founder & Creative Director
            </p>

            <div className=" mt-8 space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed font-light transition-colors duration-300 ">

              <p className="text-black dark:text-white text-lg transition-colors duration-300">
                Photography is not just about creating beautiful images.
                It is about preserving emotions, relationships, and memories
                that become more valuable with time.
              </p>

              <p>
                As the founder of Aski Films, my vision has always been
                to blend cinematic storytelling with authentic human emotion.
                Every wedding, maternity shoot, naming ceremony, and celebration
                deserves to be documented with care and artistry.
              </p>

              <p>
                Together with an incredible team of photographers,
                cinematographers, and editors, we strive to create work
                that feels timeless, elegant, and deeply personal.
              </p>

            </div>

            <div className="mt-10 border-l border-gold/30 pl-6">

              <p className="text-gold italic font-serif text-xl">
                "Every frame should make you feel something."
              </p>

              <p className="mt-2 text-gray-600 dark:text-gray-500 uppercase tracking-[0.3em] text-[10px] transition-colors duration-300">
                — Mayur
              </p>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}