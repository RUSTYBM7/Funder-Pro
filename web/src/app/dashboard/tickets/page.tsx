"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, MessageSquare, AlertCircle, Clock, CheckCircle2, Send } from "lucide-react";

const tickets = [
  { id: "#12847", user: "Marcus Chen", subject: "Withdrawal delay on USDT-TRC20", priority: "high", status: "open", category: "Payouts", lastReply: "2 min ago", assigned: "Sarah K." },
  { id: "#12846", user: "Sofia Rodriguez", subject: "Challenge progress not updating", priority: "medium", status: "in_progress", category: "Challenge", lastReply: "15 min ago", assigned: "James W." },
  { id: "#12845", user: "Lucas Müller", subject: "KYC document upload failed", priority: "high", status: "open", category: "Verification", lastReply: "1 hour ago", assigned: "Unassigned" },
  { id: "#12844", user: "Aisha Patel", subject: "How to enable 2FA?", priority: "low", status: "resolved", category: "Account", lastReply: "3 hours ago", assigned: "Sarah K." },
  { id: "#12843", user: "Yuki Tanaka", subject: "API rate limit increase", priority: "medium", status: "in_progress", category: "API", lastReply: "5 hours ago", assigned: "Mike T." },
  { id: "#12842", user: "Erik Lindqvist", subject: "Leverage adjustment request", priority: "low", status: "open", category: "Trading", lastReply: "6 hours ago", assigned: "Unassigned" },
  { id: "#12841", user: "Hannah Lee", subject: "Account locked after travel", priority: "high", status: "resolved", category: "Account", lastReply: "1 day ago", assigned: "Sarah K." },
];

const priorityColors: Record<string, string> = {
  high: "bg-red-500/15 text-red-400 border-red-500/30",
  medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  low: "bg-blue-500/15 text-blue-400 border-blue-500/30",
};

const statusColors: Record<string, string> = {
  open: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  in_progress: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  resolved: "bg-primary/15 text-primary border-primary/30",
  closed: "bg-secondary text-muted-foreground border-border",
};

export default function TicketsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Support Tickets</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage customer support requests</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Open Tickets", value: "47", color: "text-blue-400" },
          { label: "In Progress", value: "23", color: "text-yellow-400" },
          { label: "Resolved Today", value: "31", color: "text-primary" },
          { label: "Avg Response", value: "1.8h", color: "text-blue-400" },
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
          <div className="flex items-center justify-between">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search tickets..." className="pl-9 bg-secondary/50 border-border" />
            </div>
            <Button variant="outline" size="sm" className="border-border">
              <Filter className="h-4 w-4 mr-2" /> Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {tickets.map((t) => (
            <div key={t.id} className="flex items-center gap-3 px-4 py-4 border-b border-border/40 hover:bg-secondary/20">
              <div className="w-10 h-10 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground">{t.id}</span>
                  <Badge variant="outline" className="border-border text-muted-foreground text-xs">{t.category}</Badge>
                </div>
                <p className="text-sm font-semibold text-white mt-0.5">{t.subject}</p>
                <p className="text-xs text-muted-foreground">{t.user} · {t.lastReply}</p>
              </div>
              <Badge className={priorityColors[t.priority]} variant="outline">
                {t.priority === "high" && <AlertCircle className="h-3 w-3 mr-1" />}
                {t.priority}
              </Badge>
              <Badge className={statusColors[t.status]} variant="outline">
                {t.status === "resolved" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                {t.status === "open" && <Clock className="h-3 w-3 mr-1" />}
                {t.status.replace("_", " ")}
              </Badge>
              <div className="text-right min-w-[100px]">
                <p className="text-xs text-muted-foreground">Assigned</p>
                <p className="text-xs text-white font-medium">{t.assigned}</p>
              </div>
              <Button size="sm" variant="ghost">Open</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}