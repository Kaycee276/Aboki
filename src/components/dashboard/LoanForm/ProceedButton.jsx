import { motion } from "framer-motion";

export const ProceedButton = ({ delay = 0, onClick, disabled = false }) => (
	<motion.button
		className={`w-full  ${
			disabled
				? "bg-gray-500 cursor-not-allowed"
				: "bg-white hover:bg-gray-100 cursor-pointer"
		} text-blue-600 font-medium py-3 rounded-md`}
		whileHover={!disabled ? { scale: 1.02 } : {}}
		whileTap={!disabled ? { scale: 0.98 } : {}}
		initial={{ y: 20, opacity: 0 }}
		animate={{ y: 0, opacity: 1 }}
		transition={{ delay }}
		onClick={onClick}
		disabled={disabled}
	>
		Proceed
	</motion.button>
);
