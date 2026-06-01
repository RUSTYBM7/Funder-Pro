"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftRight, Zap, Info, TrendingUp, TrendingDown } from "lucide-react";

const rates = [
  { pair: "BTC → ETH", rate: "1 BTC = 27.6 ETH", change: 0.42, fee: "0.1%" },
  { pair: "ETH → USDC", rate: "1 ETH = 3,421.80 USDC", change: -0.18, fee: "0.05%" },
  { pair: "SOL → USDC", rate: "1 SOL = 198.40 USDC", change: 4.21, fee: "0.1%" },
  { pair: "USDT → USDC", rate: "1 USDT = 1.00 USDC", change: 0, fee: "Free" },
];

export default function ConvertPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Convert</h1>
        <p className="text-muted-foreground text-sm mt-1">Swap between assets at the best rates</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Swap</CardTitle>
            <CardDescription className="text-muted-foreground">Convert one asset to another instantly</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-secondary/30 border border-border">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-muted-foreground text-xs">From</Label>
                <span className="text-xs text-muted-foreground">Balance: 0.2541 BTC</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold">₿</div>
                <Input type="number" defaultValue="0.1" className="flex-1 bg-transparent border-0 text-2xl font-bold" />
                <span className="text-lg font-semibold text-white">BTC</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">≈ $9,451.24</p>
            </div>

            <div className="flex justify-center -my-2">
              <Button size="icon" variant="outline" className="rounded-full border-border bg-card">
                <ArrowLeftRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-4 rounded-lg bg-secondary/30 border border-border">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-muted-foreground text-xs">To</Label>
                <span className="text-xs text-muted-foreground">Balance: 1.82 ETH</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">Ξ</div>
                <Input type="number" defaultValue="2.761" className="flex-1 bg-transparent border-0 text-2xl font-bold text-primary" readOnly />
                <span className="text-lg font-semibold text-white">ETH</span>
              </div>
              <p className="text-xs text-primary mt-2">≈ $9,448.50</p>
            </div>

            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Rate</span>
                <span className="text-white">1 BTC = 27.61 ETH</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Fee (0.1%)</span>
                <span className="text-white">$9.45</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Network</span>
                <span className="text-white">Ethereum (ERC-20)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Est. time</span>
                <span className="text-primary">~30 seconds</span>
              </div>
            </div>

            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Zap className="h-4 w-4 mr-2" /> Convert Now
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-white text-sm">Live Rates</CardTitle>
            </CardHeader>
            <CardContent>
              {rates.map((r) => (
                <div key={r.pair} className="flex items-center justify-between py-3 border-b border-border/40 last:border-0">
                  <div>
                    <p className="text-sm font-semibold text-white">{r.pair}</p>
                    <p className="text-xs text-muted-foreground">{r.rate}</p>
                  </div>
                  <Badge className={r.change > 0 ? "bg-primary/15 text-primary border-primary/30" : r.change < 0 ? "bg-red-500/15 text-red-400 border-red-500/30" : "bg-secondary text-muted-foreground border-border"} variant="outline">
                    {r.change > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : r.change < 0 ? <TrendingDown className="h-3 w-3 mr-1" /> : null}
                    {r.change === 0 ? "Stable" : `${r.change > 0 ? "+" : ""}${r.change}%`}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}