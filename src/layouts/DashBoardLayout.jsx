// src/layouts/DashboardLayout.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { DesktopSidebar } from "../components/dashboard/DesktopSidebar";
import { MobileIconsSidebar } from "../components/dashboard/MobileIconsSideBar";
import { MobileSidebar } from "../components/dashboard/MobileSideBar";

export default function DashboardLayout() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<div className="flex h-screen bg-radial from-[#636DC5] to-black text-white overflow-hidden">
			{/* Mobile Sidebar Toggle */}
			<div className="md:hidden absolute top-4 left-4 z-20">
				<motion.button
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					className={`p-2 rounded-md cursor-pointer ${
						isSidebarOpen ? "bg-transparent" : "bg-gray-800"
					}`}
					whileTap={{ scale: 0.9 }}
				>
					{!isSidebarOpen && <Menu size={20} />}
				</motion.button>
			</div>
			{/* Mobile Full Sidebar */}
			<AnimatePresence>
				{isSidebarOpen && (
					<MobileSidebar
						isOpen={isSidebarOpen}
						onClose={() => setIsSidebarOpen(false)}
					/>
				)}
			</AnimatePresence>
			{/* Always visible Icons-only Sidebar on mobile */}
			<MobileIconsSidebar />
			{/* Desktop Sidebar */}
			<DesktopSidebar />
			<motion.div
				className="flex-1 flex flex-col p-4 md:p-6 overflow-y-auto ml-16 md:ml-0 w-full custom-scrollbar"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.3 }}
			>
				<Outlet />
			</motion.div>
		</div>
	);
}
