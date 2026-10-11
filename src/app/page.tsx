import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FreshBatchTicker from "@/components/FreshBatchTicker";
import History from "@/components/History";
import Products from "@/components/Products";
import Configurator from "@/components/CakeConfigurator/Configurator";
import Locations from "@/components/Locations";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

export default function Home() {
  return (
    <main className="min-h-[100dvh] flex flex-col bg-[#fdfaf6]">
      <Navbar />
      <Hero />
      <FreshBatchTicker />
      <History />
      <Products />
      <Configurator />
      <Locations />
      <Footer />
      <CookieBanner />
    </main>
  );
}