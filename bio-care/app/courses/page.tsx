"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState<any>(null);

  // Load all courses
  useEffect(() => {
    fetch("/api/course/all")
      .then((res) => res.json())
      .then((data) => setCourses(data.courses || []));
  }, []);

  // Load logged-in user data
  useEffect(() => {
    fetch("/api/auth/me", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setUser(data.user || null));
  }, []);

  const requestEnroll = async (courseId: string) => {
    const res = await fetch("/api/student/request-course", {
      method: "POST",
      body: JSON.stringify({ courseId }),
    });

    if (res.ok) {
      alert("Request sent! Wait for admin approval.");
    } else {
      alert("Failed to request");
    }
  };

  const isSubscribed = (courseId: string) => {
    if (!user) return false;
    return user.enrolledCourses?.some((c: any) => c._id === courseId);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-[#1717a6]">Available Courses</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {courses.map((c: any) => (
          <Card key={c._id} className="shadow hover:shadow-md transition">
            <CardHeader>
              <CardTitle className="text-[#1717a6]">{c.title}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <Image
                src={c.thumbnail || "/placeholder.jpg"}
                width={600}
                height={300}
                alt="Course"
                className="rounded-md"
              />

              <p className="text-muted-foreground text-sm">
                Price: <strong>₹{c.price}</strong>
              </p>

              {/* IF LOGGED OUT */}
              {!user && (
                <Button
                  className="bg-[#1717a6] text-white"
                  onClick={() => alert("Login to subscribe")}
                >
                  Login to Subscribe
                </Button>
              )}

              {/* IF LOGGED IN */}
              {user && (
                <>
                  {isSubscribed(c._id) ? (
                    <Button
                      disabled
                      className="bg-green-600 text-white cursor-default"
                    >
                      Subscribed ✓
                    </Button>
                  ) : (
                    <Button
                      className="bg-[#1717a6] text-white"
                      onClick={() => requestEnroll(c._id)}
                    >
                      Subscribe
                    </Button>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
