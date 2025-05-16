import ScrollReveal from "../common/ScrollReveal";
import AboutCard from "../common/AboutCard";

const About = () => {
	return (
		<section className="mt-22 md:mt-30 lg:mt-40 flex flex-col justify-center items-center w-full">
			<ScrollReveal direction="up" delay={0.2}>
				<h3 className="text-2xl bg-clip-text text-transparent bg-gradient-to-br from-[#4169E1] via-[#7A9CF8] to-[#B2C5FC]">
					How it works
				</h3>
			</ScrollReveal>

			<div className="flex flex-col sm:flex-row gap-16 sm:gap-10 lg:gap-16 justify-center items-center sm:items-stretch mt-20">
				<ScrollReveal direction="up" delay={0.2}>
					<AboutCard
						icon={"/stake.png"}
						title={"Stake digital assets"}
						subtitle={"Put your digital assets to work and unlock liquidity"}
					/>
				</ScrollReveal>
				<ScrollReveal direction="up" delay={0.4}>
					<AboutCard
						icon={"/fiat.png"}
						title={"Get fiat loans"}
						subtitle={
							"Borrow real money based on the value of your staked assets"
						}
					/>
				</ScrollReveal>
				<ScrollReveal direction="up" delay={0.6}>
					<AboutCard
						icon={"/repay.png"}
						title={"Repay loans"}
						subtitle={
							"Pay back the loan to reclaim your staked assets, plus rewards"
						}
					/>
				</ScrollReveal>
			</div>
		</section>
	);
};

export default About;
