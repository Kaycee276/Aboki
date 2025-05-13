import { motion } from "framer-motion";
import { X } from "lucide-react";
import { MdOutlinePayments } from "react-icons/md";

export const LoanStatusModal = ({
	onClose,
	loanBalance = 0,
	borrowedAmount = 0,
	repaymentDate,
	status = "Active",
}) => {
	return (
		<div
			className="fixed inset-0 backdrop-blur-sm bg-opacity-70 flex items-center justify-center z-50 p-4"
			onClick={onClose}
		>
			<motion.div
				className="bg-gradient-to-b from-[#010616] via-[#23346A] to-[#333741] rounded-lg w-full max-w-md"
				onClick={(e) => e.stopPropagation()}
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.9, opacity: 0 }}
			>
				<div className="p-4 border-b border-gray-800 flex justify-between items-center">
					<div className="flex items-center space-x-2">
						<MdOutlinePayments size={20} className="text-blue-400" />
						<h3 className="text-lg font-semibold">Loan Status</h3>
					</div>
					<button
						onClick={onClose}
						className="p-1 rounded-full hover:bg-gray-800 transition-colors"
					>
						<X size={20} />
					</button>
				</div>

				<div className="p-6 space-y-4">
					<div className="flex justify-between">
						<span className="text-gray-400">Status</span>
						<span
							className={`font-medium ${
								status === "Active"
									? "text-green-400"
									: status === "Pending"
									? "text-yellow-400"
									: "text-red-400"
							}`}
						>
							{status}
						</span>
					</div>

					<div className="flex justify-between">
						<span className="text-gray-400">Borrowed Amount</span>
						<span className="font-medium">{borrowedAmount} NGN</span>
					</div>

					<div className="flex justify-between">
						<span className="text-gray-400">Outstanding Balance</span>
						<span className="font-medium">{loanBalance} NGN</span>
					</div>

					{repaymentDate && (
						<div className="flex justify-between">
							<span className="text-gray-400">Repayment Date</span>
							<span className="font-medium">
								{new Date(repaymentDate).toLocaleDateString()}
							</span>
						</div>
					)}
				</div>
			</motion.div>
		</div>
	);
};
