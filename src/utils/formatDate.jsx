export const formatDate = (dateString, options = {}) => {
	const date = new Date(dateString);

	if (isNaN(date)) return "Invalid date";

	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
		...options,
	}).format(date);
};
