// components/TokenComponents.js
import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import {
	fetchTokenDetails,
	fetchStablecoinAndEthPrices,
} from "../../../services/coinGecko";

export const TokenSelector = ({ token, tokenImage, onClick, showChevron }) => {
	return (
		<button
			onClick={onClick}
			className={`flex items-center space-x-2 bg-gray-700 rounded-full z-10 px-3 py-1.5 text-sm ${
				showChevron ? "cursor-pointer hover:bg-gray-600" : "cursor-default"
			} transition-colors`}
		>
			{tokenImage && (
				<img src={tokenImage} alt={token} className="w-5 h-5 rounded-full" />
			)}
			<span className="font-medium">{token}</span>
			{showChevron && <ChevronDown className="w-4 h-4" />}
		</button>
	);
};

export const TokenDropdown = ({
	selectedToken,
	selectedTokenImage,
	onTokenSelect,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [tokens, setTokens] = useState([]);
	const [loading, setLoading] = useState(true);
	const [tokenPrices, setTokenPrices] = useState({});
	const dropdownRef = useRef(null);

	useEffect(() => {
		const loadTokens = async () => {
			try {
				const [tokenData, prices] = await Promise.all([
					fetchTokenDetails(),
					fetchStablecoinAndEthPrices(),
				]);
				setTokens(tokenData);

				const priceMap = {};
				tokenData.forEach((token) => {
					priceMap[token.symbol.toUpperCase()] = token.current_price;
				});
				setTokenPrices(priceMap);
			} catch (error) {
				console.error("Failed to load tokens:", error);
			} finally {
				setLoading(false);
			}
		};
		loadTokens();
	}, []);

	// 👇 Close dropdown if clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const toggleDropdown = () => setIsOpen(!isOpen);

	const handleTokenSelect = (token) => {
		onTokenSelect(token.symbol.toUpperCase(), token.image, token.current_price);
		setIsOpen(false);
	};

	return (
		<div className="relative" ref={dropdownRef}>
			<TokenSelector
				token={selectedToken}
				tokenImage={selectedTokenImage}
				onClick={toggleDropdown}
				showChevron={true}
			/>

			{isOpen && (
				<div className="absolute z-20 right-0 mt-2 w-56 bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden">
					{loading ? (
						<div className="p-3 text-center text-sm text-gray-400">
							Loading tokens...
						</div>
					) : (
						<ul className="max-h-60 overflow-y-auto">
							{tokens.map((token) => (
								<li key={token.id}>
									<button
										onClick={() => handleTokenSelect(token)}
										className="w-full text-left px-4 py-3 hover:bg-gray-700 flex items-center justify-between transition-colors"
									>
										<div className="flex items-center space-x-3">
											<img
												src={token.image}
												alt={token.name}
												className="w-6 h-6 rounded-full"
											/>
											<div>
												<div className="font-medium">
													{token.symbol.toUpperCase()}
												</div>
												<div className="text-xs text-gray-400">
													{token.name}
												</div>
											</div>
										</div>
										<div className="text-sm font-medium">
											${token.current_price.toFixed(2)}
										</div>
									</button>
								</li>
							))}
						</ul>
					)}
				</div>
			)}
		</div>
	);
};
