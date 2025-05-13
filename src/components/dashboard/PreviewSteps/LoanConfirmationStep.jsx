import { motion, AnimatePresence } from "framer-motion";
import { PrimaryButton } from "../loanform/PrimaryButton";
import { useState } from "react";
import { AccountDetailsModal } from "./AccountDetailsModal";
import { Pencil, Trash2 } from "lucide-react";

export const ConfirmationStep = ({ onClose, onConfirm }) => {
	const [showAccountModal, setShowAccountModal] = useState(false);
	const [bankAccounts, setBankAccounts] = useState([]);
	const [selectedAccountIndex, setSelectedAccountIndex] = useState(null);

	const handleAddAccount = () => {
		setShowAccountModal(true);
	};

	const handleCloseAccountModal = () => {
		setShowAccountModal(false);
	};

	const handleAccountSave = (accountDetails) => {
		if (selectedAccountIndex !== null) {
			const updatedAccounts = [...bankAccounts];
			updatedAccounts[selectedAccountIndex] = accountDetails;
			setBankAccounts(updatedAccounts);
			setSelectedAccountIndex(null);
		} else {
			setBankAccounts([...bankAccounts, accountDetails]);
		}
		setShowAccountModal(false);
	};

	const handleEditAccount = (index) => {
		setSelectedAccountIndex(index);
		setShowAccountModal(true);
	};

	const handleDeleteAccount = (index) => {
		const updatedAccounts = [...bankAccounts];
		updatedAccounts.splice(index, 1);
		setBankAccounts(updatedAccounts);

		if (selectedAccountIndex === index) {
			setSelectedAccountIndex(null);
		} else if (selectedAccountIndex > index) {
			{
				setSelectedAccountIndex(selectedAccountIndex - 1);
			}
		}
	};

	const handleConfirm = () => {
		if (selectedAccountIndex !== null) {
			console.log("Selected account:", bankAccounts[selectedAccountIndex]);
			onConfirm();
		}
	};

	return (
		<>
			<motion.div
				key="choose-account"
				initial={{ x: "100%", opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				exit={{ x: "100%", opacity: 0 }}
				transition={{ duration: 0.3, ease: "easeInOut" }}
				className="w-full"
			>
				<h2 className="text-sm mb-6 text-white">
					Choose an account number you want the money to be sent to
				</h2>

				{bankAccounts.length > 0 ? (
					<div className="space-y-4 mb-6">
						{bankAccounts.map((account, index) => (
							<div
								key={index}
								className={`border rounded-lg p-4 cursor-pointer transition-colors ${
									selectedAccountIndex === index
										? "border-blue-500 bg-blue-900 bg-opacity-20"
										: "border-gray-700 hover:border-gray-500"
								}`}
								onClick={() => setSelectedAccountIndex(index)}
							>
								<div className="flex justify-between items-start">
									<div>
										<h3 className="text-white font-medium">{account.bank}</h3>
										<p className="text-gray-300 mt-1">
											{account.accountNumber}
										</p>
										<p className="text-gray-400 text-sm">
											{account.accountName}
										</p>
									</div>
									<div className="flex space-x-2">
										<button
											onClick={(e) => {
												e.stopPropagation();
												handleEditAccount(index);
											}}
											className="text-gray-400 hover:text-blue-400 transition"
										>
											<Pencil size={18} />
										</button>
										<button
											onClick={(e) => {
												e.stopPropagation();
												handleDeleteAccount(index);
											}}
											className="text-gray-400 hover:text-red-400 transition"
										>
											<Trash2 size={18} />
										</button>
									</div>
								</div>
							</div>
						))}

						{bankAccounts.length < 3 && (
							<div className="mt-6 flex justify-center">
								<button
									onClick={handleAddAccount}
									className="text-sm text-gray-400 hover:text-gray-300 underline cursor-pointer"
								>
									Add another account
								</button>
							</div>
						)}

						<div className="mt-8">
							<button
								onClick={handleConfirm}
								disabled={selectedAccountIndex === null}
								className={`w-full py-3 rounded-full transition font-medium ${
									selectedAccountIndex !== null
										? "bg-white text-blue-900 hover:bg-gray-200"
										: "bg-gray-700 text-gray-400 cursor-not-allowed"
								}`}
							>
								Confirm
							</button>
						</div>
					</div>
				) : (
					<div className="grid place-items-center mb-6 py-8">
						<p
							className="underline text-gray-400 text-sm cursor-pointer"
							onClick={handleAddAccount}
						>
							Add Account
						</p>
					</div>
				)}

				{bankAccounts.length === 0 && (
					<div className="flex justify-end space-x-3">
						<PrimaryButton
							onClick={onClose}
							className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition"
						>
							Close
						</PrimaryButton>
					</div>
				)}
			</motion.div>

			{/* Account Details Modal */}
			<AnimatePresence>
				{showAccountModal && (
					<AccountDetailsModal
						isOpen={showAccountModal}
						onClose={handleCloseAccountModal}
						onSave={handleAccountSave}
					/>
				)}
			</AnimatePresence>
		</>
	);
};
