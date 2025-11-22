"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">

      {/* ================= HERO ================= */}
      <section className="w-full bg-[var(--brand-green)] py-20 md:py-28">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-[var(--brand-blue)]">
              Learn Biology With Confidence  
              <span className="text-[var(--black)] block">
                Through Expert Guidance & Smart Practice
              </span>
            </h1>

            <p className="text-[var(--brand-blue)] text-sm md:text-base max-w-lg">
              High-quality lessons, regular practice, auto-evaluated quizzes, and
              performance analytics — all designed to make you excel in Biology.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                asChild
                size="lg"
                className="bg-[var(--brand-blue)] text-white hover:bg-blue-800"
              >
                <Link href="/courses">Explore Courses</Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-[var(--brand-blue)] text-[var(--brand-blue)] hover:bg-[var(--brand-green)]"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative w-full h-64 md:h-96"
          >
            <Image
              src="/placeholder.jpg"
              alt="Biology learning"
              fill
              className="object-cover rounded-xl shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* ================= ABOUT US ================= */}
      <section className="w-full bg-white py-20">
        <div className="container mx-auto px-4 space-y-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl font-semibold text-center text-[var(--brand-blue)]"
          >
            About Us
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center text-muted-foreground text-sm md:text-base"
          >
            Bio Care is a private coaching center specializing in Biology for 
            class 11–12, HS exams, and NEET aspirants. Our teaching approach 
            combines theory, visuals, regular practice, doubt-solving and 
            AI-powered analytics.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-6 pt-10">
            {[
              { title: "Concept Clarity", desc: "Easy explanations with diagrams and examples." },
              { title: "Exam-Focused", desc: "MCQs, PYQs, sample papers & regular tests." },
              { title: "Smart Analytics", desc: "Track strengths, weaknesses & progress." },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="shadow-sm hover:shadow-md transition-all">
                  <CardHeader>
                    <CardTitle className="text-lg text-[var(--brand-blue)]">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    {feature.desc}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section className="w-full bg-[var(--brand-green)] py-20">
        <div className="container mx-auto px-4 space-y-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl font-semibold text-center text-[var(--brand-blue)]"
          >
            Gallery
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="relative w-full h-40 md:h-56"
              >
                <Image
                  src="/placeholder.jpg"
                  alt="Gallery photo"
                  fill
                  className="rounded-xl object-cover shadow-md"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="w-full bg-white py-20">
        <div className="container mx-auto px-4 space-y-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl font-semibold text-center text-[var(--brand-blue)]"
          >
            Our Success Stories
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Priya Sharma", text: "Bio Care helped me improve from 62% to 89% in Biology!", img: "/placeholder.jpg" },
              { name: "Aman Verma", text: "The practice tests and doubt sessions made all the difference.", img: "/placeholder.jpg" },
              { name: "Ritika Das", text: "Their teaching style is amazing. Highly recommended!", img: "/placeholder.jpg" },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="shadow-sm hover:shadow-md transition-all">
                  <CardContent className="pt-6 space-y-4 flex flex-col items-center text-center">
                    <div className="relative w-20 h-20">
                      <Image
                        src={t.img}
                        alt={t.name}
                        fill
                        className="rounded-full object-cover border-2 border-[var(--brand-blue)]"
                      />
                    </div>

                    <h3 className="text-lg font-semibold text-[var(--brand-blue)]">
                      {t.name}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      “{t.text}”
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
