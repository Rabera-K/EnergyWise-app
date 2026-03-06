import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import App from "./App.jsx";
import { UserProvider } from "./context/UserProvider.jsx";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider>
      <UserProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </UserProvider>
    </DataProvider>
  </StrictMode>,
);
