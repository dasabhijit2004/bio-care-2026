import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  title: String,
  url: String,
});

const DocumentSchema = new mongoose.Schema({
  title: String,
  url: String,
});

const ChapterSchema = new mongoose.Schema({
  title: String,
  videos: [VideoSchema],
  documents: [DocumentSchema],
});

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
  description: { type: String, default: "" },
  price: { type: Number, required: true },
  thumbnail: { type: String, default: "" },
  chapters: [ChapterSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Course || mongoose.model("Course", CourseSchema);
