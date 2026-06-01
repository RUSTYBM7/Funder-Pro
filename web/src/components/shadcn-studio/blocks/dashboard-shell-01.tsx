"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  MapPin,
  Settings,
  FileText,
  Building2,
  TrendingUp,
  Bell,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/admin", label: "Users", icon: Users },
  { href: "/dashboard/tracking", label: "Tracking", icon: MapPin },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/dashboard/blog", label: "Blog", icon: FileText },
  { href: "/dashboard/partners", label: "Partners", icon: Building2 },
];

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-[220px] flex flex-col fixed inset-y-0 z-50 hidden lg:flex">
        <div className="card-glass flex flex-col h-full">
          <div className="p-6 border-b border-border">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h2 className="font-bold text-white">FunderPro</h2>
                <p className="text-xs text-muted-foreground">Integrations</p>
              </div>
            </Link>
          </div>

          <ScrollArea className="flex-1 p-4">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                        isActive
                          ? "bg-primary/20 text-primary"
                          : "text-muted-foreground hover:bg-secondary hover:text-white"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </div>
                  </Link>
                );
              })}
            </nav>
          </ScrollArea>

          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">All systems operational</span>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 lg:ml-[220px]">
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="flex items-center justify-between px-4 py-3">
            <div>
              <h1 className="text-lg font-semibold text-white">
                {navItems.find((n) => n.href === pathname)?.label || "Dashboard"}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button className="relative p-2 text-muted-foreground hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
              </button>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}

export default DashboardShell;