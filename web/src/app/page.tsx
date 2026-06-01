import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-8">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            FunderPro <span className="text-primary">Integrations</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Trading Platform Dashboard
          </p>
        </div>

        <Card className="card-glass">
          <CardContent className="pt-6 space-y-4">
            <Link href="/login">
              <Button className="w-full" size="lg">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" className="w-full" size="lg">
                Create Account
              </Button>
            </Link>
          </CardContent>
        </Card>

        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <Link href="/forgot-password" className="hover:text-primary transition-colors">
            Forgot Password
          </Link>
          <span>|</span>
          <Link href="/dashboard" className="hover:text-primary transition-colors">
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}