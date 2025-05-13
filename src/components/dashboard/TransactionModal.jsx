import { motion } from "framer-motion";
import { X } from "lucide-react";

export const TransactionModal = ({ onClose, transactions = [] }) => {
	// Sort transactions by date (newest first)
	const sortedTransactions = [...transactions].sort(
		(a, b) => new Date(b.date) - new Date(a.date)
	);

	return (
		<div
			className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50 p-4"
			onClick={onClose}
		>
			<motion.div
				className="bg-gray-900 rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto custom-scrollbar"
				onClick={(e) => e.stopPropagation()}
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.9, opacity: 0 }}
			>
				<div className="p-4 border-b border-gray-800 flex justify-between items-center">
					<h3 className="text-lg font-semibold">Transaction History</h3>
					<button
						onClick={onClose}
						className="p-1 rounded-full hover:bg-gray-800 transition-colors"
					>
						<X size={20} />
					</button>
				</div>

				<div className="p-4">
					{sortedTransactions.length > 0 ? (
						<div className="space-y-3">
							{sortedTransactions.map((tx, index) => (
								<div key={index} className="p-3 bg-gray-800 rounded-lg">
									<div className="flex justify-between items-start">
										<div>
											<span className="font-medium block">
												{tx.borrowValue ? "Loan" : "Redeem"}
											</span>
											<span className="text-sm text-gray-400">
												Repayment Date:{" "}
												{new Date(tx.date).toLocaleString().split(",")[0]}
											</span>
										</div>
										<div className="text-right">
											{tx.borrowValue ? (
												<>
													<span className="font-medium block">
														{tx.borrowValue}
													</span>
													<span className="text-sm text-gray-400">Loan</span>
												</>
											) : (
												<>
													<span className="font-medium block">
														{tx.depositValue} {tx.depositToken}
													</span>
													<span className="text-sm text-gray-400">
														${tx.depositTokenPrice}
													</span>
												</>
											)}
										</div>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="text-center py-8 text-gray-400">
							No transactions yet
						</div>
					)}
				</div>
			</motion.div>
		</div>
	);
};
