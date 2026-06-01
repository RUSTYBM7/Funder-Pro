"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const revenueData = [
  { month: "Jan", revenue: 42000, users: 240 },
  { month: "Feb", revenue: 38000, users: 198 },
  { month: "Mar", revenue: 55000, users: 312 },
  { month: "Apr", revenue: 48000, users: 276 },
  { month: "May", revenue: 62000, users: 398 },
  { month: "Jun", revenue: 71000, users: 445 },
];

const portfolioData = [
  { name: "Stocks", value: 45, color: "#00E27A" },
  { name: "Crypto", value: 25, color: "#3B82F6" },
  { name: "Forex", value: 20, color: "#F59E0B" },
  { name: "Commodities", value: 10, color: "#8B5CF6" },
];

const stats = [
  {
    title: "Total Revenue",
    value: "$328,500",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-400",
  },
  {
    title: "Active Users",
    value: "1,847",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    color: "text-blue-400",
  },
  {
    title: "Win Rate",
    value: "87.3%",
    change: "+2.4%",
    trend: "up",
    icon: Activity,
    color: "text-purple-400",
  },
  {
    title: "Total Deposits",
    value: "$1.2M",
    change: "-3.1%",
    trend: "down",
    icon: Wallet,
    color: "text-orange-400",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Welcome back, Alex</h2>
          <p className="text-muted-foreground">Here&apos;s your portfolio overview</p>
        </div>
        <Select defaultValue="30d">
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="card-glass">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="flex items-center gap-1 mt-1">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-400" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-400" />
                )}
                <span className={stat.trend === "up" ? "text-green-400" : "text-red-400"}>
                  {stat.change}
                </span>
                <span className="text-xs text-muted-foreground ml-1">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="card-glass">
          <CardHeader>
            <CardTitle className="text-white">Revenue Overview</CardTitle>
            <CardDescription className="text-muted-foreground">
              Monthly revenue for the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00E27A" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00E27A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis
                    dataKey="month"
                    stroke="#94A3B8"
                    tick={{ fill: "#94A3B8", fontSize: 12 }}
                  />
                  <YAxis
                    stroke="#94A3B8"
                    tick={{ fill: "#94A3B8", fontSize: 12 }}
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0D1525",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#00E27A"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="card-glass">
          <CardHeader>
            <CardTitle className="text-white">Portfolio Distribution</CardTitle>
            <CardDescription className="text-muted-foreground">
              Your investment allocation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-8">
              <div className="h-[200px] w-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={portfolioData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {portfolioData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0D1525",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3 flex-1">
                {portfolioData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-white">{item.name}</span>
                    </div>
                    <Badge variant="outline">{item.value}%</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="card-glass">
        <CardHeader>
          <CardTitle className="text-white">User Growth</CardTitle>
          <CardDescription className="text-muted-foreground">
            New users registered per month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis
                  dataKey="month"
                  stroke="#94A3B8"
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                />
                <YAxis
                  stroke="#94A3B8"
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0D1525",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  formatter={(value: number) => [value, "Users"]}
                />
                <Bar dataKey="users" fill="#00E27A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}