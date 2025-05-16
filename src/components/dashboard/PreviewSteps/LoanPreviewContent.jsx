import { formatLoanDuration } from "../../../utils/formatDate";
import { PreviewItem } from "./PreviewItem";
import { useAccount } from "wagmi";
import { formatAddress } from "../../../utils/formatAddress";

export const LoanPreviewContent = ({ data }) => {
	const { address } = useAccount();
	return (
		<>
			<PreviewItem
				label="Loan Amount"
				value={`₦${parseFloat(data.borrowValue).toLocaleString()}`}
			/>
			<PreviewItem
				label="Asset Deposited"
				value={`${data.depositValue} ${data.depositToken}`}
			/>
			<PreviewItem label="Gas fee" value={undefined} />
			<PreviewItem label="Interest Rate" value={undefined} />
			<PreviewItem
				label="Exchange Rate"
				value={`₦${parseFloat(data.ngnToUsdRate).toLocaleString()}`}
			/>
			<PreviewItem label="Wallet Address" value={formatAddress(address)} />
			<PreviewItem
				label="Loan Duration"
				value={formatLoanDuration(data.date)}
			/>
		</>
	);
};
