import { motion } from "framer-motion";
import { LayoutDashboard, Trophy, History, LogOut, X } from "lucide-react";
import { MdOutlinePayments } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { LogoutConfirmationModal } from "../../common/LogoutConfirmationModal";
import { useDisconnect } from "wagmi";

export const MobileSidebar = ({ isOpen, onClose }) => {
	const navigate = useNavigate();
	const { disconnect } = useDisconnect();

	const [showLogoutModal, setShowLogoutModal] = useState(false);

	const sidebarRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen, onClose]);

	const handleDisconnect = () => {
		navigate("/");
		disconnect();
		onClose();
	};

	return (
		<motion.div
			className="md:hidden fixed top-0 left-0 w-64 bg-gray-800 p-4 flex flex-col h-full z-10"
			ref={sidebarRef}
			initial={{ x: -256 }}
			animate={{ x: isOpen ? 0 : -256 }}
			exit={{ x: -256 }}
			transition={{ type: "spring", stiffness: 300, damping: 30 }}
		>
			<div className="mb-8 flex items-center justify-between">
				<motion.h1
					className="text-xl font-bold"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2 }}
				>
					Aboki<span className="text-blue-400">.eth</span>
				</motion.h1>
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
				<NavLink to="/dashboard" className="text-gray-300" end>
					{({ isActive }) => (
						<NavButton
							icon={<LayoutDashboard size={18} />}
							text="Dashboard"
							active={isActive}
							delay={0.3}
							onClick={onClose} // Close sidebar when navigating
						/>
					)}
				</NavLink>

				<NavLink to="/dashboard/loan-status" className="text-gray-300">
					{({ isActive }) => (
						<NavButton
							icon={<MdOutlinePayments size={18} />}
							text="Loan status"
							active={isActive}
							delay={0.4}
							onClick={onClose}
						/>
					)}
				</NavLink>

				<NavLink to="/dashboard/history" className="text-gray-300">
					{({ isActive }) => (
						<NavButton
							icon={<History size={18} />}
							text="Transaction history"
							active={isActive}
							delay={0.5}
							onClick={onClose}
						/>
					)}
				</NavLink>

				<NavLink to="/dashboard/rewards" className="text-gray-300">
					{({ isActive }) => (
						<NavButton
							icon={<Trophy size={18} />}
							text="Rewards"
							active={isActive}
							delay={0.6}
							onClick={onClose}
						/>
					)}
				</NavLink>
			</nav>

			<LogoutButton disconnect={() => setShowLogoutModal(true)} />

			<LogoutConfirmationModal
				isOpen={showLogoutModal}
				onConfirm={() => {
					handleDisconnect();
					setShowLogoutModal(false);
				}}
				onCancel={() => setShowLogoutModal(false)}
			/>
		</motion.div>
	);
};

const NavButton = ({ icon, text, active = false, delay = 0, onClick }) => (
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
		onClick={onClick}
	>
		{icon}
		<span>{text}</span>
	</motion.div>
);

const LogoutButton = ({ disconnect }) => (
	<motion.button
		className="flex items-center space-x-2 text-red-400 mt-auto p-2 cursor-pointer"
		whileHover={{ scale: 1.03, color: "#f87171" }}
		whileTap={{ scale: 0.97 }}
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ delay: 0.7 }}
		onClick={disconnect}
	>
		<LogOut size={18} />
		<span>Log Out</span>
	</motion.button>
);
