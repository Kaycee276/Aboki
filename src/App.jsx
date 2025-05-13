// src/App.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import DashboardLayout from "./layouts/DashBoardLayout";
import Home from "./pages/Home";
import FAQ from "./pages/FAQ";
import Whitepaper from "./pages/Whitepaper";
import GlowingBubblesBackground from "./common/GlowingBubbles";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
// import LoanStatus from "./pages/LoanStatus";
import TrxHistory from "./pages/TrxHistory";
// import Rewards from "./pages/Rewards";
import NotFound from "./pages/404";

const App = () => {
	const location = useLocation();

	return (
		<>
			<AnimatePresence mode="wait">
				<Routes location={location} key={location.pathname}>
					{/* Public routes */}

					<Route
						path="/"
						element={
							<main className="bg-gradient-to-br from-[#161616] to-[#000512] pt-4 px-6">
								<Header />
								<GlowingBubblesBackground>
									<Home />
								</GlowingBubblesBackground>
							</main>
						}
					/>
					<Route
						path="/faq"
						element={
							<main className="bg-gradient-to-br from-[#161616] to-[#000512] pt-4 px-6">
								<Header />
								<GlowingBubblesBackground>
									<FAQ />
								</GlowingBubblesBackground>
							</main>
						}
					/>
					<Route
						path="/whitepaper"
						element={
							<main className="bg-gradient-to-br from-[#161616] to-[#000512] pt-4 px-6">
								<Header />
								<GlowingBubblesBackground>
									<Whitepaper />
								</GlowingBubblesBackground>
							</main>
						}
					/>

					{/* Dashboard routes */}
					<Route path="/dashboard" element={<DashboardLayout />}>
						<Route index element={<Dashboard />} />
						{/* <Route path="loan-status" element={<LoanStatus />} /> */}
						<Route path="history" element={<TrxHistory />} />
						{/* <Route path="rewards" element={<Rewards />} /> */}
					</Route>

					{/* Catch all 404 route */}
					<Route path="*" element={<NotFound />} />
				</Routes>
			</AnimatePresence>
		</>
	);
};

export default App;
