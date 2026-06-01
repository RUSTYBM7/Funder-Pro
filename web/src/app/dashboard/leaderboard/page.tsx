"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Crown, TrendingUp, TrendingDown, Star } from "lucide-react";

const leaderboard = [
  { rank: 1, name: "Hannah Lee", country: "SG", tier: "Elite", return: 248.4, trades: 1248, winRate: 78, volume: 4250000, badge: "diamond" },
  { rank: 2, name: "Marcus Chen", country: "US", tier: "Pro", return: 196.2, trades: 985, winRate: 72, volume: 3120000, badge: "platinum" },
  { rank: 3, name: "Sofia Rodriguez", country: "ES", tier: "Elite", return: 184.8, trades: 1150, winRate: 69, volume: 2890000, badge: "platinum" },
  { rank: 4, name: "Aisha Patel", country: "IN", tier: "Elite", return: 167.3, trades: 872, winRate: 71, volume: 2640000, badge: "gold" },
  { rank: 5, name: "Ahmed Al-Rashid", country: "AE", tier: "Elite", return: 152.9, trades: 743, winRate: 68, volume: 2180000, badge: "gold" },
  { rank: 6, name: "Yuki Tanaka", country: "JP", tier: "Elite", return: 138.4, trades: 698, winRate: 65, volume: 1950000, badge: "gold" },
  { rank: 7, name: "Olivia Brown", country: "UK", tier: "Pro", return: 124.7, trades: 612, winRate: 64, volume: 1740000, badge: "silver" },
  { rank: 8, name: "Erik Lindqvist", country: "SE", tier: "Pro", return: 118.2, trades: 587, winRate: 62, volume: 1620000, badge: "silver" },
  { rank: 9, name: "Priya Sharma", country: "IN", tier: "Pro", return: 102.5, trades: 524, winRate: 60, volume: 1480000, badge: "silver" },
  { rank: 10, name: "Carlos Mendez", country: "AR", tier: "Pro", return: 96.8, trades: 489, winRate: 58, volume: 1320000, badge: "bronze" },
];

const badgeColors: Record<string, string> = {
  diamond: "from-cyan-400 to-blue-500",
  platinum: "from-slate-300 to-slate-500",
  gold: "from-yellow-400 to-amber-500",
  silver: "from-slate-200 to-slate-400",
  bronze: "from-orange-400 to-orange-600",
};

const medalIcons: Record<number, any> = { 1: Crown, 2: Trophy, 3: Medal };

export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Leaderboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Top traders ranked by 90-day return</p>
      </div>

      <Card className="bg-gradient-to-r from-yellow-500/10 via-primary/10 to-purple-500/10 border-primary/20">
        <CardContent className="p-6 flex items-center gap-6">
          <Trophy className="h-12 w-12 text-yellow-400" />
          <div className="flex-1">
            <p className="text-lg font-bold text-white">Compete for $50,000 in monthly prizes</p>
            <p className="text-sm text-muted-foreground">Top 10 traders share rewards. Resets every 1st of the month.</p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">View Prizes</Button>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="p-0">
          <div className="grid grid-cols-12 gap-2 px-4 py-3 text-xs text-muted-foreground uppercase tracking-wide border-b border-border">
            <div className="col-span-1">Rank</div>
            <div className="col-span-3">Trader</div>
            <div className="col-span-2 text-right">90d Return</div>
            <div className="col-span-1 text-right">Trades</div>
            <div className="col-span-1 text-right">Win Rate</div>
            <div className="col-span-2 text-right">Volume</div>
            <div className="col-span-2 text-right">Badge</div>
          </div>
          {leaderboard.map((trader) => {
            const MedalIcon = medalIcons[trader.rank];
            return (
              <div key={trader.rank} className={`grid grid-cols-12 gap-2 px-4 py-4 items-center border-b border-border/40 hover:bg-secondary/20 ${trader.rank <= 3 ? "bg-primary/5" : ""}`}>
                <div className="col-span-1">
                  {trader.rank <= 3 ? (
                    <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
                      <MedalIcon className={`h-4 w-4 ${trader.rank === 1 ? "text-yellow-400" : trader.rank === 2 ? "text-slate-300" : "text-amber-600"}`} />
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground ml-2">#{trader.rank}</span>
                  )}
                </div>
                <div className="col-span-3">
                  <p className="text-sm font-semibold text-white">{trader.name}</p>
                  <p className="text-xs text-muted-foreground">{trader.country} · {trader.tier}</p>
                </div>
                <div className="col-span-2 text-right">
                  <p className="text-lg font-bold text-primary">+{trader.return}%</p>
                </div>
                <div className="col-span-1 text-right text-sm text-white">{trader.trades}</div>
                <div className="col-span-1 text-right text-sm text-white">{trader.winRate}%</div>
                <div className="col-span-2 text-right text-sm text-muted-foreground">${(trader.volume / 1000000).toFixed(2)}M</div>
                <div className="col-span-2 text-right">
                  <Badge className={`bg-gradient-to-r ${badgeColors[trader.badge]} text-white border-0 uppercase`}>
                    {trader.badge}
                  </Badge>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}