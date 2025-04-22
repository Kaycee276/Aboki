import { motion } from "framer-motion";
import { useWalletConnect } from "../contexts/WalletConnectContext";

export default function GetStartedButton() {
  const { openModal } = useWalletConnect();
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      className="px-6 py-2 border text-white bg-transparent border-[#4169E1] border-solid rounded-full hover:border-dashed transition duration-300 cursor-pointer"
      onClick={openModal}
    >
      Get started
    </motion.button>
  );
}
