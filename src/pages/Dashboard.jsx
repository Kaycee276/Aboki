import { useEffect, useState } from "react";
import { Header } from "../components/dashboard/Header";
import { StatsCards } from "../components/dashboard/StatsCards";
import LoanInterface from "../components/dashboard/loanform/LoanInterface";
import { BowArrowIcon } from "lucide-react";
import { MdOutlinePayments } from "react-icons/md";
import { History } from "lucide-react";
import { TransactionModal } from "../components/dashboard/TransactionModal";
import { LoanStatusModal } from "../components/dashboard/LoanstatusModal";

const Dashboard = () => {
	const [assets, setAssets] = useState(0.0);
	const [loanBalance, setLoanBalance] = useState(0.0);
	const [reward, setReward] = useState(1);

	// Redeem section
	const [paymentValue, setPaymentValue] = useState("");
	const [paymentToken, setPaymentToken] = useState("USDT");
	const [paymentTokenImage, setPaymentTokenImage] = useState("");
	const [paymentTokenPrice, setPaymentTokenPrice] = useState(1);

	// Loan section
	const [depositValue, setDepositValue] = useState("");
	const [borrowValue, setBorrowValue] = useState("");
	const [depositToken, setDepositToken] = useState("USDT");
	const [depositTokenImage, setDepositTokenImage] = useState("");
	const [depositTokenPrice, setDepositTokenPrice] = useState(1);
	const [borrowToken, setBorrowToken] = useState("🇳🇬 NGN");
	const [borrowTokenImage, setBorrowTokenImage] = useState("");
	const [borrowTokenPrice, setBorrowTokenPrice] = useState(1);
	const [date, setDate] = useState([new Date()]);

	// Modal state
	const [showTransactions, setShowTransactions] = useState(false);
	const [showLoanStatus, setShowLoanStatus] = useState(false);

	// Mock transaction data
	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		const storedTransactions = JSON.parse(
			localStorage.getItem("transactionHistory") || "[]"
		);
		setTransactions(storedTransactions);
	}, []);

	return (
		<>
			<Header />
			<StatsCards assets={assets} loanBalance={loanBalance} reward={reward} />
			<LoanInterface
				setAssets={setAssets}
				loanBalance={loanBalance}
				setLoanBalance={setLoanBalance}
				paymentValue={paymentValue}
				setPaymentValue={setPaymentValue}
				paymentToken={paymentToken}
				setPaymentToken={setPaymentToken}
				paymentTokenImage={paymentTokenImage}
				setPaymentTokenImage={setPaymentTokenImage}
				paymentTokenPrice={paymentTokenPrice}
				setPaymentTokenPrice={setPaymentTokenPrice}
				depositValue={depositValue}
				setDepositValue={setDepositValue}
				borrowValue={borrowValue}
				setBorrowValue={setBorrowValue}
				depositToken={depositToken}
				setDepositToken={setDepositToken}
				depositTokenImage={depositTokenImage}
				setDepositTokenImage={setDepositTokenImage}
				depositTokenPrice={depositTokenPrice}
				setDepositTokenPrice={setDepositTokenPrice}
				borrowToken={borrowToken}
				setBorrowToken={setBorrowToken}
				borrowTokenImage={borrowTokenImage}
				setBorrowTokenImage={setBorrowTokenImage}
				borrowTokenPrice={borrowTokenPrice}
				setBorrowTokenPrice={setBorrowTokenPrice}
				date={date}
				setDate={setDate}
				transactions={transactions}
				setTransactions={setTransactions}
			/>

			<div className="fixed bottom-6 right-6 flex flex-col space-y-3">
				<button
					onClick={() => setShowLoanStatus(true)}
					className="p-3 bg-blue-600 rounded-full shadow-lg hover:bg-blue-500 transition-colors"
				>
					<MdOutlinePayments size={20} />
				</button>
				<button
					onClick={() => setShowTransactions(true)}
					className="p-3 bg-gray-800 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
				>
					<History size={20} />
				</button>
			</div>

			{showTransactions && (
				<TransactionModal
					onClose={() => setShowTransactions(false)}
					transactions={transactions}
				/>
			)}
			{showLoanStatus && (
				<LoanStatusModal
					onClose={() => setShowLoanStatus(false)}
					loanBalance={loanBalance}
					borrowedAmount={50000} // You might want to make this dynamic
					repaymentDate={date[0]}
					status={loanBalance > 0 ? "Active" : "Paid"}
				/>
			)}
		</>
	);
};

export default Dashboard;
