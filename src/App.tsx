import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UserDashboard from "./pages/UserDashboard";
import Users from "./pages/Users";
import UserDetail from "./pages/UserDetail";
import Transactions from "./pages/Transactions";
import Subscriptions from "./pages/Subscriptions";
import Documentation from "./pages/Documentation";
import UserGuide from "./pages/UserGuide";
import ClientUserGuide from "./pages/ClientUserGuide";
import ClientDevis from "./pages/ClientDevis";
import ClientFactures from "./pages/ClientFactures";
import ClientDocumentation from "./pages/ClientDocumentation";
import ClientContract from "./pages/ClientContract";
import ClientPortal from "./pages/ClientPortal";
import Contacts from "./pages/Contacts";
import UserFinance from "./pages/UserFinance";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/user-guide" element={<UserGuide />} />
          <Route path="/client-guide" element={<ClientUserGuide />} />
          <Route path="/client/:clientId" element={<ClientPortal />} />
          <Route path="/client/:clientId/contract/:contractId" element={<ClientContract />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/finances" element={<UserFinance />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
