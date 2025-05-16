import { useEffect, useState } from "react";
import { Header } from "../components/dashboard/Header";
import { StatsCards } from "../components/dashboard/StatsCards";
import LoanInterface from "../components/dashboard/loanform/LoanInterface";
import { History } from "lucide-react";
import { TransactionModal } from "../components/dashboard/TransactionModal";

const Dashboard = () => {
	const [assets, setAssets] = useState(
		JSON.parse(localStorage.getItem("assets") || 0)
	);
	const [loanBalance, setLoanBalance] = useState(
		JSON.parse(localStorage.getItem("loanBalance") || 0)
	);
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

	// Mock transaction data stored in localstorage
	const [transactions, setTransactions] = useState(() => {
		const stored = localStorage.getItem("transactionHistory");
		return stored ? JSON.parse(stored) : [];
	});

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
					onClick={() => setShowTransactions(true)}
					className="p-3 bg-gray-800 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
				>
					<History size={20} />
				</button>
			</div>

			{showTransactions && (
				<TransactionModal
					onClose={() => setShowTransactions(false)}
					initialTransactions={transactions}
				/>
			)}
		</>
	);
};

export default Dashboard;
