import ConnectWalletButton from "../common/ConnectWalletButton";

import Nav from "./Nav";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-opacity-80 backdrop-blur-md flex justify-between items-center  border border-[#4169E1] rounded-full px-4 py-2">
      <div className="text-base md:text-lg lg:text-xl text-white font-bold">
        ABOKI.<span className="text-blue-400">ETH</span>
      </div>
      <Nav />
      <ConnectWalletButton />
    </header>
  );
}
