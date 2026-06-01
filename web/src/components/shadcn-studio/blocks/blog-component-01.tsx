"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, ArrowRight } from "lucide-react";

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}

const posts: BlogPost[] = [
  {
    title: "Understanding Prop Trading Challenges",
    excerpt: "Learn how proprietary trading challenges work and how to pass them efficiently with our comprehensive guide.",
    date: "Mar 15, 2026",
    readTime: "8 min read",
    category: "Trading",
  },
  {
    title: "Risk Management Strategies for Funded Traders",
    excerpt: "Essential risk management techniques that separate successful funded traders from the rest.",
    date: "Mar 10, 2026",
    readTime: "12 min read",
    category: "Strategy",
  },
  {
    title: "How to Choose Your First Trading Platform",
    excerpt: "A detailed comparison of MetaTrader, TradeLocker, and cTrader to help you make an informed decision.",
    date: "Mar 5, 2026",
    readTime: "6 min read",
    category: "Platform",
  },
];

export function BlogComponent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Latest Insights</h2>
          <p className="text-sm text-muted-foreground">Stay updated with prop trading trends</p>
        </div>
        <Button variant="ghost" className="text-primary hover:text-primary">
          View All <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((post, index) => (
          <Card key={index} className="card-glass overflow-hidden group">
            <div className="h-40 bg-gradient-to-br from-primary/10 to-secondary flex items-center justify-center">
              <div className="w-16 h-16 rounded-xl bg-card border border-border flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">{post.category.charAt(0)}</span>
              </div>
            </div>
            <div className="p-5">
              <Badge variant="outline" className="border-border text-muted-foreground text-xs mb-3">
                {post.category}
              </Badge>
              <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default BlogComponent;