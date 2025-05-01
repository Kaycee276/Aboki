import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
	const { connected } = useAuth();

	if (!connected) {
		return <Navigate to="/" replace />;
	}

	return children;
};

export default ProtectedRoute;
