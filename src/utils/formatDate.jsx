export const formatDate = (dateString, options = {}) => {
	const date = new Date(dateString);

	if (isNaN(date)) return "Invalid date";

	return new Intl.DateTimeFormat("en-UK", {
		month: "short",
		day: "numeric",
		year: "numeric",
		...options,
	}).format(date);
};

export const formatLoanDuration = (dateArray) => {
	if (!dateArray || dateArray.length === 0)
		return <div className="text-gray-400">No duration set</div>;

	const startDate = new Date();
	const endDate = new Date(dateArray[0]);
	const diffTime = Math.abs(endDate - startDate);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	// Format date as DD-MM-YYYY
	const day = String(endDate.getDate()).padStart(2, "0");
	const month = String(endDate.getMonth() + 1).padStart(2, "0");
	const year = endDate.getFullYear();
	const formattedDate = `${day}-${month}-${year}`;

	// Calculate duration
	const weeks = Math.floor(diffDays / 7);
	const remainingDays = diffDays % 7;

	let durationString = "";
	if (weeks > 0) {
		durationString += `${weeks} ${weeks === 1 ? "week" : "weeks"}`;
	}
	if (remainingDays > 0) {
		if (weeks > 0) durationString += " ";
		durationString += `${remainingDays} ${
			remainingDays === 1 ? "day" : "days"
		}`;
	}

	return (
		<div className="flex flex-col text-right">
			<span className=" text-white">{formattedDate}</span>
			<span className="text-gray-400 text-xs">{durationString}</span>
		</div>
	);
};
