import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Transactions from "./pages/Transactions";
import Auctions from "./pages/Auctions";
import Account from "./pages/Account";
import KYCUpdate from "./pages/KYCUpdate";
import AccountOpening from "./pages/AccountOpening";
import Pledging from "./pages/Pledging";
import SecurityTransfer from "./pages/SecurityTransfer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/auctions" element={<Auctions />} />
          <Route path="/account" element={<Account />} />
          <Route path="/kyc" element={<KYCUpdate />} />
          <Route path="/account-opening" element={<AccountOpening />} />
          <Route path="/pledging" element={<Pledging />} />
          <Route path="/security-transfer" element={<SecurityTransfer />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
