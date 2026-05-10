import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Home from "@/pages/Home";
import TheChallenge from "@/pages/TheChallenge";
import Features from "@/pages/Features";
import TradingRules from "@/pages/TradingRules";
import Rewards from "@/pages/Rewards";
import TradingPlatforms from "@/pages/TradingPlatforms";
import ProductsAndSpreads from "@/pages/ProductsAndSpreads";
import ToolsForTraders from "@/pages/ToolsForTraders";
import EconomicCalendar from "@/pages/EconomicCalendar";
import Blog from "@/pages/Blog";
import Affiliates from "@/pages/Affiliates";
import AboutUs from "@/pages/AboutUs";
import Careers from "@/pages/Careers";
import ContactUs from "@/pages/ContactUs";
import PropTradingTechnology from "@/pages/PropTradingTechnology";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/the-challenge" component={TheChallenge} />
      <Route path="/features" component={Features} />
      <Route path="/trading-rules" component={TradingRules} />
      <Route path="/rewards" component={Rewards} />
      <Route path="/trading-platforms" component={TradingPlatforms} />
      <Route path="/products-and-spreads" component={ProductsAndSpreads} />
      <Route path="/tools-for-traders" component={ToolsForTraders} />
      <Route path="/economic-calendar" component={EconomicCalendar} />
      <Route path="/blog" component={Blog} />
      <Route path="/become-a-funderpro-affiliate" component={Affiliates} />
      <Route path="/about-us" component={AboutUs} />
      <Route path="/careers" component={Careers} />
      <Route path="/contact-us" component={ContactUs} />
      <Route path="/prop-trading-technology" component={PropTradingTechnology} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <div className="dark">
            <Router />
          </div>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
