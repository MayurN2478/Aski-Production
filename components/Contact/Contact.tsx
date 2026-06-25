"use client";

import { useState } from "react";

const occasions = [
  { label: "Wedding Photography", val: "wedding" },
  { label: "Pre-Wedding Shoot", val: "prewedding" },
  { label: "Naming Ceremony", val: "naming" },
  { label: "Maternity Shoot", val: "maternity" },
  { label: "Editorial & Portraits", val: "portrait" },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    occasion: "",
    date: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    occasion: "",
    date: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: "",
      occasion: "",
      date: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name";
    }

    if (!formData.occasion) {
      newErrors.occasion = "Please select an event type";
    }

    if (!formData.date) {
      newErrors.date = "Please select an event date";
    }

    setErrors(newErrors);

    if (
      newErrors.name ||
      newErrors.occasion ||
      newErrors.date
    ) {
      return;
    }

    const occasionLabel =
      occasions.find(
        (item) => item.val === formData.occasion
      )?.label || formData.occasion;

    const message = `Hi Aski Films,

  I'd like to enquire about a photoshoot.

  Name: ${formData.name}
  Event Type: ${occasionLabel}
  Preferred Date: ${formData.date}
  `;

    window.open(
      `https://wa.me/919945969622?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <section
      id="booking"
      className=" relative py-32 overflow-hidden bg-white dark:bg-[#050505] transition-colors duration-500
      "
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Top Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">

          <div>
            <span className="uppercase tracking-[0.35em] text-[11px] text-[#c8a36b]">
              Luxury Photography Experience
            </span>

            <h2 className="mt-6 text-5xl md:text-7xl font-serif text-black dark:text-white leading-[1.05]">
              Ready to begin
              <br />
              <span className="italic text-[#c8a36b]">
                your story?
              </span>
            </h2>
          </div>

          <div>
            <p className="text-black/60 dark:text-white/60 text-lg leading-relaxed max-w-md">
              Fill out the details and we'll personally get in touch
              within 24 hours to discuss your vision.
            </p>
          </div>

        </div>

        {/* Horizontal Form */}
        <form
          onSubmit={handleSubmit}
          className="
          border
          border-black/10
          dark:border-white/10

          bg-white
          dark:bg-[#090909]

          p-6
          md:p-8

          transition-colors
          duration-500

          shadow-[0_0_50px_rgba(0,0,0,0.04)]
          dark:shadow-[0_0_50px_rgba(200,163,107,0.05)]
          "
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_90px] gap-6 lg:gap-0 items-end">

            {/* Name */}
            <div className="lg:border-r border-black/10 dark:border-white/10 lg:pr-6">
              <label className="block text-[10px] uppercase tracking-[0.25em] text-black/40 dark:text-white/40 mb-3">
                Your Name
              </label>

              {errors.name && (
                <p className="text-red-500 text-xs mb-2">
                  {errors.name}
                </p>
              )}

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="
                w-full
                bg-transparent
                border-b
                border-black/15 dark:border-white/20
                pb-3
                text-black dark:text-white
                outline-none
                focus:border-[#c8a36b]
                "
              />
            </div>

            {/* Event Type */}
            <div className="lg:border-r border-black/10 dark:border-white/10 lg:px-6">
              <label className="block text-[10px] uppercase tracking-[0.25em] text-black/40 dark:text-white/40 mb-3">
                Event Type
              </label>
              
              {errors.occasion && (
                <p className="text-red-500 text-xs mb-2">
                  {errors.occasion}
                </p>
              )}
              <select
                name="occasion"
                value={formData.occasion}
                onChange={handleChange}
                className="
                w-full
                bg-transparent
                border-b
                border-black/15 dark:border-white/20
                pb-3
                text-black dark:text-white
                outline-none
                focus:border-[#c8a36b]
                "
              >
                <option
                  value=""
                  className="bg-white dark:bg-black text-black dark:text-white"
                >
                  Select Event
                </option>

                {occasions.map((occasion) => (
                  <option
                    key={occasion.val}
                    value={occasion.val}
                    className="bg-white dark:bg-black text-black dark:text-white"
                  >
                    {occasion.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="lg:px-6">
              <label className="block text-[10px] uppercase tracking-[0.25em] text-black/40 dark:text-white/40 mb-3">
                Event Date
              </label>

              {errors.date && (
                <p className="text-red-500 text-xs mb-2">
                  {errors.date}
                </p>
              )}
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`
                  w-full
                  bg-transparent
                  border-b
                  pb-3
                  text-black dark:text-white
                  outline-none
                  focus:border-[#c8a36b]
                  ${errors.name ? "border-red-500" : "border-black/15 dark:border-white/20"}
                `}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="
              w-full
              lg:w-[90px]
              h-[90px]
              bg-[#c8a36b]
              hover:bg-[#d8b27b]
              transition-all
              duration-500
              group
              flex
              items-center
              justify-center
              text-black
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="
                  w-6
                  h-6
                  transition-transform
                  duration-500
                  group-hover:translate-x-1
                "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14m-6-6 6 6-6 6"
                />
              </svg>
            </button>

          </div>
        </form>

      </div>
    </section>
  );
}
