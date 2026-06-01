"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface Platform {
  name: string;
  techStack: string;
  earnings: string;
  progress: number;
  color: string;
}

const platforms: Platform[] = [
  { name: "Zipcar", techStack: "Vue.js", earnings: "$23,450", progress: 75, color: "#42B883" },
  { name: "Bitbank", techStack: "Figma", earnings: "$12,890", progress: 25, color: "#F24E1E" },
  { name: "Aviato", techStack: "HTML/CSS", earnings: "$55,120", progress: 50, color: "#E34F26" },
];

export function WidgetComponent() {
  return (
    <Card className="card-glass p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Earnings by Platform</h3>
          <p className="text-sm text-muted-foreground">Your trading earnings breakdown</p>
        </div>
        <Badge className="bg-primary/20 text-primary border-0">
          Total: $91,460
        </Badge>
      </div>

      <div className="space-y-5">
        {platforms.map((platform) => (
          <div key={platform.name} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${platform.color}20` }}
                >
                  <span
                    className="text-sm font-bold"
                    style={{ color: platform.color }}
                  >
                    {platform.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-white">{platform.name}</p>
                  <p className="text-xs text-muted-foreground">{platform.techStack}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-white">{platform.earnings}</p>
                <p className="text-xs text-muted-foreground">{platform.progress}% volume</p>
              </div>
            </div>
            <Progress
              value={platform.progress}
              className="h-2 bg-secondary"
              style={{
                "--progress-foreground": platform.color,
              } as React.CSSProperties}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}

export default WidgetComponent;