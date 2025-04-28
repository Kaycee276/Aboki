import { useState } from "react";
import { Header } from "../components/dashboard/Header";
import { StatsCards } from "../components/dashboard/StatsCards";
import LoanInterface from "../components/dashboard/loanform/LoanInterface";
import { BowArrowIcon } from "lucide-react";

const Dashboard = () => {
	const [assets, setAssets] = useState(0.0);
	const [loanBalance, setLoanBalance] = useState(0.0);
	const [reward, setReward] = useState(1);

	// Redeem section
	const [paymentValue, setPaymentValue] = useState();
	const [paymentToken, setPaymentToken] = useState("USDT");
	const [paymentTokenImage, setPaymentTokenImage] = useState("");
	const [paymentTokenPrice, setPaymentTokenPrice] = useState(1);

	// Loan section
	const [depositValue, setDepositValue] = useState();
	const [borrowValue, setBorrowValue] = useState();
	const [depositToken, setDepositToken] = useState("USDT");
	const [depositTokenImage, setDepositTokenImage] = useState("");
	const [depositTokenPrice, setDepositTokenPrice] = useState(1);
	const [borrowToken, setBorrowToken] = useState("🇳🇬 NGN");
	const [borrowTokenImage, setBorrowTokenImage] = useState("");
	const [borrowTokenPrice, setBorrowTokenPrice] = useState(1);
	const [date, setDate] = useState([new Date()]);
	return (
		<>
			<Header />
			<StatsCards
				assets={assets}
				loanBalance={loanBalance}
				reward={reward}
				// setReward={setReward}
				// setAssets={setAssets}
				// setLoanBalance={setLoanBalance}
			/>
			<LoanInterface
				loanBalance={loanBalance}
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
			/>
		</>
	);
};

export default Dashboard;
