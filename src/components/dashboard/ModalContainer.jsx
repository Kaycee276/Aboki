import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export const ModalContainer = ({ isOpen, onClose, children }) => {
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50 p-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={onClose}
				>
					<motion.div
						className="bg-gradient-to-b from-[#010616] via-[#23346A] to-[#333741] rounded-xl max-w-md w-full relative overflow-hidden"
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ type: "spring", damping: 20, stiffness: 300 }}
						onClick={(e) => e.stopPropagation()}
					>
						<div className="p-6">
							<button
								onClick={onClose}
								className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-white"
							>
								<X size={20} />
							</button>
							<AnimatePresence mode="wait">{children}</AnimatePresence>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
