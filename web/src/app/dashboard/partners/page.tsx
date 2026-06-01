"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const partners = [
  {
    name: "MetaTrader 5",
    logo: "MT5",
    description: "Industry-leading trading platform with advanced charting and automated trading capabilities",
    status: "Active",
    category: "Platform",
  },
  {
    name: "TradingView",
    logo: "TV",
    description: "Premium charting and social trading platform with millions of active traders",
    status: "Active",
    category: "Platform",
  },
  {
    name: "Binance",
    logo: "BN",
    description: "Leading cryptocurrency exchange for crypto asset trading integration",
    status: "Active",
    category: "Exchange",
  },
  {
    name: "Coinbase",
    logo: "CB",
    description: "Regulated US-based cryptocurrency exchange with secure custody solutions",
    status: "Active",
    category: "Exchange",
  },
  {
    name: "FXCM",
    logo: "FX",
    description: "International forex broker providing institutional-grade liquidity",
    status: "Active",
    category: "Broker",
  },
  {
    name: "Interactive Brokers",
    logo: "IB",
    description: "Global brokerage firm offering multi-asset trading across 135 markets",
    status: "Active",
    category: "Broker",
  },
  {
    name: "Trading Central",
    logo: "TC",
    description: "Award-winning technical analysis and fundamental research provider",
    status: "Active",
    category: "Research",
  },
  {
    name: "cTrader",
    logo: "cT",
    description: "Professional forex and CFD trading platform with advanced order execution",
    status: "Active",
    category: "Platform",
  },
  {
    name: "TipRanks",
    logo: "TR",
    description: "Investment research platform providing analyst ratings and portfolio analysis",
    status: "Active",
    category: "Research",
  },
  {
    name: "Kaiko",
    logo: "KK",
    description: "Institutional-grade cryptocurrency market data and analytics",
    status: "Active",
    category: "Data",
  },
  {
    name: "LMAX Exchange",
    logo: "LM",
    description: "Multi-asset exchange for institutional trading with ultra-low latency",
    status: "Active",
    category: "Exchange",
  },
  {
    name: "Refinitiv",
    logo: "RF",
    description: "Financial data and infrastructure provider powering global markets",
    status: "Active",
    category: "Data",
  },
];

const categories = ["All", "Platform", "Exchange", "Broker", "Research", "Data"];

export default function PartnersPage() {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const filteredPartners = selectedCategory === "All"
    ? partners
    : partners.filter((p) => p.category === selectedCategory);

  return (
    
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Integration Partners</h2>
            <p className="text-muted-foreground">Trusted platforms and services integrated with FunderPro</p>
          </div>
          <Badge variant="success" className="text-sm">
            {partners.length} Active Partners
          </Badge>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-colors",
                selectedCategory === category && "bg-primary text-primary-foreground"
              )}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPartners.map((partner) => (
            <Card key={partner.name} className="card-glass overflow-hidden group hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">{partner.logo}</span>
                  </div>
                  <Badge variant="success" className="text-xs">
                    {partner.status}
                  </Badge>
                </div>
                <h3 className="font-bold text-white mb-1">{partner.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{partner.description}</p>
                <Badge variant="outline" className="text-xs">
                  {partner.category}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="card-glass">
          <CardHeader>
            <CardTitle className="text-white">Become a Partner</CardTitle>
            <CardDescription className="text-muted-foreground">
              Interested in integrating with FunderPro? We&apos;re always looking for new partnerships.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Contact our partnerships team at{" "}
              <span className="text-primary">partners@funderpro.com</span> to learn more about our integration program.
            </p>
          </CardContent>
        </Card>
      </div>
    
  );
}