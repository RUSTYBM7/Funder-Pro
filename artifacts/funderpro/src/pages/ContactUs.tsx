import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, MessageCircle, Clock } from "lucide-react";

export default function ContactUs() {
  return (
    <Layout>
      <div className="pt-24 pb-20 bg-background">
        <div className="container max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have a question? Our support team is here to help you 24/7.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 mb-24">
            <div>
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">First Name</label>
                    <Input placeholder="John" className="bg-card border-white/10 focus-visible:ring-primary h-12" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Last Name</label>
                    <Input placeholder="Doe" className="bg-card border-white/10 focus-visible:ring-primary h-12" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <Input type="email" placeholder="john@example.com" className="bg-card border-white/10 focus-visible:ring-primary h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Subject</label>
                  <select className="flex h-12 w-full items-center justify-between rounded-md border border-white/10 bg-card px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white">
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing & Payouts</option>
                    <option value="partnership">Partnerships</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Message</label>
                  <Textarea placeholder="How can we help you?" className="bg-card border-white/10 focus-visible:ring-primary min-h-[150px]" />
                </div>
                <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 h-12">
                  Send Message
                </Button>
              </form>
            </div>

            <div className="space-y-8">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="bg-card p-6 rounded-2xl border border-white/10 flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email Support</h3>
                  <p className="text-muted-foreground mb-2">For general inquiries and detailed support requests.</p>
                  <a href="mailto:support@funderpro.com" className="text-primary font-medium hover:underline">support@funderpro.com</a>
                </div>
              </div>

              <div className="bg-card p-6 rounded-2xl border border-white/10 flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Live Chat</h3>
                  <p className="text-muted-foreground mb-2">Fastest response time. Available directly in your dashboard.</p>
                  <span className="text-white font-medium">Average response: &lt; 3 minutes</span>
                </div>
              </div>

              <div className="bg-card p-6 rounded-2xl border border-white/10 flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Business Hours</h3>
                  <p className="text-muted-foreground">Our support team operates globally to ensure continuous coverage.</p>
                  <span className="text-white font-medium">24/7 / 365 Days a year</span>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-white/10">
                <AccordionTrigger className="text-lg hover:text-primary transition-colors">How long does a payout take?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  Once requested, payouts are typically processed within 24 hours. Depending on your chosen withdrawal method (Crypto, Deel, etc.), the funds will reflect in your account shortly after processing.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-white/10">
                <AccordionTrigger className="text-lg hover:text-primary transition-colors">Are there any hidden fees?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  No. The fee you pay for the challenge is the only fee you will ever pay. There are no recurring monthly platform fees or hidden data fees. The challenge fee is also fully refundable with your first payout.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-white/10">
                <AccordionTrigger className="text-lg hover:text-primary transition-colors">Can I use an Expert Advisor (EA)?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  Yes, EAs and trading bots are allowed, provided they do not execute prohibited strategies like high-frequency trading (HFT), arbitrage, or tick scalping.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border-white/10">
                <AccordionTrigger className="text-lg hover:text-primary transition-colors">What happens if I breach a rule?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  If a rule is breached (such as hitting the daily loss limit), the account is immediately disabled. You will need to purchase a new challenge to try again.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </Layout>
  );
}
