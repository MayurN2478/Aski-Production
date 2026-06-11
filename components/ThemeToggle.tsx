"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => {
        const nextTheme =
            theme === "dark" ? "light" : "dark";
        setTheme(nextTheme);
        }}
      aria-label="Toggle Theme"
      className="
        fixed
        bottom-16
        md:bottom-6
        right-6
        z-[999]
        flex
        items-center
        justify-center
        h-12
        w-12
        rounded-full
        backdrop-blur-md
        border
        border-gold/30
        bg-black/80
        dark:bg-black/60
        text-gold
        shadow-lg
        transition-all
        duration-300
        hover:scale-110
        "
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}