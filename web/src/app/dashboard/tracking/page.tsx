"use client";

import * as React from "react";
import DashboardLayout from "@/app/dashboard/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  Check,
  Circle,
  Clock,
  Package,
  MapPin,
  FileCheck,
  Truck,
  AlertCircle,
} from "lucide-react";

const timelineEvents = [
  {
    id: 1,
    title: "Account Activated",
    description: "Your FunderPro trading account has been fully activated and is ready for use",
    time: "Today, 09:41 AM",
    status: "completed",
    icon: Check,
  },
  {
    id: 2,
    title: "Identity Verification Complete",
    description: "KYC documents verified and approved by compliance team",
    time: "Yesterday, 04:23 PM",
    status: "completed",
    icon: FileCheck,
  },
  {
    id: 3,
    title: "Initial Deposit Received",
    description: "Initial deposit of $50,000 USD received and credited to your account",
    time: "Yesterday, 02:15 PM",
    status: "completed",
    icon: Package,
  },
  {
    id: 4,
    title: "Trading Platform Access Granted",
    description: "Access to MetaTrader 5 and TradingView integrated successfully",
    time: "Mar 18, 2026, 11:30 AM",
    status: "completed",
    icon: Circle,
  },
  {
    id: 5,
    title: "Risk Assessment Completed",
    description: "Your trading profile has been configured based on your risk tolerance questionnaire",
    time: "Mar 18, 2026, 10:45 AM",
    status: "completed",
    icon: Check,
  },
  {
    id: 6,
    title: "Document Review in Progress",
    description: "Our compliance team is reviewing your submitted documents",
    time: "Mar 17, 2026, 03:20 PM",
    status: "in_progress",
    icon: Clock,
  },
  {
    id: 7,
    title: "Shipping in Transit",
    description: "Physical trading tokens and welcome kit are on the way to your registered address",
    time: "Mar 16, 2026, 09:00 AM",
    status: "pending",
    icon: Truck,
  },
  {
    id: 8,
    title: "Account Setup Complete",
    description: "Personal details and trading preferences have been configured",
    time: "Mar 15, 2026, 02:30 PM",
    status: "completed",
    icon: Check,
  },
  {
    id: 9,
    title: "Welcome Package Dispatched",
    description: "Your welcome package has been dispatched from our distribution center",
    time: "Mar 15, 2026, 11:00 AM",
    status: "completed",
    icon: Package,
  },
  {
    id: 10,
    title: "Registration Submitted",
    description: "Your account registration has been received and is being processed",
    time: "Mar 14, 2026, 04:45 PM",
    status: "completed",
    icon: AlertCircle,
  },
];

export default function TrackingPage() {
  const completedCount = timelineEvents.filter((e) => e.status === "completed").length;
  const progress = (completedCount / timelineEvents.length) * 100;

  return (
    
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Account Activation</h2>
            <p className="text-muted-foreground">Track your account setup progress</p>
          </div>
          <Badge variant="success" className="text-sm px-3 py-1">
            {completedCount}/{timelineEvents.length} Steps Complete
          </Badge>
        </div>

        <Card className="card-glass">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Activation Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Overall Progress</span>
                <span className="text-white font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="space-y-4">
              {timelineEvents.map((event, index) => (
                <div key={event.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center border-2",
                        event.status === "completed" && "bg-primary/20 border-primary text-primary",
                        event.status === "in_progress" && "bg-blue-500/20 border-blue-500 text-blue-500 animate-pulse",
                        event.status === "pending" && "bg-secondary border-border text-muted-foreground"
                      )}
                    >
                      <event.icon className="w-5 h-5" />
                    </div>
                    {index < timelineEvents.length - 1 && (
                      <div
                        className={cn(
                          "w-0.5 flex-1 my-2",
                          timelineEvents[index + 1].status === "completed" ? "bg-primary" : "bg-border"
                        )}
                      />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p
                          className={cn(
                            "font-medium",
                            event.status === "completed" || event.status === "in_progress"
                              ? "text-white"
                              : "text-muted-foreground"
                          )}
                        >
                          {event.title}
                        </p>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {event.time}
                      </span>
                    </div>
                    {event.status === "in_progress" && (
                      <Badge variant="warning" className="mt-2">
                        In Progress
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="card-glass">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-white">2 Days</div>
              <p className="text-sm text-muted-foreground">Average Activation Time</p>
            </CardContent>
          </Card>
          <Card className="card-glass">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-white">10</div>
              <p className="text-sm text-muted-foreground">Total Steps Completed</p>
            </CardContent>
          </Card>
          <Card className="card-glass">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-400">Active</div>
              <p className="text-sm text-muted-foreground">Account Status</p>
            </CardContent>
          </Card>
        </div>
      </div>
    
  );
}