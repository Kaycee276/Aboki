import { Button } from "./BaseButton";

export const PrimaryButton = ({ children, onClick, disabled }) => {
	return (
		<Button
			onClick={onClick}
			disabled={disabled}
			className={`w-full py-3 px-6 rounded-3xl bg-blue-600 text-white font-medium transition-all  ${
				disabled
					? "opacity-50 cursor-not-allowed"
					: "hover:bg-blue-500 cursor-pointer"
			} `}
		>
			{children}
		</Button>
	);
};
