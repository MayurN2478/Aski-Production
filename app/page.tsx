import Layout from "@/components/Layout/Layout";
import LenisProvider from "@/components/Layout/LenisProvider";
import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";

import Founder from "@/components/Founder/Founder";
import Team from "@/components/Team/Team";
import Philosophy from "@/components/Philosophy/Philosophy";

import Services from "@/components/Services/Services";
import Portfolio from "@/components/Portfolio/Portfolio";
import Approach from "@/components/Approach/Approach";
import Testimonials from "@/components/Testimonials/Testimonials";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <LenisProvider>
      <Layout>
        <Navbar />

        <Hero />

        <Founder />

        <Team />

        <Philosophy />

        <Services />

        <Portfolio />

        <Approach />

        <Testimonials />

        <Contact />

        <Footer />
      </Layout>
    </LenisProvider>
  );
}