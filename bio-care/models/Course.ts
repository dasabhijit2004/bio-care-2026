import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  title: String,
  url: String,
});

const DocumentSchema = new mongoose.Schema({
  title: String,
  url: String,
});

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },

  questions: [
    {
      question: String,
      options: [String],
      correctAnswer: Number,
    },
  ],

  settings: {
    timer: { type: Number, default: 0 }, // seconds, 0 means no timer
    negativeMarking: { type: Number, default: 0 }, // ex: 0.25
    maxAttempts: { type: Number, default: 1 }, // 1 attempt by default
  },

  // Stores each student's submission and score
  results: [
    {
      studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      score: Number,
      answers: [Number], // array of selected options
      attemptedAt: { type: Date, default: Date.now },
    },
  ],
});

const ChapterSchema = new mongoose.Schema({
  title: String,
  videos: [VideoSchema],
  documents: [DocumentSchema],
  quizzes: [QuizSchema],
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
