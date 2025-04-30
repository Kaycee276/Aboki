// services/coinGecko.js
const API_BASE_URL = "https://api.coingecko.com/api/v3";

/**
 * Fetches current USD prices for USDT, ETH and NGN exchange rate
 * @returns {Promise<Object>} Object with price data and exchange rates
 */
export const fetchAllRates = async () => {
	try {
		// Fetch crypto prices and NGN rate in parallel
		const [cryptoResponse, ngnResponse] = await Promise.all([
			fetch(
				`${API_BASE_URL}/simple/price?ids=tether,ethereum&vs_currencies=usd`
			),
			fetch(`${API_BASE_URL}/simple/price?ids=tether&vs_currencies=ngn`),
		]);

		if (!cryptoResponse.ok || !ngnResponse.ok) {
			throw new Error("Failed to fetch rates");
		}

		const cryptoData = await cryptoResponse.json();
		const ngnData = await ngnResponse.json();

		// Calculate NGN to USD rate (since USDT is pegged to $1)
		const ngnToUsdRate = 1 / (ngnData?.tether?.ngn || 1500); // Fallback to ~1500 NGN per $1

		return {
			crypto: cryptoData,
			rates: {
				ngnToUsd: ngnToUsdRate,
				usdToNgn: ngnData?.tether?.ngn || 1500, // Direct NGN rate from USDT
			},
		};
		// Expected format:
		// {
		//   crypto: { tether: { usd: 1.0 }, ethereum: { usd: 2500.75 } },
		//   rates: { ngnToUsd: 0.00067, usdToNgn: 1500 }
		// }
	} catch (error) {
		console.error("Error fetching rates:", error);
		// Return default values in case of API failure
		return {
			crypto: {
				tether: { usd: 1.0 },
				ethereum: { usd: 2000.0 },
			},
			rates: {
				ngnToUsd: 0.00067, // ~1500 NGN per $1
				usdToNgn: 1500,
			},
		};
	}
};

// Keep existing functions for backward compatibility
export const fetchStablecoinAndEthPrices = async () => {
	const data = await fetchAllRates();
	return data.crypto;
};

export const fetchTokenDetails = async () => {
	try {
		const response = await fetch(
			`${API_BASE_URL}/coins/markets?vs_currency=usd&ids=tether,ethereum&order=market_cap_desc&sparkline=false`
		);

		if (!response.ok) {
			throw new Error("Failed to fetch token details");
		}

		const data = await response.json();
		return data.map((token) => ({
			id: token.id,
			symbol: token.symbol,
			name: token.name,
			image: token.image,
			current_price: token.current_price,
			price_change_percentage_24h: token.price_change_percentage_24h,
		}));
	} catch (error) {
		console.error("Error fetching token details:", error);
		return [];
	}
};

/**
 * Gets the current NGN to USD exchange rate
 * @returns {Promise<number>} NGN to USD rate
 */
export const fetchNgnToUsdRate = async () => {
	const rates = await fetchAllRates();
	return rates.ngnToUsd;
};
