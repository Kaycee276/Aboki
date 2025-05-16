const AboutCard = ({ icon, title, subtitle }) => {
	return (
		<div
			className="relative w-full max-w-[250px] bg-[radial-gradient(circle_at_center,#4169E1_0%,#2E4A9E_40%,#1A2C6B_70%,#0D1A42_100%)] rounded-2xl pt-16 pb-4 px-4 flex flex-col items-center text-center text-white  hover:shadow-blue-500/40 transition-shadow duration-300"
			style={{
				boxShadow: `
        8px 8px 30px #283D7C,
        -5px -5px 10px rgba(255,255,255,0.05)
      `,
			}}
		>
			{/* Image container extending beyond card */}
			<div className="absolute -top-14 left-1/2 transform -translate-x-1/2 w-36 h-36 mb-4">
				<img
					src={icon}
					alt={title}
					loading="lazy"
					className="w-full h-full object-contain drop-shadow-lg transition-transform duration-200"
				/>
			</div>

			{/* Content */}
			<div className="mt-14 flex-1 flex flex-col ">
				<h3 className="text-lg font-extrabold mb-2">{title}</h3>
				<p className="text-sm font-light text-gray-300 mb-4">{subtitle}</p>
			</div>
		</div>
	);
};

export default AboutCard;
