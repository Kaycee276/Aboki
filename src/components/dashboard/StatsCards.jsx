import { Wallet, HandCoins, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const StatCard = ({ icon: Icon, label, value }) => (
	<motion.div
		className="flex items-center gap-4 px-5 py-4 w-full md:w-auto"
		initial={{ x: 20, opacity: 0 }}
		animate={{ x: 0, opacity: 1 }}
		transition={{ delay: 1, type: "spring", stiffness: 100 }}
	>
		<div className="bg-[#404875] p-3 rounded-lg">
			<Icon className="text-blue-500 w-6 h-6" />
		</div>
		<div>
			<p className="text-sm text-white/70">{label}</p>
			<p className="text-lg text-white font-semibold">{value}</p>
		</div>
	</motion.div>
);

export function StatsCards() {
	return (
		<div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center p-6 rounded-xl w-full">
			<StatCard icon={Wallet} label="Total assets" value="$87,743" />
			<StatCard icon={HandCoins} label="Loan balance" value="$18,342" />
			<StatCard icon={Trophy} label="Rewards" value="+12.3%" />
		</div>
	);
}
