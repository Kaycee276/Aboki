import { motion } from "framer-motion";
import { useState } from "react";
import { LayoutDashboard, Trophy, History, LogOut } from "lucide-react";
import { MdOutlinePayments } from "react-icons/md";
import { useAuth } from "../../contexts/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

import { LogoutConfirmationModal } from "../../common/LogoutConfirmationModal";

export const MobileIconsSidebar = () => {
	const { disconnect } = useAuth();
	const navigate = useNavigate();

	const [showLogoutModal, setShowLogoutModal] = useState(false);

	return (
		<div className="md:hidden fixed top-0 left-0 w-16 p-4 flex flex-col h-full z-0">
			<div className="mb-8 flex justify-center">
				<span className="text-xl font-bold">
					A<span className="text-blue-400">.</span>
				</span>
			</div>

			<nav className="flex flex-col space-y-4 flex-grow items-center">
				<NavLink to="/dashboard" className="text-gray-300" end>
					{({ isActive }) => (
						<IconButton
							icon={<LayoutDashboard size={18} />}
							active={isActive}
						/>
					)}
				</NavLink>

				<NavLink to="/dashboard/loan-status" className="text-gray-300">
					{({ isActive }) => (
						<IconButton
							icon={<MdOutlinePayments size={18} />}
							active={isActive}
						/>
					)}
				</NavLink>

				<NavLink to="/dashboard/history" className="text-gray-300">
					{({ isActive }) => (
						<IconButton icon={<History size={18} />} active={isActive} />
					)}
				</NavLink>

				<NavLink to="/dashboard/rewards" className="text-gray-300">
					{({ isActive }) => (
						<IconButton icon={<Trophy size={18} />} active={isActive} />
					)}
				</NavLink>
			</nav>

			<motion.button
				className="flex items-center justify-center text-red-400 mt-auto p-2 w-10 cursor-pointer h-10"
				whileHover={{ scale: 1.1, color: "#f87171" }}
				whileTap={{ scale: 0.9 }}
				onClick={() => setShowLogoutModal(true)}
			>
				<LogOut size={18} />
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
		</div>
	);
};

const IconButton = ({ icon, active = false }) => (
	<motion.div
		className={`flex items-center justify-center p-2 rounded-lg w-10 h-10 cursor-pointer ${
			active
				? "bg-gradient-to-r from-[#0F3EB3] via-[#375FD9] to-[#0B32A5]"
				: "text-gray-300 "
		}`}
		whileHover={!active ? { backgroundColor: "#374151" } : {}}
	>
		{icon}
	</motion.div>
);
