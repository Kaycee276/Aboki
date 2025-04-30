import { motion } from "framer-motion";
import { Bell } from "lucide-react";

export const Header = () => {
	// Example notification count - you can make this dynamic
	const notificationCount = 3; // Change this to your actual notification count

	return (
		<header className="flex justify-between items-center mb-6 md:mb-8 w-full">
			<motion.h2
				className="text-sm"
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.5 }}
			>
				Welcome Back
			</motion.h2>

			<motion.div
				className="flex items-center space-x-4"
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.6 }}
			>
				<div className="relative">
					<button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative">
						<Bell className="h-5 w-5" />
						{notificationCount > 0 && (
							<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
								{notificationCount}
							</span>
						)}
					</button>
				</div>
				<UserAvatar />
			</motion.div>
		</header>
	);
};

const UserAvatar = () => (
	<motion.div
		className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center overflow-hidden flex-shrink-0"
		whileHover={{ scale: 1.05 }}
		whileTap={{ scale: 0.95 }}
	>
		<img
			src="/api/placeholder/32/32"
			alt="User avatar"
			className="h-full w-full object-cover"
		/>
	</motion.div>
);
