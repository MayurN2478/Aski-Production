"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiStar } from "react-icons/hi";

const testimonials = [
  {
    quote:
      "Working with Aski Films' photography team has been a true delight. Their professionalism in both photography and communication is exceptional. The crew did a fantastic job capturing our son's naming ceremony, and the best part was getting the raw photos delivered on the same day! Highly recommended.",
    author: "Girish Srinivasagopalan",
    role: "Naming Ceremony Photoshoot",
    rating: 5,
  },
  {
    quote:
      "It has been an absolute pleasure working with the Aski team! The quality, the delivery, and time management have been the best so far. We had our edited wedding highlights within a day after our ceremony! We were absolutely surprised at the speed and execution. They really understand what is needed.",
    author: "Smitha Parthasarathy",
    role: "Heritage Wedding",
    rating: 5,
  },
  {
    quote:
      "Aski Films exceeded our expectations at our naming ceremony. The crew was professional, fun to work with, and captured excellent photos. They understood our vision, blended seamlessly into the crowd, and delivered stunning, emotion-filled images on time. Their enthusiasm was contagious.",
    author: "Yuktha N Urs",
    role: "Cradle & Naming Ceremony",
    rating: 5,
  },
  {
    quote:
      "The photography team was not just masters behind the lenses, but true professionals. From arriving early on-set, to capturing our special moments, they maintained a friendly and approachable behavior. They made us feel at ease and super comfortable during the entire shoot.",
    author: "Anusha BS",
    role: "Pre-Wedding Shoot",
    rating: 5,
  },
  {
    quote:
      "Extremely professional crew! Every time we requested specific family groupings, they obliged and recommended beautiful angles. The raw photos provided are gorgeous and we are excited for the edited album. They have captured precious moments of the wedding. Highly recommend Aski!",
    author: "Deepak S. (DS)",
    role: "Destination Wedding & Reception",
    rating: 5,
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextTestimonial = () => {
    setDirection(1);
    setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-play testimonials
  useEffect(() => {
    const timer = setInterval(nextTestimonial, 8000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <section
      id="testimonials"
      className="py-24 md:py-36 bg-white dark:bg-[#050505] relative overflow-hidden border-y border-black/5 dark:border-white/5 transition-colors duration-300">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-gold/5 rounded-full blur-[120px] -translate-y-1/2 -z-10" />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">

        <div className="mb-16 space-y-4">
          <span className="text-gold uppercase tracking-[0.3em] text-[10px] md:text-xs font-semibold block">
            Testimonials
          </span>

          <h2
            className="
              text-4xl
              md:text-5xl
              font-serif
              font-light
              text-black
              dark:text-white
              leading-tight
              transition-colors
              duration-300
            "
          >
            Loved by{" "}
            <span className="font-serif italic text-gold font-normal">
              Families
            </span>
          </h2>
        </div>

        <div className="relative min-h-[320px] sm:min-h-[250px] flex items-center justify-center">

          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="space-y-6 max-w-3xl px-4"
            >

              <div className="flex justify-center gap-1">
                {[...Array(testimonials[index].rating)].map((_, i) => (
                  <HiStar
                    key={i}
                    className="text-gold text-lg md:text-xl"
                  />
                ))}
              </div>

              <blockquote
                className="
                  text-lg
                  md:text-2xl
                  font-serif
                  font-light
                  italic
                  text-gray-800
                  dark:text-gray-200
                  leading-relaxed
                  max-w-2xl
                  mx-auto
                  transition-colors
                  duration-300
                "
              >
                "{testimonials[index].quote}"
              </blockquote>

              <div className="space-y-1">
                <h4
                  className="
                    text-black
                    dark:text-white
                    text-sm
                    md:text-base
                    font-semibold
                    uppercase
                    tracking-wider
                    transition-colors
                    duration-300
                  "
                >
                  {testimonials[index].author}
                </h4>

                <p className="text-gold text-[10px] md:text-xs uppercase tracking-widest font-light">
                  {testimonials[index].role}
                </p>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>

        <div className="flex justify-center items-center gap-8 mt-12">

          <button
            onClick={prevTestimonial}
            className="
              w-10
              h-10
              border
              border-black/10
              dark:border-white/10
              hover:border-gold
              hover:text-black
              hover:bg-gold
              rounded-full
              flex
              items-center
              justify-center
              text-black
              dark:text-white
              transition-all
              duration-300
              cursor-pointer
            "
          >
            <HiOutlineChevronLeft size={18} />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > index ? 1 : -1);
                  setIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  index === idx
                    ? "w-6 bg-gold"
                    : "w-1.5 bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="
              w-10
              h-10
              border
              border-black/10
              dark:border-white/10
              hover:border-gold
              hover:text-black
              hover:bg-gold
              rounded-full
              flex
              items-center
              justify-center
              text-black
              dark:text-white
              transition-all
              duration-300
              cursor-pointer
            "
          >
            <HiOutlineChevronRight size={18} />
          </button>

        </div>



      </div>
    </section>

  );
}
