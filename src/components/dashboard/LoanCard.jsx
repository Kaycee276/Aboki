import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

export const LoanCard = ({ date }) => {
	return (
		<motion.div
			className="bg-gray-800 rounded-lg p-4 md:p-6 flex-1"
			initial={{ y: 20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ delay: 1, type: "spring", stiffness: 100 }}
		>
			<div className="flex justify-between items-center mb-6">
				<h3 className="text-xl">Loan</h3>
				<button className="text-gray-400 hover:text-white">Redeem</button>
			</div>

			<div className="max-w-lg mx-auto">
				<LoanInput
					label="Deposit"
					currency="USDT"
					value="0"
					equivalent="$0.00"
					delay={1.1}
				/>
				<LoanInput
					label="Borrow"
					currency="XGN"
					value="0"
					equivalent="$0.00"
					delay={1.2}
				/>
				<LoanDateInput date={date} delay={1.3} />
				<ProceedButton delay={1.4} />
			</div>
		</motion.div>
	);
};

const LoanInput = ({ label, currency, value, equivalent, delay }) => (
	<motion.div
		className="border border-blue-900 rounded-md p-4 mb-4"
		initial={{ x: -20, opacity: 0 }}
		animate={{ x: 0, opacity: 1 }}
		transition={{ delay }}
	>
		<div className="flex justify-between items-center mb-2">
			<span>{label}</span>
			<div className="flex items-center space-x-1 text-sm">
				<div className="w-2 h-2 rounded-full bg-green-400"></div>
				<span>{currency}</span>
				<span className="text-gray-500">▾</span>
			</div>
		</div>
		<div className="text-3xl mb-1">{value}</div>
		<div className="text-gray-500">{equivalent}</div>
	</motion.div>
);

const LoanDateInput = ({ date, delay }) => (
	<motion.div
		className="border border-blue-900 rounded-md p-4 mb-6"
		initial={{ x: -20, opacity: 0 }}
		animate={{ x: 0, opacity: 1 }}
		transition={{ delay }}
	>
		<div className="flex justify-between items-center mb-2">
			<span>Duration</span>
			<Calendar size={18} className="text-gray-400" />
		</div>
		<div className="text-lg">{date}</div>
	</motion.div>
);

const ProceedButton = ({ delay }) => (
	<motion.button
		className="w-full bg-white text-blue-600 font-medium py-3 rounded-md"
		whileHover={{ scale: 1.02, backgroundColor: "#f0f9ff" }}
		whileTap={{ scale: 0.98 }}
		initial={{ y: 20, opacity: 0 }}
		animate={{ y: 0, opacity: 1 }}
		transition={{ delay }}
	>
		Proceed
	</motion.button>
);
