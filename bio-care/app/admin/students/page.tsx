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

  useEffect(() => {
    fetchPending();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-[var(--brand-blue)]">
        Pending Approvals
      </h1>

      {students.length === 0 && (
        <p className="text-muted-foreground">No pending students.</p>
      )}

      <div className="grid gap-4">
        {students.map((s: any) => (
          <Card key={s._id} className="p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold">{s.name}</p>
              <p className="text-sm text-muted-foreground">{s.email}</p>
            </div>

            <Button onClick={() => approve(s._id)} className="bg-[var(--brand-blue)] text-white">
              Approve
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
