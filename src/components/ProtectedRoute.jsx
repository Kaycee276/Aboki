import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isConnected } = useAuth();

  if (!isConnected) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
