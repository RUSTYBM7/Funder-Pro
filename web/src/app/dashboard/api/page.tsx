"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Key, Copy, Plus, Trash2, Eye, EyeOff, Activity, Code2, Webhook, CheckCircle2, AlertCircle, Zap, TrendingUp } from "lucide-react";

const apiKeys = [
  { id: 1, name: "Trading Bot - Production", key: "fp_live_••••••••••••3a8f", permissions: ["read", "trade"], created: "2024-09-15", lastUsed: "2 min ago", status: "active" },
  { id: 2, name: "Portfolio Tracker", key: "fp_read_••••••••••••7c2e", permissions: ["read"], created: "2024-11-02", lastUsed: "5 hours ago", status: "active" },
  { id: 3, name: "Reporting Dashboard", key: "fp_read_••••••••••••9b1d", permissions: ["read"], created: "2025-01-08", lastUsed: "3 days ago", status: "inactive" },
];

const webhooks = [
  { id: 1, url: "https://api.myapp.com/funderpro/webhook", events: ["order.filled", "price.alert"], status: "active", lastTrigger: "12 min ago" },
  { id: 2, url: "https://hooks.zapier.com/abc123", events: ["payout.completed"], status: "active", lastTrigger: "1 day ago" },
];

export default function ApiPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">API & Integrations</h1>
        <p className="text-muted-foreground text-sm mt-1">Connect FunderPro to your tools and bots</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "API Calls (30d)", value: "248K", icon: Activity, color: "text-primary" },
          { label: "Active Keys", value: "2", icon: Key, color: "text-blue-400" },
          { label: "Webhooks", value: "2", icon: Webhook, color: "text-purple-400" },
          { label: "Rate Limit", value: "1200/min", icon: TrendingUp, color: "text-yellow-400" },
        ].map((s) => (
          <Card key={s.label} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{s.label}</p>
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </div>
              <p className={`text-2xl font-bold mt-2 ${s.color}`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="keys">
        <TabsList className="bg-card border border-border">
          <TabsTrigger value="keys">API Keys</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="docs">Documentation</TabsTrigger>
        </TabsList>

        <TabsContent value="keys" className="mt-4 space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Your API Keys</CardTitle>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" /> Create Key
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {apiKeys.map((k) => (
                <div key={k.id} className="flex items-center gap-3 p-4 rounded-lg bg-secondary/30 border border-border mb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
                    <Key className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-white">{k.name}</p>
                      <Badge className={k.status === "active" ? "bg-primary/15 text-primary border-primary/30" : "bg-secondary text-muted-foreground border-border"} variant="outline">
                        {k.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5">{k.key}</p>
                    <div className="flex items-center gap-3 mt-1">
                      {k.permissions.map((p) => (
                        <Badge key={p} variant="outline" className="border-border text-muted-foreground text-[10px]">{p}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Last used: {k.lastUsed}</p>
                    <p className="text-xs text-muted-foreground">Created: {k.created}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground"><Copy className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-red-400"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="mt-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Active Webhooks</CardTitle>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" /> Add Webhook
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {webhooks.map((w) => (
                <div key={w.id} className="p-4 rounded-lg bg-secondary/30 border border-border mb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Webhook className="h-4 w-4 text-primary" />
                        <code className="text-sm text-white font-mono">{w.url}</code>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        {w.events.map((e) => (
                          <Badge key={e} variant="outline" className="border-primary/30 text-primary text-[10px]">{e}</Badge>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Last triggered: {w.lastTrigger}</p>
                    </div>
                    <Badge className="bg-primary/15 text-primary border-primary/30">{w.status}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="docs" className="mt-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-white">Quick Start</CardTitle>
              <CardDescription className="text-muted-foreground">Get started with the FunderPro API</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-secondary/50 border border-border font-mono text-sm text-white">
                <p className="text-muted-foreground"># Get account balance</p>
                <p>curl https://api.funderpro.io/v1/account \</p>
                <p>&nbsp;&nbsp;-H "Authorization: Bearer fp_live_3a8f..."</p>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {["Authentication", "Webhooks", "Rate Limits"].map((t) => (
                  <Button key={t} variant="outline" className="border-border justify-start">
                    <Code2 className="h-4 w-4 mr-2" /> {t}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}