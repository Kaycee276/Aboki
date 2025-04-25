import { motion } from "framer-motion";
import { formatCurrency } from "../../../utils/formatNumbers";
import { formatDate } from "../../../utils/formatDate";

export const PreviewModal = ({
	isOpen,
	onClose,
	depositUSD,
	borrowUSD,
	exchangeRate,
	loanDate,
}) => {
	if (!isOpen) return null;

	const calculateDuration = () => {
		const startDate = new Date();
		const endDate = new Date(loanDate);
		const months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
		return months - startDate.getMonth() + endDate.getMonth();
	};

	const interestRate = calculateDuration() * 2; // 2% per month

	const gasFee = borrowUSD * 0.005;

	return (
		<motion.div
			className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			onClick={onClose}
		>
			<motion.div
				className="bg-gradient-to-b from-[#010513] via-[#2D385D] to-black rounded-lg p-6 max-w-md w-full "
				initial={{ y: -20 }}
				animate={{ y: 0 }}
				onClick={(e) => e.stopPropagation()}
			>
				<h2 className="text-lg font-semibold mb-6 text-center">Review</h2>

				<div className="space-y-3 text-sm">
					<PreviewRow
						label="Loan amount"
						value={formatCurrency(borrowUSD * exchangeRate, "NGN")}
					/>
					<PreviewRow
						label="Asset deposited"
						value={
							<span className="flex items-center gap-2">
								{formatCurrency(depositUSD, "USD", 0)}
							</span>
						}
					/>
					<PreviewRow label="Gas fee" value={formatCurrency(gasFee, "USD")} />
					<PreviewRow label="Interest rate" value={interestRate.toFixed(2)} />
					<PreviewRow label="Exchange rate" value={`₦${exchangeRate}/USDT`} />
					<PreviewRow
						label="Wallet address"
						value={truncateAddress("0xc6b8Bhum...5gj8iB")}
					/>
					<PreviewRow
						label="Duration"
						value={
							<div>
								<p>{formatDate(loanDate)}</p>
								<p className="text-xs text-gray-400">
									{calculateDuration()} months
								</p>
							</div>
						}
					/>
				</div>

				<button className="w-full mt-6 py-2 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition">
					Confirm
				</button>
			</motion.div>
		</motion.div>
	);
};

// Helper component for table-like rows
const PreviewRow = ({ label, value }) => (
	<div className="flex justify-between items-center border-b border-white/10 pb-2">
		<span className="text-gray-300">{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

// Helper function to truncate wallet addresses
const truncateAddress = (address, start = 6, end = 4) => {
	return `${address.slice(0, start)}...${address.slice(-end)}`;
};
