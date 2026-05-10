import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background pt-16 pb-8">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-1">
            <img src="https://funderpro.com/wp-content/themes/funderpro/images/logo.svg" alt="FunderPro" className="h-8 mb-6" />
            <p className="text-sm text-muted-foreground mb-6">
              Empowering traders worldwide with premium funded accounts and cutting-edge technology.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/about-us" className="hover:text-white">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
              <li><Link href="/contact-us" className="hover:text-white">Contact</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Trading</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/the-challenge" className="hover:text-white">The Challenge</Link></li>
              <li><Link href="/trading-rules" className="hover:text-white">Trading Rules</Link></li>
              <li><Link href="/products-and-spreads" className="hover:text-white">Spreads</Link></li>
              <li><Link href="/trading-platforms" className="hover:text-white">Platforms</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/tools-for-traders" className="hover:text-white">Tools</Link></li>
              <li><Link href="/economic-calendar" className="hover:text-white">Calendar</Link></li>
              <li><Link href="/become-a-funderpro-affiliate" className="hover:text-white">Affiliates</Link></li>
              <li><Link href="/rewards" className="hover:text-white">Rewards</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mt-8 text-xs text-muted-foreground space-y-4">
          <p>
            FunderPro is a proprietary trading firm. Trading involves substantial risk of loss and is not appropriate for every investor. Past performance is not necessarily indicative of future results. FunderPro does not provide investment advice.
          </p>
          <div className="flex justify-between items-center pt-4">
            <p>© 2024 FunderPro. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
