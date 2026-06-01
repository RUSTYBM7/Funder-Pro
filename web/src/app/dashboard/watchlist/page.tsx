"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, TrendingUp, TrendingDown, Bell, BellOff, Plus } from "lucide-react";

const watchlist = [
  { symbol: "ETH", name: "Ethereum", icon: "Ξ", color: "#627EEA", price: 3421.80, change: 1.82, alert: true, note: "Resistance at $3,500" },
  { symbol: "SOL", name: "Solana", icon: "◎", color: "#9945FF", price: 198.40, change: 4.21, alert: true, note: "Breakout candidate" },
  { symbol: "AVAX", name: "Avalanche", icon: "▲", color: "#E84142", price: 38.92, change: 5.61, alert: false, note: "" },
  { symbol: "LINK", name: "Chainlink", icon: "⬡", color: "#2A5ADA", price: 18.72, change: 3.40, alert: true, note: "Strong support at $17" },
  { symbol: "MATIC", name: "Polygon", icon: "M", color: "#8247E5", price: 0.482, change: -0.92, alert: false, note: "" },
  { symbol: "DOGE", name: "Dogecoin", icon: "Ð", color: "#C2A633", price: 0.385, change: 8.42, alert: true, note: "Trending on socials" },
  { symbol: "ADA", name: "Cardano", icon: "₳", color: "#0033AD", price: 0.784, change: -1.42, alert: false, note: "" },
  { symbol: "DOT", name: "Polkadot", icon: "●", color: "#E6007A", price: 7.84, change: -2.10, alert: false, note: "" },
];

export default function WatchlistPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Watchlist</h1>
          <p className="text-muted-foreground text-sm mt-1">Track your favorite assets and price alerts</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" /> Add Asset
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Tracked Assets", value: "8", color: "text-white" },
          { label: "Active Alerts", value: "4", color: "text-primary" },
          { label: "Best Performer", value: "DOGE", color: "text-primary" },
        ].map((s) => (
          <Card key={s.label} className="bg-card border-border">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{s.label}</p>
              <p className={`text-2xl font-bold mt-2 ${s.color}`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {watchlist.map((w) => (
          <Card key={w.symbol} className="bg-card border-border hover:border-primary/30 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: w.color + "33", border: `1px solid ${w.color}66` }}>
                    {w.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-white">{w.symbol}/USDT</p>
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    </div>
                    <p className="text-xs text-muted-foreground">{w.name}</p>
                  </div>
                </div>
                <button className="text-muted-foreground hover:text-primary">
                  {w.alert ? <Bell className="h-4 w-4 text-primary fill-primary/20" /> : <BellOff className="h-4 w-4" />}
                </button>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold text-white">${w.price.toLocaleString("en-US", { minimumFractionDigits: w.price < 1 ? 4 : 2 })}</p>
                  <Badge className={w.change >= 0 ? "bg-primary/15 text-primary border-primary/30 mt-1" : "bg-red-500/15 text-red-400 border-red-500/30 mt-1"} variant="outline">
                    {w.change >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                    {w.change >= 0 ? "+" : ""}{w.change}%
                  </Badge>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" className="bg-primary/15 text-primary hover:bg-primary/25 border border-primary/30">Buy</Button>
                  <Button size="sm" variant="outline" className="border-border">Trade</Button>
                </div>
              </div>
              {w.note && (
                <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border/40">📌 {w.note}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}