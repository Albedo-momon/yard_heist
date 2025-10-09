import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import CoinToss from "./pages/CoinToss";
import DocsLayout from "./pages/docs/DocsLayout";
import Overview from "./pages/docs/Overview";
import TheGame from "./pages/docs/TheGame";
import Precursors from "./pages/docs/Precursors";
import KeyCult from "./pages/docs/KeyCult";
import Tokenomics from "./pages/docs/Tokenomics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/docs" element={<DocsLayout />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<Overview />} />
            <Route path="the-game" element={<TheGame />} />
            <Route path="precursors" element={<Precursors />} />
            <Route path="key-cult" element={<KeyCult />} />
            <Route path="tokenomics" element={<Tokenomics />} />
          </Route> 
          {/* <Route path="/games/coin-toss" element={<CoinToss />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
