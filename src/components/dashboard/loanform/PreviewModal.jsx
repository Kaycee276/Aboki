// components/PreviewModal.jsx
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { formatLoanDuration } from "../../../utils/formatDate";

export const PreviewModal = ({ isOpen, onClose, type, data }) => {
	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50 p-4"
			onClick={onClose}
		>
			<motion.div
				className="bg-gradient-to-b from-[#010616] via-[#23346A] to-[#333741] rounded-xl max-w-md w-full p-6 relative"
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				// exit={{ opacity: 0, scale: 0.9 }}
				transition={{ type: "spring", damping: 20, stiffness: 300 }}
				onClick={(e) => e.stopPropagation()}
			>
				<button
					onClick={onClose}
					className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-white"
				>
					<X size={20} />
				</button>

				<h2 className="text-xl font-bold mb-6">
					{type === "loan" ? "Loan Preview" : "Redeem Preview"}
				</h2>

				<div className="space-y-4 mb-6 ">
					{type === "loan" ? (
						<>
							<PreviewItem
								label="Loan Amount"
								value={`₦${parseFloat(data.borrowValue).toLocaleString()}`}
							/>
							<PreviewItem
								label="Asset Deposited"
								value={`${data.depositValue} ${data.depositToken}`}
							/>
							<PreviewItem label="Gas fee" value={undefined} />
							<PreviewItem label="Interest Rate" value={undefined} />
							<PreviewItem
								label="Exchange Rate"
								value={`₦${parseFloat(data.ngnToUsdRate).toLocaleString()}`}
							/>
							<PreviewItem label="Wallet Address" value={undefined} />
							<PreviewItem
								label="Loan Duration"
								value={formatLoanDuration(data.date)}
							/>
						</>
					) : (
						<>
							<PreviewItem
								label="Payment Amount"
								value={`${data.paymentValue} `}
							/>
						</>
					)}
				</div>

				<div className="flex justify-end space-x-3">
					{/* <button
						onClick={onConfirm}
						disabled={isLoading}
						className={`px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition ${
							isLoading ? "opacity-70 cursor-not-allowed" : ""
						}`}
					>
						{isLoading ? "Processing..." : "Confirm"}
					</button> */}
				</div>
			</motion.div>
		</div>
	);
};

const PreviewItem = ({ label, value }) => (
	<div className="flex justify-between border-b border-gray-700 border-dashed font-extralight ">
		<span className="">{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);
