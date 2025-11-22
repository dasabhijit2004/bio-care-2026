import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-10 space-y-8">
      <header className="space-y-2 animate-fade-up">
        <h1 className="text-2xl md:text-3xl font-semibold">Contact Us</h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
          Have questions about courses, batches, or admissions? Reach out and
          we&apos;ll get back to you.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-[2fr,1fr] animate-fade-up md:[animation-delay:120ms]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base md:text-lg">
              Send us a message
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="space-y-2">
              <label className="text-xs font-medium">Name</label>
              <Input placeholder="Your full name" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">Email</label>
              <Input type="email" placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">Message</label>
              <Textarea
                rows={4}
                placeholder="Tell us what you need help with..."
              />
            </div>
            <Button className="w-full">Submit</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base md:text-lg">
              Coaching Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-muted-foreground">
            <p>
              <span className="font-semibold text-foreground">Address:</span>{" "}
              (Add your coaching center address here)
            </p>
            <p>
              <span className="font-semibold text-foreground">Phone:</span>{" "}
              +91-XXXXXXXXXX
            </p>
            <p>
              <span className="font-semibold text-foreground">Email:</span>{" "}
              contact@biocare.com
            </p>
            <p>
              <span className="font-semibold text-foreground">Timing:</span>{" "}
              Mon–Sat, 8:00 AM – 8:00 PM
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
