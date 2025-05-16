import { useState, useEffect } from "react";
import { Header } from "./Header";
import { LoanInputSection } from "./LoanInputSection";
import { PrimaryButton } from "./PrimaryButton";
import { BalanceSection } from "./BalanceSection";
import { DateSelector } from "./DateSelector";
import { motion } from "framer-motion";
import { PreviewModal } from "../PreviewModal";

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

	setLoanBalance,
	setAssets,
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

	transactions,
	setTransactions,

	// incase of loan in another token
	setBorrowTokenPrice,
	setBorrowTokenImage,
	setBorrowToken,
}) {
	const [activeTab, setActiveTab] = useState("redeem");

	const [ngnToUsdRate, setNgnToUsdRate] = useState(null);
	const [showPreview, setShowPreview] = useState(false);

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
		setShowPreview(true);
	};

	const isProceedDisabled = () => {
		if (activeTab === "loan") {
			const depositTrimmed = depositValue.trim();
			const borrowTrimmed = borrowValue.trim();

			const depositNum = Number(depositTrimmed);
			const borrowNum = Number(borrowTrimmed);

			return (
				depositTrimmed === "" ||
				borrowTrimmed === "" ||
				isNaN(depositNum) ||
				isNaN(borrowNum) ||
				depositNum <= 0 ||
				borrowNum <= 0
			);
		} else {
			const paymentTrimmed = paymentValue.trim();
			const paymentNum = Number(paymentTrimmed);

			return paymentTrimmed === "" || isNaN(paymentNum) || paymentNum <= 0;
		}
	};

	const previewData =
		activeTab === "loan"
			? {
					borrowValue,
					depositToken,
					depositValue,
					ngnToUsdRate,
					date,
					depositTokenPrice,
			  }
			: {
					paymentValue,
					paymentToken,
					paymentTokenImage,
					paymentTokenPrice,
					ngnToUsdRate,
					loanBalance,
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
							isBorrow={true}
							token={borrowToken}
							tokenImage={borrowTokenImage}
							tokenPrice={borrowTokenPrice}
							showChevron={false}
							exchangeRate={ngnToUsdRate}
						/>

						<DateSelector date={date} setDate={setDate} />
					</>
				) : (
					<>
						<BalanceSection balance={loanBalance} />
						<LoanInputSection
							title="Method of payment"
							value={paymentValue}
							setValue={setPaymentValue}
							token={paymentToken}
							tokenImage={paymentTokenImage}
							// showChevron={false}
							tokenPrice={paymentTokenPrice}
							onTokenChange={(token, image, price) => {
								setPaymentToken(token);
								setPaymentTokenImage(image);
								setPaymentTokenPrice(price);
							}}
						/>
					</>
				)}

				<PrimaryButton onClick={handleProceed} disabled={isProceedDisabled()}>
					Proceed
				</PrimaryButton>

				<PreviewModal
					isOpen={showPreview}
					onClose={() => setShowPreview(false)}
					type={activeTab}
					data={previewData}
					transactions={transactions}
					setTransactions={setTransactions}
					setLoanBalance={setLoanBalance}
					setAssets={setAssets}
				/>
			</div>
		</motion.div>
	);
}
