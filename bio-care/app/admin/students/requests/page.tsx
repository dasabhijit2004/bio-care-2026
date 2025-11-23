"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function CourseRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch("/api/admin/course-requests")
      .then((res) => res.json())
      .then((data) => setRequests(data.requests));
  }, []);

  const approve = async (id: string) => {
    await fetch("/api/admin/approve-enrollment", {
      method: "POST",
      body: JSON.stringify({ requestId: id }),
    });
    alert("Approved!");
    location.reload();
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-[#1717a6]">
        Pending Course Subscriptions
      </h1>

      <table className="w-full border rounded-md">
        <tbody>
          {requests.map((req: any) => (
            <tr key={req._id}>
              <td className="p-3">{req.studentId.name}</td>
              <td className="p-3">{req.courseId.title}</td>
              <td className="p-3">
                <Button onClick={() => approve(req._id)}>Approve</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
