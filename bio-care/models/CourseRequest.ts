import mongoose from "mongoose";

const CourseRequestSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  status: { type: String, default: "pending" }, // pending, approved, rejected
});

export default mongoose.models.CourseRequest ||
  mongoose.model("CourseRequest", CourseRequestSchema);
