"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Star, Search, Filter, ArrowUpRight, ArrowDownRight, BarChart3, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";

const cryptos = [
  { rank: 1, symbol: "BTC", name: "Bitcoin", price: 94512.40, change: 2.34, marketCap: 1870000000000, volume: 38420000000, sparkline: [92000, 92800, 93500, 93200, 94100, 94512], icon: "₿", color: "#F7931A", category: "PoW" },
  { rank: 2, symbol: "ETH", name: "Ethereum", price: 3421.80, change: 1.82, marketCap: 411000000000, volume: 18900000000, sparkline: [3350, 3380, 3395, 3410, 3418, 3421], icon: "Ξ", color: "#627EEA", category: "PoS" },
  { rank: 3, symbol: "SOL", name: "Solana", price: 198.40, change: 4.21, marketCap: 93000000000, volume: 4200000000, sparkline: [188, 192, 195, 196, 197, 198], icon: "◎", color: "#9945FF", category: "PoS" },
  { rank: 4, symbol: "BNB", name: "BNB", price: 612.30, change: -0.84, marketCap: 92000000000, volume: 1800000000, sparkline: [620, 618, 615, 614, 613, 612], icon: "B", color: "#F3BA2F", category: "PoS" },
  { rank: 5, symbol: "XRP", name: "XRP", price: 2.41, change: 3.12, marketCap: 138000000000, volume: 5200000000, sparkline: [2.32, 2.35, 2.37, 2.39, 2.40, 2.41], icon: "✕", color: "#00AAE4", category: "PoS" },
  { rank: 6, symbol: "ADA", name: "Cardano", price: 0.784, change: -1.42, marketCap: 27000000000, volume: 540000000, sparkline: [0.81, 0.80, 0.79, 0.78, 0.78, 0.784], icon: "₳", color: "#0033AD", category: "PoS" },
  { rank: 7, symbol: "AVAX", name: "Avalanche", price: 38.92, change: 5.61, marketCap: 16000000000, volume: 720000000, sparkline: [36, 37, 38, 38.2, 38.5, 38.92], icon: "▲", color: "#E84142", category: "PoS" },
  { rank: 8, symbol: "DOGE", name: "Dogecoin", price: 0.3852, change: 8.42, marketCap: 56000000000, volume: 4200000000, sparkline: [0.355, 0.365, 0.372, 0.378, 0.382, 0.385], icon: "Ð", color: "#C2A633", category: "PoW" },
  { rank: 9, symbol: "DOT", name: "Polkadot", price: 7.84, change: -2.10, marketCap: 11000000000, volume: 280000000, sparkline: [8.10, 8.05, 7.95, 7.90, 7.88, 7.84], icon: "●", color: "#E6007A", category: "PoS" },
  { rank: 10, symbol: "LINK", name: "Chainlink", price: 18.72, change: 3.40, marketCap: 11000000000, volume: 580000000, sparkline: [17.8, 18.1, 18.3, 18.5, 18.6, 18.72], icon: "⬡", color: "#2A5ADA", category: "Utility" },
  { rank: 11, symbol: "MATIC", name: "Polygon", price: 0.482, change: -0.92, marketCap: 5000000000, volume: 240000000, sparkline: [0.49, 0.488, 0.485, 0.484, 0.483, 0.482], icon: "M", color: "#8247E5", category: "PoS" },
  { rank: 12, symbol: "UNI", name: "Uniswap", price: 14.32, change: 1.84, marketCap: 8500000000, volume: 320000000, sparkline: [14.1, 14.15, 14.2, 14.25, 14.30, 14.32], icon: "🦄", color: "#FF007A", category: "DeFi" },
];

function fmt(n: number, d = 2) {
  return n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
}
function fmtLarge(n: number) {
  if (n >= 1e12) return "$" + (n / 1e12).toFixed(2) + "T";
  if (n >= 1e9) return "$" + (n / 1e9).toFixed(2) + "B";
  if (n >= 1e6) return "$" + (n / 1e6).toFixed(2) + "M";
  return "$" + fmt(n);
}

function MiniSpark({ data, change, color }: { data: number[]; change: number; color: string }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 60;
    const y = 20 - ((v - min) / range) * 18;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width="60" height="22" viewBox="0 0 60 22" className="overflow-visible">
      <polyline points={points} fill="none" stroke={change >= 0 ? "#00E27A" : "#F75555"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function MarketsPage() {
  const [search, setSearch] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("all");
  const [favorites, setFavorites] = React.useState<string[]>(["BTC", "ETH", "SOL"]);

  const filtered = cryptos.filter((c) => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.symbol.toLowerCase().includes(search.toLowerCase())) return false;
    if (activeTab === "favorites" && !favorites.includes(c.symbol)) return false;
    if (activeTab === "gainers" && c.change <= 0) return false;
    if (activeTab === "losers" && c.change >= 0) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Markets</h1>
          <p className="text-muted-foreground text-sm mt-1">Real-time prices across {cryptos.length}+ cryptocurrencies</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Live
          </Badge>
          <Button variant="outline" size="sm" className="border-border">
            <Zap className="h-4 w-4 mr-2" />
            Pro Charts
          </Button>
        </div>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList className="bg-secondary/50">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="favorites">★ Favorites</TabsTrigger>
                <TabsTrigger value="gainers">Gainers</TabsTrigger>
                <TabsTrigger value="losers">Losers</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="relative flex-1 max-w-md md:ml-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search markets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-secondary/50 border-border"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-12 gap-2 px-3 py-2 text-xs text-muted-foreground uppercase tracking-wide border-b border-border">
            <div className="col-span-1">#</div>
            <div className="col-span-3">Asset</div>
            <div className="col-span-2 text-right">Price</div>
            <div className="col-span-2 text-right">24h Change</div>
            <div className="col-span-2 text-right hidden md:block">Market Cap</div>
            <div className="col-span-2 text-right hidden lg:block">Volume (24h)</div>
            <div className="col-span-12 md:col-span-2 text-right">Action</div>
          </div>

          {filtered.map((coin) => (
            <div key={coin.symbol} className="grid grid-cols-12 gap-2 px-3 py-4 items-center border-b border-border/40 hover:bg-secondary/20 transition-colors">
              <div className="col-span-1">
                <span className="text-xs text-muted-foreground">{coin.rank}</span>
              </div>
              <div className="col-span-3 flex items-center gap-3">
                <button
                  onClick={() => setFavorites((f) => f.includes(coin.symbol) ? f.filter(s => s !== coin.symbol) : [...f, coin.symbol])}
                  className="text-muted-foreground hover:text-yellow-400 transition-colors"
                >
                  <Star className={`h-4 w-4 ${favorites.includes(coin.symbol) ? "fill-yellow-400 text-yellow-400" : ""}`} />
                </button>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: coin.color + "33", border: `1px solid ${coin.color}66` }}
                >
                  {coin.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{coin.symbol}/USDT</p>
                  <p className="text-xs text-muted-foreground">{coin.name}</p>
                </div>
              </div>
              <div className="col-span-2 text-right">
                <p className="text-sm font-semibold text-white">${fmt(coin.price, coin.price < 1 ? 4 : 2)}</p>
                <div className="md:hidden"><MiniSpark data={coin.sparkline} change={coin.change} color={coin.color} /></div>
              </div>
              <div className="col-span-2 text-right">
                <Badge className={coin.change >= 0 ? "bg-primary/10 text-primary border-primary/20" : "bg-red-500/10 text-red-400 border-red-500/20"} variant="outline">
                  {coin.change >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {coin.change >= 0 ? "+" : ""}{fmt(coin.change)}%
                </Badge>
              </div>
              <div className="col-span-2 text-right hidden md:block">
                <p className="text-sm text-muted-foreground">{fmtLarge(coin.marketCap)}</p>
              </div>
              <div className="col-span-2 text-right hidden lg:block">
                <p className="text-sm text-muted-foreground">{fmtLarge(coin.volume)}</p>
              </div>
              <div className="col-span-12 md:col-span-2 flex items-center gap-2 justify-end">
                <Button size="sm" className="bg-primary/15 text-primary hover:bg-primary/25 border border-primary/30">
                  Buy
                </Button>
                <Button size="sm" variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                  Sell
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}