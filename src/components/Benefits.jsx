import ScrollReveal from "../common/ScrollReveal";
import { useWalletConnect } from "../contexts/WalletConnectContext";

const Benefits = () => {
	const { openModal } = useWalletConnect();
	return (
		<section className="mt-20 text-white px-6 py-16 md:px-16 lg:px-24">
			<div className="max-w-6xl mx-auto">
				{/* Title -*/}

				<ScrollReveal direction="right" delay={0.2}>
					<h2
						className="text-xl font-semibold mb-10 lg:mb-16 text-transparent bg-clip-text bg-[radial-gradient(circle_at_center,#4169E1_0%,#B2C5FC_100%)]"
						style={{
							backgroundSize: "150% 150%",
							backgroundPosition: "center",
						}}
					>
						Benefits of choosing us
					</h2>
				</ScrollReveal>

				<div className="flex flex-col lg:flex-row items-stretch gap-10 lg:gap-16">
					{/* Image */}
					<div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start">
						<img
							src={"/benefits.png"}
							alt="Benefits illustration"
							className="w-64 md:w-72"
							loading="lazy"
						/>
					</div>

					{/* Text */}
					<div className="w-full lg:w-1/2 flex flex-col justify-between">
						<ScrollReveal delay={0.2} direction="right">
							<p className="text-lg leading-relaxed text-gray-200">
								Aboki.eth lets you stake your crypto to get instant fiat loans
								while still earning rewards—it's secure, easy to use, and works
								across major blockchains like Ethereum, BSC, Celo, Arbitrum,
								Gnosis, and Optimism.
							</p>
						</ScrollReveal>

						<button
							className="bg-white w-full mt-6 md:mt-0 cursor-pointer text-[#4169E1] px-8 py-2 rounded-full font-medium hover:bg-[#4169E1] hover:text-white self-end transition duration-200 "
							onClick={openModal}
						>
							Get started
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Benefits;
