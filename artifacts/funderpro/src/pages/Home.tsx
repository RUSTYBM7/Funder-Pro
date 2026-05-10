import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { CheckCircle2, TrendingUp, Shield, Zap, ChevronRight, Play, Gift, Award, Trophy, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const certificates = [
  { name: "James K.", amount: "$12,450" },
  { name: "Maria L.", amount: "$8,200" },
  { name: "Ahmed R.", amount: "$31,000" },
  { name: "Sophie T.", amount: "$5,600" },
  { name: "Carlos M.", amount: "$18,900" },
  { name: "Priya N.", amount: "$7,350" },
  { name: "David W.", amount: "$42,000" },
  { name: "Aisha B.", amount: "$9,800" },
  { name: "Tom F.", amount: "$15,600" },
  { name: "Lisa S.", amount: "$6,100" },
  { name: "Omar K.", amount: "$28,500" },
  { name: "Emma D.", amount: "$11,200" },
  { name: "Ryan C.", amount: "$5,900" }
];

const testimonials = [
  { name: "James K.", location: "London", amount: "$50,000 funded" },
  { name: "Maria L.", location: "Madrid", amount: "$100,000 funded" },
  { name: "Ahmed R.", location: "Dubai", amount: "$25,000 funded" },
  { name: "Sophie T.", location: "Paris", amount: "$75,000 funded" },
  { name: "Carlos M.", location: "NYC", amount: "$200,000 funded" },
  { name: "Priya N.", location: "Singapore", amount: "$50,000 funded" }
];

export default function Home() {
  return (
    <Layout>
      {/* Section 1: Hero */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0 bg-background">
          <div className="absolute inset-0 bg-background/80 z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-20" />
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover opacity-60"
            src="https://funderpro.com/wp-content/uploads/2024/03/FunderPro-Hero-Video-V2.webm"
          />
        </div>
        
        <div className="container relative z-30 pt-10 pb-20 text-center flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Now funding up to $200,000
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 text-white leading-[1.1]"
          >
            Trade With <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#00FF85]">Our Capital</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 font-medium"
          >
            Join thousands of funded traders. Start your challenge today.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 text-sm md:text-base mb-12 max-w-4xl"
          >
            {[
              "Up to $200,000 in funded capital",
              "Up to 90% profit split",
              "No time limits on challenges",
              "Daily payouts available"
            ].map(benefit => (
              <div key={benefit} className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/10 font-medium">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>{benefit}</span>
              </div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <Button size="lg" asChild className="text-lg px-10 py-7 rounded-full font-bold bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto shadow-[0_0_30px_rgba(0,226,122,0.3)] hover:shadow-[0_0_40px_rgba(0,226,122,0.5)] transition-all transition-duration-300">
              <a href="https://prop.funderpro.com/signup" target="_blank" rel="noreferrer">Get Funded Now</a>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-10 py-7 rounded-full font-bold border-white/20 bg-background/50 hover:bg-white/10 w-full sm:w-auto backdrop-blur-sm">
              <Link href="/the-challenge">Learn More</Link>
            </Button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 flex flex-col items-center gap-6"
          >
            <div className="flex items-center gap-2">
              <div className="flex text-[#00b67a]">
                {[1, 2, 3, 4, 5].map(star => (
                  <svg key={star} viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M12 0l3.708 7.514 8.292 1.204-6 5.848 1.416 8.258L12 18.896l-7.416 3.928L6 14.566 0 8.718l8.292-1.204L12 0z"/>
                  </svg>
                ))}
              </div>
              <span className="font-semibold">Trustpilot</span>
            </div>
            
            <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-2">Available Platforms</div>
            <div className="flex items-center gap-8 opacity-60">
              <span className="font-bold text-xl">MetaTrader 4</span>
              <span className="font-bold text-xl">MetaTrader 5</span>
              <span className="font-bold text-xl">cTrader</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Payout Certificates Marquee */}
      <section className="py-12 bg-card border-y border-white/5 overflow-hidden flex flex-col justify-center">
        <div className="text-center mb-8">
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Recent Trader Payouts</h2>
        </div>
        <div className="relative w-full flex overflow-x-hidden group">
          <div className="animate-marquee whitespace-nowrap flex gap-4 py-4 px-2">
            {[...certificates, ...certificates, ...certificates].map((cert, i) => (
              <div key={i} className="inline-flex items-center gap-4 bg-background px-6 py-4 rounded-xl border border-white/10 shadow-lg min-w-[280px]">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                  <span className="text-primary font-bold">{cert.name.charAt(0)}</span>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground font-medium">{cert.name}</div>
                  <div className="text-xl font-bold text-white">{cert.amount}</div>
                </div>
                <div className="ml-auto">
                  <img src="https://funderpro.com/wp-content/themes/funderpro/images/logo.svg" alt="FunderPro" className="h-4 opacity-50" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Two Paths */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Choose Your Path to Funding</h2>
            <p className="text-xl text-muted-foreground">Whether you want to prove your skills or get funded instantly, we have a path for you.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="bg-card border-white/10 hover:border-primary/50 transition-colors duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <TrendingUp className="w-24 h-24 text-primary" />
              </div>
              <CardContent className="p-8 md:p-10 relative z-10 flex flex-col h-full">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">Standard Challenge</h3>
                  <p className="text-muted-foreground">Prove your skills through our 2-phase evaluation and get funded up to $200,000.</p>
                </div>
                
                <ul className="space-y-4 mb-10 flex-1">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="text-primary w-5 h-5 shrink-0" />
                    <span>2-phase evaluation process</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="text-primary w-5 h-5 shrink-0" />
                    <span>8% profit target (Phase 1)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="text-primary w-5 h-5 shrink-0" />
                    <span>5% profit target (Phase 2)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="text-primary w-5 h-5 shrink-0" />
                    <span>$5K – $200K account sizes</span>
                  </li>
                </ul>
                
                <Button className="w-full text-lg py-6 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <a href="https://prop.funderpro.com/signup" target="_blank" rel="noreferrer">Select Challenge</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card border-white/10 hover:border-primary/50 transition-colors duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap className="w-24 h-24 text-primary" />
              </div>
              <CardContent className="p-8 md:p-10 relative z-10 flex flex-col h-full">
                <div className="mb-8">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/30">
                    <Zap className="w-3 h-3" /> New
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Instant Funding</h3>
                  <p className="text-muted-foreground">Skip the evaluation. Start trading with a funded account immediately.</p>
                </div>
                
                <ul className="space-y-4 mb-10 flex-1">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="text-primary w-5 h-5 shrink-0" />
                    <span>No evaluation phases</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="text-primary w-5 h-5 shrink-0" />
                    <span>Start earning from day one</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="text-primary w-5 h-5 shrink-0" />
                    <span>Up to 80% profit split</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="text-primary w-5 h-5 shrink-0" />
                    <span>$5K – $100K account sizes</span>
                  </li>
                </ul>
                
                <Button className="w-full text-lg py-6 rounded-xl font-bold bg-white text-black hover:bg-gray-200" asChild>
                  <a href="https://prop.funderpro.com/signup" target="_blank" rel="noreferrer">Get Instant Funding</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 4: Trader Testimonials */}
      <section className="py-24 bg-card border-y border-white/5">
        <div className="container">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">What Our Traders Say</h2>
            <p className="text-xl text-muted-foreground">Hear directly from traders who have successfully scaled their capital with FunderPro.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-gray-800 to-black border border-white/10 cursor-pointer">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-16 h-16 rounded-full bg-primary/90 text-background flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all shadow-[0_0_20px_rgba(0,226,122,0.4)]">
                    <Play className="w-6 h-6 ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent z-20">
                  <h3 className="text-xl font-bold mb-1">{testimonial.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <span>{testimonial.location}</span>
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    <span className="text-primary font-medium">{testimonial.amount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Pro-Trader Comparison */}
      <section className="py-24 bg-background">
        <div className="container max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">FunderPro vs. The Rest</h2>
            <p className="text-xl text-muted-foreground">Why serious traders choose our platform over the competition.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-6 text-xl font-bold border-b border-white/10 w-1/3">Feature</th>
                  <th className="p-6 text-xl font-bold border-b border-primary text-primary bg-primary/5 rounded-t-xl w-1/3 text-center">FunderPro</th>
                  <th className="p-6 text-xl font-bold border-b border-white/10 text-muted-foreground w-1/3 text-center">Other Firms</th>
                </tr>
              </thead>
              <tbody className="text-lg">
                {[
                  { feature: "Profit Split", us: "Up to 90%", them: "70-80%" },
                  { feature: "Time Limits", us: "None", them: "30 days" },
                  { feature: "Evaluation Phases", us: "2", them: "2-3" },
                  { feature: "Payout Frequency", us: "Daily", them: "Weekly/Monthly" },
                  { feature: "Capital", us: "Up to $200K", them: "Up to $100K" },
                  { feature: "Support", us: "24/7", them: "Business hours" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-6 font-medium">{row.feature}</td>
                    <td className="p-6 text-center font-bold text-white bg-primary/5">{row.us}</td>
                    <td className="p-6 text-center text-muted-foreground">{row.them}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 6: Daily Rewards */}
      <section className="py-24 bg-card border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="container relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Earn Daily Rewards</h2>
            <p className="text-xl text-muted-foreground">We reward consistency. Unlock bonuses, scale your capital, and earn more the better you trade.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-b from-primary/20 to-card p-[1px] rounded-2xl">
              <div className="bg-card h-full rounded-2xl p-8 border border-white/5">
                <Gift className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-xl font-bold mb-3">Daily Payouts</h3>
                <p className="text-muted-foreground">Request your profits daily. No more waiting 30 days to enjoy the fruits of your labor.</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-b from-white/10 to-card p-[1px] rounded-2xl">
              <div className="bg-card h-full rounded-2xl p-8 border border-white/5">
                <TrendingUp className="w-10 h-10 text-white mb-6" />
                <h3 className="text-xl font-bold mb-3">Scale to $2M</h3>
                <p className="text-muted-foreground">Hit a 10% profit target over 4 months and we'll scale your account balance by 50%.</p>
              </div>
            </div>

            <div className="bg-gradient-to-b from-white/10 to-card p-[1px] rounded-2xl">
              <div className="bg-card h-full rounded-2xl p-8 border border-white/5">
                <Award className="w-10 h-10 text-white mb-6" />
                <h3 className="text-xl font-bold mb-3">Streak Bonuses</h3>
                <p className="text-muted-foreground">Trade profitably for consecutive days to unlock exclusive cash bonuses and perks.</p>
              </div>
            </div>

            <div className="bg-gradient-to-b from-white/10 to-card p-[1px] rounded-2xl">
              <div className="bg-card h-full rounded-2xl p-8 border border-white/5">
                <Star className="w-10 h-10 text-white mb-6" />
                <h3 className="text-xl font-bold mb-3">Referral Rewards</h3>
                <p className="text-muted-foreground">Invite other traders and earn up to 15% commission on their challenge fees.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Pricing / Challenge Table */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Challenge</h2>
            <p className="text-xl text-muted-foreground">Simple rules. Transparent pricing. Unlimited time.</p>
          </div>

          <div className="max-w-4xl mx-auto bg-card rounded-3xl border border-white/10 p-6 md:p-8 shadow-2xl">
            <Tabs defaultValue="standard" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-md grid-cols-2 bg-background p-1 rounded-xl">
                  <TabsTrigger value="standard" className="rounded-lg py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold text-base">Standard</TabsTrigger>
                  <TabsTrigger value="aggressive" className="rounded-lg py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold text-base">Aggressive</TabsTrigger>
                </TabsList>
              </div>

              {["standard", "aggressive"].map(mode => (
                <TabsContent key={mode} value={mode} className="mt-0">
                  <Tabs defaultValue="100k" className="w-full">
                    <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent mb-10 border-b border-white/10 pb-4 h-auto">
                      {["5k", "10k", "25k", "50k", "100k", "200k"].map(size => (
                        <TabsTrigger 
                          key={size} 
                          value={size}
                          className="rounded-lg px-4 py-2 border border-white/10 data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary text-base font-medium"
                        >
                          ${size.toUpperCase()}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    {["5k", "10k", "25k", "50k", "100k", "200k"].map(size => {
                      const prices: Record<string, string> = { "5k": "$49", "10k": "$99", "25k": "$149", "50k": "$249", "100k": "$349", "200k": "$499" };
                      const target1 = mode === "standard" ? "8%" : "10%";
                      
                      return (
                        <TabsContent key={`${mode}-${size}`} value={size} className="mt-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
                          <div className="grid md:grid-cols-3 gap-8">
                            <div className="md:col-span-2">
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                                <div className="bg-background rounded-xl p-4 border border-white/5">
                                  <div className="text-xs text-muted-foreground mb-1">Phase 1 Target</div>
                                  <div className="text-xl font-bold">{target1}</div>
                                </div>
                                <div className="bg-background rounded-xl p-4 border border-white/5">
                                  <div className="text-xs text-muted-foreground mb-1">Phase 2 Target</div>
                                  <div className="text-xl font-bold">5%</div>
                                </div>
                                <div className="bg-background rounded-xl p-4 border border-white/5">
                                  <div className="text-xs text-muted-foreground mb-1">Max Daily Loss</div>
                                  <div className="text-xl font-bold text-red-400">5%</div>
                                </div>
                                <div className="bg-background rounded-xl p-4 border border-white/5">
                                  <div className="text-xs text-muted-foreground mb-1">Max Total Loss</div>
                                  <div className="text-xl font-bold text-red-400">10%</div>
                                </div>
                                <div className="bg-background rounded-xl p-4 border border-white/5 relative overflow-hidden">
                                  <div className="absolute inset-0 bg-primary/5" />
                                  <div className="relative z-10">
                                    <div className="text-xs text-muted-foreground mb-1">Time Limit</div>
                                    <div className="text-xl font-bold text-primary">Unlimited</div>
                                  </div>
                                </div>
                                <div className="bg-background rounded-xl p-4 border border-white/5">
                                  <div className="text-xs text-muted-foreground mb-1">Profit Split</div>
                                  <div className="text-xl font-bold">Up to 90%</div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col justify-center bg-background rounded-2xl p-6 border border-primary/20 relative overflow-hidden">
                              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0" />
                              <div className="text-center mb-6">
                                <div className="text-sm text-muted-foreground font-medium mb-2">Refundable Fee</div>
                                <div className="text-5xl font-black mb-2">{prices[size]}</div>
                                <div className="text-xs text-primary font-medium uppercase tracking-wider">No hidden fees</div>
                              </div>
                              <Button className="w-full text-lg py-6 rounded-xl font-bold bg-primary text-primary-foreground shadow-lg hover:shadow-primary/25 hover:bg-primary/90" asChild>
                                <a href="https://prop.funderpro.com/signup" target="_blank" rel="noreferrer">Start Challenge</a>
                              </Button>
                            </div>
                          </div>
                        </TabsContent>
                      );
                    })}
                  </Tabs>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
    </Layout>
  );
}
