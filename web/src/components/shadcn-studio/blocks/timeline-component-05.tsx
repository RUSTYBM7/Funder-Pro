"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Circle, CheckCircle } from "lucide-react";

interface TimelineStep {
  title: string;
  description: string;
  timestamp: string;
}

interface TimelineComponentProps {
  currentStep?: number;
}

const steps: TimelineStep[] = [
  {
    title: "Account Created",
    description: "Your FunderPro account has been successfully created",
    timestamp: "Mar 1, 2026 - 09:00 AM",
  },
  {
    title: "Identity Verified",
    description: "KYC verification completed successfully",
    timestamp: "Mar 2, 2026 - 02:30 PM",
  },
  {
    title: "First Deposit",
    description: "Initial deposit of $5,000 processed",
    timestamp: "Mar 5, 2026 - 11:15 AM",
  },
  {
    title: "Challenge Started",
    description: "Phase 1 trading challenge initiated",
    timestamp: "Mar 6, 2026 - 10:00 AM",
  },
  {
    title: "Funded Account",
    description: "Congratulations! You are now a funded trader",
    timestamp: "Mar 15, 2026 - 03:45 PM",
  },
];

export function TimelineComponent({ currentStep = 4 }: TimelineComponentProps) {
  return (
    <Card className="card-glass p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-1">Trading Progress</h3>
        <p className="text-sm text-muted-foreground">Track your path to becoming a funded trader</p>
      </div>

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-secondary" />

        <div className="space-y-6">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isPending = index > currentStep;

            return (
              <div key={index} className="relative flex items-start gap-4">
                <div
                  className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                    isCompleted
                      ? "bg-primary/20"
                      : isCurrent
                      ? "bg-primary animate-pulse"
                      : "bg-secondary"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="h-6 w-6 text-primary" />
                  ) : isCurrent ? (
                    <Circle className="h-6 w-6 text-primary-foreground" />
                  ) : (
                    <Circle className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>

                <div className={`flex-1 pt-1 ${isPending ? "opacity-50" : ""}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <h4
                      className={`font-medium ${
                        isCurrent ? "text-primary" : isCompleted ? "text-white" : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </h4>
                    {isCurrent && (
                      <Badge className="bg-primary text-primary-foreground text-xs">Current</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{step.description}</p>
                  <p className="text-xs text-muted-foreground">{step.timestamp}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

export default TimelineComponent;