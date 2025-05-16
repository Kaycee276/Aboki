import { TokenDropdown } from "./TokenSelector";

export const PaymentMethodSection = ({
	value,
	token,
	setValue,
	onTokenChange,
	showChevron,
}) => {
	return (
		<div className="bg-gray-800 p-3 sm:p-4 rounded-xl mb-4 sm:mb-6">
			<div className="flex justify-between items-center mb-1 sm:mb-2">
				<div className="text-gray-400 text-xs sm:text-sm">
					Method of payment
				</div>
				{!showChevron && (
					<TokenDropdown selectedToken={token} onTokenSelect={onTokenChange} />
				)}
			</div>
			<input
				className="text-white text-xl sm:text-2xl font-semibold outline-none border-none"
				placeholder="0"
				inputMode="numeric"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		</div>
	);
};
