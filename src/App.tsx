import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/layout/AppSidebar";
import { Header } from "./components/layout/Header";
import MobileNav from "./components/layout/MobileNav";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Transactions from "./pages/Transactions";
import Auctions from "./pages/Auctions";
import AuctionOrders from "./pages/AuctionOrders";
import Account from "./pages/Account";
import KYCUpdate from "./pages/KYCUpdate";
import AccountOpening from "./pages/AccountOpening";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            {/* Desktop Sidebar - hidden on mobile */}
            <div className="hidden md:block">
              <AppSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col w-full">
              <Header />
              <main className="flex-1 pb-16 md:pb-0">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/auctions" element={<Auctions />} />
                  <Route path="/auction-orders" element={<AuctionOrders />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/kyc-update" element={<KYCUpdate />} />
                  <Route path="/account-opening" element={<AccountOpening />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              {/* Mobile Nav - only shown on mobile */}
              <div className="md:hidden">
                <MobileNav />
              </div>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
