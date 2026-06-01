"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CheckCircle2, Circle, Clock, Upload, CreditCard, FileText, User, Mail, Phone, MapPin, Camera } from "lucide-react";

const steps = [
  { id: 1, title: "Email Verification", desc: "Verify your email address", status: "complete", icon: Mail },
  { id: 2, title: "Phone Verification", desc: "Add and verify your phone number", status: "complete", icon: Phone },
  { id: 3, title: "Identity Document", desc: "Upload government-issued ID", status: "complete", icon: FileText },
  { id: 4, title: "Selfie Verification", desc: "Take a selfie holding your ID", status: "in_progress", icon: Camera },
  { id: 5, title: "Proof of Address", desc: "Upload utility bill or bank statement", status: "pending", icon: MapPin },
  { id: 6, title: "Funding Source", desc: "Link bank account or card", status: "pending", icon: CreditCard },
  { id: 7, title: "Trading Agreement", desc: "Accept terms and conditions", status: "pending", icon: User },
];

export default function AccountPage() {
  const completed = steps.filter(s => s.status === "complete").length;
  const progress = (completed / steps.length) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Account Setup</h1>
        <p className="text-muted-foreground text-sm mt-1">Complete your profile to unlock full platform access</p>
      </div>

      <Card className="bg-gradient-to-br from-primary/10 to-card border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-muted-foreground">Setup Progress</p>
              <p className="text-2xl font-bold text-white mt-1">{completed} of {steps.length} complete</p>
            </div>
            <Badge className="bg-primary/20 text-primary border-primary/30">{Math.round(progress)}%</Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-white">Verification Steps</CardTitle>
          <CardDescription className="text-muted-foreground">Complete each step to enable all features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {steps.map((step) => (
              <div key={step.id} className={`flex items-center gap-4 p-4 rounded-lg border ${
                step.status === "complete" ? "bg-primary/5 border-primary/20" :
                step.status === "in_progress" ? "bg-yellow-500/5 border-yellow-500/30" :
                "bg-secondary/30 border-border"
              }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step.status === "complete" ? "bg-primary text-primary-foreground" :
                  step.status === "in_progress" ? "bg-yellow-500/20 text-yellow-400" :
                  "bg-secondary text-muted-foreground"
                }`}>
                  {step.status === "complete" ? <CheckCircle2 className="h-5 w-5" /> :
                   step.status === "in_progress" ? <Clock className="h-5 w-5" /> :
                   <Circle className="h-5 w-5" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-white">{step.title}</p>
                    {step.status === "in_progress" && <Badge className="bg-yellow-500/15 text-yellow-400 border-yellow-500/30">In Review</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground">{step.desc}</p>
                </div>
                <step.icon className="h-5 w-5 text-muted-foreground" />
                <Button size="sm" variant={step.status === "complete" ? "ghost" : "outline"} className={step.status !== "complete" ? "border-border" : ""}>
                  {step.status === "complete" ? "View" : step.status === "in_progress" ? "Check Status" : "Start"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-white">Account Tier Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { tier: "Tier 1", current: true, limit: "$10,000", features: ["Basic trading", "Email support", "Standard leverage"] },
              { tier: "Tier 2", current: false, limit: "$100,000", features: ["Advanced orders", "Priority support", "Higher leverage"] },
              { tier: "Tier 3", current: false, limit: "Unlimited", features: ["All features", "Dedicated manager", "API access"] },
            ].map((t) => (
              <div key={t.tier} className={`p-4 rounded-lg border ${t.current ? "bg-primary/5 border-primary/30" : "bg-secondary/30 border-border"}`}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-bold text-white">{t.tier}</p>
                  {t.current && <Badge className="bg-primary/20 text-primary border-primary/30">Current</Badge>}
                </div>
                <p className="text-2xl font-bold text-white mb-3">{t.limit}</p>
                <ul className="space-y-1">
                  {t.features.map((f) => (
                    <li key={f} className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <CheckCircle2 className="h-3 w-3 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}