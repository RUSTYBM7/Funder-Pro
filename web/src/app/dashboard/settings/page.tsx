"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Camera, Save, Bell, Lock, Shield, Smartphone, CheckCircle2, Mail, Key, Globe } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your account preferences and security</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="bg-card border border-border">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-4 space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-white">Profile Information</CardTitle>
              <CardDescription className="text-muted-foreground">Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="bg-primary/20 text-primary text-2xl font-bold">JD</AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    <Camera className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Jordan Davis</p>
                  <p className="text-xs text-muted-foreground">Pro Trader · ID: FP-7842</p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">First Name</Label>
                  <Input defaultValue="Jordan" className="bg-secondary/50 border-border" />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Last Name</Label>
                  <Input defaultValue="Davis" className="bg-secondary/50 border-border" />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Email</Label>
                  <Input defaultValue="jordan@funderpro.io" type="email" className="bg-secondary/50 border-border" />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Phone</Label>
                  <Input defaultValue="+44 7700 900123" className="bg-secondary/50 border-border" />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Country</Label>
                  <Input defaultValue="United Kingdom" className="bg-secondary/50 border-border" />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Time Zone</Label>
                  <Input defaultValue="Europe/London (GMT+0)" className="bg-secondary/50 border-border" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Save className="h-4 w-4 mr-2" /> Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4 space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-white">Email Notifications</CardTitle>
              <CardDescription className="text-muted-foreground">Choose what updates you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "Trade confirmations", desc: "Order fills and trade execution", defaultOn: true },
                { title: "Price alerts", desc: "Get notified when assets hit target prices", defaultOn: true },
                { title: "Account activity", desc: "Login, password changes, security events", defaultOn: true },
                { title: "Marketing & news", desc: "Product updates and market insights", defaultOn: false },
                { title: "Weekly performance", desc: "Receive weekly portfolio summary", defaultOn: true },
              ].map((n) => (
                <div key={n.title} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-white">{n.title}</p>
                    <p className="text-xs text-muted-foreground">{n.desc}</p>
                  </div>
                  <Switch defaultChecked={n.defaultOn} />
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-white">Push Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "Push to mobile app", desc: "Instant mobile push notifications", defaultOn: true },
                { title: "Browser notifications", desc: "Desktop alerts when trading", defaultOn: false },
                { title: "SMS critical alerts", desc: "Security and large trade alerts", defaultOn: true },
              ].map((n) => (
                <div key={n.title} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-white">{n.title}</p>
                    <p className="text-xs text-muted-foreground">{n.desc}</p>
                  </div>
                  <Switch defaultChecked={n.defaultOn} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-4 space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-white">Password</CardTitle>
              <CardDescription className="text-muted-foreground">Last changed 14 days ago</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Current Password</Label>
                <Input type="password" placeholder="••••••••" className="bg-secondary/50 border-border" />
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">New Password</Label>
                <Input type="password" placeholder="••••••••" className="bg-secondary/50 border-border" />
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Confirm New Password</Label>
                <Input type="password" placeholder="••••••••" className="bg-secondary/50 border-border" />
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Update Password</Button>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-white">Two-Factor Authentication</CardTitle>
              <CardDescription className="text-muted-foreground">Add an extra layer of security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { title: "Authenticator App", desc: "Google Authenticator / Authy", enabled: true, icon: Smartphone },
                { title: "SMS Verification", desc: "Codes sent to your phone", enabled: true, icon: Smartphone },
                { title: "Hardware Key (U2F)", desc: "YubiKey or similar device", enabled: false, icon: Key },
                { title: "Backup Codes", desc: "8 single-use recovery codes", enabled: true, icon: Shield },
              ].map((m) => (
                <div key={m.title} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
                      <m.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{m.title}</p>
                      <p className="text-xs text-muted-foreground">{m.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {m.enabled && <Badge className="bg-primary/15 text-primary border-primary/30">Enabled</Badge>}
                    <Switch defaultChecked={m.enabled} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-white">Active Sessions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { device: "MacBook Pro · Chrome", location: "London, UK", current: true, time: "Active now" },
                { device: "iPhone 15 · iOS App", location: "London, UK", current: false, time: "2 hours ago" },
                { device: "iPad · Safari", location: "Cardiff, UK", current: false, time: "Yesterday" },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border">
                  <div>
                    <p className="text-sm font-medium text-white">{s.device} {s.current && <Badge className="ml-2 bg-primary/15 text-primary border-primary/30">This device</Badge>}</p>
                    <p className="text-xs text-muted-foreground">{s.location} · {s.time}</p>
                  </div>
                  {!s.current && <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">Revoke</Button>}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="mt-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-white">Display & Language</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "Dark mode", desc: "Use dark theme across the platform", defaultOn: true, icon: Globe },
                { title: "Compact view", desc: "Reduce spacing in tables and lists", defaultOn: false, icon: Globe },
                { title: "Show balances", desc: "Display portfolio value on dashboard", defaultOn: true, icon: Globe },
                { title: "Hide testnet assets", desc: "Only show mainnet balances", defaultOn: true, icon: Globe },
              ].map((p) => (
                <div key={p.title} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-white">{p.title}</p>
                    <p className="text-xs text-muted-foreground">{p.desc}</p>
                  </div>
                  <Switch defaultChecked={p.defaultOn} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}