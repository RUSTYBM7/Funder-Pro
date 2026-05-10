import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="https://funderpro.com/wp-content/themes/funderpro/images/logo.svg" alt="FunderPro" className="h-8" />
        </Link>
        <nav className="hidden md:flex gap-6">
          <div className="group relative">
            <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-white">
              How It Works
            </button>
            <div className="absolute left-0 top-full hidden w-48 pt-2 group-hover:block">
              <div className="rounded-md border border-white/10 bg-card p-2 shadow-xl">
                <Link href="/the-challenge" className="block rounded px-3 py-2 text-sm hover:bg-white/5">The Challenge</Link>
                <Link href="/features" className="block rounded px-3 py-2 text-sm hover:bg-white/5">Features</Link>
                <Link href="/trading-rules" className="block rounded px-3 py-2 text-sm hover:bg-white/5">Trading Rules</Link>
                <Link href="/rewards" className="block rounded px-3 py-2 text-sm hover:bg-white/5">Rewards</Link>
              </div>
            </div>
          </div>
          <div className="group relative">
            <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-white">
              Trading
            </button>
            <div className="absolute left-0 top-full hidden w-48 pt-2 group-hover:block">
              <div className="rounded-md border border-white/10 bg-card p-2 shadow-xl">
                <Link href="/trading-platforms" className="block rounded px-3 py-2 text-sm hover:bg-white/5">Platforms</Link>
                <Link href="/products-and-spreads" className="block rounded px-3 py-2 text-sm hover:bg-white/5">Products & Spreads</Link>
                <Link href="/tools-for-traders" className="block rounded px-3 py-2 text-sm hover:bg-white/5">Tools</Link>
                <Link href="/economic-calendar" className="block rounded px-3 py-2 text-sm hover:bg-white/5">Calendar</Link>
              </div>
            </div>
          </div>
          <Link href="/become-a-funderpro-affiliate" className="text-sm font-medium text-muted-foreground hover:text-white">
            Affiliates
          </Link>
          <div className="group relative">
            <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-white">
              About
            </button>
            <div className="absolute left-0 top-full hidden w-48 pt-2 group-hover:block">
              <div className="rounded-md border border-white/10 bg-card p-2 shadow-xl">
                <Link href="/about-us" className="block rounded px-3 py-2 text-sm hover:bg-white/5">About Us</Link>
                <Link href="/careers" className="block rounded px-3 py-2 text-sm hover:bg-white/5">Careers</Link>
                <Link href="/contact-us" className="block rounded px-3 py-2 text-sm hover:bg-white/5">Contact</Link>
                <Link href="/prop-trading-technology" className="block rounded px-3 py-2 text-sm hover:bg-white/5">Technology</Link>
              </div>
            </div>
          </div>
          <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-white">
            Blog
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <a href="https://prop.funderpro.com/login" target="_blank" rel="noreferrer" className="hidden md:block text-sm font-medium text-muted-foreground hover:text-white">
            Login
          </a>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-full px-6">
            <a href="https://prop.funderpro.com/signup" target="_blank" rel="noreferrer">
              Get Started
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
