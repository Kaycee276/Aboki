import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { WalletConnectProvider } from "./contexts/WalletConnectContext";
import { AuthProvider } from "./contexts/AuthContext"; // ✅

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <WalletConnectProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </WalletConnectProvider>
    </BrowserRouter>
  </React.StrictMode>
);
