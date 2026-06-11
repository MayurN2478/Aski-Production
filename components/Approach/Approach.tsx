"use client";

import { motion } from "framer-motion";

const steps = [
{
num: "01",
phase: "Pre-Production",
title: "Concept & Styling",
description:
"Every great shoot starts with a narrative. We sit down with you to outline the vision, coordinate style guides, scout breathtaking locations, and structure a custom storyboard tailored to your vibe.",
bullets: [
"Custom mood boards & styling guides",
"Locale & site scouting",
"Detailed timeline preparation",
],
},
{
num: "02",
phase: "Production",
title: "Cinematic Shoot",
description:
"We orchestrate the shoot with a dedicated, silent crew using cutting-edge cameras and lenses. By combining gentle, conversational direction with cinematic lighting, we make you feel comfortable and natural.",
bullets: [
"Conversational, stress-free direction",
"High-end prime lenses & cinema cameras",
"Dual backup storage on-set",
],
},
{
num: "03",
phase: "Post-Production",
title: "Editorial Grade",
description:
"Our specialist post-production editors color-grade and polish each picture to a fine-art finish. We deliver a curated raw-preview vault, followed by fully-retouched gallery assets and signature custom albums.",
bullets: [
"Same-day raw preview access",
"Custom-tailored cinematic color grading",
"Premium printed keepsake deliverables",
],
},
];

export default function Approach() {
return ( <section
   id="approach"
   className="
     py-24
     md:py-36
     bg-white
     dark:bg-[#050505]
     relative
     overflow-hidden
     border-b
     border-black/5
     dark:border-white/5
     transition-colors
     duration-300
   "
 > <div className="max-w-7xl mx-auto px-6 lg:px-8">

    {/* Title */}
    <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">

      <span className="text-gold uppercase tracking-[0.3em] text-[10px] md:text-xs font-semibold block">
        Our Method
      </span>

      <h2
        className="
          text-4xl
          md:text-5xl
          lg:text-6xl
          font-serif
          font-light
          text-black
          dark:text-white
          leading-tight
          transition-colors
          duration-300
        "
      >
        The Production House <br />
        <span className="font-serif italic text-gold font-normal">
          Workflow
        </span>
      </h2>

      <p
        className="
          text-gray-600
          dark:text-gray-400
          text-sm
          md:text-base
          font-light
          max-w-xl
          mx-auto
          transition-colors
          duration-300
        "
      >
        How we translate your personal milestones into timeless visual
        masterpieces, structured in three distinct phases.
      </p>

    </div>

    {/* Steps Grid */}
    <div
      className="
        grid
        grid-cols-1
        lg:grid-cols-3
        gap-12
        lg:gap-0
        lg:border
        border-black/5
        dark:border-white/5
        bg-gray-50
        dark:bg-black/20
        rounded-sm
        overflow-hidden
        transition-colors
        duration-300
      "
    >
      {steps.map((step, index) => (
        <motion.div
          key={step.num}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: index * 0.15 }}
          className={`p-8 md:p-12 relative flex flex-col justify-between ${
            index !== 2
              ? "lg:border-r lg:border-black/5 dark:lg:border-white/5"
              : ""
          }`}
        >
          {/* Giant Number */}
          <div
            className="
              absolute
              top-8
              right-8
              text-7xl
              md:text-8xl
              font-serif
              italic
              font-extralight
              text-black/5
              dark:text-white/5
              select-none
              pointer-events-none
              transition-colors
              duration-300
            "
          >
            {step.num}
          </div>

          <div>

            <span className="text-gold text-[10px] uppercase tracking-[0.2em] font-semibold block mb-4">
              {step.phase}
            </span>

            <h3
              className="
                text-2xl
                font-serif
                text-black
                dark:text-white
                font-light
                mb-6
                transition-colors
                duration-300
              "
            >
              {step.title}
            </h3>

            <p
              className="
                text-gray-600
                dark:text-gray-400
                text-xs
                md:text-sm
                font-light
                leading-relaxed
                mb-8
                text-left
                transition-colors
                duration-300
              "
            >
              {step.description}
            </p>

          </div>

          <div
            className="
              border-t
              border-black/5
              dark:border-white/5
              pt-6
              mt-auto
              transition-colors
              duration-300
            "
          >
            <ul className="space-y-3 text-left">
              {step.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="
                    flex
                    items-center
                    gap-3
                    text-[11px]
                    md:text-xs
                    text-gray-700
                    dark:text-gray-300
                    font-light
                    transition-colors
                    duration-300
                  "
                >
                  <svg
                    className="w-3.5 h-3.5 text-gold flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>

                  {bullet}
                </li>
              ))}
            </ul>
          </div>

        </motion.div>
      ))}
    </div>

  </div>
</section>


);
}
