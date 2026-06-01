"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowRight, User, CheckCircle2, Clock, AlertCircle, Send } from "lucide-react";

const contacts = [
  { name: "Sarah Johnson", address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1", recent: true, verified: true },
  { name: "Trading Account Main", address: "0x1234...5678", recent: true, verified: true, own: true },
  { name: "Cold Storage", address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", recent: false, verified: true, own: true },
];

const history = [
  { id: 1, type: "internal", from: "Trading", to: "Savings", amount: "0.05 BTC", value: "$4,725.62", time: "2 hours ago", status: "completed" },
  { id: 2, type: "internal", from: "Funding", to: "Trading", amount: "1.5 ETH", value: "$5,132.70", time: "Yesterday", status: "completed" },
  { id: 3, type: "external", from: "Trading", to: "0x742d...bEb1", amount: "0.5 ETH", value: "$1,710.90", time: "2 days ago", status: "completed" },
];

export default function TransferPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Transfer</h1>
        <p className="text-muted-foreground text-sm mt-1">Move funds between accounts instantly</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">New Transfer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="internal">
              <TabsList className="bg-secondary/50">
                <TabsTrigger value="internal">Between My Accounts</TabsTrigger>
                <TabsTrigger value="external">To Another User</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs">From Account</Label>
              <div className="p-3 rounded-lg bg-secondary/30 border border-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Main Trading Account</p>
                  <p className="text-xs text-muted-foreground">Available: $24,847.32</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button size="icon" variant="ghost" className="rounded-full">
                <ArrowRight className="h-4 w-4 rotate-90" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs">To Account</Label>
              <Input placeholder="Search user or paste address..." className="bg-secondary/50 border-border" />
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs">Amount</Label>
              <div className="relative">
                <Input type="number" placeholder="0.00" className="pr-24 bg-secondary/50 border-border" />
                <div className="absolute right-1 top-1 flex gap-1">
                  <Button size="sm" variant="ghost" className="h-7 text-xs">25%</Button>
                  <Button size="sm" variant="ghost" className="h-7 text-xs">MAX</Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs">Note (Optional)</Label>
              <Input placeholder="What's this for?" className="bg-secondary/50 border-border" />
            </div>

            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Transfer amount</span>
                <span className="text-white">$1,000.00</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Fee</span>
                <span className="text-primary">Free (Internal)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Arrives</span>
                <span className="text-primary">Instantly</span>
              </div>
            </div>

            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Send className="h-4 w-4 mr-2" /> Transfer $1,000
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-white text-sm">Recent Contacts</CardTitle>
            </CardHeader>
            <CardContent>
              {contacts.map((c, i) => (
                <div key={i} className="flex items-center gap-3 py-2.5 border-b border-border/40 last:border-0">
                  <div className="w-9 h-9 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-xs">
                    {c.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <p className="text-sm text-white truncate">{c.name}</p>
                      {c.verified && <CheckCircle2 className="h-3 w-3 text-primary" />}
                    </div>
                    <p className="text-xs text-muted-foreground font-mono truncate">{c.address.slice(0, 16)}...</p>
                  </div>
                  <Button size="sm" variant="ghost" className="text-primary">Send</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-white">Transfer History</CardTitle>
        </CardHeader>
        <CardContent>
          {history.map((h) => (
            <div key={h.id} className="flex items-center justify-between py-3 border-b border-border/40 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-white font-medium">{h.from} → {h.to}</p>
                  <p className="text-xs text-muted-foreground">{h.amount} · {h.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-white">{h.value}</p>
                <Badge variant="outline" className="border-primary/30 text-primary text-[10px]">{h.status}</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}