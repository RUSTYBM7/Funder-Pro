"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";
import { TrendingUp, TrendingDown, Star, ChevronDown, Settings2, Info, Zap } from "lucide-react";

const chartData = Array.from({ length: 48 }, (_, i) => {
  const base = 94000;
  const variation = Math.sin(i / 3) * 800 + Math.random() * 400;
  return {
    time: `${i}:00`,
    price: base + variation,
    volume: Math.random() * 100 + 50,
  };
});

const orderBook = {
  asks: [
    { price: 94589.21, size: 0.245, total: 0.245 },
    { price: 94587.40, size: 1.842, total: 2.087 },
    { price: 94585.00, size: 0.524, total: 2.611 },
    { price: 94580.10, size: 3.121, total: 5.732 },
    { price: 94575.50, size: 0.892, total: 6.624 },
    { price: 94570.00, size: 2.451, total: 9.075 },
    { price: 94565.30, size: 1.205, total: 10.28 },
  ],
  bids: [
    { price: 94512.40, size: 1.842, total: 1.842 },
    { price: 94510.00, size: 0.524, total: 2.366 },
    { price: 94505.20, size: 3.121, total: 5.487 },
    { price: 94500.00, size: 0.892, total: 6.379 },
    { price: 94495.50, size: 2.451, total: 8.83 },
    { price: 94490.10, size: 1.205, total: 10.035 },
    { price: 94485.00, size: 0.682, total: 10.717 },
  ],
};

const myOrders = [
  { id: 1, pair: "BTC/USDT", side: "buy", type: "limit", price: 93500, amount: 0.05, filled: "0%", status: "open" },
  { id: 2, pair: "ETH/USDT", side: "sell", type: "limit", price: 3450, amount: 1.5, filled: "32%", status: "partial" },
  { id: 3, pair: "SOL/USDT", side: "buy", type: "market", price: 198.40, amount: 8, filled: "100%", status: "filled" },
];

export default function TradePage() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">BTC/USDT</h1>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">Bitcoin</Badge>
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          </div>
          <div className="flex items-center gap-4 mt-1">
            <p className="text-3xl font-bold text-white">$94,512.40</p>
            <Badge className="bg-primary/15 text-primary border-primary/30">
              <TrendingUp className="h-3 w-3 mr-1" /> +$2,162.40 (+2.34%)
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">24h High</p>
            <p className="text-white font-semibold">$95,184.20</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">24h Low</p>
            <p className="text-white font-semibold">$92,340.10</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">24h Volume</p>
            <p className="text-white font-semibold">$38.4B</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Chart */}
        <Card className="bg-card border-border col-span-12 lg:col-span-8">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Tabs defaultValue="1h">
                <TabsList className="bg-secondary/50">
                  <TabsTrigger value="1m">1m</TabsTrigger>
                  <TabsTrigger value="5m">5m</TabsTrigger>
                  <TabsTrigger value="15m">15m</TabsTrigger>
                  <TabsTrigger value="1h">1h</TabsTrigger>
                  <TabsTrigger value="4h">4h</TabsTrigger>
                  <TabsTrigger value="1d">1D</TabsTrigger>
                  <TabsTrigger value="1w">1W</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-border text-muted-foreground">Indicators</Badge>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Settings2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[420px] -ml-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="tradeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00E27A" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#00E27A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="time" stroke="#94A3B8" tick={{ fill: "#94A3B8", fontSize: 10 }} />
                  <YAxis stroke="#94A3B8" tick={{ fill: "#94A3B8", fontSize: 10 }} domain={["dataMin - 500", "dataMax + 500"]} />
                  <Tooltip contentStyle={{ backgroundColor: "#0D1525", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", color: "#fff" }} />
                  <Area type="monotone" dataKey="price" stroke="#00E27A" strokeWidth={2} fill="url(#tradeGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Order Book */}
        <Card className="bg-card border-border col-span-12 lg:col-span-4">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-sm">Order Book</CardTitle>
              <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground">0.01</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="grid grid-cols-3 text-[10px] text-muted-foreground uppercase tracking-wide px-2">
              <span>Price</span>
              <span className="text-right">Size</span>
              <span className="text-right">Total</span>
            </div>
            <div className="space-y-0.5">
              {orderBook.asks.slice().reverse().map((ask, i) => (
                <div key={i} className="relative grid grid-cols-3 text-xs px-2 py-1 hover:bg-secondary/30 cursor-pointer">
                  <div className="absolute right-0 top-0 bottom-0 bg-red-500/5" style={{ width: `${(ask.total / 12) * 100}%` }} />
                  <span className="relative text-red-400 font-mono">{ask.price.toFixed(2)}</span>
                  <span className="relative text-right text-white font-mono">{ask.size}</span>
                  <span className="relative text-right text-muted-foreground font-mono">{ask.total.toFixed(3)}</span>
                </div>
              ))}
            </div>
            <div className="py-2 px-2 border-y border-border">
              <p className="text-lg font-bold text-primary">$94,512.40</p>
              <p className="text-xs text-muted-foreground">≈ $94,512.40 USD</p>
            </div>
            <div className="space-y-0.5">
              {orderBook.bids.map((bid, i) => (
                <div key={i} className="relative grid grid-cols-3 text-xs px-2 py-1 hover:bg-secondary/30 cursor-pointer">
                  <div className="absolute right-0 top-0 bottom-0 bg-primary/5" style={{ width: `${(bid.total / 12) * 100}%` }} />
                  <span className="relative text-primary font-mono">{bid.price.toFixed(2)}</span>
                  <span className="relative text-right text-white font-mono">{bid.size}</span>
                  <span className="relative text-right text-muted-foreground font-mono">{bid.total.toFixed(3)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Order Form */}
        <Card className="bg-card border-border col-span-12 lg:col-span-4">
          <CardHeader>
            <Tabs defaultValue="buy" className="w-full">
              <TabsList className="w-full bg-secondary/50">
                <TabsTrigger value="buy" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Buy</TabsTrigger>
                <TabsTrigger value="sell" className="flex-1 data-[state=active]:bg-red-500 data-[state=active]:text-white">Sell</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="limit">
              <TabsList className="bg-secondary/30 w-full">
                <TabsTrigger value="limit" className="flex-1">Limit</TabsTrigger>
                <TabsTrigger value="market" className="flex-1">Market</TabsTrigger>
                <TabsTrigger value="stop" className="flex-1">Stop</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="space-y-3 mt-4">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Price</Label>
                <Input type="number" defaultValue="94512.40" className="bg-secondary/50 border-border" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Amount</Label>
                <Input type="number" placeholder="0.00" className="bg-secondary/50 border-border" />
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {["25%", "50%", "75%", "100%"].map((p) => (
                  <Button key={p} variant="outline" size="sm" className="border-border text-xs">{p}</Button>
                ))}
              </div>
              <div className="p-3 rounded-lg bg-secondary/30 border border-border space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Total</span>
                  <span className="text-white font-mono">$0.00</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Fee (0.1%)</span>
                  <span className="text-white font-mono">$0.00</span>
                </div>
              </div>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                <Zap className="h-4 w-4 mr-2" />
                Buy BTC
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* My Orders */}
        <Card className="bg-card border-border col-span-12 lg:col-span-8">
          <CardHeader>
            <Tabs defaultValue="open">
              <TabsList className="bg-secondary/50">
                <TabsTrigger value="open">Open Orders (2)</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="trades">Trades</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-12 gap-2 text-xs text-muted-foreground uppercase tracking-wide border-b border-border pb-2">
              <div className="col-span-3">Pair</div>
              <div className="col-span-2">Side</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-2 text-right">Price</div>
              <div className="col-span-2 text-right">Amount</div>
              <div className="col-span-1 text-right">Status</div>
            </div>
            {myOrders.map((o) => (
              <div key={o.id} className="grid grid-cols-12 gap-2 py-3 items-center text-sm border-b border-border/40">
                <div className="col-span-3 text-white font-medium">{o.pair}</div>
                <div className="col-span-2">
                  <Badge className={o.side === "buy" ? "bg-primary/15 text-primary border-primary/30" : "bg-red-500/15 text-red-400 border-red-500/30"} variant="outline">
                    {o.side}
                  </Badge>
                </div>
                <div className="col-span-2 text-muted-foreground capitalize">{o.type}</div>
                <div className="col-span-2 text-right text-white font-mono">${o.price.toLocaleString()}</div>
                <div className="col-span-2 text-right text-white">{o.amount}</div>
                <div className="col-span-1 text-right">
                  <span className={`text-xs ${o.status === "open" ? "text-yellow-400" : o.status === "partial" ? "text-blue-400" : "text-primary"}`}>
                    {o.status}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}