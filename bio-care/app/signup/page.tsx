// app/signup/page.tsx
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SignupPage() {
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
            <p className="text-xs text-muted-foreground">
              Access courses, practice sets and a personalised performance dashboard.
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1 text-sm">
                  <label className="font-medium text-slate-700">Full Name</label>
                  <Input
                    placeholder="Student name"
                    className="rounded-xl focus-visible:ring-[#1717a6]"
                  />
                </div>
                <div className="space-y-1 text-sm">
                  <label className="font-medium text-slate-700">Class</label>
                  <Input
                    placeholder="e.g. 9, 10, 11, 12"
                    className="rounded-xl focus-visible:ring-[#1717a6]"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1 text-sm">
                  <label className="font-medium text-slate-700">Phone</label>
                  <Input
                    placeholder="WhatsApp number"
                    className="rounded-xl focus-visible:ring-[#1717a6]"
                  />
                </div>
                <div className="space-y-1 text-sm">
                  <label className="font-medium text-slate-700">Board / Exam</label>
                  <Input
                    placeholder="WBBSE / CBSE / NEET"
                    className="rounded-xl focus-visible:ring-[#1717a6]"
                  />
                </div>
              </div>

              <div className="space-y-1 text-sm">
                <label className="font-medium text-slate-700">Email</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className="rounded-xl focus-visible:ring-[#1717a6]"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1 text-sm">
                  <label className="font-medium text-slate-700">Password</label>
                  <Input
                    type="password"
                    placeholder="Create a password"
                    className="rounded-xl focus-visible:ring-[#1717a6]"
                  />
                </div>
                <div className="space-y-1 text-sm">
                  <label className="font-medium text-slate-700">Confirm Password</label>
                  <Input
                    type="password"
                    placeholder="Repeat password"
                    className="rounded-xl focus-visible:ring-[#1717a6]"
                  />
                </div>
              </div>

              {/* Note: Admin flag will be handled in DB / backend only – default is student */}

              <Button
                type="submit"
                className="w-full rounded-full bg-[#1717a6] hover:bg-[#141489]"
              >
                Create Account
              </Button>
            </form>

            <p className="mt-4 text-xs text-center text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#1717a6] hover:underline"
              >
                Login instead
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
