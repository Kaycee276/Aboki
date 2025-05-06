// // src/contexts/AuthContext.jsx
// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
// 	const [connected, setConnected] = useState(() => {
// 		return localStorage.getItem("connected") === "true";
// 	});
// 	const navigate = useNavigate();

// 	useEffect(() => {
// 		localStorage.setItem("connected", connected);
// 	}, [connected]);

// 	const connect = () => {
// 		setConnected(true);
// 		navigate("/dashboard");
// 	};

// 	const disconnect = () => {
// 		setConnected(false);
// 		localStorage.removeItem("connected");
// 		navigate("/");
// 	};

// 	return (
// 		<AuthContext.Provider value={{ connected, connect, disconnect }}>
// 			{children}
// 		</AuthContext.Provider>
// 	);
// };

// export const useAuth = () => {
// 	return useContext(AuthContext);
// };

import { wagmiAdapter, projectId } from "../config/wagmiConfig";
import { createAppKit } from "@reown/appkit";
import { mainnet, base } from "viem/chains";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { cookieToInitialState, WagmiProvider } from "wagmi";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

const queryClient = new QueryClient();

if (!projectId) {
	throw new Error("Project Id is not defined ");
}

const metadata = {
	name: "Aboki.ETH",
	description: "Access Fiat Loans",
	url: "https://abokieth.vercel.app",
	icons: ["https://picsum.photos/200/300"],
};

const modal = createAppKit({
	adapters: [wagmiAdapter],
	projectId,
	networks: [mainnet, base],
	defaultNetwork: mainnet,
	metadata,
	features: {
		analytics: true,
		email: true,
		socials: ["google", "x", "github", "discord"],
		emailShowWallets: true,
	},
	themeMode: "dark",
});

function AuthProvider({ children, cookies }) {
	const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig, cookies);

	return (
		<WagmiProvider
			config={wagmiAdapter.wagmiConfig}
			initialState={initialState}
		>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</WagmiProvider>
	);
}

export default AuthProvider;
