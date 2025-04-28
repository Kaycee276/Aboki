import { motion } from "framer-motion";
import { LayoutDashboard, Trophy, History, LogOut } from "lucide-react";
import { MdOutlinePayments } from "react-icons/md";
import { useAuth } from "../../contexts/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

import { LogoutConfirmationModal } from "../../common/LogoutConfirmationModal";
import { useState } from "react";

export const DesktopSidebar = () => {
	const { disconnect } = useAuth();
	const navigate = useNavigate();

	const [showLogoutModal, setShowLogoutModal] = useState(false);

	return (
		<motion.div
			className="hidden md:flex w-64 p-4 flex-col h-full"
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
				<NavLink to="/dashboard" className="text-gray-300" end>
					{({ isActive }) => (
						<AnimatedNavButton
							icon={<LayoutDashboard size={18} />}
							text="Dashboard"
							active={isActive}
							delay={0.5}
						/>
					)}
				</NavLink>

				<NavLink to="/dashboard/loan-status" className="text-gray-300">
					{({ isActive }) => (
						<AnimatedNavButton
							icon={<MdOutlinePayments size={18} />}
							text="Loan status"
							active={isActive}
							delay={0.6}
						/>
					)}
				</NavLink>

				<NavLink to="/dashboard/history" className="text-gray-300">
					{({ isActive }) => (
						<AnimatedNavButton
							icon={<History size={18} />}
							text="Transaction history"
							active={isActive}
							delay={0.7}
						/>
					)}
				</NavLink>

				<NavLink to="/dashboard/rewards" className="text-gray-300">
					{({ isActive }) => (
						<AnimatedNavButton
							icon={<Trophy size={18} />}
							text="Rewards"
							active={isActive}
							delay={0.8}
						/>
					)}
				</NavLink>
			</nav>

			<motion.button
				className="flex items-center space-x-2 text-red-400 mt-auto p-2 cursor-pointer"
				whileHover={{ scale: 1.03, color: "#f87171" }}
				whileTap={{ scale: 0.97 }}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1 }}
				onClick={() => setShowLogoutModal(true)}
			>
				<LogOut size={18} />
				<span>Log Out</span>
			</motion.button>

			<LogoutConfirmationModal
				isOpen={showLogoutModal}
				onConfirm={() => {
					disconnect();
					navigate("/");
					setShowLogoutModal(false);
				}}
				onCancel={() => setShowLogoutModal(false)}
			/>
		</motion.div>
	);
};

const AnimatedNavButton = ({ icon, text, active = false, delay = 0 }) => (
	<motion.div
		className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
			active
				? "bg-gradient-to-r from-[#0F3EB3] via-[#375FD9] to-[#0B32A5] text-white"
				: "text-gray-300 hover:bg-gray-700"
		}`}
		initial={{ opacity: 0, x: -20 }}
		animate={{ opacity: 1, x: 0 }}
		transition={{ delay }}
		whileHover={!active ? { backgroundColor: "#374151" } : {}}
	>
		{icon}
		<span>{text}</span>
	</motion.div>
);
