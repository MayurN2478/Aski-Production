import Layout from "@/components/Layout/Layout";
import LenisProvider from "@/components/Layout/LenisProvider";
import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import About from "@/components/Philosophy/Philosophy";
import Services from "@/components/Services/Services";
import Portfolio from "@/components/Portfolio/Portfolio";
import Approach from "@/components/Approach/Approach";
import Testimonials from "@/components/Testimonials/Testimonials";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";
import Team from "@/components/Team/Team";
import Founder from "@/components/Philosophy/Philosophy";

export default function Home() {
  return (
    <LenisProvider>
      <Layout>
        <Navbar />
        <Hero />
        <Founder />
        <Team />
        <About />
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