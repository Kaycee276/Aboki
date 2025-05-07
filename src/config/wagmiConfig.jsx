import { cookieStorage, createStorage } from "wagmi";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet, base } from "viem/chains";

export const projectId = import.meta.env.VITE_PROJECT_ID;

if (!projectId) {
	throw new Error("Project Id is not defined ");
}

export const networks = [mainnet, base];

export const wagmiAdapter = new WagmiAdapter({
	storage: createStorage({
		storage: cookieStorage,
	}),
	ssr: true,
	autoConnect: true,
	networks,
	projectId,
});

export const config = wagmiAdapter.wagmiConfig;
