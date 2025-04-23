import { motion } from "framer-motion";
import { Search } from "lucide-react";

export const Header = () => {
	return (
		<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8">
			<motion.h2
				className="text-xl"
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.5 }}
			>
				Welcome Back, Ben
			</motion.h2>

			<motion.div
				className="flex items-center space-x-4 w-full md:w-auto mt-4 md:mt-0"
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.6 }}
			>
				<SearchInput />
				<UserAvatar />
			</motion.div>
		</div>
	);
};

const SearchInput = () => (
	<div className="relative flex-grow md:flex-grow-0">
		<input
			type="text"
			placeholder="Search"
			className="bg-gray-700 rounded-lg py-2 pl-10 pr-4 w-full md:w-64"
		/>
		<Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
	</div>
);

const UserAvatar = () => (
	<div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden flex-shrink-0">
		<img
			src="/api/placeholder/32/32"
			alt="User avatar"
			className="h-full w-full object-cover"
		/>
	</div>
);
