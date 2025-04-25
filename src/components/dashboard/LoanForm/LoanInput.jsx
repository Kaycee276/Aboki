import { useState, useEffect, useRef } from "react";
import { FaEthereum, FaBitcoin } from "react-icons/fa";
import { SiTether } from "react-icons/si";
import { motion } from "framer-motion";

export const LoanInput = ({
	label,
	value,
	onChange,
	delay = 0,
	setRate,
	setExchangeRate,
}) => {
	const [selectedCurrency, setSelectedCurrency] = useState("usdt");
	const currencies = [
		{ id: "ethereum", symbol: "eth" },
		{ id: "bitcoin", symbol: "btc" },
		{ id: "tether", symbol: "usdt" },
	];
	const currencyIcons = {
		eth: <FaEthereum className="text-[#627EEA] mr-2" size={16} />,
		btc: <FaBitcoin className="text-[#F7931A] mr-2" size={16} />,
		usdt: <SiTether className="text-[#26A17B] mr-2" size={16} />,
	};
	const [rates, setRates] = useState({
		eth: null,
		btc: null,
		usdt: null,
	});
	const [loading, setLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	useEffect(() => {
		const fetchRates = async () => {
			setLoading(true);
			try {
				// Fetch both USD and NGN rates for supported currencies
				const response = await fetch(
					`https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin,tether&vs_currencies=usd,ngn`
				);
				const data = await response.json();

				setRates({
					eth: data.ethereum?.usd || 1,
					btc: data.bitcoin?.usd || 1,
					usdt: data.tether?.usd || 1,
				});

				// Get NGN exchange rate from USDT
				const ngnRate = data.tether?.ngn || 1500; // Fallback to 1500 ₦/USDT
				setExchangeRate(ngnRate); // New state in parent component

				const currentUsdRate =
					data[
						selectedCurrency === "eth"
							? "ethereum"
							: selectedCurrency === "btc"
							? "bitcoin"
							: "tether"
					]?.usd || 1;
				setRate(currentUsdRate);
			} catch (error) {
				console.error("Failed to fetch rates:", error);
				setRates({
					eth: 1,
					btc: 1,
					usdt: 1,
				});
				setRate(1);
				setExchangeRate(1500);
			} finally {
				setLoading(false);
			}
		};

		fetchRates();
	}, [setRate, setExchangeRate]); // Add setExchangeRate to dependencies

	useEffect(() => {
		if (rates[selectedCurrency] !== null) {
			setRate(rates[selectedCurrency]);
		}
	}, [selectedCurrency, rates, setRate]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const computedEquivalent = () => {
		if (loading) return "Loading rates...";
		const numericValue = parseFloat(value) || 0;
		const currentRate = rates[selectedCurrency] || 1;
		return `$${(numericValue * currentRate).toFixed(2)}`;
	};

	return (
		<motion.div
			className="border border-blue-900 rounded-md p-4 mb-4"
			initial={{ x: -20, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			transition={{ delay }}
		>
			<div className="flex justify-between items-center mb-2 gap-4">
				<label className="text-white font-medium text-sm tracking-wide">
					{label}
				</label>

				<div className="relative w-24" ref={dropdownRef}>
					<div
						className="flex justify-between items-center bg-[#181818] text-white border border-gray-600 rounded-t-lg px-2 py-1 text-sm cursor-pointer"
						onClick={() => setIsOpen(!isOpen)}
					>
						<div className="flex items-center">
							{currencyIcons[selectedCurrency]}
							<span>{selectedCurrency.toUpperCase()}</span>
						</div>
						<svg
							className={`w-4 h-4 transform transition-transform ${
								isOpen ? "rotate-180" : ""
							}`}
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</div>

					{isOpen && (
						<div className="absolute z-10 w-full max-h-36 custom-scrollbar overflow-y-auto bg-gray-800 border border-gray-600 rounded-b-lg shadow-lg">
							{currencies.map((currency) => (
								<div
									key={currency.symbol}
									className={`px-3 py-2 text-sm cursor-pointer hover:bg-blue-600 transition-colors ${
										selectedCurrency === currency.symbol
											? "bg-blue-700 text-white"
											: "text-gray-200"
									}`}
									onClick={() => {
										setSelectedCurrency(currency.symbol);
										setIsOpen(false);
									}}
								>
									{currency.symbol.toUpperCase()}
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			<input
				type="text"
				pattern="0-9"
				inputMode="numeric"
				value={value}
				onChange={(e) => onChange(e)}
				placeholder="0"
				className="w-full text-3xl bg-transparent text-white placeholder-gray-500 focus:outline-none"
			/>

			<div className="text-gray-500 mt-1">
				{computedEquivalent()}
				{!loading && (
					<span className="text-xs ml-2">
						(1 {selectedCurrency.toUpperCase()} = $
						{rates[selectedCurrency]?.toFixed(2) || "1.00"})
					</span>
				)}
			</div>
		</motion.div>
	);
};
