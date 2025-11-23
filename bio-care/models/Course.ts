import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  thumbnail: String,
  lessons: [
    {
      title: String,
      videoUrl: String,
      pdfUrl: String,
    },
  ],
});

export default mongoose.models.Course || mongoose.model("Course", CourseSchema);
