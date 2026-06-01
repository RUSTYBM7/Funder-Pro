"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Clock, FileText, Camera, CreditCard, User, Shield } from "lucide-react";

const kycCases = [
  { id: 1, name: "Lucas Müller", email: "lucas.m@berlintraders.de", country: "DE", level: "Tier 2", status: "pending", submitted: "2 hours ago", docs: ["passport", "selfie", "address_proof"] },
  { id: 2, name: "Ravi Kumar", email: "ravi.k@mumbaifx.in", country: "IN", level: "Tier 2", status: "pending", submitted: "5 hours ago", docs: ["id_card", "selfie", "address_proof"] },
  { id: 3, name: "Marie Dubois", email: "marie.d@paristraders.fr", country: "FR", level: "Tier 3", status: "pending", submitted: "1 day ago", docs: ["passport", "selfie", "address_proof", "source_of_funds"] },
  { id: 4, name: "Chen Wei", email: "chen.w@shanghaicap.cn", country: "CN", level: "Tier 2", status: "approved", submitted: "2 days ago", docs: ["passport", "selfie", "address_proof"] },
  { id: 5, name: "Diego Silva", email: "diego.s@saopaulo.br", country: "BR", level: "Tier 2", status: "rejected", submitted: "3 days ago", docs: ["id_card"] },
  { id: 6, name: "Anna Kowalski", email: "anna.k@warsawtrade.pl", country: "PL", level: "Tier 2", status: "pending", submitted: "4 hours ago", docs: ["passport", "selfie", "address_proof"] },
];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  approved: "bg-primary/15 text-primary border-primary/30",
  rejected: "bg-red-500/15 text-red-400 border-red-500/30",
};

export default function KycPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">KYC Verification</h1>
        <p className="text-muted-foreground text-sm mt-1">Review and approve identity verification submissions</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Pending Review", value: "47", color: "text-yellow-400", icon: Clock },
          { label: "Approved Today", value: "23", color: "text-primary", icon: CheckCircle2 },
          { label: "Rejected", value: "5", color: "text-red-400", icon: XCircle },
          { label: "Avg. Review Time", value: "2.4h", color: "text-blue-400", icon: FileText },
        ].map((s) => (
          <Card key={s.label} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{s.label}</p>
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </div>
              <p className={`text-2xl font-bold mt-2 ${s.color}`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-white">Verification Queue</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {kycCases.map((c) => (
            <div key={c.id} className="flex items-center justify-between px-4 py-4 border-b border-border/40 hover:bg-secondary/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold">
                  {c.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.email} · {c.country}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <Badge variant="outline" className="border-border text-muted-foreground">{c.level}</Badge>
                  <p className="text-xs text-muted-foreground mt-1">{c.docs.length} docs</p>
                </div>
                <div className="text-right min-w-[100px]">
                  <Badge className={statusColors[c.status]} variant="outline">{c.status}</Badge>
                  <p className="text-xs text-muted-foreground mt-1">{c.submitted}</p>
                </div>
                <div className="flex items-center gap-2">
                  {c.status === "pending" ? (
                    <>
                      <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                        <CheckCircle2 className="h-4 w-4 mr-1" /> Approve
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-500/30 text-red-400">
                        <XCircle className="h-4 w-4 mr-1" /> Reject
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" variant="ghost">View Details</Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}