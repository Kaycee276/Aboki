import { PreviewItem } from "./PreviewItem";

export const RedeemPreviewContent = ({ data }) => (
	<PreviewItem label="Payment Amount" value={`${data.paymentValue}`} />
);
