import { motion } from "framer-motion";
import { Database, BarChart2, History, Gift, LogOut } from "lucide-react";

export const MobileIconsSidebar = () => {
	return (
		<div className="md:hidden fixed top-0 left-0 w-16 p-4 flex flex-col h-full z-0">
			<div className="mb-8 flex justify-center">
				<span className="text-xl font-bold">
					A<span className="text-blue-400">.</span>
				</span>
			</div>

			<nav className="flex flex-col space-y-4 flex-grow items-center">
				<IconButton icon={<Database size={18} />} active />
				<IconButton icon={<BarChart2 size={18} />} />
				<IconButton icon={<History size={18} />} />
				<IconButton icon={<Gift size={18} />} />
			</nav>

			<motion.button
				className="flex items-center justify-center text-red-400 mt-auto p-2 w-10 h-10"
				whileHover={{ scale: 1.1, color: "#f87171" }}
				whileTap={{ scale: 0.9 }}
			>
				<LogOut size={18} />
			</motion.button>
		</div>
	);
};

const IconButton = ({ icon, active = false }) => (
	<motion.button
		className={`flex items-center justify-center p-2 rounded-lg w-10 h-10 cursor-pointer ${
			active ? "bg-blue-600" : "text-gray-300 hover:bg-gray-700"
		}`}
	>
		{icon}
	</motion.button>
);
