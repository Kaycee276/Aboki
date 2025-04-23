import { motion } from "framer-motion";
import { Database, DollarSign, TrendingUp } from "lucide-react";

export const StatsCards = () => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
			<StatCard
				icon={<Database size={16} />}
				label="Total assets"
				value="$ 87,743"
				delay={0.7}
			/>
			<StatCard
				icon={<DollarSign size={16} />}
				label="Loan balance"
				value="$ 18,342"
				delay={0.8}
			/>
			<StatCard
				icon={<TrendingUp size={16} />}
				label="Rewards"
				value="+12.3%"
				colored
				delay={0.9}
			/>
		</div>
	);
};

const StatCard = ({ icon, label, value, colored = false, delay = 0 }) => (
	<motion.div
		className="bg-gray-800 p-4 rounded-lg sm:col-span-2 md:col-span-1"
		initial={{ scale: 0.9, opacity: 0 }}
		animate={{ scale: 1, opacity: 1 }}
		transition={{ delay }}
	>
		<div className="flex items-center text-sm text-gray-400 mb-2">
			{icon}
			<span className="ml-2">{label}</span>
		</div>
		<div className={`text-2xl font-bold ${colored ? "text-green-400" : ""}`}>
			{value}
		</div>
	</motion.div>
);
