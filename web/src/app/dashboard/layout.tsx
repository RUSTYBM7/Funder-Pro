"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, MapPin, Settings, FileText, Handshake, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Header from "@/components/layout/header";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/admin", label: "Users", icon: Users },
  { href: "/dashboard/tracking", label: "Tracking", icon: MapPin },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/dashboard/blog", label: "Blog", icon: FileText },
  { href: "/dashboard/partners", label: "Partners", icon: Handshake },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 bottom-0 z-40 flex flex-col border-r border-border bg-card transition-all duration-300",
          collapsed ? "w-[68px]" : "w-[240px]"
        )}
      >
        {/* Sidebar Header */}
        <div className={cn("flex items-center h-16 border-b border-border px-4", collapsed && "justify-center")}>
          {!collapsed && (
            <Link href="/dashboard" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <svg className="w-4.5 h-4.5 text-primary-foreground" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <span className="text-white text-sm font-bold">FunderPro</span>
                <span className="text-primary text-xs font-medium block">Integrations</span>
              </div>
            </Link>
          )}
          {collapsed && (
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <svg className="w-4.5 h-4.5 text-primary-foreground" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-4 px-2 space-y-0.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                    collapsed && "justify-center px-2",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-white hover:bg-secondary"
                  )}
                >
                  <item.icon className={cn("h-4 w-4 flex-shrink-0", isActive && "text-primary")} />
                  {!collapsed && <span>{item.label}</span>}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Collapse toggle */}
        <div className="px-2 pb-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-muted-foreground hover:text-white hover:bg-secondary text-sm transition-colors"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>

        {/* User section */}
        <div className={cn("border-t border-border p-3", collapsed && "flex justify-center")}>
          <div className={cn("flex items-center gap-3", collapsed && "flex-col")}>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">JD</AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white truncate">Jordan Davis</p>
                <p className="text-xs text-muted-foreground truncate">jordan@funderpro.io</p>
              </div>
            )}
            {!collapsed && (
              <button className="text-muted-foreground hover:text-red-400 transition-colors">
                <LogOut className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className={cn("transition-all duration-300", collapsed ? "ml-[68px]" : "ml-[240px]")}>
        <Header />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}