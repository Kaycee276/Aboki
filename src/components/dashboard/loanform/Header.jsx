export const Header = ({ activeTab, onTabChange }) => {
	return (
		<div className="flex justify-between items-center mb-6">
			<button
				onClick={() => onTabChange("loan")}
				className={` font-semibold cursor-pointer ${
					activeTab === "loan" ? "text-blue-400 text-xl" : "text-gray-400"
				}`}
			>
				Loan
			</button>
			<button
				onClick={() => onTabChange("redeem")}
				className={`font-semibold cursor-pointer ${
					activeTab === "redeem" ? "text-blue-400 text-xl" : "text-gray-400"
				}`}
			>
				Redeem
			</button>
		</div>
	);
};
