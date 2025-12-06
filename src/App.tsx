import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashboardLayout from "./components/DashboardLayout";
import Overview from "./pages/dashboard/Overview";
import Devices from "./pages/dashboard/Devices";
import Automation from "./pages/dashboard/Automation";
import Analytics from "./pages/dashboard/Analytics";
import Monitoring from "./pages/dashboard/Monitoring";
import Workflows from "./pages/dashboard/Workflows";
import Settings from "./pages/dashboard/Settings";
import Support from "./pages/dashboard/Support";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <DashboardLayout>
                <Overview />
              </DashboardLayout>
            }
          />
          <Route
            path="/dashboard/devices"
            element={
              <DashboardLayout>
                <Devices />
              </DashboardLayout>
            }
          />
          <Route
            path="/dashboard/automation"
            element={
              <DashboardLayout>
                <Automation />
              </DashboardLayout>
            }
          />
          <Route
            path="/dashboard/analytics"
            element={
              <DashboardLayout>
                <Analytics />
              </DashboardLayout>
            }
          />
          <Route
            path="/dashboard/monitoring"
            element={
              <DashboardLayout>
                <Monitoring />
              </DashboardLayout>
            }
          />
          <Route
            path="/dashboard/workflows"
            element={
              <DashboardLayout>
                <Workflows />
              </DashboardLayout>
            }
          />
          <Route
            path="/dashboard/settings"
            element={
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            }
          />
          <Route
            path="/dashboard/support"
            element={
              <DashboardLayout>
                <Support />
              </DashboardLayout>
            }
          />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
