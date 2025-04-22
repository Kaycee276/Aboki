import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Header from "./components/Header";
import Home from "./pages/Home";
import FAQ from "./pages/FAQ";
import Whitepaper from "./pages/Whitepaper";

import GlowingBubblesBackground from "./common/GlowingBubbles";

import { WalletConnectProvider } from "./contexts/WalletConnectContext";

const App = () => {
  const location = useLocation();
  return (
    <WalletConnectProvider>
      <main className="bg-gradient-to-br from-[#161616] to-[#000512] pt-4 px-6 font-">
        <Header />
        <GlowingBubblesBackground>
          <main className="">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/whitepaper" element={<Whitepaper />} />
              </Routes>
            </AnimatePresence>
          </main>
        </GlowingBubblesBackground>
      </main>
    </WalletConnectProvider>
  );
};

export default App;
