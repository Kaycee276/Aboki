import { useState } from "react";
import { ModalContainer } from "./ModalContainer";
import { LoanPreviewStep } from "./PreviewSteps/LoanPreviewStep";
import { ConfirmationStep } from "./PreviewSteps/LoanConfirmationStep";

export const PreviewModal = ({ isOpen, onClose, type, data }) => {
	const [step, setStep] = useState(1);

	if (!isOpen) return null;

	const handleConfirm = () => {
		setStep(step + 1);
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
			) : (
				<ConfirmationStep onClose={handleClose} />
			)}
		</ModalContainer>
	);
};
