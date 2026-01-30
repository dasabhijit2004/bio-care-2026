"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CourseRequests() {
  const [requests, setRequests] = useState([]);

  const loadRequests = async () => {
    const res = await fetch("/api/admin/course-requests");
    const data = await res.json();
    setRequests(data.requests || []);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const approveRequest = async (requestId: string) => {
    await fetch("/api/admin/approve-course", {
      method: "POST",
      body: JSON.stringify({ requestId }),
    });

    alert("Course approved!");
    loadRequests();
  };

  const rejectRequest = async (requestId: string) => {
    await fetch("/api/admin/reject-enrollment", {
      method: "POST",
      body: JSON.stringify({ requestId }),
    });

    alert("Request rejected!");
    loadRequests();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-[#1717a6]">
        Course Enrollment Requests
      </h1>

      <Card className="p-4 shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#dff7d7] text-[#1717a6]">
              <th className="p-3 text-left">Student</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Course</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-muted-foreground">
                  No pending course requests.
                </td>
              </tr>
            )}

            {requests.map((req: any) => (
              <tr key={req._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3">{req.studentId.name}</td>
                <td className="p-3">{req.studentId.email}</td>
                <td className="p-3">{req.courseId.title}</td>

                <td className="p-3 flex flex-col md:flex-row gap-3 justify-center">
                  <Button
                    className="bg-[#1717a6] text-white hover:bg-blue-900"
                    onClick={() => approveRequest(req._id)}
                  >
                    Approve
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() => rejectRequest(req._id)}
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
