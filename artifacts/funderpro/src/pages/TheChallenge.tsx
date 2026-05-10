import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

export default function TheChallenge() {
  return (
    <Layout>
      <div className="pt-24 pb-16 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">The FunderPro Challenge</h1>
            <p className="text-xl text-muted-foreground">
              A fair, transparent, and unlimited time evaluation process designed to find consistent and disciplined traders.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-20">
            <div className="bg-card rounded-2xl p-8 border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px]" />
              <div className="text-primary font-black text-6xl opacity-20 absolute top-4 right-6">01</div>
              <h3 className="text-2xl font-bold mb-4 relative z-10">Phase 1: Challenge</h3>
              <p className="text-muted-foreground mb-6 relative z-10">
                Prove your trading skills by reaching the profit target while adhering to our risk management rules.
              </p>
              <ul className="space-y-3 relative z-10">
                <li className="flex items-center gap-3"><CheckCircle2 className="text-primary w-5 h-5" /> <span>8% Profit Target</span></li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-primary w-5 h-5" /> <span>5% Max Daily Loss</span></li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-primary w-5 h-5" /> <span>10% Max Total Loss</span></li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-primary w-5 h-5" /> <span>Unlimited Time</span></li>
              </ul>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px]" />
              <div className="text-primary font-black text-6xl opacity-20 absolute top-4 right-6">02</div>
              <h3 className="text-2xl font-bold mb-4 relative z-10">Phase 2: Verification</h3>
              <p className="text-muted-foreground mb-6 relative z-10">
                Demonstrate consistency. We want to see that your Phase 1 results weren't just a streak of luck.
              </p>
              <ul className="space-y-3 relative z-10">
                <li className="flex items-center gap-3"><CheckCircle2 className="text-primary w-5 h-5" /> <span>5% Profit Target</span></li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-primary w-5 h-5" /> <span>5% Max Daily Loss</span></li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-primary w-5 h-5" /> <span>10% Max Total Loss</span></li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-primary w-5 h-5" /> <span>Unlimited Time</span></li>
              </ul>
            </div>
          </div>

          <div className="bg-primary/5 rounded-3xl p-10 text-center max-w-4xl mx-auto border border-primary/20">
            <h3 className="text-3xl font-bold mb-4">Get Funded</h3>
            <p className="text-lg text-muted-foreground mb-8">
              Pass both phases and become a FunderPro Funded Trader. Trade up to $200,000, scale your account up to $2M, and keep up to 90% of your profits.
            </p>
            <Button size="lg" className="text-lg px-10 py-6 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <a href="https://prop.funderpro.com/signup" target="_blank" rel="noreferrer">Start Your Challenge Today</a>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
