"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const router = useRouter();

  // Form states
  const [name, setName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: any) => {
    e.preventDefault();
    if (password !== confirm) return alert("Passwords do not match!");

    try {
      setLoading(true);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          userClass: studentClass,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Signup failed");
        setLoading(false);
        return;
      }

      alert("Signup successful! Wait for admin approval.");
      router.push("/login");

    } catch (err) {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        <Card className="rounded-2xl border border-slate-200/80 shadow-lg">
          <CardHeader className="space-y-2 text-center">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
              Join Bio Care
            </p>
            <CardTitle className="text-2xl font-semibold">
              Create your student account
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form className="space-y-4" onSubmit={handleSignup}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1 text-sm">
                  <label className="font-medium text-slate-700">Full Name</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Student name"
                    autoComplete="name"
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-1 text-sm">
                  <label className="font-medium text-slate-700">Class</label>
                  <Input
                    placeholder="Enter your class"
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1 text-sm">
                <label className="font-medium text-slate-700">Email</label>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="rounded-xl"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1 text-sm">
                  <label className="font-medium text-slate-700">Password</label>
                  <Input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-1 text-sm">
                  <label className="font-medium text-slate-700">Confirm Password</label>
                  <Input
                    type="password"
                    required
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Repeat password"
                    autoComplete="new-password"
                    className="rounded-xl"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#1717a6] hover:bg-[#141489]"
              >
                {loading ? "Creating..." : "Create Account"}
              </Button>
            </form>

            <p className="mt-4 text-xs text-center text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-[#1717a6]">
                Login instead
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
