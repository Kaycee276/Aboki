import { FaDiscord, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiArrowRightCircle } from "react-icons/fi";

import ScrollReveal from "../common/ScrollReveal";

// const message = encodeURIComponent(
// 	"Hello ABOKI, I have a few questions for you guys"
// );
const phone = "2348158049951";
const WAlink = `https://wa.me/${phone}`;

const Contact = () => {
	return (
		<section className="mt-36 flex flex-col md:flex-row justify-between items-center gap-8 mb-3">
			{/* Join Community */}
			<div className="text-center md:text-left">
				<h1 className="text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-br from-[#4169E1] via-[#7A9CF8] to-[#B2C5FC] mb-4">
					Join our community
				</h1>
				<div className="flex justify-center md:justify-start gap-4">
					<ScrollReveal direction="up" delay={0.2}>
						<Social link={WAlink}>
							<FaWhatsapp className="text-xl" />
						</Social>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.4}>
						<Social>
							<FaXTwitter className="text-xl" />
						</Social>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.6}>
						<Social>
							<FaDiscord className="text-xl" />
						</Social>
					</ScrollReveal>
				</div>
			</div>

			{/* Newsletter */}
			<form className="text-center md:text-left">
				<h1 className="text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-br from-[#4169E1] via-[#7A9CF8] to-[#B2C5FC]  mb-4">
					Subscribe to our newsletter
				</h1>
				<div className="flex gap-2 relative w-full max-w-md">
					<input
						type="email"
						placeholder="Enter your email"
						className="bg-[#1A2031] px-4 py-2 text-white pr-12 rounded-lg border border-[#4169E1] focus:outline-none w-full focus:border-white transition duration-300"
					/>
					<button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white transition duration-300 cursor-pointer">
						<FiArrowRightCircle className="text-2xl" />
					</button>
				</div>
			</form>
		</section>
	);
};

export default Contact;

const Social = ({ children, link }) => {
	return (
		<a
			href={link}
			className="bg-[#1A2031] p-3 rounded-xl text-[#4169E1] cursor-pointer border border-[#4169E1] hover:border-white  transition duration-300 flex items-center justify-center"
			target="_blank"
			rel="noopener noreferrer"
		>
			{children}
		</a>
	);
};
