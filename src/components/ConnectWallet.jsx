import { useWalletConnect } from "../contexts/WalletConnectContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const wallets = [
  { name: "Metamask", icon: "/icons/metamask.png" },
  { name: "Coinbase", icon: "/icons/coinbase.png" },
  { name: "Phantom", icon: "/icons/phantom.png" },
  { name: "Wallet connect", icon: "/icons/wallet-connect.png" },
  { name: "Safe pal", icon: "/icons/safepal.png" },
  { name: "Portis", icon: "/icons/portis.png" },
  { name: "Gnosis", icon: "/icons/gnosis.png" },
  { name: "Binance chain", icon: "/icons/binance-smart-chain.png" },
  { name: "Rainbow", icon: "/icons/rainbow.png" },
  { name: "Brave", icon: "/icons/brave.png" },
];

const ConnectWalletModal = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { connect } = auth || {};
  const { closeModal } = useWalletConnect();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConnect = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise((res) => setTimeout(res, 2000));
      connect;
      closeModal();
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to connect wallet. Please try again");
      console.error("Connection error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-2xl px-4"
      onClick={closeModal}
    >
      <div
        className="w-full max-w-xl md:max-w-3xl bg-gradient-to-br from-[#0B163F] via-[#1D2F6F] to-[#35363B] text-white rounded-2xl p-6 md:p-10 shadow-lg animate-fade-in-up will-change-transform"
        onClick={(e) => e.stopPropagation()}
      >
        <div className=" flex flex-col justify-center text-center ">
          <h2 className="text-lg md:text-2xl font-semibold">
            Get started by connecting your wallet
          </h2>
          <p className="text-sm md:text-base text-gray-300 mb-8">
            Link your digital wallet to start staking assets and accesssing fiat
            loans on <span className="text-blue-400">Aboki.eth</span>
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {wallets.map((wallet, idx) => (
            <button
              key={idx}
              className="flex items-center gap-2 px-4 py-3 cursor-pointer border border-dashed hover:border-solid transition duration-200 rounded-md hover:bg-white/10 "
            >
              <img src={wallet.icon} alt={wallet.name} className="w-5 h-5" />
              <span className="text-xs md:text-sm">{wallet.name}</span>
            </button>
          ))}
        </div>

        <button
          className={`w-full  py-3 rounded-full font-medium transition ${isLoading? 'bg-gray-500 text-white cursor-not-allowed': 'bg-white text-[#4169e1] cursor-pointer' } `}
          onClick={handleConnect}
          disabled={isLoading}
        >
          {isLoading ? 
            <BarsLoader />
             : "Connect Wallet"}
        </button>
      </div>
    </div>
  );
};

export default ConnectWalletModal;

const BarsLoader = ()=>{
  return(
    <div className="flex items-center justify-center gap-1">
      <div className="flex space-x-[2px]">
        {['▄','▀','▄','▀','▄'].map((char, i) => (
          <span 
            key={i}
            className="text-blue-400 text-xs"
            style={{
              animation: `chain-bounce 1.2s infinite`,
              animationDelay: `${i * 0.1}s`
            }}
          >
            {char}
          </span>
        ))}
      </div>
      <span className="ml-2">Connecting wallet</span>
  </div>
  )
}




