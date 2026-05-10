import { Layout } from "@/components/layout/Layout";
import { Users, Globe, Target, Shield, CheckCircle2 } from "lucide-react";

export default function AboutUs() {
  return (
    <Layout>
      <div className="pt-24 pb-20 bg-background">
        <div className="container max-w-5xl">
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About FunderPro</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We are a team of traders, technologists, and financial experts on a mission to democratize access to institutional trading capital.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-24">
            <div className="bg-card rounded-2xl p-8 border border-white/10 text-center">
              <div className="text-5xl font-black text-primary mb-2">10,000+</div>
              <div className="text-muted-foreground font-medium uppercase tracking-wider text-sm">Funded Traders</div>
            </div>
            <div className="bg-card rounded-2xl p-8 border border-white/10 text-center">
              <div className="text-5xl font-black text-primary mb-2">$50M+</div>
              <div className="text-muted-foreground font-medium uppercase tracking-wider text-sm">Total Payouts</div>
            </div>
            <div className="bg-card rounded-2xl p-8 border border-white/10 text-center">
              <div className="text-5xl font-black text-primary mb-2">150+</div>
              <div className="text-muted-foreground font-medium uppercase tracking-wider text-sm">Countries Supported</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  FunderPro was founded by a group of experienced traders who were frustrated by the limitations of traditional prop firms. We saw an industry plagued by hidden rules, unfair time limits, and clunky technology.
                </p>
                <p>
                  We decided to build the firm we wished existed when we started trading. A firm that actually wants its traders to succeed.
                </p>
                <p>
                  Today, we provide talented individuals worldwide with the capital they need to turn trading from a hobby into a profession, backed by an institutional-grade technology stack.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-card to-background border border-white/10 relative z-10 flex items-center justify-center overflow-hidden">
                <Globe className="w-32 h-32 text-primary opacity-50" />
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-10 text-center">Our Core Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card p-8 rounded-2xl border border-white/10">
                <Target className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Transparency First</h3>
                <p className="text-muted-foreground">No hidden rules. No tricky clauses. What you see is exactly what you get. We believe in building trust through complete honesty.</p>
              </div>
              <div className="bg-card p-8 rounded-2xl border border-white/10">
                <Users className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Trader-Centric</h3>
                <p className="text-muted-foreground">Every decision we make, from pricing to platform features, is designed to give you the best possible chance of success.</p>
              </div>
              <div className="bg-card p-8 rounded-2xl border border-white/10">
                <Shield className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Technological Excellence</h3>
                <p className="text-muted-foreground">We invest heavily in our infrastructure to ensure zero-latency execution, real-time analytics, and a seamless user experience.</p>
              </div>
              <div className="bg-card p-8 rounded-2xl border border-white/10">
                <CheckCircle2 className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Fair Opportunity</h3>
                <p className="text-muted-foreground">We don't care where you're from or what your background is. If you can trade profitably while managing risk, you have a place here.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
