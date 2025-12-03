"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type Course = {
  _id: string;
  title: string;
  description?: string;
  price: number;
  // category?: string;
  thumbnail?: string;
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI state
  const [query, setQuery] = useState("");
  // Removed category state
  const [sort, setSort] = useState("popular");
  const [selected, setSelected] = useState<Course | null>(null);
  const [requesting, setRequesting] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const [cRes, uRes] = await Promise.all([
          fetch("/api/course/all"),
          fetch("/api/auth/me", { cache: "no-store" }),
        ]);

        const cData = await cRes.json();
        const uData = await uRes.json();

        if (!mounted) return;
        setCourses(cData.courses || []);
        setUser(uData.user || null);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load courses. Try again later.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // Removed categories useMemo calculation

  const filtered = useMemo(() => {
    let list = courses.slice();
    
    // Removed category filtering logic

    if (query.trim())
      list = list.filter((c) =>
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        (c.description || "").toLowerCase().includes(query.toLowerCase())
      );

    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else list.sort((a, b) => a.title.localeCompare(b.title));

    return list;
  }, [courses, query, sort]); // Removed category from dependency array

  const isSubscribed = (courseId: string) => {
    if (!user) return false;
    return user.enrolledCourses?.some((c: any) => c._id === courseId);
  };

  const requestEnroll = async (courseId: string) => {
    if (!user) {
      setMessage("Please login to subscribe to courses.");
      return;
    }

    try {
      setRequesting(courseId);
      const res = await fetch("/api/student/request-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });

      if (res.ok) {
        setMessage("Request sent — waiting admin approval.");
      } else {
        const err = await res.json().catch(() => ({}));
        setMessage(err.message || "Failed to send request");
      }
    } catch (err) {
      console.error(err);
      setMessage("Network error. Please try again later.");
    } finally {
      setRequesting(null);
      setTimeout(() => setMessage(null), 4000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1717a6]">Discover Courses</h1>
          <p className="text-sm text-muted-foreground mt-1">Handpicked courses — short summaries, modern UI.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
          <div className="flex items-center bg-white rounded-md shadow-sm border overflow-hidden">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses, keywords..."
              className="px-3 py-2 w-64 outline-none bg-transparent"
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-2 border-l"
            >
              <option value="popular">A → Z</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
          </div>
          {/* Removed Category Select Dropdown */}
        </div>
      </header>

      {message && (
        <div className="mb-4 inline-block bg-green-50 border border-green-200 text-green-800 px-4 py-2 rounded">
          {message}
        </div>
      )}

      {error ? (
        <div className="text-red-600">{error}</div>
      ) : loading ? (
        <div className="grid md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse p-4 bg-white rounded-lg shadow">
              <div className="h-40 bg-gray-100 rounded-md mb-3" />
              <div className="h-4 bg-gray-100 rounded w-1/2 mb-2" />
              <div className="h-3 bg-gray-100 rounded w-1/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => (
            <Card key={c._id} className="group hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="relative w-full h-44 overflow-hidden rounded-t-md bg-gray-50">
                <Image
                  src={c.thumbnail || "/placeholder.png"}
                  alt={c.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                {/* <div className="absolute top-3 left-3 bg-white/80 px-2 py-1 rounded text-xs font-medium">{c.category || "General"}</div> */}
                <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded text-sm font-semibold">₹{c.price}</div>
              </div>

              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-start gap-3">
                  <CardTitle className="text-base text-[#1717a6] line-clamp-2">{c.title}</CardTitle>
                  <div className="text-sm text-muted-foreground">{c.price === 0 ? "Free" : null}</div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-3">{c.description || "A concise course summary will appear here."}</p>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setSelected(c)}
                      className="px-3 py-1.5 border"
                    >
                      Preview
                    </Button>

                    {isSubscribed(c._id) ? (
                      <Button disabled className="px-3 py-1.5 bg-green-600 text-white cursor-default">
                        Subscribed ✓
                      </Button>
                    ) : (
                      <Button
                        onClick={() => requestEnroll(c._id)}
                        disabled={requesting === c._id}
                        className="px-3 py-1.5 bg-[#1717a6] text-white"
                      >
                        {requesting === c._id ? "Requesting..." : "Subscribe"}
                      </Button>
                    )}
                  </div>

                  <div className="text-xs text-muted-foreground">{new Date().toLocaleDateString()}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelected(null)} />

          <div className="relative max-w-3xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold">{selected.title}</h3>
              <button onClick={() => setSelected(null)} className="p-2 rounded hover:bg-gray-100">
                <X />
              </button>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative h-48 md:h-full md:col-span-1 rounded overflow-hidden">
                <Image src={selected.thumbnail || "/placeholder.png"} alt={selected.title} fill className="object-cover" />
              </div>

              <div className="md:col-span-2 space-y-3">
                <p className="text-sm text-muted-foreground">{selected.description || "No description provided."}</p>

                <div className="flex items-center gap-3">
                  <div className="text-2xl font-bold text-[#1717a6]">₹{selected.price}</div>
                  {/* <div className="text-sm text-muted-foreground">Category: {selected.category || "General"}</div> */}
                </div>

                <div className="flex gap-2">
                  {isSubscribed(selected._id) ? (
                    <Button disabled className="bg-green-600 text-white">Go to Course</Button>
                  ) : (
                    <Button onClick={() => requestEnroll(selected._id)} className="bg-[#1717a6] text-white">Request Enrollment</Button>
                  )}

                  <Button onClick={() => setSelected(null)} className="border">Close</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}