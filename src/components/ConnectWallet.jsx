import { useWalletConnect } from "../contexts/WalletConnectContext";
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
  const { closeModal } = useWalletConnect();
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

        <button className="w-full bg-white text-[#4169e1] py-3 rounded-full cursor-pointer font-medium hover:bg-[#4169E1] hover:text-white transition">
          Connect wallet
        </button>
      </div>
    </div>
  );
};

export default ConnectWalletModal;
