import { motion, useReducedMotion } from "framer-motion";
import GetStartedButton from "../common/GetStartedButton";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Hero() {
	const [isLoaded, setIsLoaded] = useState(false);
	const prefersReducedMotion = useReducedMotion();

	useEffect(() => {
		setIsLoaded(true);
	}, []);

	return (
		<section className="flex flex-col md:flex-row justify-between items-center mt-12 gap-10">
			<div className="max-w-xl">
				<Welcome
					isLoaded={isLoaded}
					prefersReducedMotion={prefersReducedMotion}
				/>
				<About />
				<Description />
				<div className="flex gap-4">
					<GetStartedButton />
					<motion.button
						initial={{ opacity: 0, x: -20 }}
						animate={isLoaded ? { opacity: 1, x: 0 } : {}}
						transition={{ delay: 0.6, duration: 0.4 }}
						className="relative text-sm text-gray-500 hover:text-white group cursor-pointer"
					>
						<NavLink to="/whitepaper" className="relative">
							Learn more
							<span className="absolute left-0 bottom-0 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
						</NavLink>
					</motion.button>
				</div>
			</div>

			<motion.div
				initial={{ scale: 0 }}
				animate={
					isLoaded && !prefersReducedMotion ? { scale: 1 } : { scale: 1 }
				}
				transition={{ duration: 1.2, type: "spring" }}
			>
				<img
					src="/abstract.png"
					alt="Colorful abstract shape"
					className="w-[300px] sm:w-[400px]"
					loading="lazy"
				/>
			</motion.div>
		</section>
	);
}

const Welcome = ({ isLoaded, prefersReducedMotion }) => {
	return (
		<motion.p
			initial={{ opacity: 0, x: -50 }}
			animate={
				isLoaded && !prefersReducedMotion
					? { opacity: 1, x: 0 }
					: { opacity: 1, x: 0 }
			}
			transition={{ type: "spring", stiffness: 100 }}
			className="text-sm text-gray-300 mb-12"
		>
			Welcome to Aboki.<span className="text-blue-400">eth</span>
		</motion.p>
	);
};

const About = () => {
	return (
		<motion.h1
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
			className="text-3xl sm:text-5xl font-bold leading-tight mb-4"
		>
			Empowering Financial Inclusion Through Decentralized{" "}
			<span className="text-[#486EE3]">Lending</span>
		</motion.h1>
	);
};

const Description = () => {
	return (
		<motion.p
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4 }}
			className="text-sm text-gray-400 mb-6"
		>
			Aboki.eth is a decentralized app (dApp) that gives you the power to stake
			your digital assets and receive instant fiat loans—all while keeping your
			staking rewards.
			<br />
			<strong className="text-white">
				No credit checks. No middlemen. Just freedom.
			</strong>
		</motion.p>
	);
};
