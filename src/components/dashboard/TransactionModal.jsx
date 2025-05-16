import { motion } from "framer-motion";
import {
	X,
	ArrowDownLeft,
	ArrowUpRight,
	Calendar,
	Clock,
	RefreshCw,
} from "lucide-react";
import { formatNumber } from "../../utils/formatNumbers";
import { useState, useEffect } from "react";

export const TransactionModal = ({ onClose, initialTransactions }) => {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [transactions, setTransactions] = useState(initialTransactions);
	const [isRefreshing, setIsRefreshing] = useState(false);

	// Update current date every minute to keep countdown accurate
	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentDate(new Date());
		}, 60000);

		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		const handleStorageChange = () => {
			const stored = localStorage.getItem("transactionHistory");
			if (stored) {
				setTransactions(JSON.parse(stored));
			}
		};

		window.addEventListener("storage", handleStorageChange);
		return () => window.removeEventListener("storage", handleStorageChange);
	}, []);

	useEffect(() => {
		setTransactions(initialTransactions);
	}, [initialTransactions]);

	const handleRefresh = () => {
		setIsRefreshing(true);
		setTimeout(() => {
			const stored = localStorage.getItem("transactionHistory");
			if (stored) {
				setTransactions(JSON.parse(stored));
			}
			setIsRefreshing(false);
		}, 800);
	};

	// Calculate days remaining until repayment
	const getDaysRemaining = (repaymentDate) => {
		const repayDate = new Date(repaymentDate);
		const timeDiff = repayDate.getTime() - currentDate.getTime();
		const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

		if (daysDiff < 0) return "Overdue";
		if (daysDiff === 0) return "Due today";
		return `${daysDiff} day${daysDiff !== 1 ? "s" : ""} remaining`;
	};

	// Get status color based on days remaining
	const getStatusColor = (repaymentDate) => {
		const repayDate = new Date(repaymentDate);
		const timeDiff = repayDate.getTime() - currentDate.getTime();
		const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

		if (daysDiff < 1) return "text-red-500";
		if (daysDiff <= 7) return "text-amber-400";
		if (daysDiff <= 14) return "text-amber-300";
		return "text-blue-400";
	};

	// Sort transactions by date
	const sortedTransactions =
		Array.isArray(transactions) && transactions.length > 0
			? [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date))
			: [];

	// Group transactions by month
	const groupedTransactions = sortedTransactions.reduce(
		(groups, transaction) => {
			const date = new Date(transaction.date);
			const monthYear = date.toLocaleString("default", {
				month: "long",
				year: "numeric",
			});

			if (!groups[monthYear]) {
				groups[monthYear] = [];
			}

			groups[monthYear].push(transaction);
			return groups;
		},
		{}
	);

	return (
		<motion.div
			className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
			onClick={onClose}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<motion.div
				className="bg-gray-900 rounded-xl w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col shadow-xl border border-gray-800"
				onClick={(e) => e.stopPropagation()}
				initial={{ scale: 0.95, opacity: 0, y: 10 }}
				animate={{ scale: 1, opacity: 1, y: 0 }}
				exit={{ scale: 0.95, opacity: 0, y: 10 }}
				transition={{ duration: 0.2 }}
			>
				{/* Sticky Header */}
				<div className="p-5 border-b border-gray-800 flex justify-between items-center sticky top-0 bg-gray-900/95 backdrop-blur-sm z-10">
					<h3 className="text-xl font-semibold text-white">
						Transaction History
					</h3>
					<div className="flex items-center gap-2">
						<button
							onClick={handleRefresh}
							className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
							aria-label="Refresh transactions"
							disabled={isRefreshing}
						>
							{isRefreshing ? (
								<motion.div
									initial={{ rotate: 0 }}
									animate={{ rotate: 360 }}
									transition={{
										duration: 0.8,
										repeat: Infinity,
										ease: "linear",
									}}
								>
									<RefreshCw size={18} />
								</motion.div>
							) : (
								<RefreshCw size={18} />
							)}
						</button>
						<button
							onClick={onClose}
							className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
							aria-label="Close modal"
						>
							<X size={18} />
						</button>
					</div>
				</div>

				{/* Scrollable Content */}
				<div className="overflow-y-auto custom-scrollbar flex-1">
					{sortedTransactions.length > 0 ? (
						<div className="p-4">
							{Object.entries(groupedTransactions).map(
								([monthYear, monthTransactions]) => (
									<div className="relative">
										{isRefreshing && (
											<motion.div
												initial={{ opacity: 0 }}
												animate={{ opacity: 0.9 }}
												exit={{ opacity: 0 }}
												className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm z-10 flex items-center justify-center"
												transition={{ duration: 0.15 }}
											>
												<motion.div
													className="relative w-16 h-16"
													initial={{ rotate: 0 }}
													animate={{ rotate: 360 }}
													transition={{
														duration: 1.5,
														ease: "linear",
														repeat: Infinity,
													}}
												>
													<svg className="w-full h-full" viewBox="0 0 100 100">
														<motion.circle
															cx="50"
															cy="50"
															r="40"
															fill="none"
															strokeWidth="8"
															strokeLinecap="round"
															stroke="url(#gradient)"
															initial={{ pathLength: 0.1 }}
															animate={{
																pathLength: [0.1, 0.9, 0.1],
																opacity: [1, 0.7, 1],
															}}
															transition={{
																duration: 1.5,
																repeat: Infinity,
																ease: "easeInOut",
															}}
														/>
														<defs>
															<linearGradient
																id="gradient"
																x1="0%"
																y1="0%"
																x2="100%"
																y2="0%"
															>
																<stop offset="0%" stopColor="#3b82f6" />
																<stop offset="100%" stopColor="#8b5cf6" />
															</linearGradient>
														</defs>
													</svg>
													<div className="absolute inset-0 flex items-center justify-center">
														<RefreshCw className="text-blue-400" size={20} />
													</div>
												</motion.div>
											</motion.div>
										)}
										<div
											key={monthYear}
											className={`mb-6  ${
												isRefreshing ? "opacity-70" : "opacity-100"
											}`}
										>
											<h4 className="text-sm font-medium text-gray-400 mb-3 px-2">
												{monthYear}
											</h4>
											<div className={`space-y-3`}>
												{monthTransactions.map((tx) => {
													const isLoan = Boolean(tx.borrowValue);
													const date = new Date(tx.date);
													return (
														<motion.div
															key={JSON.stringify(transactions)}
															className="p-4 bg-gray-800/70 hover:bg-gray-800 rounded-xl border border-gray-700 transition-all"
															whileHover={{ scale: 1.01 }}
															transition={{ duration: 0.15 }}
														>
															<div className="flex justify-between items-center">
																<div className="flex items-center">
																	<div
																		className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
																			isLoan
																				? "bg-red-500/20 text-red-400"
																				: "bg-green-500/20 text-green-400"
																		}`}
																	>
																		{isLoan ? (
																			<ArrowUpRight size={18} />
																		) : (
																			<ArrowDownLeft size={18} />
																		)}
																	</div>
																	<div>
																		<span className="font-medium block text-white">
																			{isLoan ? "Loan" : "Redeem"}
																		</span>
																		<div className="flex flex-col gap-1 mt-1">
																			<div className="flex items-center text-sm text-gray-400">
																				<Calendar size={14} className="mr-1" />
																				{date.toLocaleDateString()}
																			</div>
																			{isLoan && (
																				<div className="flex items-center text-sm">
																					<Clock size={14} className="mr-1" />
																					<span
																						className={getStatusColor(tx.date)}
																					>
																						{getDaysRemaining(tx.date)}
																					</span>
																				</div>
																			)}
																		</div>
																	</div>
																</div>
																<div className="text-right">
																	<span
																		className={`font-medium block ${
																			isLoan ? "text-red-400" : "text-green-400"
																		}`}
																	>
																		{isLoan ? "-" : "+"} ₦
																		{formatNumber(
																			tx.borrowValue || tx.depositValue || 0
																		)}
																	</span>

																	<span className="text-sm text-gray-400 block mt-1">
																		{tx.depositValue} {tx.depositToken}
																	</span>
																</div>
															</div>
														</motion.div>
													);
												})}
											</div>
										</div>
									</div>
								)
							)}
						</div>
					) : (
						<div className="flex flex-col items-center justify-center py-16 px-4 text-center">
							<div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
								<Calendar size={24} className="text-gray-400" />
							</div>
							<h4 className="text-lg font-medium text-gray-300 mb-1">
								No transactions yet
							</h4>
							<p className="text-gray-500 text-sm max-w-xs">
								Your transaction history will appear here once you make your
								first loan or redemption.
							</p>
							<button
								onClick={handleRefresh}
								className="mt-4 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-700 transition-colors"
							>
								<RefreshCw
									size={16}
									className={isRefreshing ? "animate-spin" : ""}
								/>
								{isRefreshing ? "Refreshing..." : "Refresh"}
							</button>
						</div>
					)}
				</div>
			</motion.div>
		</motion.div>
	);
};
