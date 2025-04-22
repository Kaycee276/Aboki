import { FaWallet } from "react-icons/fa";
import { motion } from "framer-motion";
import { useWalletConnect } from "../contexts/WalletConnectContext";

export default function ConnectWalletButton() {
  const { openModal } = useWalletConnect();

  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      className="flex items-center justify-center gap-2 bg-white text-[#4169E1] md:px-4 md:py-2  px-4 py-1 rounded-full text-sm font-semibold  hover:text-white hover:bg-[#4169E1]  transition duration-300 cursor-pointer md:mr-4 sm:mr-4"
      onClick={openModal}
    >
      <span className="hidden sm:inline">Connect Wallet</span>
      <FaWallet className="text-lg " />
    </motion.button>
  );
}
