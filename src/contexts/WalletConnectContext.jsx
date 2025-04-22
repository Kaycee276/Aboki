import { createContext, useContext, useState } from "react";
import ConnectWalletModal from "../components/ConnectWallet";

const WalletConnectContext = createContext();

// 2. Provider component
export const WalletConnectProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <WalletConnectContext.Provider value={{ openModal, closeModal }}>
      {children}
      {isModalOpen && <ConnectWalletModal />}
    </WalletConnectContext.Provider>
  );
};

export const useWalletConnect = () => {
  const context = useContext(WalletConnectContext);
  if (!context) {
    throw new Error(
      "useWalletConnect must be used within a WalletConnectProvider"
    );
  }
  return context;
};
