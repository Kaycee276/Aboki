import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";

export const TransactionSuccessModal = ({ onClose, transactions }) => {
	return (
		<motion.div
			key="success-content"
			initial={{ scale: 0.95, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			exit={{ scale: 0.95, opacity: 0 }}
			transition={{ duration: 0.2, ease: "easeInOut" }}
			className="w-full max-w-md p-6"
		>
			<div className="flex flex-col items-center text-center">
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ delay: 0.1, type: "spring" }}
					className="mb-4 text-green-400"
				>
					<FiCheckCircle size={48} className="stroke-current" />
				</motion.div>

				<h2 className="text-2xl font-bold text-white mb-2">
					Transaction Successful!
				</h2>

				<p className="text-gray-300 mb-6">
					Your request has been processed successfully
				</p>

				{transactions && (
					<div className="w-full bg-gray-800 bg-opacity-50 rounded-lg p-4 mb-6">
						<div className="flex justify-between items-center">
							<span className="text-gray-300">Loan Amount:</span>
							<span className="font-semibold text-white">
								₦{parseFloat(transactions.borrowValue).toLocaleString()}
							</span>
						</div>
					</div>
				)}

				<button
					onClick={onClose}
					className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 cursor-pointer"
				>
					Close
				</button>
			</div>
		</motion.div>
	);
};
