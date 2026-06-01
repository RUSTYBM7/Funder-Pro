import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Twitter, Linkedin, Send } from "lucide-react";

const footerLinks = {
  platform: [
    { label: "About", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Support", href: "#" },
  ],
  social: [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Send, href: "#", label: "Telegram" },
  ],
};

export function DashboardFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-white">FunderPro</h3>
              <p className="text-xs text-muted-foreground">Integrations</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            {footerLinks.platform.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {footerLinks.social.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
              >
                <social.icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 FunderPro Integrations. All rights reserved.
          </p>
          <p className="text-sm text-primary font-medium">
            Trade With Confidence
          </p>
        </div>
      </div>
    </footer>
  );
}

export default DashboardFooter;