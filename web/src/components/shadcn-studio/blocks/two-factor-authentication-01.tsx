"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function TwoFactorAuth() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      const digits = value.replace(/\D/g, "").slice(0, 6).split("");
      const newCode = [...code];
      digits.forEach((digit, i) => {
        if (index + i < 6) {
          newCode[index + i] = digit;
        }
      });
      setCode(newCode);
      const nextIndex = Math.min(index + digits.length, 5);
      inputRefs.current[nextIndex]?.focus();
      if (newCode.every((c) => c !== "")) {
        handleVerify(newCode.join(""));
      }
    } else if (/^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      setError(false);
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
      if (newCode.every((c) => c !== "")) {
        handleVerify(newCode.join(""));
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6).split("");
    if (pastedData.length === 6) {
      setCode(pastedData);
      handleVerify(pastedData.join(""));
    }
  };

  const handleVerify = (verificationCode: string) => {
    if (verificationCode.length === 6) {
      console.log("Verifying code:", verificationCode);
    }
  };

  const isComplete = code.every((c) => c !== "");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="card-glass w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Two-Factor Authentication</h1>
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit code from your authenticator app
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-6" onPaste={handlePaste}>
          {code.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`w-12 h-14 text-center text-xl font-bold bg-secondary/50 border-border ${
                error ? "border-red-500" : ""
              } ${digit ? "text-primary" : "text-white"}`}
            />
          ))}
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center mb-4">
            Invalid code. Please try again.
          </p>
        )}

        <Button
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          disabled={!isComplete}
        >
          Verify
        </Button>

        <div className="mt-6 pt-6 border-t border-border">
          <button className="w-full text-sm text-muted-foreground hover:text-primary mb-4 flex items-center justify-center gap-2">
            <Lock className="h-4 w-4" />
            Use backup codes instead
          </button>

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

export default TwoFactorAuth;