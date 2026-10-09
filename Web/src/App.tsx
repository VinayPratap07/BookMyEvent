import HeroSection from "./Components/Hero.Sectio";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <div className="min-h-screen"></div>
    </div>
  );
}

export default App;
