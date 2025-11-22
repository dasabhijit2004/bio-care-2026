import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md animate-fade-up">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <p className="text-xs text-muted-foreground">
            Create a student account to access courses and practice. Admin role
            will be managed from the backend only.
          </p>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="space-y-2">
            <label className="text-xs font-medium">Full Name</label>
            <Input placeholder="Your name" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium">Email</label>
            <Input type="email" placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium">Password</label>
            <Input type="password" placeholder="********" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium">Confirm Password</label>
            <Input type="password" placeholder="********" />
          </div>
          <Button className="w-full mt-2">Create Account</Button>
          <p className="mt-2 text-xs text-center text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary underline-offset-4 hover:underline">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
