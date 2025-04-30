import { useState, useEffect } from "react";
import { Header } from "./Header";
import { LoanInputSection } from "./LoanInputSection";
import { PrimaryButton } from "./PrimaryButton";
import { BalanceSection } from "./BalanceSection";
import { PaymentMethodSection } from "./PaymentMethod";
import { DateSelector } from "./DateSelector";
import { motion } from "framer-motion";

import { fetchNgnToUsdRate } from "../../../services/coinGecko";

export default function LoanInterface({
	loanBalance,
	paymentValue,
	paymentToken,
	date,
	paymentTokenPrice,
	depositValue,
	depositToken,
	borrowValue,
	paymentTokenImage,
	depositTokenPrice,
	borrowToken,
	borrowTokenPrice,
	borrowTokenImage,
	depositTokenImage,

	setPaymentToken,
	setPaymentTokenImage,
	setPaymentTokenPrice,
	setDepositValue,
	setBorrowValue,
	setDepositToken,
	setDepositTokenImage,
	setPaymentValue,
	setDate,
	setDepositTokenPrice,

	// incase of loan in another token
	setBorrowTokenPrice,
	setBorrowTokenImage,
	setBorrowToken,
}) {
	const [activeTab, setActiveTab] = useState("loan");

	const [ngnToUsdRate, setNgnToUsdRate] = useState(0.00067);

	useEffect(() => {
		const fetchRate = async () => {
			try {
				const rate = await fetchNgnToUsdRate();
				setNgnToUsdRate(rate);
			} catch (error) {
				console.error("Failed to fetch NGN rate:", error);
			}
		};
		fetchRate();
	}, []);

	const handleProceed = () => {
		if (activeTab === "loan") {
			console.log(
				"Loan Process:",
				{
					depositValue,
					depositToken,
					borrowValue,
					date,
				},
				"gas fee",
				"interest rate",
				"exchange rate",
				"wallet address",
				"duration"
			);
		} else {
			console.log("Redeem Process:", {
				paymentValue,
				paymentToken,
				loanBalance,
			});
		}
	};

	const handleTabChange = (tab) => {
		setActiveTab(tab);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 1, type: "spring", stiffness: 100 }}
			className="bg-[rgba(0,0,0,0.5)] min-h-max pt-5 items-center rounded-2xl justify-center p-4"
		>
			<Header activeTab={activeTab} onTabChange={handleTabChange} />
			<div className=" justify-self-center p-6 w-full px-2 max-w-md ">
				{activeTab === "loan" ? (
					<>
						<LoanInputSection
							title="Deposit"
							value={depositValue}
							setValue={setDepositValue}
							token={depositToken}
							tokenImage={depositTokenImage}
							tokenPrice={depositTokenPrice}
							onTokenChange={(token, image, price) => {
								setDepositToken(token);
								setDepositTokenImage(image);
								setDepositTokenPrice(price);
							}}
						/>
						<LoanInputSection
							title="Borrow"
							value={borrowValue}
							setValue={setBorrowValue}
							token={borrowToken}
							tokenImage={borrowTokenImage}
							tokenPrice={borrowTokenPrice}
							showChevron={false}
							isBorrow={true}
							exchangeRate={ngnToUsdRate}
						/>

						<DateSelector date={date} setDate={setDate} />
					</>
				) : (
					<>
						<BalanceSection balance={loanBalance} />
						<PaymentMethodSection
							value={paymentValue}
							setValue={setPaymentValue}
							token={paymentToken}
							tokenImage={paymentTokenImage}
							tokenPrice={paymentTokenPrice}
							onTokenChange={(token, image, price) => {
								setPaymentToken(token);
								setPaymentTokenImage(image);
								setPaymentTokenPrice(price);
							}}
						/>
					</>
				)}

				<PrimaryButton onClick={handleProceed}>Proceed</PrimaryButton>
			</div>
		</motion.div>
	);
}
