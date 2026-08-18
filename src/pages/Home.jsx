import Navbar  from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeatureSection";
import BankingServices from "../components/BankingServices";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <main>
        
        <HeroSection />
        <FeatureSection />
        <BankingServices />
        
      </main>

      <Footer />
    </>
    
  );

}

export default Home;