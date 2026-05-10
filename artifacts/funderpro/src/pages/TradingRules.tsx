import { Layout } from "@/components/layout/Layout";

export default function TradingRules() {
  return (
    <Layout>
      <div className="pt-24 pb-20 bg-background">
        <div className="container max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Trading Rules</h1>
          <p className="text-xl text-muted-foreground text-center mb-16">
            Clear, transparent, and fair. No hidden tricks.
          </p>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm border border-primary/30">1</div>
                Drawdown Rules
              </h2>
              <div className="bg-card rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-6 border-b border-white/10">
                  <h3 className="text-xl font-bold mb-2">5% Maximum Daily Loss</h3>
                  <p className="text-muted-foreground">Your account equity or balance cannot drop below 95% of your initial daily balance.</p>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">10% Maximum Total Loss</h3>
                  <p className="text-muted-foreground">Your account equity or balance cannot drop below 90% of your initial account size at any time.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm border border-primary/30">2</div>
                Trading Restrictions
              </h2>
              <div className="bg-card rounded-2xl border border-white/10 overflow-hidden divide-y divide-white/10">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-red-400">News Trading</h3>
                  <p className="text-muted-foreground">Executing new trades 2 minutes before or after high-impact news releases is prohibited on funded accounts.</p>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-red-400">Weekend Holding</h3>
                  <p className="text-muted-foreground">Trades can be held overnight, but holding over the weekend is not allowed. All trades must be closed by Friday market close.</p>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-red-400">Prohibited Strategies</h3>
                  <p className="text-muted-foreground">Martingale, grid trading, high-frequency trading (HFT), and arbitrage strategies are strictly forbidden.</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
