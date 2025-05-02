import { Button } from "./BaseButton";

export const PrimaryButton = ({ children, onClick, disabled }) => {
	return (
		<Button
			onClick={onClick}
			disabled={disabled}
			className={`w-full py-3 px-6 rounded-3xl bg-[#F5F5F5] text-blue-500 font-medium transition-all  ${
				disabled
					? "opacity-50 cursor-not-allowed"
					: "hover:bg-blue-500 hover:text-white cursor-pointer"
			} `}
		>
			{children}
		</Button>
	);
};
