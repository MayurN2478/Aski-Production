"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="
        relative
        py-24
        md:py-36
        bg-white
        dark:bg-[#050505]
        overflow-hidden
        border-b
        border-black/5
        dark:border-white/5
        transition-colors
        duration-300
      "
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Content Column */}
          <div className="lg:col-span-6 space-y-8">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <span className="text-gold uppercase tracking-[0.3em] text-[10px] md:text-xs font-semibold block">
                Our Philosophy
              </span>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-black dark:text-white leading-tight transition-colors duration-300">
                Crafting Stories <br />
                <span className="font-serif italic text-gold font-normal">
                  That Last
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 text-gray-700 dark:text-gray-300 font-light leading-relaxed text-sm md:text-base transition-colors duration-300"
            >
              <p className="text-black dark:text-white font-normal text-base md:text-lg transition-colors duration-300">
                We capture what's real: the unguarded glances, the quiet
                in-betweens, the moments you didn't rehearse. Authentic honesty
                with a timeless, cinematic eye.
              </p>

              <p>
                As a premier production house, Aski Films brings a unique
                advantage to the world of photography. Our dedicated photography
                division operates with the precision, lighting mastery, and
                narrative direction of a cinematic film crew. We don't just click
                pictures; we compose frames that evoke the deep emotions of your
                milestone.
              </p>

              <p>
                Whether celebrating a grand heritage wedding, a romantic
                pre-wedding getaway, a quiet maternity blessing, or a joyous
                naming ceremony, we preserve each chapter with utmost care. By
                combining high-end cinematic technology with a human-centered,
                unobtrusive approach, we deliver art that feels alive years from
                now.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="border-l border-gold/30 pl-6 space-y-2 pt-4"
            >
              <p className="text-gold italic font-serif text-lg">
                "The details fade. The feeling doesn't."
              </p>

              <p className="text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400 transition-colors duration-300">
                — Aski Films Photography Division
              </p>
            </motion.div>

          </div>

          {/* Graphic Column */}
          <div className="lg:col-span-6 relative mt-12 lg:mt-0">

            <div className="relative w-full aspect-[4/5] max-w-[450px] mx-auto">

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className="w-full h-full relative overflow-hidden rounded-sm grayscale-[20%] hover:grayscale-0 transition-all duration-700 shadow-2xl border border-black/5 dark:border-white/5"
              >
                <Image
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000"
                  alt="Cinematic Wedding Shoot"
                  fill
                  sizes="(max-width:1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50, y: 50 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute -bottom-8 -right-8 w-1/2 aspect-square overflow-hidden rounded-sm border-4 border-white dark:border-[#050505] shadow-2xl hidden sm:block grayscale-[40%] hover:grayscale-0 transition-all duration-500"
              >
                <Image
                  src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600"
                  alt="Photography Camera Details"
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
              </motion.div>

              <div className="absolute -top-4 -left-4 w-12 h-12 border-t border-l border-gold/40" />
              <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b border-l border-gold/40" />

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}