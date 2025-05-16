import { FaFileDownload } from "react-icons/fa";
import { motion } from "framer-motion";

const fadeInUp = {
	hidden: { opacity: 0, y: 40 },
	visible: (i = 1) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: i * 0.15,
			duration: 0.6,
			ease: [0.16, 0.77, 0.47, 0.97],
		},
	}),
};

const WhitePaper = () => {
	return (
		<motion.div
			className="max-w-3xl mx-auto px-6 py-12 text-white space-y-8 "
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.2 }}
		>
			<motion.h1
				className="text-3xl font-bold text-center"
				variants={fadeInUp}
				custom={1}
			>
				📄 Aboki.eth Whitepaper
			</motion.h1>

			<motion.section className="space-y-4">
				<motion.div variants={fadeInUp} custom={2}>
					<h2 className="text-xl font-semibold">Abstract</h2>
					<p>
						Aboki.eth is a decentralized protocol that allows users to stake
						digital assets and access fiat loans without intermediaries...
					</p>
				</motion.div>

				<motion.div variants={fadeInUp} custom={3}>
					<h2 className="text-xl font-semibold">Problem Statement</h2>
					<p>
						Millions of digital asset holders are unable to access liquidity
						without selling their holdings...
					</p>
				</motion.div>

				<motion.div variants={fadeInUp} custom={4}>
					<h2 className="text-xl font-semibold">Solution</h2>
					<p>
						Aboki.eth introduces a decentralized staking and lending ecosystem
						where users can stake assets, borrow fiat, and reclaim their tokens
						after repayment.
					</p>
				</motion.div>
			</motion.section>

			<motion.div
				className="flex justify-center pt-10"
				variants={fadeInUp}
				custom={5}
			>
				<a
					// href="/whitepaper.pdf"
					// download
					className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#203470] text-white hover:bg-[#0f2a89] transition-all duration-200 font-semibold cursor-pointer"
				>
					<FaFileDownload size={20} />
					Download PDF
				</a>
			</motion.div>
		</motion.div>
	);
};

export default WhitePaper;
