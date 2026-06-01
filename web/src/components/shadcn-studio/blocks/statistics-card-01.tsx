"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatisticsCardProps {
  icon: LucideIcon;
  value: string;
  title: string;
  changePercentage: string;
}

export function StatisticsCard({ icon: Icon, value, title, changePercentage }: StatisticsCardProps) {
  const isPositive = !changePercentage.startsWith("-");
  const isNeutral = changePercentage === "0%";

  return (
    <Card className="card-glass p-6">
      <div className="flex items-start justify-between">
        <div
          className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center"
        >
          <Icon className="h-6 w-6 text-primary" />
        </div>
        {!isNeutral && (
          <Badge
            variant="outline"
            className={`flex items-center gap-1 border-0 ${
              isPositive ? "bg-primary/20 text-primary" : "bg-red-500/20 text-red-500"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {changePercentage}
          </Badge>
        )}
      </div>

      <div className="mt-4">
        <p className="text-3xl font-bold text-white mb-1">{value}</p>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </Card>
  );
}

export default StatisticsCard;