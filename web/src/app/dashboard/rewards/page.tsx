"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Gift, Trophy, Star, Zap, Award, Crown, Target, TrendingUp, Sparkles } from "lucide-react";

const tiers = [
  { name: "Bronze", min: 0, color: "from-orange-700 to-orange-900", perks: ["1% cashback", "Standard support"] },
  { name: "Silver", min: 5000, color: "from-slate-400 to-slate-600", perks: ["2% cashback", "Priority support", "Free withdrawals"] },
  { name: "Gold", min: 25000, color: "from-yellow-500 to-amber-700", perks: ["3% cashback", "VIP support", "Lower fees"] },
  { name: "Platinum", min: 100000, color: "from-slate-300 to-slate-500", perks: ["5% cashback", "Dedicated manager", "Zero fees"] },
  { name: "Diamond", min: 500000, color: "from-cyan-400 to-blue-600", perks: ["8% cashback", "Concierge", "Profit boosts"] },
];

const rewards = [
  { id: 1, title: "Welcome Bonus", desc: "Complete KYC to unlock", reward: "$50", progress: 75, total: 4, completed: 3, type: "task" },
  { id: 2, title: "First Trade", desc: "Execute your first trade", reward: "$25", progress: 100, total: 1, completed: 1, type: "achievement" },
  { id: 3, title: "Volume Milestone", desc: "Trade $100K this month", reward: "$500", progress: 62, total: 100000, completed: 62000, type: "milestone" },
  { id: 4, title: "Refer a Friend", desc: "Get 3 friends to sign up", reward: "$300", progress: 33, total: 3, completed: 1, type: "task" },
];

export default function RewardsPage() {
  const totalEarned = 1240;
  const currentTier = tiers[2];
  const nextTier = tiers[3];
  const progressToNext = 38;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Rewards</h1>
        <p className="text-muted-foreground text-sm mt-1">Earn bonuses, cashback and exclusive perks</p>
      </div>

      <Card className={`bg-gradient-to-br ${currentTier.color} border-0`}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <Badge className="bg-white/20 text-white border-white/30 mb-2">
                <Crown className="h-3 w-3 mr-1" /> {currentTier.name} Member
              </Badge>
              <h2 className="text-3xl font-bold text-white mt-2">${totalEarned.toLocaleString()}</h2>
              <p className="text-sm text-white/70 mt-1">Total lifetime earnings</p>
            </div>
            <Gift className="h-16 w-16 text-white/20" />
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs text-white/80 mb-1.5">
              <span>Progress to {nextTier.name}</span>
              <span>${totalEarned.toLocaleString()} / ${nextTier.min.toLocaleString()}</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: `${progressToNext}%` }} />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-5">
        {tiers.map((t) => (
          <Card key={t.name} className={`bg-card border-border ${t.name === currentTier.name ? "border-primary" : ""}`}>
            <CardContent className="p-4">
              <Badge className={`bg-gradient-to-r ${t.color} text-white border-0`}>{t.name}</Badge>
              <p className="text-lg font-bold text-white mt-2">${t.min.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Min volume</p>
              <ul className="mt-3 space-y-1">
                {t.perks.map((p) => (
                  <li key={p} className="text-xs text-muted-foreground flex items-start gap-1">
                    <Sparkles className="h-3 w-3 text-primary mt-0.5" /> {p}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-white">Active Challenges</CardTitle>
          <CardDescription className="text-muted-foreground">Complete tasks to earn rewards</CardDescription>
        </CardHeader>
        <CardContent>
          {rewards.map((r) => (
            <div key={r.id} className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30 border border-border mb-2">
              <div className="w-12 h-12 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
                {r.type === "achievement" ? <Trophy className="h-6 w-6" /> : r.type === "task" ? <Target className="h-6 w-6" /> : <TrendingUp className="h-6 w-6" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{r.title}</p>
                <p className="text-xs text-muted-foreground">{r.desc}</p>
                {r.progress < 100 && (
                  <div className="mt-2">
                    <Progress value={r.progress} className="h-1.5" />
                  </div>
                )}
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{r.reward}</p>
                {r.progress === 100 ? (
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 mt-1">
                    <Zap className="h-3.5 w-3.5 mr-1" /> Claim
                  </Button>
                ) : (
                  <p className="text-xs text-muted-foreground mt-1">{r.progress}% complete</p>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}