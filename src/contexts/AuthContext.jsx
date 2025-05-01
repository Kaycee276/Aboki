// src/contexts/AuthContext.jsx
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [connected, setConnected] = useState(false);
	const navigate = useNavigate();

	const connect = () => {
		setConnected(true);
		navigate("/dashboard");
	};

	const disconnect = () => {
		setConnected(false);
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
