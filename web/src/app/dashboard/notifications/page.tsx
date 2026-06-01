"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle2, AlertCircle, Info, DollarSign, Activity, Shield, Trash2 } from "lucide-react";

const notifications = [
  { id: 1, type: "trade", icon: Activity, title: "BTC Buy Order Filled", desc: "Bought 0.025 BTC at $94,512.40", time: "2 min ago", read: false, color: "text-primary" },
  { id: 2, type: "alert", icon: DollarSign, title: "Price Alert: ETH crossed $3,400", desc: "Ethereum is up 2.4% in the last hour", time: "1 hour ago", read: false, color: "text-blue-400" },
  { id: 3, type: "security", icon: Shield, title: "New login from iPhone 15", desc: "Cardiff, UK · iOS 17.2", time: "3 hours ago", read: true, color: "text-yellow-400" },
  { id: 4, type: "system", icon: Info, title: "Scheduled maintenance complete", desc: "All systems operational. Network upgraded.", time: "Yesterday", read: true, color: "text-purple-400" },
  { id: 5, type: "alert", icon: AlertCircle, title: "Margin warning", desc: "Your SOL position is approaching margin limit", time: "2 days ago", read: true, color: "text-red-400" },
  { id: 6, type: "trade", icon: CheckCircle2, title: "Limit order executed", desc: "Sold 2 SOL at $198.40 target", time: "3 days ago", read: true, color: "text-primary" },
];

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Notifications</h1>
          <p className="text-muted-foreground text-sm mt-1">Stay updated on trades, alerts and account activity</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-border">Mark all as read</Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">Settings</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Unread", value: "2", color: "text-primary" },
          { label: "Today", value: "4", color: "text-blue-400" },
          { label: "This Week", value: "12", color: "text-purple-400" },
          { label: "Alerts", value: "5", color: "text-yellow-400" },
        ].map((s) => (
          <Card key={s.label} className="bg-card border-border">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{s.label}</p>
              <p className={`text-2xl font-bold mt-2 ${s.color}`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {notifications.map((n) => (
            <div key={n.id} className={`flex items-start gap-4 p-4 border-b border-border/40 last:border-0 ${!n.read && "bg-primary/5"}`}>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-secondary/50 ${n.color}`}>
                <n.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-white">{n.title}</p>
                  {!n.read && <span className="h-2 w-2 rounded-full bg-primary" />}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
                <p className="text-xs text-muted-foreground/60 mt-1">{n.time}</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-400">
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}