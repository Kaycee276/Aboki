import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Header from "./components/Header";
import Home from "./pages/Home";
import FAQ from "./pages/FAQ";
import Whitepaper from "./pages/Whitepaper";
import Dashboard from "./pages/Dashboard";

import GlowingBubblesBackground from "./common/GlowingBubbles";

const App = () => {
	const location = useLocation();

	const isDashboard = location.pathname.startsWith("/dashboard");

	return (
		<>
			{isDashboard ? (
				<Routes location={location} key={location.pathname}>
					<Route path="/dashboard" element={<Dashboard />} />
				</Routes>
			) : (
				<main className="bg-gradient-to-br from-[#161616] to-[#000512] pt-4 px-6 ">
					<Header />
					<GlowingBubblesBackground>
						<AnimatePresence mode="wait">
							<Routes location={location} key={location.pathname}>
								<Route path="/" element={<Home />} />
								<Route path="/faq" element={<FAQ />} />
								<Route path="/whitepaper" element={<Whitepaper />} />
							</Routes>
						</AnimatePresence>
					</GlowingBubblesBackground>
				</main>
			)}
		</>
	);
};

export default App;
