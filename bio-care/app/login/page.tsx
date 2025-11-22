import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md animate-fade-up">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">Login</CardTitle>
          <p className="text-xs text-muted-foreground">
            Default login is for students. Admin will be protected separately in
            a later step.
          </p>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="space-y-2">
            <label className="text-xs font-medium">Email</label>
            <Input type="email" placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium">Password</label>
            <Input type="password" placeholder="********" />
          </div>
          <Button className="w-full mt-2">Login</Button>
          <p className="mt-2 text-xs text-center text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary underline-offset-4 hover:underline">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
