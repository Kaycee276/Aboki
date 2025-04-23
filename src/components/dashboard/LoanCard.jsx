import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { FaEthereum, FaBitcoin } from "react-icons/fa";
import { SiTether } from "react-icons/si";

// import { Calendar } from "react-feather";
import {
	format,
	addDays,
	addMonths,
	isSameDay,
	// isWithinInterval,
} from "date-fns";

export const LoanCard = () => {
	const [deposit, setDeposit] = useState("");
	const [borrow, setBorrow] = useState("");
	const [depositRate, setDepositRate] = useState(1); // USD rate of deposit currency
	const [borrowRate, setBorrowRate] = useState(1); // USD rate of borrow currency

	const [loanDate, setLoanDate] = useState(new Date().toISOString());

	const handleDateChange = (dateString) => {
		const dateObj = new Date(dateString);
		setLoanDate(dateObj);
	};

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

			<form className="max-w-lg mx-auto">
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
				<motion.div
					initial={{ x: -20, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ delay: 1, type: "spring", stiffness: 100 }}
					className="text-sm text-gray-400 mt-2 mb-4 space-y-1"
				>
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
				</motion.div>

				<LoanDateInput
					date={loanDate}
					onDateChange={handleDateChange}
					delay={1.3}
				/>
				<ProceedButton delay={1.4} disabled={!isValid} />
			</form>
		</motion.div>
	);
};

const LoanInput = ({ label, value, onChange, delay, setRate }) => {
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

	// Fetch rates for all currencies
	useEffect(() => {
		const fetchRates = async () => {
			setLoading(true);
			try {
				const response = await fetch(
					`https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin,tether&vs_currencies=usd`
				);
				const data = await response.json();

				setRates({
					eth: data.ethereum?.usd || 1,
					btc: data.bitcoin?.usd || 1,
					usdt: data.tether?.usd || 1,
				});

				// Set initial rate based on selected currency
				const currentRate =
					data[
						selectedCurrency === "eth"
							? "ethereum"
							: selectedCurrency === "btc"
							? "bitcoin"
							: "tether"
					]?.usd || 1;
				setRate(currentRate);
			} catch (error) {
				console.error("Failed to fetch rates:", error);
				// Fallback rates if API fails
				setRates({
					eth: 1,
					btc: 1,
					usdt: 1,
				});
				setRate(1);
			} finally {
				setLoading(false);
			}
		};

		fetchRates();
	}, [setRate]);

	// Update parent rate when currency changes
	useEffect(() => {
		if (rates[selectedCurrency] !== null) {
			setRate(rates[selectedCurrency]);
		}
	}, [selectedCurrency, rates, setRate]);

	const computedEquivalent = () => {
		if (loading) return "Loading rates...";
		const numericValue = parseFloat(value) || 0;
		const currentRate = rates[selectedCurrency] || 1;
		return `$${(numericValue * currentRate).toFixed(2)}`;
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
					<div
						className="flex justify-between items-center bg-[#181818] text-white border border-gray-600 rounded-t-lg px-2 py-1 text-sm cursor-pointer "
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
									className={`px-3 py-2 text-sm cursor-pointer hover:bg-blue-600 transition-colors  ${
										selectedCurrency === currency.symbol
											? "bg-blue-700 text-white"
											: "text-gray-200"
									}`}
									onClick={() => {
										setSelectedCurrency(currency.symbol);
										setIsOpen(false);
									}}
								>
									{/* {currencyIcons[currency.symbol]} */}
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
				onChange={onChange}
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

const LoanDateInput = ({ date, delay, onDateChange }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState(new Date(date));
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const calendarRef = useRef(null);
	const inputRef = useRef(null);

	// Close calendar when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				calendarRef.current &&
				!calendarRef.current.contains(event.target) &&
				event.target !== inputRef.current &&
				!inputRef.current.contains(event.target)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleDateSelect = (day) => {
		event.preventDefault(); // Prevent page refresh
		setSelectedDate(day);
		onDateChange(day.toISOString()); // Pass date to parent
		setIsOpen(false);
	};

	const nextMonth = () => {
		event.preventDefault();
		setCurrentMonth(addMonths(currentMonth, 1));
	};

	const prevMonth = () => {
		event.preventDefault();
		setCurrentMonth(addMonths(currentMonth, -1));
	};

	const generateDays = () => {
		const startDate = new Date(
			currentMonth.getFullYear(),
			currentMonth.getMonth(),
			1
		);
		const endDate = new Date(
			currentMonth.getFullYear(),
			currentMonth.getMonth() + 1,
			0
		);
		const startDay = startDate.getDay();
		const days = [];

		// Add empty cells for days before the start of the month
		for (let i = 0; i < startDay; i++) {
			days.push(<div key={`empty-${i}`} className="w-8 h-8" />);
		}

		// Add days of the month
		for (let day = 1; day <= endDate.getDate(); day++) {
			const date = new Date(
				currentMonth.getFullYear(),
				currentMonth.getMonth(),
				day
			);
			const isSelected = isSameDay(date, selectedDate);
			const isToday = isSameDay(date, new Date());

			days.push(
				<button
					key={`day-${day}`}
					onClick={(e) => {
						e.preventDefault();
						handleDateSelect(date);
					}}
					className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors
            ${isSelected ? "bg-blue-600 text-white" : ""}
            ${isToday ? "border border-blue-400" : ""}
            hover:bg-blue-500 hover:text-white
            focus:outline-none`}
				>
					{day}
				</button>
			);
		}

		return days;
	};

	const quickSelectOptions = [
		{ label: "Today", days: 0 },
		{ label: "1 Week", days: 7 },
		{ label: "2 Weeks", days: 14 },
		{ label: "1 Month", days: 30 },
	];

	return (
		<div className="relative">
			<motion.div
				className="border border-blue-900 rounded-md p-4 mb-6"
				initial={{ x: -20, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ delay }}
				ref={inputRef}
			>
				<div
					className="flex justify-between items-center mb-2 cursor-pointer"
					onClick={(e) => {
						e.preventDefault();
						setIsOpen(!isOpen);
					}}
				>
					<span className="text-white font-medium">Duration</span>
					<div className="flex items-center">
						<span className="text-gray-400 mr-2">
							{format(selectedDate, "MMM dd, yyyy")}
						</span>
						<Calendar size={18} className="text-gray-400" />
					</div>
				</div>
			</motion.div>

			{isOpen && (
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.2 }}
					className="absolute z-10 bottom-full mb-2 left-0 right-0 bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-4"
					ref={calendarRef}
				>
					<div className="flex justify-between items-center mb-4">
						<button
							onClick={(e) => {
								e.preventDefault();
								prevMonth();
							}}
							className="p-1 rounded hover:bg-gray-700 focus:outline-none"
						>
							<svg
								className="w-5 h-5 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 19l-7-7 7-7"
								/>
							</svg>
						</button>
						<h3 className="text-white font-medium">
							{format(currentMonth, "MMMM yyyy")}
						</h3>
						<button
							onClick={(e) => {
								e.preventDefault();
								nextMonth();
							}}
							className="p-1 rounded hover:bg-gray-700 focus:outline-none"
						>
							<svg
								className="w-5 h-5 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</button>
					</div>

					<div className="grid grid-cols-7 gap-1 mb-2">
						{["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
							<div
								key={day}
								className="text-center text-gray-500 text-xs font-medium"
							>
								{day}
							</div>
						))}
					</div>

					<div className="grid grid-cols-7 gap-1">{generateDays()}</div>

					<div className="mt-4 pt-4 border-t border-gray-700">
						<h4 className="text-sm text-gray-400 mb-2">Quick Select</h4>
						<div className="flex flex-wrap gap-2">
							{quickSelectOptions.map((option) => (
								<button
									key={option.label}
									onClick={(e) => {
										e.preventDefault();
										const newDate = addDays(new Date(), option.days);
										handleDateSelect(newDate);
									}}
									className="px-3 py-1 text-xs bg-gray-700 rounded hover:bg-gray-600 focus:outline-none"
								>
									{option.label}
								</button>
							))}
						</div>
					</div>
				</motion.div>
			)}
		</div>
	);
};

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
