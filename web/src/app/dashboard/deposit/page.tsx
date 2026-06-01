"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Bitcoin, Copy, QrCode, CheckCircle2, ArrowDownToLine, Building2, CreditCard, Banknote, Zap } from "lucide-react";

export default function DepositPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Deposit Funds</h1>
        <p className="text-muted-foreground text-sm mt-1">Add funds to start trading</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-white">Choose Method</CardTitle>
              <CardDescription className="text-muted-foreground">Select how you'd like to deposit</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="crypto">
                <TabsList className="bg-secondary/50">
                  <TabsTrigger value="crypto">Cryptocurrency</TabsTrigger>
                  <TabsTrigger value="fiat">Fiat Currency</TabsTrigger>
                </TabsList>
                <TabsContent value="crypto" className="space-y-3 mt-4">
                  {[
                    { name: "Bitcoin", symbol: "BTC", network: "Bitcoin", fee: "0.0001 BTC", time: "~10 min", min: 0.001, color: "#F7931A", icon: "₿" },
                    { name: "Ethereum", symbol: "ETH", network: "ERC-20", fee: "0.002 ETH", time: "~3 min", min: 0.01, color: "#627EEA", icon: "Ξ" },
                    { name: "USDT", symbol: "USDT", network: "TRC-20", fee: "1 USDT", time: "~1 min", min: 10, color: "#26A17B", icon: "₮" },
                    { name: "USDC", symbol: "USDC", network: "ERC-20", fee: "1.5 USDC", time: "~3 min", min: 10, color: "#2775CA", icon: "$" },
                    { name: "Solana", symbol: "SOL", network: "Solana", fee: "0.000005 SOL", time: "~30 sec", min: 0.1, color: "#9945FF", icon: "◎" },
                  ].map((c) => (
                    <div key={c.symbol} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border hover:border-primary/30 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: c.color + "33", border: `1px solid ${c.color}66` }}>
                          {c.icon}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{c.name}</p>
                          <p className="text-xs text-muted-foreground">{c.network} · {c.time} · Min {c.min}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-border text-muted-foreground">{c.fee} fee</Badge>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="fiat" className="space-y-3 mt-4">
                  {[
                    { name: "Bank Transfer (ACH)", icon: Building2, fee: "Free", time: "1-3 days", min: 100 },
                    { name: "Wire Transfer", icon: Banknote, fee: "$25", time: "Same day", min: 1000 },
                    { name: "Debit Card", icon: CreditCard, fee: "1.5%", time: "Instant", min: 10 },
                    { name: "Apple Pay", icon: CreditCard, fee: "0.5%", time: "Instant", min: 10 },
                  ].map((m) => (
                    <div key={m.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border hover:border-primary/30 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
                          <m.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{m.name}</p>
                          <p className="text-xs text-muted-foreground">{m.time} · Min ${m.min}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-border text-muted-foreground">{m.fee}</Badge>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-white">BTC Deposit Address</CardTitle>
            <CardDescription className="text-muted-foreground">Send only BTC to this address</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center p-4 bg-white rounded-lg">
              <div className="grid grid-cols-12 grid-rows-12 gap-px w-40 h-40">
                {Array.from({ length: 144 }).map((_, i) => {
                  const seed = (i * 7 + 13) % 17;
                  return (
                    <div key={i} className={seed < 8 ? "bg-black" : "bg-white"} />
                  );
                })}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs">Wallet Address</Label>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50 border border-border">
                <code className="text-xs text-white flex-1 truncate">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</code>
                <Button size="icon" variant="ghost" className="h-7 w-7">
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs">Amount (Optional)</Label>
              <Input type="number" placeholder="0.00" className="bg-secondary/50 border-border" />
            </div>
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-xs text-white">Funds typically arrive in 10-30 minutes after network confirmation</p>
            </div>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Zap className="h-4 w-4 mr-2" /> I've Sent the Funds
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}