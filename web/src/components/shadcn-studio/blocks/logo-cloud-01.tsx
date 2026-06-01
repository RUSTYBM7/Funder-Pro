"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const partners = [
  { name: "Binance", color: "#F3BA2F" },
  { name: "Coinbase", color: "#0052FF" },
  { name: "Kraken", color: "#5741D9" },
  { name: "MetaTrader", color: "#00AEEF" },
  { name: "TradeLocker", color: "#FF6B35" },
  { name: "cTrader", color: "#3FA9F5" },
];

export function LogoCloud() {
  return (
    <Card className="card-glass p-8">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-white mb-2">Trusted Partners</h3>
        <p className="text-sm text-muted-foreground">Leading trading platforms powering your success</p>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-6 items-center justify-items-center">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="group relative flex items-center justify-center w-24 h-12 transition-all duration-300 hover:scale-110"
          >
            <div
              className="w-full h-full rounded-lg bg-muted/20 flex items-center justify-center grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              style={{
                backgroundColor: `${partner.color}15`,
              }}
            >
              <span
                className="text-lg font-bold"
                style={{ color: partner.color }}
              >
                {partner.name.charAt(0)}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2 mt-6">
        {partners.map((partner) => (
          <Badge
            key={partner.name}
            variant="outline"
            className="border-border text-muted-foreground text-xs"
          >
            {partner.name}
          </Badge>
        ))}
      </div>
    </Card>
  );
}

export default LogoCloud;