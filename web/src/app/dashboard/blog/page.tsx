"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search, Calendar, Clock, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Understanding Prop Trading: A Complete Guide for 2026",
    excerpt: "Learn the fundamentals of proprietary trading and how FunderPro enables traders to access institutional-grade capital.",
    category: "Education",
    readTime: "8 min read",
    date: "Mar 15, 2026",
    featured: true,
  },
  {
    id: 2,
    title: "Risk Management Strategies for Prop Traders",
    excerpt: "Discover proven risk management frameworks that top traders use to protect their capital and maximize returns.",
    category: "Strategy",
    readTime: "12 min read",
    date: "Mar 12, 2026",
    featured: true,
  },
  {
    id: 3,
    title: "How to Pass Your FunderPro Evaluation",
    excerpt: "Step-by-step guide to passing the FunderPro trading evaluation with tips from our top performing traders.",
    category: "Guide",
    readTime: "6 min read",
    date: "Mar 8, 2026",
    featured: false,
  },
  {
    id: 4,
    title: "MetaTrader 5 vs TradingView: Which Platform is Right for You?",
    excerpt: "Compare the features, pros, and cons of MT5 and TradingView to choose the best platform for your trading style.",
    category: "Technology",
    readTime: "5 min read",
    date: "Mar 5, 2026",
    featured: false,
  },
  {
    id: 5,
    title: "The Psychology of Trading: Mastering Your Emotions",
    excerpt: "Explore the psychological aspects of trading and learn techniques to maintain emotional discipline under pressure.",
    category: "Psychology",
    readTime: "10 min read",
    date: "Mar 1, 2026",
    featured: false,
  },
  {
    id: 6,
    title: "FunderPro 2026 Platform Update: New Features Overview",
    excerpt: "A comprehensive overview of the new features and improvements coming to the FunderPro platform this year.",
    category: "Product",
    readTime: "4 min read",
    date: "Feb 25, 2026",
    featured: false,
  },
];

const categories = ["All", "Education", "Strategy", "Guide", "Technology", "Psychology", "Product"];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const filteredPosts = selectedCategory === "All"
    ? blogPosts
    : blogPosts.filter((post) => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter((post) => post.featured);

  return (
    
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Trading Insights</h2>
            <p className="text-muted-foreground">News, guides, and strategies from our team</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search articles..." className="pl-9 w-[250px]" />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {featuredPosts.slice(0, 2).map((post) => (
            <Card key={post.id} className="card-glass overflow-hidden group cursor-pointer">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary" />
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="success">{post.category}</Badge>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                    <Clock className="w-3 h-3 ml-2" />
                    {post.readTime}
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary">
                    Read more
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "whitespace-nowrap",
                selectedCategory === category && "bg-primary text-primary-foreground"
              )}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.filter((p) => !p.featured).map((post) => (
            <Card key={post.id} className="card-glass overflow-hidden group cursor-pointer">
              <div className="aspect-video bg-gradient-to-br from-secondary to-primary/10" />
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{post.category}</Badge>
                </div>
                <h3 className="font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  <Button variant="ghost" size="sm" className="text-primary h-auto py-0">
                    Read
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    
  );
}