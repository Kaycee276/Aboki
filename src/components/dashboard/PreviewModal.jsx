import { useState } from "react";
import { ModalContainer } from "./ModalContainer";
import { LoanPreviewStep } from "./PreviewSteps/LoanPreviewStep";
import { ConfirmationStep } from "./PreviewSteps/LoanConfirmationStep";
import { TransactionSuccessModal } from "./PreviewSteps/TransactionSuccessModal";

export const PreviewModal = ({
	isOpen,
	onClose,
	type,
	data,
	transactions,
	setTransactions,
	setLoanBalance,
	setAssets,
}) => {
	const [step, setStep] = useState(1);

	if (!isOpen) return null;

	const handleConfirm = () => {
		if (step === 1) {
			setTransactions(data);
		}
		setStep(step + 1);
	};

	const handleFinalConfirm = () => {
		console.log("Final Transaction:", transactions);

		saveTransactionToHistory(transactions);

		const newLoanBalance = (prevLoanBalance) =>
			prevLoanBalance + parseFloat(transactions.borrowValue);
		const updatedLoanBalance = newLoanBalance(
			JSON.parse(localStorage.getItem("loanBalance") || "0")
		);
		localStorage.setItem("loanBalance", JSON.stringify(updatedLoanBalance));
		setLoanBalance(updatedLoanBalance);

		const addedAssets =
			parseFloat(transactions.depositValue) * transactions.depositTokenPrice;
		const updatedAssets =
			JSON.parse(localStorage.getItem("assets") || "0") + addedAssets;
		localStorage.setItem("assets", JSON.stringify(updatedAssets));
		setAssets(updatedAssets);

		handleConfirm();
	};

	const saveTransactionToHistory = (transaction) => {
		const history = JSON.parse(
			localStorage.getItem("transactionHistory") || "[]"
		);
		history.push(transaction);
		localStorage.setItem("transactionHistory", JSON.stringify(history));
	};

	const handleClose = () => {
		onClose();
		// Reset step after animation completes
		setTimeout(() => {
			setStep(1);
		}, 300);
	};

	if (type === "redeem" && step === 1) {
		return (
			<ModalContainer isOpen={isOpen} onClose={handleClose}>
				<LoanPreviewStep type={type} data={data} onConfirm={handleConfirm} />
			</ModalContainer>
		);
	}

	return (
		<ModalContainer isOpen={isOpen} onClose={handleClose}>
			{step === 1 ? (
				<LoanPreviewStep type={type} data={data} onConfirm={handleConfirm} />
			) : step === 2 ? (
				<ConfirmationStep
					onClose={handleClose}
					onConfirm={handleFinalConfirm}
				/>
			) : (
				<TransactionSuccessModal
					onClose={handleClose}
					transactions={transactions}
				/>
			)}
		</ModalContainer>
	);
};
