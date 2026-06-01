"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";
import { ArrowUpRight, ArrowDownRight, Wallet, Plus, Minus, ArrowLeftRight, Clock, TrendingUp, ChevronRight, Zap, AlertCircle, CheckCircle2 } from "lucide-react";

const portfolioData = [
  { time: "00:00", value: 24000 },
  { time: "04:00", value: 24200 },
  { time: "08:00", value: 23800 },
  { time: "12:00", value: 24500 },
  { time: "16:00", value: 24300 },
  { time: "20:00", value: 24700 },
  { time: "Now", value: 24847 },
];

const allocationData = [
  { name: "BTC", value: 45, color: "#F7931A" },
  { name: "ETH", value: 25, color: "#627EEA" },
  { name: "SOL", value: 12, color: "#9945FF" },
  { name: "Stables", value: 10, color: "#00E27A" },
  { name: "Other", value: 8, color: "#94A3B8" },
];

const holdings = [
  { symbol: "BTC", name: "Bitcoin", icon: "₿", color: "#F7931A", amount: 0.2541, value: 24016.85, cost: 15754, pnl: 8262.85, pnlPct: 52.4, allocation: 45.2 },
  { symbol: "ETH", name: "Ethereum", icon: "Ξ", color: "#627EEA", amount: 1.82, value: 6227.66, cost: 5096, pnl: 1131.66, pnlPct: 22.2, allocation: 11.7 },
  { symbol: "SOL", name: "Solana", icon: "◎", color: "#9945FF", amount: 12, value: 2380.80, cost: 1680, pnl: 700.80, pnlPct: 41.7, allocation: 4.5 },
  { symbol: "USDC", name: "USD Coin", icon: "$", color: "#2775CA", amount: 1200, value: 1200, cost: 1200, pnl: 0, pnlPct: 0, allocation: 2.3 },
  { symbol: "AVAX", name: "Avalanche", icon: "▲", color: "#E84142", amount: 45, value: 1751.40, cost: 1350, pnl: 401.40, pnlPct: 29.7, allocation: 3.3 },
  { symbol: "LINK", name: "Chainlink", icon: "⬡", color: "#2A5ADA", amount: 80, value: 1497.60, cost: 1200, pnl: 297.60, pnlPct: 24.8, allocation: 2.8 },
];

const transactions = [
  { id: 1, type: "buy", asset: "BTC", amount: 0.025, value: 2362.81, price: 94512.40, time: "2 min ago", status: "completed" },
  { id: 2, type: "receive", asset: "ETH", amount: 0.5, value: 1710.90, price: 3421.80, time: "1 hour ago", status: "completed" },
  { id: 3, type: "sell", asset: "SOL", amount: 2, value: 396.80, price: 198.40, time: "3 hours ago", status: "completed" },
  { id: 4, type: "buy", asset: "AVAX", amount: 5, value: 194.60, price: 38.92, time: "5 hours ago", status: "pending" },
  { id: 5, type: "send", asset: "ETH", amount: 0.1, value: 342.18, price: 3421.80, time: "Yesterday", status: "completed" },
];

export default function PortfolioPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Portfolio</h1>
        <p className="text-muted-foreground text-sm mt-1">Track your holdings, performance and allocation</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="bg-card border-border lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Balance</p>
                <h2 className="text-4xl font-bold text-white mt-2">$24,847.32</h2>
                <div className="flex items-center gap-3 mt-2">
                  <Badge className="bg-primary/15 text-primary border-primary/30">
                    <ArrowUpRight className="h-3 w-3 mr-1" /> +$412.18 (+1.68%)
                  </Badge>
                  <span className="text-xs text-muted-foreground">24h change</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-1" /> Buy
                </Button>
                <Button size="sm" variant="outline" className="border-border">
                  <Minus className="h-4 w-4 mr-1" /> Sell
                </Button>
                <Button size="sm" variant="outline" className="border-border">
                  <ArrowLeftRight className="h-4 w-4 mr-1" /> Swap
                </Button>
              </div>
            </div>
            <div className="h-[240px] -ml-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={portfolioData}>
                  <defs>
                    <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00E27A" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#00E27A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="time" stroke="#94A3B8" tick={{ fill: "#94A3B8", fontSize: 11 }} />
                  <YAxis stroke="#94A3B8" tick={{ fill: "#94A3B8", fontSize: 11 }} domain={["dataMin - 200", "dataMax + 200"]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0D1525", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", color: "#fff" }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#00E27A" strokeWidth={2} fill="url(#portfolioGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-white text-base">Allocation</CardTitle>
            <CardDescription className="text-muted-foreground text-xs">By asset</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {allocationData.map((item) => (
                <div key={item.name}>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-white font-medium">{item.name}</span>
                    </div>
                    <span className="text-muted-foreground">{item.value}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary/50 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Holdings</span>
                <span className="text-white font-semibold">6 assets</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-muted-foreground">24h Best</span>
                <span className="text-primary font-semibold">DOGE +8.4%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="holdings" className="w-full">
        <TabsList className="bg-card border border-border">
          <TabsTrigger value="holdings">Holdings</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="holdings" className="mt-4">
          <Card className="bg-card border-border">
            <CardContent className="p-0">
              <div className="grid grid-cols-12 gap-3 px-4 py-3 text-xs text-muted-foreground uppercase tracking-wide border-b border-border">
                <div className="col-span-4">Asset</div>
                <div className="col-span-2 text-right">Balance</div>
                <div className="col-span-2 text-right">Value</div>
                <div className="col-span-2 text-right">P&L</div>
                <div className="col-span-2 text-right">Allocation</div>
              </div>
              {holdings.map((h) => (
                <div key={h.symbol} className="grid grid-cols-12 gap-3 px-4 py-4 items-center border-b border-border/40 hover:bg-secondary/20">
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: h.color + "33", border: `1px solid ${h.color}66` }}>
                      {h.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{h.symbol}</p>
                      <p className="text-xs text-muted-foreground">{h.name}</p>
                    </div>
                  </div>
                  <div className="col-span-2 text-right">
                    <p className="text-sm text-white">{h.amount.toLocaleString("en-US", { maximumFractionDigits: 4 })} {h.symbol}</p>
                  </div>
                  <div className="col-span-2 text-right">
                    <p className="text-sm font-semibold text-white">${h.value.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
                  </div>
                  <div className="col-span-2 text-right">
                    <p className={`text-sm font-semibold ${h.pnl >= 0 ? "text-primary" : "text-red-400"}`}>
                      {h.pnl >= 0 ? "+" : ""}${Math.abs(h.pnl).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </p>
                    <p className={`text-xs ${h.pnlPct >= 0 ? "text-primary" : "text-red-400"}`}>
                      {h.pnlPct >= 0 ? "+" : ""}{h.pnlPct}%
                    </p>
                  </div>
                  <div className="col-span-2 text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <div className="w-16 h-1.5 rounded-full bg-secondary/50 overflow-hidden">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${h.allocation * 2}%` }} />
                      </div>
                      <span className="text-xs text-white w-10">{h.allocation}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="mt-4">
          <Card className="bg-card border-border">
            <CardContent className="p-0">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between px-4 py-4 border-b border-border/40 hover:bg-secondary/20">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                      tx.type === "buy" ? "bg-primary/20 text-primary" :
                      tx.type === "sell" ? "bg-red-500/20 text-red-400" :
                      tx.type === "receive" ? "bg-blue-500/20 text-blue-400" :
                      "bg-yellow-500/20 text-yellow-400"
                    }`}>
                      {tx.type === "buy" && <ArrowDownRight className="h-4 w-4" />}
                      {tx.type === "sell" && <ArrowUpRight className="h-4 w-4" />}
                      {tx.type === "receive" && <Plus className="h-4 w-4" />}
                      {tx.type === "send" && <Minus className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white capitalize">{tx.type} {tx.asset}</p>
                      <p className="text-xs text-muted-foreground">{tx.amount} {tx.asset} @ ${tx.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">${tx.value.toLocaleString()}</p>
                    <div className="flex items-center gap-2 justify-end mt-0.5">
                      {tx.status === "completed" ? (
                        <CheckCircle2 className="h-3 w-3 text-primary" />
                      ) : (
                        <Clock className="h-3 w-3 text-yellow-400" />
                      )}
                      <p className="text-xs text-muted-foreground">{tx.time} · {tx.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="mt-4">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-3 mb-6">
                <div className="p-4 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground uppercase">Total Return</p>
                  <p className="text-2xl font-bold text-primary mt-2">+34.8%</p>
                  <p className="text-xs text-muted-foreground mt-1">All-time</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground uppercase">Realized P&L</p>
                  <p className="text-2xl font-bold text-primary mt-2">+$8,242</p>
                  <p className="text-xs text-muted-foreground mt-1">This year</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground uppercase">Win Rate</p>
                  <p className="text-2xl font-bold text-white mt-2">68.2%</p>
                  <p className="text-xs text-muted-foreground mt-1">Last 30 trades</p>
                </div>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { month: "Jan", pnl: 820 },
                    { month: "Feb", pnl: 1240 },
                    { month: "Mar", pnl: -340 },
                    { month: "Apr", pnl: 1680 },
                    { month: "May", pnl: 2120 },
                    { month: "Jun", pnl: 2722 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" stroke="#94A3B8" tick={{ fill: "#94A3B8", fontSize: 12 }} />
                    <YAxis stroke="#94A3B8" tick={{ fill: "#94A3B8", fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: "#0D1525", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", color: "#fff" }} />
                    <Bar dataKey="pnl" radius={[4, 4, 0, 0]}>
                      {[820, 1240, -340, 1680, 2120, 2722].map((v, i) => (
                        <Cell key={i} fill={v >= 0 ? "#00E27A" : "#F75555"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}