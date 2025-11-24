"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function CreateCoursePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);

  const [course, setCourse] = useState({
    title: "",
    description: "",
    price: "",
    thumbnail: "",
  });

  // ---------------- Upload Thumbnail ----------------
  const handleThumbnailUpload = async (file: File) => {
    if (!file) return;

    setUploadingThumbnail(true);

    const formData = new FormData();
    formData.append("thumbnail", file);

    const res = await fetch("/api/admin/upload-thumbnail", {
      method: "POST",
      body: formData,
    });

    setUploadingThumbnail(false);

    if (!res.ok) {
      alert("Thumbnail upload failed");
      return;
    }

    const data = await res.json();
    setCourse({ ...course, thumbnail: data.url });
  };

  // ---------------- Create Course ----------------
  const handleCreate = async () => {
    if (!course.title || !course.price) {
      alert("Title and Price are required");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/admin/create-course", {
      method: "POST",
      body: JSON.stringify({
        title: course.title,
        description: course.description,
        price: Number(course.price),
        thumbnail: course.thumbnail,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Failed to create course");
      return;
    }

    const data = await res.json();
    alert("Course created successfully!");
    router.push(`/admin/courses/${data.course._id}`);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-[#1717a6] mb-6"
      >
        Create New Course
      </motion.h1>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-[#1717a6]">Course Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">

          {/* Title */}
          <div>
            <label className="text-sm font-medium text-[#1717a6]">Course Title</label>
            <Input
              className="mt-1"
              placeholder="Enter course title"
              onChange={(e) => setCourse({ ...course, title: e.target.value })}
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-[#1717a6]">Description</label>
            <Textarea
              className="mt-1"
              placeholder="Enter course description"
              onChange={(e) =>
                setCourse({ ...course, description: e.target.value })
              }
            />
          </div>

          {/* Price */}
          <div>
            <label className="text-sm font-medium text-[#1717a6]">Price (₹)</label>
            <Input
              type="number"
              className="mt-1"
              placeholder="Enter price"
              onChange={(e) => setCourse({ ...course, price: e.target.value })}
            />
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label className="text-sm font-medium text-[#1717a6]">
              Upload Thumbnail
            </label>

            <Input
              type="file"
              accept="image/*"
              className="mt-2"
              onChange={(e) => e.target.files && handleThumbnailUpload(e.target.files[0])}
            />

            {uploadingThumbnail && (
              <p className="text-sm text-blue-600 mt-2">Uploading thumbnail...</p>
            )}

            {course.thumbnail && (
              <img
                src={course.thumbnail}
                className="mt-3 w-40 h-24 object-cover rounded border"
                alt="thumbnail"
              />
            )}
          </div>

          {/* Submit */}
          <Button
            onClick={handleCreate}
            disabled={loading}
            className="bg-[#1717a6] text-white rounded-full px-6 mt-4"
          >
            {loading ? "Creating..." : "Create Course"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
