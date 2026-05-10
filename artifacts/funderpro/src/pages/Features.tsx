import { Layout } from "@/components/layout/Layout";
import { BarChart3, Clock, Globe, Shield, Smartphone, Target, Wallet, Zap } from "lucide-react";

export default function Features() {
  const features = [
    { icon: <Clock className="w-8 h-8 text-primary" />, title: "Unlimited Time", description: "Trade at your own pace. There are no minimum trading days and no time limits on your evaluation." },
    { icon: <Wallet className="w-8 h-8 text-primary" />, title: "Daily Payouts", description: "Request your profits whenever you want. Get paid out daily after your first successful trade." },
    { icon: <Globe className="w-8 h-8 text-primary" />, title: "Multiple Platforms", description: "Choose between MetaTrader 4, MetaTrader 5, and cTrader for your trading journey." },
    { icon: <TrendingUp className="w-8 h-8 text-primary" />, title: "Scaling Plan", description: "Consistently profitable? We'll increase your capital balance up to $2,000,000." },
    { icon: <BarChart3 className="w-8 h-8 text-primary" />, title: "Real-time Analytics", description: "Track your performance with our proprietary dashboard built for serious traders." },
    { icon: <Shield className="w-8 h-8 text-primary" />, title: "Risk Management", description: "Built-in tools to help you manage your risk and stay within the challenge parameters." },
    { icon: <Smartphone className="w-8 h-8 text-primary" />, title: "Trade Anywhere", description: "Access your account from desktop, web, or mobile. Never miss a trading opportunity." },
    { icon: <Target className="w-8 h-8 text-primary" />, title: "Fair Rules", description: "No hidden traps. Our rules are straightforward and designed to find consistent traders." }
  ];

  return (
    <Layout>
      <div className="pt-24 pb-20 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Built for Serious Traders</h1>
            <p className="text-xl text-muted-foreground">
              Everything you need to succeed in the markets, backed by industry-leading technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="bg-card rounded-2xl p-6 border border-white/10 hover:border-primary/30 transition-colors">
                <div className="mb-4 p-3 bg-primary/10 inline-block rounded-xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Temporary import fix for the icon used above
import { TrendingUp } from "lucide-react";