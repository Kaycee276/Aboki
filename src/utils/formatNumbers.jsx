export const formatCurrency = (value, currency = "USD", decimals = 2) => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
	});

	// Manual symbol override for Naira until you have proper localization
	if (currency === "NGN") {
		return `₦${formatter.format(value || 0).replace("NGN", "")}`;
	}

	return formatter.format(value || 0);
};

export const formatNumber = (num) => {
	if (num === undefined || num === null) {
		return "0.00";
	}

	return new Intl.NumberFormat("en-US", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(num);
};
