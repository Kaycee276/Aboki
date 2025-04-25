import { useState } from "react";
import { motion } from "framer-motion";
import { LoanInput } from "./LoanInput";
import { LoanDateInput } from "./LoanDateInput";
import { LoanSummary } from "./LoanSummary";
import { ProceedButton } from "./ProceedButton";
import { PreviewModal } from "./PreviewModal";

export const LoanCard = () => {
	const [deposit, setDeposit] = useState("");
	const [borrow, setBorrow] = useState("");
	const [depositRate, setDepositRate] = useState(1);
	const [borrowRate, setBorrowRate] = useState(1);
	const [loanDate, setLoanDate] = useState(new Date().toISOString());
	const [showModal, setShowModal] = useState(false);
	const [exchangeRate, setExchangeRate] = useState(null);

	const handleDateChange = (dateString) => {
		setLoanDate(dateString);
	};

	const toggleModal = (e) => {
		e.preventDefault();
		setShowModal((prev) => !prev);
	};

	const depositUSD = parseFloat(deposit || 0) * depositRate;
	const borrowUSD = parseFloat(borrow || 0) * borrowRate;
	const ltv = depositUSD > 0 ? (borrowUSD / depositUSD) * 100 : 0;
	const isValid = depositUSD > 0 && borrowUSD > 0 && ltv <= 75;

	return (
		<>
			<motion.div
				className="bg-[rgba(0,0,0,0.5)] rounded-lg p-4 md:p-6 flex-1"
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 1, type: "spring", stiffness: 100 }}
			>
				<div className="flex justify-between items-center mb-6">
					<h3 className="text-xl">Loan</h3>
					<button className="text-gray-400 hover:text-white">Redeem</button>
				</div>

				<form className="max-w-lg mx-auto">
					<LoanInput
						label="Deposit"
						value={deposit}
						setExchangeRate={setExchangeRate}
						onChange={(e) => setDeposit(e.target.value)}
						setRate={setDepositRate}
						delay={1.1}
					/>
					<LoanInput
						label="Borrow"
						value={borrow}
						setExchangeRate={setExchangeRate}
						onChange={(e) => setBorrow(e.target.value)}
						setRate={setBorrowRate}
						delay={1.2}
					/>

					<LoanSummary
						depositUSD={depositUSD}
						borrowUSD={borrowUSD}
						ltv={ltv}
					/>

					<LoanDateInput
						date={loanDate}
						onDateChange={handleDateChange}
						delay={1.3}
					/>

					<ProceedButton
						delay={1.4}
						disabled={!isValid}
						onClick={toggleModal}
					/>
				</form>
			</motion.div>

			<PreviewModal
				isOpen={showModal}
				onClose={toggleModal}
				exchangeRate={exchangeRate}
				deposit={deposit}
				borrow={borrow}
				depositUSD={depositUSD}
				borrowUSD={borrowUSD}
				ltv={ltv}
				loanDate={loanDate}
			/>
		</>
	);
};
