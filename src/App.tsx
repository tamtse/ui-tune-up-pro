import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import UserDetail from "./pages/UserDetail";
import Transactions from "./pages/Transactions";
import Subscriptions from "./pages/Subscriptions";
import Documentation from "./pages/Documentation";
import ClientDevis from "./pages/ClientDevis";
import ClientFactures from "./pages/ClientFactures";
import ClientDocumentation from "./pages/ClientDocumentation";
import ClientContract from "./pages/ClientContract";
import ClientPortal from "./pages/ClientPortal";
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
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/client/devis" element={<ClientDevis />} />
          <Route path="/client/factures" element={<ClientFactures />} />
          <Route path="/client/documentation" element={<ClientDocumentation />} />
          <Route path="/client/contract" element={<ClientContract />} />
          <Route path="/client/:clientId" element={<ClientPortal />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
