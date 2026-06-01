"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";

export function VerifyEmail() {
  const [resent, setResent] = useState(false);

  const handleResend = () => {
    setResent(true);
    setTimeout(() => setResent(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="card-glass w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <Mail className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Check your email</h1>
          <p className="text-sm text-muted-foreground">
            We&apos;ve sent a verification link to
          </p>
          <p className="text-primary font-medium mt-1">trader@funderpro.com</p>
        </div>

        <div className="bg-secondary/30 rounded-lg p-4 mb-6">
          <p className="text-sm text-muted-foreground text-center">
            Click the link in the email to verify your account. If you don&apos;t see it, check your spam folder.
          </p>
        </div>

        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full border-border text-muted-foreground hover:text-white"
            onClick={handleResend}
            disabled={resent}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${resent ? "animate-spin" : ""}`} />
            {resent ? "Email sent!" : "Resend email"}
          </Button>

          <Button asChild variant="ghost" className="w-full text-muted-foreground hover:text-white">
            <Link href="/auth/login">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to login
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default VerifyEmail;