"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, PlayCircle, Award, Clock, ChevronRight, GraduationCap, TrendingUp, BarChart3, Target } from "lucide-react";

const courses = [
  { id: 1, title: "Prop Trading Fundamentals", lessons: 12, duration: "2h 30m", level: "Beginner", progress: 100, completed: true, category: "Basics", icon: GraduationCap, color: "text-primary" },
  { id: 2, title: "Risk Management Mastery", lessons: 18, duration: "3h 45m", level: "Intermediate", progress: 75, completed: false, category: "Strategy", icon: Target, color: "text-blue-400" },
  { id: 3, title: "Technical Analysis 101", lessons: 24, duration: "5h 10m", level: "Beginner", progress: 40, completed: false, category: "Analysis", icon: BarChart3, color: "text-purple-400" },
  { id: 4, title: "Crypto Markets Deep Dive", lessons: 16, duration: "3h 20m", level: "Intermediate", progress: 20, completed: false, category: "Crypto", icon: TrendingUp, color: "text-yellow-400" },
  { id: 5, title: "Advanced Trading Psychology", lessons: 10, duration: "2h", level: "Advanced", progress: 0, completed: false, category: "Mindset", icon: BookOpen, color: "text-pink-400" },
  { id: 6, title: "Algorithmic Trading Basics", lessons: 22, duration: "4h 50m", level: "Advanced", progress: 0, completed: false, category: "Automation", icon: PlayCircle, color: "text-cyan-400" },
];

export default function LearnPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Learn</h1>
        <p className="text-muted-foreground text-sm mt-1">Sharpen your trading skills with guided courses</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Courses Enrolled", value: "6", icon: BookOpen, color: "text-primary" },
          { label: "Lessons Completed", value: "47", icon: Award, color: "text-blue-400" },
          { label: "Hours Learned", value: "12.5h", icon: Clock, color: "text-purple-400" },
          { label: "Certificates", value: "3", icon: GraduationCap, color: "text-yellow-400" },
        ].map((s) => (
          <Card key={s.label} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{s.label}</p>
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </div>
              <p className={`text-2xl font-bold mt-2 ${s.color}`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <Card key={c.id} className="bg-card border-border hover:border-primary/30 transition-colors">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 rounded-xl bg-secondary/50 ${c.color} flex items-center justify-center`}>
                  <c.icon className="h-6 w-6" />
                </div>
                {c.completed && <Badge className="bg-primary/15 text-primary border-primary/30">Completed</Badge>}
                {!c.completed && c.progress > 0 && <Badge variant="outline" className="border-border text-muted-foreground">In Progress</Badge>}
              </div>
              <p className="text-sm font-semibold text-white">{c.title}</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                <span>{c.lessons} lessons</span>
                <span>·</span>
                <span>{c.duration}</span>
                <span>·</span>
                <Badge variant="outline" className="border-border text-muted-foreground text-[10px]">{c.level}</Badge>
              </div>
              {c.progress > 0 && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-white">{c.progress}%</span>
                  </div>
                  <Progress value={c.progress} className="h-1.5" />
                </div>
              )}
              <Button size="sm" className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                {c.completed ? "Review" : c.progress > 0 ? "Continue" : "Start Course"}
                <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}