"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineX,
} from "react-icons/hi";
import { FaPlay } from "react-icons/fa";
import { supabase } from "@/lib/supabase";

type VideoItem = {
  id: string;
  title: string;
  thumbnail_url: string;
  video_url: string;
};

export default function VideoGallery() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [currentVideo, setCurrentVideo] = useState<number | null>(null);

  const fetchVideos = async () => {
    const { data, error } = await supabase
      .from("portfolio_videos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
        console.log("Message:", error.message);
        console.log("Details:", error.details);
        console.log("Hint:", error.hint);
        console.log("Code:", error.code);
        return;
    }

    setVideos(data || []);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const closeVideo = () => setCurrentVideo(null);

  const nextVideo = () => {
    if (currentVideo === null) return;

    setCurrentVideo((currentVideo + 1) % videos.length);
  };

  const prevVideo = () => {
    if (currentVideo === null) return;

    setCurrentVideo(
      currentVideo === 0
        ? videos.length - 1
        : currentVideo - 1
    );
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (currentVideo === null) return;

      if (e.key === "Escape") closeVideo();

      if (e.key === "ArrowRight") nextVideo();

      if (e.key === "ArrowLeft") prevVideo();
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [currentVideo]);

  return (
    <>
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
            {videos.length === 0 ? (
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full flex flex-col items-center justify-center py-24 text-center"
                >

                <div className="w-24 h-24 rounded-full border border-gold/30 bg-gold/5 flex items-center justify-center mb-8">
                    <span className="text-4xl">🎥</span>
                </div>

                <h3 className="text-3xl font-serif text-white mb-4">
                    New Films Are On Their Way
                </h3>

                <p className="max-w-xl text-gray-400 leading-8">
                    Our team is currently editing and uploading our latest cinematic
                    stories. Please check back soon to experience more unforgettable
                    moments captured by Aski Films.
                </p>
                </motion.div>

            ) : (

                videos.map((video, index) => (
                <motion.div
                    key={video.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.35 }}
                    onClick={() => setCurrentVideo(index)}
                    className="relative aspect-video rounded-md overflow-hidden cursor-pointer group border border-white/10 shadow-xl"
                >
                    <Image
                    src={video.thumbnail_url}
                    alt={video.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 opacity-70 group-hover:opacity-100 transition duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center">

                    <motion.div
                        whileHover={{ scale: 1.15 }}
                        className="w-20 h-20 rounded-full bg-white/90 text-black flex items-center justify-center shadow-2xl"
                    >
                        <FaPlay className="ml-1 text-2xl" />
                    </motion.div>

                    </div>

                    <div className="absolute bottom-5 left-5">
                    <p className="text-gold uppercase tracking-[.25em] text-[10px]">
                        Video
                    </p>

                    <h3 className="text-white text-xl font-serif">
                        {video.title}
                    </h3>
                    </div>

                </motion.div>
                ))
            )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>

        {currentVideo !== null && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-6"
          >

            <button
              onClick={closeVideo}
              className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-gold hover:text-black text-white flex items-center justify-center transition cursor-pointer"
            >
              <HiOutlineX size={24} />
            </button>

            <button
              onClick={prevVideo}
              className="absolute left-8 text-white hover:text-gold cursor-pointer"
            >
              <HiOutlineArrowLeft size={34} />
            </button>

            <button
              onClick={nextVideo}
              className="absolute right-8 text-white hover:text-gold cursor-pointer"
            >
              <HiOutlineArrowRight size={34} />
            </button>

            <motion.div
              key={videos[currentVideo].id}
              initial={{ scale: .95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: .35 }}
              className="w-full max-w-6xl"
            >

              <video
                src={videos[currentVideo].video_url}
                controls
                autoPlay
                className="w-full rounded-lg border border-white/10 shadow-2xl"
              />

              <div className="mt-5 text-center">

                <p className="text-gold uppercase tracking-[.3em] text-xs">
                  Aski Films
                </p>

                <h2 className="text-white font-serif text-3xl mt-2">
                  {videos[currentVideo].title}
                </h2>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>
    </>
  );
}