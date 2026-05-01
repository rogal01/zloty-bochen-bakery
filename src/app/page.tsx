import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import History from "@/components/History";
import Products from "@/components/Products";
import Configurator from "@/components/CakeConfigurator/Configurator";
import Locations from "@/components/Locations";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <History />
      <Products />
      <Configurator />
      <Locations />
      <Footer />
    </main>
  );
}