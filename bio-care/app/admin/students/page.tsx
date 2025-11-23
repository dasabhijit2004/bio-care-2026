"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function PendingStudents() {
  const [students, setStudents] = useState([]);

  const fetchPending = async () => {
    const res = await fetch("/api/admin/pending-students");
    const data = await res.json();
    setStudents(data.students || []);
  };

  const approve = async (id: string) => {
    await fetch("/api/admin/approve-student", {
      method: "POST",
      body: JSON.stringify({ id }),
    });
    fetchPending();
  };

  const reject = async (id: string) => {
    await fetch("/api/admin/reject-student", {
      method: "POST",
      body: JSON.stringify({ id }),
    });
    fetchPending();
  };

  useEffect(() => {
    fetchPending();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-[#1717a6]">
        Pending Student Approvals
      </h1>

      <Card className="p-4 shadow-md border rounded-xl">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#dff7d7] text-[#1717a6]">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Class</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-6 text-muted-foreground"
                >
                  No pending students
                </td>
              </tr>
            )}

            {students.map((s: any) => (
              <tr
                key={s._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3">{s.name}</td>
                <td className="p-3">{s.email}</td>
                <td className="p-3">{s.class || "—"}</td>

                <td className="p-3 flex flex-col md:flex-row gap-3 justify-center">
                  <Button
                    onClick={() => approve(s._id)}
                    className="bg-[#1717a6] text-white hover:bg-blue-900"
                  >
                    Approve
                  </Button>

                  <Button
                    onClick={() => reject(s._id)}
                    variant="destructive"
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
