import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Vendors from "./pages/Vendors";
import Payments from "./pages/Payments";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import { useAuth } from "@/_core/hooks/useAuth";

function Router() {
  const { user } = useAuth();
  
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/services"} component={Services} />
      <Route path={"/portfolio"} component={Portfolio} />
      <Route path={"/vendors"} component={Vendors} />
      <Route path={"/payments"} component={Payments} />
      <Route path={"/contact"} component={Contact} />
      {user?.role === "admin" && <Route path={"/admin"} component={AdminDashboard} />}
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - Light theme is the default for ArtCulture's luxury aesthetic
// - Theme is switchable for user preference

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
