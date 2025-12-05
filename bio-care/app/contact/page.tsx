"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    userClass: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSend = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (res.ok) {
      toast.success("Message sent successfully! We will contact you soon.");
      setForm({ name: "", phone: "", email: "", userClass: "", message: "" });
    } else {
      toast.error("Failed to send message. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 grid gap-10 md:grid-cols-[1.1fr,1fr] items-start">

          {/* ================= FORM ================= */}
          <Card className="border border-slate-200 shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Get in touch with <span className="text-[#1717a6]">Bio Care</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Have questions about batches, fees, or online classes? Send us a message.
              </p>
            </CardHeader>

            <CardContent>
              <form className="space-y-4" onSubmit={handleSend}>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    placeholder="Full Name"
                    className="rounded-xl"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />

                  <Input
                    placeholder="Phone / WhatsApp"
                    className="rounded-xl"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>

                <Input
                  type="email"
                  placeholder="Email"
                  className="rounded-xl"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <Input
                  placeholder="Class / Exam (e.g., Class 12, NEET 2026)"
                  className="rounded-xl"
                  required
                  value={form.userClass}
                  onChange={(e) => setForm({ ...form, userClass: e.target.value })}
                />

                <textarea
                  rows={4}
                  placeholder="Your message here..."
                  className="w-full rounded-xl border px-3 py-2"
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />

                <Button
                  type="submit"
                  className="w-full bg-[#1717a6] text-white rounded-full"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* ================= RIGHT SIDE INFO ================= */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-[#1717a6] text-white p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-3">Coaching Center Address</h2>

              <div className="flex items-start gap-3 mb-3">
                <MapPin className="w-5 h-5 mt-1" />
                <p className="text-sm text-blue-100">
                  Bio Care Private Coaching Center<br />
                  Kotulpur Netaji More (near Kotulpur Police Station),
                  Kotulpur, Bankura, WB-722141
                </p>
              </div>

              <div className="flex items-center gap-3 text-sm text-blue-100">
                <Phone className="w-5 h-5" />
                <p>
                  +91-8436651955 / +91-8918292956
                </p>
              </div>

              <div className="flex items-center gap-3 text-sm text-blue-100 mt-2">
                <Mail className="w-5 h-5" />
                <p>biocare545@gmail.com</p>
              </div>
            </div>

            <Card className="rounded-2xl border border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Online + Offline Support</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>• WhatsApp / Telegram Doubt Clearing</p>
                <p>• Recorded Lectures on Bio Care Website</p>
                <p>• Practice Tests & Performance Dashboard</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
