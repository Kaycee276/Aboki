// components/LoanInputSection.js
import { TokenSelector, TokenDropdown } from "./TokenComponents";

export const LoanInputSection = ({
	title,
	value,
	setValue,
	token,
	tokenImage,
	tokenPrice,
	showChevron = true,
	onTokenChange,
}) => {
	const usdValue = (parseFloat(value) || 0) * (tokenPrice || 1);

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
				value={value}
				onChange={(e) => setValue(e.target.value)}
				inputMode="numeric"
				pattern="[0-9]*"
			/>

			{/* rate in usd */}
			<div className="text-gray-400 text-xs sm:text-sm">
				${usdValue.toFixed(2)} USD
			</div>
		</div>
	);
};
