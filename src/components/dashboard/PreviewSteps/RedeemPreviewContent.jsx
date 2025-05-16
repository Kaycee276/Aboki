import { PreviewItem } from "./PreviewItem";
import { formatNumber } from "../../../utils/formatNumbers";

export const RedeemPreviewContent = ({ data }) => (
	<>
		<PreviewItem
			label="Payment Amount"
			value={`  ${data.paymentValue} ${data.paymentToken}`}
		/>
		<PreviewItem
			label="Value in USD"
			value={`${data.paymentValue * data.paymentTokenPrice} `}
		/>
		<PreviewItem label="Exchange Rate" value={data.ngnToUsdRate} />
		<PreviewItem
			label="Value in Naira"
			value={formatNumber(
				data.paymentValue * data.paymentTokenPrice * data.ngnToUsdRate
			)}
		/>
	</>
);
