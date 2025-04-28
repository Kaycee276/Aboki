export const Button = ({ children, onClick, className }) => {
	return (
		<button
			onClick={onClick}
			className={`w-full py-3 text-center rounded-full ${className}`}
		>
			{children}
		</button>
	);
};
