import { motion } from "framer-motion";

export const TransactionSuccessModal = ({ onClose, transactions }) => {
	return (
		<motion.div
			key="success-content"
			initial={{ x: "100%", opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			transition={{ duration: 0.3, ease: "easeInOut" }}
			className="w-full"
		>
			<h2 className="text-xl font-bold mb-6">Transaction Successful!</h2>

			{transactions && (
				<div className="mb-6 space-y-2">
					<p>
						Your loan of ₦
						{parseFloat(transactions.borrowValue).toLocaleString()} was
						successful!
					</p>
				</div>
			)}

			<div className="flex justify-end">
				<button
					onClick={onClose}
					className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
				>
					Close
				</button>
			</div>
		</motion.div>
	);
};
