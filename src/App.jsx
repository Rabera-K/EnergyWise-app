import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Insights from "./pages/Insights/Insights";
import Layout from "./components/Layout/Layout";
import MyEnergy from "./pages/MyEnergy/MyEnergy";
import BuyEnergy from "./pages/BuyEnergy/BuyEnergy";
import BuyEnergyOnboarding from "./pages/Onboarding/BuyEnergyOnboarding";
import LogPurchase from "./pages/LogPurchase/LogPurchase";
import LogPurchaseOnboarding from "./pages/Onboarding/LogPurchaseOnboarding";
import Landing from "./components/auth/LandingPage/LandingPage";
import Login from "./components/auth/Login/Login";
import SignUp from "./components/auth/SignUp/SignUp";
import HomeInfo from "./components/auth/HomeInfo/HomeInfo";
import BusinessInfo from "./components/auth/BusinessInfo/BusinessInfo";
import QuickSetup from "./components/auth/QuickSetup/QuickSetup";
import ProtectedRoute from "./components/auth/ProtectedRoute/ProtectedRoute";
import UserTypeSelect from "./components/auth/UserTypeSelect/UserType";
import MeterSetup from "./components/auth/MeterSetup/MeterSetup";
import Account from "./pages/Account/Account";
import Services from "./pages/Services/Services";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/homeinfo"
          element={
            <ProtectedRoute>
              <HomeInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-type"
          element={
            <ProtectedRoute>
              <UserTypeSelect />
            </ProtectedRoute>
          }
        />
        <Route
          path="/meter-setup"
          element={
            <ProtectedRoute>
              <MeterSetup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/businessinfo"
          element={
            <ProtectedRoute>
              <BusinessInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quicksetup"
          element={
            <ProtectedRoute>
              <QuickSetup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/onboarding/buy-energy"
          element={
            <ProtectedRoute>
              <BuyEnergyOnboarding />
            </ProtectedRoute>
          }
        />
        <Route
          path="/onboarding/log-purchase"
          element={
            <ProtectedRoute>
              <LogPurchaseOnboarding />
            </ProtectedRoute>
          }
        />

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-energy" element={<MyEnergy />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/services" element={<Services />} />
          <Route path="/account" element={<Account />} />
          <Route path="/buy-energy" element={<BuyEnergy />} />
          <Route path="/log-purchase" element={<LogPurchase />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
