"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CreateCoursePage() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");

  const createCourse = async () => {
    await fetch("/api/admin/create-course", {
      method: "POST",
      body: JSON.stringify({ title, desc, price }),
    });

    alert("Course created!");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-[var(--brand-blue)]">
        Create New Course
      </h1>

      <Input
        placeholder="Course title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Textarea
        placeholder="Course description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <Input
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <Button onClick={createCourse} className="bg-[var(--brand-blue)] text-white">
        Create Course
      </Button>
    </div>
  );
}
