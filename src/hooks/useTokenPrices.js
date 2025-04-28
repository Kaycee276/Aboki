import { useState, useEffect } from "react";
import {
	fetchStablecoinAndEthPrices,
	calculateConversionRates,
} from "../services/coinGecko";

export function useTokenPrices() {
	const [prices, setPrices] = useState({
		tether: { usd: 1.0 },
		ethereum: { usd: 0 },
	});

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [conversionRates, setConversionRates] = useState({
		usdtToEth: 0,
		ethToUsdt: 0,
	});

	useEffect(() => {
		const getPrices = async () => {
			try {
				setLoading(true);
				const data = await fetchStablecoinAndEthPrices();
				setPrices(data);
				const rates = calculateConversionRates(data);
				setConversionRates(rates);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		getPrices();

		const intervalId = setInterval(getPrices, 60000);
		return () => clearInterval(intervalId);
	}, []);

	return { prices, loading, error, conversionRates };
}
