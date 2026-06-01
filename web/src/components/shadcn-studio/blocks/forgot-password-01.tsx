"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="card-glass w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Forgot Password?</h1>
          <p className="text-sm text-muted-foreground">
            No worries, we&apos;ll send you reset instructions
          </p>
        </div>

        {submitted ? (
          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <p className="text-white font-medium">Check your email</p>
            <p className="text-sm text-muted-foreground">
              We&apos;ve sent a password reset link to <span className="text-primary">{email}</span>
            </p>
            <Button
              variant="ghost"
              className="mt-4 text-primary hover:text-primary"
              onClick={() => setSubmitted(false)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to login
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="trader@funderpro.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-secondary/50 border-border"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Send Reset Link
            </Button>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link href="/auth/login" className="text-sm text-muted-foreground hover:text-primary flex items-center justify-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default ForgotPassword;