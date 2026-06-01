"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Clock, DollarSign, CheckCircle2, XCircle, AlertCircle, Target, TrendingUp } from "lucide-react";

const challenges = [
  { id: 1, user: "Marcus Chen", type: "1-Phase", size: "$100K", progress: 78, status: "active", profit: "$5,240", target: "$8,000", daysLeft: 8, started: "2026-01-15" },
  { id: 2, user: "Sofia Rodriguez", type: "2-Phase", size: "$200K", progress: 100, status: "passed", profit: "$0", target: "$16,000", daysLeft: 0, started: "2026-01-10" },
  { id: 3, user: "Aisha Patel", type: "Instant", size: "$50K", progress: 45, status: "active", profit: "$3,180", target: "—", daysLeft: 0, started: "2026-01-22" },
  { id: 4, user: "James Wright", type: "1-Phase", size: "$25K", progress: 38, status: "failed", profit: "-$2,140", target: "$2,000", daysLeft: 0, started: "2026-01-08" },
  { id: 5, user: "Erik Lindqvist", type: "2-Phase", size: "$100K", progress: 92, status: "active", profit: "$7,820", target: "$8,000", daysLeft: 4, started: "2026-01-18" },
  { id: 6, user: "Priya Sharma", type: "1-Phase", size: "$50K", progress: 65, status: "active", profit: "$2,950", target: "$4,000", daysLeft: 12, started: "2026-01-20" },
  { id: 7, user: "Yuki Tanaka", type: "Instant", size: "$200K", progress: 28, status: "active", profit: "$11,420", target: "—", daysLeft: 0, started: "2026-01-25" },
];

const statusColors: Record<string, string> = {
  active: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  passed: "bg-primary/15 text-primary border-primary/30",
  failed: "bg-red-500/15 text-red-400 border-red-500/30",
  pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
};

export default function ChallengesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Trading Challenges</h1>
        <p className="text-muted-foreground text-sm mt-1">Monitor active and completed funding challenges</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Active Challenges", value: "1,247", icon: Target, color: "text-blue-400" },
          { label: "Pass Rate (30d)", value: "34.2%", icon: TrendingUp, color: "text-primary" },
          { label: "Total Funded", value: "$48.2M", icon: DollarSign, color: "text-primary" },
          { label: "Pending Review", value: "23", icon: Clock, color: "text-yellow-400" },
        ].map((s) => (
          <Card key={s.label} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{s.label}</p>
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </div>
              <p className={`text-2xl font-bold mt-2 ${s.color}`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-white">All Challenges</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-12 gap-2 px-4 py-3 text-xs text-muted-foreground uppercase tracking-wide border-b border-border">
            <div className="col-span-2">Trader</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-1">Size</div>
            <div className="col-span-3">Progress</div>
            <div className="col-span-1 text-right">Profit</div>
            <div className="col-span-1 text-right">Days Left</div>
            <div className="col-span-2 text-right">Status</div>
          </div>
          {challenges.map((c) => (
            <div key={c.id} className="grid grid-cols-12 gap-2 px-4 py-4 items-center border-b border-border/40 hover:bg-secondary/20">
              <div className="col-span-2 text-sm text-white font-medium">{c.user}</div>
              <div className="col-span-2 text-sm text-muted-foreground">{c.type}</div>
              <div className="col-span-1 text-sm text-white font-semibold">{c.size}</div>
              <div className="col-span-3">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-secondary/50 overflow-hidden">
                    <div className={`h-full rounded-full ${c.progress >= 100 ? "bg-primary" : "bg-blue-400"}`} style={{ width: `${Math.min(c.progress, 100)}%` }} />
                  </div>
                  <span className="text-xs text-white w-9">{c.progress}%</span>
                </div>
              </div>
              <div className={`col-span-1 text-right text-sm font-semibold ${c.profit.startsWith("-") ? "text-red-400" : "text-primary"}`}>{c.profit}</div>
              <div className="col-span-1 text-right text-sm text-white">{c.daysLeft}d</div>
              <div className="col-span-2 text-right">
                <Badge className={statusColors[c.status]} variant="outline">
                  {c.status === "passed" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                  {c.status === "failed" && <XCircle className="h-3 w-3 mr-1" />}
                  {c.status === "active" && <Target className="h-3 w-3 mr-1" />}
                  {c.status}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}