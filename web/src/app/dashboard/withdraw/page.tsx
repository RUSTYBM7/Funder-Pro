"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowUpFromLine, Building2, Bitcoin, CreditCard, CheckCircle2, Shield, Clock, AlertTriangle } from "lucide-react";

export default function WithdrawPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Withdraw Funds</h1>
        <p className="text-muted-foreground text-sm mt-1">Cash out your profits</p>
      </div>

      <Card className="bg-card border-border">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase">Available Balance</p>
            <p className="text-2xl font-bold text-white mt-1">$24,847.32</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Daily Limit</p>
            <p className="text-sm font-semibold text-white">$50,000 / $50,000</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Withdrawal Details</CardTitle>
            <CardDescription className="text-muted-foreground">Enter amount and destination</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="crypto">
              <TabsList className="bg-secondary/50">
                <TabsTrigger value="crypto">Crypto</TabsTrigger>
                <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
                <TabsTrigger value="card">Card</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs">Amount</Label>
              <div className="relative">
                <Input type="number" placeholder="0.00" className="pr-20 bg-secondary/50 border-border" />
                <Button size="sm" variant="ghost" className="absolute right-1 top-1 h-7 text-primary">MAX</Button>
              </div>
              <p className="text-xs text-muted-foreground">Min $10 · Max $50,000/day</p>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs">Destination Address</Label>
              <Input placeholder="bc1q... or 0x..." className="bg-secondary/50 border-border font-mono text-sm" />
              <p className="text-xs text-primary">✓ Address is on your whitelist</p>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs">Network</Label>
              <Tabs defaultValue="bitcoin">
                <TabsList className="bg-secondary/30">
                  <TabsTrigger value="bitcoin">Bitcoin</TabsTrigger>
                  <TabsTrigger value="ethereum">Ethereum</TabsTrigger>
                  <TabsTrigger value="tron">Tron (TRC-20)</TabsTrigger>
                  <TabsTrigger value="solana">Solana</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="p-4 rounded-lg bg-secondary/30 border border-border space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Amount</span>
                <span className="text-white">$1,000.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Network fee</span>
                <span className="text-white">$2.50</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-border">
                <span className="text-muted-foreground font-medium">You'll receive</span>
                <span className="text-primary font-bold">$997.50</span>
              </div>
            </div>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <ArrowUpFromLine className="h-4 w-4 mr-2" /> Withdraw $1,000
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-white text-sm">Processing Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-blue-400" />
                <span>10-30 minutes</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-yellow-500/5 border-yellow-500/20">
            <CardContent className="p-4 flex items-start gap-2">
              <Shield className="h-4 w-4 text-yellow-400 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-white">Security Hold</p>
                <p className="text-xs text-muted-foreground mt-1">Large withdrawals (over $25K) require 24h review for your protection.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}