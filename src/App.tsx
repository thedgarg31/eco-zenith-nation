import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Actions from "./pages/Actions";
import Leaderboard from "./pages/Leaderboard";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import EnergyDashboard from "./pages/EnergyDashboard";
import CarbonCalculator from "./pages/CarbonCalculator";
import ApplianceTracker from "./pages/ApplianceTracker";
import EnergySimulator from "./pages/EnergySimulator";
import ChallengesGoals from "./pages/ChallengesGoals";
import EcoNews from "./pages/EcoNews";
import CommunityForum from "./pages/CommunityForum";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Component to handle loading state
const AppContent = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/actions" element={<Actions />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/energy" element={<EnergyDashboard />} />
          <Route path="/carbon-calculator" element={<CarbonCalculator />} />
          <Route path="/appliances" element={<ApplianceTracker />} />
          <Route path="/simulator" element={<EnergySimulator />} />
          <Route path="/challenges" element={<ChallengesGoals />} />
          <Route path="/news" element={<EcoNews />} />
          <Route path="/community" element={<CommunityForum />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  </QueryClientProvider>
);

export default App;