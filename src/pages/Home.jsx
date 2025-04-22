import Hero from "../components/Hero";
import About from "../components/About";
import Benefits from "../components/Benefits";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <section className=" text-white px-4 sm:px-16 flex flex-col min-h-screen">
      <Hero />
      <About />
      <Benefits />
      <Contact />
      <Footer />
    </section>
  );
}
