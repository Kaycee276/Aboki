import { motion } from "framer-motion";
import { formatCurrency } from "../../../utils/formatNumbers";

export const LoanSummary = ({ depositUSD, borrowUSD, ltv }) => (
	<motion.div
		initial={{ x: -20, opacity: 0 }}
		animate={{ x: 0, opacity: 1 }}
		transition={{ delay: 1, type: "spring", stiffness: 100 }}
		className="text-sm text-gray-400 mt-2 mb-4 space-y-1"
	>
		<p>
			Deposit (USD):{" "}
			<span className="text-white">{formatCurrency(depositUSD)}</span>
		</p>
		<p>
			Borrow (USD):{" "}
			<span className="text-white">{formatCurrency(borrowUSD)}</span>
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
);
