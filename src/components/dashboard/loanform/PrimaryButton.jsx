import { Button } from "./BaseButton";

export const PrimaryButton = ({ children, onClick }) => {
	return (
		<Button
			onClick={onClick}
			className="bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors cursor-pointer"
		>
			{children}
		</Button>
	);
};
