"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import LanguageDropdown from "@/components/shadcn-studio/blocks/dropdown-language";
import { cn } from "@/lib/utils";
import { Languages, Settings, LogOut, User } from "lucide-react";

const navLinks = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/admin", label: "Users" },
  { href: "/dashboard/tracking", label: "Tracking" },
  { href: "/dashboard/blog", label: "Blog" },
  { href: "/dashboard/partners", label: "Partners" },
  { href: "/dashboard/settings", label: "Settings" },
];

export default function Header() {
  const pathname = usePathname();

  const getBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean);
    return segments.map((segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/");
      const label = segment.charAt(0).toUpperCase() + segment.slice(1);
      return { href, label, isLast: index === segments.length - 1 };
    });
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-foreground" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <span className="font-bold text-white text-sm">FunderPro</span>
                <span className="text-primary text-sm font-medium ml-1">Integrations</span>
              </div>
            </Link>

            {/* Nav */}
            <nav className="hidden lg:flex items-center gap-0.5 ml-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "text-xs h-8 px-3",
                      pathname === link.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-white"
                    )}
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <LanguageDropdown
              trigger={
                <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-white">
                  <Languages className="h-4 w-4" />
                </Button>
              }
            />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0 hover:bg-secondary">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 card-glass" align="end">
                <div className="flex items-center justify-start gap-3 p-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/20 text-primary font-bold">JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-white">Jordan Davis</span>
                    <span className="text-xs text-muted-foreground">jordan@funderpro.io</span>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-400 focus:text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {breadcrumbs.length > 1 && (
          <div className="pb-3">
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => (
                  <BreadcrumbItem key={crumb.href}>
                    {index > 0 && <BreadcrumbSeparator />}
                    {crumb.isLast ? (
                      <BreadcrumbPage className="text-white text-sm">{crumb.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={crumb.href} className="text-muted-foreground text-sm">
                        {crumb.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        )}
      </div>
    </header>
  );
}