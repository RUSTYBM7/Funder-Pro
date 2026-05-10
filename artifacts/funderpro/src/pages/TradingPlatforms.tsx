import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Monitor, Smartphone } from "lucide-react";

export default function TradingPlatforms() {
  return (
    <Layout>
      <div className="pt-24 pb-20 bg-background">
        <div className="container max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">World-Class Trading Platforms</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Execute your strategy with precision on the industry's leading platforms, available on desktop, web, and mobile.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {/* MT4 */}
            <div className="bg-card rounded-2xl border border-white/10 p-8 flex flex-col hover:border-primary/50 transition-colors duration-300">
              <div className="h-16 mb-8 flex items-center">
                <span className="text-2xl font-bold font-serif italic text-white/90 tracking-widest">MetaTrader 4</span>
              </div>
              <p className="text-muted-foreground mb-6 flex-1">
                The world's most popular trading platform. Renowned for its reliability, extensive charting capabilities, and custom indicator support.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> 30 built-in indicators</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Expert Advisor (EA) support</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> 9 timeframes</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> One-click trading</li>
              </ul>
              <div className="flex gap-4 mb-6 text-muted-foreground">
                <Monitor className="w-6 h-6 hover:text-white transition-colors cursor-pointer" />
                <Smartphone className="w-6 h-6 hover:text-white transition-colors cursor-pointer" />
              </div>
              <Button variant="outline" className="w-full">Select Platform</Button>
            </div>

            {/* MT5 */}
            <div className="bg-card rounded-2xl border border-primary/30 p-8 flex flex-col relative shadow-[0_0_30px_rgba(0,226,122,0.1)]">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-2xl uppercase tracking-wider">Most Popular</div>
              <div className="h-16 mb-8 flex items-center">
                <span className="text-2xl font-bold font-serif italic text-white tracking-widest">MetaTrader 5</span>
              </div>
              <p className="text-muted-foreground mb-6 flex-1">
                The powerful successor to MT4. Features advanced financial trading functions, superior tools for comprehensive price analysis, and algorithmic trading.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> 38 built-in indicators</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Multi-currency Strategy Tester</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> 21 timeframes</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Economic Calendar built-in</li>
              </ul>
              <div className="flex gap-4 mb-6 text-muted-foreground">
                <Monitor className="w-6 h-6 hover:text-white transition-colors cursor-pointer" />
                <Smartphone className="w-6 h-6 hover:text-white transition-colors cursor-pointer" />
              </div>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold">Select Platform</Button>
            </div>

            {/* cTrader */}
            <div className="bg-card rounded-2xl border border-white/10 p-8 flex flex-col hover:border-primary/50 transition-colors duration-300">
              <div className="h-16 mb-8 flex items-center">
                <span className="text-2xl font-bold text-white tracking-tight">cTrader</span>
              </div>
              <p className="text-muted-foreground mb-6 flex-1">
                A premium trading platform catering to professional traders. Offers advanced order types, level II pricing, and ultra-fast execution.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Advanced DoM (Depth of Market)</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Quick Trade functionality</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> 54 timeframes</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Native copy trading built-in</li>
              </ul>
              <div className="flex gap-4 mb-6 text-muted-foreground">
                <Monitor className="w-6 h-6 hover:text-white transition-colors cursor-pointer" />
                <Smartphone className="w-6 h-6 hover:text-white transition-colors cursor-pointer" />
              </div>
              <Button variant="outline" className="w-full">Select Platform</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
