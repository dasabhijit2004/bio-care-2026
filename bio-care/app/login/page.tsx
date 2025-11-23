"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed");
        setLoading(false);
        return;
      }

      alert("Login successful!");

      if (data.user.isAdmin) {
        router.push("/admin");
      } else {
        router.push("/dashboard/student");
      }

    } catch (err) {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <Card className="rounded-2xl border border-slate-200/80 shadow-lg">

          <CardHeader className="space-y-1 text-center">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
              Welcome back
            </p>
            <CardTitle className="text-2xl font-semibold">
              Login to <span className="text-[#1717a6]">Bio Care</span>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div className="space-y-1 text-sm">
                <label className="font-medium text-slate-700">Email</label>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>

              <div className="space-y-1 text-sm">
                <label className="font-medium text-slate-700">Password</label>
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="•••••••"
                  autoComplete="current-password"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#1717a6] hover:bg-[#141489]"
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>

            <p className="mt-4 text-xs text-center text-muted-foreground">
              New to Bio Care?{" "}
              <Link href="/signup" className="font-semibold text-[#1717a6]">
                Create a student account
              </Link>
            </p>
          </CardContent>

        </Card>
      </div>
    </div>
  );
}
