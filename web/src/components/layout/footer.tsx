import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-bold text-white">FunderPro</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Trading Platform Integration Solutions for Professional Traders
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
              <li><Link href="/dashboard/tracking" className="hover:text-primary transition-colors">Tracking</Link></li>
              <li><Link href="/dashboard/partners" className="hover:text-primary transition-colors">Partners</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/dashboard/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">API Reference</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Risk Disclosure</Link></li>
            </ul>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 FunderPro Integrations. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Status
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}