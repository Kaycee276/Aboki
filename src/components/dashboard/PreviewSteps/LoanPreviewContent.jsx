import { formatLoanDuration } from "../../../utils/formatDate";
import { PreviewItem } from "./PreviewItem";

export const LoanPreviewContent = ({ data }) => (
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
		<PreviewItem label="Wallet Address" value={undefined} />
		<PreviewItem label="Loan Duration" value={formatLoanDuration(data.date)} />
	</>
);
