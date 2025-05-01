// src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [connected, setConnected] = useState(() => {
		return localStorage.getItem("connected") === "true";
	});
	const navigate = useNavigate();

	useEffect(() => {
		localStorage.setItem("connected", connected);
	}, [connected]);

	const connect = () => {
		setConnected(true);
		navigate("/dashboard");
	};

	const disconnect = () => {
		setConnected(false);
		localStorage.removeItem("connected");
		navigate("/");
	};

	return (
		<AuthContext.Provider value={{ connected, connect, disconnect }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
