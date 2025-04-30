// components/LoanInputSection.js
import { TokenSelector, TokenDropdown } from "./TokenSelector";

export const LoanInputSection = ({
	title,
	value = "",
	setValue,
	token,
	tokenImage,
	tokenPrice,
	showChevron = true,
	onTokenChange,
	isBorrow = false,
	exchangeRate = 1, // Default to 1 if not provided
}) => {
	const handleValueChange = (e) => {
		const input = e.target.value;
		if (input === "" || /^[0-9]*\.?[0-9]*$/.test(input)) {
			setValue(input);
		}
	};
	// Calculate display value based on transaction type
	const displayValue = isBorrow
		? (parseFloat(value) || 0) * exchangeRate // Convert borrow value to USD
		: (parseFloat(value) || 0) * (tokenPrice || 1); // Convert deposit value to USD

	return (
		<div className="bg-gray-800 p-4 rounded-xl mb-4">
			<div className="flex justify-between items-center mb-2">
				<div className="text-gray-200 font-medium text-sm sm:text-base">
					{title}
				</div>
				{showChevron ? (
					<TokenDropdown
						selectedToken={token}
						selectedTokenImage={tokenImage}
						onTokenSelect={onTokenChange}
					/>
				) : (
					<TokenSelector
						token={token}
						tokenImage={tokenImage}
						showChevron={false}
					/>
				)}
			</div>

			<input
				className="w-full text-white text-2xl sm:text-3xl font-semibold outline-none border-none bg-transparent placeholder-gray-500 mb-1"
				placeholder="0"
				value={value || ""}
				onChange={handleValueChange}
				inputMode="numeric"
				pattern="[0-9]*"
			/>

			{/* rate in usd */}
			<div className="text-gray-400 text-xs sm:text-sm">
				{isBorrow ? (
					<>₦{(parseFloat(value) || 0).toLocaleString()}</>
				) : (
					`$${parseFloat(displayValue.toFixed(2)).toLocaleString()} USD`
				)}
			</div>
		</div>
	);
};
