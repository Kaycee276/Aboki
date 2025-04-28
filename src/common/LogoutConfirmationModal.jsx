import { motion, AnimatePresence } from "framer-motion";
import { LogOut } from "lucide-react";

export const LogoutConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
	return (
		<AnimatePresence>
			{isOpen && (
				<div
					className="fixed inset-0  backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50 p-4"
					onClick={onCancel}
				>
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						// exit={{ opacity: 0, scale: 0.9 }}
						transition={{ type: "spring", damping: 20, stiffness: 300 }}
						className="bg-gray-800 rounded-lg p-6 max-w-sm w-full"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="flex flex-col items-center text-center space-y-4">
							<div className="p-3 bg-red-500 bg-opacity-20 rounded-full">
								<LogOut className="text-red-400" size={24} />
							</div>
							<h3 className="text-lg font-medium text-white">Log Out</h3>
							<p className="text-gray-400">
								Are you sure you want to log out of your account?
							</p>
							<div className="flex space-x-3 w-full mt-4">
								<button
									onClick={onCancel}
									className="flex-1 py-2 px-4 rounded-md border border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors cursor-pointer"
								>
									Cancel
								</button>
								<button
									onClick={onConfirm}
									className="flex-1 cursor-pointer py-2 px-4 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
								>
									<LogOut size={18} />
									<span>Log Out</span>
								</button>
							</div>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
};
