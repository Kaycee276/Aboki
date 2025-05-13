import { motion } from "framer-motion";
import { Bell } from "lucide-react";

export const Header = () => {
	return (
		<header className="flex justify-between items-center mb-6 md:mb-8 w-full">
			{/* Logo on the left */}
			<motion.div
				className="flex items-center"
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.4 }}
			>
				<h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
					Aboki<span className="text-blue-400">.eth</span>
				</h1>
			</motion.div>

			{/* Right side content */}
			<motion.div
				className="flex items-center space-x-4"
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.6 }}
			>
				<w3m-button />
			</motion.div>
		</header>
	);
};
