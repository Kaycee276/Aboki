import { motion } from "framer-motion";
import { X, ChevronDown, ChevronUp, Check } from "lucide-react";
import { useState, useEffect } from "react";

export const AccountDetailsModal = ({ isOpen, onClose, onSave }) => {
	const [bankDetails, setBankDetails] = useState({
		bank: "",
		accountNumber: "",
		accountName: "",
	}); // Initial state for bank details
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [banks, setBanks] = useState([]);
	const [isLoadingBanks, setIsLoadingBanks] = useState(false);
	const [isFormValid, setIsFormValid] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	// Fetch banks from API on component mount
	useEffect(() => {
		const fetchBanks = async () => {
			setIsLoadingBanks(true);
			try {
				const response = await fetch("https://nigerianbanks.xyz/");
				const data = await response.json();
				setBanks(
					data.map((bank) => ({
						value: bank.name, // Using bank code as value
						label: bank.name,
						ussd: bank.ussd, // Optional: you can use this later if needed
						logo: bank.logo,
					}))
				);
			} catch (error) {
				console.error("Error fetching banks:", error);
				// Fallback to some basic banks if API fails
				setBanks([
					{ value: "044", label: "Access Bank" },
					{ value: "058", label: "GT Bank" },
					{ value: "011", label: "First Bank" },
					{ value: "057", label: "Zenith Bank" },
					{ value: "033", label: "UBA" },
				]);
			} finally {
				setIsLoadingBanks(false);
			}
		};

		fetchBanks();
	}, []);

	const handleSave = () => {
		if (isFormValid) {
			onSave(bankDetails);
			setBankDetails({
				bank: "",
				accountNumber: "",
				accountName: "",
			});
			onClose();
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setBankDetails((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleBankSelect = (bank) => {
		setBankDetails((prev) => ({
			...prev,
			bank: bank.value,
		}));
		setIsDropdownOpen(false);
	};

	// Form validation
	useEffect(() => {
		const isValid =
			bankDetails.bank && bankDetails.accountNumber && bankDetails.accountName;
		setIsFormValid(isValid);
	}, [bankDetails]);

	if (!isOpen) return null;

	return (
		<motion.div
			className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-70"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			onClick={onClose}
		>
			<motion.div
				className="bg-gradient-to-b from-[#010616] via-[#23346A] to-[#333741] rounded-xl w-full max-w-md mx-4 overflow-hidden"
				initial={{ y: 50, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ y: 50, opacity: 0 }}
				transition={{ type: "spring", damping: 25, stiffness: 300 }}
				onClick={(e) => e.stopPropagation()}
			>
				<div className="relative p-6">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-lg font-medium text-white">
							Add an account details
						</h2>
						<button
							onClick={onClose}
							className="text-gray-400 hover:text-white transition"
						>
							<X size={20} />
						</button>
					</div>

					<div className="rounded p-4 mb-8">
						<div className="space-y-8">
							<div className="relative">
								<div className="relative">
									<div
										className={`w-full flex items-center border-b ${
											bankDetails.bank ? "border-blue-400" : "border-gray-600"
										} pb-2 text-white`}
										onClick={() => setIsDropdownOpen(true)}
									>
										{isDropdownOpen ? (
											<input
												type="text"
												value={searchTerm}
												onChange={(e) => setSearchTerm(e.target.value)}
												placeholder="Search bank..."
												className="w-full bg-transparent outline-none text-white placeholder-gray-400"
												autoFocus
											/>
										) : (
											<button
												className="w-full text-left outline-none flex justify-between items-center"
												onClick={() => setIsDropdownOpen(true)}
											>
												<span>
													{bankDetails.bank
														? banks.find((b) => b.value === bankDetails.bank)
																?.label
														: "Select Bank"}
												</span>
												{!isLoadingBanks &&
													(isDropdownOpen ? (
														<ChevronUp size={18} />
													) : (
														<ChevronDown size={18} />
													))}
											</button>
										)}
									</div>

									{isDropdownOpen && !isLoadingBanks && (
										<motion.div
											className="absolute z-10 mt-1 w-full bg-[#23346A] border border-gray-700 rounded-md shadow-lg overflow-hidden max-h-60 overflow-y-auto"
											initial={{ opacity: 0, y: -10 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -10 }}
										>
											{banks
												.filter((bank) =>
													bank.label
														.toLowerCase()
														.includes(searchTerm.toLowerCase())
												)
												.map((bank) => (
													<div
														key={bank.value}
														className={`px-4 py-2 cursor-pointer hover:bg-[#1a2a55] flex items-center justify-between ${
															bankDetails.bank === bank.value
																? "bg-[#1a2a55]"
																: ""
														}`}
														onClick={() => {
															handleBankSelect(bank);
															setSearchTerm("");
														}}
													>
														<span className="text-white flex items-center gap-2">
															<img src={bank.logo} className="h-auto w-4" />
															{bank.label}
														</span>
														{bankDetails.bank === bank.value && (
															<Check size={16} className="text-blue-400" />
														)}
													</div>
												))}
										</motion.div>
									)}
								</div>
							</div>

							<div>
								<input
									type="text"
									name="accountNumber"
									value={bankDetails.accountNumber}
									onChange={handleChange}
									className={`w-full border-b ${
										bankDetails.accountNumber
											? "border-blue-400"
											: "border-gray-600"
									} pb-2 text-white outline-none`}
									placeholder="Enter account number"
								/>
							</div>

							<div>
								<input
									type="text"
									name="accountName"
									value={bankDetails.accountName}
									onChange={handleChange}
									className={`w-full border-b ${
										bankDetails.accountName
											? "border-blue-400"
											: "border-gray-600"
									} pb-2 text-white outline-none`}
									placeholder="Enter account name"
								/>
							</div>
						</div>
					</div>

					<button
						onClick={handleSave}
						disabled={!isFormValid}
						className={`w-full py-3 rounded-full font-medium transition ${
							isFormValid
								? "bg-white text-blue-900 hover:bg-gray-200"
								: "bg-gray-500 text-gray-300 cursor-not-allowed"
						}`}
					>
						Save
					</button>
				</div>
			</motion.div>
		</motion.div>
	);
};
