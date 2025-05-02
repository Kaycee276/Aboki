export const PreviewItem = ({ label, value }) => (
	<div className="flex justify-between border-b border-gray-700 border-dashed font-extralight">
		<span className="">{label}</span>
		<span className="font-medium">{value || "-"}</span>
	</div>
);
