// services/coinGecko.js
const API_BASE_URL = "https://api.coingecko.com/api/v3";

/**
 * Fetches current USD prices for USDT and ETH
 * @returns {Promise<Object>} Object with price data for USDT and ETH
 */
export const fetchStablecoinAndEthPrices = async () => {
	try {
		const coinIds = ["tether", "ethereum"];
		const response = await fetch(
			`${API_BASE_URL}/simple/price?ids=${coinIds.join(",")}&vs_currencies=usd`
		);

		if (!response.ok) {
			throw new Error("Failed to fetch USDT and ETH prices");
		}

		const data = await response.json();
		return data;
		// Expected format: { tether: { usd: 1.0 }, ethereum: { usd: 2500.75 } }
	} catch (error) {
		console.error("Error fetching USDT and ETH prices:", error);
		// Return default values in case of API failure
		return {
			tether: { usd: 1.0 }, // USDT typically pegged at $1
			ethereum: { usd: 2000.0 }, // Fallback ETH price
		};
	}
};

/**
 * Fetches USDT/ETH price info with additional details
 * @returns {Promise<Object>} Detailed token information
 */
export const fetchTokenDetails = async () => {
	try {
		const response = await fetch(
			`${API_BASE_URL}/coins/markets?vs_currency=usd&ids=tether,ethereum&order=market_cap_desc&sparkline=false`
		);

		if (!response.ok) {
			throw new Error("Failed to fetch token details");
		}

		const data = await response.json();
		return data;
		// Returns array with detailed info including images, market cap, etc.
	} catch (error) {
		console.error("Error fetching token details:", error);
		return [];
	}
};

/**
 * Calculate conversion rate between USDT and ETH
 * @param {Object} prices - Price object from fetchStablecoinAndEthPrices
 * @returns {Object} Conversion rates
 */
export const calculateConversionRates = (prices) => {
	if (!prices?.tether?.usd || !prices?.ethereum?.usd) {
		return { usdtToEth: 0, ethToUsdt: 0 };
	}

	const usdtPrice = prices.tether.usd;
	const ethPrice = prices.ethereum.usd;

	return {
		usdtToEth: usdtPrice / ethPrice, // How much ETH you get for 1 USDT
		ethToUsdt: ethPrice / usdtPrice, // How much USDT you get for 1 ETH
	};
};
