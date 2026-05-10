import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Users, DollarSign, TrendingUp, Link as LinkIcon, Gift } from "lucide-react";

export default function Affiliates() {
  return (
    <Layout>
      <div className="pt-24 pb-20 bg-background">
        <div className="container max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">FunderPro Affiliate Program</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Partner with the industry's fastest-growing prop firm. Earn up to 15% commission on every referral.
            </p>
            <div className="mt-8">
              <Button size="lg" className="bg-primary text-primary-foreground font-bold hover:bg-primary/90 text-lg px-8 py-6 rounded-xl">
                Become an Affiliate
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-card rounded-2xl p-8 border border-white/10 text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <LinkIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Join & Share</h3>
              <p className="text-muted-foreground">Sign up for free and get your unique tracking link to share with your audience.</p>
            </div>
            
            <div className="bg-card rounded-2xl p-8 border border-white/10 text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. They Purchase</h3>
              <p className="text-muted-foreground">Traders click your link and purchase a FunderPro challenge.</p>
            </div>
            
            <div className="bg-card rounded-2xl p-8 border border-white/10 text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. You Earn</h3>
              <p className="text-muted-foreground">Get paid up to 15% commission for every successful purchase.</p>
            </div>
          </div>

          <div className="bg-card rounded-3xl border border-white/10 p-8 md:p-12 mb-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
            <h2 className="text-3xl font-bold mb-8 relative z-10">Commission Structure</h2>
            <div className="grid md:grid-cols-2 gap-8 relative z-10">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-background rounded-xl border border-white/5">
                  <div>
                    <div className="font-bold text-lg text-white">Tier 1: Starter</div>
                    <div className="text-sm text-muted-foreground">0 - 50 Referrals</div>
                  </div>
                  <div className="text-2xl font-black text-primary">10%</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-background rounded-xl border border-white/5">
                  <div>
                    <div className="font-bold text-lg text-white">Tier 2: Advanced</div>
                    <div className="text-sm text-muted-foreground">51 - 200 Referrals</div>
                  </div>
                  <div className="text-2xl font-black text-primary">12.5%</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-primary/10 rounded-xl border border-primary/30">
                  <div>
                    <div className="font-bold text-lg text-white">Tier 3: Pro Partner</div>
                    <div className="text-sm text-muted-foreground">200+ Referrals</div>
                  </div>
                  <div className="text-2xl font-black text-primary">15%</div>
                </div>
              </div>
              
              <div className="flex flex-col justify-center">
                <h3 className="text-xl font-bold mb-4">Why Partner With Us?</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-2"><Gift className="w-5 h-5 text-primary" /> High conversion rates</li>
                  <li className="flex items-center gap-2"><Gift className="w-5 h-5 text-primary" /> Monthly payouts via Crypto or Wire</li>
                  <li className="flex items-center gap-2"><Gift className="w-5 h-5 text-primary" /> Dedicated affiliate manager</li>
                  <li className="flex items-center gap-2"><Gift className="w-5 h-5 text-primary" /> Custom promo codes for your audience</li>
                  <li className="flex items-center gap-2"><Gift className="w-5 h-5 text-primary" /> Advanced tracking dashboard</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
