import { motion } from "framer-motion";
import { PrimaryButton } from "../loanform/PrimaryButton";

export const ConfirmationStep = ({ onClose }) => {
	return (
		<motion.div
			key="confirmation-content"
			initial={{ x: "100%", opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: "100%", opacity: 0 }}
			transition={{ duration: 0.3, ease: "easeInOut" }}
			className="w-full"
		>
			<h2 className="text-xs mb-6">
				Choose an account number you want the money to be sent to
			</h2>

			<div className="space-y-4 mb-6">
				<div className="flex flex-col items-center py-4">
					<p className="text-center">Your transaction is being processed...</p>
				</div>
			</div>

			<div className="flex justify-end space-x-3">
				<PrimaryButton
					onClick={onClose}
					className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition"
				>
					Close
				</PrimaryButton>
			</div>
		</motion.div>
	);
};
