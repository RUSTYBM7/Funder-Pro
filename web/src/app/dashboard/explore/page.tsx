"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Star, Flame, BarChart3, Coins, Building2, Gem, BarChart, DollarSign, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const categories = [
  { id: "all", label: "All", icon: BarChart3 },
  { id: "crypto", label: "Crypto", icon: Coins },
  { id: "stocks", label: "Stocks", icon: Building2 },
  { id: "forex", label: "Forex", icon: DollarSign },
  { id: "commodities", label: "Commodities", icon: Gem },
  { id: "indices", label: "Indices", icon: BarChart },
];

const trending = [
  { symbol: "DOGE", name: "Dogecoin", category: "crypto", price: 0.385, change: 8.42, icon: "Ð", color: "#C2A633", volume: 4200000 },
  { symbol: "AVAX", name: "Avalanche", category: "crypto", price: 38.92, change: 5.61, icon: "▲", color: "#E84142", volume: 720000 },
  { symbol: "NVDA", name: "NVIDIA", category: "stocks", price: 142.85, change: 4.21, icon: "N", color: "#76B900", volume: 380000000 },
  { symbol: "TSLA", name: "Tesla", category: "stocks", price: 248.50, change: 3.84, icon: "T", color: "#CC0000", volume: 92000000 },
  { symbol: "EUR/USD", name: "Euro / USD", category: "forex", price: 1.0852, change: 0.42, icon: "€", color: "#003399", volume: 0 },
  { symbol: "GOLD", name: "Gold", category: "commodities", price: 2418.50, change: 1.28, icon: "Au", color: "#FFD700", volume: 0 },
  { symbol: "BTC", name: "Bitcoin", category: "crypto", price: 94512.40, change: 2.34, icon: "₿", color: "#F7931A", volume: 38420000000 },
  { symbol: "SPX", name: "S&P 500", category: "indices", price: 5184.20, change: 0.84, icon: "📈", color: "#0f1527", volume: 0 },
];

export default function ExplorePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Explore</h1>
        <p className="text-muted-foreground text-sm mt-1">Discover trending markets across all asset classes</p>
      </div>

      <Card className="bg-gradient-to-r from-primary/10 via-card to-purple-500/10 border-primary/20">
        <CardContent className="p-6 flex items-center gap-3">
          <Flame className="h-6 w-6 text-orange-400" />
          <p className="text-sm text-white">Markets heating up: <span className="font-semibold text-primary">DOGE +8.42%</span> · <span className="font-semibold text-primary">AVAX +5.61%</span> · <span className="font-semibold text-primary">NVDA +4.21%</span></p>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <Tabs defaultValue="all" className="w-full md:w-auto">
              <TabsList className="bg-secondary/50 flex-wrap">
                {categories.map((c) => (
                  <TabsTrigger key={c.id} value={c.id} className="flex items-center gap-1.5">
                    <c.icon className="h-3.5 w-3.5" /> {c.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <div className="relative flex-1 max-w-md md:ml-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search markets..." className="pl-9 bg-secondary/50 border-border" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {trending.map((t) => (
          <Card key={t.symbol} className="bg-card border-border hover:border-primary/30 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: t.color + "33", border: `1px solid ${t.color}66` }}>
                    {t.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.symbol}</p>
                    <p className="text-xs text-muted-foreground">{t.name}</p>
                  </div>
                </div>
                <Star className="h-4 w-4 text-muted-foreground hover:text-yellow-400 cursor-pointer" />
              </div>
              <p className="text-2xl font-bold text-white">${t.price.toLocaleString("en-US", { minimumFractionDigits: t.price < 10 ? 4 : 2 })}</p>
              <div className="flex items-center justify-between mt-2">
                <Badge className={t.change >= 0 ? "bg-primary/15 text-primary border-primary/30" : "bg-red-500/15 text-red-400 border-red-500/30"} variant="outline">
                  {t.change >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {t.change >= 0 ? "+" : ""}{t.change}%
                </Badge>
                <Button size="sm" className="bg-primary/15 text-primary hover:bg-primary/25 border border-primary/30">Trade</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}