import { connectDB } from "@/lib/db";
import CourseRequest from "@/models/CourseRequest";
import User from "@/models/User";
import Course from "@/models/Course";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { requestId } = await req.json();

    // 1. Load request
    const request = await CourseRequest.findById(requestId);

    if (!request) {
      return new Response(
        JSON.stringify({ error: "Request not found" }),
        { status: 404 }
      );
    }

    if (request.status === "approved") {
      return new Response(
        JSON.stringify({ message: "Already approved" }),
        { status: 200 }
      );
    }

    const studentId = request.studentId;
    const courseId = request.courseId;

    // 2. Load user
    const user = await User.findById(studentId);

    if (!user) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404 }
      );
    }

    // 3. Load course
    const course = await Course.findById(courseId);

    if (!course) {
      return new Response(
        JSON.stringify({ error: "Course not found" }),
        { status: 404 }
      );
    }

    // ===============================
    // 4. Enroll user (SAFE)
    // ===============================

    if (!user.enrolledCourses) {
      user.enrolledCourses = [];
    }

    const alreadyEnrolled = user.enrolledCourses.some(
      (id: any) => id.toString() === courseId.toString()
    );

    if (!alreadyEnrolled) {
      user.enrolledCourses.push(courseId);
      await user.save();
    }

    // ===============================
    // 5. Track in course (SAFE)
    // ===============================

    if (!course.enrolledStudents) {
      course.enrolledStudents = [];
    }

    const alreadyInCourse = course.enrolledStudents.some(
      (id: any) => id.toString() === studentId.toString()
    );

    if (!alreadyInCourse) {
      course.enrolledStudents.push(studentId);
      await course.save();
    }

    // ===============================
    // 6. Approve request
    // ===============================

    request.status = "approved";
    await request.save();

    return new Response(
      JSON.stringify({ message: "Student enrolled successfully" }),
      { status: 200 }
    );

  } catch (err) {
    console.error("APPROVE ERROR:", err);

    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    );
  }
}
