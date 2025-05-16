export const formatAddress = (address, startLength = 6, endLength = 4) => {
	if (!address || typeof address !== "string") return "";
	return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
};
