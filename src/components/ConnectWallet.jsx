import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { useWalletConnect } from "../contexts/WalletConnectContext";
import { X } from "lucide-react";

const ConnectWalletModal = () => {
	const { isConnected } = useAccount();
	const navigate = useNavigate();
	const { closeModal } = useWalletConnect();
	const [isAnimatingOut, setIsAnimatingOut] = useState(false);

	useEffect(() => {
		if (isConnected) {
			setIsAnimatingOut(true);
			setTimeout(() => {
				navigate("/dashboard");
				closeModal();
			}, 300);
		}
	}, [isConnected, navigate, closeModal]);

	const handleClose = () => {
		setIsAnimatingOut(true);
		setTimeout(() => closeModal(), 300);
	};

	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg px-4 transition-opacity duration-300 ${
				isAnimatingOut ? "opacity-0" : "opacity-100"
			}`}
			onClick={handleClose}
		>
			<div
				className={`w-full max-w-md bg-gradient-to-br from-[#0B163F] via-[#1D2F6F] to-[#35363B] text-white rounded-2xl p-8 shadow-lg transition-all duration-300 ${
					isAnimatingOut ? "scale-95 opacity-0" : "scale-100 opacity-100"
				}`}
				onClick={(e) => e.stopPropagation()}
			>
				{/* Close Button */}
				<button
					onClick={handleClose}
					className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
					aria-label="Close modal"
				>
					<X />
				</button>

				{/* Main Content */}
				<div className="text-center">
					{/* Header */}
					<h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
						Connect Your Wallet
					</h2>
					<p className="text-gray-300 mb-6">
						Link your digital wallet to start staking assets and accesssing fiat
						loans on Aboki<span className="text-blue-500">.eth</span>
					</p>

					{/* Reown AppKit's Connect Button */}
					<div className="w-full grid place-items-center mb-6">
						<w3m-button />
					</div>

					{/* Legal Disclaimer */}
					<p className="text-xs text-gray-400">
						By connecting, you agree to our{" "}
						<a href="/terms" className="text-blue-400 hover:underline">
							Terms of Use
						</a>{" "}
						and{" "}
						<a href="/privacy" className="text-blue-400 hover:underline">
							Privacy Policy
						</a>
						.
					</p>
				</div>
			</div>
		</div>
	);
};

export default ConnectWalletModal;
