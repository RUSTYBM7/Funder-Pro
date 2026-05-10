import { Layout } from "@/components/layout/Layout";
import { Server, Shield, Zap, Activity } from "lucide-react";

export default function PropTradingTechnology() {
  return (
    <Layout>
      <div className="pt-24 pb-20 bg-background">
        <div className="container max-w-5xl">
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Institutional Grade Technology</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our bespoke infrastructure ensures ultra-low latency execution, real-time risk monitoring, and a seamless trading experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
              <div className="bg-card border border-white/10 rounded-2xl p-8 relative z-10">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-muted-foreground">Execution Speed</span>
                    <span className="text-primary font-bold font-mono">&lt; 30ms</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-muted-foreground">Uptime</span>
                    <span className="text-primary font-bold font-mono">99.99%</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-muted-foreground">Data Centers</span>
                    <span className="text-white font-bold">Equinix LD4 / NY4</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Price Feeds</span>
                    <span className="text-white font-bold">Direct Tier-1 LPs</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-6">Direct Market Access</h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                We utilize enterprise-grade bridge technology to connect our trading platforms directly to Tier-1 liquidity providers. This ensures you get raw spreads, deep liquidity, and minimal slippage during normal market conditions.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our servers are co-located in Equinix data centers alongside major banks and financial institutions, guaranteeing ultra-low latency execution.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <div className="bg-card p-8 rounded-2xl border border-white/10">
              <Server className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Scalable Architecture</h3>
              <p className="text-muted-foreground">
                Built on robust cloud infrastructure capable of handling thousands of concurrent trades and millions of price ticks per second without degradation in performance.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-white/10">
              <Activity className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Real-Time Risk Engine</h3>
              <p className="text-muted-foreground">
                Our proprietary risk management system monitors equity, margin, and rule violations in real-time, executing liquidations instantly when parameters are breached to protect firm capital.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-white/10">
              <Zap className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Dashboard Analytics</h3>
              <p className="text-muted-foreground">
                The trader dashboard processes gigabytes of historical trade data instantly to provide you with actionable insights, win-rate analysis, and advanced performance metrics.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-white/10">
              <Shield className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Enterprise Security</h3>
              <p className="text-muted-foreground">
                End-to-end encryption, regular penetration testing, and strict access controls ensure that your personal data and trading activity remain completely secure and confidential.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
