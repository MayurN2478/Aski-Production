"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Founder() {
  return (
    <section
      id="founder"
      className="relative py-24 md:py-36 bg-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Founder Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-white/10">

              <Image
                src="/images/founder.jpg"
                alt="Founder"
                fill
                className="object-cover"
              />

            </div>
          </motion.div>

          {/* Founder Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >

            <span className="text-gold uppercase tracking-[0.3em] text-[10px] md:text-xs font-semibold">
              Meet The Founder
            </span>

            <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-serif text-white">
              Hi, I'm Mayur
            </h2>

            <p className="mt-4 text-gold uppercase tracking-[0.2em] text-sm">
              Founder & Creative Director
            </p>

            <div className="mt-8 space-y-6 text-gray-300 leading-relaxed">

              <p>
                Photography has always been more than a profession for me.
                It is a way of preserving emotions, stories, and memories
                that deserve to be remembered for generations.
              </p>

              <p>
                Through Aski Films, my vision is to create cinematic,
                timeless imagery that reflects the genuine emotions
                behind every celebration.
              </p>

              <p>
                From weddings and pre-weddings to maternity and naming
                ceremonies, every frame we create is driven by passion,
                creativity, and attention to detail.
              </p>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}