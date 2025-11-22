// app/login/page.tsx
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
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
            <p className="text-xs text-muted-foreground">
              Continue your biology journey and track your progress.
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-1 text-sm">
                <label className="font-medium text-slate-700">Email</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className="rounded-xl focus-visible:ring-[#1717a6]"
                />
              </div>
              <div className="space-y-1 text-sm">
                <label className="font-medium text-slate-700">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="rounded-xl focus-visible:ring-[#1717a6]"
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-3 w-3 rounded border-slate-300"
                  />
                  <label htmlFor="remember" className="text-slate-600">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  className="text-[#1717a6] hover:underline font-medium"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                className="w-full rounded-full bg-[#1717a6] hover:bg-[#141489]"
              >
                Login
              </Button>
            </form>

            <p className="mt-4 text-xs text-center text-muted-foreground">
              New to Bio Care?{" "}
              <Link
                href="/signup"
                className="font-semibold text-[#1717a6] hover:underline"
              >
                Create a student account
              </Link>
            </p>

            {/* Admin flag will be handled purely in backend/database – not shown here */}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
