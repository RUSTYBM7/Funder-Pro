import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Calculator, Calendar, BookOpen, LineChart } from "lucide-react";
import { Link } from "wouter";

export default function ToolsForTraders() {
  return (
    <Layout>
      <div className="pt-24 pb-20 bg-background">
        <div className="container max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Tools for Traders</h1>
            <p className="text-xl text-muted-foreground">
              Enhance your trading edge with our suite of professional analytical tools and calculators.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card p-8 rounded-2xl border border-white/10 hover:border-primary/30 transition-colors group">
              <Calendar className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-3">Economic Calendar</h3>
              <p className="text-muted-foreground mb-6">Stay ahead of the markets. Track key economic events, news releases, and indicators that could impact your trades.</p>
              <Button variant="outline" asChild>
                <Link href="/economic-calendar">View Calendar</Link>
              </Button>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-white/10 hover:border-primary/30 transition-colors group">
              <Calculator className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-3">Position Size Calculator</h3>
              <p className="text-muted-foreground mb-6">Manage your risk perfectly. Calculate the exact lot size for your trades based on your account equity and risk percentage.</p>
              <Button variant="outline" disabled className="opacity-50">Coming Soon</Button>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-white/10 hover:border-primary/30 transition-colors group">
              <BookOpen className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-3">Trading Journal</h3>
              <p className="text-muted-foreground mb-6">Built right into your dashboard. Log your trades, tag strategies, and analyze your performance to find your edge.</p>
              <Button variant="outline" disabled className="opacity-50">Available in Dashboard</Button>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-white/10 hover:border-primary/30 transition-colors group">
              <LineChart className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-3">Market Analysis</h3>
              <p className="text-muted-foreground mb-6">Daily technical and fundamental analysis from our in-house experts. Get insights on major pairs, indices, and commodities.</p>
              <Button variant="outline" asChild>
                <Link href="/blog">Read Analysis</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
