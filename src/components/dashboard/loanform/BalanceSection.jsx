export const BalanceSection = ({ balance }) => {
	return (
		<div className="bg-gray-800 p-4 rounded-xl mb-6">
			<div className="text-white mb-1 text-sm">Loan balance</div>
			<div className="text-gray-500 text-2xl font-semibold">
				${balance.toLocaleString()}
			</div>
		</div>
	);
};
