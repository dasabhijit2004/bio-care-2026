// app/contact/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 grid gap-10 md:grid-cols-[1.1fr,1fr] items-start">
          {/* Left: form */}
          <Card className="border border-slate-200 shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Get in touch with <span className="text-[#1717a6]">Bio Care</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Have questions about batches, fees, or online classes? Send us a message
                and our team will call you back.
              </p>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1 text-sm">
                    <label className="font-medium text-slate-700">Full Name</label>
                    <Input
                      placeholder="Enter your name"
                      className="rounded-xl focus-visible:ring-[#1717a6]"
                    />
                  </div>
                  <div className="space-y-1 text-sm">
                    <label className="font-medium text-slate-700">Phone Number</label>
                    <Input
                      placeholder="Your WhatsApp / Phone"
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

                <div className="space-y-1 text-sm">
                  <label className="font-medium text-slate-700">Class / Exam</label>
                  <Input
                    placeholder="e.g. Class 10, NEET 2026"
                    className="rounded-xl focus-visible:ring-[#1717a6]"
                  />
                </div>

                <div className="space-y-1 text-sm">
                  <label className="font-medium text-slate-700">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Share your query. Ex: Need NEET crash course details."
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[#1717a6] bg-white"
                  />
                </div>

                <Button className="mt-2 rounded-full bg-[#1717a6] hover:bg-[#141489] w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Right: info */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-[#1717a6] text-white p-6 shadow-lg relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#dff7d7]/20 rounded-full blur-2xl" />
              <h2 className="text-xl font-semibold mb-2">Coaching Center Address</h2>
              <p className="text-sm text-blue-100">
                Bio Care Private Coaching Center
                <br />
                (Add your full address here)
              </p>

              <div className="mt-4 space-y-2 text-sm text-blue-100">
                <p>
                  <span className="font-semibold text-white">Call / WhatsApp: </span>
                  +91-XXXXXXXXXX
                </p>
                <p>
                  <span className="font-semibold text-white">Email: </span>
                  support@biocare.in
                </p>
                <p>
                  <span className="font-semibold text-white">Timings: </span>
                  7:00 AM – 9:00 PM (All days)
                </p>
              </div>
            </div>

            <Card className="rounded-2xl border border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Online + Offline support
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>• Doubt clearing through WhatsApp / Telegram group</p>
                <p>• Recorded lectures on Bio Care website</p>
                <p>• Practice tests & performance dashboard for every student</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
