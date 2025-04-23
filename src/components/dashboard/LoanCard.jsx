import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export const LoanCard = ({ date }) => {
	const [deposit, setDeposit] = useState("");
	const [borrow, setBorrow] = useState("");
	const [depositRate, setDepositRate] = useState(1); // USD rate of deposit currency
	const [borrowRate, setBorrowRate] = useState(1); // USD rate of borrow currency

	const depositUSD = parseFloat(deposit || 0) * depositRate;
	const borrowUSD = parseFloat(borrow || 0) * borrowRate;
	const ltv = depositUSD > 0 ? (borrowUSD / depositUSD) * 100 : 0;
	const isValid = depositUSD > 0 && borrowUSD > 0 && ltv <= 75;

	return (
		<motion.div
			className="bg-[rgba(0,0,0,0.5)] rounded-lg p-4 md:p-6 flex-1"
			initial={{ y: 20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ delay: 1, type: "spring", stiffness: 100 }}
		>
			<div className="flex justify-between items-center mb-6">
				<h3 className="text-xl">Loan</h3>
				<button className="text-gray-400 hover:text-white">Redeem</button>
			</div>

			<div className="max-w-lg mx-auto">
				<LoanInput
					label="Deposit"
					value={deposit}
					onChange={(e) => setDeposit(e.target.value)}
					setRate={setDepositRate}
					delay={1.1}
				/>
				<LoanInput
					label="Borrow"
					value={borrow}
					onChange={(e) => setBorrow(e.target.value)}
					setRate={setBorrowRate}
					delay={1.2}
				/>

				{/* Loan Summary */}
				<div className="text-sm text-gray-400 mt-2 mb-4 space-y-1">
					<p>
						Deposit (USD):{" "}
						<span className="text-white">${depositUSD.toFixed(2)}</span>
					</p>
					<p>
						Borrow (USD):{" "}
						<span className="text-white">${borrowUSD.toFixed(2)}</span>
					</p>
					<p>
						LTV:{" "}
						<span
							className={`font-semibold ${
								ltv > 75 ? "text-red-500" : "text-green-400"
							}`}
						>
							{ltv.toFixed(2)}%
						</span>
					</p>
				</div>

				<LoanDateInput date={date} delay={1.3} />
				<ProceedButton delay={1.4} disabled={!isValid} />
			</div>
		</motion.div>
	);
};

const LoanInput = ({ label, value, onChange, delay, setRate }) => {
	const [selectedCurrency, setSelectedCurrency] = useState("usdt");
	const [currencies, setCurrencies] = useState([]);
	const [rate, setLocalRate] = useState(null);

	// Fetch available currencies
	useEffect(() => {
		fetch("https://api.coingecko.com/api/v3/simple/supported_vs_currencies")
			.then((res) => res.json())
			.then((data) => setCurrencies(data.slice(0, 30))); // limit for usability
	}, []);

	// Fetch rate for selected currency in USD
	useEffect(() => {
		const fetchRate = async () => {
			try {
				const res = await fetch(
					`https://api.coingecko.com/api/v3/simple/price?ids=usd-coin&vs_currencies=usd`
				);
				const data = await res.json();
				const key = Object.keys(data)[0];
				const rate = data[key]?.usd || 0;

				setLocalRate(rate); // Local use
				setRate(rate); // Pass to parent
			} catch (err) {
				console.error("Failed to fetch rate", err);
			}
		};

		fetchRate();
	}, []);

	const computedEquivalent = () => {
		const numericValue = parseFloat(value) || 0;
		return rate ? `$${(numericValue * rate).toFixed(2)}` : "Loading...";
	};

	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	// Close dropdown when clicking outside
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
					{/* Selected value display */}
					<div
						className="flex justify-between items-center bg-[#181818] text-white border border-gray-600 rounded-lg px-2 py-1 text-sm cursor-pointer hover:scale-105 duration-300 transition"
						onClick={() => setIsOpen(!isOpen)}
					>
						<span>{selectedCurrency.toUpperCase()}</span>
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

					{/* Dropdown options */}
					{isOpen && (
						<div className="absolute z-10 mt-1 w-full max-h-36 custom-scrollbar overflow-y-scroll  bg-gray-800 border border-gray-600 rounded-lg shadow-lg overflow-hidden">
							{currencies.map((cur) => (
								<div
									key={cur}
									className={`px-3 py-2 text-sm cursor-pointer hover:bg-blue-600 transition-colors ${
										selectedCurrency === cur
											? "bg-blue-700 text-white"
											: "text-gray-200"
									}`}
									onClick={() => {
										setSelectedCurrency(cur);
										setIsOpen(false);
									}}
								>
									{cur.toUpperCase()}
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			<input
				type="text"
				inputMode="numeric"
				value={value}
				onChange={onChange}
				placeholder="0"
				className="w-full text-3xl bg-transparent text-white placeholder-gray-500 focus:outline-none"
			/>

			<div className="text-gray-500 mt-1">{computedEquivalent()}</div>
		</motion.div>
	);
};

const LoanDateInput = ({ date, delay }) => (
	<motion.div
		className="border border-blue-900 rounded-md p-4 mb-6"
		initial={{ x: -20, opacity: 0 }}
		animate={{ x: 0, opacity: 1 }}
		transition={{ delay }}
	>
		<div className="flex justify-between items-center mb-2">
			<span>Duration</span>
			<Calendar size={18} className="text-gray-400" />
		</div>
		<div className="text-lg">{date}</div>
	</motion.div>
);

const ProceedButton = ({ delay }) => (
	<motion.button
		className="w-full bg-white text-blue-600 font-medium py-3 rounded-md"
		whileHover={{ scale: 1.02, backgroundColor: "#f0f9ff" }}
		whileTap={{ scale: 0.98 }}
		initial={{ y: 20, opacity: 0 }}
		animate={{ y: 0, opacity: 1 }}
		transition={{ delay }}
	>
		Proceed
	</motion.button>
);
