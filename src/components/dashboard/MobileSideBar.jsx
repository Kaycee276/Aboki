import { motion } from "framer-motion";
import { LayoutDashboard, Trophy, History, LogOut, X } from "lucide-react";
import { MdOutlinePayments } from "react-icons/md";

export const MobileSidebar = ({ isOpen, onClose }) => {
	return (
		<motion.div
			className="md:hidden fixed top-0 left-0 w-64 bg-gray-800 p-4 flex flex-col h-full z-10"
			initial={{ x: -256 }}
			animate={{ x: 0 }}
			exit={{ x: -256 }}
			transition={{ type: "spring", stiffness: 300, damping: 30 }}
		>
			<div className="mb-8 flex items-center justify-between">
				<h1 className="text-xl font-bold">
					Aboki<span className="text-blue-400">.eth</span>
				</h1>
				<motion.button
					onClick={onClose}
					className="p-2 rounded-md cursor-pointer"
					whileTap={{ scale: 0.9 }}
					whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
				>
					<X size={20} />
				</motion.button>
			</div>

			<nav className="flex flex-col space-y-4 flex-grow">
				<NavButton
					icon={<LayoutDashboard size={18} />}
					text="Dashboard"
					active
				/>
				<NavButton icon={<MdOutlinePayments size={18} />} text="Loan status" />
				<NavButton icon={<History size={18} />} text="Transaction history" />
				<NavButton icon={<Trophy size={18} />} text="Rewards" />
			</nav>

			<LogoutButton />
		</motion.div>
	);
};

const NavButton = ({ icon, text, active = false }) => (
	<motion.button
		className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${
			active ? "bg-blue-600" : "text-gray-300 hover:bg-gray-700"
		}`}
	>
		{icon}
		<span>{text}</span>
	</motion.button>
);

const LogoutButton = () => (
	<motion.button
		className="flex items-center space-x-2 text-red-400 mt-auto p-2 cursor-pointer"
		whileHover={{ scale: 1.03, color: "#f87171" }}
		whileTap={{ scale: 0.97 }}
	>
		<LogOut size={18} />
		<span>Log Out</span>
	</motion.button>
);
