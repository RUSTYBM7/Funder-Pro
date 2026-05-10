import { Layout } from "@/components/layout/Layout";
import { Link } from "wouter";

export default function Blog() {
  const posts = [
    {
      title: "Mastering Trading Psychology: A Prop Trader's Guide",
      category: "Psychology",
      date: "Mar 12, 2024",
      excerpt: "Your mind is your most powerful tool in the markets. Learn how top funded traders maintain discipline and emotional control during drawdowns.",
    },
    {
      title: "Why You Keep Failing the Challenge (And How to Fix It)",
      category: "Education",
      date: "Mar 08, 2024",
      excerpt: "We analyzed data from 10,000 failed evaluations. The results reveal three common mistakes almost every trader makes.",
    },
    {
      title: "Understanding Order Flow and Liquidity in Forex",
      category: "Technical Analysis",
      date: "Mar 02, 2024",
      excerpt: "Move beyond retail chart patterns and start seeing the market the way institutional players do. A deep dive into order block trading.",
    },
    {
      title: "FunderPro Product Update: Instant Funding is Here",
      category: "Company News",
      date: "Feb 28, 2024",
      excerpt: "Skip the evaluation phase. We're excited to announce our new Instant Funding model, allowing you to start earning from day one.",
    },
    {
      title: "Risk Management: The 1% Rule Explained",
      category: "Education",
      date: "Feb 20, 2024",
      excerpt: "If you don't manage risk, you won't survive. Here is the mathematical proof of why the 1% risk rule is critical for passing prop firm challenges.",
    },
    {
      title: "Trader Spotlight: How Carlos Turned $50k into $200k Capital",
      category: "Success Stories",
      date: "Feb 15, 2024",
      excerpt: "An interview with one of our top-performing traders. Carlos shares his daily routine, preferred setups, and how he leverages the FunderPro scaling plan.",
    }
  ];

  return (
    <Layout>
      <div className="pt-24 pb-20 bg-background">
        <div className="container max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Trading Insights & Updates</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Educational content, market analysis, and company news from the FunderPro team.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <div key={i} className="bg-card rounded-2xl border border-white/10 overflow-hidden flex flex-col group hover:border-primary/50 transition-colors">
                <div className="h-48 bg-gradient-to-br from-gray-800 to-black relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-sm text-muted-foreground mb-3">{post.date}</div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-muted-foreground mb-6 flex-1 line-clamp-3">{post.excerpt}</p>
                  <Link href={`/blog/${i}`} className="text-primary font-bold text-sm uppercase tracking-wider hover:text-white transition-colors flex items-center gap-1">
                    Read More <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
