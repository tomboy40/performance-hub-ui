import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Interfaces from "./pages/Interfaces";
import InterfaceDetailsPage from "./pages/InterfaceDetailsPage";
import DlasSync from "./pages/DlasSync";
import NotFound from "./pages/NotFound";
import CustomDashboard from "./pages/CustomDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/interfaces" element={<Interfaces />} />
          <Route path="/interfaces/:id" element={<InterfaceDetailsPage />} />
          <Route path="/dlas-sync" element={<DlasSync />} />
          <Route path="/custom-dashboard" element={<CustomDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
