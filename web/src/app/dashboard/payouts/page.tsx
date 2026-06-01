"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, DollarSign, Download, ArrowUpRight, TrendingUp, Calendar, Building2, CreditCard } from "lucide-react";

const payouts = [
  { id: 1, user: "Sofia Rodriguez", amount: 8420, fee: 84, net: 8336, method: "Wire Transfer", status: "completed", date: "2026-01-28", country: "ES" },
  { id: 2, user: "Marcus Chen", amount: 12480, fee: 0, net: 12480, method: "USDT (TRC-20)", status: "processing", date: "2026-01-30", country: "US" },
  { id: 3, user: "Hannah Lee", amount: 24100, fee: 241, net: 23859, method: "Bank Transfer", status: "completed", date: "2026-01-27", country: "SG" },
  { id: 4, user: "Aisha Patel", amount: 6200, fee: 0, net: 6200, method: "USDC (ERC-20)", status: "completed", date: "2026-01-26", country: "IN" },
  { id: 5, user: "Yuki Tanaka", amount: 9420, fee: 0, net: 9420, method: "BTC", status: "pending", date: "2026-01-31", country: "JP" },
  { id: 6, user: "Olivia Brown", amount: 4180, fee: 41, net: 4139, method: "Bank Transfer", status: "completed", date: "2026-01-25", country: "UK" },
  { id: 7, user: "Ahmed Al-Rashid", amount: 14820, fee: 0, net: 14820, method: "USDT (ERC-20)", status: "processing", date: "2026-01-30", country: "AE" },
];

const statusColors: Record<string, string> = {
  completed: "bg-primary/15 text-primary border-primary/30",
  processing: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  failed: "bg-red-500/15 text-red-400 border-red-500/30",
};

const methodIcons: Record<string, any> = {
  "Wire Transfer": Building2,
  "Bank Transfer": Building2,
  "USDT (TRC-20)": DollarSign,
  "USDT (ERC-20)": DollarSign,
  "USDC (ERC-20)": DollarSign,
  "BTC": TrendingUp,
};

export default function PayoutsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Payouts</h1>
        <p className="text-muted-foreground text-sm mt-1">Track withdrawals and reward distributions</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Total Paid (30d)", value: "$1.24M", color: "text-primary", icon: ArrowUpRight },
          { label: "Pending", value: "$248,420", color: "text-yellow-400", icon: Clock },
          { label: "Avg. Processing", value: "4.2h", color: "text-blue-400", icon: TrendingUp },
          { label: "Total Payees", value: "847", color: "text-white", icon: DollarSign },
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
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Recent Payouts</CardTitle>
            <Button variant="outline" size="sm" className="border-border">
              <Download className="h-4 w-4 mr-2" /> Export
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-12 gap-2 px-4 py-3 text-xs text-muted-foreground uppercase tracking-wide border-b border-border">
            <div className="col-span-3">Trader</div>
            <div className="col-span-2">Method</div>
            <div className="col-span-2 text-right">Amount</div>
            <div className="col-span-1 text-right">Fee</div>
            <div className="col-span-2 text-right">Net</div>
            <div className="col-span-2 text-right">Status / Date</div>
          </div>
          {payouts.map((p) => {
            const MethodIcon = methodIcons[p.method] || DollarSign;
            return (
              <div key={p.id} className="grid grid-cols-12 gap-2 px-4 py-4 items-center border-b border-border/40 hover:bg-secondary/20">
                <div className="col-span-3">
                  <p className="text-sm font-medium text-white">{p.user}</p>
                  <p className="text-xs text-muted-foreground">{p.country}</p>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <MethodIcon className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{p.method}</span>
                </div>
                <div className="col-span-2 text-right text-sm text-white font-mono">${p.amount.toLocaleString()}</div>
                <div className="col-span-1 text-right text-xs text-muted-foreground">${p.fee}</div>
                <div className="col-span-2 text-right text-sm text-primary font-semibold">${p.net.toLocaleString()}</div>
                <div className="col-span-2 text-right">
                  <Badge className={statusColors[p.status]} variant="outline">{p.status}</Badge>
                  <p className="text-xs text-muted-foreground mt-1">{p.date}</p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}