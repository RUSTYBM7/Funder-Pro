"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TwoFactorPage() {
  const router = useRouter();
  const [code, setCode] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="card-glass w-full max-w-md">
        <CardHeader className="text-center space-y-1">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-white">Two-factor authentication</CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter the 6-digit code from your authenticator app
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Authentication Code</Label>
              <Input
                id="code"
                type="text"
                placeholder="000000"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                maxLength={6}
                className="text-center text-2xl tracking-widest"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading || code.length !== 6}>
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Don&apos;t have access to your authenticator app?
            </p>
            <Button variant="ghost" className="text-sm text-primary">
              Use backup codes
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}