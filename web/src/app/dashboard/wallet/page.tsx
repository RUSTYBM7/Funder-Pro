"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Minus, ArrowLeftRight, Copy, Eye, EyeOff, ArrowDownToLine, ArrowUpFromLine, CreditCard, Banknote, Building2, Bitcoin } from "lucide-react";

const walletAssets = [
  { symbol: "BTC", name: "Bitcoin", icon: "₿", color: "#F7931A", amount: 0.2541, usd: 24016.85, network: "Bitcoin", fee: 0.0001 },
  { symbol: "ETH", name: "Ethereum", icon: "Ξ", color: "#627EEA", amount: 1.82, usd: 6227.66, network: "ERC-20", fee: 0.002 },
  { symbol: "SOL", name: "Solana", icon: "◎", color: "#9945FF", amount: 12.0, usd: 2380.80, network: "Solana", fee: 0.000005 },
  { symbol: "USDC", name: "USD Coin", icon: "$", color: "#2775CA", amount: 5200, usd: 5200, network: "ERC-20", fee: 1.5 },
  { symbol: "USDT", name: "Tether", icon: "₮", color: "#26A17B", amount: 850, usd: 850, network: "TRC-20", fee: 1 },
  { symbol: "AVAX", name: "Avalanche", icon: "▲", color: "#E84142", amount: 45, usd: 1751.40, network: "C-Chain", fee: 0.01 },
];

const fiatMethods = [
  { name: "Bank Transfer (ACH)", icon: Building2, fee: "Free", time: "1-3 days", min: 100, max: 50000 },
  { name: "Wire Transfer", icon: Banknote, fee: "$25", time: "Same day", min: 1000, max: 500000 },
  { name: "Debit Card", icon: CreditCard, fee: "1.5%", time: "Instant", min: 10, max: 10000 },
  { name: "Apple Pay", icon: CreditCard, fee: "0.5%", time: "Instant", min: 10, max: 5000 },
];

export default function WalletPage() {
  const [hidden, setHidden] = React.useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Wallet</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your crypto and fiat balances</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="bg-gradient-to-br from-primary/15 to-card border-primary/20 lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Balance</p>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setHidden(!hidden)}>
                {hidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <h2 className="text-4xl font-bold text-white mt-2">{hidden ? "••••••" : "$40,426.71"}</h2>
            <div className="flex items-center gap-3 mt-2">
              <Badge className="bg-primary/15 text-primary border-primary/30">+$1,242.18 (+3.17%)</Badge>
              <span className="text-xs text-muted-foreground">24h</span>
            </div>
            <div className="flex items-center gap-2 mt-6">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <ArrowDownToLine className="h-4 w-4 mr-2" /> Deposit
              </Button>
              <Button variant="outline" className="border-border">
                <ArrowUpFromLine className="h-4 w-4 mr-2" /> Withdraw
              </Button>
              <Button variant="outline" className="border-border">
                <ArrowLeftRight className="h-4 w-4 mr-2" /> Transfer
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6 space-y-3">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Quick Stats</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Assets</span>
              <span className="text-sm font-semibold text-white">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Available</span>
              <span className="text-sm font-semibold text-white">$36,847.32</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">In Orders</span>
              <span className="text-sm font-semibold text-white">$3,579.39</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Staking</span>
              <span className="text-sm font-semibold text-primary">$1,250.00</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="crypto" className="w-full">
        <TabsList className="bg-card border border-border">
          <TabsTrigger value="crypto">Crypto Wallets</TabsTrigger>
          <TabsTrigger value="fiat">Fiat Currencies</TabsTrigger>
        </TabsList>

        <TabsContent value="crypto" className="mt-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Your Assets</CardTitle>
                <Button size="sm" variant="outline" className="border-border">
                  <Plus className="h-4 w-4 mr-2" /> Add Asset
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {walletAssets.map((a) => (
                <div key={a.symbol} className="flex items-center justify-between py-4 border-b border-border/40 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: a.color + "33", border: `1px solid ${a.color}66` }}>
                      {a.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{a.name}</p>
                      <p className="text-xs text-muted-foreground">{a.network}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">{hidden ? "••••••" : `${a.amount} ${a.symbol}`}</p>
                    <p className="text-xs text-muted-foreground">{hidden ? "••••" : `$${a.usd.toLocaleString()}`}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-primary">
                      <ArrowDownToLine className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground">
                      <ArrowUpFromLine className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground">
                      <ArrowLeftRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fiat" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-white text-base">USD Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-white">$8,420.50</p>
                <p className="text-xs text-muted-foreground mt-1">≈ 8,420.50 USDC</p>
                <div className="flex gap-2 mt-4">
                  <Button size="sm" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">Deposit</Button>
                  <Button size="sm" variant="outline" className="flex-1 border-border">Withdraw</Button>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-white text-base">EUR Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-white">€2,150.00</p>
                <p className="text-xs text-muted-foreground mt-1">≈ $2,322.00 USD</p>
                <div className="flex gap-2 mt-4">
                  <Button size="sm" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">Deposit</Button>
                  <Button size="sm" variant="outline" className="flex-1 border-border">Withdraw</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="bg-card border-border mt-4">
            <CardHeader>
              <CardTitle className="text-white">Deposit Methods</CardTitle>
            </CardHeader>
            <CardContent>
              {fiatMethods.map((m, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-border/40 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-primary">
                      <m.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{m.name}</p>
                      <p className="text-xs text-muted-foreground">{m.time} · Min ${m.min.toLocaleString()} · Max ${m.max.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">{m.fee}</p>
                    <p className="text-xs text-muted-foreground">Fee</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}