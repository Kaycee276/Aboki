import { motion } from "framer-motion";
import { LayoutDashboard, Trophy, History, LogOut } from "lucide-react";
import { MdOutlinePayments } from "react-icons/md";

export const DesktopSidebar = () => {
	return (
		<motion.div
			className="hidden md:flex w-64  p-4 flex-col h-full"
			initial={{ x: -256 }}
			animate={{ x: 0 }}
			transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
		>
			<div className="mb-8">
				<motion.h1
					className="text-xl font-bold"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.4 }}
				>
					Aboki<span className="text-blue-400">.eth</span>
				</motion.h1>
			</div>

			<nav className="flex flex-col space-y-4 flex-grow">
				<AnimatedNavButton
					icon={<LayoutDashboard size={18} />}
					text="Dashboard"
					active
					delay={0.5}
				/>
				<AnimatedNavButton
					icon={<MdOutlinePayments size={18} />}
					text="Loan status"
					delay={0.6}
				/>
				<AnimatedNavButton
					icon={<History size={18} />}
					text="Transaction history"
					delay={0.7}
				/>
				<AnimatedNavButton
					icon={<Trophy size={18} />}
					text="Rewards"
					delay={0.8}
				/>
			</nav>

			<motion.button
				className="flex items-center space-x-2 text-red-400 mt-auto p-2 cursor-pointer"
				whileHover={{ scale: 1.03, color: "#f87171" }}
				whileTap={{ scale: 0.97 }}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1 }}
			>
				<LogOut size={18} />
				<span>Log Out</span>
			</motion.button>
		</motion.div>
	);
};

const AnimatedNavButton = ({ icon, text, active = false, delay = 0 }) => (
	<motion.button
		className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${
			active ? "bg-blue-600" : "text-gray-300 hover:bg-gray-700"
		}`}
		initial={{ opacity: 0, x: -20 }}
		animate={{ opacity: 1, x: 0 }}
		transition={{ delay }}
	>
		{icon}
		<span>{text}</span>
	</motion.button>
);
