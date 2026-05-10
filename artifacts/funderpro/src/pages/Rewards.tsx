import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Award, Zap, TrendingUp, Trophy } from "lucide-react";

export default function Rewards() {
  return (
    <Layout>
      <div className="pt-24 pb-20 bg-background">
        <div className="container max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Daily Rewards Program</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We believe in rewarding consistency. Trade profitably and unlock bonuses on top of your standard profit splits.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-card rounded-2xl p-8 border border-white/10">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Streak System</h3>
              <p className="text-muted-foreground mb-6">
                Trade for consecutive profitable days to build your streak. Each milestone unlocks new perks, reduced commissions, and direct cash bonuses deposited straight to your account.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="font-medium text-white">5 Day Streak</span>
                  <span className="text-primary font-bold">+$100 Bonus</span>
                </li>
                <li className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="font-medium text-white">10 Day Streak</span>
                  <span className="text-primary font-bold">+$250 Bonus</span>
                </li>
                <li className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="font-medium text-white">30 Day Streak</span>
                  <span className="text-primary font-bold">+$1,000 Bonus</span>
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-white/10">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Scaling Plan</h3>
              <p className="text-muted-foreground mb-6">
                If you consistently hit your targets, we will increase your funded capital by 50% every 4 months, up to a maximum of $2,000,000.
              </p>
              <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl relative overflow-hidden">
                <h4 className="font-bold text-lg text-white mb-2">Requirements to Scale:</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                  <li>Generate 10% profit over 4 months</li>
                  <li>At least 2 out of 4 months must be profitable</li>
                  <li>Process your first payout successfully</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-card to-background rounded-2xl border border-white/10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold mb-4">Refer & Earn</h2>
              <p className="text-muted-foreground">
                Know other talented traders? Invite them to FunderPro and earn a 10-15% commission on their challenge purchases. The more you refer, the higher your tier.
              </p>
            </div>
            <Button size="lg" className="bg-primary text-primary-foreground font-bold hover:bg-primary/90 text-lg px-8 py-6 rounded-xl w-full md:w-auto" asChild>
              <a href="/become-a-funderpro-affiliate">Join Affiliate Program</a>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
