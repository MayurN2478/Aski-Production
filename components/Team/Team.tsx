"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";

const teamMembers = [
  {
    name: "Person 1",
    role: "Co-Founder & Lead Photographer",
    bio: "With over 8 years of capturing weddings and events, Karthik is a master of candid timing, framing raw emotions with natural light and a friendly approach that puts clients at ease.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600",
  },
  {
    name: "Person 2",
    role: "Chief Cinematographer",
    bio: "A cinematic visual specialist who treats every wedding film like a silver-screen release. Rahul brings motion, drone expertise, and film-director-level framing to our sets.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600",
  },
  {
    name: "Person 3",
    role: "Lead Post-Production Editor",
    bio: "Priya is the editing powerhouse who compiles your visual stories, applying our signature rich, warm color grading and skin-retouching to bring out the raw beauty of every frame.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600",
  },
];

export default function Team() {
  return (
    <section
      id="team"
      className="py-24 md:py-32 bg-black relative border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-gold uppercase tracking-[0.4em] text-[10px] md:text-xs font-semibold block">
            The Storytellers
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-white leading-tight">
            Meet The Artists Behind Every Frame <br />
          </h2>
          <p className="text-gray-400 text-sm md:text-base font-light max-w-xl mx-auto">
            Every frame we create is the result of passionate storytellers, cinematic thinkers, and visual artists working together to preserve your most meaningful moments.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
              }}
              className="group"
            >

              {/* Portrait */}
              <div className="relative aspect-[4/5] overflow-hidden mb-6">

                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="
                    object-cover
                    grayscale
                    group-hover:grayscale-0
                    group-hover:scale-105
                    transition-all
                    duration-700
                  "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              </div>

              {/* Content */}
              <div className="space-y-3">

                <h3 className="text-2xl font-serif text-white">
                  {member.name}
                </h3>

                <p className="text-gold uppercase tracking-[0.25em] text-[10px]">
                  {member.role}
                </p>

                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                  {member.bio}
                </p>

                <div className="flex gap-4 pt-2">

                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gold transition-colors"
                  >
                    <FaInstagram />
                  </a>

                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}
