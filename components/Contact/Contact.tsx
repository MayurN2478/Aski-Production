"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineArrowLeft, HiOutlineArrowRight, HiCheckCircle } from "react-icons/hi";

// Options definitions
const occasions = [
  { label: "Wedding Photography", val: "wedding", desc: "Traditional rituals & cinematic candid frames" },
  { label: "Pre-Wedding Shoot", val: "prewedding", desc: "Romantic storytelling in scenic locales" },
  { label: "Naming Ceremony", val: "naming", desc: "Warm, traditional family gatherings" },
  { label: "Maternity Shoot", val: "maternity", desc: "Graceful, editorial pregnancy portraits" },
  { label: "Editorial & Portraits / Other", val: "portrait", desc: "Fashion, commercial, or custom projects" },
];

const serviceOptions = [
  { label: "Candid Photography", desc: "Capturing natural emotions & unprompted actions" },
  { label: "Traditional Photography", desc: "Classic formal grouping shots & stage rituals" },
  { label: "Cinematic Videography", desc: "High-end 4K narrative video & highlights film" },
  { label: "Drone Aerial Coverage", desc: "Scenic drone views of locations and venues" },
  { label: "Premium Albums & Prints", desc: "Luxury leather coffee-table book and custom frame prints" },
];

const deliverablesOptions = [
  { label: "Raw Photo Vault", desc: "Same-day access to all raw captures" },
  { label: "Edited High-Res Gallery", desc: "Expert color-graded and retouched photos (1 week turnaround)" },
  { label: "Cinematic Highlight Film", desc: "3-5 minute high-end highlights movie" },
  { label: "Traditional Documentary Video", desc: "Complete 1-2 hour documentation of the day" },
  { label: "Luxury Printed Album", desc: "Custom designed, binding lay-flat photobook" },
];

export default function Contact() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    occasion: "",
    date: "",
    location: "",
    guests: "Under 100",
    options: [] as string[],
    deliverables: [] as string[],
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectOccasion = (val: string) => {
    setFormData({ ...formData, occasion: val });
    setErrors({ ...errors, occasion: "" });
  };

  const toggleOption = (label: string) => {
    const isSelected = formData.options.includes(label);
    const updated = isSelected
      ? formData.options.filter((o) => o !== label)
      : [...formData.options, label];
    setFormData({ ...formData, options: updated });
  };

  const toggleDeliverable = (label: string) => {
    const isSelected = formData.deliverables.includes(label);
    const updated = isSelected
      ? formData.deliverables.filter((d) => d !== label)
      : [...formData.deliverables, label];
    setFormData({ ...formData, deliverables: updated });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1 && !formData.occasion) {
      newErrors.occasion = "Please select what occasion we are celebrating.";
    }
    if (step === 2) {
      if (!formData.date) newErrors.date = "Event date is required.";
      if (!formData.location) newErrors.location = "Event venue/location is required.";
    }
    if (step === 5) {
      if (!formData.name) newErrors.name = "Full name is required.";
      if (!formData.email) newErrors.email = "Email address is required.";
      if (!formData.phone) newErrors.phone = "Phone number is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      // Simulate booking submit
      setStep(6);
    }
  };

  const generateWhatsAppLink = () => {
    const occasionLabel = occasions.find((o) => o.val === formData.occasion)?.label || formData.occasion;
    const message = `Hi Aski Films, I'd like to book a shoot!
*Occasion:* ${occasionLabel}
*Date:* ${formData.date}
*Venue:* ${formData.location}
*Guests:* ${formData.guests}
*Services Chosen:* ${formData.options.join(", ") || "None"}
*Deliverables:* ${formData.deliverables.join(", ") || "None"}

*My Contact Details:*
*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Notes:* ${formData.notes || "None"}`;

    return `https://wa.me/919945969622?text=${encodeURIComponent(message)}`;
  };

  return (
    <section
      id="booking"
      className=" py-24 md:py-36 bg-white dark:bg-[#050505] relative border-b border-black/5 dark:border-white/5 transition-colors duration-300 "
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        
        {/* Step Indicator Header */}
        {step < 6 && (
          <div className="mb-12 text-center">
            <span className="text-gold uppercase tracking-[0.3em] text-[10px] md:text-xs font-semibold block mb-4">
              Booking Wizard
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-black dark:text-white font-light transition-colors duration-300">
              Plan Your <span className="font-serif italic text-gold">Photoshoot</span>
            </h2>
            
            {/* ProgressBar */}
            <div className="mt-8 flex items-center justify-between max-w-md mx-auto relative">
              <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-black/10 dark:bg-white/10 -translate-y-1/2 -z-10" />
              <div
                className="absolute left-0 top-1/2 h-[2px] bg-gold -translate-y-1/2 -z-10 transition-all duration-500"
                style={{ width: `${((step - 1) / 4) * 100}%` }}
              />
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  disabled={s > step}
                  onClick={() => setStep(s)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all duration-500 ${
                    s === step
                      ? "bg-gold text-black font-semibold shadow-lg shadow-gold/20 scale-110"
                      : s < step
                      ? "bg-gold/80 text-black font-semibold"
                      : "bg-gray-100 dark:bg-[#161616] text-gray-500 border border-black/5 dark:border-white/5"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className=" glass-panel p-8 md:p-12 rounded-sm shadow-2xl relative overflow-hidden bg-white/90 dark:bg-[#121212]/60 border border-black/5 dark:border-white/5 transition-colors duration-300 ">
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              
              {/* STEP 1: Occasion selection */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl md:text-2xl font-serif text-black dark:text-white transition-colors duration-300 text-left mb-6 font-light">
                    What are we celebrating?
                  </h3>
                  <div className="space-y-3">
                    {occasions.map((o) => (
                      <div
                        key={o.val}
                        onClick={() => selectOccasion(o.val)}
                        className={`p-5 rounded-sm border cursor-pointer transition-all duration-300 text-left ${
                          formData.occasion === o.val
                            ? "border-gold bg-gold/10"
                            : "border-black/5 dark:border-white/5 bg-gray-50 dark:bg-black/20 hover:border-black/20 dark:hover:border-white/20 hover:bg-gray-100 dark:hover:bg-black/45"
                        }`}
                      >
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-black dark:text-white transition-colors duration-300">
                          {o.label}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-xs mt-1 font-light">
                          {o.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                  {errors.occasion && (
                    <p className="text-red-500 text-xs text-left">{errors.occasion}</p>
                  )}
                </motion.div>
              )}

              {/* STEP 2: Event Details */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 text-left"
                >
                  <h3 className="text-xl md:text-2xl font-serif text-black dark:text-white transition-colors duration-300 mb-6 font-light">
                    Tell us about your event
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-600 dark:text-gray-400 text-xs uppercase tracking-widest mb-2 font-medium">
                        Event Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleTextChange}
                        className=" w-full p-4 bg-white dark:bg-black/40 border border-black/10 dark:border-white/5 focus:border-gold outline-none text-black dark:text-white transition-colors duration-300 rounded-sm text-sm "
                      />
                      {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                    </div>

                    <div>
                      <label className="block text-gray-600 dark:text-gray-400 text-xs uppercase tracking-widest mb-2 font-medium">
                        Venue / Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleTextChange}
                        placeholder="e.g. Indiranagar, Bengaluru or Leela Palace"
                        className=" w-full p-4 bg-white dark:bg-black/40 border border-black/10 dark:border-white/5 focus:border-gold outline-none text-black dark:text-white transition-colors duration-300 rounded-sm text-sm "
                      />
                      {errors.location && (
                        <p className="text-red-500 text-xs mt-1">{errors.location}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-600 dark:text-gray-400 text-xs uppercase tracking-widest mb-2 font-medium">
                        Estimated Guest Count
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {["Under 100", "100 - 300", "300 - 600", "600+"].map((g) => (
                          <div
                            key={g}
                            onClick={() => setFormData({ ...formData, guests: g })}
                            className={`p-3.5 text-center text-xs uppercase tracking-wider rounded-sm border cursor-pointer transition-all duration-300 font-medium ${
                              formData.guests === g
                                ? "border-gold bg-gold text-black"
                                : "border-black/5 dark:border-white/5 bg-gray-50 dark:bg-black/20 text-black dark:text-gray-300 hover:border-black/20 dark:hover:border-white/20"
                            }`}
                          >
                            {g}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Options (Multi-select) */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 text-left"
                >
                  <h3 className="text-xl md:text-2xl font-serif text-black dark:text-white transition-colors duration-300 mb-6 font-light">
                    Select options
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs -mt-4 mb-6">
                    Choose what applies to your event. Select all that interest you.
                  </p>
                  
                  <div className="space-y-3">
                    {serviceOptions.map((opt) => {
                      const isSelected = formData.options.includes(opt.label);
                      return (
                        <div
                          key={opt.label}
                          onClick={() => toggleOption(opt.label)}
                          className={`p-4 rounded-sm border cursor-pointer transition-all duration-300 flex justify-between items-center ${
                            isSelected
                              ? "border-gold bg-gold/10"
                              : "border-black/5 dark:border-white/5 bg-gray-50 dark:bg-black/20 hover:border-black/20 dark:hover:border-white/20"
                          }`}
                        >
                          <div>
                            <h4 className="text-sm font-semibold uppercase tracking-wider text-black dark:text-white transition-colors duration-300">
                              {opt.label}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 text-xs mt-1 font-light">
                              {opt.desc}
                            </p>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-sm border flex items-center justify-center transition-all ${isSelected
                              ? "border-gold bg-gold"
                              : "border-black/20 dark:border-white/20"
                              }`}
                          >
                            {isSelected && (
                              <svg
                                className="w-3.5 h-3.5 text-black"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Deliverables (Multi-select) */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 text-left"
                >
                  <h3 className="text-xl md:text-2xl font-serif text-black dark:text-white transition-colors duration-300 mb-6 font-light">
                    Choose your deliverables
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs -mt-4 mb-6">
                    Select the products you would like.
                  </p>

                  <div className="space-y-3">
                    {deliverablesOptions.map((del) => {
                      const isSelected = formData.deliverables.includes(del.label);
                      return (
                        <div
                          key={del.label}
                          onClick={() => toggleDeliverable(del.label)}
                          className={`p-4 rounded-sm border cursor-pointer transition-all duration-300 flex justify-between items-center ${
                            isSelected
                              ? "border-gold bg-gold/10"
                              : "border-black/5 dark:border-white/5 bg-gray-50 dark:bg-black/20 hover:border-black/20 dark:hover:border-white/20"
                          }`}
                        >
                          <div>
                            <h4 className="text-sm font-semibold uppercase tracking-wider text-black dark:text-white transition-colors duration-300">
                              {del.label}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 text-xs mt-1 font-light">
                              {del.desc}
                            </p>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-sm border flex items-center justify-center transition-all ${
                              isSelected
                                ? "border-gold bg-gold"
                                : "border-black/20 dark:border-white/20"
                            }`}
                          >
                            {isSelected && (
                              <svg
                                className="w-3.5 h-3.5 text-black"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 5: Review & Personal Info */}
              {step === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 text-left"
                >
                  <h3 className="text-xl md:text-2xl font-serif text-black dark:text-white transition-colors duration-300 mb-6 font-light">
                    Review your booking
                  </h3>
                  
                  {/* Summary Box */}
                  <div className=" p-5 bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/5 rounded-sm text-xs space-y-3 font-light mb-8 transition-colors duration-300 " >
                    <h4 className="text-gold uppercase tracking-widest font-semibold mb-2">
                      Event Summary
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400 block uppercase tracking-wider text-[10px]">Occasion</span>
                        <span className="text-black dark:text-white transition-colors duration-300 font-medium uppercase">
                          {occasions.find((o) => o.val === formData.occasion)?.label || "Not Selected"}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400 block uppercase tracking-wider text-[10px]">Date</span>
                        <span className="text-black dark:text-white transition-colors duration-300 font-medium">{formData.date || "Not Set"}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400 block uppercase tracking-wider text-[10px]">Venue</span>
                        <span className="text-black dark:text-white transition-colors duration-300 font-medium">{formData.location || "Not Set"}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400 block uppercase tracking-wider text-[10px]">Guest Count</span>
                        <span className="text-black dark:text-white transition-colors duration-300 font-medium">{formData.guests}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 block uppercase tracking-wider text-[10px] mb-1">Services & Deliverables</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {formData.options.map((o) => (
                          <span key={o} className="bg-gold/10 text-gold px-2 py-0.5 rounded-sm border border-gold/20 text-[9px] uppercase tracking-wider font-semibold">
                            {o}
                          </span>
                        ))}
                        {formData.deliverables.map((d) => (
                          <span key={d} className=" bg-gray-100 dark:bg-white/5 text-black dark:text-white px-2 py-0.5 rounded-sm border border-black/10 dark:border-white/10 text-[9px] uppercase tracking-wider transition-colors duration-300 ">
                            {d}
                          </span>
                        ))}
                        {formData.options.length === 0 && formData.deliverables.length === 0 && (
                          <span className="text-gray-500 italic">None selected</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Personal Fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-600 dark:text-gray-400 text-xs uppercase tracking-widest mb-2 font-medium">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleTextChange}
                        placeholder="e.g. Aarav Sharma"
                        className=" w-full p-4 bg-white dark:bg-black/40 border border-black/10 dark:border-white/5 focus:border-gold outline-none text-black dark:text-white transition-colors duration-300 rounded-sm text-sm "
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-600 dark:text-gray-400 text-xs uppercase tracking-widest mb-2 font-medium">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleTextChange}
                          placeholder="e.g. aarav@gmail.com"
                          className=" w-full p-4 bg-white dark:bg-black/40 border border-black/10 dark:border-white/5 focus:border-gold outline-none text-black dark:text-white transition-colors duration-300 rounded-sm text-sm "
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-gray-600 dark:text-gray-400 text-xs uppercase tracking-widest mb-2 font-medium">
                          WhatsApp Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleTextChange}
                          placeholder="e.g. +91 98765 43210"
                          className=" w-full p-4 bg-white dark:bg-black/40 border border-black/10 dark:border-white/5 focus:border-gold outline-none text-black dark:text-white transition-colors duration-300 rounded-sm text-sm "
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-600 dark:text-gray-400 text-xs uppercase tracking-widest mb-2 font-medium">
                        Additional Notes / Vision details
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleTextChange}
                        rows={3}
                        placeholder="Tell us a little more about your creative expectations or event details..."
                        className=" w-full p-4 bg-white dark:bg-black/40 border border-black/10 dark:border-white/5 focus:border-gold outline-none text-black dark:text-white transition-colors duration-300 rounded-sm text-sm "
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 6: Confirmation Screen */}
              {step === 6 && (
                <motion.div
                  key="step6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="flex justify-center text-gold">
                    <HiCheckCircle size={72} className="animate-pulse" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl md:text-3xl font-serif text-black dark:text-white transition-colors duration-300 font-light">
                      Thank You!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm font-light max-w-md mx-auto leading-relaxed">
                      Your booking inquiry details have been saved. Our creative coordinator will review your dates and get back to you within 48 hours.
                    </p>
                  </div>

                  <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href={generateWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-black font-semibold uppercase tracking-wider text-xs rounded-full flex items-center justify-center gap-2 transition-all duration-300 shadow-lg"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Instant WhatsApp Confirm
                    </a>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          occasion: "",
                          date: "",
                          location: "",
                          guests: "Under 100",
                          options: [] as string[],
                          deliverables: [] as string[],
                          name: "",
                          email: "",
                          phone: "",
                          notes: "",
                        });
                        setStep(1);
                      }}
                      className="px-8 py-3.5 border border-white/10 hover:border-gold hover:text-gold text-black dark:text-white transition-colors duration-300 uppercase tracking-wider text-xs rounded-full transition-all duration-300 cursor-pointer"
                    >
                      Start New Inquiry
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Bottom Navigation Buttons */}
            {step < 6 && (
              <div className="flex justify-between items-center mt-12 border-t border-black/5 dark:border-white/5 pt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className={`flex items-center gap-2 text-xs uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all cursor-pointer ${
                    step === 1 ? "opacity-0 pointer-events-none" : ""
                  }`}
                >
                  <HiOutlineArrowLeft /> Back
                </button>
                
                {step < 5 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3.5 bg-gold hover:bg-gold-dark text-black rounded-full text-xs uppercase tracking-widest font-semibold flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    Continue <HiOutlineArrowRight />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-gold hover:bg-gold-dark text-black rounded-full text-xs uppercase tracking-widest font-semibold flex items-center gap-2 cursor-pointer shadow-md shadow-gold/10"
                  >
                    Submit Booking <HiCheckCircle size={16} />
                  </button>
                )}
              </div>
            )}
          </form>
        </div>

      </div>
    </section>
  );
}
