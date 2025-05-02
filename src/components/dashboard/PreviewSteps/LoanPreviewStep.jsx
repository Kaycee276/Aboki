import { motion } from "framer-motion";
import { LoanPreviewContent } from "./LoanPreviewContent";
import { RedeemPreviewContent } from "./RedeemPreviewContent";
import { PrimaryButton } from "../loanform/PrimaryButton";

export const LoanPreviewStep = ({ type, data, onConfirm }) => {
	return (
		<motion.div
			key="preview-content"
			initial={{ x: 0, opacity: 1 }}
			exit={{ x: "-100%", opacity: 0 }}
			transition={{ duration: 0.3, ease: "easeInOut" }}
			className="w-full"
		>
			<h2 className="text-xl font-bold mb-6">
				{type === "loan" ? "Loan Preview" : "Redeem Preview"}
			</h2>

			<div className="space-y-4 mb-6">
				{type === "loan" ? (
					<LoanPreviewContent data={data} />
				) : (
					<RedeemPreviewContent data={data} />
				)}
			</div>

			{/* Only show thw confirm button for loan type for now */}
			{type === "loan" && (
				<div className="flex justify-end space-x-3">
					<PrimaryButton
						onClick={onConfirm}
						className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition"
					>
						Confirm
					</PrimaryButton>
				</div>
			)}
		</motion.div>
	);
};
