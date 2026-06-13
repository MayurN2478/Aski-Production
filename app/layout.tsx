import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Aski Films | Premium Photography & Cinematic Storytelling",
  description: "The dedicated photography division of Aski Films production house. Documenting weddings, pre-weddings, naming ceremonies, maternity, and editorial shoots with a cinematic, artistic signature.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body
        className="
          min-h-full
          flex
          flex-col
          font-sans
          bg-white
          text-black
          dark:bg-black
          dark:text-white
          transition-colors
          duration-300
        "
      >
        <ThemeProvider>
          {children}
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
