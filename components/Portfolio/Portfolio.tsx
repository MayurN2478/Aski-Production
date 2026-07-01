"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HiOutlineArrowLeft, HiOutlineArrowRight, HiOutlineX } from "react-icons/hi";
import { supabase } from "@/lib/supabase";
import VideoGallery from "@/components/Portfolio/VideoGallery";

const categories = ["All", "Weddings", "Pre-Wedding", "Naming Ceremony", "Maternity", "Portraits", "Videos"];
type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  image_url: string;
};

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("All");
  const [portfolioItems, setPortfolioItems] =
    useState<PortfolioItem[]>([]);

  const [filteredItems, setFilteredItems] =
    useState<PortfolioItem[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  const fetchPortfolio = async () => {
    const { data, error } = await supabase
      .from("portfolio_images")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setPortfolioItems(data || []);
    setFilteredItems(data || []);
  };

  useEffect(() => {
    fetchPortfolio();
  }, [])

  useEffect(() => {
    if (activeTab === "All") {
      setFilteredItems(portfolioItems);
    } else if (activeTab !== "Videos") {
      setFilteredItems(
        portfolioItems.filter(
          (item) => item.category === activeTab
        )
      );
    }
  }, [activeTab, portfolioItems]);

  const openLightbox = (id: string) => {
    // Find index of the item inside filteredItems array
    const idx = filteredItems.findIndex((item) => item.id === id);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const navigateLightbox = (direction: "next" | "prev") => {
    if (lightboxIndex === null) return;
    let nextIndex = direction === "next" ? lightboxIndex + 1 : lightboxIndex - 1;

    if (nextIndex >= filteredItems.length) {
      nextIndex = 0;
    } else if (nextIndex < 0) {
      nextIndex = filteredItems.length - 1;
    }
    setLightboxIndex(nextIndex);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") navigateLightbox("next");
      if (e.key === "ArrowLeft") navigateLightbox("prev");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  return (
    <section
      id="portfolio"
      className=" py-24 md:py-36 bg-white dark:bg-[#050505] relative border-b border-black/5 dark:border-white/5 transition-colors duration-300 "
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 max-w-xl text-left">
            <span className="text-gold uppercase tracking-[0.3em] text-[10px] md:text-xs font-semibold block">
              Portfolio
            </span>
            <h2 className=" text-4xl md:text-5xl lg:text-6xl font-serif font-light text-black dark:text-white leading-tight transition-colors duration-300 ">
              Selected <span className="font-serif italic text-gold font-normal">Captures</span>
            </h2>
          </div>

          {/* Filtering Tabs */}
          <div className=" flex flex-wrap gap-2 border-b border-black/5 dark:border-white/5 pb-2 md:pb-0 transition-colors duration-300 ">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 text-xs uppercase tracking-widest transition-all duration-300 rounded-sm cursor-pointer ${
                  activeTab === cat
                    ? "bg-gold text-black font-semibold"
                    : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {activeTab ==="Videos" ? (
          <VideoGallery/>
        ) : (
             
            <>
            {/*Existing */}
            {/* Gallery Grid */}
            {filteredItems.length === 0 ? (

              <div className="flex flex-col items-center justify-center py-24 text-center">

                <h3 className="text-3xl font-serif text-black dark:text-white mb-4">
                  New Memories Are On Their Way
                </h3>

                <p className="max-w-xl text-gray-600 dark:text-gray-400 leading-8">
                  Our team is currently curating and uploading our latest work.
                  Please check back soon to discover more beautiful stories captured by Aski Films.
                </p>

              </div>

            ) : (

              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >

              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    key={item.id}
                    onClick={() => openLightbox(item.id)}
                    className=" group relative aspect-[3/4] overflow-hidden rounded-sm cursor-pointer shadow-md hover:shadow-xl border border-black/5 dark:border-white/5 transition-all duration-300 "
                  >
                    {/* Photo */}
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      fill
                      sizes="(max-w-7xl) 33vw, 100vw"
                      className="object-cover scale-[1.02] group-hover:scale-110 transition-transform duration-700 ease-out grayscale-[15%] group-hover:grayscale-0"
                    />

                    {/* Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                    {/* Corner Accents on Hover */}
                    <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-gold/60 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 z-20" />
                    <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-gold/60 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 z-20" />

                    {/* Details (Toggled on Hover) */}
                    <div className="absolute bottom-6 left-6 right-6 z-20 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out text-left">
                      <span className="text-gold text-[9px] uppercase tracking-[0.25em] font-semibold block mb-1">
                        {item.category}
                      </span>
                      <h3 className="text-xl font-serif text-white font-light tracking-wide leading-tight">
                        {item.title}
                      </h3>
                      <div className=" flex items-center gap-1.5 mt-2 text-gray-300 ">
                        <svg
                          className="w-3.5 h-3.5 text-gold"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="text-[10px] uppercase tracking-widest">
                          Aski Films
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
            )}
          </>
        )}
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/98 z-[100] flex items-center justify-center p-4 md:p-8 select-none"
          >
            {/* Top Close Bar */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-50">
              <div className="text-left">
                <span className="text-gold text-[10px] uppercase tracking-[0.25em] font-semibold block">
                  {filteredItems[lightboxIndex].category}
                </span>
                <h4 className="text-lg font-serif text-white leading-tight font-light">
                  {filteredItems[lightboxIndex].title}
                </h4>
              </div>
              
              <button
                onClick={closeLightbox}
                className="w-12 h-12 bg-white/5 hover:bg-white/10 hover:text-gold rounded-full flex items-center justify-center text-white transition-all duration-300 border border-white/5 cursor-pointer"
              >
                <HiOutlineX size={22} />
              </button>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => navigateLightbox("prev")}
              className="absolute left-4 md:left-8 w-12 h-12 md:w-14 md:h-14 bg-black/60 hover:bg-gold hover:text-black border border-white/5 hover:border-gold rounded-full flex items-center justify-center text-white transition-all duration-300 z-30 cursor-pointer"
            >
              <HiOutlineArrowLeft size={20} />
            </button>

            <button
              onClick={() => navigateLightbox("next")}
              className="absolute right-4 md:right-8 w-12 h-12 md:w-14 md:h-14 bg-black/60 hover:bg-gold hover:text-black border border-white/5 hover:border-gold rounded-full flex items-center justify-center text-white transition-all duration-300 z-30 cursor-pointer"
            >
              <HiOutlineArrowRight size={20} />
            </button>

            {/* Main Image View */}
            <div className="relative w-full h-[70vh] max-w-4xl max-h-[600px] flex items-center justify-center">
              <motion.div
                key={filteredItems[lightboxIndex].id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full"
              >
                <Image
                  src={filteredItems[lightboxIndex].image_url}
                  alt={filteredItems[lightboxIndex].title}
                  fill
                  sizes="(max-w-4xl) 100vw, 80vw"
                  className="object-contain"
                  priority
                />
              </motion.div>
            </div>

            {/* Bottom Info Bar */}
            <div className="absolute bottom-6 left-6 right-6 text-center text-gray-400 text-xs">
              <span className="tracking-widest uppercase">
                {lightboxIndex + 1} / {filteredItems.length} • Aski Films
              </span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
