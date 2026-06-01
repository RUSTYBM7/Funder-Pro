"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock, Check, X, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PasswordRequirement {
  label: string;
  test: (pw: string) => boolean;
}

const requirements: PasswordRequirement[] = [
  { label: "At least 8 characters", test: (pw) => pw.length >= 8 },
  { label: "One uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
  { label: "One lowercase letter", test: (pw) => /[a-z]/.test(pw) },
  { label: "One number", test: (pw) => /[0-9]/.test(pw) },
  { label: "One special character", test: (pw) => /[!@#$%^&*(),.?":{}|<>]/.test(pw) },
];

function getStrengthLevel(password: string): { level: number; color: string; label: string } {
  const passed = requirements.filter((r) => r.test(password)).length;
  if (passed === 0) return { level: 0, color: "", label: "" };
  if (passed <= 2) return { level: 1, color: "bg-red-500", label: "Weak" };
  if (passed <= 3) return { level: 2, color: "bg-yellow-500", label: "Fair" };
  if (passed <= 4) return { level: 3, color: "bg-blue-500", label: "Good" };
  return { level: 4, color: "bg-primary", label: "Strong" };
}

export function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);

  const strength = getStrengthLevel(password);
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword && strength.level >= 3) {
      setResetComplete(true);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="card-glass w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Reset Password</h1>
          <p className="text-sm text-muted-foreground">
            Create a new password for your account
          </p>
        </div>

        {resetComplete ? (
          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
              <Check className="h-6 w-6 text-primary" />
            </div>
            <p className="text-white font-medium">Password reset successful!</p>
            <p className="text-sm text-muted-foreground">
              Your password has been updated. You can now login with your new password.
            </p>
            <Button asChild className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/auth/login">Back to Login</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-white">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-secondary/50 border-border pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
                >
                  {showPassword ? <X className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                </button>
              </div>

              {password.length > 0 && (
                <div className="mt-3 space-y-3">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${
                          level <= strength.level ? strength.color : "bg-secondary"
                        }`}
                      />
                    ))}
                  </div>
                  {strength.label && (
                    <p className={`text-xs ${strength.level >= 3 ? "text-primary" : "text-yellow-500"}`}>
                      {strength.label}
                    </p>
                  )}
                  <ul className="space-y-1">
                    {requirements.map((req) => (
                      <li
                        key={req.label}
                        className={`text-xs flex items-center gap-2 ${
                          req.test(password) ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {req.test(password) ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <X className="h-3 w-3" />
                        )}
                        {req.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-white">
                Confirm Password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-secondary/50 border-border"
                required
              />
              {confirmPassword.length > 0 && !passwordsMatch && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <X className="h-3 w-3" />
                  Passwords do not match
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={!passwordsMatch || strength.level < 3}
            >
              Reset Password
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

export default ResetPassword;