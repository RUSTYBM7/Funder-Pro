"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleResend = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="card-glass w-full max-w-md text-center">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-white">Verify your email</CardTitle>
          <CardDescription className="text-muted-foreground">
            We&apos;ve sent a verification email to your inbox. Click the link in the email to activate your account.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col space-y-4">
          <Link href="/login">
            <Button className="w-full">Continue to login</Button>
          </Link>
          <Button variant="outline" onClick={handleResend} disabled={isLoading}>
            {isLoading ? "Sent!" : "Resend verification email"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}