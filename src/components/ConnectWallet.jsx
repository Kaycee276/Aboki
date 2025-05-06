import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { useWalletConnect } from "../contexts/WalletConnectContext";

const ConnectWalletModal = () => {
	const { isConnected } = useAccount();
	const navigate = useNavigate();

	const { closeModal } = useWalletConnect();

	useEffect(() => {
		if (isConnected) {
			navigate("/dashboard");
			closeModal();
		}
	}, [isConnected, navigate, closeModal]);

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg px-4"
			onClick={closeModal}
		>
			<div
				className="w-full max-w-xl md:max-w-3xl bg-gradient-to-br from-[#0B163F] via-[#1D2F6F] to-[#35363B] text-white rounded-2xl p-6 md:p-10 shadow-lg animate-fade-in-up will-change-transform"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex flex-col justify-center text-center">
					<h2 className="text-lg md:text-2xl font-semibold">
						Get started by connecting your wallet
					</h2>
					<p className="text-sm md:text-base text-gray-300 mb-8">
						Link your digital wallet to start staking assets and accessing fiat
						loans on <span className="text-blue-400">Aboki.eth</span>
					</p>
				</div>
				<div className="w-full grid place-items-center">
					<w3m-button />
				</div>
			</div>
		</div>
	);
};

export default ConnectWalletModal;
