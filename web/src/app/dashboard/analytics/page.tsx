"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, Users, DollarSign, Activity, Globe, ArrowUpRight, ArrowDownRight } from "lucide-react";

const revenueData = [
  { month: "Jul", revenue: 248000, users: 1240 },
  { month: "Aug", revenue: 282000, users: 1480 },
  { month: "Sep", revenue: 318000, users: 1690 },
  { month: "Oct", revenue: 384000, users: 1920 },
  { month: "Nov", revenue: 412000, users: 2150 },
  { month: "Dec", revenue: 478000, users: 2380 },
  { month: "Jan", revenue: 542000, users: 2640 },
];

const userGrowth = [
  { day: "Mon", new: 84, churn: 12 },
  { day: "Tue", new: 96, churn: 8 },
  { day: "Wed", new: 112, churn: 14 },
  { day: "Thu", new: 88, churn: 9 },
  { day: "Fri", new: 124, churn: 11 },
  { day: "Sat", new: 68, churn: 6 },
  { day: "Sun", new: 72, churn: 8 },
];

const geoData = [
  { country: "United States", users: 4820, pct: 28 },
  { country: "United Kingdom", users: 2150, pct: 12 },
  { country: "Germany", users: 1820, pct: 10 },
  { country: "India", users: 1640, pct: 9 },
  { country: "Singapore", users: 1280, pct: 7 },
  { country: "UAE", users: 940, pct: 5 },
  { country: "Other", users: 4820, pct: 29 },
];

const assetColors = ["#F7931A", "#627EEA", "#9945FF", "#00E27A", "#94A3B8"];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">Platform-wide performance and insights</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Monthly Revenue", value: "$542K", change: "+13.4%", up: true, icon: DollarSign, color: "text-primary" },
          { label: "Active Traders", value: "2,640", change: "+10.9%", up: true, icon: Users, color: "text-blue-400" },
          { label: "Avg. Trade Size", value: "$8,420", change: "+5.2%", up: true, icon: Activity, color: "text-purple-400" },
          { label: "Trading Volume", value: "$48.2M", change: "-2.1%", up: false, icon: TrendingUp, color: "text-yellow-400" },
        ].map((s) => (
          <Card key={s.label} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{s.label}</p>
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </div>
              <p className="text-2xl font-bold text-white mt-2">{s.value}</p>
              <div className="flex items-center gap-1 mt-1">
                {s.up ? <ArrowUpRight className="h-3 w-3 text-primary" /> : <ArrowDownRight className="h-3 w-3 text-red-400" />}
                <span className={`text-xs font-medium ${s.up ? "text-primary" : "text-red-400"}`}>{s.change}</span>
                <span className="text-xs text-muted-foreground ml-1">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-white">Revenue Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] -ml-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00E27A" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#00E27A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" stroke="#94A3B8" tick={{ fill: "#94A3B8", fontSize: 12 }} />
                  <YAxis stroke="#94A3B8" tick={{ fill: "#94A3B8", fontSize: 12 }} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip contentStyle={{ backgroundColor: "#0D1525", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", color: "#fff" }} />
                  <Area type="monotone" dataKey="revenue" stroke="#00E27A" strokeWidth={2} fill="url(#revGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-white">User Growth (Weekly)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] -ml-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="day" stroke="#94A3B8" tick={{ fill: "#94A3B8", fontSize: 12 }} />
                  <YAxis stroke="#94A3B8" tick={{ fill: "#94A3B8", fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: "#0D1525", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", color: "#fff" }} />
                  <Bar dataKey="new" fill="#00E27A" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="churn" fill="#F75555" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-white">Geographic Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {geoData.map((g) => (
              <div key={g.country} className="flex items-center gap-3">
                <div className="w-32 text-sm text-white">{g.country}</div>
                <div className="flex-1 h-2 rounded-full bg-secondary/50 overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${g.pct * 3.4}%` }} />
                </div>
                <div className="w-20 text-right text-sm text-muted-foreground">{g.users.toLocaleString()} users</div>
                <div className="w-12 text-right text-sm text-primary font-semibold">{g.pct}%</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}